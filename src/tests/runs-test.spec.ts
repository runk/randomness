import runs from './runs-test';
import { getData } from '../../test/utils';

describe('runs test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.24598212153176013, null],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [false, 0, null],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [false, 0, null],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [false, 0, null],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(runs(getData(test.file))).toEqual(test.expect);
    });
  });
});
