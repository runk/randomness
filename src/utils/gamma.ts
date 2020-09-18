import { gamma as calcGamma } from 'mathjs';

const gamma = (n: number): number => calcGamma(n) as number;

// 6.5.31 Handbook of Mathematical Functions, page 263
//    Recursive implementation
const upperIncompleteGamma = (
  a: number,
  x: number,
  d = 0,
  iterations = 100
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
    return (x ** a * Math.E ** -x) / upperIncompleteGamma(a, x, (d = d + 1));
  } else if (d % 2 == 1) {
    const m = 1 + (d - 1) / 2;
    return x + (m - a) / upperIncompleteGamma(a, x, (d = d + 1));
  } else {
    const m = d / 2;
    return 1 + m / upperIncompleteGamma(a, x, (d = d + 1));
  }
};

// 6.5.31 Handbook of Mathematical Functions, page 263
//    Recursive implementation
const upperIncompleteGamma2 = (
  a: number,
  x: number,
  d = 0,
  iterations = 100
): number => {
  if (d == iterations) return 1;
  if (d == 0)
    return (x ** a * Math.E ** -x) / upperIncompleteGamma2(a, x, (d = d + 1));

  const m = d * 2 - 1;
  return m - a + x + (d * (a - d)) / upperIncompleteGamma2(a, x, (d = d + 1));
};

const lowerIncompleteGamma = (
  a: number,
  x: number,
  d = 0,
  iterations = 100
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
    return (x ** a * Math.E ** -x) / lowerIncompleteGamma(a, x, (d = d + 1));
  } else if (d % 2 == 1) {
    const m = d - 1;
    const n = (d - 1) / 2;
    return a + m - ((a + n) * x) / lowerIncompleteGamma(a, x, (d = d + 1));
  } else {
    const m = d - 1;
    const n = d / 2;
    return a + m + (n * x) / lowerIncompleteGamma(a, x, (d = d + 1));
  }
};

export const lowerIncompleteGamma2 = (a: number, x: number): number =>
  gamma(a) - upperIncompleteGamma2(a, x);

export const complimentaryIncompleteGamma = (a: number, x: number): number =>
  1 - upperIncompleteGamma(a, x);

export const gammainc = (a: number, x: number): number =>
  lowerIncompleteGamma(a, x) / gamma(a);

export const gammaincc = (a: number, x: number): number =>
  upperIncompleteGamma(a, x) / gamma(a);
