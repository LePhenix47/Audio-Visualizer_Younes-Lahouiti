/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {

;// CONCATENATED MODULE: ./src/utils/functions/dom.functions.ts
/**
 * A simplified version of `document.querySelector()`
 *
 * @param {string} query - HTML Element to select
 * @param {any} container - HTML Element to select the query from
 * @returns  - The element selected or `null` if the element doesn't exist
 */
function selectQuery(query, container) {
    var _a;
    if (!container) {
        return document.querySelector(query);
    }
    /**
     * We check if it's a web component, they always have a hyphen in their tag name
     */
    const isWebComponent = (_a = container === null || container === void 0 ? void 0 : container.tagName) === null || _a === void 0 ? void 0 : _a.includes("-");
    if (isWebComponent) {
        return container.shadowRoot.querySelector(query);
    }
    return container.querySelector(query);
}
/**
 * A simplified version of `document.querySelectorAll()`
 *
 * @param {string} query - HTML Element to select
 * @param {any} container - HTML Element to select the query from
 * @returns {any[]|null} - An array with all the elements selected or `null` if the element doesn't exist
 */
function selectQueryAll(query, container) {
    if (!container) {
        return Array.from(document.querySelectorAll(query));
    }
    const isWebComponent = container.tagName.includes("-");
    if (isWebComponent) {
        return Array.from(container.shadowRoot.querySelectorAll(query));
    }
    return Array.from(container.querySelectorAll(query));
}
/**
 * Function that returns an array containing all child nodes of an HTML element.
 *
 * @param {any} elementOfReference The parent HTML element whose children to select.
 * @returns {any[]} An array containing all child nodes of the parent element or null if the parent element has no children.
 */
function getChildren(elementOfReference) {
    if (!elementOfReference) {
        return [];
    }
    return Array.from(elementOfReference.children);
}
/**
 * Returns the parent element of a given element.
 * @param {HTMLElement} elementOfReference - The child element for which to find the parent.
 * @returns {any} - The parent element of the child element, or null if the parent cannot be found.
 */
function getParent(elementOfReference) {
    return elementOfReference.parentElement;
}
/**
 * Returns the closest ancestor element of a given HTML element based on a CSS selector.
 *
 * @param {any} elementOfReference - The HTML element of reference.
 * @param {string} [cssSelector=""] - The CSS selector to use to select the ancestor element. Default is an empty string.
 *
 * @returns {any|null} The closest ancestor element that matches the CSS selector, or null if no ancestor element matches the selector.
 */
function getAncestor(elementOfReference, cssSelector = "") {
    return elementOfReference.closest(cssSelector);
}
/**
 *Returns the host element of a web component given a reference element within it.
 *
 *@param {any} elementOfReference - An element that is a child of the web component.
 *
 * @returns {any} - The host element of the web component.
 */
function getComponentHost(elementOfReference) {
    //@ts-ignore
    return elementOfReference.getRootNode().host;
}
/**
 * Returns the next sibling element of the specified element.
 *
 * @param {any} elementOfReference - The reference element whose sibling to return.
 * @returns {any | null} The next sibling element, or null if there is none.
 */
function getSibling(elementOfReference) {
    return elementOfReference.nextElementSibling;
}
/**
 *
 * Returns an array of strings representing the classes of the specified element.
 *
 * @param {any} elementOfReference - The element to retrieve class values from.
 *
 * @returns An array of strings representing the classes of the specified element.
 */
function getClassListValues(elementOfReference) {
    return Array.from(elementOfReference.classList);
}
/**
 * Sets the value of a specified CSS property for the given HTML element.
 *
 * @param {string} property - The name of the style property to set.
 * @param {any} value - The value to set for the specified style property.
 * @param {any} [element=document.body] - The HTML element to set the style property for, ***NOT mandatory***.

* @returns {void}
 */
function setStyleProperty(property, value, element = document.body) {
    const stringifiedValue = value.toString();
    return element.style.setProperty(property, stringifiedValue);
}
/**
 * Appends a child element to a parent element
 *
 * @param {any} childElement - The child element to append to the parent element
 * @param {any} parentElement - The parent element to which the child element should be appended
 * @returns {HTMLElement} - The appended child element
 */
function appendChildToParent(childElement, parentElement) {
    return parentElement.appendChild(childElement);
}
/**
 * Adds or modifies an attribute to the given element
 *
 * @param element The element to add the attribute to
 * @param property The name of the attribute to add
 * @param value The value to set the attribute to
 */
function modifyAttribute(element, property, value) {
    element.setAttribute(property, value.toString());
}
/**
 * Retrieves the value of the specified attribute from the given element
 *
 * @param {string} attributeName - The name of the attribute to retrieve
 * @param {any} element - The element from which to retrieve the attribute
 *
 * @returns {string} The value of the attribute
 */
function getAttribute(attributeName, element) {
    return element.getAttribute(attributeName);
}
/**
 * Removes an attribute from an element and sets a new attribute in its place.
 *
 * @param {any} element - The element from which to remove the attribute.
 * @param {string} oldAttribute - The name of the attribute to remove.
 * @param {string} newAttribute - The name of the new attribute to set.
 */
function replaceAttribute(element, oldAttribute, newAttribute) {
    element.removeAttribute(oldAttribute);
    element.setAttribute(newAttribute, "");
}
/**
 * Enables the specified element by removing the "disabled" attribute and setting the "enabled" attribute.
 *
 * @param element - The element to enable.
 */
function enableElement(element) {
    replaceAttribute(element, "disabled", "enabled");
}
/**
 * Disables the specified element by removing the "enabled" attribute and setting the "disabled" attribute.
 *
 * @param element - The element to disable.
 */
function disableElement(element) {
    replaceAttribute(element, "enabled", "disabled");
}
/**
 * Adds a class name to a given element's class list
 * @param {any} element - The element to add the class to
 * @param {string} className - The class name to add
 * @returns {void}
 */
function addClass(element, className) {
    element.classList.add(className);
}
/**
 * Removes a class name from a given element's class list
 * @param {any} element - The element to remove the class from
 * @param {string} className - The class name to remove
 * @returns {void}
 */
function removeClass(element, className) {
    element.classList.remove(className);
}
/**
 * Replaces an old class name with a new class name in a given element's class list
 * @param {any} element - The element to replace the class name in
 * @param {string} oldClassName - The old class name to replace
 * @param {string} newClassName - The new class name to replace with
 * @returns {void}
 */
function replaceClass(element, oldClassName, newClassName) {
    element.classList.replace(oldClassName, newClassName);
}

;// CONCATENATED MODULE: ./src/utils/functions/audio.functions.ts

/**
 * Plays the audio element
 * @param {HTMLAudioElement} audio - The HTML audio element to be played
 */
function playAudio(audio) {
    audio === null || audio === void 0 ? void 0 : audio.play();
}
/**
 * Pauses the audio element
 * @param {HTMLAudioElement} audio - The HTML audio element to be paused
 */
function pauseAudio(audio) {
    audio === null || audio === void 0 ? void 0 : audio.pause();
}
/**
 * Sets the volume of an audio element
 * @param {HTMLAudioElement} audio - The audio element to set the volume for
 * @param {number} volume - The volume level to set (between 0 and 1)
 */
function setAudioVolume(audio, volume) {
    audio.volume = volume;
}
/**
 * Sets to a specific timestamp in an audio element
 * @param {HTMLAudioElement} audio - The audio element to seek
 * @param {number} time - The time to seek to (in seconds)
 */
function setTimestampAudio(audio, time) {
    audio.currentTime = time;
}
/**
 * Returns the current time (in seconds) of an audio element
 * @param {HTMLAudioElement} audio - The audio element to get the current time from
 * @returns {number} The current time of the audio element (in seconds)
 */
function getAudioCurrentTime(audio) {
    return audio === null || audio === void 0 ? void 0 : audio.currentTime;
}
/**
 * Gets the duration of an audio file in seconds
 *
 * @param {HTMLAudioElement} audio - The audio element to get the duration from
 * @returns {number} The duration of the audio file in seconds (returns 0 if it's not available)
 */
function getAudioTotalTime(audio) {
    return isNaN(audio === null || audio === void 0 ? void 0 : audio.duration) ? 0 : audio === null || audio === void 0 ? void 0 : audio.duration;
}
/**
 * Checks if an audio element has paused
 * @param {HTMLAudioElement} audio - The HTMLAudioElement to check
 * @returns Boolean value telling whether or not the audio is paused
 */
function checkIfAudioPaused(audio) {
    return audio === null || audio === void 0 ? void 0 : audio.paused;
}
/**
 * Checks if an audio element has ended
 * @param {HTMLAudioElement} audio - The HTMLAudioElement to check
 * @returns Boolean value telling whether or not the audio has ended
 */
function checkIfAudioEnded(audio) {
    return audio === null || audio === void 0 ? void 0 : audio.ended;
}
/**
 * Formats a given amount of seconds into a time object containing formatted hours, minutes and seconds
 * If the time is over an hour but under 10 minutes, the minutes are also formatted
 *
 * @param {number} seconds - The amount of seconds to format
 * @returns {{seconds: string, minutes: string, hours: string}} - A time object containing formatted hours, minutes and seconds
 */
function formatTimeValues(seconds) {
    // Calculate the unformatted minutes and seconds
    const unformattedSeconds = Math.trunc(seconds % 60);
    const unformattedMinutes = Math.trunc((seconds / 60) % 60);
    const unformattedHours = Math.trunc(seconds / 3600);
    // Format the seconds
    const formattedSeconds = unformattedSeconds >= 10
        ? unformattedSeconds.toString()
        : `0${unformattedSeconds}`;
    // Format the minutes
    let formattedMinutes = unformattedMinutes.toString();
    //Format the hours
    const formattedHours = unformattedHours.toString();
    // Check if the time is over an hour and under 10 minutes
    const isOverAnHour = unformattedHours > 0;
    const isUnderTenMinutes = unformattedMinutes < 10;
    // If the time is over an hour but under 10 minutes, format the minutes
    if (isOverAnHour && isUnderTenMinutes) {
        formattedMinutes =
            unformattedMinutes > 10
                ? unformattedMinutes.toString()
                : `0${unformattedMinutes}`;
    }
    // Return the formatted time object
    return {
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds,
    };
}
/**
 * Creates an AudioContext and an AnalyserNode to analyze the frequency data of an HTMLAudioElement
 *
 * @param {HTMLAudioElement} audioElement - The HTMLAudioElement to be analyzed
 * @param {number} amountOfAudioSamples - The number of audio samples to be analyzed between 16 and 32_768
 *
 * @returns {analyzer: AnalyserNode, frequencyDataArray: Uint8Array}} - An unsigned 8-bit integer array with the frequency data of the audio
 */
function createDataAndAudioAnalyzer(audioElement, amountOfAudioSamples) {
    // Create the AudioContext
    const audioContext = new AudioContext();
    // Create an audio node from the <audio> element
    const audioNodeSource = audioContext.createMediaElementSource(audioElement);
    // Create the analyzer, connect it to the audio node source and connect the analyzer to the audio context destination
    const analyzer = audioContext.createAnalyser();
    audioNodeSource.connect(analyzer);
    analyzer.connect(audioContext.destination);
    // Set the number of audio sample frequencies with the FFT (Fast Fourier Transform) method
    //Btw here's an amazing explanation explaining what the FFT is useful for: https://www.youtube.com/watch?v=nmgFG7PUHfo
    const amountIsOutOfRange = !isInRangePowerOfTwo(amountOfAudioSamples, 4, 15).isWithinRange;
    if (amountIsOutOfRange) {
        analyzer.fftSize = 64;
        throw "FFT size is either not a power of 2 or out of the range [2⁴ , 2¹⁵]";
    }
    analyzer.fftSize = amountOfAudioSamples;
    // Create an unsigned 8-bit integer array with the frequency data from the analyzer
    const bufferLength = analyzer.frequencyBinCount;
    const frequencyDataArray = new Uint8Array(bufferLength);
    return {
        analyzer,
        frequencyDataArray,
    };
}

;// CONCATENATED MODULE: ./src/utils/functions/console.functions.ts
/**
 * The console methods are exported as separate methods through destructuring
 */
const { log: console_functions_log, error, table, time, timeEnd, timeStamp, timeLog, assert, clear, count, countReset, group, groupCollapsed, groupEnd, trace, profile, profileEnd, warn, debug, info, dir, dirxml, } = console;

;// CONCATENATED MODULE: ./src/utils/functions/file.functions.ts
/**
 * Transforms an audio file into a base64-encoded string
 *
 * @param {File} audioFile - The audio file to be transformed
 * @returns {Promise<string>} - A promise that resolves with the base64-encoded string of the audio file
 *
 * @throws {string} - An error message if the base64 string is not found or if reading the audio file fails
 */
function transformAudioFileToBase64Text(audioFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        //Allows the conversion of binary data, in this case audio files, into a text format
        reader.readAsDataURL(audioFile);
        // When the audio file is loaded, extract the base64 string and resolve the promise with it
        reader.addEventListener("load", (e) => {
            const base64MediaString = reader.result;
            const isNotString = typeof base64MediaString !== "string";
            if (isNotString) {
                reject("Error: Base64 string not found.");
                return;
            }
            resolve(base64MediaString);
        });
        // If there's an error while reading the audio file, reject the promise with an error message
        reader.addEventListener("error", () => {
            reject("Error: Failed to read audio file.");
        });
    });
}
/**
 * Creates an audio element from an uploaded audio file
 *
 * @param {File} audioFile - The audio file to be transformed
 * @returns {Promise<HTMLAudioElement>} - A promise that resolves with the created HTMLAudioElement
 *
 * @throws {string} - An error message if the transformAudioFileToBase64Text() function throws an error
 *
 */
