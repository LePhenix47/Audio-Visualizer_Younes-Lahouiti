//Utils
import { log, error } from "./utils/functions/console.functions";
import {
  selectQuery,
  selectQueryAll,
  addClass,
  removeClass,
} from "./utils/functions/dom.functions";
import { splitString } from "./utils/functions/string.functions";

//Components
import "./components/audio-player.component";
import { createDataAndAudioAnalyzer } from "./utils/functions/audio.functions";
import { isInRangePowerOfTwo } from "./utils/functions/number.function";
import {
  createCanvasGradient,
  setCanvasDimensions,
} from "./utils/functions/canvas.functions";
import { Timeout } from "./utils/classes/timeout.class";

const barsCanvas: HTMLCanvasElement = selectQuery(".index__canvas--bars");
const barsCanvasContext: CanvasRenderingContext2D = barsCanvas.getContext("2d");

const mp3WebComponent: HTMLElement = selectQuery("audio-player");

const audioElement: HTMLAudioElement = selectQuery("audio", mp3WebComponent);

const audioContext: AudioContext = new AudioContext();

const main: HTMLElement = selectQuery("main");
// When the window is resized, update the canvas dimensions and clear the canvas
const mainDimensionsAndPosition: DOMRect = main.getBoundingClientRect();
setCanvasDimensions(
  barsCanvas,
  mainDimensionsAndPosition.width,
  mainDimensionsAndPosition.height
);

window.addEventListener("resize", () => {
  const mainDimensionsAndPositionResized: DOMRect =
    main.getBoundingClientRect();

  setCanvasDimensions(
    barsCanvas,
    mainDimensionsAndPositionResized.width,
    mainDimensionsAndPositionResized.height
  );
});

// Create an audio node from the <audio> element
const audioNodeSource: MediaElementAudioSourceNode =
  audioContext.createMediaElementSource(audioElement);

// Create the analyzer, connect it to the audio node source and connect the analyzer to the audio context destination
const analyzer: AnalyserNode = audioContext.createAnalyser();
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
function animate(): void {
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
function drawBars(): void {
  // Create an unsigned (number >= 0) short 8-bit [0-255] integer array with the frequency data from the analyzer
  const bufferLength: number = analyzer.frequencyBinCount;
  const frequencyDataArray: Uint8Array = new Uint8Array(bufferLength);

  // Calculate the width of each bar based on the canvas width and the length of the frequency data array
  const singleBarWidth = (barsCanvas.width / frequencyDataArray.length) * 2;

  // Set the initial x value for the first bar to 0
  let axisXBarValue: number = 0;

  // Declare a variable to store the height of each bar
  let singleBarHeight: number = null;

  // Get the byte frequency data from the analyzer and store it in the frequency data array
  analyzer.getByteFrequencyData(frequencyDataArray);

  // Create a linear gradient for the bars using an array of hex colors
  const arrayOfHexColors: string[] = ["#333", "#c4c4c4"];
  const canvasGradient: CanvasGradient = createCanvasGradient(
    barsCanvasContext,
    0,
    0,
    0,
    barsCanvas.height,
    arrayOfHexColors
  );

  // Loop through each element in the frequency data array to draw the bars
  for (let i = 0; i < bufferLength; i++) {
    // Calculate the height of the bar based on the frequency data at this index,
    // which is scaled by a factor of 2.5 to make the bars taller
    singleBarHeight = frequencyDataArray[i] * 2.5;

    // Set the fill style of the canvas context to the gradient
    barsCanvasContext.fillStyle = canvasGradient;

    // Draw a rectangle for the bar at the current x value,
    // with a height based on the frequency data and a width based on the single bar width
    barsCanvasContext.fillRect(
      axisXBarValue,
      barsCanvas.height - singleBarHeight,
      singleBarWidth,
      singleBarHeight
    );

    // Increment the x value by the width of a single bar to move to the next bar
    axisXBarValue += singleBarWidth;
  }
}

const authorizeButton: HTMLButtonElement = selectQuery(
  ".index__authorize-button"
);

// One-liner to resume playback when user interacted with the page.
authorizeButton.addEventListener("click", resumeAudioContext);

/**
 * Resumes the audio context when the user interacts with the page
 * @async
 *
 * @return {Promise<void>} Nothing
 */
async function resumeAudioContext(): Promise<void> {
  const button: HTMLButtonElement = this;
  const timeoutCreator: Timeout = new Timeout();

  function hideElement() {
    //Will fade out with a delay of 2 seconds
    addClass(button, "fade-out");
    const removeElementDisplay = timeoutCreator.set(() => {
      removeClass(button, "fade-out");
      addClass(button, "hide");
      //We remove the fade-out function
    }, 1_400);
  }
  try {
    //We'll wait for the audio context to resume
    await audioContext.resume();
    button.textContent = "Success!";
    hideElement();
  } catch (resumeError) {
    error("An unexpected error has occured: ", resumeError);
    button.textContent = `Error: ${resumeError}`;
  }
}
