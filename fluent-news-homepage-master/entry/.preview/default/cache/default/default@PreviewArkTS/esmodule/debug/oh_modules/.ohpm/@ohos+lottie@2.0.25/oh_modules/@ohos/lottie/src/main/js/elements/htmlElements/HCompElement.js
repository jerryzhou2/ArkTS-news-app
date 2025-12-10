import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import {
  createSizedArray,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/arrays';
import PropertyFactory from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/PropertyFactory';
import HybridRendererBase from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/renderers/HybridRendererBase';
import HBaseElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/htmlElements/HBaseElement';
import ICompElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/CompElement';
import SVGCompElement from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/SVGCompElement';

function HCompElement(data, globalData, comp) {
  this.layers = data.layers;
  this.supports3d = !data.hasMask;
  this.completeLayers = false;
  this.pendingElements = [];
  this.elements = this.layers ? createSizedArray(this.layers.length) : [];
  this.initElement(data, globalData, comp);
  this.tm = data.tm ? PropertyFactory.getProp(this, data.tm, 0, globalData.frameRate, this) : { _placeholder: true };
}

extendPrototype([HybridRendererBase, ICompElement, HBaseElement], HCompElement);
HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements;

HCompElement.prototype.createContainerElements = function () {
  this._createBaseContainerElements();
  // divElement.style.clip = 'rect(0px, '+this.data.w+'px, '+this.data.h+'px, 0px)';
  if (this.data.hasMask) {
    this.svgElement.setAttribute('width', this.data.w);
    this.svgElement.setAttribute('height', this.data.h);
    this.transformedElement = this.baseElement;
  } else {
    this.transformedElement = this.layerElement;
  }
};

HCompElement.prototype.addTo3dContainer = function (elem, pos) {
  var j = 0;
  var nextElement;
  while (j < pos) {
    if (this.elements[j] && this.elements[j].getBaseElement) {
      nextElement = this.elements[j].getBaseElement();
    }
    j += 1;
  }
  if (nextElement) {
    this.layerElement.insertBefore(elem, nextElement);
  } else {
    this.layerElement.appendChild(elem);
  }
};

HCompElement.prototype.createComp = function (data) {
  if (!this.supports3d) {
    return new SVGCompElement(data, this.globalData, this);
  }
  return new HCompElement(data, this.globalData, this);
};

export default HCompElement;
