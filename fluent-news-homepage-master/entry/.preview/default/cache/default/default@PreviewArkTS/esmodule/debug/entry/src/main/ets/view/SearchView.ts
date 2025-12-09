if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SearchView_Params {
    searchList?: string[];
    isSearchState?: boolean;
    scroller?: Scroller;
}
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
export class SearchView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchList = new SynchedPropertyObjectTwoWayPU(params.searchList, this, "searchList");
        this.__isSearchState = new SynchedPropertySimpleTwoWayPU(params.isSearchState, this, "isSearchState");
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SearchView_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: SearchView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchList.purgeDependencyOnElmtId(rmElmtId);
        this.__isSearchState.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchList.aboutToBeDeleted();
        this.__isSearchState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __searchList: SynchedPropertySimpleOneWayPU<string[]>;
    get searchList() {
        return this.__searchList.get();
    }
    set searchList(newValue: string[]) {
        this.__searchList.set(newValue);
    }
    private __isSearchState: SynchedPropertySimpleTwoWayPU<boolean>;
    get isSearchState() {
        return this.__isSearchState.get();
    }
    set isSearchState(newValue: boolean) {
        this.__isSearchState.set(newValue);
    }
    private scroller: Scroller;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopEnd });
            Stack.debugLine("entry/src/main/ets/view/SearchView.ets(26:5)", "entry");
            Stack.width(CommonConstants.FULL_PERCENT);
            Stack.height(CommonConstants.FULL_PERCENT);
            Stack.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
            Stack.visibility(this.isSearchState ? Visibility.Visible : Visibility.None);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/SearchView.ets(27:7)", "entry");
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({
                space: CommonConstants.LIST_ITEM_SPACE,
                initialIndex: CommonConstants.ZERO,
                scroller: this.scroller
            });
            List.debugLine("entry/src/main/ets/view/SearchView.ets(28:9)", "entry");
            List.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
            List.edgeEffect(EdgeEffect.None);
            List.divider({
                strokeWidth: { "id": 16777362, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                color: { "id": 16777425, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                startMargin: { "id": 16777361, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                endMargin: { "id": 16777360, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
            List.listDirection(Axis.Vertical);
            List.sticky(StickyStyle.Header);
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
                        ListItem.debugLine("entry/src/main/ets/view/SearchView.ets(34:13)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/view/SearchView.ets(35:15)", "entry");
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(index);
                            Text.debugLine("entry/src/main/ets/view/SearchView.ets(36:17)", "entry");
                            Text.height({ "id": 16777381, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777386, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                            Text.onClick(() => {
                                AppStorage.setOrCreate('local', index);
                                this.getUIContext().getRouter().back();
                            });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.searchList, forEachItemGenFunction, (item: string) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
