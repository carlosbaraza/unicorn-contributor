#!/usr/bin/env node

import program from 'commander';

import {
  parseContributions,
  validateTimezone,
  parseTime,
  parseDate
} from './parsers';

import { deliverUnicorn } from './unicorn';
import { printHeader } from './utils';

printHeader();

/**
 * CLI options
 */
program
  .version('0.1.0')
  .option(
    '-w, --only-weekends',
    'Recruiters love geeks without social life'
  )
  .option(
    '-t, --timezone [timezone]',
    'Change your timezone (tz) [GMT]',
    validateTimezone, 'GMT'
  )
  .option(
    '-u, --time-wake-up [time]',
    'Time for first commit of the day [6]',
    parseTime, parseTime('6')
  )
  .option(
    '-s, --time-sleep [time]',
    'Time for last sleepy commit [24]',
    parseTime, parseTime('24')
  )
  .option(
    '-f, --from [date]',
    'Date to start contributing [20160101]',
    parseDate, parseDate('20160101')
  )
  .option(
    '-t, --to [date]',
    'Date to stop contributing [20190101]',
    parseDate, parseDate('20190101')
  )
  .option(
    '-c, --contributions [contributions]',
    'Defaults to (number of days from --from to --to) times 3 [3000]',
    parseContributions, parseContributions('3000')
  )
  .option(
    '-Z, --crazy-hours',
    'Pretend you code instead of watching Netflix every night'
  )
  .option(
    '-g, --gaps [gaps]',
    `Leaves gaps between contributions, so your history looks realistic [0]`,
    parseInt, 0
  )
  .option(
    '-v, --verbose',
    'Show git commands being executed, etc.'
  )
  .parse(process.argv);


// This is where the magic happens and you become a unicorn
deliverUnicorn();
