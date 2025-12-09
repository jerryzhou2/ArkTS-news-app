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

  build() {
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
          Text(this.comment.author)
            .fontSize(14)
            .fontWeight(500)

          Text(this.comment.time)
            .fontSize(12)
            .fontColor('#888')
            .margin({ left: 8 })
        }
        .width('100%')
        .justifyContent(FlexAlign.Start)

        // 评论内容
        Text(this.comment.content)
          .fontSize(14)
          .margin({ top: 4 })
          .width('100%')
          .textAlign(TextAlign.Start)

        // 评论交互区域
        Row() {
          // 点赞按钮
          Row() {
            Image(this.comment.isLiked ? $r('app.media.heart_fill') : $r('app.media.heart'))
              .width(16)
              .height(16)
              .margin({ right: 4 })
            Text(this.comment.likes.toString())
              .fontSize(12)
              .fontColor(this.comment.isLiked ? '#FF2C2C' : '#666')
          }
          .padding({ top: 4, bottom: 4, left: 8, right: 8 })
          .borderRadius(12)
          .backgroundColor(this.comment.isLiked ? '#FFF0F0' : '#F5F5F5')
        }
        .margin({ top: 8 })
        .width('100%')
        .justifyContent(FlexAlign.Start)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 12, bottom: 12 })
  }
}

@Component
struct CommentBar {
  @State isShowSheet: boolean = false;
  @State comment: string = '';
  @State customHeight: number = 320;
  @State isStateEffect: boolean = false;
  @State num: number = 0.3;
  @State heartFlag: boolean = false;
  @State collectFlag: boolean = false;
  @Prop newsItem: NewsData;  // 使用@Prop装饰器接收父组件传递的newsItem

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

  textAreaController: TextAreaController = new TextAreaController();

  // 点赞功能
  private toggleLike() {
    this.newsItem.isLiked = !this.newsItem.isLiked;
    if (this.newsItem.isLiked) {
      this.newsItem.likes++;
    } else {
      this.newsItem.likes--;
    }

    // 显示点赞提示
    // 更新对话框控制器，传入当前最新的点赞状态
    this.likeToastController = new CustomDialogController({
      builder: LikeToast({ isLiked: this.newsItem.isLiked }),
      alignment: DialogAlignment.Bottom,
      width: '30%',
      height: '40vp',
      offset: { dx: 0, dy: -80 },
      maskColor: Color.Transparent,
      shadow: ShadowStyle.OUTER_DEFAULT_MD
    });
    this.likeToastController.open();
  }

  // 收藏功能
  private toggleCollect() {
    this.newsItem.isCollected = !this.newsItem.isCollected;

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
    this.collectToastController.open();
  }

  // 分享功能
  private shareNews() {
    this.newsItem.shares++;

    // 创建分享面板
    const picker: SharePicker = new SharePicker({
      title: typeof this.newsItem.newsTitle === 'string' ? this.newsItem.newsTitle as string : '',
      subTitle: '新闻详情',
      landingPageUrl: 'https://developer.huawei.com/consumer/cn/news', // 可替换为实际的落地页链接
      createTime: Date.now(),
    });

    // 显示分享面板
    picker.show({
      autoClose: true,
    });

    console.log('分享新闻:', this.newsItem.newsTitle);
  }

  @Builder
  CommentSheet() {
    Column() {
      TextArea({ placeholder: '我来说两句...', text: this.comment, controller: this.textAreaController })
        .backgroundColor(Color.White)
        .maxLength(300)
        .height(160)
        .margin({ left: 16, right: 16 })
        .showCounter(true, { thresholdPercentage: 0, highlightBorder: true })
        .onFocus(() => {
          this.customHeight = 500;
        })
        .onBlur(() => {
          this.customHeight = 300;
        })
        .onChange((value: string) => {
          this.comment = value;
          if (value !== null && value !== '') {
            this.isStateEffect = true;
            this.num = 1;
          } else {
            this.num = 0.4;
          }
        })

      Row() {
        Text('0/300')
          .fontSize(10)
          .fontWeight(500)
          .fontColor('rgba(0, 0, 0, 0.4)');
      }
      .width('100%')
      .justifyContent(FlexAlign.End)
      .offset({ x: -30, y: -20 });

      Row() {
        Button('提交', { type: ButtonType.Capsule, stateEffect: this.isStateEffect })
          .opacity(this.num)
          .width('100%')
          .margin({ top: 6 })
          .fontColor(Color.White)
          .borderRadius(20)
          .backgroundColor(Color.Red)
          .onClick(() => {
            if (this.comment === null || this.comment === '' || this.comment.trim() === '') {
              this.getUIContext().getPromptAction().showToast({
                message: '请输入内容再提交',
                offset: { dx: 0, dy: -200 }
              });
            } else {
              this.isShowSheet = false;
              this.newsItem.comments++;
              // 这里应该添加实际的评论存储逻辑
              console.log('评论内容:', this.comment);
              this.comment = '';
            }
          });
      }
      .width('100%')
      .padding({ left: 16, right: 16 });
    }
  }

