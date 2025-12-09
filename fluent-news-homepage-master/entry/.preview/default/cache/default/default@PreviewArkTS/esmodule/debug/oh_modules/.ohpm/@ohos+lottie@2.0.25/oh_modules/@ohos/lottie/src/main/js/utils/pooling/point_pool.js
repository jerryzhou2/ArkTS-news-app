import {
  createTypedArray,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/arrays';
import poolFactory from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/pooling/pool_factory';

const pointPool = (function () {
  function create() {
    return createTypedArray('float32', 2);
  }
  return poolFactory(8, create);
}());

export default pointPool;
