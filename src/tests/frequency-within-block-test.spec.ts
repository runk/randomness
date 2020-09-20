import tester from './frequency-within-block-test';
import { getData } from '../test/utils';

describe('frequency within block test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.12282637574855537],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [false, 0],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [true, 0.9993684686691751],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [false, 0],
    },
    {
      file: 'reference.txt',
      expect: [true, 0.7064384496412814 ],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(tester(getData(test.file))).toEqual(test.expect);
    });
  });
});
