import { router, promptAction } from '@kit.ArkUI';
import NewsData from '../viewmodel/NewsData';

class CommentItem {
  author: string;
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;

  constructor(author: string, content: string, time: string, likes: number = 0, isLiked: boolean = false) {
    this.author = author;
    this.content = content;
    this.time = time;
    this.likes = likes;
    this.isLiked = isLiked;
  }
}

@Entry
@Component
struct CommentPage {
  @State comments: CommentItem[] = [
    new CommentItem('用户A', '这篇文章很有深度，学到了很多知识', '1小时前', 15, false),
    new CommentItem('用户B', '感谢分享，期待更多类似的文章', '30分钟前', 8, false)
  ];
  @State newComment: string = '';
  @State newsItem: NewsData = new NewsData();
  @State isShowSheet: boolean = false;
  @State customHeight: number = 320;
  textAreaController: TextAreaController = new TextAreaController();

  aboutToAppear(): void {
    // 获取传递过来的参数，添加异常处理
    try {
      let params: Object = router.getParams();
      if (params && Reflect.has(params, 'newsData')) {
        let data: Object = Reflect.get(params, 'newsData');

        // 重新构造NewsData对象
        this.newsItem = new NewsData(
          Reflect.get(data, 'newsId') as string,
          Reflect.get(data, 'newsTitle') as string | Resource,
          Reflect.get(data, 'newsContent') as string | Resource,
          Reflect.get(data, 'newsTime') as string | Resource,
          Reflect.get(data, 'newsImage') as string | Resource,
          Reflect.get(data, 'likes') as number || 0,
          Reflect.get(data, 'comments') as number || 0,
          Reflect.get(data, 'shares') as number || 0,
          Reflect.get(data, 'isLiked') as boolean || false,
          Reflect.get(data, 'isCollected') as boolean || false,
          Reflect.get(data, 'isFollowed') as boolean || false
        );
      }
    } catch (error) {
      console.error('获取路由参数失败:', error);
      // 使用默认数据
      this.newsItem = new NewsData();
    }

    // 从本地存储加载评论（如果有的话）
    this.loadComments();
  }

  // 加载评论数据
  private loadComments(): void {
    // 在实际项目中，这里应该从本地存储或网络加载评论
    // 这里简化处理，使用示例数据
    console.log('加载评论数据');
  }

  // 保存评论数据
  private saveComments(): void {
    // 在实际项目中，这里应该保存到本地存储或上传到服务器
    console.log('保存评论数据');
  }

  // 添加新评论
  private addComment(): void {
    if (this.newComment && this.newComment.trim() !== '') {
      let now = new Date();
      let timeString = `${now.getHours()}:${now.getMinutes()}`;
      let comment = new CommentItem('我', this.newComment, timeString, 0, false);
      this.comments.push(comment); // 添加到列表末尾
      this.newComment = ''; // 清空输入框

      // 保存评论
      this.saveComments();

      // 更新新闻的评论数
      this.newsItem.comments = this.comments.length;
    }
  }

  // 删除评论
  private deleteComment(index: number): void {
    if (index >= 0 && index < this.comments.length) {
      this.comments.splice(index, 1);
      this.saveComments();
      this.newsItem.comments = this.comments.length;
    }
  }

  // 点赞/取消点赞评论
  private toggleCommentLike(index: number): void {
    if (index >= 0 && index < this.comments.length) {
      let comment = this.comments[index];
      if (comment.isLiked) {
        comment.likes--;
      } else {
        comment.likes++;
      }
      comment.isLiked = !comment.isLiked;
      this.comments = [...this.comments]; // 触发UI更新
      this.saveComments();
    }
  }

  @Builder
  CommentSheet() {
    Column() {
        TextArea({ placeholder: '我来说两句...', text: this.newComment, controller: this.textAreaController })
          .backgroundColor($r('app.color.white'))
          .maxLength(300)
          .height(160)
          .margin({ left: 16, right: 16 })
          .showCounter(true, { thresholdPercentage: 0, highlightBorder: true })
        .onFocus(() => {
          this.customHeight = 500;
        })
        .onBlur(() => {
          this.customHeight = 320;
        })
        .onChange((value: string) => {
          this.newComment = value;
        })

      Row() {
        Text('0/300')
          .fontSize(10)
          .fontWeight(500)
          .fontColor($r('app.color.text_font_color'))
          .opacity(0.4)
      }
      .width('100%')
      .justifyContent(FlexAlign.End)
      .offset({ x: -30, y: -20 })

      Row() {
        Button('提交')
          .width('100%')
          .margin({ top: 6 })
          .fontColor($r('app.color.white'))
          .borderRadius(20)
          .backgroundColor($r('app.color.tab_sel_color'))
          .onClick(() => {
            if (this.newComment === null || this.newComment === '' || this.newComment.trim() === '') {
              promptAction.showToast({
                message: '请输入内容再提交',
                duration: 2000
              });
              return;
            }
            this.addComment();
            this.isShowSheet = false;
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16 })
    }
  }

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Image($r('app.media.chevron_backward'))
          .width(30)
          .height(30)
          .margin({ left: 16, right: 16 })
          .onClick(() => {
            router.back();
          })

        Text('评论 (' + this.comments.length + ')')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .layoutWeight(1)

        // 占位元素保持居中
        Blank()
          .width(46)
      }
      .height(56)
      .backgroundColor($r('app.color.white'))

