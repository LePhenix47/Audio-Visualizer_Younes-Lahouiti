import { error } from "./console.functions";

/**
 * Transforms an audio file into a base64-encoded string
 *
 * @param {File} audioFile - The audio file to be transformed
 * @returns {Promise<string>} - A promise that resolves with the base64-encoded string of the audio file
 *
 * @throws {string} - An error message if the base64 string is not found or if reading the audio file fails
 */
export function transformAudioFileToBase64Text(
  audioFile: File
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();

    //Allows the conversion of binary data, in this case audio files, into a text format
    reader.readAsDataURL(audioFile);

    // When the audio file is loaded, extract the base64 string and resolve the promise with it
    reader.addEventListener("load", (e: ProgressEvent<FileReader>) => {
      const base64MediaString: string | ArrayBuffer | null = reader.result;

      const isNotString = typeof base64MediaString !== "string";
      if (isNotString) {
        reject("Error: Base64 string not found.");
        return;
      }

      resolve(base64MediaString);
    });

    // If there's an error while reading the audio file, reject the promise with an error message
    reader.addEventListener("error", () => {
      reject("Error: Failed to read audio file.");
    });
  });
}

/**
 * Creates an audio element from an uploaded audio file
 *
 * @param {File} audioFile - The audio file to be transformed
 * @returns {Promise<HTMLAudioElement>} - A promise that resolves with the created HTMLAudioElement
 *
 * @throws {string} - An error message if the transformAudioFileToBase64Text() function throws an error
 *
 */
// export async function createAudioElement(
//   audioFile: File
// ): Promise<HTMLAudioElement> {
//   try {
//     // Transform the audio file to a Base64 encoded string
//     const base64AudioString: string = await transformAudioFileToBase64Text(
//       audioFile
//     );
//     // Create a new HTMLAudioElement with the encoded string as its source
//     const audioElement: HTMLAudioElement = new Audio(base64AudioString);
//     return audioElement;
//   } catch (functionError) {
//     // Log any errors to the console
//     error(functionError);
//   }
// }
