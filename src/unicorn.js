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
import { times, randomInt } from "./utils";

export function deliverUnicorn() {
  const days = initDays();
  initContributions(days);
  contribute(days);
  celebrate();
}

function initDays() {
  const days = [];

  const numberOfDays = 370; // Just a bit more than a year
  times(numberOfDays)(i => {
    const date = moment()
      .tz(program.timezone)
      .subtract(numberOfDays - i, "days");

    days.push({ date, contributions: [{}] });
  });

  assignContributions(days);

  return days;
}

function assignContributions(days) {
  let remainingContributions = program.contributions - days.length;
  while (remainingContributions > 0) {
    const dayIndex = randomInt(days.length, 0);

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
      runCommand(contribution.command);
      runCommand(`git add ${process.cwd()}/.unicorn-contributor`);
      runCommand(
        `GIT_AUTHOR_DATE="${contribution.time.toISOString()}" ` +
          `GIT_COMMITTER_DATE="${contribution.time.toISOString()}" ` +
          'git commit -m "I am a unicorn contributor"'
      );
    });
  });
}

function runCommand(command) {
  console.log("Executing:", command);
  return spawnSync(command, [], { shell: true });
}

function celebrate() {
  console.log(`
                   ,,))))))));,
                __)))))))))))))),
     \|/       -\(((((''''((((((((.
     -*-==//////((''  .     \`)))))),
     /|\      ))| o    ;-.    '(((((                                  ,(,
              ( \`|    /  )    ;))))'                               ,_))^;(~
                 |   |   |   ,))((((_     _____------~~~-.        %,;(;(>';'~
                 o_);   ;    )))(((\` ~---~  \`::           \      %%~~)(v;(\`('~
                       ;    ''''\`\`\`\`         \`:       \`:::|\,__,%%    );\`'; ~
                      |   _                )     /      \`:|\`----'     \`-'
                ______/\/~    |                 /        /
              /~;;.____/;;'  /          ___--,-(   \`;;;/
             / //  _;______;'------~~~~~    /;;/\    /
            //  | |                        / ;   \;;,
           (<_  | ;                      /',/-----'  _>
            \_| ||_                     //~;~~~~~~~~~
                \`\_|                   (,~~
                                        \~\`
                                         ~~
  `);
  console.log(
    "Congratulations! You are a unicorn contributor.",
    "Just push this repository to GitHub and your profile will display a nice",
    "and full green bar."
  );
}
