/**
 *                                        All the magic happens here

               ,,))))))));,
            __)))))))))))))),
 \|/       -\(((((''''((((((((.
 -*-==//////((''  .     `)))))),
 /|\      ))| o    ;-.    '(((((                                  ,(,
          ( `|    /  )    ;))))'                               ,_))^;(~
             |   |   |   ,))((((_     _____------~~~-.        %,;(;(>';'~
             o_);   ;    )))(((` ~---~  `::           \      %%~~)(v;(`('~
                   ;    ''''````         `:       `:::|\,__,%%    );`'; ~
                  |   _                )     /      `:|`----'     `-'
            ______/\/~    |                 /        /
          /~;;.____/;;'  /          ___--,-(   `;;;/
         / //  _;______;'------~~~~~    /;;/\    /
        //  | |                        / ;   \;;,\
       (<_  | ;                      /',/-----'  _>
        \_| ||_                     //~;~~~~~~~~~
            `\_|                   (,~~
                                    \~\
                                     ~~

 */

import program from "commander";
import moment from "moment-timezone";
import { spawnSync } from "child_process";
import { times, randomInt, printUnicorn, processError } from "./utils";

const _progress = require('cli-progress');
const progressBar = new _progress.Bar({}, _progress.Presets.shades_classic);

export function deliverUnicorn() {
  console.log('Generating your human looking contribution bar...\n');
  const days = initDaysList();
  assignContributionCommands(days);

  console.log('Running GIT contributions now...\n');
  progressBar.start(program.contributions, 0);
  contribute(days);
  celebrate();
}

export function initDaysList() {
  const days = [];

  const numberOfDays = program.to.diff(program.from, 'days');
  if (numberOfDays < 0)
    processError('The "to" date should be later than the "from" date');

  // Init list
  times(numberOfDays)(i => {
    const date = program.to.clone().subtract(numberOfDays - i, "days");
    days.push({ date, contributions: [] });
  });

  // Init contributions
  initContributions(days);

  return days;
}

export function initContributions(days) {
  if (program.gaps) markGaps(days);

  days.forEach(day => day.isGap || day.contributions.push({}));
  assignContributions(days);
}

function findNonGap(days) {
  const gapIndex = randomInt(days.length - 1, 0);
  if (!days[gapIndex].isGap) return gapIndex;
  return findNonGap(days);
}

export function markGaps(days) {
  // Find unique days to mark as gaps
  [...Array(program.gaps)].forEach(() => (days[findNonGap(days)].isGap = true));
}

function assignContributions(days) {
  const assignedContributions =
    days.filter(day => day.contributions.length !== 0).length;
  let remainingContributions = program.contributions - assignedContributions;

  while (remainingContributions > 0) {
    const dayIndex = findNonGap(days);

    // This makes it look more realistic
    let contributionsForTheDay = randomInt(15, 3);

    // Don't contribute more than the given number of contributions
    if (contributionsForTheDay > remainingContributions)
      contributionsForTheDay = remainingContributions;

    remainingContributions -= contributionsForTheDay;
    times(contributionsForTheDay)(() => days[dayIndex].contributions.push({}));
  }
}

function assignContributionCommands(days) {
  days.map((day, dayIndex) => {
    day.contributions = day.contributions.map(contribution => {
      contribution.time = day.date.clone();
      contribution.time.set({
        hour: program.timeWakeUp.get("hour"),
        minute: 0
      });
      contribution.command = `echo "I am a unicorn" >> ${process.cwd()}/.unicorn-contributor`;
      return contribution;
    });
    return day;
  });
}

function contribute(days) {
  days.forEach(day => {
    day.contributions.forEach(contribution => {
      progressBar.increment(1);
      runCommand(contribution.command);
      runCommand(`git add ${process.cwd()}/.unicorn-contributor`);
      runCommand(
        `GIT_AUTHOR_DATE="${contribution.time.toISOString()}" ` +
          `GIT_COMMITTER_DATE="${contribution.time.toISOString()}" ` +
          'git commit -m "I am a unicorn contributor"'
      );
    });
  });
  progressBar.stop();
}

function runCommand(command) {
  if (program.verbose) console.log("Executing:", command);
  return spawnSync(command, [], { shell: true });
}

function celebrate() {
  printUnicorn();
  console.log(
    "Congratulations! You are a unicorn contributor.",
    "Just push this repository to GitHub and your profile will display a nice",
    "and full green bar."
  );
}
