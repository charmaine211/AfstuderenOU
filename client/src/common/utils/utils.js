import { saveAs } from 'file-saver';

export const createNotebook = (code, filename) => {
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

    const blob = new Blob([JSON.stringify(notebookContent, null, 2)], {
        type: "application/json",
    });
    saveAs(blob, `${filename}.ipynb`);
}


const downloadFile = (data, filename, type, ) => {
    let file;

    if (saveAs === "blob"){
        file = new Blob([data], {
            type: type,
        });
    } else {
        file = new File([data], filename, { type: type}); 
    }

    saveAs(file, filename);
}

export const downloadPredictionCSV = (predictions) => {

    const rows = ["file, frame, class, probability"];

    for (const file in predictions) {
      const frames = predictions[file];
      for (const frame in frames) {
        const classes = frames[frame];
        for (const className in classes) {
          const probability = classes[className];
          rows.push(`${file}, ${frame}, ${className}, ${probability}`);
        }
      }
    };

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
    
        downloadFile([JSON.stringify(notebookContent, null, 2)], `${filename}.ipynb`, "application/json", "blob");
  }