//Utils
import { log } from "./utils/functions/console.functions";
import {
  selectQuery,
  selectQueryAll,
  addClass,
  removeClass,
} from "./utils/functions/dom.functions";
import { splitString } from "./utils/functions/string.functions";

//Components
import "./components/audio-player.component";

//Test, to be changed

const customAudioPlayerComponent: HTMLSelectElement =
  selectQuery("audio-player");

log(customAudioPlayerComponent);

const labelDropZoneArea: HTMLLabelElement = selectQuery(
  ".index__file-label",
  customAudioPlayerComponent
);

log(labelDropZoneArea);

const bodyDocument: HTMLBodyElement = selectQuery("body");

labelDropZoneArea.addEventListener("dragover", handleDragOver);
/**
 * Handles the dragover event on the dropzone area.
 * Adds the 'active' class to the dropzone area.
 * @param {DragEvent} e - The DragEvent object.
 * @returns {void}
 */
function handleDragOver(e: DragEvent): void {
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
function handleDragLeave(e: DragEvent): void {
  e.preventDefault();
  removeClass(labelDropZoneArea, "active");
}

labelDropZoneArea.addEventListener("drop", uploadAudio);

/**
 * Handles uploading audio files from a drop event.
 * @param {DragEvent} event - The drop event.
 * @returns {any} - Returns nothing.
 */
async function uploadAudio(event: DragEvent): Promise<any> {
  event.preventDefault();

  const fileUploaded: File = event.dataTransfer.files[0];

  const { lastModified, name, type, size }: File = fileUploaded;

  const fileType: string = splitString(type, "/")[0];

  const isNotAudioFile: boolean = fileType !== "audio";
  if (isNotAudioFile) {
    log(
      "%cFile uploaded is not an audio!",
      "background: crimson; padding: 5px; "
    );
    return;
  }
  log({ lastModified, name, type, size });

  // removeClass(customAudioPlayer, "hide");
  addClass(labelDropZoneArea, "hide");
}
