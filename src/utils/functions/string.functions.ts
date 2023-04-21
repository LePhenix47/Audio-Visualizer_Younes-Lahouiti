import { log } from "./console.functions";
/**
 *Function that formats a given string in 3 cases: lowercase, uppercase and titlecase
 *
 * @param {string} string - The string to format.
 * @param {string} option - The option to use for formatting. Valid options are 'lowercase', 'uppercase', or 'titlecase'.
 *
 * @returns {string} The formatted string
 *
 * @throws {Error} If an invalid option is provided.
 * @throws {TypeError} If either the string or the option parameter is not a string.
 */
export function formatText(string: string, option: string): string | never {
  let formattedOption: string = option.toLowerCase().trim();

  switch (formattedOption) {
    case "lowercase": {
      return string.toLowerCase();
    }

    case "uppercase": {
      return string.toUpperCase();
    }

    case "titlecase": {
      let stringArray = string.split(" ");
      for (let i = 0; i < stringArray.length; i++) {
        stringArray[i] =
          stringArray[i].substring(0, 1).toUpperCase() +
          stringArray[i].slice(1).toLowerCase();
      }
      stringArray = stringArray.concat();
      return stringArray.toString();
    }

    default: {
      throw new Error(
        "Formatting text error: unknown option passed in argument"
      );
    }
  }
}

/**
 * Function that normalizes a string by removing diacritical marks
 * (replaces letters with accents by their "non-accented" counter-part).
 *
 * *ex: "crème brûlée" → "creme brulee"
 * @param {string} string - The string to be normalized.
 *
 * @returns {string|null} - The normalized string or null if the argument is not a string.
 */
export function normalize(string: string): string | null {
  const argumentIsNotAString = typeof string !== "string";
  if (argumentIsNotAString) {
    log("Value passed in argument is not a string !");
    return null;
  }
  return string
    .normalize("NFD") //returns the unicode NORMALIZATION FORM of the string using a canonical DECOMPOSITION (NFD).
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Tests a regular expression against a string and
 * returns a boolean value indicating whether the string matches the RegExp pattern.
 *
 * @param {string} string - The string to test against the regular expression.
 * @param {RegExp} RegularExpression - The regular expression to test against the string.
 *
 * @returns {boolean} - A boolean value indicating whether the regular expression matches the string.
 */
export function testRegExp(string: string, RegularExpression: RegExp): boolean {
  return RegularExpression.test(string);
}

/**
 * Copies the given text to the clipboard.
 *
 * @param {string} textToCopy - The text to be copied to the clipboard.
 *
 * @returns {Promise<void>} - A Promise that resolves when the text has been successfully copied to the clipboard.
 */
export function copyTextToClipBoard(textToCopy: string): Promise<void> {
  return navigator.clipboard.writeText(textToCopy);
}
/**

Splits a string into an array of substrings using the specified separator.

@param {string} string - The string to split.

@param {string|RegExp} character - The separator to use when splitting the string.

@returns {string[]} An array of substrings created by splitting the original string using the specified separator.

*/
export function splitString(
  string: string,
  character: string | RegExp
): string[] {
  return string.split(character);
}

/**

Slices a string to extract a portion of it between the start and end indexes.

Ex: We have "Saturday" and we want to just end up with "at"

```js
let str = "Saturday"
str = sliceString(str, 1, 3);
```

@param {string} string - The input string to slice.
@param {number} startIndex - The index of the beginning of the slice.
@param {number} endIndex - The index of the end of the slice.

@returns {string} - The portion of the string between the start and end indexes.
*/
export function sliceString(
  string: string,
  startIndex: number,
  endIndex: number
): string {
  return string.slice(startIndex, endIndex);
}

/**
 * Removes elements from an array and optionally inserts new elements in their place.
 *
 * @param {Array} array - The array to modify.
 * @param {number} startIndex - The index to start removing elements from.
 * @param {number} deleteCount - The number of elements to remove.
 * @param {...*} [items] - The elements to insert into the array.
 *
 * @returns {Object} - An object containing the removed items and the updated array.
 *
 * @throws {TypeError} - If the 'array' parameter is not an array or 'startIndex' and 'endIndex' are not numbers.
 * @throws {Error} - If the 'startIndex' or 'endIndex' parameter is out of bounds of the array.
 */
export function spliceArray(
  array: any[],
  startIndex: number,
  deleteCount: number,
  ...items: any[]
): { removedItems: any[]; newArray: any[] } {
  const argumentInArrayIsNotValid: boolean = !Array.isArray(array);
  if (argumentInArrayIsNotValid) {
    throw new TypeError("The 'array' parameter must be an array");
  }

  const numberArgumentsAreInvalid: boolean =
    isNaN(startIndex) || isNaN(deleteCount);
  if (numberArgumentsAreInvalid) {
    throw new TypeError(
      "The 'startIndex' and 'deleteCount' parameters must be a number"
    );
  }

  const indexesAreOutOfBounds: boolean =
    startIndex < 0 || startIndex >= array.length;
  if (indexesAreOutOfBounds) {
    throw new Error("The 'startIndex' parameter is out of bounds of the array");
  }

  //We make a deep copy of the array to avoid mutating
  //the array passed in argument with the `splice()` method
  let newArray: any[] = [...array];

  let removedItems: any[] = [];

  const hasItems: boolean = !!items.length;
  if (hasItems) {
    //The `.splice()` method returns
    removedItems = newArray.splice(startIndex, deleteCount, ...items);
  } else {
    removedItems = newArray.splice(startIndex, deleteCount);
  }

  return { removedItems, newArray };
}

/**
 *  Function that replaces all instances of a given character or word with a new one in a string of text.
 *
 * @param {string} stringOfText - The entire string of text.
 * @param {string} replacedText - The character or word to be replaced.
 * @param {string} replacer - The character or word that will replace the old one.
 *
 * @returns {string} - The updated string of text.
 */
export function replaceText(
  stringOfText: string,
  replacedText: string,
  replacer: string
): string {
  //@ts-ignore
  return stringOfText.replaceAll(replacedText, replacer);
}

/**
 * Function that formats a number as a percentage string with a '%' symbol appended at the end.
 *
 * @param {number} number - The number to be formatted as a percentage.
 * @returns {string} - The formatted percentage string.
 */
export function toPercent(number: number): string {
  return number.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
}
