import {
  createSizedArray,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/arrays';

const pooling = (function () {
  function double(arr) {
    return arr.concat(createSizedArray(arr.length));
  }

  return {
    double: double,
  };
}());

export default pooling;
