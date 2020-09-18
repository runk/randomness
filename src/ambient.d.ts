declare module 'fft-js' {
  export type Phasors = [number, number][];
  export const fft: (signal: number[]) => Phasors;
  export const util: {
    fftMag: (phasors: Phasors) => number[],
  };
}
