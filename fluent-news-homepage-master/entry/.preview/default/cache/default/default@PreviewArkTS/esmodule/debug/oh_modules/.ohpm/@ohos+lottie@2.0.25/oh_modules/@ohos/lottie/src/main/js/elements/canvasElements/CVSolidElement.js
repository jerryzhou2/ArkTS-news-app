import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import RenderableElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/RenderableElement';
import BaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/BaseElement';
import TransformElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/TransformElement';
import HierarchyElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/HierarchyElement';
import FrameElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/FrameElement';
import CVBaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/canvasElements/CVBaseElement';
import IImageElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/ImageElement';
import SVGShapeElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/SVGShapeElement';

function CVSolidElement(data, globalData, comp) {
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement);

CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement;
CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame;

CVSolidElement.prototype.renderInnerContent = function () {
  var ctx = this.canvasContext;
  ctx.fillStyle = this.data.sc;
  ctx.fillRect(0, 0, this.data.sw, this.data.sh);
  //
};

export default CVSolidElement;
