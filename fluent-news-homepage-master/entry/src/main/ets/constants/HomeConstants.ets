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

import NewsTypeModel from '../viewmodel/NewsTypeModel';

// 在 HomeConstants.ets 中添加以下内容
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
    { id: 0, name: $r('app.string.tab_bar_type1') },
    { id: 1, name: $r('app.string.tab_bar_type2') },
    { id: 2, name: $r('app.string.tab_bar_type3') },
    { id: 3, name: $r('app.string.tab_bar_type4') },
    { id: 4, name: $r('app.string.tab_bar_type5') },
    { id: 5, name: $r('app.string.tab_bar_type6') },
    { id: 6, name: $r('app.string.tab_bar_type7') },
    { id: 7, name: $r('app.string.tab_bar_type8') }
  ];

  // 新增：拖拽相关常量
  /**
   * Drag and drop opacity when dragging.
   */
  public static readonly DRAG_OPACITY_DRAGGING: number = 0.7;
  /**
   * Drag and drop opacity when normal.
   */
  public static readonly DRAG_OPACITY_NORMAL: number = 1.0;
  /**
   * Drag and drop scale when dragging.
   */
  public static readonly DRAG_SCALE_DRAGGING: number = 1.1;
  /**
   * Drag and drop scale when normal.
   */
  public static readonly DRAG_SCALE_NORMAL: number = 1.0;
  /**
   * Drag and drop background color when dragging.
   */
  public static readonly DRAG_BG_COLOR_DRAGGING: ResourceColor = $r('app.color.drag_bg_color_dragging');
  /**
   * Drag and drop background color when normal.
   */
  public static readonly DRAG_BG_COLOR_NORMAL: ResourceColor = $r('app.color.transparent');
  /**
   * Drag and drop border radius.
   */
  public static readonly DRAG_BORDER_RADIUS: number = 8;
  /**
   * Drag and drop border width.
   */
  public static readonly DRAG_BORDER_WIDTH: number = 2;
  /**
   * Drag and drop border color.
   */
  public static readonly DRAG_BORDER_COLOR: ResourceColor = $r('app.color.primary_color');
}