      // 评论列表 - 从顶部开始排列
      Column() {
        Scroll() {
          Column({ space: 12 }) {
            ForEach(this.comments, (item: CommentItem, index: number) => {
              Row() {
                // 用户头像占位符
                Circle()
                  .width(40)
                  .height(40)
                  .backgroundColor($r('app.color.start_window_background'))
                  .margin({ right: 12 })

                Column() {
                  // 用户名和时间
                  Row() {
                    Text(item.author)
                      .fontSize(14)
                      .fontWeight(500)

          Text(item.time)
            .fontSize(12)
            .fontColor($r('app.color.news_time_fontColor'))
            .margin({ left: 8 })
                  }
                  .width('100%')
                  .justifyContent(FlexAlign.Start)

                  // 评论内容
                  Text(item.content)
                    .fontSize(14)
                    .margin({ top: 4 })
                    .width('100%')
                    .textAlign(TextAlign.Start)

                  // 评论交互区域
                  Row() {
                    // 点赞按钮
                    Row() {
                      Image(item.isLiked ? $r('app.media.heart_fill') : $r('app.media.heart'))
                        .width(16)
                        .height(16)
                        .margin({ right: 4 })
          Text(item.likes.toString())
            .fontSize(12)
            .fontColor(item.isLiked ? $r('app.color.tab_sel_color') : $r('app.color.text_font_color'))
            .opacity(item.isLiked ? 1 : 0.6)
                    }
                    .padding({ top: 4, bottom: 4, left: 8, right: 8 })
                    .borderRadius(12)
                    .backgroundColor(item.isLiked ? $r('app.color.common_background_1') : $r('app.color.module_item_bg_color'))
                    .onClick(() => {
                      this.toggleCommentLike(index);
                    })

                    // 删除按钮（仅显示自己的评论）
                    if (item.author === '我') {
                      Row() {
          Text('删除')
            .fontSize(12)
            .fontColor($r('app.color.text_font_color'))
            .opacity(0.6)
                      }
                      .padding({ top: 4, bottom: 4, left: 8, right: 8 })
                      .borderRadius(12)
        .backgroundColor($r('app.color.module_item_bg_color'))
        .margin({ left: 8 })
        .onClick(() => {
          promptAction.showDialog({
            message: '确定要删除这条评论吗？',
            buttons: [
              {
                text: '取消',
                color: $r('app.color.text_font_color')
              },
              {
                text: '删除',
                color: $r('app.color.tab_sel_color')
              }
            ]
          }).then(result => {
            if (result.index === 1) {
              this.deleteComment(index);
            }
          });
        })
                    }
                  }
                  .margin({ top: 8 })
                  .width('100%')
                  .justifyContent(FlexAlign.Start)
                }
                .layoutWeight(1)
              }
              .width('100%')
              .padding({ top: 12, bottom: 12 })
            }, (item: CommentItem) => item.time + item.author)

            // 如果没有评论显示提示
            if (this.comments.length === 0) {
            Column() {
              Text('暂无评论，快来抢沙发吧')
                .fontSize(14)
                .fontColor($r('app.color.text_font_color'))
                .opacity(0.6)
            }
              .width('100%')
              .height(100)
              .justifyContent(FlexAlign.Center)
            }
          }
          .width('100%')
          .padding({ left: 16, right: 16, top: 12, bottom: 12 })
          .alignItems(HorizontalAlign.Start)
        }
        .layoutWeight(1)
      }
      .layoutWeight(1)
      .justifyContent(FlexAlign.Start)

      // 底部评论输入区域
      Row() {
        // 用户头像
        Circle()
          .width(32)
          .height(32)
          .backgroundColor($r('app.color.start_window_background'))
          .margin({ left: 12 })

        TextInput({ placeholder: '写评论...', text: this.newComment })
          .backgroundColor($r('app.color.module_item_bg_color'))
          .borderRadius(18)
          .fontSize(14)
          .padding({ left: 12, right: 12 })
          .layoutWeight(1)
          .height(36)
          .margin({ left: 8 })
          .onChange((value: string) => {
            this.newComment = value;
          })
          .bindSheet(this.isShowSheet, this.CommentSheet(), {
            height: this.customHeight,
            dragBar: false,
            maskColor: $r('app.color.common_border_color_3'),
            onDisappear: () => {
              this.isShowSheet = false;
            }
          })
          .onClick(() => {
            this.isShowSheet = true;
          })

        Button('发送')
          .backgroundColor(this.newComment.trim() !== '' ? $r('app.color.tab_sel_color') : $r('app.color.module_icon_color'))
          .enabled(this.newComment.trim() !== '')
          .fontSize(14)
          .fontColor($r('app.color.white'))
          .width(60)
          .height(36)
          .borderRadius(18)
          .onClick(() => {
            this.addComment();
          })
          .margin({ left: 8, right: 12 })
      }
      .height(56)
      .backgroundColor($r('app.color.white'))
      .border({ width: { top: 1 }, color: $r('app.color.common_divider_color') })
    }
    .height('100%')
    .backgroundColor($r('app.color.page_bg_color'))
  }
}