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



const labelDropZoneArea = selectQuery(".index__file-label");
const customAudioPlayer = selectQuery(".index__audio-player");
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
        yield transformFileToBase64Text(fileUploaded);
        removeClass(customAudioPlayer, "hide");
        addClass(labelDropZoneArea, "hide");
    });
}
function transformFileToBase64Text(audioFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const reader = new FileReader();
        reader.addEventListener("load", (e) => __awaiter(this, void 0, void 0, function* () {
            let base64MediaString = reader.result;
            // @ts-ignore
            let audio = new Audio(base64MediaString);
            /**
             * Test - BEGIN
             */
            addClass(audio, "index__audio--source");
            customAudioPlayer.appendChild(audio);
            const test = selectQuery(".index__audio--source");
            console_functions_log(test.duration);
            /**
             * Test - END
             */
        }));
        reader.readAsDataURL(audioFile);
    });
}

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

/******/ })()
;