// export async function createAudioElement(
//   audioFile: File
// ): Promise<HTMLAudioElement> {
//   try {
//     // Transform the audio file to a Base64 encoded string
//     const base64AudioString: string = await transformAudioFileToBase64Text(
//       audioFile
//     );
//     // Create a new HTMLAudioElement with the encoded string as its source
//     const audioElement: HTMLAudioElement = new Audio(base64AudioString);
//     return audioElement;
//   } catch (functionError) {
//     // Log any errors to the console
//     error(functionError);
//   }
// }

;// CONCATENATED MODULE: ./src/utils/functions/string.functions.ts

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
function formatText(string, option) {
    let formattedOption = option.toLowerCase().trim();
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
            throw new Error("Formatting text error: unknown option passed in argument");
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
function normalize(string) {
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
function testRegExp(string, RegularExpression) {
    return RegularExpression.test(string);
}
/**
 * Copies the given text to the clipboard.
 *
 * @param {string} textToCopy - The text to be copied to the clipboard.
 *
 * @returns {Promise<void>} - A Promise that resolves when the text has been successfully copied to the clipboard.
 */
function copyTextToClipBoard(textToCopy) {
    return navigator.clipboard.writeText(textToCopy);
}
/**

Splits a string into an array of substrings using the specified separator.

@param {string} string - The string to split.

@param {string|RegExp} character - The separator to use when splitting the string.

@returns {string[]} An array of substrings created by splitting the original string using the specified separator.

*/
function splitString(string, character) {
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
function sliceString(string, startIndex, endIndex) {
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
function spliceArray(array, startIndex, deleteCount, ...items) {
    const argumentInArrayIsNotValid = !Array.isArray(array);
    if (argumentInArrayIsNotValid) {
        throw new TypeError("The 'array' parameter must be an array");
    }
    const numberArgumentsAreInvalid = isNaN(startIndex) || isNaN(deleteCount);
    if (numberArgumentsAreInvalid) {
        throw new TypeError("The 'startIndex' and 'deleteCount' parameters must be a number");
    }
    const indexesAreOutOfBounds = startIndex < 0 || startIndex >= array.length;
    if (indexesAreOutOfBounds) {
        throw new Error("The 'startIndex' parameter is out of bounds of the array");
    }
    //We make a deep copy of the array to avoid mutating
    //the array passed in argument with the `splice()` method
    let newArray = [...array];
    let removedItems = [];
    const hasItems = !!items.length;
    if (hasItems) {
        //The `.splice()` method returns
        removedItems = newArray.splice(startIndex, deleteCount, ...items);
    }
    else {
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
function replaceText(stringOfText, replacedText, replacer) {
    //@ts-ignore
    return stringOfText.replaceAll(replacedText, replacer);
}
/**
 * Function that formats a number as a percentage string with a '%' symbol appended at the end.
 *
 * @param {number} number - The number to be formatted as a percentage.
 * @returns {string} - The formatted percentage string.
 */
function toPercent(number) {
    return number.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    });
}

;// CONCATENATED MODULE: ./src/components/audio-player.component.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const audioPlayerTemplateElement = document.createElement("template");
const jsClasses = /* css*/ `
.hide{
    display: none !important;
}

.active {
    border: 2px solid var(--color-primary) !important
}

.active>.index__svg {
    color: var(--color-primary) !important
}

.active.index__file-label::before{
    color:  var(--color-primary) !important
}

.hide {
    display: none !important
}

.no-event-listener {
    pointer-events: none !important
}
`;
const cssReset = /*css*/ `
*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

button {
    padding: 5px;
    border-radius: 5px;
    margin-left: 25px;
    border-color: transparent;
    background-color: transparent;
    font-family: inherit;
    color: inherit;
    outline: 2px solid currentColor;
}
button:hover {
    cursor: pointer;

}

button:hover:disabled {
    cursor: not-allowed;
}


input {
    font-family: inherit;


    border-color: transparent;

    &:focus {
        border-color: transparent;
        outline: transparent;
    }
}

label:hover{
    cursor: pointer;
}



::-moz-selection {
    -webkit-text-stroke: transparent;
    background-color: var(--selection-bg-color);
    color: #fff
}

::selection {
    -webkit-text-stroke: transparent;
    background-color: var(--selection-bg-color);
    color: #fff
}

:root {
    --bg-primary: #fff;
    --bg-secondary: #e6e6e6;
    --bg-tertiary: #a5a5a5;
    --color-primary: #000;
    --selection-bg-color: #005aff;
    --scrollbar-track-bg-color: transparent;
    --scrollbar-thumb-bg-color: #757575;
    --scrollbar-thumb-bg-color--hover: #9d9d9d;
    --scrollbar-thumb-bg-color--active: #9d9d9d;
    color-scheme: light
}

::backdrop {
    --scrollbar-track-bg-color: transparent;
    --scrollbar-thumb-bg-color: #757575;
    --scrollbar-thumb-bg-color--hover: #9d9d9d;
    --scrollbar-thumb-bg-color--active: #9d9d9d
}

@media(prefers-color-scheme:dark) {
    :root {
        --bg-primary: #000;
        --bg-secondary: #1a1a1a;
        --bg-tertiary: #5a5a5a;
        --color-primary: #fff;
        --selection-bg-color: orange;
        --scrollbar-track-bg-color: transparent;
        --scrollbar-thumb-bg-color: #757575;
        --scrollbar-thumb-bg-color--hover: #9d9d9d;
        --scrollbar-thumb-bg-color--active: #9d9d9d;
        color-scheme: dark
    }

    .index__audio-player {
        background-position: 100% !important;
    }

    ::backdrop {
        --scrollbar-track-bg-color: transparent;
        --scrollbar-thumb-bg-color: #757575;
        --scrollbar-thumb-bg-color--hover: #9d9d9d;
        --scrollbar-thumb-bg-color--active: #9d9d9d
    }
}

`;
const audioPlayerTemplateStyle = /*css*/ `
.index {
    align-items: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    gap: 0;
    justify-content: center;
    min-height: 78dvh;
    position: relative;
    z-index: 2
}

.index__audio-player--delete-button{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  color: var(--bg-primary);
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-primary);
  aspect-ratio: 1/1;
  outline: none;
  border: inherit;
}

.index__svg {
    aspect-ratio: 1/1;
    color: var(--bg-tertiary);
    height: 25%
}
 
.index__file-label {
    align-items: center;
    aspect-ratio: 1/1;
    border: 2px dashed var(--bg-tertiary);
    border-radius: 10px;
    display: inline-flex;
    height: 250px;
    justify-content: center;
    position: relative
}

.index__file-label::before {
    content: "Upload an audio file";
    color: var(--bg-tertiary);
    position: absolute;
    top: 25px
}

.index__audio-player {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-image: linear-gradient(90deg, #dedad6, hsla(30, 11%, 85%, .2), #212529, rgba(33, 37, 41, .2));
    background-position: 0;
    background-size: 200%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    min-height: 250px;
    padding: 20px;
    position: relative;
    transition: background-position .35s ease-in-out;
    width: 100%;
    z-index: 2
}
.index__audio-player--name {
    overflow: hidden;
    padding-bottom: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-indent: 0%;
    transition: text-indent 350ms ease;
}

.index__audio-player--progress {
    display: flex;
    flex-direction: column;
    gap: 10px
}

.index__audio-player--progress-bar {
    background-color: gray;
    border-radius: 100vmax;
    display: flex;
    min-height: 15px;
    width: 100%
}

.index__audio-player--current-progress {
    --progress: 0%;
    background-color: #fff;
    border-radius: inherit;
    display: inline-block !important;
    max-width: 100%;
    min-height: 15px;
    transition: width .35s ease-out;
    width: var(--progress)
}

.index__audio-player--controls, .index__audio-player--timestamp {
    align-items: center;
    display: flex;
    justify-content: space-between
}

.index__audio-player--controls {
    gap: 15px;
    margin-top: 25px
}

@media screen and (width <=768px) {
    .index__audio-player--controls {
        flex-direction: column;
        gap: 25px;
        margin: 25px
    }
}

.index__audio-player--buttons {
    align-items: center;
    display: flex;
    gap: 15px;
    justify-content: space-evenly
}

.index__audio-player--volume {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: center
}

.index__audio-player--slider {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--bg-primary);
    border-radius: 25px;
    height: 10px;
    overflow: hidden;
    width: 210px
}

.index__audio-player--slider::-webkit-slider-runnable-track {
    --track-height: 10px;
    background-color: var(--color-input-range-bg);
    border-radius: 25px;
    height: var(--track-height);
    overflow: hidden;
    width: 100%
}

.index__audio-player--slider::-webkit-slider-runnable-track:hover {
    cursor: pointer
}

.index__audio-player--slider::-moz-range-track {
    --track-height: 10px;
    background-color: var(--color-input-range-bg);
    border-radius: 25px;
    height: var(--track-height);
    overflow: hidden;
    width: 100%
}

.index__audio-player--slider::-moz-range-track:hover {
    cursor: pointer
}

.index__audio-player--slider::-webkit-slider-thumb {
    --thumb-size: 10px;
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--color-primary);
    border: transparent;
    border-radius: 100vmax;
    box-shadow: -105px 0 0 100px #a9a9a9;
    height: var(--thumb-size);
    -webkit-transition: background-color .25s ease-out;
    transition: background-color .25s ease-out;
    width: var(--thumb-size)
}

@media screen and (width <=768px) {
    .index__audio-player--slider::-webkit-slider-thumb {
        box-shadow: -155px 0 0 150px #a9a9a9
    }
}

.index__audio-player--slider::-moz-range-thumb {
    --thumb-size: 10px;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--color-primary);
    border: transparent;
    border-radius: 100vmax;
    box-shadow: -105px 0 0 100px #a9a9a9;
    height: var(--thumb-size);
    -moz-transition: background-color .25s ease-out;
    transition: background-color .25s ease-out;
    width: var(--thumb-size)
}

@media screen and (width <=768px) {
    .index__audio-player--slider::-moz-range-thumb {
        box-shadow: -155px 0 0 150px #a9a9a9
    }
}

`;
const audioPlayerTemplateHTMLContent = /*html */ `
 <label for="audio-file" class="index__label index__file-label">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg index__svg" fill="currentColor">
                <path
                    d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,0-2,0v6a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12Z">
                </path>
            </svg>
        </label>
        <input type="file" id="audio-file" class="index__input index__file-input hide" accept="audio/*" />

        <section class="index__audio-player hide">
          <button class="index__audio-player--delete-button" type="button">
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512" height="15" width="15">
  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
</svg>
          </button>
            <audio preload="auto" src=""></audio> 
            <h2 class="index__audio-player--name">Music title</h2>
            <div class="index__audio-player--progress">
                <div class="index__audio-player--progress-bar">
                    <span class="index__audio-player--current-progress"></span>
                </div>
                <div class="index__audio-player--timestamp">
                    <p class="index__audio-player--current-time">0:00</p>
                    <p class="index__audio-player--total-time">-:--</p>
                </div>
            </div>
            <div class="index__audio-player--controls">
                <div class="index__audio-player--buttons">
                    <button class="index__audio-player--button" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="index__audio-player--play-icon" fill="currentColor" viewBox="0 0 384 512" height="16" width="16">
                            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="index__audio-player--pause-icon hide" fill="currentColor" viewBox="0 0 320 512" height="16" width="16">
                            <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="index__audio-player--restart-icon hide" fill="currentColor" viewBox="0 0 512 512" height="16" width="16">
                            <path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
                    </svg>
                    </button>
                </div>
                <div class="index__audio-player--volume">
                    <button class="index__audio-player--mute" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="index__audio-player--muted-volume-icon hide" fill="currentColor" height="16" width="16">
                            <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="index__audio-player--low-volume-icon hide" fill="currentColor" height="16" width="16">
                            <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="index__audio-player--high-volume-icon" fill="currentColor" height="16" width="16">
                            <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
                        </svg>
                    </button>
                    <input type="range" min="0" max="100" step="1" class="index__audio-player--slider">
                </div>
            </div>
        </section>
`;
audioPlayerTemplateElement.innerHTML = /* html */ `
  <style>
    ${jsClasses}
    ${cssReset}
    ${audioPlayerTemplateStyle}
  </style>
  
  ${audioPlayerTemplateHTMLContent}
`;
/**
 * A custom web component for audio player.
 *
 * @extends {HTMLElement}
 */
class AudioPlayer extends HTMLElement {
    /**
     * Creates an instance of AudioPlayer.
     * Attaches a shadow root to the custom element, clones and appends the content of the audio-player-template element.
     * @constructor
     * @extends {HTMLElement}
     */
    constructor() {
        //We inherit the methods of HTMLElement
        super();
        // Attaches a shadow root to the custom element
        const shadowRoot = this.attachShadow({ mode: "open" });
        // Clones and appends the content of the audio-player-template element
        const clonedTemplate = audioPlayerTemplateElement.content.cloneNode(true);
        shadowRoot.appendChild(clonedTemplate);
    }
    /**
     * An array of attribute names to observe for changes.
     *
     * @readonly
     * @static
     * @type {string[]}
     */
    static get observedAttributes() {
        //We indicate the list of attributes that the custom element wants to observe for changes.
        return [
            "title",
            "is-playing",
            "current-time",
            "total-time",
            "volume",
            "is-muted",
        ];
    }
    /**
     *
     * Setters and getters
     * */
    /**
     * Gets the value of the "title" attribute.
     *
     * @returns {string} The value of the "title" attribute.
     */
    get title() {
        return this.getAttribute("title");
    }
    /**
     * Sets the value of the "title" attribute.
     *
     * @param {string} value - The new value of the "title" attribute.
     */
    set title(value) {
        this.setAttribute("title", value);
    }
    /**
     * Gets the value of the "is-playing" attribute.
     *
     * @returns {string} The value of the "is-playing" attribute.
     */
    get isPlaying() {
        return this.getAttribute("is-playing");
    }
    /**
     * Sets the value of the "is-playing" attribute.
     *
     * @param {string} value - The new value of the "is-playing" attribute.
     */
    set isPlaying(value) {
        this.setAttribute("is-playing", value);
    }
    /**
     * Gets the value of the "current-time" attribute.
     *
     * @returns {string} The value of the "current-time" attribute.
     */
    get currentTime() {
        return this.getAttribute("current-time");
    }
    /**
     * Sets the value of the "is-playing" attribute.
     *
     * @param {string} value - The new value of the "is-playing" attribute.
     */
    set currentTime(value) {
        this.setAttribute("current-time", value);
    }
    /**
     * Gets the value of the "total-time" attribute.
     *
     * @returns {string} The value of the "total-time" attribute.
     */
    get totalTime() {
        return this.getAttribute("total-time");
    }
    /**
     * Sets the value of the "total-time" attribute.
     *
     * @param {string} value - The new value of the "total-time" attribute.
     */
    set totalTime(value) {
        this.setAttribute("total-time", value);
    }
    /**
     * Gets the value of the "volume" attribute.
     *
     * @returns {string} The value of the "volume" attribute.
     */
    get volume() {
        return this.getAttribute("volume");
    }
    /**
     * Sets the value of the "volume" attribute.
     *
     * @param {string} value - The new value of the "volume" attribute.
     */
    set volume(value) {
        this.setAttribute("volume", value);
    }
    /**
     * Gets the value of the "is-muted" attribute.
     *
     * @returns {string} The value of the "is-muted" attribute.
     */
    get isMuted() {
        return this.getAttribute("is-muted");
    }
    /**
     * Sets the value of the "is-muted" attribute.
     *
     * @param {string} value - The new value of the "is-muted" attribute.
     */
    set isMuted(value) {
        this.setAttribute("is-muted", value);
    }
    /**
     * Event listener for drag over events.
     *
     * @param {DragEvent} event - The drag event.
     */
    handleDragOver(event) {
        event.preventDefault();
        addClass(event.currentTarget, "active");
    }
    /**
     * Event listener for drag leave events.
     *
     * @param {DragEvent} event - The drag event.
     */
    handleDragLeave(event) {
        event.preventDefault();
        removeClass(event.currentTarget, "active");
    }
    /**
     * Event listener for drop events when uploading audio files.
     *
     * @param {DragEvent} event - The drag event.
     * @returns {Promise<void>} - A promise that resolves once the audio file is uploaded.
     */
    uploadAudioDrop(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console_functions_log(event);
            event.preventDefault();
            const fileUploaded = event.dataTransfer.files[0];
            const componentHost = getComponentHost(event.currentTarget);
            showAudioPlayer(componentHost, fileUploaded);
        });
    }
    /**
     * Event listener for input events when uploading audio files.
     *
     * @param {Event} event - The input event.
     * @returns {Promise<void>} - A promise that resolves once the audio file is uploaded.
     */
    uploadAudioInput(event) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const inputElement = event.currentTarget;
            const fileUploaded = Array.from(inputElement.files)[0];
            const componentHost = getComponentHost(event.currentTarget);
            showAudioPlayer(componentHost, fileUploaded);
        });
    }
    /**
     * Event listener for play/pause button clicks.
     *
     * @param {PointerEvent} event - The pointer event.
     */
    playPause(event) {
        //@ts-ignore
        const button = event.currentTarget;
        const shadowRoot = getComponentHost(button);
        const pauseSVG = selectQuery(".index__audio-player--pause-icon", button);
        const shownIcon = selectQuery("svg:not(.hide)", button);
        const isPaused = shownIcon === pauseSVG;
        if (isPaused) {
            modifyAttribute(shadowRoot, "is-playing", false);
        }
        else {
            modifyAttribute(shadowRoot, "is-playing", true);
        }
    }
    /**
     * Event listener for volume slider input events.
     *
     * @param {InputEvent} event - The input event.
     */
    setVolume(event) {
        const shadowRoot = getComponentHost(event.currentTarget);
        // @ts-ignore
        const valueOfInput = Number(event.target.value);
        modifyAttribute(shadowRoot, "volume", valueOfInput);
    }
    /**
     * Event listener for navigation dragger pointer events.
     *
     * @param {PointerEvent} event - The pointer event.
     */
    setNavigationDragger(event) {
        const mp3Container = getAncestor(event.currentTarget, "section");
        const audioSource = selectQuery("audio", mp3Container);
        // Get the position and width of the placeholder progress bar element
        const { left, width } = this.getBoundingClientRect();
        // Get the X position of the click
        const mouseXPosition = event.x;
        // Calculate the X position of the placeholder progress bar element
        const barXPosition = left;
        // Calculate the offset of the X position of the click from the X position of the placeholder progress bar
        const axisXPositionOffset = mouseXPosition - barXPosition;
        // Get the total width of the placeholder progress bar
        const widthOfBar = width;
        // Calculate the percentage of the total width that the click occurred at
        const percentage = axisXPositionOffset / widthOfBar;
        // Get the total time of the audio
        const totalTimeAudio = getAudioTotalTime(audioSource);
        const audioNewCurrentTime = percentage * totalTimeAudio;
        // Set the timestamp of the audio source based on the calculated percentage
        setTimestampAudio(audioSource, audioNewCurrentTime);
    }
    muteAudioVolume(event) { }
    //Web component methods
    /**
     * Invoked each time the custom element is appended into a document-connected element.
     *
     * @return {void} Nothing
     */
    connectedCallback() {
        const labelDropZoneArea = selectQuery(".index__file-label", this.shadowRoot);
        labelDropZoneArea.addEventListener("dragover", this.handleDragOver);
        labelDropZoneArea.addEventListener("dragleave", this.handleDragLeave);
        labelDropZoneArea.addEventListener("drop", this.uploadAudioDrop);
        const inputFile = selectQuery(".index__file-input", this.shadowRoot);
        inputFile.addEventListener("change", this.uploadAudioInput);
        const playPauseAudioButton = selectQuery(".index__audio-player--button", this.shadowRoot);
        playPauseAudioButton.addEventListener("click", this.playPause);
        const audioSource = selectQuery("audio", this.shadowRoot);
        audioSource.addEventListener("timeupdate", (e) => {
            const seconds = Math.trunc(getAudioCurrentTime(audioSource));
            this.currentTime = seconds.toString();
        });
        const sliderInput = selectQuery(".index__audio-player--slider", this.shadowRoot);
        sliderInput.addEventListener("input", this.setVolume);
        const placeholderProgressBar = selectQuery(".index__audio-player--progress-bar", this.shadowRoot);
        placeholderProgressBar.addEventListener("click", this.setNavigationDragger);
        /**
         * Need to remove the event listeners on the disconnectedCallback() ↑
         * */
        const muteButton = selectQuery(".index__audio-player--mute", this.shadowRoot);
        muteButton.addEventListener("click", (event) => {
            const shadowRoot = getComponentHost(event.currentTarget);
            //@ts-ignore
            const isAlreadyMuted = shadowRoot.isMuted === "true";
            if (isAlreadyMuted) {
                //@ts-ignore
                sliderInput.value = 50;
                //@ts-ignore
                shadowRoot.isMuted = "false";
                //@ts-ignore
                shadowRoot.volume = "50";
            }
            else {
                //@ts-ignore
                sliderInput.value = 0;
                //@ts-ignore
                shadowRoot.isMuted = "true";
                //@ts-ignore
                shadowRoot.volume = "0";
            }
        });
        const deleteButton = selectQuery(".index__audio-player--delete-button", this.shadowRoot);
        deleteButton.addEventListener("click", () => {
            hidePlayer(this.shadowRoot);
        });
    }
    /**
     * Invoked each time the custom element is disconnected from the document's DOM.
     *
     * @return {void} Nothing
     */
    disconnectedCallback() {
        const labelDropZoneArea = selectQuery(".index__file-label", this.shadowRoot);
        labelDropZoneArea.removeEventListener("dragover", this.handleDragOver);
        labelDropZoneArea.removeEventListener("dragleave", this.handleDragLeave);
        labelDropZoneArea.removeEventListener("drop", this.uploadAudioDrop);
        const inputFile = selectQuery(".index__file-input", this.shadowRoot);
        inputFile.removeEventListener("change", this.uploadAudioInput);
        const playPauseAudioButton = selectQuery(".index__audio-player--button", this.shadowRoot);
        playPauseAudioButton.removeEventListener("click", this.playPause);
        const audioSource = selectQuery("audio", this.shadowRoot);
        audioSource.removeEventListener("timeupdate", (e) => {
            const seconds = Math.trunc(getAudioCurrentTime(audioSource));
            this.currentTime = seconds.toString();
        });
        const sliderInput = selectQuery(".index__audio-player--slider", this.shadowRoot);
        sliderInput.removeEventListener("input", this.setVolume);
        const placeholderProgressBar = selectQuery(".index__audio-player--progress-bar", this.shadowRoot);
        placeholderProgressBar.removeEventListener("click", this.setNavigationDragger);
        const muteButton = selectQuery(".index__audio-player--mute", this.shadowRoot);
        muteButton.removeEventListener("click", (event) => {
            //@ts-ignore
            sliderInput.value = 0;
            const shadowRoot = getComponentHost(event.currentTarget);
            modifyAttribute(shadowRoot, "volume", 0);
        });
    }
    /**
     * Invoked each time one of the custom element's attributes is added, removed, or changed.
     *
     * @param {string} name - The name of the attribute that was changed.
     * @param {string|null} oldValue - The previous value of the attribute, or null if it was added.
     * @param {string|null} newValue - The new value of the attribute, or null if it was removed.
     *
     * @returns {Promise<void>} - A promise that resolves once the changes have been processed.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioSourceElement = selectQuery("audio", this.shadowRoot);
            const mp3PlayerSection = selectQuery(".index__audio-player", this.shadowRoot);
            switch (name) {
                case "title": {
                    const titleOfPlayer = selectQuery(".index__audio-player--name", this.shadowRoot);
                    titleOfPlayer.textContent = newValue;
                    //…
                    break;
                }
                case "is-playing": {
                    const button = selectQuery(".index__audio-player--button", mp3PlayerSection);
                    const playSVG = selectQuery(".index__audio-player--play-icon", button);
                    const pauseSVG = selectQuery(".index__audio-player--pause-icon", button);
                    const restartSVG = selectQuery(".index__audio-player--restart-icon", button);
                    const isNowPlaying = newValue === "true";
                    const isNowNeedingToRestart = newValue === "false" && checkIfAudioEnded(audioSourceElement);
                    if (isNowPlaying) {
                        // Audio was paused and now needs to play.
                        showOnlyPauseIcon();
                        playAudio(audioSourceElement);
                    }
                    else if (isNowNeedingToRestart) {
                        // Audio was playing, has ended, and is now paused.
                        showOnlyRestartIcon();
                    }
                    else {
                        // Audio was playing and didn't end, now needs to pause.
                        showOnlyPlayIcon();
                        pauseAudio(audioSourceElement);
                    }
                    function showOnlyPlayIcon() {
                        addClass(pauseSVG, "hide");
                        addClass(restartSVG, "hide");
                        removeClass(playSVG, "hide");
                    }
                    function showOnlyPauseIcon() {
                        addClass(playSVG, "hide");
                        addClass(restartSVG, "hide");
                        removeClass(pauseSVG, "hide");
                    }
                    function showOnlyRestartIcon() {
                        addClass(playSVG, "hide");
                        addClass(pauseSVG, "hide");
                        removeClass(restartSVG, "hide");
                    }
                    //…
                    break;
                }
                case "current-time": {
                    const currentTimeParagraph = selectQuery(".index__audio-player--current-time", mp3PlayerSection);
                    const currentTimeInSeconds = Number(newValue);
                    const { seconds, minutes, hours, } = formatTimeValues(currentTimeInSeconds);
                    const hasHours = Number(hours) !== 0;
                    if (hasHours) {
                        currentTimeParagraph.textContent = `${hours}:${minutes}:${seconds}`;
                    }
                    else {
                        currentTimeParagraph.textContent = `${minutes}:${seconds}`;
                    }
                    const spanProgressBar = selectQuery(".index__audio-player--current-progress", mp3PlayerSection);
                    const totalTimeInSeconds = Number(this.totalTime);
                    let currentTime = Number(this.currentTime);
                    let progressPercentage = Math.ceil((currentTime / totalTimeInSeconds) * 100);
                    setStyleProperty("--progress", `${progressPercentage}%`, spanProgressBar);
                    const hasEnded = checkIfAudioPaused(audioSourceElement) &&
                        checkIfAudioEnded(audioSourceElement);
                    if (hasEnded) {
                        this.isPlaying = "false";
                    }
                    //…
                    break;
                }
                case "total-time": {
                    const totalTimeParagraph = selectQuery(".index__audio-player--total-time", mp3PlayerSection);
                    const totalTimeInSeconds = Number(newValue);
                    const { hours, minutes, seconds } = formatTimeValues(totalTimeInSeconds);
                    const hasHours = Number(hours) !== 0;
                    if (hasHours) {
                        totalTimeParagraph.textContent = `${hours}:${minutes}:${seconds}`;
                        return;
                    }
                    totalTimeParagraph.textContent = `${minutes}:${seconds}`;
                    //…
                    break;
                }
                case "volume": {
                    const fractionedValue = Number(newValue) / 100;
                    setAudioVolume(audioSourceElement, fractionedValue);
                    const mutedIcon = selectQuery(".index__audio-player--muted-volume-icon", this.shadowRoot);
                    const lowVolumeIcon = selectQuery(".index__audio-player--low-volume-icon", this.shadowRoot);
                    const highVolumeIcon = selectQuery(".index__audio-player--high-volume-icon", this.shadowRoot);
                    const hasHighVolume = Number(newValue) >= 50;
                    const hasLowVolume = Number(newValue) < 50 && Number(newValue) !== 0;
                    const hasNoVolume = Number(newValue) === 0;
                    if (hasHighVolume) {
                        showHighVolumeIcon();
                    }
                    else if (hasLowVolume) {
                        showLowVolumeIcon();
                    }
                    else if (hasNoVolume) {
                        showMutedIcon();
                    }
                    function showMutedIcon() {
                        removeClass(mutedIcon, "hide");
                        addClass(lowVolumeIcon, "hide");
                        addClass(highVolumeIcon, "hide");
                    }
                    function showLowVolumeIcon() {
                        removeClass(lowVolumeIcon, "hide");
                        addClass(mutedIcon, "hide");
                        addClass(highVolumeIcon, "hide");
                    }
                    function showHighVolumeIcon() {
                        removeClass(highVolumeIcon, "hide");
                        addClass(lowVolumeIcon, "hide");
                        addClass(mutedIcon, "hide");
                    }
                    //…
                    break;
                }
                case "is-muted": {
                    const isMuted = newValue === "true";
                    if (isMuted) {
                        this.volume = "0";
                        return;
                    }
                    //…
                    break;
                }
                default:
                    break;
            }
        });
    }
}
customElements.define("audio-player", AudioPlayer);
/**
 * Checks if a given file has the expected type.
 *
 * @param {File} fileUploaded - The file to check its type.
 * @param {string} typeExpected - The expected type of the file.
 *
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean indicating whether the file has the expected type or not.
 */
