import test from 'ava';
import tester from './longest-run-ones-in-a-block-test';
import { getData } from '../test/utils';

const scenarios = [
  {
    file: 'megabitrand.bin',
    expect: [true, 0.9626381937407507],
  },
  {
    file: 'sums_megrandom.bin',
    expect: [false, 3.274641253084219e-164],
  },
  {
    file: 'correlated_megrandom.bin',
    expect: [false, 1.3358391046288547e-79],
  },
  {
    file: 'biased_megabitrand.bin',
    expect: [false, 3.630579471788652e-119],
  },
  {
    file: 'reference-128.txt',
    expect: [true, 0.18059797678555825],
  },
];

scenarios.forEach((scenario) => {
  test(scenario.file, (t) => {
    t.deepEqual(tester(getData(scenario.file)), scenario.expect);
  });
});
