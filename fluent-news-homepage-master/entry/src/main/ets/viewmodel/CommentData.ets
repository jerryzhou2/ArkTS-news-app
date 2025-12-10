import { CommentPlain } from '../utils/CommentPlain';

export class CommentData {
  author: string;
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;

  constructor(author: string, content: string, time: string,
    likes: number = 0, isLiked: boolean = false) {
    this.author = author;
    this.content = content;
    this.time = time;
    this.likes = likes;
    this.isLiked = isLiked;
  }

  /* 实体 -> 纯对象 */
  toPlain(): CommentPlain {
    return {
      author: this.author,
      content: this.content,
      time: this.time,
      likes: this.likes,
      isLiked: this.isLiked
    };
  }

  /* 纯对象 -> 实体 */
  static fromPlain(p: CommentPlain): CommentData {
    return new CommentData(
      p.author,
      p.content,
      p.time,
      p.likes,
      p.isLiked
    );
  }
}