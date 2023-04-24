/**
 * Checks if a given number is a power of two and falls within a specified power of 2 range
 *
 * @param {number} number - The number to check.
 * @param {number} minExponent - The minimum exponent of the power of two.
 * @param {number} maxExponent - The maximum exponent of the power of two.
 * @returns {{ isPowerOfTwo: boolean, isWithinRange: boolean }} - An object with 2 properties telling if it was a power of 2 and within the range
 */
export function isInRangePowerOfTwo(
  number: number,
  minExponent: number,
  maxExponent: number
): { isPowerOfTwo: boolean; isWithinRange: boolean } {
  // The logarithm base 2 of the input number
  const numerOnLogBaseTwo: number = Math.log2(number);

  // Indicates whether the input number is not a power of two
  const isNotPowerOfTwo: boolean = !Number.isInteger(numerOnLogBaseTwo);

  if (isNotPowerOfTwo) {
    return { isPowerOfTwo: false, isWithinRange: false };
  }

  // The minimum possible value for the power of two within the specified range
  const minPowerOfTwo: number = 2 ** minExponent;

  // The maximum possible value for the power of two within the specified range
  const maxPowerOfTwo: number = 2 ** maxExponent;

  // Indicates whether the input number falls outside the specified range
  const isNotBetweenRange: boolean =
    number < minPowerOfTwo || number > maxPowerOfTwo;

  if (isNotBetweenRange) {
    return { isPowerOfTwo: true, isWithinRange: false };
  }

  //We could return directly a logical boolean expression but it would make the code less inteligible
  return { isPowerOfTwo: false, isWithinRange: false };
}
