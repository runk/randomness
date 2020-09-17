import tester from './dft-test';
import { getData } from '../test/utils';

describe('dft test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.11351035965432754],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [false, 0],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [false, 0],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [false, 0],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(tester(getData(test.file))).toEqual(test.expect);
    });
  });
});
