import dataPreferences from '@ohos.data.preferences';
import { CommentPlain } from './CommentPlain';

const PREF_NAME = 'news_pref';

class NewsPref {
  private pref: dataPreferences.Preferences | null = null;

  private async ready(): Promise<dataPreferences.Preferences> {
    if (!this.pref) {
      this.pref = await dataPreferences.getPreferences(getContext(), PREF_NAME);
    }
    return this.pref;
  }

  /* ---------- 评论 ---------- */
  private commentKey(newsId: string): string {
    return `comment_${newsId}`;
  }

  async getComments(newsId: string): Promise<CommentPlain[]> {
    const pref = await this.ready();
    const raw = await pref.get(this.commentKey(newsId), '[]') as string;
    try {
      return JSON.parse(raw) as CommentPlain[];
    } catch {
      return [];
    }
  }

  async setComments(newsId: string, list: CommentPlain[]): Promise<void> {
    const pref = await this.ready();
    await pref.put(this.commentKey(newsId), JSON.stringify(list));
    await pref.flush();
  }

  /* ---------- 点赞 ---------- */
  private likeKey(newsId: string): string {
    return `like_${newsId}`;
  }

  async getLike(newsId: string): Promise<[boolean, number]> {
    const pref = await this.ready();
    const isLiked = await pref.get(this.likeKey(newsId) + '_flag', false) as boolean;
    const likes   = await pref.get(this.likeKey(newsId) + '_count', 0) as number;
    return [isLiked, likes];
  }

  async setLike(newsId: string, isLiked: boolean, likes: number): Promise<void> {
    const pref = await this.ready();
    await pref.put(this.likeKey(newsId) + '_flag', isLiked);
    await pref.put(this.likeKey(newsId) + '_count', likes);
    await pref.flush();
  }

  /* ---------- 收藏 ---------- */
  private collectKey(newsId: string): string {
    return `collect_${newsId}`;
  }

  async getCollect(newsId: string): Promise<boolean> {
    const pref = await this.ready();
    return await pref.get(this.collectKey(newsId), false) as boolean;
  }

  async setCollect(newsId: string, isCollected: boolean): Promise<void> {
    const pref = await this.ready();
    await pref.put(this.collectKey(newsId), isCollected);
    await pref.flush();
  }
}

export default new NewsPref();