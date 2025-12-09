if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabBar_Params {
    tabBarArray?: NewsTypeModel[];
    currentIndex?: number;
    currentBreakpoint?: string;
}
import { BreakpointConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
import { HomeConstants as Const } from "@bundle:com.example.newsdemo/entry/ets/constants/HomeConstants";
import type NewsTypeModel from '../viewmodel/NewsTypeModel';
import newsViewModel from "@bundle:com.example.newsdemo/entry/ets/viewmodel/NewsViewModel";
import { PullToRefreshNews } from "@bundle:com.example.newsdemo/entry/ets/view/PullToRefreshNews";
export default class TabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__tabBarArray = new ObservedPropertyObjectPU(newsViewModel.getDefaultTypeList(), this, "tabBarArray");
        this.__currentIndex = new ObservedPropertySimplePU(CommonConstants.ZERO, this, "currentIndex");
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentBreakpoint");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBar_Params) {
        if (params.tabBarArray !== undefined) {
            this.tabBarArray = params.tabBarArray;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
    }
    updateStateVars(params: TabBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__tabBarArray.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__tabBarArray.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __tabBarArray: ObservedPropertyObjectPU<NewsTypeModel[]>;
    get tabBarArray() {
        return this.__tabBarArray.get();
    }
    set tabBarArray(newValue: NewsTypeModel[]) {
        this.__tabBarArray.set(newValue);
    }
    private __currentIndex: ObservedPropertySimplePU<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    // [Start tab_bar]
    // TabBar.ets
    TabBuilder(id: number, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/TabBar.ets(33:5)", "entry");
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.tabBarArray[id].name);
            Text.debugLine("entry/src/main/ets/view/TabBar.ets(34:7)", "entry");
            Text.height(CommonConstants.FULL_PERCENT);
            Text.padding({ left: Const.TAB_BARS_HORIZONTAL_PADDING, right: Const.TAB_BARS_HORIZONTAL_PADDING });
            Text.fontSize(this.currentIndex === index ?
                (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 16777533, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } : { "id": 16777534, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }) :
                (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 16777531, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } : { "id": 16777532, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }));
            Text.fontWeight(this.currentIndex === index ?
                Const.TAB_BARS_SELECT_TEXT_FONT_WEIGHT : Const.TAB_BARS_UN_SELECT_TEXT_FONT_WEIGHT);
            Text.fontColor({ "id": 16777297, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.Start });
            Tabs.debugLine("entry/src/main/ets/view/TabBar.ets(52:5)", "entry");
            Tabs.barHeight(Const.TAB_BARS_BAR_HEIGHT);
            Tabs.barMode(BarMode.Scrollable);
            Tabs.barWidth(Const.TAB_BARS_BAR_WIDTH);
            Tabs.vertical(false);
            Tabs.onAnimationStart((_index: number, targetIndex: number, _event: TabsAnimationEvent) => {
                this.currentIndex = targetIndex;
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const tabsItem = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new 
                                    // [StartExclude tab_bar]
                                    PullToRefreshNews(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/TabBar.ets", line: 56, col: 11 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "PullToRefreshNews" });
                        }
                    });
                    TabContent.tabBar({ builder: () => {
                            this.TabBuilder.call(this, tabsItem.id, index);
                        } });
                    TabContent.debugLine("entry/src/main/ets/view/TabBar.ets(54:9)", "entry");
                }, TabContent);
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabBarArray, forEachItemGenFunction, (item: NewsTypeModel) => JSON.stringify(item), true, false);
        }, ForEach);
        ForEach.pop();
        Tabs.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
