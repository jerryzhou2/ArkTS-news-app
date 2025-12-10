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

export default class NewsData {
  public newsId: string;
  public newsTitle: string | Resource;
  public newsContent: string | Resource;
  public newsTime: string | Resource;
  public newsImage: string | Resource;
  public likes: number;           // 点赞数
  public comments: number;        // 评论数
  public shares: number;          // 分享数
  public isLiked: boolean;        // 是否已点赞
  public isCollected: boolean;    // 是否已收藏
  public isFollowed: boolean;     // 是否已关注

  toString(): string {
    return this.newsId + ' ' + this.newsTitle + ' ' + this.newsContent + ' ' + this.newsTime;
  }

  constructor(
    id: string = '',
    title: string | Resource = '',
    content: string | Resource = '',
    time: string | Resource = '',
    newsImage: string | Resource = '',
    likes: number = 0,
    comments: number = 0,
    shares: number = 0,
    isLiked: boolean = false,
    isCollected: boolean = false,
    isFollowed: boolean = false
  ) {
    this.newsId = id;
    this.newsTitle = title;
    this.newsContent = content;
    this.newsTime = time;
    this.newsImage = newsImage;
    this.likes = likes;
    this.comments = comments;
    this.shares = shares;
    this.isLiked = isLiked;
    this.isCollected = isCollected;
    this.isFollowed = isFollowed;
  }
}