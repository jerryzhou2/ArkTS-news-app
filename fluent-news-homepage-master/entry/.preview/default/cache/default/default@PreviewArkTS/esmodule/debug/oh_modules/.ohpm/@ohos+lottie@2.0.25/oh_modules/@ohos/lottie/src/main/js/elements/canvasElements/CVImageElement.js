import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import createTag from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/html_elements';
import RenderableElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/RenderableElement';
import BaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/BaseElement';
import TransformElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/TransformElement';
import HierarchyElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/HierarchyElement';
import FrameElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/FrameElement';
import CVBaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/canvasElements/CVBaseElement';
import IImageElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/ImageElement';
import SVGShapeElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/SVGShapeElement';

function CVImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  this.img = globalData.imageLoader.getAsset(this.assetData);
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement);

CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement;
CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame;

CVImageElement.prototype.createContent = function () {
  if (this.img && this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
    var imgW = this.img.width;
    var imgH = this.img.height;
    var imgRel = imgW / imgH;
    var canvasRel = this.assetData.w / this.assetData.h;
    var widthCrop;
    var heightCrop;
    var par = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
    if ((imgRel > canvasRel && par === 'xMidYMid slice') || (imgRel < canvasRel && par !== 'xMidYMid slice')) {
      heightCrop = imgH;
      widthCrop = heightCrop * canvasRel;
    } else {
      widthCrop = imgW;
      heightCrop = widthCrop / canvasRel;
    }
    this.canvasContext.drawImage(this.img.pixel_map, (imgW - widthCrop) / 2, (imgH - heightCrop) / 2, widthCrop, heightCrop, 0, 0, this.assetData.w, this.assetData.h);
  }
};

CVImageElement.prototype.renderInnerContent = function () {
  if (this.img.pixel_map) {
    //传入base64资源与rawfile资源解析出的pixelMap进行绘制
    this.canvasContext.drawImage(this.img.pixel_map, 0, 0, this.img.width, this.img.height);
  } else {
    this.canvasContext.drawImage(this.img, 0, 0);
  }
};

CVImageElement.prototype.destroy = function () {
  //释放pixel_map，防止内存泄漏
  if (this.img?.pixel_map) {
    this.img.pixel_map.release(() => {
    });
  }
  this.img = null;
};

export default CVImageElement;
