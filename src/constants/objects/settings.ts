import type { User } from "../../types/user";
import { getAge, getZodiac } from "../functions/time";
import { genderMap } from "../objects/genderValues";

export default function settings(user: User) {
  const settings1: {
    legend: string;
    showValue: boolean;
    value?: string | number | null;
    ask: { q: string; ans: boolean; param?: string }[];
  }[] = [
    {
      legend: "Thumbnail",
      showValue: false,
      ask: [
        { q: "Is thumbnail set", ans: Boolean(user?.thumbnail?.publicId) },
        {
          q: "Display on Profile",
          ans: user?.thumbnailToBeShown,
          param: "thumbnailToBeShown",
        },
      ],
    },
    {
      legend: "Profile Picture",
      showValue: false,
      ask: [
        { q: "Is profilePic set", ans: Boolean(user?.profilePic?.publicId) },
        {
          q: "Display on Profile",
          ans: user?.profilePicToBeShown,
          param: "profilePicToBeShown",
        },
      ],
    },
    {
      legend: "Email Preferences",
      showValue: true,
      value: user?.email,
      ask: [
        { q: "Is Email set", ans: true },
        {
          q: "Display on Profile",
          ans: user?.emailToBeShown,
          param: "emailToBeShown",
        },
      ],
    },
    {
      legend: "Date of Birth",
      showValue: true,
      value: user.dob ? new Date(user.dob!).toISOString().split("T")[0] : "",
      ask: [
        { q: "Is Date of Birth set", ans: user.dobSet },
        {
          q: "Display on Profile",
          ans: user?.dobToBeShown,
          param: "dobToBeShown",
        },
      ],
    },
    {
      legend: "Age",
      showValue: true,
      value: getAge(user?.dob || null),
      ask: [
        { q: "Is Age Calculated", ans: user?.dobSet },
        { q: "Display on Profile", ans: user?.dobToBeShown },
      ],
    },
    {
      legend: "Zodiac",
      showValue: true,
      value: getZodiac(user?.dob || null),
      ask: [
        { q: "Is Zodiac determined", ans: user?.dobSet },
        { q: "Display on Profile", ans: user?.dobToBeShown },
      ],
    },
    {
      legend: "Nationality",
      showValue: true,
      value: user?.country || "Not set yet",
      ask: [
        { q: "Is Nationality set", ans: user?.countrySet },
        {
          q: "Display on Profile",
          ans: user?.countryToBeShown,
          param: "countryToBeShown",
        },
      ],
    },
    {
      legend: "Gender",
      showValue: true,
      value: genderMap[user?.gender || "NS"],
      ask: [
        { q: "Is Gender set", ans: !(user.gender === "NS") },
        {
          q: "Display on Profile",
          ans: user?.genderToBeShown,
          param: "genderToBeShown",
        },
      ],
    },
    {
      legend: "Patronize Youself",
      showValue: user?.getFund.setup,
      value: user?.getFund.min,
      ask: [
        { q: "Is My Transaction system set", ans: user?.getFund.setup },
        {
          q: "Display on Profile",
          ans: user?.getFund.toBeShown,
          param: "getFund.toBeShown",
        },
      ],
    },
    {
      legend: "Message Settings",
      showValue: false,
      value: null,
      ask: [
        { q: "Do you want conversations", ans: true },
        { q: "Do you want people to message you first ?", ans: true },
        { q: "Display on Profile", ans: true, param: "" },
      ],
    },
  ];

  return settings1;
}
