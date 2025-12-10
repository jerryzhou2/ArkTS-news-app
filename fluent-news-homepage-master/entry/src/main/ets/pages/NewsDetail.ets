/*
* Copyright (c) 2024 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import NewsData from '../viewmodel/NewsData';
import { CommonConstants } from '../constants/CommonConstants';
import { BreakpointConstants } from '../constants/BreakpointConstants';
import { BreakpointType } from '../utils/BreakpointType';
import { router } from '@kit.ArkUI';
import { SharePicker } from 'aggregated_share';
import NewsPref from '../utils/NewsPref';
import { CommentData } from '../viewmodel/CommentData';
import {CommentPlain} from '../utils/CommentPlain'


@CustomDialog
struct LikeToast {
  @Prop isLiked: boolean
  controller: CustomDialogController

  build() {
    Column() {
      if (this.isLiked) {
        Row({ space: 8 }) {
          Image($r('app.media.like_icon'))
            .width(17)
          Text('点赞成功')
            .fontSize(14)
            .fontWeight(400)
            .height('40vp')
        }
      } else {
        Text('取消点赞')
          .fontSize(14)
          .fontWeight(400)
          .height('40vp')
      }
    }
  }
}

@CustomDialog
struct CollectToast {
  @Prop isCollected: boolean
  controller: CustomDialogController

  build() {
    Column() {
      if (this.isCollected) {
        Text('收藏成功')
          .height('40vp')
      } else {
        Text('取消收藏')
          .height('40vp')
      }
    }
  }
}

@Component
struct CommentItem {
  @Prop comment: CommentData
  @Prop index: number
  @State isLiked: boolean = this.comment.isLiked
  @State likes: number = this.comment.likes

  onDelete: (index: number) => void = () => {}
  onLikeChange: (index: number, isLiked: boolean, likes: number) => void = () => {}
  build() {
    Row() {
      // 用户头像占位符
      Circle()
        .width(40)
        .height(40)
        .backgroundColor($r('app.color.start_window_background'))
        .margin({ right: 12 })

      Column() {
        Row(){
          Text(this.comment.author).fontSize(14).fontWeight(500)
          Text(this.comment.time).fontSize(12).fontColor('#888').margin({left:8})
        }.width('100%').justifyContent(FlexAlign.Start)

        Text(this.comment.content).fontSize(14).margin({top:4}).width('100%')

        /* 点赞区域 */
        Row(){
          Row(){
            Image(this.isLiked ? $r('app.media.heart_fill') : $r('app.media.heart'))
              .width(16).height(16).margin({right:4})
            Text(this.likes.toString())
              .fontSize(12)
              .fontColor(this.isLiked ? '#FF2C2C' : '#666')
          }
          .padding({top:4, bottom:4, left:8, right:8})
          .borderRadius(12)
          .backgroundColor(this.isLiked ? '#FFF0F0' : '#F5F5F5')
          .onClick(() => this.toggleLike())   // ← 核心

          /* 新增：删除按钮 */
          Row(){
            Image($r('app.media.delete'))   // 准备一个垃圾桶图标
              .width(16).height(16)
          }
          .padding({top:4, bottom:4, left:8, right:8})
          .borderRadius(12)
          .backgroundColor('#F5F5F5')
          .margin({left: 8})
          .onClick(() => this.onDelete(this.index))   // 抛出删除事件
        }.margin({top:8}).width('100%').justifyContent(FlexAlign.Start)
      }.layoutWeight(1)
    }
    .width('100%')
    .padding({top:12, bottom:12})
  }

  /* 点赞/取消 + 落盘 */
  private toggleLike() {
    this.isLiked = !this.isLiked;
    this.isLiked ? this.likes++ : this.likes--;

    // 先更新内存对象，保证父级数组数据最新
    this.comment.isLiked = this.isLiked;
    this.comment.likes   = this.likes;

    // 通知父级持久化
    this.onLikeChange(this.index, this.isLiked, this.likes);
  }
}

@Entry
@Component
struct NewsDetail {
  @State newsItem: NewsData = new NewsData();
  @State comments: CommentData[] = [
    // new CommentData('用户1', '这个新闻很有价值，感谢分享！', '刚刚', 12, false),
    // new CommentData('用户2', '内容写得很好，期待更多类似的报道', '1分钟前', 8, true),
    // new CommentData('用户3', '图片拍得真漂亮，想去这个地方看看', '5分钟前', 5, false)
  ]; // 初始为空数组，用于展示“暂无评论”状态
  @State newComment: string = '';
  @StorageLink('currentBreakpoint') currentBreakpoint: string = BreakpointConstants.BREAKPOINT_LG;
  scroller: Scroller = new Scroller();
  textAreaController: TextAreaController = new TextAreaController();
  /* 点赞回调：index -> 持久化 */
  private async onCommentLikeChange(index: number, isLiked: boolean, likes: number) {
    // 1. 更新内存
    this.comments[index].isLiked = isLiked;
    this.comments[index].likes   = likes;

    // 2. 写盘
    const toSave: CommentPlain[] = this.comments.map(c => c.toPlain());
    await NewsPref.setComments(this.newsItem.newsId, toSave);
  }

