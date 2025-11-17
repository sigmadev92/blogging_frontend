export type Like = {
  _id: string;
  blogId: string;
  userId: string;
  action: 1 | -1;
  createdAt: Date;
  updatedAt: Date;
};

export type LikeObject = {
  [key: string]: Like;
};
