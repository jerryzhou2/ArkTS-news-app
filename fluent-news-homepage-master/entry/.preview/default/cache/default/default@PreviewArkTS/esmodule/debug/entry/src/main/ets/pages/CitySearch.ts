if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CitySearch_Params {
    changeValue?: string;
    placeholder?: string;
    isSearchState?: boolean;
    searchList?: string[];
    controller?: SearchController;
}
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { ALL_CITY2, CITY_DATA } from "@bundle:com.example.newsdemo/entry/ets/viewmodel/CityDetailData";
import { SearchView } from "@bundle:com.example.newsdemo/entry/ets/view/SearchView";
import { CityView } from "@bundle:com.example.newsdemo/entry/ets/view/CityView";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
class CitySearch extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__changeValue = new ObservedPropertySimplePU('', this, "changeValue");
        this.__placeholder = new ObservedPropertySimplePU(this.getUIContext().getHostContext()!.resourceManager.getStringSync({ "id": 16777340, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id), this, "placeholder");
        this.__isSearchState = new ObservedPropertySimplePU(false, this, "isSearchState");
        this.__searchList = new ObservedPropertyObjectPU([], this, "searchList");
        this.controller = new SearchController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CitySearch_Params) {
        if (params.changeValue !== undefined) {
            this.changeValue = params.changeValue;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.isSearchState !== undefined) {
            this.isSearchState = params.isSearchState;
        }
        if (params.searchList !== undefined) {
            this.searchList = params.searchList;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: CitySearch_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__changeValue.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholder.purgeDependencyOnElmtId(rmElmtId);
        this.__isSearchState.purgeDependencyOnElmtId(rmElmtId);
        this.__searchList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__changeValue.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__isSearchState.aboutToBeDeleted();
        this.__searchList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __changeValue: ObservedPropertySimplePU<string>;
    get changeValue() {
        return this.__changeValue.get();
    }
    set changeValue(newValue: string) {
        this.__changeValue.set(newValue);
    }
    private __placeholder: ObservedPropertySimplePU<string>;
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __isSearchState: ObservedPropertySimplePU<boolean>;
    get isSearchState() {
        return this.__isSearchState.get();
    }
    set isSearchState(newValue: boolean) {
        this.__isSearchState.set(newValue);
    }
    private __searchList: ObservedPropertyObjectPU<string[]>;
    get searchList() {
        return this.__searchList.get();
    }
    set searchList(newValue: string[]) {
        this.__searchList.set(newValue);
    }
    private controller: SearchController;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CitySearch.ets(44:5)", "entry");
            Column.width(CommonConstants.FULL_PERCENT);
            Column.padding({ left: { "id": 16777373, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777296, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Start);
            Column.height(CommonConstants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Search box.
            Search.create({ value: this.changeValue, placeholder: this.placeholder, controller: this.controller });
            Search.debugLine("entry/src/main/ets/pages/CitySearch.ets(46:7)", "entry");
            // Search box.
            Search.searchButton(this.getString({ "id": 16777342, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id));
            // Search box.
            Search.width(CommonConstants.FULL_PERCENT);
            // Search box.
            Search.height({ "id": 16777380, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // Search box.
            Search.margin({ top: { "id": 16777382, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            // Search box.
            Search.backgroundColor({ "id": 16777429, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // Search box.
            Search.placeholderColor(Color.Grey);
            // Search box.
            Search.placeholderFont({
                size: { "id": 16777375, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                weight: CommonConstants.FONT_WEIGHT_400
            });
            // Search box.
            Search.textFont({
                size: { "id": 16777375, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                weight: CommonConstants.FONT_WEIGHT_400
            });
            // Search box.
            Search.onSubmit((value: string) => {
                if (value.length === 0) {
                    value = this.placeholder;
                }
                this.changeValue = value;
                this.isSearchState = true;
                this.searchCityList(value);
            });
            // Search box.
            Search.onChange((value: string) => {
                this.changeValue = value;
                this.searchCityList(value);
                if (value.length === 0) {
                    this.isSearchState = false;
                    this.searchList.splice(0, this.searchList.length);
                }
            });
        }, Search);
        // Search box.
        Search.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ top: { "id": 16777365, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // City list component.
                    CityView(this, { isSearchState: this.__isSearchState }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CitySearch.ets", line: 79, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isSearchState: this.isSearchState
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "CityView" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(CommonConstants.FULL_PERCENT);
            __Common__.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // Search component, passing data to the search list.
                    SearchView(this, {
                        searchList: this.__searchList,
                        isSearchState: this.__isSearchState
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CitySearch.ets", line: 83, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            searchList: this.searchList,
                            isSearchState: this.isSearchState
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SearchView" });
        }
        __Common__.pop();
        Column.pop();
    }
    // Display logic for searching for a city.
    searchCityList(value: string): void {
        let cityNames: string[] = [];
        ALL_CITY2.forEach(item => {
            if (item.name === value) {
                item.city.forEach(city => {
                    cityNames.push(city);
                });
            }
            this.searchList = cityNames;
            return;
        });
        CITY_DATA.forEach(item => {
            item.city.forEach(city => {
                if (city.includes(value)) {
                    cityNames.push(city);
                }
            });
        });
        this.searchList = cityNames;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CitySearch";
    }
}
// Create the WrappedBuilder object and construct the page during dynamic route jumping.
export function getCitySearch(parent = null): void {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new CitySearch(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CitySearch.ets", line: 124, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "CitySearch" });
    }
}
registerNamedRoute(() => new CitySearch(undefined, {}), "", { bundleName: "com.example.newsdemo", moduleName: "entry", pagePath: "pages/CitySearch", pageFullPath: "entry/src/main/ets/pages/CitySearch", integratedHsp: "false", moduleType: "followWithHap" });
