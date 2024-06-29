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