  build() {
    Row() {
      TextArea({ placeholder: '写评论' })
        .height(32)
        .backgroundColor(Color.White)
        .width('60%')
        .focusOnTouch(false)
        .margin({ left: 16, top: 8, bottom: 8 }) // 减小底部边距
        .bindSheet(this.isShowSheet, this.CommentSheet(), {
          height: this.customHeight,
          dragBar: false,
          maskColor: Color.Transparent,
          title: { title: '写评论' },
          onDisappear: () => {
          },
          onWillDismiss: (() => {
            this.isShowSheet = false;
          }),
        })
        .onClick(() => {
          this.isShowSheet = true;
        });

      Flex({ direction: FlexDirection.Row, justifyContent: FlexAlign.Center }) {
        Image($r('app.media.message_active'))
          .width(17)
          .margin({ right: 18 })
          .onClick(() => {
            // 跳转到评论页面
            router.pushUrl({
              url: 'pages/CommentPage',
              params: {
                newsData: this.newsItem
              }
            });
          });

        Image(this.newsItem.isLiked ? $r('app.media.heart_fill') : $r('app.media.heart'))
          .width(17)
          .margin({ right: 18 })
          .onClick(() => {
            this.toggleLike();
          });
        Image(this.newsItem.isCollected ? $r('app.media.star_fill') : $r('app.media.star'))
          .width(17)
          .margin({ right: 18 })
          .onClick(() => {
            this.toggleCollect();
          });

        // 分享按钮
        Image($r('app.media.share'))  // 可以使用现有的分享图标或添加新图标
          .width(17)
          .margin({ right: 18 })
          .onClick(() => {
            this.shareNews();
          });
      }
      .width('40%')
      .margin({ top: 8, bottom: 8, right: 16 }); // 减小底部边距
    }
    .height(88)
    .backgroundColor('#F1F2F3')
  }
}

// 评论数据模型
class CommentData {
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
struct NewsDetail {
  @State newsItem: NewsData = new NewsData();
  @StorageLink('currentBreakpoint') currentBreakpoint: string = BreakpointConstants.BREAKPOINT_LG;

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

  aboutToAppear(): void {
    // 获取传递过来的参数
    let params: Object = router.getParams();
    if (Reflect.has(params, 'newsData')) {
      let data: Object = Reflect.get(params, 'newsData');

      // 由于通过路由传递的对象会失去类型信息，我们需要重新构造NewsData对象
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
  }

  build() {
    Flex({ direction: FlexDirection.Column }) {
      // 返回按钮
      Column() {
        Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center }) {
          Image($r('app.media.chevron_backward'))
            .width(42)
            .margin({ left: 16, top: 20, bottom: 10 })  // 减小顶部边距
            .onClick(() => {
              router.back();
            });

          Text('新闻详情')
            .fontSize(20)
            .fontWeight(700)
            .fontColor(Color.Black)
            .margin({ left: 14, right: 16, top: 20, bottom: 10 })  // 减小顶部边距
            .layoutWeight(1);

          // Image($r('app.media.ic_public_search'))
          //   .width(42)
          //   .margin({ right: 16, top: 20, bottom: 14 })  // 减小顶部边距
        }
      }

      Column() {
        Scroll() {
          Column() {
            // 新闻标题
            Text(this.newsItem.newsTitle)
              .fontSize($r('app.integer.news_detail_title_font_size'))
              .fontColor($r('app.color.text_font_color'))
              .fontWeight(CommonConstants.FONT_WEIGHT_600)
              .width(CommonConstants.FULL_PERCENT)
              .textAlign(TextAlign.Start);

            // 发布时间
            Text(this.newsItem.newsTime)
              .fontSize($r('app.integer.news_time_font_size'))
              .fontColor($r('app.color.news_time_fontColor'))
              .width(CommonConstants.FULL_PERCENT)
              .textAlign(TextAlign.Start)
              .margin({ top: $r('app.string.news_detail_time_margin_top') });

            // 新闻图片
            if (this.newsItem.newsImage && this.newsItem.newsImage !== '') {
              // 使用Resource类型直接渲染图片，避免字符串插值导致的问题
              if (typeof this.newsItem.newsImage === 'string') {
                Image($rawfile(this.newsItem.newsImage as string))
                  .width(CommonConstants.FULL_PERCENT)
                  .height($r('app.integer.news_detail_image_height'))
                  .objectFit(ImageFit.Cover)
                  .margin({ top: $r('app.string.news_detail_image_margin_top') })
                  .borderRadius($r('app.float.image_border_radius'));
              } else {
                Image(this.newsItem.newsImage as Resource)
                  .width(CommonConstants.FULL_PERCENT)
                  .height($r('app.integer.news_detail_image_height'))
                  .objectFit(ImageFit.Cover)
                  .margin({ top: $r('app.string.news_detail_image_margin_top') })
                  .borderRadius($r('app.float.image_border_radius'));
              }
            }

            // 新闻内容
            Text(this.newsItem.newsContent)
              .fontSize($r('app.integer.news_content_font_size'))
              .fontColor($r('app.color.text_font_color'))
              .width(CommonConstants.FULL_PERCENT)
              .textAlign(TextAlign.Start)
              .lineHeight($r('app.integer.news_content_font_line_height'))
              .margin({ top: $r('app.string.news_detail_content_margin_top') });
          }
          .width(CommonConstants.FULL_PERCENT)
          .padding({
            left: new BreakpointType($r('app.float.page_col_padding_sm'),
                                    $r('app.float.page_col_padding_md'),
                                    $r('app.float.page_col_padding_lg')).getValue(this.currentBreakpoint),
            right: new BreakpointType($r('app.float.page_col_padding_sm'),
                                     $r('app.float.page_col_padding_md'),
                                     $r('app.float.page_col_padding_lg')).getValue(this.currentBreakpoint)
          });
        }
        .width('100%')
        .layoutWeight(1)

        CommentBar({ newsItem: this.newsItem })
      }
      .height('100%')
    }
    .height('100%')
  }
}