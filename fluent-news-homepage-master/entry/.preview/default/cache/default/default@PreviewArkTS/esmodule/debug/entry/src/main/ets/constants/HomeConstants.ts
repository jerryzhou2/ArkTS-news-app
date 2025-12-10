import type NewsTypeModel from '../viewmodel/NewsTypeModel';
export class HomeConstants {
    /**
     * TabBars un select text font weight.
     */
    public static readonly TAB_BARS_UN_SELECT_TEXT_FONT_WEIGHT: number = 400;
    /**
     * TabBars select text font weight.
     */
    public static readonly TAB_BARS_SELECT_TEXT_FONT_WEIGHT: number = 700;
    /**
     * TabBars bar height.
     */
    public static readonly TAB_BARS_BAR_HEIGHT: string = '3.6%';
    /**
     * TabBars horizontal padding.
     */
    public static readonly TAB_BARS_HORIZONTAL_PADDING: string = '2.2%';
    /**
     * TabBars bar width.
     */
    public static readonly TAB_BARS_BAR_WIDTH: string = '100%';
    /**
     * TabBars default news types.
     */
    public static readonly TAB_BARS_DEFAULT_NEWS_TYPES: NewsTypeModel[] = [
        { id: 0, name: { "id": 16777346, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } },
        { id: 1, name: { "id": 16777347, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } },
        { id: 2, name: { "id": 16777348, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } },
        { id: 3, name: { "id": 16777349, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } },
        { id: 4, name: { "id": 16777350, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } },
        { id: 5, name: { "id": 16777351, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } },
        { id: 6, name: { "id": 16777352, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } },
        { id: 7, name: { "id": 16777353, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } }
    ];
}
