import lottie from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/modules/main';
import {
  setExpressionsPlugin,
  setExpressionInterfaces,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/common';
import { ShapeModifiers } from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/ShapeModifiers';
import TrimModifier from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/TrimModifier';
import PuckerAndBloatModifier from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/PuckerAndBloatModifier';
import RepeaterModifier from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/RepeaterModifier';
import RoundCornersModifier from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/RoundCornersModifier';
import ZigZagModifier from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/ZigZagModifier';
import OffsetPathModifier from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/shapes/OffsetPathModifier';
import CanvasRenderer from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/renderers/CanvasRenderer';
import HybridRenderer from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/renderers/HybridRenderer';
import SVGRenderer from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/renderers/SVGRenderer';
import {
  registerRenderer,
} from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/renderers/renderersManager';
import Expressions from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/Expressions';
import interfacesProvider from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/InterfacesProvider';
import expressionPropertyDecorator from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/ExpressionPropertyDecorator';
import expressionTextPropertyDecorator from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/expressions/ExpressionTextPropertyDecorator';
// SVG effects
import { registerEffect } from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/SVGEffects';
import SVGTintFilter from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGTintEffect';
import SVGFillFilter from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGFillFilter';
import SVGStrokeEffect from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGStrokeEffect';
import SVGTritoneFilter from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGTritoneFilter';
import SVGProLevelsFilter from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGProLevelsFilter';
import SVGDropShadowEffect from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGDropShadowEffect';
import SVGMatte3Effect from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGMatte3Effect';
import SVGGaussianBlurEffect from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/svgElements/effects/SVGGaussianBlurEffect';

// Canvas effects
import { registerCVEffect } from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/canvasElements/CVEffects';
import CVGaussianBlurEffect from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/elements/canvasElements/effects/CVGaussianBlurEffect';

import { LogUtil } from '@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/utils/LogUtil';

// Registering renderers
registerRenderer('canvas', CanvasRenderer);
registerRenderer('html', HybridRenderer);
registerRenderer('svg', SVGRenderer);

// Registering shape modifiers
ShapeModifiers.registerModifier('tm', TrimModifier);
ShapeModifiers.registerModifier('pb', PuckerAndBloatModifier);
ShapeModifiers.registerModifier('rp', RepeaterModifier);
ShapeModifiers.registerModifier('rd', RoundCornersModifier);
ShapeModifiers.registerModifier('zz', ZigZagModifier);
ShapeModifiers.registerModifier('op', OffsetPathModifier);

// Registering expression plugin
setExpressionsPlugin(Expressions);
setExpressionInterfaces(interfacesProvider);
expressionPropertyDecorator();
expressionTextPropertyDecorator();

// Registering svg effects
registerEffect(20, SVGTintFilter, true);
registerEffect(21, SVGFillFilter, true);
registerEffect(22, SVGStrokeEffect, false);
registerEffect(23, SVGTritoneFilter, true);
registerEffect(24, SVGProLevelsFilter, true);
registerEffect(25, SVGDropShadowEffect, true);
registerEffect(28, SVGMatte3Effect, false);
registerEffect(29, SVGGaussianBlurEffect, true);

// Registering canvas effects
registerCVEffect(29, CVGaussianBlurEffect, true);

export { LogUtil };

export default lottie;
