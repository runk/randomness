import tester from './cumulative-sums-test';
import { getData } from '../test/utils';

describe('cumulative sums test', () => {
  const tests = [
    {
      file: 'megabitrand.bin',
      expect: [
        true,
        0.9125438168304125,
        [0.9628465631272436, 0.9125438168304125],
      ],
    },
    {
      file: 'sums_megrandom.bin',
      expect: [false, 0, [0, 0]],
    },
    {
      file: 'correlated_megrandom.bin',
      expect: [
        true,
        0.8278980398374987,
        [0.8278980398374987, 0.9788098638506988],
      ],
    },
    {
      file: 'biased_megabitrand.bin',
      expect: [false, 0, [0, 0]],
    },
    {
      file: 'reference.txt',
      expect: [
        true,
        0.11486621530252139,
        [0.2191939934856263, 0.11486621530252139],
      ],
    },
  ];

  tests.forEach((test) => {
    it(test.file, () => {
      expect(tester(getData(test.file))).toEqual(test.expect);
    });
  });
});
