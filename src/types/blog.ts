import type { FollowUser, FullName } from "./user";

export enum HeadingType {
  filling = "Create New Blog",
  saved = "Add thumbnail",
  publishing = "Publish Now ",
}

export type Blog = {
  _id: string;
  title: string;
  description: string;
  searchTags: string[];
  topics: string[];
  isPublic: boolean;
  isPublished: boolean;
  archived: boolean;
  totalViews: number;
  thumbnail: {
    secure_url: string;
    publicId: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type PublicBlog1 = Blog & {
  authorId: {
    fullName: FullName;
    _id: string;
  };
};

export type PublicBlog = Blog & {
  authorId: FollowUser;
};

export type BlogDetails = {
  authorName: FullName;
  authorId: string;
  blogs: Blog[];
};

export type LikedBlogs = {
  [key: string]: PublicBlog1;
};
