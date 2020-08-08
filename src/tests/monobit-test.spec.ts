import monobit from './monobit-test';
import { getData } from '../test/utils';

describe('monobit test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [true, 0.9299636079348544, null],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [false, 0, null],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [true, 0.7457724276919916, null],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [false, 0, null],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(monobit(getData(test.file))).toEqual(test.expect);
    });
  });
});