  /* 自动关闭弹窗 */
  private showAutoCloseDialog(controller: CustomDialogController, ms: number = 500) {
    controller.open();
    setTimeout(() => {
      controller.close();
    }, ms);
  }
  /* 新增：删除评论 + 持久化 */
  private async deleteComment(index: number) {
    // 1. 内存中移除
    this.comments.splice(index, 1);

    // 2. 更新计数
    this.newsItem.comments = this.comments.length;

    // 3. 落盘
    const toSave: CommentPlain[] = this.comments.map(c => c.toPlain());
    await NewsPref.setComments(this.newsItem.newsId, toSave);
  }
  // 用于控制底部评论输入框的显示
  @State isCommentInputVisible: boolean = false;

  likeToastController: CustomDialogController = new CustomDialogController({
    builder: LikeToast({ isLiked: false }),
    alignment: DialogAlignment.Bottom,
    width: '30%',
    height: '40vp',
    offset: { dx: 0, dy: -80 },
    maskColor: Color.Transparent,
    shadow: ShadowStyle.OUTER_DEFAULT_MD
  });

  collectToastController: CustomDialogController = new CustomDialogController({
    builder: CollectToast({ isCollected: false }),
    alignment: DialogAlignment.Bottom,
    width: '30%',
    height: '40vp',
    offset: { dx: 0, dy: -80 },
    maskColor: Color.Transparent,
    shadow: ShadowStyle.OUTER_DEFAULT_MD
  });

  async aboutToAppear() {
    /* 1. 解析路由参数（原代码） */
    let params: Object = router.getParams();
    if (Reflect.has(params, 'newsData')) {
      let data :Object = Reflect.get(params, 'newsData');
      this.newsItem = new NewsData(
        Reflect.get(data, 'newsId'),
        Reflect.get(data, 'newsTitle'),
        Reflect.get(data, 'newsContent'),
        Reflect.get(data, 'newsTime'),
        Reflect.get(data, 'newsImage'),
        Reflect.get(data, 'likes') || 0,
        Reflect.get(data, 'comments') || 0,
        Reflect.get(data, 'shares') || 0,
        Reflect.get(data, 'isLiked') || false,
        Reflect.get(data, 'isCollected') || false,
        Reflect.get(data, 'isFollowed') || false
      );
    }

    /* 2. 持久化数据覆盖 */
    const newsId = this.newsItem.newsId;

    // 2.1 评论
    const plains = await NewsPref.getComments(newsId);
    this.comments = plains.map(CommentData.fromPlain);
    this.newsItem.comments = this.comments.length;

    // 2.2 点赞
    const GeneratedDestructArray_1 = await NewsPref.getLike(newsId);
    const isLiked = GeneratedDestructArray_1[0];
    const likes = GeneratedDestructArray_1[1];
    this.newsItem.isLiked = isLiked;
    this.newsItem.likes = likes;

    // 2.3 收藏
    this.newsItem.isCollected = await NewsPref.getCollect(newsId);
  }

  // 点赞功能
  private async toggleLike() {
    this.newsItem.isLiked = !this.newsItem.isLiked;
    this.newsItem.isLiked ? this.newsItem.likes++ : this.newsItem.likes--;

    // 落盘
    await NewsPref.setLike(
      this.newsItem.newsId,
      this.newsItem.isLiked,
      this.newsItem.likes
    );
    // 显示点赞提示
    this.likeToastController = new CustomDialogController({
      builder: LikeToast({ isLiked: this.newsItem.isLiked }),
      alignment: DialogAlignment.Bottom,
      width: '30%',
      height: '40vp',
      offset: { dx: 0, dy: -80 },
      maskColor: Color.Transparent,
      shadow: ShadowStyle.OUTER_DEFAULT_MD
    });
    this.showAutoCloseDialog(this.likeToastController);
  }

