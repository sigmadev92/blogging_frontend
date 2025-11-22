import type { FullName } from "../../../types/user";

export type User = {
  _id: string;
  fullName: FullName;
  profilePic?: { secure_url: string; publicId: string };
  userName?: string;
};

export type FollowMap =
  | "0-0-0-0"
  | "0-0-0-1"
  | "0-0-1-0"
  | "0-0-1-1"
  | "0-1-0-0"
  | "0-1-0-1"
  | "0-1-1-0"
  | "0-1-1-1"
  | "1-0-0-0"
  | "1-0-0-1"
  | "1-0-1-0"
  | "1-0-1-1"
  | "1-1-0-0"
  | "1-1-0-1"
  | "1-1-1-0"
  | "1-1-1-1";
