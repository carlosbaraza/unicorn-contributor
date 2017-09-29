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

import program from 'commander';
import { spawnSync } from 'child_process';
import moment from 'moment-timezone';

export function deliverUnicorn() {
  const days = initDays();
  initContributions(days);
  contribute(days);
  celebrate();
}

function initDays() {
  const days = [];

  for (let i = 365; i >= 0; i--) {
    days.push({
      date: moment().tz(program.timezone).subtract(i, "days"),
      contributions: [{}],
    });
  }
  const remainingContributions = program.contributions - days.length;
  for (let i = 0; i < remainingContributions; i++) {
    const dayIndex = Math.floor(Math.random() * days.length);
    days[dayIndex].contributions.push({});
  }

  return days;
}

function initContributions(days) {
  days.map((day, dayIndex) => {
    day.contributions = day.contributions.map(contribution => {
      contribution.time = day.date.clone();
      contribution.time.set({
        hour: program.timeWakeUp.get('hour'),
        minute: 0,
      });
      contribution.command =
        `echo "I am a unicorn" >> ${process.cwd()}/.unicorn-contributor`;
      return contribution;
    });
    return day;
  })
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
  console.log('Executing:', command);
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
//  | |                        / ;   \;;,\
(<_  | ;                      /',/-----'  _>
\_| ||_                     //~;~~~~~~~~~
 \`\_|                   (,~~
                         \~\
                          ~~
  `);
  console.log(
    'Congratulations! You are a unicorn contributor.',
    'Just push this repository to GitHub and your profile will display a nice',
    'and full green bar.'
  );
}