  // 收藏功能
  private async toggleCollect() {
    this.newsItem.isCollected = !this.newsItem.isCollected;

    // 落盘
    await NewsPref.setCollect(
      this.newsItem.newsId,
      this.newsItem.isCollected
    );

    // 显示收藏提示
    // 更新对话框控制器，传入当前最新的收藏状态
    this.collectToastController = new CustomDialogController({
      builder: CollectToast({ isCollected: this.newsItem.isCollected }),
      alignment: DialogAlignment.Bottom,
      width: '30%',
      height: '40vp',
      offset: { dx: 0, dy: -80 },
      maskColor: Color.Transparent,
      shadow: ShadowStyle.OUTER_DEFAULT_MD
    });
    this.showAutoCloseDialog(this.collectToastController);
  }

  // 分享功能
  private shareNews() {
    this.newsItem.shares++;

    // 创建分享面板
    const picker: SharePicker = new SharePicker({
      title: typeof this.newsItem.newsTitle === 'string' ? this.newsItem.newsTitle as string : '',
      subTitle: '新闻详情',
      landingPageUrl: 'https://developer.huawei.com/consumer/cn/news    ', // 可替换为实际的落地页链接
      createTime: Date.now(),
    });

    // 显示分享面板
    picker.show({
      autoClose: true,
    });

    console.log('分享新闻:', this.newsItem.newsTitle);
  }

