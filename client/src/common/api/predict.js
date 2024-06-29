import { TEST } from "../../config";

export async function predictAnalysis(modelPath, avFilesPath) {
    const url = `${TEST.url}/predict`;
    const data = {
        model: modelPath, 
        av_files: avFilesPath, 
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Er is een fout opgetreden bij het maken van het verzoek:', error);
        throw error;
    }
}
