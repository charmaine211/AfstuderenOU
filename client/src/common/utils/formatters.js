export function formatFileFormats(formats) { 
    return formats.join(", ");
 }

export const getFileExtension = (filePath) => {
    const match = filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    return match ? match[1] : '';
  }