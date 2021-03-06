import runs from './runs-test';
import { getData } from '../test/utils';

describe('runs test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.24677807212400715],
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
      expect: [true, 0.5007979178870902],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(runs(getData(test.file))).toEqual(test.expect);
    });
  });
});
