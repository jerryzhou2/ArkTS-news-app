if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface newsItem_Params {
    currentBreakpoint?: string;
    newsTitle?: string | Resource;
    newsContent?: string | Resource;
    newsTime?: string | Resource;
    newsImage?: string | Resource;
    newsId?: string;
}
interface PullToRefreshNews_Params {
    newsData?: NewsDataSource;
    allNews?: NewsData[];
    firstIndex?: number;
    currentBreakpoint?: string;
    searchKeyword?: string;
    mockFlag?: boolean;
    scroller?: Scroller;
    ANIMATION_DURATION?: number;
    SWITCH_BUTTON?: number;
}
import util from "@ohos:util";
import type { BusinessError as BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { PullToRefresh } from "@package:pkg_modules/.ohpm/@ohos+pulltorefresh@2.1.3-rc.0/pkg_modules/@ohos/pulltorefresh/index";
import router from "@ohos:router";
import { BreakpointConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
import { BreakpointType } from "@bundle:com.example.newsdemo/entry/ets/utils/BreakpointType";
import NewsData from "@bundle:com.example.newsdemo/entry/ets/viewmodel/NewsData";
import { NewsDataSource } from "@bundle:com.example.newsdemo/entry/ets/viewmodel/NewsDataSource";
const uiContext: UIContext | undefined = AppStorage.get('uiContext');
const NEWS_TITLE_MAX_LINES: number = 1;
const NEWS_TITLE_TEXT_FONT_WEIGHT: number = 500;
const NEWS_CONTENT_MAX_LINES: number = 2;
const NEWS_TIME_MAX_LINES: number = 1;
const NEWS_RESOLVE_SUCCESS: string = uiContext!.getHostContext()!.resourceManager.getStringSync({ "id": 16777341, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id);
const NEWS_MOCK_DATA_COUNT: number = 8;
// [Start mock_data_file_one_dir]
// PullToRefreshNews.ets
const MOCK_DATA_FILE_ONE_DIR: string = uiContext!.getHostContext()!.resourceManager.getStringSync({ "id": 16777324, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id);
const MOCK_DATA_FILE_TWO_DIR: string = uiContext!.getHostContext()!.resourceManager.getStringSync({ "id": 16777325, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }.id);
// [End mock_data_file_one_dir]
const NEWS_REFRESH_TIME: number = 1000;
export class PullToRefreshNews extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__newsData = new ObservedPropertyObjectPU(new NewsDataSource(), this, "newsData");
        this.allNews = [];
        this.__firstIndex = new ObservedPropertySimplePU(0, this, "firstIndex");
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentBreakpoint");
        this.__searchKeyword = this.createStorageLink('searchKeyword', '', "searchKeyword");
        this.mockFlag = true;
        this.scroller = new Scroller();
        this.ANIMATION_DURATION = 500;
        this.SWITCH_BUTTON = 3;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("searchKeyword", this.onSearchKeywordChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PullToRefreshNews_Params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
        if (params.allNews !== undefined) {
            this.allNews = params.allNews;
        }
        if (params.firstIndex !== undefined) {
            this.firstIndex = params.firstIndex;
        }
        if (params.mockFlag !== undefined) {
            this.mockFlag = params.mockFlag;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.ANIMATION_DURATION !== undefined) {
            this.ANIMATION_DURATION = params.ANIMATION_DURATION;
        }
        if (params.SWITCH_BUTTON !== undefined) {
            this.SWITCH_BUTTON = params.SWITCH_BUTTON;
        }
    }
    updateStateVars(params: PullToRefreshNews_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newsData.purgeDependencyOnElmtId(rmElmtId);
        this.__firstIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__searchKeyword.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newsData.aboutToBeDeleted();
        this.__firstIndex.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__searchKeyword.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // [Start news_data]
    // PullToRefreshNews.ets
    private __newsData: ObservedPropertyObjectPU<NewsDataSource>;
    get newsData() {
        return this.__newsData.get();
    }
    set newsData(newValue: NewsDataSource) {
        this.__newsData.set(newValue);
    }
    // [End news_data]
    private allNews: NewsData[];
    private __firstIndex: ObservedPropertySimplePU<number>;
    get firstIndex() {
        return this.__firstIndex.get();
    }
    set firstIndex(newValue: number) {
        this.__firstIndex.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __searchKeyword: ObservedPropertyAbstractPU<string>;
    get searchKeyword() {
        return this.__searchKeyword.get();
    }
    set searchKeyword(newValue: string) {
        this.__searchKeyword.set(newValue);
    }
    private mockFlag: boolean;
    private scroller: Scroller;
    readonly ANIMATION_DURATION: number;
    readonly SWITCH_BUTTON: number;
    aboutToAppear() {
        let newsModelMockData: NewsData[] = getNews(MOCK_DATA_FILE_ONE_DIR);
        this.allNews = [];
        for (let j = CommonConstants.ZERO; j < NEWS_MOCK_DATA_COUNT; j++) {
            this.allNews.push(newsModelMockData[j]);
        }
        this.applyFilter();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(72:5)", "entry");
            Column.height({ "id": 16777334, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(73:7)", "entry");
            Column.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // [Start pull_to_refresh1]
                    // PullToRefreshNews.ets
                    PullToRefresh(this, {
                        data: this.__newsData,
                        scroller: this.scroller,
                        customList: () => {
                            this.getListView();
                        },
                        onRefresh: () => {
                            return new Promise<string>((resolve, reject) => {
                                // [StartExclude pull_to_refresh1]
                                setTimeout(() => {
                                    let newsModelMockData: NewsData[] = [];
                                    if (this.mockFlag) {
                                        newsModelMockData = getNews(MOCK_DATA_FILE_TWO_DIR);
                                    }
                                    else {
                                        newsModelMockData = getNews(MOCK_DATA_FILE_ONE_DIR);
                                    }
                                    this.mockFlag = !this.mockFlag;
                                    this.allNews = [];
                                    for (let j = CommonConstants.ZERO; j < NEWS_MOCK_DATA_COUNT; j++) {
                                        this.allNews.push(newsModelMockData[j]);
                                    }
                                    this.applyFilter();
                                    resolve(NEWS_RESOLVE_SUCCESS);
                                    // [EndExclude pull_to_refresh1]
                                }, NEWS_REFRESH_TIME);
                            });
                        },
                        onLoadMore: () => {
                            return new Promise<string>((resolve, reject) => {
                                // [StartExclude pull_to_refresh1]
                                setTimeout(() => {
                                    let newsModelMockData: NewsData[] = getNews(MOCK_DATA_FILE_ONE_DIR);
                                    for (let j = CommonConstants.ZERO; j < NEWS_MOCK_DATA_COUNT; j++) {
                                        this.allNews.push(newsModelMockData[j]);
                                    }
                                    this.applyFilter();
                                    resolve(NEWS_RESOLVE_SUCCESS);
                                }, NEWS_REFRESH_TIME);
                                // [EndExclude pull_to_refresh1]
                            });
                        },
                        customLoad: null,
                        customRefresh: null,
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/PullToRefreshNews.ets", line: 76, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            data: this.newsData,
                            scroller: this.scroller,
                            customList: () => {
                                this.getListView();
                            },
                            onRefresh: () => {
                                return new Promise<string>((resolve, reject) => {
                                    // [StartExclude pull_to_refresh1]
                                    setTimeout(() => {
                                        let newsModelMockData: NewsData[] = [];
                                        if (this.mockFlag) {
                                            newsModelMockData = getNews(MOCK_DATA_FILE_TWO_DIR);
                                        }
                                        else {
                                            newsModelMockData = getNews(MOCK_DATA_FILE_ONE_DIR);
                                        }
                                        this.mockFlag = !this.mockFlag;
                                        this.allNews = [];
                                        for (let j = CommonConstants.ZERO; j < NEWS_MOCK_DATA_COUNT; j++) {
                                            this.allNews.push(newsModelMockData[j]);
                                        }
                                        this.applyFilter();
                                        resolve(NEWS_RESOLVE_SUCCESS);
                                        // [EndExclude pull_to_refresh1]
                                    }, NEWS_REFRESH_TIME);
                                });
                            },
                            onLoadMore: () => {
                                return new Promise<string>((resolve, reject) => {
                                    // [StartExclude pull_to_refresh1]
                                    setTimeout(() => {
                                        let newsModelMockData: NewsData[] = getNews(MOCK_DATA_FILE_ONE_DIR);
                                        for (let j = CommonConstants.ZERO; j < NEWS_MOCK_DATA_COUNT; j++) {
                                            this.allNews.push(newsModelMockData[j]);
                                        }
                                        this.applyFilter();
                                        resolve(NEWS_RESOLVE_SUCCESS);
                                    }, NEWS_REFRESH_TIME);
                                    // [EndExclude pull_to_refresh1]
                                });
                            },
                            customLoad: null,
                            customRefresh: null
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PullToRefresh" });
        }
        Column.pop();
        Column.pop();
    }
    private getListView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomEnd });
            Stack.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(129:5)", "entry");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start news_title]
            // PullToRefreshNews.ets
            List.create({ space: CommonConstants.LIST_SPACE, scroller: this.scroller });
            List.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(132:7)", "entry");
            // [Start news_title]
            // PullToRefreshNews.ets
            List.onScrollIndex((first: number) => {
                this.firstIndex = first;
            });
            // [Start news_title]
            // PullToRefreshNews.ets
            List.width({ "id": 16777327, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // [Start news_title]
            // PullToRefreshNews.ets
            List.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // [Start news_title]
            // PullToRefreshNews.ets
            List.edgeEffect(EdgeEffect.None);
        }, List);
        {
            const __lazyForEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                        ListItem.backgroundColor({ "id": 16777299, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                        ListItem.margin({
                            bottom: { "id": 16777333, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                            left: new BreakpointType({ "id": 16777518, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777517, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777516, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }).getValue(this.currentBreakpoint),
                            right: new BreakpointType({ "id": 16777518, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777517, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777516, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }).getValue(this.currentBreakpoint),
                        });
                        ListItem.borderRadius({ "id": 16777369, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                        ListItem.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(134:11)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new newsItem(this, {
                                        // [StartExclude news_title]
                                        newsTitle: item.newsTitle,
                                        newsContent: item.newsContent,
                                        newsTime: item.newsTime,
                                        newsImage: item.newsImage,
                                        newsId: item.newsId // 添加这一行
                                        // [EndExclude news_title]
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/PullToRefreshNews.ets", line: 135, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            // [StartExclude news_title]
                                            newsTitle: item.newsTitle,
                                            newsContent: item.newsContent,
                                            newsTime: item.newsTime,
                                            newsImage: item.newsImage,
                                            newsId: item.newsId // 添加这一行
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "newsItem" });
                        }
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: NewsData, index?: number) => JSON.stringify(item) + index;
            LazyForEach.create("1", this, this.newsData, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        // [Start news_title]
        // PullToRefreshNews.ets
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(167:7)", "entry");
            Row.onClick(() => {
                if (this.firstIndex >= this.SWITCH_BUTTON) {
                    this.scroller.scrollTo({
                        xOffset: CommonConstants.ZERO,
                        yOffset: CommonConstants.ZERO,
                        animation: { duration: this.ANIMATION_DURATION, curve: Curve.LinearOutSlowIn }
                    });
                }
            });
            Row.visibility(this.firstIndex >= this.SWITCH_BUTTON ? Visibility.Visible : Visibility.None);
            Row.justifyContent(FlexAlign.Center);
            Row.width({ "id": 16777357, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Row.height({ "id": 16777357, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Row.backgroundColor({ "id": 16777303, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777356, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Row.margin({
                right: new BreakpointType({ "id": 16777518, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777517, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777516, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }).getValue(this.currentBreakpoint),
                bottom: { "id": 16777359, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(168:9)", "entry");
            Image.width({ "id": 16777358, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.height({ "id": 16777358, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.opacity({ "id": 16777515, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Stack.pop();
    }
    aboutToDisappear() {
        this.newsData.clear();
    }
    private applyFilter() {
        this.newsData.clear();
        const keyword: string = this.searchKeyword ? this.searchKeyword.trim().toLowerCase() : '';
        if (keyword === '') {
            for (let i = CommonConstants.ZERO; i < this.allNews.length; i++) {
                this.newsData.pushData(this.allNews[i]);
            }
            return;
        }
        for (let i = CommonConstants.ZERO; i < this.allNews.length; i++) {
            const item: NewsData = this.allNews[i];
            const title: string = String(item.newsTitle).toLowerCase();
            const content: string = String(item.newsContent).toLowerCase();
            if (title.indexOf(keyword) !== -1 || content.indexOf(keyword) !== -1) {
                this.newsData.pushData(item);
            }
        }
    }
    private onSearchKeywordChange() {
        this.applyFilter();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class newsItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentBreakpoint");
        this.newsTitle = '';
        this.newsContent = '';
        this.newsTime = '';
        this.newsImage = '';
        this.newsId = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: newsItem_Params) {
        if (params.newsTitle !== undefined) {
            this.newsTitle = params.newsTitle;
        }
        if (params.newsContent !== undefined) {
            this.newsContent = params.newsContent;
        }
        if (params.newsTime !== undefined) {
            this.newsTime = params.newsTime;
        }
        if (params.newsImage !== undefined) {
            this.newsImage = params.newsImage;
        }
        if (params.newsId !== undefined) {
            this.newsId = params.newsId;
        }
    }
    updateStateVars(params: newsItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // [StartExclude news_item]
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private newsTitle: string | Resource;
    private newsContent: string | Resource;
    private newsTime: string | Resource;
    private newsImage: string | Resource;
    private newsId: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(238:5)", "entry");
            Row.padding({
                left: { "id": 16777335, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                right: { "id": 16777335, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
            Row.height({ "id": 16777332, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Row.onClick(() => {
                // 跳转到新闻详情页
                router.pushUrl({
                    url: 'pages/NewsDetail',
                    params: {
                        newsData: {
                            newsId: this.newsId,
                            newsTitle: this.newsTitle,
                            newsContent: this.newsContent,
                            newsTime: this.newsTime,
                            newsImage: this.newsImage
                        }
                    }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(239:7)", "entry");
            Column.margin({ right: { "id": 16777328, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(240:9)", "entry");
            Row.alignItems(VerticalAlign.Center);
            Row.height({ "id": 16777338, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Row.width({ "id": 16777327, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Row.margin({ top: { "id": 16777339, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(241:11)", "entry");
            Image.width({ "id": 16777337, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.height({ "id": 16777336, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.objectFit(ImageFit.ScaleDown);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsTitle);
            Text.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(245:11)", "entry");
            Text.fontSize({ "id": 16777371, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.fontColor({ "id": 16777301, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
            Text.maxLines(NEWS_TITLE_MAX_LINES);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontWeight(NEWS_TITLE_TEXT_FONT_WEIGHT);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(258:9)", "entry");
            Row.layoutWeight(CommonConstants.LAYOUT_WEIGHT);
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsContent);
            Text.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(259:11)", "entry");
            Text.fontSize({ "id": 16777368, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.lineHeight({ "id": 16777367, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.fontColor({ "id": 16777300, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.width({ "id": 16777327, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.maxLines(NEWS_CONTENT_MAX_LINES);
            Text.margin({ top: { "id": 16777330, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.newsTime);
            Text.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(271:9)", "entry");
            Text.fontSize({ "id": 16777370, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.fontColor({ "id": 16777428, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.height({ "id": 16777329, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Text.textAlign(TextAlign.Start);
            Text.maxLines(NEWS_TIME_MAX_LINES);
            Text.margin({
                top: { "id": 16777330, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                bottom: { "id": 16777330, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
            });
            Text.textOverflow({ overflow: TextOverflow.None });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.newsImage !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": -1, "type": 30000, params: [`${this.newsImage}`], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/PullToRefreshNews.ets(288:9)", "entry");
                        Image.height({ "id": 16777320, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                        Image.width({ "id": 16777321, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                        Image.borderRadius({ "id": 16777513, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                        Image.margin({
                            top: { "id": 16777319, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" },
                            bottom: { "id": 16777319, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
// [End news_item]
class JsonNewsList {
    public newsList: NewsData[] = [];
}
class JsonNewsData {
    private jsonFileDir: string = '';
    constructor(jsonFileDir: string) {
        this.jsonFileDir = jsonFileDir;
    }
    getNewsData(): Array<NewsData> {
        let newsModelBuckets: NewsData[] = [];
        try {
            let value = uiContext!.getHostContext()!.resourceManager.getRawFileContentSync(this.jsonFileDir);
            let textDecoder = util.TextDecoder.create('utf-8', {
                ignoreBOM: true
            });
            let textDecoderResult = textDecoder.decodeToString(new Uint8Array(value.buffer));
            let jsonObj: JsonNewsList = JSON.parse(textDecoderResult) as JsonNewsList;
            let newsModelObj = jsonObj.newsList;
            for (let i = CommonConstants.ZERO; i < newsModelObj.length; i++) {
                let contactTemp = new NewsData(newsModelObj[i].newsId, newsModelObj[i].newsTitle, newsModelObj[i].newsContent, newsModelObj[i].newsTime, newsModelObj[i].newsImage);
                newsModelBuckets.push(contactTemp);
            }
        }
        catch (error) {
            let err = error as BusinessError;
            hilog.error(0x0000, 'JsonNewsData', `getRawFileContentSync failed, error code=${err.code}, message=${err.message}`);
        }
        return newsModelBuckets;
    }
}
function getNews(mockFileDir: string): Array<NewsData> {
    let jsonObj: JsonNewsData = new JsonNewsData(mockFileDir);
    let newsModelMockData: NewsData[] = jsonObj.getNewsData();
    return newsModelMockData;
}
