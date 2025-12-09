import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import {
  getExpressionInterfaces,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/common';
import RenderableElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/RenderableElement';
import BaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/BaseElement';
import FrameElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/FrameElement';

function FootageElement(data, globalData, comp) {
  this.initFrame();
  this.initRenderable();
  this.assetData = globalData.getAssetData(data.refId);
  this.footageData = globalData.imageLoader.getAsset(this.assetData);
  this.initBaseData(data, globalData, comp);
}

FootageElement.prototype.prepareFrame = function () {
};

extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement);

FootageElement.prototype.getBaseElement = function () {
  return null;
};

FootageElement.prototype.renderFrame = function () {
};

FootageElement.prototype.destroy = function () {
};

FootageElement.prototype.initExpressions = function () {
  const expressionsInterfaces = getExpressionInterfaces();
  if (!expressionsInterfaces) {
    return;
  }
  const FootageInterface = expressionsInterfaces('footage');
  this.layerInterface = FootageInterface(this);
};

FootageElement.prototype.getFootageData = function () {
  return this.footageData;
};

export default FootageElement;
