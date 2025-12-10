// 仅用于 JSON 序列化/反序列化
export interface CommentPlain {
  author: string;
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;
}