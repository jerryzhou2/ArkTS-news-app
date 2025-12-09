if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NewsDetail_Params {
    newsItem?: NewsData;
    currentBreakpoint?: string;
    likeToastController?: CustomDialogController;
    collectToastController?: CustomDialogController;
}
interface CommentBar_Params {
    isShowSheet?: boolean;
    comment?: string;
    customHeight?: number;
    isStateEffect?: boolean;
    num?: number;
    heartFlag?: boolean;
    collectFlag?: boolean;
    newsItem?: NewsData;
    likeToastController?: CustomDialogController;
    collectToastController?: CustomDialogController;
    textAreaController?: TextAreaController;
}
interface CommentItem_Params {
    comment?: CommentData;
}
interface CollectToast_Params {
    isCollected?: boolean;
    controller?: CustomDialogController;
}
interface LikeToast_Params {
    isLiked?: boolean;
    controller?: CustomDialogController;
}
import NewsData from "@bundle:com.example.newsdemo/entry/ets/viewmodel/NewsData";
import { CommonConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/CommonConstants";
import { BreakpointConstants } from "@bundle:com.example.newsdemo/entry/ets/constants/BreakpointConstants";
import { BreakpointType } from "@bundle:com.example.newsdemo/entry/ets/utils/BreakpointType";
import router from "@ohos:router";
class LikeToast extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isLiked = new SynchedPropertySimpleOneWayPU(params.isLiked, this, "isLiked");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LikeToast_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: LikeToast_Params) {
        this.__isLiked.reset(params.isLiked);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isLiked.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isLiked.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isLiked: SynchedPropertySimpleOneWayPU<boolean>;
    get isLiked() {
        return this.__isLiked.get();
    }
    set isLiked(newValue: boolean) {
        this.__isLiked.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsDetail.ets(28:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLiked) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                        Row.debugLine("entry/src/main/ets/pages/NewsDetail.ets(30:9)", "entry");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777580, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(31:11)", "entry");
                        Image.width(17);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('点赞成功');
                        Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(33:11)", "entry");
                        Text.fontSize(14);
                        Text.fontWeight(400);
                        Text.height('40vp');
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('取消点赞');
                        Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(39:9)", "entry");
                        Text.fontSize(14);
                        Text.fontWeight(400);
                        Text.height('40vp');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CollectToast extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isCollected = new SynchedPropertySimpleOneWayPU(params.isCollected, this, "isCollected");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CollectToast_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: CollectToast_Params) {
        this.__isCollected.reset(params.isCollected);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isCollected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isCollected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isCollected: SynchedPropertySimpleOneWayPU<boolean>;
    get isCollected() {
        return this.__isCollected.get();
    }
    set isCollected(newValue: boolean) {
        this.__isCollected.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsDetail.ets(54:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isCollected) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('收藏成功');
                        Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(56:9)", "entry");
                        Text.height('40vp');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('取消收藏');
                        Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(59:9)", "entry");
                        Text.height('40vp');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CommentItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__comment = new SynchedPropertyObjectOneWayPU(params.comment, this, "comment");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommentItem_Params) {
    }
    updateStateVars(params: CommentItem_Params) {
        this.__comment.reset(params.comment);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__comment.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__comment.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __comment: SynchedPropertySimpleOneWayPU<CommentData>;
    get comment() {
        return this.__comment.get();
    }
    set comment(newValue: CommentData) {
        this.__comment.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/NewsDetail.ets(71:5)", "entry");
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户头像占位符
            Circle.create();
            Circle.debugLine("entry/src/main/ets/pages/NewsDetail.ets(73:7)", "entry");
            // 用户头像占位符
            Circle.width(40);
            // 用户头像占位符
            Circle.height(40);
            // 用户头像占位符
            Circle.backgroundColor({ "id": 16777302, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 用户头像占位符
            Circle.margin({ right: 12 });
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsDetail.ets(79:7)", "entry");
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名和时间
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/NewsDetail.ets(81:9)", "entry");
            // 用户名和时间
            Row.width('100%');
            // 用户名和时间
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.comment.author);
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(82:11)", "entry");
            Text.fontSize(14);
            Text.fontWeight(500);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.comment.time);
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(86:11)", "entry");
            Text.fontSize(12);
            Text.fontColor('#888');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 用户名和时间
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评论内容
            Text.create(this.comment.content);
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(95:9)", "entry");
            // 评论内容
            Text.fontSize(14);
            // 评论内容
            Text.margin({ top: 4 });
            // 评论内容
            Text.width('100%');
            // 评论内容
            Text.textAlign(TextAlign.Start);
        }, Text);
        // 评论内容
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class CommentBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isShowSheet = new ObservedPropertySimplePU(false, this, "isShowSheet");
        this.__comment = new ObservedPropertySimplePU('', this, "comment");
        this.__customHeight = new ObservedPropertySimplePU(320, this, "customHeight");
        this.__isStateEffect = new ObservedPropertySimplePU(false, this, "isStateEffect");
        this.__num = new ObservedPropertySimplePU(0.3, this, "num");
        this.__heartFlag = new ObservedPropertySimplePU(false, this, "heartFlag");
        this.__collectFlag = new ObservedPropertySimplePU(false, this, "collectFlag");
        this.__newsItem = new SynchedPropertyObjectOneWayPU(params.newsItem, this, "newsItem");
        this.likeToastController = new CustomDialogController({
            builder: () => {
                let jsDialog = new LikeToast(this, { isLiked: false }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/NewsDetail.ets", line: 120, col: 14 });
                jsDialog.setController(this.likeToastController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        isLiked: false
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            width: '30%',
            height: '40vp',
            offset: { dx: 0, dy: -80 },
            maskColor: Color.Transparent,
            shadow: ShadowStyle.OUTER_DEFAULT_MD
        }, this);
        this.collectToastController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CollectToast(this, { isCollected: false }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/NewsDetail.ets", line: 130, col: 14 });
                jsDialog.setController(this.collectToastController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        isCollected: false
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            width: '30%',
            height: '40vp',
            offset: { dx: 0, dy: -80 },
            maskColor: Color.Transparent,
            shadow: ShadowStyle.OUTER_DEFAULT_MD
        }, this);
        this.textAreaController = new TextAreaController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommentBar_Params) {
        if (params.isShowSheet !== undefined) {
            this.isShowSheet = params.isShowSheet;
        }
        if (params.comment !== undefined) {
            this.comment = params.comment;
        }
        if (params.customHeight !== undefined) {
            this.customHeight = params.customHeight;
        }
        if (params.isStateEffect !== undefined) {
            this.isStateEffect = params.isStateEffect;
        }
        if (params.num !== undefined) {
            this.num = params.num;
        }
        if (params.heartFlag !== undefined) {
            this.heartFlag = params.heartFlag;
        }
        if (params.collectFlag !== undefined) {
            this.collectFlag = params.collectFlag;
        }
        if (params.likeToastController !== undefined) {
            this.likeToastController = params.likeToastController;
        }
        if (params.collectToastController !== undefined) {
            this.collectToastController = params.collectToastController;
        }
        if (params.textAreaController !== undefined) {
            this.textAreaController = params.textAreaController;
        }
    }
    updateStateVars(params: CommentBar_Params) {
        this.__newsItem.reset(params.newsItem);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShowSheet.purgeDependencyOnElmtId(rmElmtId);
        this.__comment.purgeDependencyOnElmtId(rmElmtId);
        this.__customHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__isStateEffect.purgeDependencyOnElmtId(rmElmtId);
        this.__num.purgeDependencyOnElmtId(rmElmtId);
        this.__heartFlag.purgeDependencyOnElmtId(rmElmtId);
        this.__collectFlag.purgeDependencyOnElmtId(rmElmtId);
        this.__newsItem.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShowSheet.aboutToBeDeleted();
        this.__comment.aboutToBeDeleted();
        this.__customHeight.aboutToBeDeleted();
        this.__isStateEffect.aboutToBeDeleted();
        this.__num.aboutToBeDeleted();
        this.__heartFlag.aboutToBeDeleted();
        this.__collectFlag.aboutToBeDeleted();
        this.__newsItem.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isShowSheet: ObservedPropertySimplePU<boolean>;
    get isShowSheet() {
        return this.__isShowSheet.get();
    }
    set isShowSheet(newValue: boolean) {
        this.__isShowSheet.set(newValue);
    }
    private __comment: ObservedPropertySimplePU<string>;
    get comment() {
        return this.__comment.get();
    }
    set comment(newValue: string) {
        this.__comment.set(newValue);
    }
    private __customHeight: ObservedPropertySimplePU<number>;
    get customHeight() {
        return this.__customHeight.get();
    }
    set customHeight(newValue: number) {
        this.__customHeight.set(newValue);
    }
    private __isStateEffect: ObservedPropertySimplePU<boolean>;
    get isStateEffect() {
        return this.__isStateEffect.get();
    }
    set isStateEffect(newValue: boolean) {
        this.__isStateEffect.set(newValue);
    }
    private __num: ObservedPropertySimplePU<number>;
    get num() {
        return this.__num.get();
    }
    set num(newValue: number) {
        this.__num.set(newValue);
    }
    private __heartFlag: ObservedPropertySimplePU<boolean>;
    get heartFlag() {
        return this.__heartFlag.get();
    }
    set heartFlag(newValue: boolean) {
        this.__heartFlag.set(newValue);
    }
    private __collectFlag: ObservedPropertySimplePU<boolean>;
    get collectFlag() {
        return this.__collectFlag.get();
    }
    set collectFlag(newValue: boolean) {
        this.__collectFlag.set(newValue);
    }
    private __newsItem: SynchedPropertySimpleOneWayPU<NewsData>; // 使用@Prop装饰器接收父组件传递的newsItem
    get newsItem() {
        return this.__newsItem.get();
    }
    set newsItem(newValue: NewsData) {
        this.__newsItem.set(newValue);
    }
    private likeToastController: CustomDialogController;
    private collectToastController: CustomDialogController;
    private textAreaController: TextAreaController;
    // 点赞功能
    private toggleLike() {
        this.newsItem.isLiked = !this.newsItem.isLiked;
        if (this.newsItem.isLiked) {
            this.newsItem.likes++;
        }
        else {
            this.newsItem.likes--;
        }
        // 显示点赞提示
        // 更新对话框控制器，传入当前最新的点赞状态
        this.likeToastController = new CustomDialogController({
            builder: () => {
                let jsDialog = new LikeToast(this, { isLiked: this.newsItem.isLiked }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/NewsDetail.ets", line: 153, col: 16 });
                jsDialog.setController(
                // 显示点赞提示
                // 更新对话框控制器，传入当前最新的点赞状态
                this.likeToastController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        isLiked: this.newsItem.isLiked
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            width: '30%',
            height: '40vp',
            offset: { dx: 0, dy: -80 },
            maskColor: Color.Transparent,
            shadow: ShadowStyle.OUTER_DEFAULT_MD
        }, this);
        this.likeToastController.open();
    }
    // 收藏功能
    private toggleCollect() {
        this.newsItem.isCollected = !this.newsItem.isCollected;
        // 显示收藏提示
        // 更新对话框控制器，传入当前最新的收藏状态
        this.collectToastController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CollectToast(this, { isCollected: this.newsItem.isCollected }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/NewsDetail.ets", line: 171, col: 16 });
                jsDialog.setController(
                // 显示收藏提示
                // 更新对话框控制器，传入当前最新的收藏状态
                this.collectToastController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        isCollected: this.newsItem.isCollected
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            width: '30%',
            height: '40vp',
            offset: { dx: 0, dy: -80 },
            maskColor: Color.Transparent,
            shadow: ShadowStyle.OUTER_DEFAULT_MD
        }, this);
        this.collectToastController.open();
    }
    // 分享功能
    private shareNews() {
        this.newsItem.shares++;
        // 这里可以添加实际的分享逻辑
        console.log('分享新闻:', this.newsItem.newsTitle);
        // 显示分享提示
        this.getUIContext().getPromptAction().showToast({
            message: '分享成功',
            duration: 2000
        });
    }
    CommentSheet(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsDetail.ets(197:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '我来说两句...', text: this.comment, controller: this.textAreaController });
            TextArea.debugLine("entry/src/main/ets/pages/NewsDetail.ets(198:7)", "entry");
            TextArea.backgroundColor(Color.White);
            TextArea.maxLength(300);
            TextArea.height(160);
            TextArea.margin({ left: 16, right: 16 });
            TextArea.showCounter(true, { thresholdPercentage: 0, highlightBorder: true });
            TextArea.onFocus(() => {
                this.customHeight = 500;
            });
            TextArea.onBlur(() => {
                this.customHeight = 300;
            });
            TextArea.onChange((value: string) => {
                this.comment = value;
                if (value !== null && value !== '') {
                    this.isStateEffect = true;
                    this.num = 1;
                }
                else {
                    this.num = 0.4;
                }
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/NewsDetail.ets(220:7)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.End);
            Row.offset({ x: -30, y: -20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('0/300');
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(221:9)", "entry");
            Text.fontSize(10);
            Text.fontWeight(500);
            Text.fontColor('rgba(0, 0, 0, 0.4)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/NewsDetail.ets(230:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('提交', { type: ButtonType.Capsule, stateEffect: this.isStateEffect });
            Button.debugLine("entry/src/main/ets/pages/NewsDetail.ets(231:9)", "entry");
            Button.opacity(this.num);
            Button.width('100%');
            Button.margin({ top: 6 });
            Button.fontColor(Color.White);
            Button.borderRadius(20);
            Button.backgroundColor(Color.Red);
            Button.onClick(() => {
                if (this.comment === null || this.comment === '' || this.comment.trim() === '') {
                    this.getUIContext().getPromptAction().showToast({
                        message: '请输入内容再提交',
                        offset: { dx: 0, dy: -200 }
                    });
                }
                else {
                    this.isShowSheet = false;
                    this.newsItem.comments++;
                    // 这里应该添加实际的评论存储逻辑
                    console.log('评论内容:', ObservedObject.GetRawObject(this.comment));
                    this.comment = '';
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/NewsDetail.ets(259:5)", "entry");
            Row.height(88);
            Row.backgroundColor('#F1F2F3');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '写评论' });
            TextArea.debugLine("entry/src/main/ets/pages/NewsDetail.ets(260:7)", "entry");
            TextArea.height(32);
            TextArea.backgroundColor(Color.White);
            TextArea.width('60%');
            TextArea.focusOnTouch(false);
            TextArea.margin({ left: 16, top: 8, bottom: 8 });
            TextArea.bindSheet(this.isShowSheet, { builder: () => {
                    this.CommentSheet.call(this);
                } }, {
                height: this.customHeight,
                dragBar: false,
                maskColor: Color.Transparent,
                title: { title: '写评论' },
                onDisappear: () => {
                },
                onWillDismiss: (() => {
                    this.isShowSheet = false;
                })
            });
            TextArea.onClick(() => {
                this.isShowSheet = true;
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/NewsDetail.ets(281:7)", "entry");
            Flex.width('40%');
            Flex.margin({ top: 8, bottom: 8, right: 16 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777393, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(282:9)", "entry");
            Image.width(17);
            Image.margin({ right: 18 });
            Image.onClick(() => {
                // 跳转到评论页面
                router.pushUrl({
                    url: 'pages/CommentPage',
                    params: {
                        newsData: this.newsItem
                    }
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.newsItem.isLiked ? { "id": 16777583, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } : { "id": 16777591, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(295:9)", "entry");
            Image.width(17);
            Image.margin({ right: 18 });
            Image.onClick(() => {
                this.toggleLike();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.newsItem.isCollected ? { "id": 16777582, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } : { "id": 16777581, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(302:9)", "entry");
            Image.width(17);
            Image.margin({ right: 18 });
            Image.onClick(() => {
                this.toggleCollect();
            });
        }, Image);
        Flex.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
// 评论数据模型
class CommentData {
    author: string;
    content: string;
    time: string;
    constructor(author: string, content: string, time: string) {
        this.author = author;
        this.content = content;
        this.time = time;
    }
}
class NewsDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__newsItem = new ObservedPropertyObjectPU(new NewsData(), this, "newsItem");
        this.__currentBreakpoint = this.createStorageLink('currentBreakpoint', BreakpointConstants.BREAKPOINT_LG, "currentBreakpoint");
        this.likeToastController = new CustomDialogController({
            builder: () => {
                let jsDialog = new LikeToast(this, { isLiked: false }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/NewsDetail.ets", line: 337, col: 14 });
                jsDialog.setController(this.likeToastController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        isLiked: false
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            width: '30%',
            height: '40vp',
            offset: { dx: 0, dy: -80 },
            maskColor: Color.Transparent,
            shadow: ShadowStyle.OUTER_DEFAULT_MD
        }, this);
        this.collectToastController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CollectToast(this, { isCollected: false }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/NewsDetail.ets", line: 347, col: 14 });
                jsDialog.setController(this.collectToastController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        isCollected: false
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            width: '30%',
            height: '40vp',
            offset: { dx: 0, dy: -80 },
            maskColor: Color.Transparent,
            shadow: ShadowStyle.OUTER_DEFAULT_MD
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NewsDetail_Params) {
        if (params.newsItem !== undefined) {
            this.newsItem = params.newsItem;
        }
        if (params.likeToastController !== undefined) {
            this.likeToastController = params.likeToastController;
        }
        if (params.collectToastController !== undefined) {
            this.collectToastController = params.collectToastController;
        }
    }
    updateStateVars(params: NewsDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newsItem.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newsItem.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __newsItem: ObservedPropertyObjectPU<NewsData>;
    get newsItem() {
        return this.__newsItem.get();
    }
    set newsItem(newValue: NewsData) {
        this.__newsItem.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private likeToastController: CustomDialogController;
    private collectToastController: CustomDialogController;
    aboutToAppear(): void {
        // 获取传递过来的参数
        let params: Object = router.getParams();
        if (Reflect.has(params, 'newsData')) {
            let data: Object = Reflect.get(params, 'newsData');
            // 由于通过路由传递的对象会失去类型信息，我们需要重新构造NewsData对象
            this.newsItem = new NewsData(Reflect.get(data, 'newsId') as string, Reflect.get(data, 'newsTitle') as string | Resource, Reflect.get(data, 'newsContent') as string | Resource, Reflect.get(data, 'newsTime') as string | Resource, Reflect.get(data, 'newsImage') as string | Resource, Reflect.get(data, 'likes') as number || 0, Reflect.get(data, 'comments') as number || 0, Reflect.get(data, 'shares') as number || 0, Reflect.get(data, 'isLiked') as boolean || false, Reflect.get(data, 'isCollected') as boolean || false, Reflect.get(data, 'isFollowed') as boolean || false);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column });
            Flex.debugLine("entry/src/main/ets/pages/NewsDetail.ets(380:5)", "entry");
            Flex.height('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsDetail.ets(382:7)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
            Flex.debugLine("entry/src/main/ets/pages/NewsDetail.ets(383:9)", "entry");
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777579, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(384:11)", "entry");
            Image.width(42);
            Image.margin({ left: 16, top: 20, bottom: 10 });
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('新闻详情');
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(391:11)", "entry");
            Text.fontSize(20);
            Text.fontWeight(700);
            Text.fontColor(Color.Black);
            Text.margin({ left: 14, right: 16, top: 20, bottom: 10 });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777308, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(398:11)", "entry");
            Image.width(42);
            Image.margin({ right: 16, top: 20, bottom: 14 });
        }, Image);
        Flex.pop();
        // 返回按钮
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsDetail.ets(404:7)", "entry");
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/NewsDetail.ets(405:9)", "entry");
            Scroll.width('100%');
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NewsDetail.ets(406:11)", "entry");
            Column.width(CommonConstants.FULL_PERCENT);
            Column.padding({
                left: new BreakpointType({ "id": 16777518, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777517, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777516, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }).getValue(this.currentBreakpoint),
                right: new BreakpointType({ "id": 16777518, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777517, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }, { "id": 16777516, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" }).getValue(this.currentBreakpoint)
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 新闻标题
            Text.create(this.newsItem.newsTitle);
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(408:13)", "entry");
            // 新闻标题
            Text.fontSize({ "id": 16777576, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 新闻标题
            Text.fontColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 新闻标题
            Text.fontWeight(CommonConstants.FONT_WEIGHT_600);
            // 新闻标题
            Text.width(CommonConstants.FULL_PERCENT);
            // 新闻标题
            Text.textAlign(TextAlign.Start);
        }, Text);
        // 新闻标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 发布时间
            Text.create(this.newsItem.newsTime);
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(416:13)", "entry");
            // 发布时间
            Text.fontSize({ "id": 16777370, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 发布时间
            Text.fontColor({ "id": 16777428, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 发布时间
            Text.width(CommonConstants.FULL_PERCENT);
            // 发布时间
            Text.textAlign(TextAlign.Start);
            // 发布时间
            Text.margin({ top: { "id": 16777572, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Text);
        // 发布时间
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 新闻图片
            if (this.newsItem.newsImage && this.newsItem.newsImage !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 使用Resource类型直接渲染图片，避免字符串插值导致的问题
                        if (typeof this.newsItem.newsImage === 'string') {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": -1, "type": 30000, params: [this.newsItem.newsImage as string], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                                    Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(427:17)", "entry");
                                    Image.width(CommonConstants.FULL_PERCENT);
                                    Image.height({ "id": 16777575, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                                    Image.objectFit(ImageFit.Cover);
                                    Image.margin({ top: { "id": 16777571, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
                                    Image.borderRadius({ "id": 16777513, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                                }, Image);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(this.newsItem.newsImage as Resource);
                                    Image.debugLine("entry/src/main/ets/pages/NewsDetail.ets(434:17)", "entry");
                                    Image.width(CommonConstants.FULL_PERCENT);
                                    Image.height({ "id": 16777575, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                                    Image.objectFit(ImageFit.Cover);
                                    Image.margin({ top: { "id": 16777571, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
                                    Image.borderRadius({ "id": 16777513, "type": 10002, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
                                }, Image);
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            // 新闻内容
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 新闻内容
            Text.create(this.newsItem.newsContent);
            Text.debugLine("entry/src/main/ets/pages/NewsDetail.ets(444:13)", "entry");
            // 新闻内容
            Text.fontSize({ "id": 16777368, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 新闻内容
            Text.fontColor({ "id": 16777304, "type": 10001, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 新闻内容
            Text.width(CommonConstants.FULL_PERCENT);
            // 新闻内容
            Text.textAlign(TextAlign.Start);
            // 新闻内容
            Text.lineHeight({ "id": 16777367, "type": 10007, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            // 新闻内容
            Text.margin({ top: { "id": 16777331, "type": 10003, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" } });
        }, Text);
        // 新闻内容
        Text.pop();
        Column.pop();
        Scroll.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CommentBar(this, { newsItem: this.newsItem }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NewsDetail.ets", line: 465, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            newsItem: this.newsItem
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        newsItem: this.newsItem
                    });
                }
            }, { name: "CommentBar" });
        }
        Column.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "NewsDetail";
    }
}
registerNamedRoute(() => new NewsDetail(undefined, {}), "", { bundleName: "com.example.newsdemo", moduleName: "entry", pagePath: "pages/NewsDetail", pageFullPath: "entry/src/main/ets/pages/NewsDetail", integratedHsp: "false", moduleType: "followWithHap" });
