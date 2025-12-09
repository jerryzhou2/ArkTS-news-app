import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import DynamicPropertyContainer from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/dynamicProperties';
import PropertyFactory from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/PropertyFactory';
import DashProperty from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/DashProperty';
import SVGGradientFillStyleData from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/helpers/shapes/SVGGradientFillStyleData';

function SVGGradientStrokeStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.w = PropertyFactory.getProp(elem, data.w, 0, null, this);
  this.d = new DashProperty(elem, data.d || {}, 'svg', this);
  this.initGradientData(elem, data, styleOb);
  this._isAnimated = !!this._isAnimated;
}

extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);

export default SVGGradientStrokeStyleData;
