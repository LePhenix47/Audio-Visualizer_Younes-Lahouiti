/**
 * Plays the audio element
 * @param {HTMLAudioElement} audio - The HTML audio element to be played
 */
export function playAudio(audio: HTMLAudioElement): void {
  audio.play();
}

/**
 * Pauses the audio element
 * @param {HTMLAudioElement} audio - The HTML audio element to be paused
 */
export function pauseAudio(audio: HTMLAudioElement): void {
  audio.pause();
}

/**
 * Sets the volume of an audio element
 * @param {HTMLAudioElement} audio - The audio element to set the volume for
 * @param {number} volume - The volume level to set (between 0 and 1)
 */
export function setAudioVolume(audio: HTMLAudioElement, volume: number): void {
  audio.volume = volume;
}

/**
 * Sets to a specific timestamp in an audio element
 * @param {HTMLAudioElement} audio - The audio element to seek
 * @param {number} time - The time to seek to (in seconds)
 */
export function setTimestampAudio(audio: HTMLAudioElement, time: number): void {
  audio.currentTime = time;
}

/**
 * Returns the current time (in seconds) of an audio element
 * @param {HTMLAudioElement} audio - The audio element to get the current time from
 * @returns {number} The current time of the audio element (in seconds)
 */
export function getAudioCurrentTime(audio: HTMLAudioElement): number {
  return audio.currentTime;
}

/**
 * Get the duration of an audio file in seconds
 *
 * @param {HTMLAudioElement} audio - The audio element to get the duration from
 * @returns {number} The duration of the audio file in seconds (returns 0 if it's not available)
 */
export function getAudioTotalTime(audio: HTMLAudioElement): number {
  return isNaN(audio.duration) ? 0 : audio.duration;
}

/**
 * Checks if an audio element has ended
 * @param {HTMLAudioElement} audio - The HTMLAudioElement to check
 * @returns Boolean value telling whether or not the audio has ended
 */
export function checkIfAudioEnd(audio: HTMLAudioElement): boolean {
  return audio.ended;
}

export async function transformFileToBase64Text(audioFile: File) {
  const reader: FileReader = new FileReader();

  reader.readAsDataURL(audioFile);

  reader.addEventListener("load", async (e: ProgressEvent<FileReader>) => {
    let base64MediaString: string | ArrayBuffer = reader.result;

    // @ts-ignore
    let audio: HTMLAudioElement = new Audio(base64MediaString);

    return audio;
  });
}
