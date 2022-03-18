import test from 'ava';
import tester from './binary-matrix-rank-test';
import { getData } from '../test/utils';

const scenarios = [
  {
    file: 'megabitrand.bin',
    expect: [true, 0.5411642062854648],
  },
  {
    file: 'sums_megrandom.bin',
    expect: [true, 0.692259775907861],
  },
  {
    file: 'correlated_megrandom.bin',
    expect: [true, 0.03273566583736714],
  },
  {
    file: 'biased_megabitrand.bin',
    expect: [true, 0.17844943445596398],
  },
];

scenarios.forEach((scenario) => {
  test(scenario.file, (t) => {
    t.deepEqual(tester(getData(scenario.file)), scenario.expect);
  });
});
