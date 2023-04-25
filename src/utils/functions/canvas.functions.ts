/**
 * Sets the dimensions of the given canvas element to the specified width and height
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to set the dimensions for
 * @param {number} width - The desired width for the canvas element
 * @param {number} height - The desired height for the canvas element
 *
 * @returns {void}
 */
export function setCanvasDimensions(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): void {
  canvas.width = width;
  canvas.height = height;
}

/**
 * Creates a linear gradient for a canvas with the specified start and end points and array of hexadecimal colors
 *
 * @param {CanvasRenderingContext2D} canvasContext - The context of the canvas we're giving the gradient effect to
 * @param {number} startX - The initial X value of the gradient
 * @param {number} startY - The initial Y value of the gradient
 * @param {number} endX - The final X value of the gradient
 * @param {number} endY - The final Y value of the gradient
 * @param {string[]} arrayOfHexColors - An array of hexadecimal colors for the gradient stops, the order of the elements have an importance
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
  const canvasGradient: CanvasGradient = canvasContext.createLinearGradient(
    startX,
    startY,
    endX,
    endY
  );

  for (let i = 0; i < arrayOfHexColors.length; i++) {
    const hexadecimalColor: string = arrayOfHexColors[i];

    canvasGradient.addColorStop(i, hexadecimalColor);
  }

  return canvasGradient;
}
