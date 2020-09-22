import tests from '.';

test('exports', () => {
  expect(tests.approximateEntropyTest).toBeTruthy();
  expect(tests.binaryMatrixRankTest).toBeTruthy();
  expect(tests.dftTest).toBeTruthy();
  expect(tests.frequencyWithinBlockTest).toBeTruthy();
  expect(tests.longestRunOnesInABlockTest).toBeTruthy();
  expect(tests.monobitTest).toBeTruthy();
  expect(tests.runsTest).toBeTruthy();
});
