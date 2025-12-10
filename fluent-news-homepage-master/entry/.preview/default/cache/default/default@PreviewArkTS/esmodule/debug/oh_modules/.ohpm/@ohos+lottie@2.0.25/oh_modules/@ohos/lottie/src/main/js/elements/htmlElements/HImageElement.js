import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import createNS from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/svg_elements';
import RenderableElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/RenderableElement';
import BaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/BaseElement';
import TransformElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/TransformElement';
import HierarchyElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/HierarchyElement';
import FrameElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/FrameElement';
import HBaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/htmlElements/HBaseElement';
import HSolidElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/htmlElements/HSolidElement';

function HImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  this.initElement(data, globalData, comp);
}

extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement);

HImageElement.prototype.createContent = function () {
  var assetPath = this.globalData.getAssetsPath(this.assetData);
  var img = new Image();

  if (this.data.hasMask) {
    this.imageElem = createNS('image');
    this.imageElem.setAttribute('width', this.assetData.w + 'px');
    this.imageElem.setAttribute('height', this.assetData.h + 'px');
    this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', assetPath);
    this.layerElement.appendChild(this.imageElem);
    this.baseElement.setAttribute('width', this.assetData.w);
    this.baseElement.setAttribute('height', this.assetData.h);
  } else {
    this.layerElement.appendChild(img);
  }
  img.crossOrigin = 'anonymous';
  img.src = assetPath;
  if (this.data.ln) {
    this.baseElement.setAttribute('id', this.data.ln);
  }
};

export default HImageElement;
