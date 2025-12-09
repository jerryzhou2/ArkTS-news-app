import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import DynamicPropertyContainer from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/dynamicProperties';
import PropertyFactory from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/PropertyFactory';
import DashProperty from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/DashProperty';

function SVGStrokeStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.w = PropertyFactory.getProp(elem, data.w, 0, null, this);
  this.d = new DashProperty(elem, data.d || {}, 'svg', this);
  this.c = PropertyFactory.getProp(elem, data.c, 1, 255, this);
  this.style = styleOb;
  this._isAnimated = !!this._isAnimated;
}

extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData);

export default SVGStrokeStyleData;
