import { saveAs } from 'file-saver';

const downloadFile = (data, filename, type) => {
    const file = new Blob([data], {
            type: type,
    });


    saveAs(file, filename);
}


export const downloadPredictionCSV = (predictions) => {

    // CONSTANTS
    const rows = ["file, frame, class, probability"];

    // create rows with data
    for (const file in predictions) {
      const frames = predictions[file];
      for (const frame in frames) {
        const classes = frames[frame];
        for (const className in classes) {
          const probability = classes[className];
          rows.push(`${file},${frame},${className},${probability}`);
        }
      }
    };

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