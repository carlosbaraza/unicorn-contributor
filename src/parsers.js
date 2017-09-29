import moment from "moment-timezone";
import program from "commander";

export function parseContributions(value) {
  const contributions = parseInt(value);
  if (contributions < 365) return 365;
  return contributions;
}

export function validateTimezone(value) {
  if (!moment.tz.zone(value))
    throw new Error(
      "Please use a valid tz timezone: " +
        "https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"
    );
  return value;
}

export function parseTime(value) {
  return moment().hour(value).tz(program.timezone);
}
