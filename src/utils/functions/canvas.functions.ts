/**
 * Creates a linear gradient for a canvas with the specified start and end points and array of hexadecimal colors
 *
 * @param {CanvasRenderingContext2D} canvasContext - The context of the canvas we're giving the gradient effect to
 * @param {number} startX - The initial X value of the gradient, aka the left part
 * @param {number} startY - The initial Y value of the gradient, aka the top part
 * @param {number} endX - The final X value of the gradient, aka the right part
 * @param {number} endY - The final Y value of the gradient, aka the bottom part
 * @param {string[]} arrayOfHexColors - An array of hexadecimal colors for the gradient stops
 *
 * @returns {CanvasGradient} The CanvasGradient object representing the created gradient
 */
export function createCanvasGradient(
  canvasContext: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  arrayOfHexColors: string[]
): CanvasGradient {
  // Create a linear gradient for a canvas
  const gradient: CanvasGradient = canvasContext.createLinearGradient(
    startX, //initial X value
    startY, //initial Y value
    endX, //final X value
    endY //final Y value
  );
  for (let i = 0; i < arrayOfHexColors.length; i++) {
    const hexadecimalColor: string = arrayOfHexColors[i];
    gradient.addColorStop(i, hexadecimalColor);
  }

  return gradient;
}
