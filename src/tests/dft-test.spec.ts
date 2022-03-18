import test from 'ava';
import tester from './dft-test';
import { getData } from '../test/utils';

const scenarios = [
  {
    file: 'megabitrand.bin',
    expect: [true, 0.11351035965432754],
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
];

scenarios.forEach((scenario) => {
  test.serial(scenario.file, (t) => {
    t.deepEqual(tester(getData(scenario.file)), scenario.expect);
  });
});
