export default function getTimeAgo(time: Date) {
  const diff = Math.floor((Date.now() - new Date(time).getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export function getAge(dateInput: string | Date | null): number | null {
  if (dateInput === null) {
    return null;
  }
  const birthDate = new Date(dateInput);
  const today = new Date();

  // ---- Age Calculation ----
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasNotHadBirthdayThisYear =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (hasNotHadBirthdayThisYear) {
    age--;
  }

  return age;
}

export function getZodiac(dateInput: string | Date | null): string | null {
  // ---- Zodiac Calculation ----
  if (dateInput === null) {
    return null;
  }
  const birthDate = new Date(dateInput);
  const month = birthDate.getMonth() + 1; // JS months 0-11
  const day = birthDate.getDate();

  const zodiacSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

  const zodiac =
    zodiacSigns.find((z) => {
      const [startMonth, startDay] = z.start;
      const [endMonth, endDay] = z.end;

      if (startMonth === 12 && month === 1) {
        return day <= endDay; // Capricorn case bridging year-end
      }

      if (month === startMonth && day >= startDay) return true;
      if (month === endMonth && day <= endDay) return true;

      return false;
    })?.sign || "Unknown";

  return zodiac;
}
