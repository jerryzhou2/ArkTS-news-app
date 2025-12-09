if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CityView_Params {
    stabIndex?: number;
    location?: boolean;
    isSearchState?: boolean;
    currentLocal?: string;
    scroller?: Scroller;
    curCity?: string;
    controller?: SearchController;
}
import { CITY_DATA, HOT_CITY, TAB_VALUE } from "@bundle:com.example.newsdemo/entry/ets/viewmodel/CityDetailData";
import type { CityType } from "@bundle:com.example.newsdemo/entry/ets/viewmodel/CityDetailData";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
export class CityView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__stabIndex = new ObservedPropertySimplePU(CommonConstants.ZERO, this, "stabIndex");
        this.__location = new ObservedPropertySimplePU(true, this, "location");
        this.__isSearchState = new SynchedPropertySimpleTwoWayPU(params.isSearchState, this, "isSearchState");
        this.__currentLocal = this.createStorageProp('currentLocal', '', "currentLocal");
        this.scroller = new Scroller();
        this.curCity = '';
        this.controller = new SearchController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CityView_Params) {
        if (params.stabIndex !== undefined) {
            this.stabIndex = params.stabIndex;
        }
        if (params.location !== undefined) {
            this.location = params.location;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.curCity !== undefined) {
            this.curCity = params.curCity;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: CityView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__stabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__location.purgeDependencyOnElmtId(rmElmtId);
        this.__isSearchState.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLocal.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__stabIndex.aboutToBeDeleted();
        this.__location.aboutToBeDeleted();
        this.__isSearchState.aboutToBeDeleted();
        this.__currentLocal.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __stabIndex: ObservedPropertySimplePU<number>;
    get stabIndex() {
        return this.__stabIndex.get();
    }
    set stabIndex(newValue: number) {
        this.__stabIndex.set(newValue);
    }
    private __location: ObservedPropertySimplePU<boolean>;
    get location() {
        return this.__location.get();
    }
    set location(newValue: boolean) {
        this.__location.set(newValue);
    }
    private __isSearchState: SynchedPropertySimpleTwoWayPU<boolean>;
    get isSearchState() {
        return this.__isSearchState.get();
    }
    set isSearchState(newValue: boolean) {
        this.__isSearchState.set(newValue);
    }
    private __currentLocal: ObservedPropertyAbstractPU<string>;
    get currentLocal() {
        return this.__currentLocal.get();
    }
    set currentLocal(newValue: string) {
        this.__currentLocal.set(newValue);
    }
    private scroller: Scroller;
    private curCity: string;
    private controller: SearchController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/CityView.ets(31:5)", "entry");
            Column.flexShrink(CommonConstants.LAYOUT_WEIGHT);
            Column.flexGrow(CommonConstants.LAYOUT_WEIGHT);
            Column.alignItems(HorizontalAlign.Start);
            Column.padding({ bottom: { "id": 16777372, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            Column.visibility(this.isSearchState ? Visibility.None : Visibility.Visible);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.End });
            Stack.debugLine("entry/src/main/ets/view/CityView.ets(32:7)", "entry");
            Stack.margin({ top: { "id": 16777366, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/CityView.ets(33:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777322, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/CityView.ets(34:11)", "entry");
            Text.fontSize({ "id": 16777385, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.fontColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.opacity(CommonConstants.TEXT_OPACITY[2]);
            Text.margin({ left: { "id": 16777391, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, bottom: { "id": 16777379, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center, wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/view/CityView.ets(40:11)", "entry");
            Flex.width(CommonConstants.FULL_PERCENT);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentLocal);
            Text.debugLine("entry/src/main/ets/view/CityView.ets(41:13)", "entry");
            Text.margin({ bottom: { "id": 16777388, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, left: { "id": 16777389, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            Text.width({ "id": 16777315, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.height({ "id": 16777387, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.fontSize({ "id": 16777385, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.maxLines(CommonConstants.MAX_LINES);
            Text.fontColor({ "id": 16777431, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.backgroundColor({ "id": 16777430, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.borderRadius({ "id": 16777384, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.onClick(() => {
                AppStorage.setOrCreate('local', this.currentLocal);
                this.getUIContext().getRouter().back();
            });
        }, Text);
        Text.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777318, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/CityView.ets(58:11)", "entry");
            Text.fontSize({ "id": 16777385, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.fontColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.opacity(CommonConstants.TEXT_OPACITY[2]);
            Text.margin({ left: { "id": 16777391, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, bottom: { "id": 16777379, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center, wrap: FlexWrap.Wrap });
            Flex.debugLine("entry/src/main/ets/view/CityView.ets(64:11)", "entry");
            Flex.width(CommonConstants.FULL_PERCENT);
            Flex.padding({ right: { "id": 16777314, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${item}`);
                    Text.debugLine("entry/src/main/ets/view/CityView.ets(66:15)", "entry");
                    Text.margin({ bottom: { "id": 16777388, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, left: { "id": 16777389, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
                    Text.width({ "id": 16777315, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                    Text.height({ "id": 16777387, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                    Text.textAlign(TextAlign.Center);
                    Text.fontSize({ "id": 16777385, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                    Text.maxLines(CommonConstants.MAX_LINES);
                    Text.fontColor({ "id": 16777431, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                    Text.backgroundColor({ "id": 16777430, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                    Text.borderRadius({ "id": 16777384, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                    Text.onClick(() => {
                        AppStorage.setOrCreate('local', item);
                        this.getUIContext().getRouter().back();
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, HOT_CITY, forEachItemGenFunction, (item: string) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({
                space: CommonConstants.LIST_ITEM_SPACE,
                initialIndex: CommonConstants.ZERO,
                scroller: this.scroller
            });
            List.debugLine("entry/src/main/ets/view/CityView.ets(85:11)", "entry");
            List.width(CommonConstants.FULL_PERCENT);
            List.margin({ left: { "id": 16777391, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, bottom: { "id": 16777390, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            List.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
            List.edgeEffect(EdgeEffect.None);
            List.divider({
                strokeWidth: { "id": 16777362, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                color: { "id": 16777425, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                startMargin: { "id": 16777361, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                endMargin: { "id": 16777360, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
            List.listDirection(Axis.Vertical);
            List.scrollBar(BarState.Off);
            List.onScrollIndex((firstIndex: number, lastIndex: number) => {
                this.stabIndex = firstIndex;
            });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const index = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/view/CityView.ets(91:15)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/view/CityView.ets(92:17)", "entry");
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`${index.name}`);
                            Text.debugLine("entry/src/main/ets/view/CityView.ets(93:19)", "entry");
                            Text.height({ "id": 16777364, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777363, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                            Text.fontColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                            Text.width(CommonConstants.FULL_PERCENT);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            ForEach.create();
                            const forEachItemGenFunction = _item => {
                                const item = _item;
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item);
                                    Text.debugLine("entry/src/main/ets/view/CityView.ets(99:21)", "entry");
                                    Text.height({ "id": 16777364, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777385, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                                    Text.width(CommonConstants.FULL_PERCENT);
                                    Text.onClick(() => {
                                        AppStorage.setOrCreate('local', item);
                                        this.getUIContext().getRouter().back();
                                    });
                                }, Text);
                                Text.pop();
                            };
                            this.forEachUpdateFunction(elmtId, index.city, forEachItemGenFunction, (item: string) => JSON.stringify(item), false, false);
                        }, ForEach);
                        ForEach.pop();
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, CITY_DATA, forEachItemGenFunction, (item: CityType) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.create({ arrayValue: TAB_VALUE, selected: this.stabIndex });
            AlphabetIndexer.debugLine("entry/src/main/ets/view/CityView.ets(132:9)", "entry");
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.height(CommonConstants.FULL_PERCENT);
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.selectedColor({ "id": 16777415, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.popupColor({ "id": 16777414, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.selectedBackgroundColor({ "id": 16777416, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.popupBackground({ "id": 16777413, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.popupPosition({ x: { "id": 16777377, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, y: { "id": 16777378, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.usingPopup(true);
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.selectedFont({ size: { "id": 16777383, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, weight: FontWeight.Bolder });
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.popupFont({ size: { "id": 16777376, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, weight: FontWeight.Bolder });
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.alignStyle(IndexerAlign.Right);
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.itemSize(CommonConstants.ITEM_SIZE);
            // [Start alphabet_indexer]
            // CityView.ets
            AlphabetIndexer.onSelect((tabIndex: number) => {
                this.scroller.scrollToIndex(tabIndex);
            });
        }, AlphabetIndexer);
        Stack.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
