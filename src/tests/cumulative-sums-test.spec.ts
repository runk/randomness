import test from 'ava';
import tester from './cumulative-sums-test';
import { getData } from '../test/utils';

const scenarios = [
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

scenarios.forEach((scenario) => {
  test(scenario.file, (t) => {
    t.deepEqual(tester(getData(scenario.file)), scenario.expect);
  });
});
