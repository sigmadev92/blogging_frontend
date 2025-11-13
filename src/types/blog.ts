import type { FullName } from "./user";

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
  thumbnail: {
    secure_url: string;
    publicId: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

export type PublicBlog = Blog & {
  authorId: {
    fullName: FullName;
    profilePic: {
      secure_url: string;
      publicId: string;
    };
  };
};

export type BlogDetails = {
  authorName: FullName;
  authorId: string;
  blogs: Blog[];
};
