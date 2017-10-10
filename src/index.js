#!/usr/bin/env node

import program from 'commander';

import {
  parseContributions,
  validateTimezone,
  parseTime,
  parseDate
} from './parsers';

import { deliverUnicorn } from './unicorn';
import { printHeader, forTheLulz } from './utils';

import { DEFAULT_REALISTIC_GAPS } from './defaults';

printHeader();

/**
 * CLI options
 */
program
  .version('0.1.0')
  .option(
    '-r, --realistic',
    `Humans can not contribute every day`
  )
  .option(
    '-g, --realistic-gaps [gaps]',
    `Leaves gaps between contributions, so your history looks realistic [${DEFAULT_REALISTIC_GAPS}]`,
    g => parseInt(g), DEFAULT_REALISTIC_GAPS
  )
  .option(
    '-w, --only-weekends',
    'Recruiters love geeks without social life (WIP)',
    forTheLulz.bind(null, '--only-weekends')
  )
  .option(
    '-Z, --crazy-hours',
    'Pretend you code instead of watching Netflix every night (WIP)',
    forTheLulz.bind(null, '--crazy-hours')
  )
  .option(
    '-a, --artistic',
    'Write your name in the history graph (WIP)',
    forTheLulz.bind(null, '--artistic')
  )
  .option(
    '-p, --profile <stereotype>',
    'Available profiles: night-owl, early-bird, office-hours, weekender (WIP)',
    forTheLulz.bind(null, '--profile')
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
    'How many contributions make you the best Engineer at your company? [3000]',
    parseContributions, parseContributions('3000')
  )
  .option(
    '-v, --verbose',
    'Show git commands being executed, etc.'
  )
  .parse(process.argv);

// This is where the magic happens and you become a unicorn
deliverUnicorn();
