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
import { createDataAndAudioAnalyzer } from "./utils/functions/audio.functions";
import { isInRangePowerOfTwo } from "./utils/functions/number.function";

const barsCanvas: HTMLCanvasElement = selectQuery(".index__canvas--bars");
const barsCanvasContext: CanvasRenderingContext2D = barsCanvas.getContext("2d");

const mp3WebComponent: HTMLElement = selectQuery("audio-player");

const audioElement: HTMLAudioElement = selectQuery("audio", mp3WebComponent);

const audioContext: AudioContext = new AudioContext();

const main: HTMLElement = selectQuery("main");
// When the window is resized, update the canvas dimensions and clear the canvas
const { height, width } = main.getBoundingClientRect();
barsCanvas.width = width;
barsCanvas.height = height;
window.addEventListener("resize", () => {
  const { height, width } = main.getBoundingClientRect();
  barsCanvas.width = width;
  barsCanvas.height = height;
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
// const amountIsOutOfRange: boolean = !isInRangePowerOfTwo(16, 4, 15)
//   .isWithinRange;
// if (amountIsOutOfRange) {
//   analyzer.fftSize = 64;
//   throw "FFT size is either not a power of 2 or out of the range [2⁴ , 2¹⁵]";
// }
analyzer.fftSize = 128;

function animate() {
  // Create an unsigned 8-bit integer array with the frequency data from the analyzer
  const bufferLength: number = analyzer.frequencyBinCount;
  const frequencyDataArray: Uint8Array = new Uint8Array(bufferLength);
  const singleBarWidth = (barsCanvas.width / frequencyDataArray.length) * 2;
  let xValue = 0;
  let singleBarHeight = null;
  barsCanvasContext.clearRect(0, 0, barsCanvas.width, barsCanvas.height);
  analyzer.getByteFrequencyData(frequencyDataArray);
  for (let i = 0; i < bufferLength; i++) {
    singleBarHeight = frequencyDataArray[i] * 2;
    const red = i * 4 + 100;
    const green = i * singleBarHeight + 50;
    const blue = i * singleBarHeight + 50;
    barsCanvasContext.fillStyle = `rgb(${red},${green},${blue})`;
    barsCanvasContext.fillRect(
      xValue,
      barsCanvas.height - singleBarHeight,
      singleBarWidth,
      singleBarHeight
    );
    xValue += singleBarWidth;
  }
  requestAnimationFrame(animate);
}
animate();
