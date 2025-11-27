import type { ImageType } from "./image";

export type FullName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Gender = "M" | "F" | "O" | "NS";

export enum UserRole {
  reader = "reader",
  author = "author",
}

export type FollowUser = {
  _id: string;
  fullName: FullName;
  userName?: string;
  profilePic?: ImageType;
  thumbnail?: ImageType;
  profilePicToBeShown: boolean;
  thumbnailToBeShown?: boolean;
  gender?: Gender;
};

export type FollowUserObject = {
  [key: string]: FollowUser;
};

export type User = {
  _id: string;
  email: string;
  fullName: FullName;
  OtherLinks?: string[];
  gender: Gender;
  dob?: Date;
  country?: string;
  profilePic?: ImageType;
  thumbnail?: ImageType;
  aboutMe?: string;
  userName?: string;
  profileViews: number;
  blogViews: number;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  getFund: {
    setup: boolean;
    want: boolean;
    min: number;
    toBeShown: boolean;
  };

  isMailVerified: boolean;
  isAccountVerified: boolean;
  isPremiumAccount: boolean;
  emailToBeShown: boolean;
  genderToBeShown: boolean;
  profilePicToBeShown: boolean;
  thumbnailToBeShown: boolean;
  dobSet: boolean;
  dobToBeShown: boolean;
  countrySet: boolean;
  countryToBeShown: boolean;
  isPublic: boolean;
  profileViewsToBeShown: boolean;
  blogViewsToBeShown: boolean;
};
