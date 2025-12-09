import DynamicPropertyContainer from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/dynamicProperties';

import {
  extendPrototype,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/functionExtensions';

function SVGNoStyleData(elem, data, styleOb) {
  this.initDynamicPropertyContainer(elem);
  this.getValue = this.iterateDynamicProperties;
  this.style = styleOb;
}

extendPrototype([DynamicPropertyContainer], SVGNoStyleData);

export default SVGNoStyleData;
