import type { ImageType } from "./image";

export type FullName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export enum Gender {
  M = "M",
  F = "F",
  O = "O",
  NS = "NS", // Not Specified
}

export enum UserRole {
  reader = "reader",
  author = "author",
}
export type User = {
  _id: string;
  email: string;
  isMailVerified?: boolean;
  isPublic: boolean;
  isAccountVerified?: boolean;
  isPremiumAccount?: boolean;
  password?: string;
  fullName: FullName;
  gender: Gender;
  role: UserRole;
  profilePic?: ImageType;
  userName?: string;
  thumbnail?: ImageType;
  about?: string;
};

export type FollowUser = {
  _id: string;
  fullName: FullName;
  profilePic?: ImageType;
  userName?: string;
};

export type FollowUserObject = {
  [key: string]: FollowUser;
};
