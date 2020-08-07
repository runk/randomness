import { gamma as calcGamma } from 'mathjs';

const gamma = (n: number): number => calcGamma(n) as number;

// 6.5.31 Handbook of Mathematical Functions, page 263
//    Recursive implementation
const upper_incomplete_gamma = (
  a: number,
  x: number,
  d: number = 0,
  iterations: number = 100
): number => {
  if (d == iterations) {
    if (d % 2 == 1) {
      return 1;
    } else {
      const m = d / 2;
      return x + (m - a);
    }
  }

  if (d == 0) {
    return (x ** a * Math.E ** -x) / upper_incomplete_gamma(a, x, (d = d + 1));
  } else if (d % 2 == 1) {
    const m = 1 + (d - 1) / 2;
    return x + (m - a) / upper_incomplete_gamma(a, x, (d = d + 1));
  } else {
    const m = d / 2;
    return 1 + m / upper_incomplete_gamma(a, x, (d = d + 1));
  }
};

// 6.5.31 Handbook of Mathematical Functions, page 263
//    Recursive implementation
const upper_incomplete_gamma2 = (
  a: number,
  x: number,
  d: number = 0,
  iterations: number = 100
): number => {
  if (d == iterations) return 1;
  if (d == 0)
    return (x ** a * Math.E ** -x) / upper_incomplete_gamma2(a, x, (d = d + 1));

  const m = d * 2 - 1;
  return m - a + x + (d * (a - d)) / upper_incomplete_gamma2(a, x, (d = d + 1));
};

const lower_incomplete_gamma = (
  a: number,
  x: number,
  d: number = 0,
  iterations: number = 100
): number => {
  if (d == iterations) {
    if (d % 2 == 1) {
      return 1; // end iterations
    } else {
      const m = d / 2;
      return x + (m - a);
    }
  }

  if (d == 0) {
    return (x ** a * Math.E ** -x) / lower_incomplete_gamma(a, x, (d = d + 1));
  } else if (d % 2 == 1) {
    const m = d - 1;
    const n = (d - 1) / 2;
    return a + m - ((a + n) * x) / lower_incomplete_gamma(a, x, (d = d + 1));
  } else {
    const m = d - 1;
    const n = d / 2;
    return a + m + (n * x) / lower_incomplete_gamma(a, x, (d = d + 1));
  }
};

// const lower_incomplete_gamma2 = (a: number, x: number): number =>
//   gamma(a) - upper_incomplete_gamma2(a, x)

// const complimentary_incomplete_gamma = (a: number, x: number): number =>
//   1 - upper_incomplete_gamma(a, x)

// const gammainc = (a: number, x: number): number =>
//   lower_incomplete_gamma(a, x) / gamma(a)

export const gammaincc = (a: number, x: number): number =>
  upper_incomplete_gamma(a, x) / gamma(a);
