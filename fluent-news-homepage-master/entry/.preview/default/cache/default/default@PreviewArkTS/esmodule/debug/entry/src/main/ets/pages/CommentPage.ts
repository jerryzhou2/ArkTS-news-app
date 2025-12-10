if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CommentPage_Params {
    comments?: CommentItem[];
    newComment?: string;
    newsItem?: NewsData;
    isShowSheet?: boolean;
    customHeight?: number;
    textAreaController?: TextAreaController;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import NewsData from "@bundle:com.example.newsdemo/entry/ets/viewmodel/NewsData";
class CommentItem {
    author: string;
    content: string;
    time: string;
    constructor(author: string, content: string, time: string) {
        this.author = author;
        this.content = content;
        this.time = time;
    }
}
class CommentPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__comments = new ObservedPropertyObjectPU([
            new CommentItem('用户A', '这篇文章很有深度，学到了很多知识', '1小时前'),
            new CommentItem('用户B', '感谢分享，期待更多类似的文章', '30分钟前')
        ], this, "comments");
        this.__newComment = new ObservedPropertySimplePU('', this, "newComment");
        this.__newsItem = new ObservedPropertyObjectPU(new NewsData(), this, "newsItem");
        this.__isShowSheet = new ObservedPropertySimplePU(false, this, "isShowSheet");
        this.__customHeight = new ObservedPropertySimplePU(320, this, "customHeight");
        this.textAreaController = new TextAreaController();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommentPage_Params) {
        if (params.comments !== undefined) {
            this.comments = params.comments;
        }
        if (params.newComment !== undefined) {
            this.newComment = params.newComment;
        }
        if (params.newsItem !== undefined) {
            this.newsItem = params.newsItem;
        }
        if (params.isShowSheet !== undefined) {
            this.isShowSheet = params.isShowSheet;
        }
        if (params.customHeight !== undefined) {
            this.customHeight = params.customHeight;
        }
        if (params.textAreaController !== undefined) {
            this.textAreaController = params.textAreaController;
        }
    }
    updateStateVars(params: CommentPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__comments.purgeDependencyOnElmtId(rmElmtId);
        this.__newComment.purgeDependencyOnElmtId(rmElmtId);
        this.__newsItem.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowSheet.purgeDependencyOnElmtId(rmElmtId);
        this.__customHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__comments.aboutToBeDeleted();
        this.__newComment.aboutToBeDeleted();
        this.__newsItem.aboutToBeDeleted();
        this.__isShowSheet.aboutToBeDeleted();
        this.__customHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __comments: ObservedPropertyObjectPU<CommentItem[]>;
    get comments() {
        return this.__comments.get();
    }
    set comments(newValue: CommentItem[]) {
        this.__comments.set(newValue);
    }
    private __newComment: ObservedPropertySimplePU<string>;
    get newComment() {
        return this.__newComment.get();
    }
    set newComment(newValue: string) {
        this.__newComment.set(newValue);
    }
    private __newsItem: ObservedPropertyObjectPU<NewsData>;
    get newsItem() {
        return this.__newsItem.get();
    }
    set newsItem(newValue: NewsData) {
        this.__newsItem.set(newValue);
    }
    private __isShowSheet: ObservedPropertySimplePU<boolean>;
    get isShowSheet() {
        return this.__isShowSheet.get();
    }
    set isShowSheet(newValue: boolean) {
        this.__isShowSheet.set(newValue);
    }
    private __customHeight: ObservedPropertySimplePU<number>;
    get customHeight() {
        return this.__customHeight.get();
    }
    set customHeight(newValue: number) {
        this.__customHeight.set(newValue);
    }
    private textAreaController: TextAreaController;
    aboutToAppear(): void {
        // 获取传递过来的参数
        let params: Object = router.getParams();
        if (Reflect.has(params, 'newsData')) {
            let data: Object = Reflect.get(params, 'newsData');
            // 重新构造NewsData对象
            this.newsItem = new NewsData(Reflect.get(data, 'newsId') as string, Reflect.get(data, 'newsTitle') as string | Resource, Reflect.get(data, 'newsContent') as string | Resource, Reflect.get(data, 'newsTime') as string | Resource, Reflect.get(data, 'newsImage') as string | Resource, Reflect.get(data, 'likes') as number || 0, Reflect.get(data, 'comments') as number || 0, Reflect.get(data, 'shares') as number || 0, Reflect.get(data, 'isLiked') as boolean || false, Reflect.get(data, 'isCollected') as boolean || false, Reflect.get(data, 'isFollowed') as boolean || false);
        }
        // 从本地存储加载评论（如果有的话）
        this.loadComments();
    }
    // 加载评论数据
    private loadComments(): void {
        // 实际项目中应该从本地存储或网络加载评论
        // 这里简化处理，使用示例数据
        console.log('加载评论数据');
    }
    // 保存评论数据
    private saveComments(): void {
        // 实际项目中应该保存到本地存储或上传到服务器
        console.log('保存评论数据');
    }
    // 添加新评论
    private addComment(): void {
        if (this.newComment && this.newComment.trim() !== '') {
            let now = new Date();
            let timeString = `${now.getHours()}:${now.getMinutes()}`;
            let comment = new CommentItem('我', this.newComment, timeString);
            this.comments.push(comment); // 添加到列表末尾
            this.newComment = ''; // 清空输入框
            // 保存评论
            this.saveComments();
            // 更新新闻的评论数
            this.newsItem.comments = this.comments.length;
        }
    }
    CommentSheet(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CommentPage.ets(87:5)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '我来说两句...', text: this.newComment, controller: this.textAreaController });
            TextArea.debugLine("entry/src/main/ets/pages/CommentPage.ets(88:7)", "entry");
            TextArea.backgroundColor('#FFFFFF');
            TextArea.maxLength(300);
            TextArea.height(160);
            TextArea.margin({ left: 16, right: 16 });
            TextArea.showCounter(true, { thresholdPercentage: 0, highlightBorder: true });
            TextArea.onFocus(() => {
                this.customHeight = 500;
            });
            TextArea.onBlur(() => {
                this.customHeight = 320;
            });
            TextArea.onChange((value: string) => {
                this.newComment = value;
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CommentPage.ets(104:7)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.End);
            Row.offset({ x: -30, y: -20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('0/300');
            Text.debugLine("entry/src/main/ets/pages/CommentPage.ets(105:9)", "entry");
            Text.fontSize(10);
            Text.fontWeight(500);
            Text.fontColor('rgba(0, 0, 0, 0.4)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CommentPage.ets(114:7)", "entry");
            Row.width('100%');
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('提交');
            Button.debugLine("entry/src/main/ets/pages/CommentPage.ets(115:9)", "entry");
            Button.width('100%');
            Button.margin({ top: 6 });
            Button.fontColor('#FFFFFF');
            Button.borderRadius(20);
            Button.backgroundColor('#007DFF');
            Button.onClick(() => {
                if (this.newComment === null || this.newComment === '' || this.newComment.trim() === '') {
                    promptAction.showToast({
                        message: '请输入内容再提交',
                        duration: 2000
                    });
                    return;
                }
                this.addComment();
                this.isShowSheet = false;
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CommentPage.ets(139:5)", "entry");
            Column.height('100%');
            Column.backgroundColor('#F8F8F8');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CommentPage.ets(141:7)", "entry");
            // 顶部导航栏
            Row.height(56);
            // 顶部导航栏
            Row.backgroundColor('#FFFFFF');
            // 顶部导航栏
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777579, "type": 20000, params: [], "bundleName": "com.example.newsdemo", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/CommentPage.ets(142:9)", "entry");
            Image.width(30);
            Image.height(30);
            Image.margin({ left: 16, right: 16 });
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('评论 (' + this.comments.length + ')');
            Text.debugLine("entry/src/main/ets/pages/CommentPage.ets(150:9)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 占位元素保持居中
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/CommentPage.ets(156:9)", "entry");
            // 占位元素保持居中
            Blank.width(46);
        }, Blank);
        // 占位元素保持居中
        Blank.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 评论列表
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/CommentPage.ets(164:7)", "entry");
            // 评论列表
            Column.layoutWeight(1);
            // 评论列表
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/pages/CommentPage.ets(165:9)", "entry");
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/pages/CommentPage.ets(166:11)", "entry");
            Column.width('100%');
            Column.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/CommentPage.ets(168:15)", "entry");
                    Row.width('100%');
                    Row.padding({ top: 8, bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 用户头像占位符
                    Circle.create();
                    Circle.debugLine("entry/src/main/ets/pages/CommentPage.ets(170:17)", "entry");
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
                    Column.debugLine("entry/src/main/ets/pages/CommentPage.ets(176:17)", "entry");
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 用户名和时间
                    Row.create();
                    Row.debugLine("entry/src/main/ets/pages/CommentPage.ets(178:19)", "entry");
                    // 用户名和时间
                    Row.width('100%');
                    // 用户名和时间
                    Row.justifyContent(FlexAlign.Start);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.author);
                    Text.debugLine("entry/src/main/ets/pages/CommentPage.ets(179:21)", "entry");
                    Text.fontSize(14);
                    Text.fontWeight(500);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.time);
                    Text.debugLine("entry/src/main/ets/pages/CommentPage.ets(183:21)", "entry");
                    Text.fontSize(12);
                    Text.fontColor('#888');
                    Text.margin({ left: 8 });
                }, Text);
                Text.pop();
                // 用户名和时间
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 评论内容
                    Text.create(item.content);
                    Text.debugLine("entry/src/main/ets/pages/CommentPage.ets(192:19)", "entry");
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
            };
            this.forEachUpdateFunction(elmtId, this.comments, forEachItemGenFunction, (item: CommentItem) => item.time + item.author, true, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 如果没有评论显示提示
            if (this.comments.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/CommentPage.ets(206:15)", "entry");
                        Column.width('100%');
                        Column.height(100);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无评论，快来抢沙发吧');
                        Text.debugLine("entry/src/main/ets/pages/CommentPage.ets(207:17)", "entry");
                        Text.fontSize(14);
                        Text.fontColor('#888');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部评论输入区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/CommentPage.ets(223:9)", "entry");
            // 底部评论输入区域
            Row.height(56);
            // 底部评论输入区域
            Row.backgroundColor('#FFFFFF');
            // 底部评论输入区域
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '写评论...', text: this.newComment });
            TextInput.debugLine("entry/src/main/ets/pages/CommentPage.ets(224:11)", "entry");
            TextInput.backgroundColor('#F2F2F2');
            TextInput.borderRadius(6);
            TextInput.fontSize(14);
            TextInput.padding({ left: 12, right: 12 });
            TextInput.layoutWeight(1);
            TextInput.height(36);
            TextInput.margin({ left: 12 });
            TextInput.onChange((value: string) => {
                this.newComment = value;
            });
            TextInput.bindSheet(this.isShowSheet, { builder: () => {
                    this.CommentSheet.call(this);
                } }, {
                height: this.customHeight,
                dragBar: false,
                maskColor: '#000000AA',
                onDisappear: () => {
                    this.isShowSheet = false;
                }
            });
            TextInput.onClick(() => {
                this.isShowSheet = true;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送');
            Button.debugLine("entry/src/main/ets/pages/CommentPage.ets(247:11)", "entry");
            Button.backgroundColor(this.newComment.trim() !== '' ? '#007DFF' : '#CCCCCC');
            Button.enabled(this.newComment.trim() !== '');
            Button.fontSize(14);
            Button.fontColor('#FFFFFF');
            Button.onClick(() => {
                this.addComment();
            });
            Button.margin({ left: 8, right: 12 });
        }, Button);
        Button.pop();
        // 底部评论输入区域
        Row.pop();
        // 评论列表
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CommentPage";
    }
}
registerNamedRoute(() => new CommentPage(undefined, {}), "", { bundleName: "com.example.newsdemo", moduleName: "entry", pagePath: "pages/CommentPage", pageFullPath: "entry/src/main/ets/pages/CommentPage", integratedHsp: "false", moduleType: "followWithHap" });
