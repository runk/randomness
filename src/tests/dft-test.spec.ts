import dft from './dft-test';
import { getData } from '../test/utils';

describe('dft test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.11351035965432754, null],
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
      expect(dft(getData(test.file))).toEqual(test.expect);
    });
  });
});
