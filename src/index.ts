//Utils
import { log } from "./utils/functions/console.functions";
import {
  selectQuery,
  selectQueryAll,
  addClass,
  removeClass,
} from "./utils/functions/dom.functions";
import { splitString } from "./utils/functions/string.functions";

const labelDropZoneArea: HTMLLabelElement = selectQuery(".index__file-label");

const customAudioPlayer: HTMLSelectElement = selectQuery(
  ".index__audio-player"
);

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

  await transformFileToBase64Text(fileUploaded);

  removeClass(customAudioPlayer, "hide");
  addClass(labelDropZoneArea, "hide");
}

async function transformFileToBase64Text(audioFile: File) {
  const reader: FileReader = new FileReader();

  reader.addEventListener("load", async (e: ProgressEvent<FileReader>) => {
    let base64MediaString: string | ArrayBuffer = reader.result;

    // @ts-ignore
    let audio: HTMLAudioElement = new Audio(base64MediaString);

    /**
     * Test - BEGIN
     */
    addClass(audio, "index__audio--source");
    customAudioPlayer.appendChild(audio);

    const test: HTMLAudioElement = selectQuery(".index__audio--source");
    log(test.duration);
    /**
     * Test - END
     */
  });
  reader.readAsDataURL(audioFile);
}