function checkFileType(fileUploaded, typeExpected) {
    return __awaiter(this, void 0, void 0, function* () {
        const { lastModified, name, type, size } = fileUploaded;
        const fileType = splitString(type, "/")[0];
        return fileType === typeExpected;
    });
}
/**
 * Shows the audio player after validating and transforming the audio file to base64.
 *
 * @param {ShadowRoot} componentHost - The ShadowRoot of the web component.
 * @param {File} fileUploaded - The audio file to be uploaded and played.
 *
 * @returns {Promise<void>} - A Promise that resolves after showing the audio player or an error message.
 */
function showAudioPlayer(componentHost, fileUploaded) {
    return __awaiter(this, void 0, void 0, function* () {
        console_functions_log("test", { componentHost }, { fileUploaded });
        const labelDropZoneArea = selectQuery(".index__file-label", componentHost);
        const audioPlayerElement = selectQuery(".index__audio-player", componentHost);
        const isNotAnAudioFile = !(yield checkFileType(fileUploaded, "audio"));
        function showError() {
            console_functions_log("Not an audio file, showing error message");
            removeClass(labelDropZoneArea, "active");
            labelDropZoneArea.textContent = "File uploaded is not an audio";
        }
        function removeActiveClassToDropzone() {
            removeClass(labelDropZoneArea, "active");
        }
        if (isNotAnAudioFile) {
            showError();
            return;
        }
        else {
            removeActiveClassToDropzone();
        }
        const audioBase64String = yield transformAudioFileToBase64Text(fileUploaded);
        // We'll use to retrieve all the other info
        const audioSource = selectQuery("audio", componentHost);
        audioSource.src = audioBase64String;
        showPlayer();
        //We wait for the audio to load its metadata
        audioSource.addEventListener("loadedmetadata", setHostAttributes);
        function showPlayer() {
            addClass(labelDropZoneArea, "hide");
            removeClass(audioPlayerElement, "hide");
        }
        function setHostAttributes() {
            const { name } = fileUploaded;
            const musicTitle = splitString(name, ".mp3")[0];
            const totalTime = Math.floor(getAudioTotalTime(audioSource));
            const attributesArray = [
                { attribute: "title", value: musicTitle },
                { attribute: "is-playing", value: false },
                { attribute: "current-time", value: 0 },
                { attribute: "total-time", value: totalTime },
                { attribute: "volume", value: 50 },
                { attribute: "is-muted", value: false },
            ];
            for (const attributeKeyPairValues of attributesArray) {
                const { attribute, value, } = attributeKeyPairValues;
                modifyAttribute(componentHost, attribute, value);
            }
        }
    });
}
/**
 * Hides the audio player,resets its attributes and shows the label to upload audio files
 *
 * @param {ShadowRoot} componentHost - The ShadowRoot of the web component.
 * @returns {void}
 */
