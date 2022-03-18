import test from 'ava';
import monobit from './monobit-test';
import { getData } from '../test/utils';

const scenarios = [
  {
    file: 'megabitrand.bin',
    expect: [true, 0.9299636079348544],
  },
  {
    file: 'sums_megrandom.bin',
    expect: [false, 0],
  },
  {
    file: 'correlated_megrandom.bin',
    expect: [true, 0.7457724276919916],
  },
  {
    file: 'biased_megabitrand.bin',
    expect: [false, 0],
  },
  {
    file: 'reference.txt',
    expect: [true, 0.10959858339911599],
  },
];

scenarios.forEach((scenario) => {
  test(scenario.file, (t) => {
    t.deepEqual(monobit(getData(scenario.file)), scenario.expect);
  });
});
