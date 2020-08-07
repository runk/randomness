import tester from './longest-run-ones-in-a-block-test';
import { getData } from '../../test/utils';

describe('frequency within block test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.9626381937407507, null],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [false, 3.274641253084219e-164, null],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [false, 1.3358391046288547e-79, null],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [false, 3.630579471788652e-119, null],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(tester(getData(test.file))).toEqual(test.expect);
    });
  });
});