function hidePlayer(componentHost) {
    const audioElement = selectQuery("audio", componentHost);
    const labelDropZoneArea = selectQuery(".index__file-label", componentHost);
    const mp3PlayerSection = selectQuery(".index__audio-player", componentHost);
    resetAudio();
    resetPlayerAttributes();
    showOnlyDropzone();
    /**
     * Resets the audio src attribute to an empty string.
     *
     * @returns {void}
     */
    function resetAudio() {
        audioElement.src = "";
    }
    /**
     * Resets the audio player's attributes to their initial value
     *
     * @returns {void}
     */
    function resetPlayerAttributes() {
        // Array of attributes to reset.
        const attributesArray = [
            "title",
            "is-playing",
            "current-time",
            "total-time",
            "volume",
            "is-muted",
        ];
        // Resets each attribute to an empty string.
        for (const attribute of attributesArray) {
            componentHost[attribute] = "";
        }
    }
    function showOnlyDropzone() {
        removeClass(labelDropZoneArea, "hide");
        addClass(mp3PlayerSection, "hide");
    }
}

;// CONCATENATED MODULE: ./src/utils/functions/canvas.functions.ts
/**
 * Sets the dimensions of the given canvas element to the specified width and height
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to set the dimensions for
 * @param {number} width - The desired width for the canvas element
 * @param {number} height - The desired height for the canvas element
 *
 * @returns {void}
 */
