import test from 'ava';
import runs from './runs-test';
import { getData } from '../test/utils';

const scenarios = [
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

scenarios.forEach((scenario) => {
  test(scenario.file, (t) => {
    t.deepEqual(runs(getData(scenario.file)), scenario.expect);
  });
});
