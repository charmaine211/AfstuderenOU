import { DEV, PROD } from "../../config";

export async function predictAnalysis(modelPath, avFilesPath) {
    const url = process.env.NODE_ENV === 'production' ? `${PROD.url}/predict` : `${DEV.url}/predict`;
    // const url = `${PROD.url}/predict`;
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
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        const result = await response.json();

        return result;
        
    } catch (error) {
        console.error('Something went wrong while fetching prediction:', error);
        throw error;
    }
}
