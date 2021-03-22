export type Result = [boolean, number, number[]?];

export type Bit = 0 | 1;

export type Matrix = number[][];

export type RandomnessTest = (bits: Bit[], alpha?: number) => Result;
