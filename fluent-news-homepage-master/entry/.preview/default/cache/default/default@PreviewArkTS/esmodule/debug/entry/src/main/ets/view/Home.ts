if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Home_Params {
    currentBottomIndex?: number;
    currentBreakpoint?: string;
    currentMode?: number;
    renderingSettings1?: RenderingContextSettings;
    canvasRenderingContext1?: CanvasRenderingContext2D;
    renderingSettings2?: RenderingContextSettings;
    canvasRenderingContext2?: CanvasRenderingContext2D;
    renderingSettings3?: RenderingContextSettings;
    canvasRenderingContext3?: CanvasRenderingContext2D;
    tabOption1?: TabBarOption;
    tabOption2?: TabBarOption;
    tabOption3?: TabBarOption;
    tabBarOption1?;
    tabBarOption2?;
    tabBarOption3?;
}
import deviceInfo from "@ohos:deviceInfo";
import lottie from "@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/modules/full";
import type { AnimationItem } from "@package:pkg_modules/.ohpm/@ohos+lottie@2.0.25/pkg_modules/@ohos/lottie/src/main/js/modules/full";
import { BreakpointConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
import { ResourceUtil } from "@bundle:com.example.newsdemo/entry/ets/utils/ResourceUtil";
import { BlankView } from "@bundle:com.example.newsdemo/entry/ets/view/BlankView";
import { HomeContent } from "@bundle:com.example.newsdemo/entry/ets/view/HomeContent";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import { ComponentContent as ComponentContent } from "@ohos:arkui.node";
export class Home extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBottomIndex = new ObservedPropertySimplePU(0, this, "currentBottomIndex");
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentBreakpoint");
        this.__currentMode = this.createStorageProp('currentColorMode', ConfigurationConstant.ColorMode.COLOR_MODE_LIGHT, "currentMode");
        this.renderingSettings1 = new RenderingContextSettings(true);
        this.canvasRenderingContext1 = new CanvasRenderingContext2D(this.renderingSettings1);
        this.renderingSettings2 = new RenderingContextSettings(true);
        this.canvasRenderingContext2 = new CanvasRenderingContext2D(this.renderingSettings2);
        this.renderingSettings3 = new RenderingContextSettings(true);
        this.canvasRenderingContext3 = new CanvasRenderingContext2D(this.renderingSettings3);
        this.tabOption1 = {
            index: 0,
            text: { "id": 16777343, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
            name: 'tab1',
            path: ResourceUtil.getLottiePath('tabbar1', this.currentMode),
            canvasRenderingContext: this.canvasRenderingContext1,
            currentBottomIndex: this.currentBottomIndex,
            currentBreakpoint: this.currentBreakpoint,
        };
        this.tabOption2 = {
            index: 1,
            text: { "id": 16777345, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
            name: 'tab2',
            path: ResourceUtil.getLottiePath('tabbar2', this.currentMode),
            canvasRenderingContext: this.canvasRenderingContext2,
            currentBottomIndex: this.currentBottomIndex,
            currentBreakpoint: this.currentBreakpoint,
        };
        this.tabOption3 = {
            index: 2,
            text: { "id": 16777344, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
            name: 'tab3',
            path: ResourceUtil.getLottiePath('tabbar3', this.currentMode),
            canvasRenderingContext: this.canvasRenderingContext3,
            currentBottomIndex: this.currentBottomIndex,
            currentBreakpoint: this.currentBreakpoint,
        };
        this.tabBarOption1 = new ComponentContent(this.getUIContext(), wrapBuilder<[
            TabBarOption
        ]>(BottomTabBuilder), this.tabOption1);
        this.tabBarOption2 = new ComponentContent(this.getUIContext(), wrapBuilder<[
            TabBarOption
        ]>(BottomTabBuilder), this.tabOption2);
        this.tabBarOption3 = new ComponentContent(this.getUIContext(), wrapBuilder<[
            TabBarOption
        ]>(BottomTabBuilder), this.tabOption3);
        this.setInitiallyProvidedValue(params);
        this.declareWatch("currentMode", this.onColorModeChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Home_Params) {
        if (params.currentBottomIndex !== undefined) {
            this.currentBottomIndex = params.currentBottomIndex;
        }
        if (params.renderingSettings1 !== undefined) {
            this.renderingSettings1 = params.renderingSettings1;
        }
        if (params.canvasRenderingContext1 !== undefined) {
            this.canvasRenderingContext1 = params.canvasRenderingContext1;
        }
        if (params.renderingSettings2 !== undefined) {
            this.renderingSettings2 = params.renderingSettings2;
        }
        if (params.canvasRenderingContext2 !== undefined) {
            this.canvasRenderingContext2 = params.canvasRenderingContext2;
        }
        if (params.renderingSettings3 !== undefined) {
            this.renderingSettings3 = params.renderingSettings3;
        }
        if (params.canvasRenderingContext3 !== undefined) {
            this.canvasRenderingContext3 = params.canvasRenderingContext3;
        }
        if (params.tabOption1 !== undefined) {
            this.tabOption1 = params.tabOption1;
        }
        if (params.tabOption2 !== undefined) {
            this.tabOption2 = params.tabOption2;
        }
        if (params.tabOption3 !== undefined) {
            this.tabOption3 = params.tabOption3;
        }
        if (params.tabBarOption1 !== undefined) {
            this.tabBarOption1 = params.tabBarOption1;
        }
        if (params.tabBarOption2 !== undefined) {
            this.tabBarOption2 = params.tabBarOption2;
        }
        if (params.tabBarOption3 !== undefined) {
            this.tabBarOption3 = params.tabBarOption3;
        }
    }
    updateStateVars(params: Home_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBottomIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__currentMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBottomIndex.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__currentMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBottomIndex: ObservedPropertySimplePU<number>;
    get currentBottomIndex() {
        return this.__currentBottomIndex.get();
    }
    set currentBottomIndex(newValue: number) {
        this.__currentBottomIndex.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __currentMode: ObservedPropertyAbstractPU<number>;
    get currentMode() {
        return this.__currentMode.get();
    }
    set currentMode(newValue: number) {
        this.__currentMode.set(newValue);
    }
    // [Start rendering_settings1]
    // Home.ets
    private renderingSettings1: RenderingContextSettings;
    private canvasRenderingContext1: CanvasRenderingContext2D;
    // [End rendering_settings1]
    private renderingSettings2: RenderingContextSettings;
    private canvasRenderingContext2: CanvasRenderingContext2D;
    private renderingSettings3: RenderingContextSettings;
    private canvasRenderingContext3: CanvasRenderingContext2D;
    private tabOption1: TabBarOption;
    private tabOption2: TabBarOption;
    private tabOption3: TabBarOption;
    private tabBarOption1;
    private tabBarOption2;
    private tabBarOption3;
    onColorModeChange(): void {
        this.destroyLottie();
        // 1.更新所有TabBarOption的路径
        this.tabOption1.path = ResourceUtil.getLottiePath('tabbar1', this.currentMode);
        this.tabOption2.path = ResourceUtil.getLottiePath('tabbar2', this.currentMode);
        this.tabOption3.path = ResourceUtil.getLottiePath('tabbar3', this.currentMode);
        this.tabBarOption1 = new ComponentContent(this.getUIContext(), wrapBuilder<[
            TabBarOption
        ]>(BottomTabBuilder), this.tabOption1);
        this.tabBarOption2 = new ComponentContent(this.getUIContext(), wrapBuilder<[
            TabBarOption
        ]>(BottomTabBuilder), this.tabOption2);
        this.tabBarOption3 = new ComponentContent(this.getUIContext(), wrapBuilder<[
            TabBarOption
        ]>(BottomTabBuilder), this.tabOption3);
        // 2. 强制触发Tabs重建
        const indexBak = this.currentBottomIndex;
        this.currentBottomIndex = -1; // 临时重置索引
        setTimeout(() => {
            this.currentBottomIndex = indexBak; // 恢复索引触发动画加载
        }, 0);
    }
    aboutToDisappear(): void {
        this.destroyLottie();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Home.ets(105:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({
                barPosition: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ?
                    BarPosition.Start : BarPosition.End
            });
            Tabs.debugLine("entry/src/main/ets/view/Home.ets(106:7)", "entry");
            Tabs.barWidth(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 16777489, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } : CommonConstants.FULL_PERCENT);
            Tabs.barHeight(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? CommonConstants.FULL_PERCENT :
                ((deviceInfo.deviceType === CommonConstants.DEVICE_TYPES[0] ? CommonConstants.TAB_BAR_HEIGHT :
                    CommonConstants.TAB_BAR_HEIGHT + CommonConstants.BOTTOM_RECT_HEIGHT)));
            Tabs.barBackgroundColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Tabs.barMode(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? BarMode.Scrollable : BarMode.Fixed, { nonScrollableLayoutStyle: LayoutStyle.ALWAYS_CENTER });
            Tabs.vertical(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG);
            Tabs.onAnimationStart((index: number, targetIndex: number, event: TabsAnimationEvent) => {
                this.currentBottomIndex = targetIndex;
                this.lottieController();
            });
            Tabs.scrollable(false);
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HomeContent(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Home.ets", line: 111, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HomeContent" });
                }
            });
            TabContent.tabBar(this.tabBarOption1);
            TabContent.debugLine("entry/src/main/ets/view/Home.ets(110:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new BlankView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Home.ets", line: 116, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "BlankView" });
                }
            });
            TabContent.tabBar(this.tabBarOption2);
            TabContent.debugLine("entry/src/main/ets/view/Home.ets(115:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new BlankView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/Home.ets", line: 121, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "BlankView" });
                }
            });
            TabContent.tabBar(this.tabBarOption3);
            TabContent.debugLine("entry/src/main/ets/view/Home.ets(120:9)", "entry");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    // [Start lottie_controller]
    // Home.ets
    lottieController(): void {
        if (this.currentBottomIndex === 0) {
            lottie.stop();
            lottie.play(this.tabOption1.name);
        }
        if (this.currentBottomIndex === 1) {
            lottie.stop();
            lottie.play(this.tabOption2.name);
        }
        if (this.currentBottomIndex === 2) {
            lottie.stop();
            lottie.play(this.tabOption3.name);
        }
    }
    // [End lottie_controller]
    destroyLottie() {
        this.tabOption1.lottieItem?.removeEventListener('DOMLoaded');
        this.tabOption2.lottieItem?.removeEventListener('DOMLoaded');
        this.tabOption3.lottieItem?.removeEventListener('DOMLoaded');
        lottie.destroy(this.tabOption1.name);
        lottie.destroy(this.tabOption2.name);
        lottie.destroy(this.tabOption3.name);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function BottomTabBuilder(tabBarOption: TabBarOption, parent = null) {
    const __tabBarOption__ = tabBarOption;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, tabBarOption = __tabBarOption__) => {
        Column.create();
        Column.debugLine("entry/src/main/ets/view/Home.ets(177:3)", "entry");
        Column.padding({
            bottom: deviceInfo.deviceType === CommonConstants.DEVICE_TYPES[0] ? 0 : CommonConstants.BOTTOM_RECT_HEIGHT
        });
        Column.height(tabBarOption.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 16777530, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } :
            CommonConstants.FULL_PERCENT);
        Column.width(CommonConstants.FULL_PERCENT);
        Column.justifyContent(FlexAlign.Center);
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, tabBarOption = __tabBarOption__) => {
        // [Start canvas]
        // Home.ets
        Canvas.create(tabBarOption.canvasRenderingContext);
        Canvas.debugLine("entry/src/main/ets/view/Home.ets(180:5)", "entry");
        // [Start canvas]
        // Home.ets
        Canvas.width({ "id": 16777490, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        // [Start canvas]
        // Home.ets
        Canvas.height({ "id": 16777490, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        // [Start canvas]
        // Home.ets
        Canvas.onReady(() => {
            tabBarOption.canvasRenderingContext.imageSmoothingEnabled = true;
            tabBarOption.canvasRenderingContext.imageSmoothingQuality = 'medium';
            lottie.destroy(tabBarOption.name);
            const item = lottie.loadAnimation({
                container: tabBarOption.canvasRenderingContext,
                renderer: 'canvas',
                loop: false,
                autoplay: false,
                autoSkip: false,
                name: tabBarOption.name,
                path: tabBarOption.path,
            });
            tabBarOption.lottieItem = item;
            item.addEventListener('DOMLoaded', (args: Object): void => {
                if (tabBarOption.index === tabBarOption.currentBottomIndex) {
                    item.play();
                }
            });
        });
    }, Canvas);
    // [Start canvas]
    // Home.ets
    Canvas.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, tabBarOption = __tabBarOption__) => {
        // [End canvas]
        Text.create(tabBarOption.text);
        Text.debugLine("entry/src/main/ets/view/Home.ets(204:5)", "entry");
        // [End canvas]
        Text.fontSize({ "id": 16777535, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        // [End canvas]
        Text.fontWeight(CommonConstants.FONT_WEIGHT_500);
        // [End canvas]
        Text.fontColor(tabBarOption.currentBottomIndex === tabBarOption.index ? { "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } :
            ResourceUtil.getCommonBackgroundColor()[3]);
        // [End canvas]
        Text.margin({ top: { "id": 16777536, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        // [End canvas]
        Text.opacity(tabBarOption.currentBottomIndex === tabBarOption.index ?
            CommonConstants.TEXT_OPACITY[0] : CommonConstants.TEXT_OPACITY[1]);
    }, Text);
    // [End canvas]
    Text.pop();
    Column.pop();
}
// [Start tab_bar_option]
// Home.ets
interface TabBarOption {
    index: number;
    text: ResourceStr;
    name: string;
    path: string;
    canvasRenderingContext: CanvasRenderingContext2D;
    lottieItem?: AnimationItem;
    currentBottomIndex?: number;
    currentBreakpoint?: string;
}
