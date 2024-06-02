import { TEST } from "../../config";

async function uploadFiles(files) {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
  }

  try {
      const response = await fetch(`${TEST}/upload`, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return { success: true, filePaths: data.filePaths };
  } catch (error) {
      console.error('Error uploading files:', error);
      return { success: false, filePaths: [] };
  }
}

export async function predictAnalysis(modelFile, avFiles) {
  try {
      const modelResponse = await uploadFiles([modelFile]);
      if (!modelResponse.success) {
          throw new Error('Error uploading model file');
      }
      const modelPath = modelResponse.filePaths[0];

      const avResponse = await uploadFiles(avFiles);
      if (!avResponse.success) {
          throw new Error('Error uploading AV files');
      }
      const avPaths = avResponse.filePaths;

      const response = await fetch(`${TEST}/predict`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              model: modelPath,
              av_files: avPaths,
          }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error in prediction:', error);
      return null;
  }
}
