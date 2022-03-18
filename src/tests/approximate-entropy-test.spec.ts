import test from 'ava';
import tester from './approximate-entropy-test';
import { getData } from '../test/utils';

const scenarios = [
  {
    file: 'megabitrand.bin',
    expect: [true, 0.6187571950532104],
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
    expect: [true, 0.23530074585899877],
  },
];

scenarios.forEach((scenario) => {
  test(scenario.file, (t) => {
    t.deepEqual(tester(getData(scenario.file)), scenario.expect);
  });
});
