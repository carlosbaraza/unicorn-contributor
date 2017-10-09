import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { parseDate } from './parsers';

let sandbox, processExit;
let program = {
  from: parseDate('20160101'),
  to: parseDate('20190101'),
  contributions: 1000,
};

import * as utils from './utils';
const { initDaysList } = proxyquire('./unicorn', {
  'commander': program,
  'cli-progress': {},
  './utils': {
    ...utils,
    printError: () => {},
  }
});

describe('unicorn', function() {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    processExit = sandbox.stub(process, 'exit');
    processExit.callsFake((errorCode) => { throw new Error(errorCode) })
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('--from and --to', () => {
    it('starts the days matrix correctly', function() {
      program.from = parseDate('20150101');
      const days = initDaysList();
      expect(days.length).to.eql(1461);
    });

    it('can not set date after to date', function() {
      program.from = parseDate('20200101');
      program.to = parseDate('20190101');
      expect(() => initDaysList()).to.throw('1');
    });
  });

  describe('--gaps', () => {
    it('leaves gaps', function() {
      program.from = parseDate('20160101');
      program.to = parseDate('20170101');
      program.gaps = 75;
      const days = initDaysList();
      const gaps = days.filter(day => day.contributions.length === 0);
      expect(gaps.length).to.be.eql(75);
    });
  });
});
