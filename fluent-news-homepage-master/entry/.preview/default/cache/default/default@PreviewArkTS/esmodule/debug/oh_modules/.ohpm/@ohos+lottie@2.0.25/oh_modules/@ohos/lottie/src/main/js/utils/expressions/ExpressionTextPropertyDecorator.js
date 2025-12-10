import TextProperty from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/text/TextProperty';
import ExpressionManager from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/ExpressionManager';

function addDecorator() {
  function searchExpressions() {
    if (this.data.d.x) {
      this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this);
      this.addEffect(this.getExpressionValue.bind(this));
      return true;
    }
    return null;
  }

  TextProperty.prototype.getExpressionValue = function (currentValue, text) {
    var newValue = this.calculateExpression(text);
    if (currentValue.t !== newValue) {
      var newData = {};
      this.copyData(newData, currentValue);
      newData.t = newValue.toString();
      newData.__complete = false;
      return newData;
    }
    return currentValue;
  };

  TextProperty.prototype.searchProperty = function () {
    var isKeyframed = this.searchKeyframes();
    var hasExpressions = this.searchExpressions();
    this.kf = isKeyframed || hasExpressions;
    return this.kf;
  };

  TextProperty.prototype.searchExpressions = searchExpressions;
}

function initialize() {
  addDecorator();
}

export default initialize;