function setCanvasDimensions(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}
/**
 * Creates a linear gradient for a canvas with the specified start and end points and array of hexadecimal colors
 *
 * @param {CanvasRenderingContext2D} canvasContext - The context of the canvas we're giving the gradient effect to
 * @param {number} startX - The initial X value of the gradient
 * @param {number} startY - The initial Y value of the gradient
 * @param {number} endX - The final X value of the gradient
 * @param {number} endY - The final Y value of the gradient
 * @param {string[]} arrayOfHexColors - An array of hexadecimal colors for the gradient stops, the order of the elements have an importance
 *
 * @returns {CanvasGradient} The CanvasGradient object representing the created gradient
 */
function createCanvasGradient(canvasContext, startX, startY, endX, endY, arrayOfHexColors) {
    // Create a linear gradient for a canvas
    const canvasGradient = canvasContext.createLinearGradient(startX, startY, endX, endY);
    for (let i = 0; i < arrayOfHexColors.length; i++) {
        const hexadecimalColor = arrayOfHexColors[i];
        canvasGradient.addColorStop(i, hexadecimalColor);
    }
    return canvasGradient;
}

;// CONCATENATED MODULE: ./src/index.ts

//Components


const barsCanvas = selectQuery(".index__canvas--bars");
const barsCanvasContext = barsCanvas.getContext("2d");
const mp3WebComponent = selectQuery("audio-player");
const audioElement = selectQuery("audio", mp3WebComponent);
const audioContext = new AudioContext();
const main = selectQuery("main");
// When the window is resized, update the canvas dimensions and clear the canvas
const mainDimensionsAndPosition = main.getBoundingClientRect();
setCanvasDimensions(barsCanvas, mainDimensionsAndPosition.width, mainDimensionsAndPosition.height);
window.addEventListener("resize", () => {
    const mainDimensionsAndPositionResized = main.getBoundingClientRect();
    setCanvasDimensions(barsCanvas, mainDimensionsAndPositionResized.width, mainDimensionsAndPositionResized.height);
});
// Create an audio node from the <audio> element
const audioNodeSource = audioContext.createMediaElementSource(audioElement);
// Create the analyzer, connect it to the audio node source and connect the analyzer to the audio context destination
const analyzer = audioContext.createAnalyser();
audioNodeSource.connect(analyzer);
analyzer.connect(audioContext.destination);
// Set the number of audio sample frequencies with the FFT (Fast Fourier Transform) method
//Btw here's an amazing explanation explaining what the FFT is useful for: https://www.youtube.com/watch?v=nmgFG7PUHfo
analyzer.fftSize = 128;
/**
 * Animates the bars in the canvas by clearing the canvas, drawing the bars and then requesting another animation frame
 *
 * @returns {void}
 */
