import {
  checkIfAudioEnded,
  checkIfAudioPaused,
  formatTimeValues,
  getAudioCurrentTime,
  getAudioTotalTime,
  pauseAudio,
  playAudio,
  setAudioVolume,
  setTimestampAudio,
} from "../utils/functions/audio.functions";
import { log } from "../utils/functions/console.functions";
import {
  addClass,
  appendChildToParent,
  getAncestor,
  getAttribute,
  getComponentHost,
  getParent,
  modifyAttribute,
  removeClass,
  selectQuery,
  selectQueryAll,
  setStyleProperty,
} from "../utils/functions/dom.functions";
import { transformAudioFileToBase64Text } from "../utils/functions/file.functions";
import {
  sliceString,
  spliceArray,
  splitString,
} from "../utils/functions/string.functions";

const audioPlayerTemplateElement: HTMLTemplateElement =
  document.createElement("template");

const jsClasses: string = /* css*/ `
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

const cssReset: string = /*css*/ `
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

const audioPlayerTemplateStyle: string = /*css*/ `
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

const audioPlayerTemplateHTMLContent: string = /*html */ `
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
export class AudioPlayer extends HTMLElement {
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
    const shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

    // Clones and appends the content of the audio-player-template element
    const clonedTemplate: Node =
      audioPlayerTemplateElement.content.cloneNode(true);

