import { BreakpointType } from "@bundle:com.example.newsdemo/entry/ets/utils/BreakpointType";
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
export class ResourceUtil {
    /**
     * Page column padding.
     */
    private static pageColPadding: BreakpointType<Resource> = new BreakpointType({ "id": 16777518, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777517, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777516, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
    /**
     * Common image size list.
     */
    private static commonImgSize: Resource[] = [{ "id": 16777501, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777504, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777505, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777506, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777507, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777508, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777509, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777510, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777511, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777502, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777503, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }];
    /**
     * Common background color list.
     */
    private static commonBackgroundColor: Resource[] = [{ "id": 16777417, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777418, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777419, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }];
    /**
     * Common border color list.
     */
    private static commonBorderColorList: Resource[] = [{ "id": 16777420, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777421, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777422, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777423, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }];
    /**
     * Common divider color.
     */
    private static commonDividerColor: Resource = { "id": 16777424, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" };
    /**
     * Common border radius list.
     */
    private static commonBorderRadius: Resource[] = [{ "id": 16777491, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777493, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777494, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777495, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777496, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777497, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777498, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777499, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777500, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777492, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }];
    static getPageColPadding(): BreakpointType<Resource> {
        return ResourceUtil.pageColPadding;
    }
    static getCommonImgSize(): Resource[] {
        return ResourceUtil.commonImgSize;
    }
    static getCommonBackgroundColor(): Resource[] {
        return ResourceUtil.commonBackgroundColor;
    }
    static getCommonBorderColor(): Resource[] {
        return ResourceUtil.commonBorderColorList;
    }
    static getCommonDividerColor(): Resource {
        return ResourceUtil.commonDividerColor;
    }
    static getCommonBorderRadius(): Resource[] {
        return ResourceUtil.commonBorderRadius;
    }
    static getLottiePath(name: string, currentMode: number): string {
        return currentMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK ?
            `common/lottie/dark/${name}.json` : // 深色模式路径
            `common/lottie/light/${name}.json`; // 浅色模式路径
    }
}
