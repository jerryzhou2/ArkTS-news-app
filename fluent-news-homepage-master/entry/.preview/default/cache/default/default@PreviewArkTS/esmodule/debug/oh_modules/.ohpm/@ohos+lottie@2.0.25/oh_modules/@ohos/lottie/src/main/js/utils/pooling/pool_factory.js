import {
  createSizedArray,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/helpers/arrays';
import pooling from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/pooling/pooling';

const poolFactory = (function () {
  return function (initialLength, _create, _release) {
    var _length = 0;
    var _maxLength = initialLength;
    var pool = createSizedArray(_maxLength);

    var ob = {
      newElement: newElement,
      release: release,
    };

    function newElement() {
      var element;
      if (_length) {
        _length -= 1;
        element = pool[_length];
      } else {
        element = _create();
      }
      return element;
    }

    function release(element) {
      if (_length === _maxLength) {
        pool = pooling.double(pool);
        _maxLength *= 2;
      }
      if (_release) {
        _release(element);
      }
      pool[_length] = element;
      _length += 1;
    }

    return ob;
  };
}());

export default poolFactory;
