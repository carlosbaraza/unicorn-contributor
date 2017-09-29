import moment from "moment-timezone";
import program from "commander";
import { printError, printWarning } from "./utils";

export function parseContributions(value) {
  const contributions = parseInt(value);
  const numberOfDays = program.to.diff(program.from, 'days');
  if (contributions < numberOfDays) {
    printWarning(
      'The number of contributions you introduced is lower than' +
      'the number of days between the --from and --to dates:\n',
      `  From date: ${program.from.toISOString()}`,
      `  To date: ${program.to.toISOString()}`,
      `  Number of days between dates: ${numberOfDays}\n`,
      'Recomended: 3 times more contributions than days.',
      `Using number of days times 3 instead: ${numberOfDays * 3}`
    );
    return numberOfDays * 3;
  }
  return contributions;
}

export function validateTimezone(value) {
  if (!moment.tz.zone(value)) {
    printError(
      "Please use a valid tz timezone:",
      "https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"
    );
    process.exit(1);
  }

  return value;
}

export function parseTime(value) {
  return moment().hour(value).tz(program.timezone);
}

export function parseDate(dateString) {
  const date = moment(dateString);
  if (!date.isValid()) {
    printError(
      `The date "${dateString}" is not a valid date`,
      "Please use a valid date. E.g. 20170101"
    );
    process.exit(1);
  }
  return date;
}
