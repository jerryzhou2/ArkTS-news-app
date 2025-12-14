/*
* Copyright (c) 2024 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { HomeConstants as Const } from '../constants/HomeConstants';
import NewsTypeModel from './NewsTypeModel';
import NewsData from './NewsData';
// 【新增】引入我们写的推理引擎
import { InferenceModel } from '../utils/InferenceModel';

class NewsViewModel {
  /**
   * 获取默认的分类列表（顶部 Tab 栏）
   */
  getDefaultTypeList(): NewsTypeModel[] {
    return Const.TAB_BARS_DEFAULT_NEWS_TYPES;
  }

  /**
   * 【新增核心方法】使用本地 AI 模型过滤新闻
   * @param sourceNews 原始新闻数据列表（从 JSON 或网络获取的）
   * @param targetCategoryId 当前 Tab 的分类 ID (如 6=科技, 10=汽车)
   * @returns 过滤后的新闻列表
   */
  filterNewsByTrainedModel(sourceNews: NewsData[], targetCategoryId: number): NewsData[] {
    // 策略：
    // 如果目标是 ID 0 (全部)，则直接返回所有数据。
    // 原因：我们的模型把无法识别、或属于“汽车/教育/健康”等没有独立栏目的新闻都归为了 0，
    // 所以在“全部”里显示所有新闻是合理的。
    if (targetCategoryId === 0) {
      return sourceNews;
    }

    // 使用 filter 函数遍历每一条新闻
    return sourceNews.filter((item) => {
      // 1. 获取标题字符串
      // NewsData 中的 newsTitle 可能是 Resource 类型，也可能是 string。
      // 我们的 AI 模型只能处理 string。
      let title = '';
      if (typeof item.newsTitle === 'string') {
        title = item.newsTitle;
      } else {
        // 如果是 Resource 类型（比如 $r('app.string.xxx')），在 ViewModel 中很难直接解析成文本。
        // 实际开发中，网络请求回来的数据通常都是 string。
        // 这里我们做一个简单处理：如果是 Resource，暂时跳过或视为无法分类。
        // 你可以去 mockDataOne.json 确认，里面的标题都是直接的字符串。
        return false;
      }

      // 2. 【调用大脑】使用推理引擎预测这条新闻属于哪一类
      const predictedId = InferenceModel.predict(title);

      // 3. 只有预测 ID 等于当前栏目 ID 才保留
      // 例如：当前在“科技(6)”栏目，只有 predictedId 为 6 的新闻会被保留
      return predictedId === targetCategoryId;
    });
  }
}

let newsViewModel = new NewsViewModel();

export default newsViewModel;