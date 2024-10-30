import { formatInTimeZone } from "date-fns-tz";

const dateFormat = (date) => {
  return formatInTimeZone(date, "Asia/Seoul", "dd MMM yyyy");
};

export default dateFormat;
