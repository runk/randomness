import { Bit } from "../types"

export const getCounts = (bits: Bit[]): [number, number] => {
  let ones = 0
  let zeroes = 0
  for (let index = 0; index < bits.length; index++) {
    if (bits[index] === 1) ones += 1
    else zeroes += 1
  }
  return [zeroes, ones]
}
