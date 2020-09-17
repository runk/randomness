import tests from '.';

test('exports', () => {
  expect(tests.runsTest).toBeTruthy();
  expect(tests.monobitTest).toBeTruthy();
  expect(tests.longestRunOnesInABlockTest).toBeTruthy();
  expect(tests.frequencyWithinBlockTest).toBeTruthy();
});
