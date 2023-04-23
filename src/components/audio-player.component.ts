import {
  formatTimeValues,
  getAudioCurrentTime,
  getAudioTotalTime,
  pauseAudio,
  playAudio,
} from "../utils/functions/audio.functions";
import { log } from "../utils/functions/console.functions";
import {
  addClass,
  appendChildToParent,
  getAttribute,
  getComponentHost,
  modifyAttribute,
  removeClass,
  selectQuery,
  selectQueryAll,
  setStyleProperty,
} from "../utils/functions/dom.functions";
import { transformAudioFileToBase64Text } from "../utils/functions/file.functions";
import { splitString } from "../utils/functions/string.functions";

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
                    <button class="index__audio-player--button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="" fill="currentColor" viewBox="0 0 384 512" height="16" width="16">
                            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="hide" fill="currentColor" viewBox="0 0 320 512" height="16" width="16">
                            <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="hide" fill="currentColor" viewBox="0 0 512 512" height="16" width="16">
                            <path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
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

export class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    const shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

    const clonedTemplate: Node =
      audioPlayerTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);
  }

  /**
   * Methods to handle events
   */
  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    addClass(event.currentTarget, "active");
  }

  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    removeClass(event.currentTarget, "active");
  }

  /**
   * Handles uploading audio files from a drop event.
   * @param {DragEvent} event - The drop event.
   * @returns {any} - Returns nothing.
   */
  async uploadAudioDrop(event: DragEvent): Promise<any> {
    log(event);
    event.preventDefault();

    const fileUploaded: File = event.dataTransfer.files[0];

    const componentHost = getComponentHost(event.currentTarget);

    showAudioPlayer(componentHost, fileUploaded);
  }

  async uploadAudioInput(event: Event): Promise<any> {
    //@ts-ignore
    const inputElement: HTMLInputElement = event.currentTarget;

    const fileUploaded = Array.from(inputElement.files)[0];

    const componentHost = getComponentHost(event.currentTarget);

    showAudioPlayer(componentHost, fileUploaded);
  }

  /**
   *Static method used to store the array of all the custom attributes of the component
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

  get title() {
    return this.getAttribute("title");
  }
  set title(value) {
    this.setAttribute("title", value);
  }

  get isPlaying() {
    return this.getAttribute("is-playing");
  }
  set isPlaying(value) {
    this.setAttribute("is-playing", value);
  }

  get currentTime() {
    return this.getAttribute("current-time");
  }
  set currentTime(value) {
    this.setAttribute("current-time", value);
  }

  get totalTime() {
    return this.getAttribute("total-time");
  }
  set totalTime(value) {
    this.setAttribute("total-time", value);
  }

  get volume() {
    return this.getAttribute("volume");
  }
  set volume(value) {
    this.setAttribute("volume", value);
  }

  get isMuted() {
    return this.getAttribute("is-muted");
  }
  set isMuted(value) {
    this.setAttribute("is-muted", value);
  }

  connectedCallback() {
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

    // playPauseAudioButton.addEventListener("click", )

    const audioSource: HTMLAudioElement = selectQuery("audio", this.shadowRoot);
    audioSource.addEventListener("timeupdate", (e) => {
      log("timeupdate!", e);
      const seconds = Math.trunc(getAudioCurrentTime(audioSource));
      this.currentTime = seconds.toString();
    });
  }

  disconnectedCallback() {
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

    // playPauseAudioButton.removeEventListener("click", )

    const audioSource: HTMLAudioElement = selectQuery("audio", this.shadowRoot);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const audioSourceElement: HTMLAudioElement = selectQuery(
      "audio",
      this.shadowRoot
    );

    const webComponent = selectQuery("audio-player");

    const mp3PlayerSection: HTMLElement = selectQuery(
      ".index__audio-player",
      this.shadowRoot
    );

    audioSourceElement.addEventListener("loadeddata", () => {});
    switch (name) {
      case "title": {
        log({ name, oldValue, newValue });
        const titleOfPlayer: HTMLHeadingElement = selectQuery(
          ".index__audio-player--name",
          this.shadowRoot
        );

        titleOfPlayer.textContent = newValue;
        //…
        break;
      }
      case "is-playing": {
        const isPlaying = newValue === "true";
        if (isPlaying) {
          playAudio(audioSourceElement);
        } else {
          pauseAudio(audioSourceElement);
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

        const totalTimeInSeconds: number = Number(
          this.getAttribute("total-time")
        );

        setStyleProperty(
          "--progress",
          `${Math.ceil(+this.currentTime / +this.totalTime)}%`,
          spanProgressBar
        );
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
        //…
        break;
      }
      case "is-muted": {
        //…
        break;
      }
      default:
        break;
    }
  }
}

customElements.define("audio-player", AudioPlayer);

async function checkFileType(fileUploaded: File, typeExpected: string) {
  const { lastModified, name, type, size }: File = fileUploaded;

  const fileType: string = splitString(type, "/")[0];

  return fileType === typeExpected;
}

async function showAudioPlayer(componentHost: ShadowRoot, fileUploaded: File) {
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
    labelDropZoneArea.innerText = "File uploaded is not an audio";
  }

  if (isNotAnAudioFile) {
    showError();
    return;
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

    const totalTime = Math.floor(getAudioTotalTime(audioSource));

    const attributesArray: { attribute: string; value: any }[] = [
      { attribute: "title", value: name },
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
