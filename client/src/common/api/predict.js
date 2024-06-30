import { TEST } from "../../config";

export async function predictAnalysis(modelPath, avFilesPath) {
    const url = `${TEST.url}/predict`;
    const data = {
        model: modelPath, 
        av_files: avFilesPath, 
    };

    try {
        console.log("Sending request to:", url);
        console.log("Request data:", data);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3000');

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors', 
            headers: headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Response data:", result);
        return result;
    } catch (error) {
        console.error('Er is een fout opgetreden bij het maken van het verzoek:', error);
        throw error;
    }
}
