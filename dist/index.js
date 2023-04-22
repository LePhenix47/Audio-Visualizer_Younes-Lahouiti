/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {

;// CONCATENATED MODULE: ./src/utils/functions/console.functions.ts
/**
 * The console methods are exported as separate methods through destructuring
 */
const { log: console_functions_log, error, table, time, timeEnd, timeStamp, timeLog, assert, clear, count, countReset, group, groupCollapsed, groupEnd, trace, profile, profileEnd, warn, debug, info, dir, dirxml, } = console;

;// CONCATENATED MODULE: ./src/utils/functions/dom.functions.ts
/**
 * A simplified version of `document.querySelector()`
 *
 * @param {string} query - HTML Element to select
 * @param {HTMLElement} container - HTML Element to select the query from
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
        //@ts-ignore
        return container.shadowRoot.querySelector(query);
    }
    return container.querySelector(query);
}
/**
 * A simplified version of `document.querySelectorAll()`
 *
 * @param {string} query - HTML Element to select
 * @param {HTMLElement} container - HTML Element to select the query from
 * @returns {HTMLElement[]|null} - An array with all the elements selected or `null` if the element doesn't exist
 */
function selectQueryAll(query, container) {
    if (!container) {
        return Array.from(document.querySelectorAll(query));
    }
    const isWebComponent = container.tagName.includes("-");
    if (isWebComponent) {
        //@ts-ignore
        return Array.from(container.shadowRoot.querySelectorAll(query));
    }
    return Array.from(container.querySelectorAll(query));
}
/**
 * Function that returns an array containing all child nodes of an HTML element.
 *
 * @param {HTMLElement} elementOfReference The parent HTML element whose children to select.
 * @returns {Element[]} An array containing all child nodes of the parent element or null if the parent element has no children.
 */
function getChildren(elementOfReference) {
    if (!elementOfReference) {
        return [];
    }
    return Array.from(elementOfReference.children);
}
/**
 * Returns the closest ancestor element of a given HTML element based on a CSS selector.
 *
 * @param {HTMLElement} elementOfReference - The HTML element of reference.
 * @param {string} [cssSelector=""] - The CSS selector to use to select the ancestor element. Default is an empty string.
 *
 * @returns {HTMLElement|null} The closest ancestor element that matches the CSS selector, or null if no ancestor element matches the selector.
 */
function getAncestor(elementOfReference, cssSelector = "") {
    return elementOfReference.closest(cssSelector);
}
/**
 *Returns the host element of a web component given a reference element within it.
 *
 *@param {Element} elementOfReference - An element that is a child of the web component.
 *
 * @returns {Element} - The host element of the web component.
 */
function getComponentHost(elementOfReference) {
    //@ts-ignore
    return elementOfReference.getRootNode().host;
}
/**
 * Returns the next sibling element of the specified element.
 *
 * @param {HTMLElement} elementOfReference - The reference element whose sibling to return.
 * @returns {HTMLElement | null} The next sibling element, or null if there is none.
 */
function getSibling(elementOfReference) {
    //@ts-ignore
    return elementOfReference.nextElementSibling;
}
/**
 *
 * Returns an array of strings representing the classes of the specified element.
 *
 * @param {HTMLElement} elementOfReference - The element to retrieve class values from.
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
 * @param {HTMLElement} [element=document.body] - The HTML element to set the style property for, ***NOT mandatory***.

* @returns {void}
 */
function setStyleProperty(property, value, element = document.body) {
    const stringifiedValue = value.toString();
    return element.style.setProperty(property, stringifiedValue);
}
/**
 * Adds or modifies an attribute to the given element.
 *
 * @param element The element to add the attribute to.
 * @param property The name of the attribute to add.
 * @param value The value to set the attribute to.
 */
function modifyAttribute(element, property, value) {
    element.setAttribute(property, value.toString());
}
/**
 * Removes an attribute from an element and sets a new attribute in its place.
 *
 * @param {Element} element - The element from which to remove the attribute.
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
    border-color: transparent;
    background-color: transparent;

    font-family: inherit;
    color: inherit;


    
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


.index__canvas {
    z-index: 1
}

.index__canvas--bars {
    display: none;
    height: 100%;
    inset: 50%;
    outline-offset: -3px;
    position: absolute;
    translate: -50% -50%;
    width: 100%
}

.index__canvas--round {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1
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

.index__file-label:before {
    content: "Upload an audio file";
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
    white-space: nowrap
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
    border: 2px solid #000;
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
            <canvas class="index__canvas index__canvas--round"></canvas>
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
                    <button class="index__audio-player--button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="" fill="currentColor" viewBox="0 0 384 512" height="16" width="16">
                            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="hide" fill="currentColor" viewBox="0 0 320 512" height="16" width="16">
                            <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                        </svg>
                    </button>
                </div>
                <div class="index__audio-player--volume">
                    <button class="index__audio-player--mute" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="hide" fill="currentColor" height="16" width="16">
                            <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="hide" fill="currentColor" height="16" width="16">
                            <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="" fill="currentColor" height="16" width="16">
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
class AudioPlayer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        const clonedTemplate = audioPlayerTemplateElement.content.cloneNode(true);
        //We add it as a child of our web component
        shadowRoot.appendChild(clonedTemplate);
    }
    /**
     *Static method used to store the array of all the custom attributes of the component
     */
    static get observedAttributes() {
        //We indicate the list of attributes that the custom element wants to observe for changes.
        return [""];
    }
    connectedCallback() { }
    disconnectedCallback() { }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "": {
                //…
                break;
            }
            default:
                break;
        }
    }
}
customElements.define("audio-player", AudioPlayer);

;// CONCATENATED MODULE: ./src/index.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Utils



//Components

//Test, to be changed
const customAudioPlayerComponent = selectQuery("audio-player");
console_functions_log(customAudioPlayerComponent);
const labelDropZoneArea = selectQuery(".index__file-label", customAudioPlayerComponent);
console_functions_log(labelDropZoneArea);
const bodyDocument = selectQuery("body");
labelDropZoneArea.addEventListener("dragover", handleDragOver);
/**
 * Handles the dragover event on the dropzone area.
 * Adds the 'active' class to the dropzone area.
 * @param {DragEvent} e - The DragEvent object.
 * @returns {void}
 */
function handleDragOver(e) {
    e.preventDefault();
    addClass(labelDropZoneArea, "active");
}
labelDropZoneArea.addEventListener("dragleave", handleDragLeave);
/**
 * Handles the dragleave event on the dropzone area.
 * Removes the 'active' class from the dropzone area.
 * @param {DragEvent} e - The DragEvent object.
 * @returns {void}
 */
function handleDragLeave(e) {
    e.preventDefault();
    removeClass(labelDropZoneArea, "active");
}
labelDropZoneArea.addEventListener("drop", uploadAudio);
/**
 * Handles uploading audio files from a drop event.
 * @param {DragEvent} event - The drop event.
 * @returns {any} - Returns nothing.
 */
function uploadAudio(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const fileUploaded = event.dataTransfer.files[0];
        const { lastModified, name, type, size } = fileUploaded;
        const fileType = splitString(type, "/")[0];
        const isNotAudioFile = fileType !== "audio";
        if (isNotAudioFile) {
            console_functions_log("%cFile uploaded is not an audio!", "background: crimson; padding: 5px; ");
            return;
        }
        console_functions_log({ lastModified, name, type, size });
        // removeClass(customAudioPlayer, "hide");
        addClass(labelDropZoneArea, "hide");
    });
}

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

/******/ })()
;