type DateInfo = {
  fullName: string;
  shortName: string;
};

export const Months: DateInfo[] = [
  { fullName: "January", shortName: "Jan" },
  { fullName: "February", shortName: "Feb" },
  { fullName: "March", shortName: "Mar" },
  { fullName: "April", shortName: "Apr" },
  { fullName: "May", shortName: "May" },
  { fullName: "June", shortName: "Jun" },
  { fullName: "July", shortName: "Jul" },
  { fullName: "August", shortName: "Aug" },
  { fullName: "September", shortName: "Sep" },
  { fullName: "October", shortName: "Oct" },
  { fullName: "November", shortName: "Nov" },
  { fullName: "December", shortName: "Dec" },
] as const;

export const daysOfWeek: DateInfo[] = [
  { fullName: "Monday", shortName: "Mon" },
  { fullName: "Tuesday", shortName: "Tue" },
  { fullName: "Wednesday", shortName: "Wed" },
  { fullName: "Thursday", shortName: "Thu" },
  { fullName: "Friday", shortName: "Fri" },
  { fullName: "Saturday", shortName: "Sat" },
  { fullName: "Sunday", shortName: "Sun" },
] as const;

export const formatDate = (publication?: Date | number) => {
  if (!publication) return null;
  const date = new Date(publication);
  const currentDayOfWeek = date.getDay();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = currentDay < 9 ? "0" + currentDay : currentDay;
  const month = Months[currentMonth];

  const lastDigit = currentDay % 10;
  const lastTwoDigits = currentDay % 100;

  const dayAndMonth = `${formattedDay}.${currentMonth < 9 ? "0" + currentMonth : currentMonth}`;
  const currentHours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const currentMin = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  let daySuffix: "th" | "st" | "nd" | "rd";

  switch (true) {
    case lastTwoDigits >= 11 && lastTwoDigits <= 13:
      daySuffix = "th";
      break;
    case lastDigit === 1:
      daySuffix = "st";
      break;
    case lastDigit === 2:
      daySuffix = "nd";
      break;
    case lastDigit === 3:
      daySuffix = "rd";
      break;
    default:
      daySuffix = "th";
      break;
  }

  return {
    formattedDay,
    time: `${currentHours}:${currentMin}`,
    month,
    year,
    dayOfWeek: daysOfWeek[currentDayOfWeek - 1],
    daySuffix,
    dayAndMonth,
    dayAsNumber: currentDay,
    monthNumber: currentMonth,
  };
};
