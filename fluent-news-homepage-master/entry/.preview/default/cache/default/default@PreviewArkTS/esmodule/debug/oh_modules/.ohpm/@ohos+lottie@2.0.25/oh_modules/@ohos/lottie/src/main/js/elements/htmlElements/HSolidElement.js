import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import createNS from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/svg_elements';
import createTag from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/html_elements';
import BaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/BaseElement';
import TransformElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/TransformElement';
import HierarchyElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/HierarchyElement';
import FrameElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/FrameElement';
import RenderableDOMElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/RenderableDOMElement';
import HBaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/htmlElements/HBaseElement';

function HSolidElement(data, globalData, comp) {
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement);

HSolidElement.prototype.createContent = function () {
  var rect;
  if (this.data.hasMask) {
    rect = createNS('rect');
    rect.setAttribute('width', this.data.sw);
    rect.setAttribute('height', this.data.sh);
    rect.setAttribute('fill', this.data.sc);
    this.svgElement.setAttribute('width', this.data.sw);
    this.svgElement.setAttribute('height', this.data.sh);
  } else {
    rect = createTag('div');
    rect.style.width = this.data.sw + 'px';
    rect.style.height = this.data.sh + 'px';
    rect.style.backgroundColor = this.data.sc;
  }
  this.layerElement.appendChild(rect);
};

export default HSolidElement;
