export function randomInt(max = 10, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const times = nunmberOfIterations => callback => {
  const iterator = index => {
    if (index === nunmberOfIterations) return;
    callback(index);
    iterator(index + 1);
  };
  return iterator(0);
};

export function printError(...msgs) {
  console.log('\n\nError: unfortunately you could not become a unicorn\n');
  msgs.forEach(msg => console.log(msg));
}

export function processError(...msgs) {
  printError(...msgs);
  process.exit(1);
}

export function printWarning(...msgs) {
  console.log('\nWarning: -----------------------------------------------\n');
  msgs.forEach(msg => console.log(msg));
  console.log('\n--------------------------------------------------------\n');
}

export function printHeader() {
  console.log('');
  console.log('+-----------------------------------------------------------------+');
  console.log('|  UNICORN CONTRIBUTOR - turning you into a beautiful unicorn     |');
  console.log('+-----------------------------------------------------------------+');
  console.log('');
}

export function printUnicorn() {
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
}
