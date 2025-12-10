import DynamicPropertyContainer from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/dynamicProperties';

import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';
import PropertyFactory from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/PropertyFactory';

function SVGFillStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, this);
  this.c = PropertyFactory.getProp(elem, data.c, 1, 255, this);
  this.style = styleOb;
}

extendPrototype([DynamicPropertyContainer], SVGFillStyleData);

export default SVGFillStyleData;
