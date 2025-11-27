import type { User } from "../../types/user";
import { getAge, getZodiac } from "../functions/time";
import { genderMap } from "../objects/genderValues";

export default function settings(user: User) {
  return [
    {
      legend: "Thumbnail",
      showValue: false,
      ask: [
        { q: "Is thumbnail set", ans: Boolean(user?.thumbnail?.publicId) },
        { q: "Display on Profile", ans: user?.thumbnailToBeShown },
      ],
    },
    {
      legend: "Profile Picture",
      showValue: false,
      ask: [
        { q: "Is profilePic set", ans: Boolean(user?.profilePic?.publicId) },
        { q: "Display on Profile", ans: user?.profilePicToBeShown },
      ],
    },
    {
      legend: "Email Preferences",
      showValue: true,
      value: user?.email,
      ask: [
        { q: "Is Email set", ans: true },
        { q: "Display on Profile", ans: user?.emailToBeShown },
      ],
    },
    {
      legend: "Date of Birth",
      showValue: true,
      value: user?.dob?.toDateString(),
      ask: [
        { q: "Is Date of Birth set", ans: false },
        { q: "Display on Profile", ans: user?.dobToBeShown },
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
        { q: "Is Date of Birth set", ans: user?.dobSet },
        { q: "Display on Profile", ans: user?.dobToBeShown },
      ],
    },
    {
      legend: "Nationality",
      showValue: true,
      value: user?.country || "Not set yet",
      ask: [
        { q: "Is Nationality set", ans: user?.countrySet },
        { q: "Display on Profile", ans: user?.countryToBeShown },
      ],
    },
    {
      legend: "Gender",
      showValue: true,
      value: genderMap[user?.gender || "NS"],
      ask: [
        { q: "Is Gender set", ans: genderMap[user?.gender || "NS"] },
        { q: "Display on Profile", ans: user?.genderToBeShown },
      ],
    },
    {
      legend: "Patronize Youself",
      showValue: user?.getFund.setup,
      value: user?.getFund.min,
      ask: [
        { q: "Is My Transaction system set", ans: user?.getFund.setup },
        { q: "Display on Profile", ans: user?.getFund.toBeShown },
      ],
    },
  ];
}
