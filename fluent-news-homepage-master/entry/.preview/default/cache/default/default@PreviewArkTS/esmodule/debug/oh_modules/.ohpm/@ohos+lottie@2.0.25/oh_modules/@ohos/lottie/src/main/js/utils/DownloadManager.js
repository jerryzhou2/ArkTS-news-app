/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {
  decompressAndReadJson,
  readJson,
  handleAssets,
  handleZipAssets,
  isCacheExist,
  combineArrayBuffers,
  createImageFilesDir,
  isJsonFile,
  isCompressdFile,
  isExistNetworkAssets
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/DataUtil';
import http from '@ohos:net.http';
import {LogUtil} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/LogUtil';
import { writeFileSync, moveFileSync } from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/FileUtil';

const downloadManager = (function () {
  const downloadUri = new Map();
  const TIMEOUT = 60000;
  /**
   * 加载网络动画资源
   *
   * @param uri - 动画资源的网络地址
   * @param onComplete - 加载完成时的回调函数
   * @param onError - 加载失败时的回调函数
   * @param resultDir - 结果目录信息
   * @param cacheFlag - 是否使用缓存标志
   */
  function loadNetworkAnimations(uri, onComplete, onError, resultDir, cacheFlag) {
    let flag = downloadUri.has(uri);
    if (flag) {
      let tasks = setInterval(() => {
        let existResult = isCacheExist(uri, resultDir.route);
        if (!existResult?.isExist) {
          return;
        }
        // 取消循环检测
        clearInterval(tasks);
        let repeatData = readJson(uri, resultDir.route);
        let newData = isJsonFile(uri) ? repeatData : handleZipAssets(repeatData, resultDir.route);
        onComplete(newData, false);
      }, 100);
    } else {
      // 将URI添加到Map中，表示下载已经开始
      downloadUri.set(uri, true);
      let httpRequest = http.createHttp();
      let fileData = [];
      httpRequest.on('dataReceive', (data) => {
        fileData.push(data);
      });
      let promise = httpRequest.requestInStream(uri, {
        method: http.RequestMethod.GET,
        expectDataType: http.HttpDataType.ARRAY_BUFFER,
        connectTimeout: TIMEOUT,
        readTimeout: TIMEOUT,
      });

      promise.then(async (data) => {
        if (data === 200 || data === 206 || data === 204) {
          let resBuf = combineArrayBuffers(fileData);
          let filePath = `${getContext().cacheDir}/${resultDir.dataName}`;
          writeFileSync(filePath, resBuf);
          loadSuccess(uri, resultDir, onComplete);
        } else {
          loadFail(uri, resultDir, onComplete, onError, cacheFlag);
        }
      }).finally(()=>{
        downloadUri.delete(uri);
        httpRequest.off('dataReceive');
        httpRequest.destroy();
      });
    }
  };

  /**
   * 成功加载动画资源后的处理逻辑
   *
   * @param uri - 动画资源的网络地址
   * @param resultDir - 结果目录信息
   * @param onComplete - 加载完成时的回调函数
   */
  function loadSuccess(uri, resultDir, onComplete) {
    if (isJsonFile(uri)) {
      let srcPath = `${getContext()?.cacheDir}/${resultDir.dataName}`;
      let destPath = `${resultDir.route}/${resultDir.dataName}`;
      moveFileSync(srcPath, destPath);
      let lottieData = readJson(uri, resultDir.route);
      if (lottieData?.assets?.length && isExistNetworkAssets(lottieData?.assets)) {
        downLoadImg(lottieData).then((results) => {
          // 下载成功加载网络
          let newJsonData = handleAssets(lottieData);
          onComplete(newJsonData, true);
        })
          .catch((err) => {
            LogUtil.error(`Download error: ${JSON.stringify(err)}`);
            errCallBack('error', err);
            let filesJsonData = handleAssets(lottieData);
            onComplete(filesJsonData, false);
          });
      } else {
        // 读取成功从Map中移除条目
        // uri方式无图片的json网络资源
        downloadUri.delete(uri);
        onComplete(lottieData, true);
      }
    } else if (isCompressdFile(uri)) {
      decompressAndReadJson(uri, `${getContext()?.cacheDir}`, resultDir.route).then((result) => {
        // 解压成功，从Map中移除条目
        downloadUri.delete(uri);
        onComplete(result, true);
      }).catch((errData) => {
        // 解压失败，从Map中移除条目
        downloadUri.delete(uri);
        errCallBack('error', errData);
      });
    }
  };

  /**
   * 处理动画资源加载失败时的逻辑
   *
   * @param uri - 动画资源的网络地址
   * @param resultDir - 结果目录信息
   * @param onComplete - 加载完成时的回调函数
   * @param onError - 错误回调函数
   * @param err - 错误对象
   * @param cacheFlag - 是否使用缓存标志
   */
  function loadFail(uri, resultDir, onComplete, onError, cacheFlag) {
    // 处理网络异常加载缓存
    let existResult = isCacheExist(uri, resultDir.route);
    if (existResult?.isExist && cacheFlag) {
      downloadUri.delete(uri);
      let cacheData = readJson(uri, resultDir.route);
      let newData = isJsonFile(uri) ? cacheData : handleZipAssets(cacheData, resultDir.route);
      onComplete(newData, false);
    } else {
      // 缓存无资源，给用户返回加载异常
      downloadUri.delete(uri);
      onError('error', 'download fail');
    }
  };

  /**
   * 下载并保存 Lottie 动画中的网络图片资源
   *
   * @param lottieData - 包含动画图片资源的对象
   * @returns 返回一个 Promise，表示所有下载任务的状态
   */
  function loadNetworkImages(lottieData) {
    let imgRouterFilesDir = createImageFilesDir();
    let downloadTasks = [];
    let imgData = [];
    lottieData?.assets?.forEach((item, index) => {
      if (item.id && item.p && item.p.startsWith('http')) {
        let httpRequest = http.createHttp();
        let jsonData = [];
        httpRequest.on('dataReceive', (data) => {
          jsonData.push(data);
          jsonData.length === 1 ? imgData.push({ AssetItem: item, fileData: jsonData }) : undefined;
        });
        let promise = httpRequest.requestInStream(item.p, {
          method: http.RequestMethod.GET,
          expectDataType: http.HttpDataType.ARRAY_BUFFER,
          connectTimeout: TIMEOUT,
          readTimeout: TIMEOUT,
        }).finally(() => {
          httpRequest.off('dataReceive');
          httpRequest.destroy();
        });
        downloadTasks.push(promise);
      }
    });

    return Promise.all(downloadTasks)
      .then((results) => {
        results?.forEach((item, index) => {
          let resBuf = combineArrayBuffers(imgData[index].fileData);
          let filePath = `${imgRouterFilesDir}/${imgData[index].AssetItem.id}.png`;
          writeFileSync(filePath, resBuf);
        });
        LogUtil.error(`All download tasks completed success: ${JSON.stringify(results)}`);
      })
      .catch((error) => {
        if (error && error.message) {
          LogUtil.error(`An error occurred during download: ${JSON.stringify(error)}`);
        }
      });
  };

  return {
    loadNetworkAnimation:loadNetworkAnimations,
    loadNetworkImage:loadNetworkImages,
  };
}());

export default downloadManager;