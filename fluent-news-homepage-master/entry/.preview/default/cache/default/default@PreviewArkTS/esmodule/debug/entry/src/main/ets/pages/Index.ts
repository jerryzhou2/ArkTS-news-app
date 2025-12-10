if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    currentBreakpoint?: string;
    status?: boolean;
}
import geoLocationManager from "@ohos:geoLocationManager";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { BreakpointConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
import { Home } from "@bundle:com.example.newsdemo/entry/ets/view/Home";
import i18n from "@ohos:i18n";
// [Start location_change]
// Index.ets
let locationChange: (err: BusinessError, location: geoLocationManager.Location) => void = (err, location) => {
    if (err) {
        hilog.error(0x00000, 'locationChanger: err=', JSON.stringify(err));
    }
    if (location) {
        let reverseGeocodeRequest: geoLocationManager.ReverseGeoCodeRequest = {
            'latitude': location.latitude,
            'longitude': location.longitude,
            'maxItems': CommonConstants.MAX_ITEMS
        };
        geoLocationManager.getAddressesFromLocation(reverseGeocodeRequest, (err, data) => {
            if (data) {
                hilog.info(0x00000, 'getAddressesFromLocation: data=', JSON.stringify(data));
                if (data[0].locality !== undefined) {
                    if (i18n.System.getSystemLanguage() === 'zh-Hans') {
                        AppStorage.setOrCreate('local', data[0].locality.replace(/"/g, '').slice(0, -1));
                        AppStorage.setOrCreate('currentLocal', data[0].locality.replace(/"/g, '').slice(0, -1));
                    }
                    else {
                        AppStorage.setOrCreate('local', data[0].locality.replace(/"/g, ''));
                        AppStorage.setOrCreate('currentLocal', data[0].locality.replace(/"/g, ''));
                    }
                }
            }
        });
    }
};
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentBreakpoint");
        this.__status = new ObservedPropertySimplePU(true, this, "status");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.status !== undefined) {
            this.status = params.status;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__status.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__status.aboutToBeDeleted();
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
    private __status: ObservedPropertySimplePU<boolean>;
    get status() {
        return this.__status.get();
    }
    set status(newValue: boolean) {
        this.__status.set(newValue);
    }
    // [Start on_page_show]
    // Index.ets
    onPageShow(): void {
        abilityAccessCtrl.createAtManager().requestPermissionsFromUser(this.getUIContext().getHostContext(), [
            'ohos.permission.LOCATION', 'ohos.permission.APPROXIMATELY_LOCATION'
        ]).then(() => {
            if (this.status) {
                geoLocationManager.getCurrentLocation(locationChange);
                this.status = false;
            }
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, 'Index', `requestPermissionsFromUser fail, code: ${err.code}, message: ${err.message}`);
        });
    }
    // [End on_page_show]
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                columns: {
                    sm: BreakpointConstants.GRID_ROW_COLUMNS[0],
                    md: BreakpointConstants.GRID_ROW_COLUMNS[1],
                    lg: BreakpointConstants.GRID_ROW_COLUMNS[2]
                }
            });
            GridRow.debugLine("entry/src/main/ets/pages/Index.ets(82:5)", "entry");
            GridRow.onBreakpointChange((breakPoint) => {
                this.currentBreakpoint = breakPoint;
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: {
                    sm: BreakpointConstants.GRID_COLUMN_SPANS[0],
                    md: BreakpointConstants.GRID_COLUMN_SPANS[1],
                    lg: BreakpointConstants.GRID_COLUMN_SPANS[4]
                }
            });
            GridCol.debugLine("entry/src/main/ets/pages/Index.ets(89:7)", "entry");
            GridCol.height(CommonConstants.FULL_PERCENT);
            GridCol.width(CommonConstants.FULL_PERCENT);
        }, GridCol);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Home(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 96, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Home" });
        }
        GridCol.pop();
        GridRow.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.newsdemo", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
