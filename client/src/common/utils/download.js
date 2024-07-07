import { saveAs } from 'file-saver';

const downloadFile = (data, filename, type) => {
    const file = new Blob([data], {
            type: type,
    });


    saveAs(file, filename);
}


export const downloadPredictionCSV = (predictions) => {
    // CONSTANTS
    let rows = [];

    // Determine the type of predictions (OD or IC)
    const isOD = typeof Object.values(predictions)[0][0] === "object" && Array.isArray(Object.values(predictions)[0][0][Object.keys(Object.values(predictions)[0][0])[0]]);

    // Set the correct header based on the type
    if (isOD) {
        rows.push("file, frame, class, normalized x, normalized y, normalized w, normalized h");
    } else {
        rows.push("file, frame, class, probability");
    }

    // Create rows with data
    for (const file in predictions) {
        const frames = predictions[file];
        for (const frame in frames) {
            const classes = frames[frame];
            for (const className in classes) {
                const value = classes[className];
                if (isOD) {
                    rows.push(`${file},${frame},${className},${value.join(' ')}`);
                } else {
                    rows.push(`${file},${frame},${className},${value}`);
                }
            }
        }
    }

    // Download file
    downloadFile(rows.join('\n'), `prediction.csv`, "text/csv;charset=utf-8");
}



export const downloadNotebook = (code, filename) => {
    const notebookContent = {
        cells: [
            {
                cell_type: "code",
                execution_count: null,
                metadata: {},
                outputs: [],
                source: [code,
                ],
            },
        ],
        metadata: {
            kernelspec: {
                display_name: "Python 3",
                language: "python",
                name: "python3",
            },
            language_info: {
                codemirror_mode: {
                    name: "ipython",
                    version: 3,
                },
                file_extension: ".py",
                mimetype: "text/x-python",
                name: "python",
                nbconvert_exporter: "python",
                pygments_lexer: "ipython3",
                version: "3.8.5",
            },
        },
        nbformat: 4,
        nbformat_minor: 4,
        };
    
        downloadFile([JSON.stringify(notebookContent, null, 2)], `${filename}.ipynb`, "application/json");
  }