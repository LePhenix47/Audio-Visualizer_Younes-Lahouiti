/**
 * Checks if a given number is a power of two and falls within a specified range.
 *
 * @param {number} number - The number to check.
 * @param {number} minExponent - The minimum exponent of the power of two.
 * @param {number} maxExponent - The maximum exponent of the power of two.
 * @returns {boolean} - True if the number is a power of two and falls within the specified range, false otherwise.
 */
export function isInRangePowerOfTwo(
  number: number,
  minExponent: number,
  maxExponent: number
): boolean {
  /**
   * The logarithm base 2 of the input number.
   * @type {number}
   */
  const log2: number = Math.log2(number);

  /**
   * Indicates whether the input number is not a power of two.
   * @type {boolean}
   */
  const isNotPowerOfTwo: boolean = !Number.isInteger(log2);

  if (isNotPowerOfTwo) {
    return false;
  }

  /**
   * The minimum possible value for the power of two within the specified range.
   * @type {number}
   */
  const minPowerOfTwo: number = 2 ** minExponent;

  /**
   * The maximum possible value for the power of two within the specified range.
   * @type {number}
   */
  const maxPowerOfTwo: number = 2 ** maxExponent;

  /**
   * Indicates whether the input number falls outside the specified range.
   * @type {boolean}
   */
  const isNotBetweenRange: boolean =
    number < minPowerOfTwo || number > maxPowerOfTwo;

  if (isNotBetweenRange) {
    return false;
  }

  return true;
}