  build() {
    Column() {
      // 区域1: 顶部栏
      Row() {
        // 返回按钮
        Image($r('app.media.chevron_backward'))
          .width(24)
          .height(24)
          .margin({ left: 16 })
          .onClick(() => {
            router.back();
          });

        // 标题占位，保持居中
        Blank()
          .layoutWeight(1)

        // 功能图标
        Row({ space: 16 }) {
          Image($r('app.media.ic_public_comments'))  // 耳机图标
            .width(20)
            .height(20)
          Image($r('app.media.ic_public_search'))    // 搜索图标
            .width(20)
            .height(20)
          Image($r('app.media.ic_public_app'))       // 更多选项
            .width(20)
            .height(20)
        }
        .margin({ right: 16 })
      }
      .height(56)
      .width('100%')
      .backgroundColor(Color.White)
      .alignItems(VerticalAlign.Center)

      // 主体内容区域
      Scroll() {
        Column() {
          // 区域2: 新闻标题及发布信息
          Column() {
            Row({ space: 8 }) {
              // 发布者头像
              Circle()
                .width(32)
                .height(32)
                .backgroundColor($r('app.color.start_window_background'))

              Column() {
                Text('新闻发布者')
                  .fontSize(14)
                  .fontColor(Color.Black)
                Text(this.newsItem.newsTime)
                  .fontSize(12)
                  .fontColor('#666')
              }
              .layoutWeight(1)

              Button('+关注', { type: ButtonType.Normal })
                .fontSize(12)
                .height(28)
                .backgroundColor('#2196f3')//蓝色
            }

            // 新闻标题
            Text(this.newsItem.newsTitle)
              .fontSize(20)
              .fontColor(Color.Black)
              .fontWeight(FontWeight.Bold)
              .margin({ top: 12 })
              .width('100%')
          }
          .padding(16)
          .backgroundColor(Color.White)

          // 区域3: 新闻主体内容
          Column() {
            // 新闻图片
            if (this.newsItem.newsImage && this.newsItem.newsImage !== '') {
              if (typeof this.newsItem.newsImage === 'string') {
                Image($rawfile(this.newsItem.newsImage as string))
                  .width('100%')
                  .height(200)
                  .objectFit(ImageFit.Cover)
                  .borderRadius(8)
              } else {
                Image(this.newsItem.newsImage as Resource)
                  .width('100%')
                  .height(200)
                  .objectFit(ImageFit.Cover)
                  .borderRadius(8)
              }
            }

            // 新闻内容
            Text(this.newsItem.newsContent)
              .fontSize(16)
              .fontColor(Color.Black)
              .lineHeight(24)
              .margin({ top: 12 })
              .width('100%')
          }
          .padding(16)
          .backgroundColor(Color.White)
          .margin({ top: 8 })

          // 区域4: 新闻评论区
          Column() {
            Text('评论·' + this.newsItem.comments.toString()) // 更新为动态评论数
              .fontSize(18)
              .fontColor(Color.Black)
              .fontWeight(FontWeight.Bold)
            //.margin({ bottom: 12 })

            // 根据评论数量决定显示内容
            if (this.comments.length === 0) {
              // 暂无评论状态
              Column({ space: 16 }) {
                Text('暂无评论，点击抢首评')
                  .fontSize(16)
                  .fontColor('#666')
                  .textAlign(TextAlign.Center)
                  .width('100%')

                Button('写评论', { type: ButtonType.Capsule })
                  .width(120)
                  .height(40)
                  .backgroundColor('#6A8BFF') // 蓝色背景
                  .fontColor(Color.White)
                  .onClick(() => {
                    // 点击“写评论”按钮，显示底部输入框并自动聚焦
                    this.isCommentInputVisible = true;
                    // 这里可以添加逻辑让键盘弹出，例如使用focus方法
                    setTimeout(() => {
                      this.scroller.scrollBy(0, 5000);
                    }, 100);
                  })
              }
              .width('100%')
              .height(300) // 设置一个高度，使内容居中
              .justifyContent(FlexAlign.Center)
              .alignItems(HorizontalAlign.Center)
            } else {
              /* 有评论状态，显示评论列表 */
              ForEach(this.comments, (item: CommentData, index?: number) => {
                CommentItem({
                  comment: item,
                  index: index ?? 0,
                  onLikeChange: this.onCommentLikeChange.bind(this),
                  onDelete: this.deleteComment.bind(this)
                })
              })
            }
          }
          .padding(16)
          .backgroundColor(Color.White)
          .margin({ top: 8 })
          .id('commentSection')
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)
        .layoutWeight(0)
      }
      .width('100%')
      .layoutWeight(1)

      // 区域5: 底部工具栏
      Column() {
        // 评论输入框（只有当 isCommentInputVisible 为 true 时才显示）
        if (this.isCommentInputVisible) {
          Row({ space: 8 }) {
            TextArea({ placeholder: '发表评论...', controller: this.textAreaController })
              .height(40)
              .layoutWeight(1)
              .borderRadius(20)
              .backgroundColor('#F5F5F5')
              .padding(8)
              .onChange((value: string) => {
                this.newComment = value;
              })
              .onFocus(() => {
                // 键盘弹出时，确保输入框可见
                this.scroller.scrollBy(0, 3000);
              })

            Button('发送', { type: ButtonType.Capsule })
              .height(40)
              .backgroundColor('#1890FF')
              .fontColor(Color.White)
              .onClick(async () => {
                if (this.newComment && this.newComment.trim()) {
                  const cm = new CommentData('当前用户', this.newComment.trim(), '刚刚');
                  this.comments.push(cm);

                  // 别再手动 ++，统一用长度
                  this.newsItem.comments = this.comments.length;

                  // 落盘
                  const toSave: CommentPlain[] = this.comments.map(c => c.toPlain());
                  await NewsPref.setComments(this.newsItem.newsId, toSave);

                  this.newComment = '';
                  this.textAreaController.caretPosition(0);
                  this.isCommentInputVisible = false;
                }
              })
          }
          .width('100%')
          .padding({ left: 16, right: 16 })
          .backgroundColor(Color.White)
          //.margin({ top: 8 })
        }

        // 底部功能栏
        Row({ space: 20 }) {
          Column({ space: 4 }) {
            Image($r('app.media.message_active'))
              .width(24)
              .height(24)
            Text(this.newsItem.comments.toString()) // 显示评论总数
              .fontSize(12)
              .fontColor('#666')
          }
          .onClick(() => {
            // 点击评论图标，显示评论输入框并自动聚焦
            this.isCommentInputVisible = true;
            setTimeout(() => {
              this.scroller.scrollBy(0, 3000);
            }, 100);
          })

          // 点赞
          Column({ space: 4 }) {
            Image(this.newsItem.isLiked ? $r('app.media.heart_fill') : $r('app.media.heart'))
              .width(24)
              .height(24)
            Text(this.newsItem.likes.toString())
              .fontSize(12)
              .fontColor('#666')
          }
          .onClick(() => {
            this.toggleLike();
          })

          Column({ space: 4 }) {
            Image(this.newsItem.isCollected ? $r('app.media.star_fill') : $r('app.media.star'))
              .width(24)
              .height(24)
            Text(this.newsItem.isCollected ? '1' : '0') // 显示收藏状态
              .fontSize(12)
              .fontColor('#666')
          }
          .onClick(() => {
            this.toggleCollect();
          })

          Column({ space: 4 }) {
            Image($r('app.media.share'))
              .width(24)
              .height(24)
            Text('12k') // 显示分享次数，这里用固定值，实际应用中应从数据获取
              .fontSize(12)
              .fontColor('#666')
          }
          .onClick(() => {
            this.shareNews();
          })
        }
        .height(60)
        .width('100%')
        .backgroundColor(Color.White)
        .justifyContent(FlexAlign.SpaceAround)
        .padding({ left: 20, right: 20 })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
}