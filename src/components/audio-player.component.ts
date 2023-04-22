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

@media screen and (width <=768px) {
    .index__audio-player {
        width: 80%
    }
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

    :root .index__audio-player {
        background-position: 100%
    }

    ::backdrop {
        --scrollbar-track-bg-color: transparent;
        --scrollbar-thumb-bg-color: #757575;
        --scrollbar-thumb-bg-color--hover: #9d9d9d;
        --scrollbar-thumb-bg-color--active: #9d9d9d
    }
}
`;
const audioPlayerTemplateHTMLContent = /*html */ `
 <label for="audio-file" class="index__label index__file-label hide">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg index__svg" fill="currentColor">
                <path
                    d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,0-2,0v6a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12Z">
                </path>
            </svg>
        </label>
        <input type="file" id="audio-file" class="index__input index__file-input hide" accept="audio/*" />

        <section class="index__audio-player">
            <canvas class="index__canvas index__canvas--round"></canvas>
            <!-- <audio src="" class="index__audio--source"></audio> -->
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
                    <button class="index__audio-player--button"><i
                            class="fa-solid no-event-listener fa-backward"></i></button>
                    <button class="index__audio-player--button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 384 512" height="16" width="16"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512" height="16" width="16"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
                    </button>
                    <button class="index__audio-player--button"><i
                            class="fa-solid no-event-listener fa-forward"></i></button>
                </div>
                <div class="index__audio-player--volume">
                    <button class="index__audio-player--mute" type="button">
                        <i class="fa-solid no-event-listener fa-volume-xmark hide"></i>
                        <i class="fa-solid no-event-listener fa-volume-low hide"></i>
                        <i class="fa-solid no-event-listener fa-volume-high"></i>
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
   *Static method used to store the array of all the custom attributes of the component
   */
  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return [];
  }

  connectedCallback() {}

  disconnectedCallback() {}

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
