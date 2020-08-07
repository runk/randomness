module.exports = {
  testEnvironment: 'node',
  testRegex: '.*spec.ts$',
  transform: { '^.+\\.ts?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: 'src',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/../coverage',
};
