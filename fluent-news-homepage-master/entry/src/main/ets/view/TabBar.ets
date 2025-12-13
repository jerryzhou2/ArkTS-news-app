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

import { BreakpointConstants } from '../constants/BreakpointConstants';
import { CommonConstants } from '../constants/CommonConstants';
import { HomeConstants as Const } from '../constants/HomeConstants';
import NewsTypeModel from '../viewmodel/NewsTypeModel';
import newsViewModel from '../viewmodel/NewsViewModel';
import { PullToRefreshNews } from './PullToRefreshNews';

@Component
export default struct TabBar {
  @State tabBarArray: NewsTypeModel[] = newsViewModel.getDefaultTypeList();
  @State currentIndex: number = CommonConstants.ZERO;
  @StorageLink('currentBreakpoint') currentBreakpoint: string = BreakpointConstants.BREAKPOINT_LG;

  // 拖拽状态
  @State isDragging: boolean = false;
  @State draggingIndex: number = -1;

  @Builder
  TabBuilder(id: number, index: number) {
    Column() {
      Text(this.tabBarArray[id].name)
        .height(CommonConstants.FULL_PERCENT)
        .padding({ left: Const.TAB_BARS_HORIZONTAL_PADDING, right: Const.TAB_BARS_HORIZONTAL_PADDING })
        .fontSize(this.currentIndex === index ?
          (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
            $r('app.float.tab_bar_font_size_20') : $r('app.float.tab_bar_font_size_22')) :
          (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ?
            $r('app.float.tab_bar_font_size_16') : $r('app.float.tab_bar_font_size_18')))
        .fontWeight(this.currentIndex === index ?
          Const.TAB_BARS_SELECT_TEXT_FONT_WEIGHT : Const.TAB_BARS_UN_SELECT_TEXT_FONT_WEIGHT)
        .fontColor($r('app.color.fontColor_text3'))
    }
    .alignItems(HorizontalAlign.Start)
    .backgroundColor(this.draggingIndex === index ?
      Const.DRAG_BG_COLOR_DRAGGING : Const.DRAG_BG_COLOR_NORMAL)
    .borderRadius(Const.DRAG_BORDER_RADIUS)
    .border({
      width: this.draggingIndex === index ? Const.DRAG_BORDER_WIDTH : 0,
      color: Const.DRAG_BORDER_COLOR
    })
    .opacity(this.draggingIndex === index ?
      Const.DRAG_OPACITY_DRAGGING : Const.DRAG_OPACITY_NORMAL)
    .scale({
      x: this.draggingIndex === index ?
        Const.DRAG_SCALE_DRAGGING : Const.DRAG_SCALE_NORMAL,
      y: this.draggingIndex === index ?
        Const.DRAG_SCALE_DRAGGING : Const.DRAG_SCALE_NORMAL
    })
    .draggable(true)
    .onDragStart(() => {
      this.isDragging = true;
      this.draggingIndex = index;
    })
    .onDragEnter(() => {
      if (this.isDragging && this.draggingIndex !== -1 && this.draggingIndex !== index) {
        this.swapTabs(this.draggingIndex, index);
        // 拖拽完成后，拖拽的tab现在在index位置
        this.draggingIndex = index;
      }
    })
    .onDragEnd(() => {
      this.isDragging = false;
      this.draggingIndex = -1;
    })
    .onDrop(() => {
      this.isDragging = false;
      this.draggingIndex = -1;
    })
  }

  private swapTabs(index1: number, index2: number) {
    if (index1 === index2) return;

    // 创建新数组
    const newArray = [...this.tabBarArray];

    // 交换两个元素
    let GeneratedDestructArray_1 = [newArray[index2], newArray[index1]];
    newArray[index1] = GeneratedDestructArray_1[0];
    newArray[index2] = GeneratedDestructArray_1[1];

    // 更新数组
    this.tabBarArray = newArray;

    // 更新当前选中索引
    if (this.currentIndex === index1) {
      this.currentIndex = index2;
    } else if (this.currentIndex === index2) {
      this.currentIndex = index1;
    }
  }

  build() {
    Tabs({ barPosition: BarPosition.Start, index: this.currentIndex }) {
      ForEach(this.tabBarArray, (tabsItem: NewsTypeModel, index: number) => {
        TabContent() {
          PullToRefreshNews()
        }
        .tabBar(this.TabBuilder(tabsItem.id, index))
      }, (item: NewsTypeModel) => JSON.stringify(item));
    }
    .barHeight(Const.TAB_BARS_BAR_HEIGHT)
    .barMode(BarMode.Scrollable)
    .barWidth(Const.TAB_BARS_BAR_WIDTH)
    .vertical(false)
    .onChange((index: number) => {
      if (!this.isDragging) {
        this.currentIndex = index;
      }
    })
  }
}