export function transformAudioFileToBase64Text(
  audioFile: File
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();

    reader.readAsDataURL(audioFile);

    reader.addEventListener("load", (e: ProgressEvent<FileReader>) => {
      const base64MediaString: string | ArrayBuffer | null = reader.result;

      const isNotString = typeof base64MediaString !== "string";
      if (isNotString) {
        reject("Error: Base64 string not found.");
        return;
      }

      resolve(base64MediaString);
    });

    reader.addEventListener("error", () => {
      reject("Error: Failed to read audio file.");
    });
  });
}

export function checkFileType(file, typeWanted) {
  return file;
}
