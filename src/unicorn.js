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
import { times, randomInt, printUnicorn, printError } from "./utils";

const _progress = require('cli-progress');
const progressBar = new _progress.Bar({}, _progress.Presets.shades_classic);

export function deliverUnicorn() {
  console.log('Generating your human looking contribution bar...\n');
  const days = initDays();
  initContributions(days);

  console.log('Running GIT contributions now...\n');
  progressBar.start(program.contributions, 0);
  contribute(days);
  celebrate();
}

export function initDays() {
  const days = [];

  const numberOfDays = program.to.diff(program.from, 'days');
  if (numberOfDays < 0) {
    printError('The "to" date should be later than the "from" date');
    process.exit(1);
  }
  times(numberOfDays)(i => {
    const date = program.to.clone()
      .subtract(numberOfDays - i, "days");

    days.push({ date, contributions: [{}] });
  });

  assignContributions(days);

  return days;
}

function assignContributions(days) {
  let remainingContributions = program.contributions - days.length;
  while (remainingContributions > 0) {
    const dayIndex = randomInt(days.length - 1, 0);

    // This makes it look more realistic
    let contributionsForTheDay = randomInt(15, 3);

    // Don't contribute more than the given number of contributions
    if (contributionsForTheDay > remainingContributions)
      contributionsForTheDay = remainingContributions;

    remainingContributions -= contributionsForTheDay;
    times(contributionsForTheDay)(() => days[dayIndex].contributions.push({}));
  }
}

function initContributions(days) {
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
