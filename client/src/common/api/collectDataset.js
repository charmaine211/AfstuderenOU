import { DEV, PROD } from "../../config";

export async function labelDatasetOD(ds_dir, lbls_dir, imgs_dir) {
    const url = process.env.NODE_ENV === 'production' ? `${PROD.url}/collect-data` : `${DEV.url}/collect-data`;

    const data = {
        dataset_dir: ds_dir, 
        labels_dir: lbls_dir, 
        images_dir: imgs_dir,
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
        console.error('Something went wrong while labelling dataset:', error);
        throw error;
    }
}