function animate() {
    //We clear the old plaint
    barsCanvasContext.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
    //We draw the bars
    drawBars();
    //We create a loop to update the canvas every frame (1/24th of a second)
    requestAnimationFrame(animate);
}
animate();
/**
 * Draws the bars in the canvas based on the frequency data from the analyzer
 *
 * @returns {void}
 */
function drawBars() {
    // Create an unsigned (number >= 0) short 8-bit [0-255] integer array with the frequency data from the analyzer
    const bufferLength = analyzer.frequencyBinCount;
    const frequencyDataArray = new Uint8Array(bufferLength);
    // Calculate the width of each bar based on the canvas width and the length of the frequency data array
    const singleBarWidth = (barsCanvas.width / frequencyDataArray.length) * 2;
    // Set the initial x value for the first bar to 0
    let axisXBarValue = 0;
    // Declare a variable to store the height of each bar
    let singleBarHeight = null;
    // Get the byte frequency data from the analyzer and store it in the frequency data array
    analyzer.getByteFrequencyData(frequencyDataArray);
    // Create a linear gradient for the bars
    const arrayOfHexColors = ["#333", "#c4c4c4"];
    const canvasGradient = createCanvasGradient(barsCanvasContext, 0, 0, 0, barsCanvas.height, arrayOfHexColors);
    // Loop through each element in the frequency data array
    for (let i = 0; i < bufferLength; i++) {
        // Calculate the height of the bar based on the frequency data at this index
        singleBarHeight = frequencyDataArray[i] * 2.5;
        // Set the fill style of the canvas context to the gradient
        barsCanvasContext.fillStyle = canvasGradient;
        // Draw a rectangle for the bar at the current x value,
        // with a height based on the frequency data and a width based on the single bar width
        barsCanvasContext.fillRect(axisXBarValue, barsCanvas.height - singleBarHeight, singleBarWidth, singleBarHeight);
        // Increment the x value by the width of a single bar to move to the next bar
        axisXBarValue += singleBarWidth;
    }
}

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

/******/ })()
;