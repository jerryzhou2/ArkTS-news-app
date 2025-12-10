if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomeHeader_Params {
    currentBreakpoint?: string;
    topRectHeight?: number;
    location?: string;
    searchKeyword?: string;
}
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { BreakpointConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
import { ResourceUtil } from "@bundle:com.example.newsdemo/entry/ets/utils/ResourceUtil";
export class HomeHeader extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentBreakpoint");
        this.__topRectHeight = this.createStorageLink('topRectHeight', CommonConstants.ZERO, "topRectHeight");
        this.__location = this.createStorageProp('local', '', "location");
        this.__searchKeyword = this.createStorageLink('searchKeyword', '', "searchKeyword");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomeHeader_Params) {
    }
    updateStateVars(params: HomeHeader_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__location.purgeDependencyOnElmtId(rmElmtId);
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        this.__location.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    private __location: ObservedPropertyAbstractPU<string>;
    get location() {
        return this.__location.get();
    }
    set location(newValue: string) {
        this.__location.set(newValue);
    }
    private __searchKeyword: ObservedPropertyAbstractPU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/HomeHeader.ets(30:5)", "entry");
        }, Column);
        this.SearchBar.bind(this)();
        Column.pop();
    }
    getString(id: number): string {
        try {
            return this.getUIContext().getHostContext()!.resourceManager.getStringSync(id);
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x0000, 'HomeHeader', `getStringSync failed, error code=${err.code}, message=${err.message}`);
            return '';
        }
    }
    SearchBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/HomeHeader.ets(47:5)", "entry");
            Row.justifyContent(FlexAlign.Start);
            Row.width(CommonConstants.FULL_PERCENT);
            Row.margin({
                top: { "id": 16777520, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                bottom: { "id": 16777520, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777412, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/HomeHeader.ets(48:7)", "entry");
            Image.width({ "id": 16777514, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.height({ "id": 16777514, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.margin({
                left: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 16777524, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } : { "id": 16777522, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                right: { "id": 16777523, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
            Image.onClick(() => {
                this.getUIContext().getRouter().pushUrl({
                    url: 'pages/CitySearch'
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.location === '' ? this.getString({ "id": 16777316, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id) : this.location);
            Text.debugLine("entry/src/main/ets/view/HomeHeader.ets(62:7)", "entry");
            Text.height(ResourceUtil.getCommonImgSize()[0]);
            Text.onClick(() => {
                this.getUIContext().getRouter().pushUrl({
                    url: 'pages/CitySearch'
                });
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Start });
            Stack.debugLine("entry/src/main/ets/view/HomeHeader.ets(70:7)", "entry");
            Stack.alignSelf(ItemAlign.Start);
            Stack.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
            Stack.padding({ left: { "id": 16777521, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.searchKeyword, placeholder: { "id": 16777342, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/view/HomeHeader.ets(71:9)", "entry");
            TextInput.placeholderFont({
                size: { "id": 16777526, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                weight: FontWeight.Normal
            });
            TextInput.backgroundColor(ResourceUtil.getCommonBackgroundColor()[1]);
            TextInput.placeholderColor({ "id": 16777568, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            TextInput.height({ "id": 16777527, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            TextInput.fontSize({ "id": 16777526, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            TextInput.padding({
                left: { "id": 16777528, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                right: { "id": 16777529, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
            TextInput.border({ width: { "id": 16777354, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            TextInput.width({ "id": 16777317, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            TextInput.enableKeyboardOnFocus(false);
            TextInput.onChange((value: string) => {
                this.searchKeyword = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Search image.
            Image.create({ "id": 16777308, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/HomeHeader.ets(92:9)", "entry");
            // Search image.
            Image.width({ "id": 16777525, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // Search image.
            Image.height({ "id": 16777525, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // Search image.
            Image.margin({ left: { "id": 16777521, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Image);
        Stack.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
