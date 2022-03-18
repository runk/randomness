import test from 'ava';
import tester from './frequency-within-block-test';
import { getData } from '../test/utils';

const scenarios = [
  {
    file: 'megabitrand.bin',
    expect: [true, 0.12282637574855537],
  },
  {
    file: 'sums_megrandom.bin',
    expect: [false, 0],
  },
  {
    file: 'correlated_megrandom.bin',
    expect: [true, 0.9993684686691751],
  },
  {
    file: 'biased_megabitrand.bin',
    expect: [false, 0],
  },
  {
    file: 'reference.txt',
    expect: [true, 0.7064384496412814],
  },
];

scenarios.forEach((scenario) => {
  test(scenario.file, (t) => {
    t.deepEqual(tester(getData(scenario.file)), scenario.expect);
  });
});
