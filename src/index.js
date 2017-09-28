#!/usr/bin/env node

import program from 'commander';

import { parseContributions, validateTimezone, parseTime } from './parsers';
import { deliverUnicorn } from './unicorn';

/**
 * CLI options
 */
program
  .version('0.1.0')
  .option(
    '-c, --contributions [contributions]',
    'Minimum 365, guess why [1000]',
    parseContributions, parseContributions('1000')
  )
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
    '-Z, --crazy-hours',
    'Pretend you code instead of watching Netflix every night'
  )
  .parse(process.argv);


// This is where the magic happens and you become a unicorn
deliverUnicorn();
