export type Result = [boolean, number, number[]?];

export type Bit = 0 | 1;

export type Matrix = number[][];

export type InternalRandomnessTest = (bits: Bit[], alpha?: number) => Result;

export type RandomnessTest = (input: Buffer | Uint8Array | Bit[], alpha?: number) => Result;

export type TestName =
  | 'approximateEntropyTest'
  | 'binaryMatrixRankTest'
  | 'cumulativeSumsTest'
  | 'dftTest'
  | 'frequencyWithinBlockTest'
  | 'longestRunOnesInABlockTest'
  | 'monobitTest'
  | 'runsTest';
