import { log } from "./console.functions";
import { isInRangePowerOfTwo } from "./number.function";

/**
 * Plays the audio element
 * @param {HTMLAudioElement} audio - The HTML audio element to be played
 */
export function playAudio(audio: HTMLAudioElement): void {
  audio?.play();
}

/**
 * Pauses the audio element
 * @param {HTMLAudioElement} audio - The HTML audio element to be paused
 */
export function pauseAudio(audio: HTMLAudioElement): void {
  audio?.pause();
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
 * Mutes the volume of an audio element
 * @param {HTMLAudioElement} audio - The audio element to set the volume for
 *
 */
export function muteVolume(audio: HTMLAudioElement): void {
  audio.muted = true;
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
  return audio?.currentTime;
}

/**
 * Gets the duration of an audio file in seconds
 *
 * @param {HTMLAudioElement} audio - The audio element to get the duration from
 * @returns {number} The duration of the audio file in seconds (returns 0 if it's not available)
 */
export function getAudioTotalTime(audio: HTMLAudioElement): number {
  return isNaN(audio?.duration) ? 0 : audio?.duration;
}

/**
 * Checks if an audio element has paused
 * @param {HTMLAudioElement} audio - The HTMLAudioElement to check
 * @returns Boolean value telling whether or not the audio is paused
 */
export function checkIfAudioPaused(audio: HTMLAudioElement): boolean {
  return audio?.paused;
}

/**
 * Checks if an audio element has ended
 * @param {HTMLAudioElement} audio - The HTMLAudioElement to check
 * @returns Boolean value telling whether or not the audio has ended
 */
export function checkIfAudioEnded(audio: HTMLAudioElement): boolean {
  return audio?.ended;
}

/**
 * Formats a given amount of seconds into a time object containing formatted hours, minutes and seconds
 * If the time is over an hour but under 10 minutes, the minutes are also formatted
 *
 * @param {number} seconds - The amount of seconds to format
 * @returns {{seconds: string, minutes: string, hours: string}} - A time object containing formatted hours, minutes and seconds
 */
export function formatTimeValues(seconds: number): {
  seconds: string;
  minutes: string;
  hours: string;
} {
  // Calculate the unformatted minutes and seconds
  const unformattedSeconds: number = Math.trunc(seconds % 60);
  const unformattedMinutes: number = Math.trunc((seconds / 60) % 60);
  const unformattedHours: number = Math.trunc(seconds / 3_600);

  // Format the seconds
  const formattedSeconds: string =
    unformattedSeconds >= 10
      ? unformattedSeconds.toString()
      : `0${unformattedSeconds}`;

  // Format the minutes
  let formattedMinutes: string = unformattedMinutes.toString();

  //Format the hours
  const formattedHours: string = unformattedHours.toString();

  // Check if the time is over an hour and under 10 minutes
  const isOverAnHour: boolean = unformattedHours > 0;
  const isUnderTenMinutes: boolean = unformattedMinutes < 10;

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
export function createDataAndAudioAnalyzer(
  audioElement: HTMLAudioElement,
  amountOfAudioSamples: number
): {
  analyzer: AnalyserNode;
  frequencyDataArray: Uint8Array;
} {
  // Create the AudioContext
  const audioContext: AudioContext = new AudioContext();

  // Create an audio node from the <audio> element
  const audioNodeSource: MediaElementAudioSourceNode =
    audioContext.createMediaElementSource(audioElement);

  // Create the analyzer, connect it to the audio node source and connect the analyzer to the audio context destination
  const analyzer: AnalyserNode = audioContext.createAnalyser();
  audioNodeSource.connect(analyzer);
  analyzer.connect(audioContext.destination);

  // Set the number of audio sample frequencies with the FFT (Fast Fourier Transform) method
  //Btw here's an amazing explanation explaining what the FFT is useful for: https://www.youtube.com/watch?v=nmgFG7PUHfo
  const amountIsOutOfRange: boolean = !isInRangePowerOfTwo(
    amountOfAudioSamples,
    4,
    15
  ).isWithinRange;
  if (amountIsOutOfRange) {
    analyzer.fftSize = 64;
    throw "FFT size is either not a power of 2 or out of the range [2⁴ , 2¹⁵]";
  }
  analyzer.fftSize = amountOfAudioSamples;

  // Create an unsigned 8-bit integer array with the frequency data from the analyzer
  const bufferLength: number = analyzer.frequencyBinCount;
  const frequencyDataArray: Uint8Array = new Uint8Array(bufferLength);
  return {
    analyzer,
    frequencyDataArray,
  };
}
