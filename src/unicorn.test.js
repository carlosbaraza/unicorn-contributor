import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { parseDate } from './parsers';

let sandbox, processExit;
let program = {
  from: parseDate('20160101'),
  to: parseDate('20190101'),
  contributions: 300,
};

import * as utils from './utils';
const { initDays } = proxyquire('./unicorn', {
  'commander': program,
  'cli-progress': {},
  './utils': {
    ...utils,
    printError: () => {},
  }
});

describe('parameters', function() {
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
      const days = initDays();
      expect(days.length).to.eql(1461);
    });

    it('can not set date after to date', function() {
      program.from = parseDate('20200101');
      program.to = parseDate('20190101');
      expect(() => initDays()).to.throw('1');
    });
  });
});
