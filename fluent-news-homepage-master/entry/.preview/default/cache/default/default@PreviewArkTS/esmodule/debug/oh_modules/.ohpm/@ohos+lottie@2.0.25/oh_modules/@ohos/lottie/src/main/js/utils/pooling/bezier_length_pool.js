import {
  getDefaultCurveSegments,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/common';
import {
  createTypedArray,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/arrays';
import poolFactory from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/pooling/pool_factory';

const bezierLengthPool = (function () {
  function create() {
    return {
      addedLength: 0,
      percents: createTypedArray('float32', getDefaultCurveSegments()),
      lengths: createTypedArray('float32', getDefaultCurveSegments()),
    };
  }
  return poolFactory(8, create);
}());

export default bezierLengthPool;
