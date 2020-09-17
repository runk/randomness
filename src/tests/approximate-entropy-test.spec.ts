import tester from './approximate-entropy-test';
import { getData } from '../test/utils';

describe('approximate entropy test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.6187571950532104],
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
    {
      file: 'reference.txt',
      expect: [true, 0.23530074585899877],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(tester(getData(test.file))).toEqual(test.expect);
    });
  });
});
