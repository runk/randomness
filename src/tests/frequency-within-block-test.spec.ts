import tester from './frequency-within-block-test';
import { getData } from '../test/utils';

describe('frequency within block test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.12282637574855537, null],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [false, 0, null],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [true, 0.9993684686691751, null],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [false, 0, null],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(tester(getData(test.file))).toEqual(test.expect);
    });
  });
});