    shadowRoot.appendChild(clonedTemplate);
  }
  /**
   * An array of attribute names to observe for changes.
   *
   * @readonly
   * @static
   * @type {string[]}
   */
  static get observedAttributes(): string[] {
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
  get title(): string {
    return this.getAttribute("title");
  }
  /**
   * Sets the value of the "title" attribute.
   *
   * @param {string} value - The new value of the "title" attribute.
   */
  set title(value: string) {
    this.setAttribute("title", value);
  }

  /**
   * Gets the value of the "is-playing" attribute.
   *
   * @returns {string} The value of the "is-playing" attribute.
   */
  get isPlaying(): string {
    return this.getAttribute("is-playing");
  }
  /**
   * Sets the value of the "is-playing" attribute.
   *
   * @param {string} value - The new value of the "is-playing" attribute.
   */
  set isPlaying(value: string) {
    this.setAttribute("is-playing", value);
  }

  /**
   * Gets the value of the "current-time" attribute.
   *
   * @returns {string} The value of the "current-time" attribute.
   */
  get currentTime(): string {
    return this.getAttribute("current-time");
  }
  /**
   * Sets the value of the "is-playing" attribute.
   *
   * @param {string} value - The new value of the "is-playing" attribute.
   */
  set currentTime(value: string) {
    this.setAttribute("current-time", value);
  }

  /**
   * Gets the value of the "total-time" attribute.
   *
   * @returns {string} The value of the "total-time" attribute.
   */
  get totalTime(): string {
    return this.getAttribute("total-time");
  }
  /**
   * Sets the value of the "total-time" attribute.
   *
   * @param {string} value - The new value of the "total-time" attribute.
   */
  set totalTime(value: string) {
    this.setAttribute("total-time", value);
  }

  /**
   * Gets the value of the "volume" attribute.
   *
   * @returns {string} The value of the "volume" attribute.
   */
  get volume(): string {
    return this.getAttribute("volume");
  }
  /**
   * Sets the value of the "volume" attribute.
   *
   * @param {string} value - The new value of the "volume" attribute.
   */
  set volume(value: string) {
    this.setAttribute("volume", value);
  }

  /**
   * Gets the value of the "is-muted" attribute.
   *
   * @returns {string} The value of the "is-muted" attribute.
   */
  get isMuted(): string {
    return this.getAttribute("is-muted");
  }
  /**
   * Sets the value of the "is-muted" attribute.
   *
   * @param {string} value - The new value of the "is-muted" attribute.
   */
  set isMuted(value: string) {
    this.setAttribute("is-muted", value);
  }

  /**
   * Event listener for drag over events.
   *
   * @param {DragEvent} event - The drag event.
   */
  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    addClass(event.currentTarget, "active");
  }

  /**
   * Event listener for drag leave events.
   *
   * @param {DragEvent} event - The drag event.
   */
  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    removeClass(event.currentTarget, "active");
  }

  /**
   * Event listener for drop events when uploading audio files.
   *
   * @param {DragEvent} event - The drag event.
   * @returns {Promise<void>} - A promise that resolves once the audio file is uploaded.
   */
  async uploadAudioDrop(event: DragEvent): Promise<any> {
    log(event);
    event.preventDefault();

    const fileUploaded: File = event.dataTransfer.files[0];

    const componentHost = getComponentHost(event.currentTarget);

    showAudioPlayer(componentHost, fileUploaded);
  }

  /**
   * Event listener for input events when uploading audio files.
   *
   * @param {Event} event - The input event.
   * @returns {Promise<void>} - A promise that resolves once the audio file is uploaded.
   */
  async uploadAudioInput(event: Event): Promise<any> {
    //@ts-ignore
    const inputElement: HTMLInputElement = event.currentTarget;

    const fileUploaded = Array.from(inputElement.files)[0];

    const componentHost = getComponentHost(event.currentTarget);

    showAudioPlayer(componentHost, fileUploaded);
  }

  /**
   * Event listener for play/pause button clicks.
   *
   * @param {PointerEvent} event - The pointer event.
   */
  playPause(event: Event): void {
    //@ts-ignore
    const button: HTMLButtonElement = event.currentTarget;

    const shadowRoot: ShadowRoot = getComponentHost(button);

    const pauseSVG: SVGElement = selectQuery(
      ".index__audio-player--pause-icon",
      button
    );

    const shownIcon: SVGElement = selectQuery("svg:not(.hide)", button);

    const isPaused: boolean = shownIcon === pauseSVG;
    if (isPaused) {
      modifyAttribute(shadowRoot, "is-playing", false);
    } else {
      modifyAttribute(shadowRoot, "is-playing", true);
    }
  }

  /**
   * Event listener for volume slider input events.
   *
   * @param {InputEvent} event - The input event.
   */
  setVolume(event: InputEvent) {
    const shadowRoot: ShadowRoot = getComponentHost(event.currentTarget);
    // @ts-ignore
    const valueOfInput: number = Number(event.target.value);
    modifyAttribute(shadowRoot, "volume", valueOfInput);
  }

  /**
   * Event listener for navigation dragger pointer events.
   *
   * @param {PointerEvent} event - The pointer event.
   */
  setNavigationDragger(event: PointerEvent) {
    const mp3Container: HTMLElement = getAncestor(
      event.currentTarget,
      "section"
    );

    const audioSource: HTMLAudioElement = selectQuery("audio", mp3Container);
    // Get the position and width of the placeholder progress bar element
    const { left, width }: DOMRect = this.getBoundingClientRect();
    // Get the X position of the click
    const mouseXPosition: number = event.x;

    // Calculate the X position of the placeholder progress bar element
    const barXPosition: number = left;

    // Calculate the offset of the X position of the click from the X position of the placeholder progress bar
    const axisXPositionOffset: number = mouseXPosition - barXPosition;

    // Get the total width of the placeholder progress bar
    const widthOfBar: number = width;

    // Calculate the percentage of the total width that the click occurred at
    const percentage: number = axisXPositionOffset / widthOfBar;

    // Get the total time of the audio
    const totalTimeAudio: number = getAudioTotalTime(audioSource);

    const audioNewCurrentTime: number = percentage * totalTimeAudio;

    // Set the timestamp of the audio source based on the calculated percentage
    setTimestampAudio(audioSource, audioNewCurrentTime);
  }

  muteAudioVolume(event: PointerEvent) {}

  //Web component methods
  /**
   * Invoked each time the custom element is appended into a document-connected element.
   *
   * @return {void} Nothing
   */
  connectedCallback(): void {
    const labelDropZoneArea: HTMLLabelElement = selectQuery(
      ".index__file-label",
      this.shadowRoot
    );

    labelDropZoneArea.addEventListener("dragover", this.handleDragOver);
    labelDropZoneArea.addEventListener("dragleave", this.handleDragLeave);

    labelDropZoneArea.addEventListener("drop", this.uploadAudioDrop);

    const inputFile: HTMLInputElement = selectQuery(
      ".index__file-input",
      this.shadowRoot
    );
    inputFile.addEventListener("change", this.uploadAudioInput);

    const playPauseAudioButton: HTMLButtonElement = selectQuery(
      ".index__audio-player--button",
      this.shadowRoot
    );

    playPauseAudioButton.addEventListener("click", this.playPause);

    const audioSource: HTMLAudioElement = selectQuery("audio", this.shadowRoot);
    audioSource.addEventListener("timeupdate", (e) => {
      const seconds = Math.trunc(getAudioCurrentTime(audioSource));
      this.currentTime = seconds.toString();
    });

    const sliderInput: HTMLInputElement = selectQuery(
      ".index__audio-player--slider",
      this.shadowRoot
    );
    sliderInput.addEventListener("input", this.setVolume);

    const placeholderProgressBar: HTMLDivElement = selectQuery(
      ".index__audio-player--progress-bar",
      this.shadowRoot
    );

    placeholderProgressBar.addEventListener("click", this.setNavigationDragger);
    /**
     * Need to remove the event listeners on the disconnectedCallback() ↑
     * */
    const muteButton: HTMLButtonElement = selectQuery(
      ".index__audio-player--mute",
      this.shadowRoot
    );
    muteButton.addEventListener("click", (event: PointerEvent) => {
      const shadowRoot: ShadowRoot = getComponentHost(event.currentTarget);
      //@ts-ignore
      const isAlreadyMuted = shadowRoot.isMuted === "true";
      if (isAlreadyMuted) {
        //@ts-ignore
        sliderInput.value = 50;
        //@ts-ignore
        shadowRoot.isMuted = "false";
        //@ts-ignore
        shadowRoot.volume = "50";
      } else {
        //@ts-ignore
        sliderInput.value = 0;
        //@ts-ignore
        shadowRoot.isMuted = "true";
        //@ts-ignore
        shadowRoot.volume = "0";
      }
    });

    const deleteButton: HTMLButtonElement = selectQuery(
      ".index__audio-player--delete-button",
      this.shadowRoot
    );
    deleteButton.addEventListener("click", () => {
      hidePlayer(this.shadowRoot);
    });
  }

  /**
   * Invoked each time the custom element is disconnected from the document's DOM.
   *
   * @return {void} Nothing
   */
  disconnectedCallback(): void {
    const labelDropZoneArea: HTMLLabelElement = selectQuery(
      ".index__file-label",
      this.shadowRoot
    );

    labelDropZoneArea.removeEventListener("dragover", this.handleDragOver);
    labelDropZoneArea.removeEventListener("dragleave", this.handleDragLeave);

    labelDropZoneArea.removeEventListener("drop", this.uploadAudioDrop);

    const inputFile: HTMLInputElement = selectQuery(
      ".index__file-input",
      this.shadowRoot
    );
    inputFile.removeEventListener("change", this.uploadAudioInput);
    const playPauseAudioButton: HTMLButtonElement = selectQuery(
      ".index__audio-player--button",
      this.shadowRoot
    );

    playPauseAudioButton.removeEventListener("click", this.playPause);

    const audioSource: HTMLAudioElement = selectQuery("audio", this.shadowRoot);
    audioSource.removeEventListener("timeupdate", (e) => {
      const seconds = Math.trunc(getAudioCurrentTime(audioSource));
      this.currentTime = seconds.toString();
    });

    const sliderInput: HTMLInputElement = selectQuery(
      ".index__audio-player--slider",
      this.shadowRoot
    );
    sliderInput.removeEventListener("input", this.setVolume);

    const placeholderProgressBar: HTMLDivElement = selectQuery(
      ".index__audio-player--progress-bar",
      this.shadowRoot
    );

    placeholderProgressBar.removeEventListener(
      "click",
      this.setNavigationDragger
    );

    const muteButton: HTMLButtonElement = selectQuery(
      ".index__audio-player--mute",
      this.shadowRoot
    );
    muteButton.removeEventListener("click", (event: PointerEvent) => {
      //@ts-ignore
      sliderInput.value = 0;
      const shadowRoot: ShadowRoot = getComponentHost(event.currentTarget);
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
  async attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): Promise<void> {
    const audioSourceElement: HTMLAudioElement = selectQuery(
      "audio",
      this.shadowRoot
    );

    const mp3PlayerSection: HTMLElement = selectQuery(
      ".index__audio-player",
      this.shadowRoot
    );

    switch (name) {
      case "title": {
        const titleOfPlayer: HTMLHeadingElement = selectQuery(
          ".index__audio-player--name",
          this.shadowRoot
        );

        titleOfPlayer.textContent = newValue;
        //…
        break;
      }
      case "is-playing": {
        const button: HTMLButtonElement = selectQuery(
          ".index__audio-player--button",
          mp3PlayerSection
        );

        const playSVG: SVGElement = selectQuery(
          ".index__audio-player--play-icon",
          button
        );

        const pauseSVG: SVGElement = selectQuery(
          ".index__audio-player--pause-icon",
          button
        );

        const restartSVG: SVGElement = selectQuery(
          ".index__audio-player--restart-icon",
          button
        );

        const isNowPlaying: boolean = newValue === "true";

        const isNowNeedingToRestart: boolean =
          newValue === "false" && checkIfAudioEnded(audioSourceElement);
        if (isNowPlaying) {
          // Audio was paused and now needs to play.
          showOnlyPauseIcon();
          playAudio(audioSourceElement);
        } else if (isNowNeedingToRestart) {
          // Audio was playing, has ended, and is now paused.
          showOnlyRestartIcon();
        } else {
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
        const currentTimeParagraph: HTMLParagraphElement = selectQuery(
          ".index__audio-player--current-time",
          mp3PlayerSection
        );
        const currentTimeInSeconds: number = Number(newValue);
        const {
          seconds,
          minutes,
          hours,
        }: {
          seconds: string;
          minutes: string;
          hours: string;
        } = formatTimeValues(currentTimeInSeconds);

        const hasHours: boolean = Number(hours) !== 0;
        if (hasHours) {
          currentTimeParagraph.textContent = `${hours}:${minutes}:${seconds}`;
        } else {
          currentTimeParagraph.textContent = `${minutes}:${seconds}`;
        }
        const spanProgressBar: HTMLSpanElement = selectQuery(
          ".index__audio-player--current-progress",
          mp3PlayerSection
        );

        const totalTimeInSeconds: number = Number(this.totalTime);

        let currentTime: number = Number(this.currentTime);

        let progressPercentage: number = Math.ceil(
          (currentTime / totalTimeInSeconds) * 100
        );
        setStyleProperty(
          "--progress",
          `${progressPercentage}%`,
          spanProgressBar
        );

        const hasEnded: boolean =
          checkIfAudioPaused(audioSourceElement) &&
          checkIfAudioEnded(audioSourceElement);
        if (hasEnded) {
          this.isPlaying = "false";
        }
        //…
        break;
      }
      case "total-time": {
        const totalTimeParagraph: HTMLParagraphElement = selectQuery(
          ".index__audio-player--total-time",
          mp3PlayerSection
        );
        const totalTimeInSeconds = Number(newValue);
        const { hours, minutes, seconds } =
          formatTimeValues(totalTimeInSeconds);

        const hasHours: boolean = Number(hours) !== 0;
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
        const mutedIcon = selectQuery(
          ".index__audio-player--muted-volume-icon",
          this.shadowRoot
        );
        const lowVolumeIcon = selectQuery(
          ".index__audio-player--low-volume-icon",
          this.shadowRoot
        );
        const highVolumeIcon = selectQuery(
          ".index__audio-player--high-volume-icon",
          this.shadowRoot
        );

        const hasHighVolume: boolean = Number(newValue) >= 50;
        const hasLowVolume: boolean =
          Number(newValue) < 50 && Number(newValue) !== 0;
        const hasNoVolume: boolean = Number(newValue) === 0;

        if (hasHighVolume) {
          showHighVolumeIcon();
        } else if (hasLowVolume) {
          showLowVolumeIcon();
        } else if (hasNoVolume) {
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
        const isMuted: boolean = newValue === "true";

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
async function checkFileType(
  fileUploaded: File,
  typeExpected: string
): Promise<boolean> {
  const { lastModified, name, type, size }: File = fileUploaded;

  const fileType: string = splitString(type, "/")[0];

  return fileType === typeExpected;
}

/**
 * Shows the audio player after validating and transforming the audio file to base64.
 *
 * @param {ShadowRoot} componentHost - The ShadowRoot of the web component.
 * @param {File} fileUploaded - The audio file to be uploaded and played.
 *
 * @returns {Promise<void>} - A Promise that resolves after showing the audio player or an error message.
 */
async function showAudioPlayer(
  componentHost: ShadowRoot,
  fileUploaded: File
): Promise<void> {
  log("test", { componentHost }, { fileUploaded });
  const labelDropZoneArea: HTMLLabelElement = selectQuery(
    ".index__file-label",
    componentHost
  );
  const audioPlayerElement: HTMLElement = selectQuery(
    ".index__audio-player",
    componentHost
  );

  const isNotAnAudioFile: boolean = !(await checkFileType(
    fileUploaded,
    "audio"
  ));

  function showError() {
    log("Not an audio file, showing error message");
    removeClass(labelDropZoneArea, "active");
    labelDropZoneArea.textContent = "File uploaded is not an audio";
  }
  function removeActiveClassToDropzone() {
    removeClass(labelDropZoneArea, "active");
  }

  if (isNotAnAudioFile) {
    showError();
    return;
  } else {
    removeActiveClassToDropzone();
  }

  const audioBase64String: string = await transformAudioFileToBase64Text(
    fileUploaded
  );
  // We'll use to retrieve all the other info
  const audioSource: HTMLAudioElement = selectQuery("audio", componentHost);
  audioSource.src = audioBase64String;

  showPlayer();
  //We wait for the audio to load its metadata
  audioSource.addEventListener("loadedmetadata", setHostAttributes);

  function showPlayer() {
    addClass(labelDropZoneArea, "hide");
    removeClass(audioPlayerElement, "hide");
  }

  function setHostAttributes() {
    const { name }: File = fileUploaded;
    const musicTitle = splitString(name, ".mp3")[0];

    const totalTime = Math.floor(getAudioTotalTime(audioSource));

    const attributesArray: { attribute: string; value: any }[] = [
      { attribute: "title", value: musicTitle },
      { attribute: "is-playing", value: false },
      { attribute: "current-time", value: 0 },
      { attribute: "total-time", value: totalTime },
      { attribute: "volume", value: 50 },
      { attribute: "is-muted", value: false },
    ];

    for (const attributeKeyPairValues of attributesArray) {
      const {
        attribute,
        value,
      }: {
        attribute: string;
        value: any;
      } = attributeKeyPairValues;

      modifyAttribute(componentHost, attribute, value);
    }
  }
}
/**
 * Hides the audio player,resets its attributes and shows the label to upload audio files
 *
 * @param {ShadowRoot} componentHost - The ShadowRoot of the web component.
 * @returns {void}
 */
function hidePlayer(componentHost: ShadowRoot): void {
  const audioElement: HTMLAudioElement = selectQuery("audio", componentHost);
  const labelDropZoneArea: HTMLLabelElement = selectQuery(
    ".index__file-label",
    componentHost
  );

  const mp3PlayerSection: HTMLElement = selectQuery(
    ".index__audio-player",
    componentHost
  );

  resetAudio();
  resetPlayerAttributes();
  showOnlyDropzone();
  /**
   * Resets the audio src attribute to an empty string.
   *
   * @returns {void}
   */
  function resetAudio(): void {
    audioElement.src = "";
  }
  /**
   * Resets the audio player's attributes to their initial value
   *
   * @returns {void}
   */
  function resetPlayerAttributes(): void {
    // Array of attributes to reset.
    const attributesArray: string[] = [
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
