import LayerExpressionInterface from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/LayerInterface';
import EffectsExpressionInterface from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/EffectInterface';
import CompExpressionInterface from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/CompInterface';
import ShapeExpressionInterface from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/ShapeInterface';
import TextExpressionInterface from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/TextInterface';
import FootageInterface from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/FootageInterface';

var interfaces = {
  layer: LayerExpressionInterface,
  effects: EffectsExpressionInterface,
  comp: CompExpressionInterface,
  shape: ShapeExpressionInterface,
  text: TextExpressionInterface,
  footage: FootageInterface,
};

function getInterface(type) {
  return interfaces[type] || null;
}

export default getInterface;
