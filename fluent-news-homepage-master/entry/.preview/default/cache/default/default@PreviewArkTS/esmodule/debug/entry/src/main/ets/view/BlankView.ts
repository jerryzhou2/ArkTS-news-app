if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface BlankView_Params {
}
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
export class BlankView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BlankView_Params) {
    }
    updateStateVars(params: BlankView_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/BlankView.ets(21:5)", "entry");
            Column.justifyContent(FlexAlign.Center);
            Column.width(CommonConstants.FULL_PERCENT);
            Column.height(CommonConstants.FULL_PERCENT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777355, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/BlankView.ets(22:7)", "entry");
            Image.width({ "id": 16777488, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.height({ "id": 16777486, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777313, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/view/BlankView.ets(25:7)", "entry");
            Text.fontSize({ "id": 16777485, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.opacity(0.3);
            Text.margin({ top: { "id": 16777487, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
