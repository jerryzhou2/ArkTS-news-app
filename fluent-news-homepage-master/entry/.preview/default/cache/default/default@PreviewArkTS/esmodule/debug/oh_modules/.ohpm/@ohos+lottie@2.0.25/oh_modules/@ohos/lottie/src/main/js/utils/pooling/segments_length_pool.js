import bezierLengthPool from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/pooling/bezier_length_pool';
import poolFactory from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/pooling/pool_factory';

const segmentsLengthPool = (function () {
  function create() {
    return {
      lengths: [],
      totalLength: 0,
    };
  }

  function release(element) {
    var i;
    var len = element.lengths.length;
    for (i = 0; i < len; i += 1) {
      bezierLengthPool.release(element.lengths[i]);
    }
    element.lengths.length = 0;
  }

  return poolFactory(8, create, release);
}());

export default segmentsLengthPool;
