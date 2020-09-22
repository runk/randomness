import tester from './binary-matrix-rank-test';
import { getData } from '../test/utils';

describe('binary matrix rank test test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.5411642062854648],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [true, 0.692259775907861],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [true, 0.03273566583736714],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [true, 0.17844943445596398],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(tester(getData(test.file))).toEqual(test.expect);
    });
  });
});
