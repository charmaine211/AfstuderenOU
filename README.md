# Driver Gaze Detection

## Future updates and features

1. Label Data: Improve Label UI for Better Usability
- [ ] **Make the Label UI more intuitive**: 
  - Enhance the user interface for labelling to ensure it is more user-friendly and easier to navigate.
  - Provide clear instructions and feedback to users during the labelling process.

2. Label Data: Simplify Directory Structure Setup
- [ ] **Create new `images` and `labels` directories automatically**: 
  - The tool should automatically create the required `images` and `labels` directories for the dataset.
  - Do not require users to manually create these directories.
  
- [ ] **Prompt user for root directory and output location**: 
  - Ask users to provide the root directory of their dataset in the image classification format.
  - Prompt the user to select the destination directory where the newly generated dataset in the object detection format will be saved.

3. Label Dataset: Asynchronous Relabeling for Improved Workflow
- [ ] **Implement asynchronous relabeling**: 
  - Allow users to continue working on other tasks while relabeling happens in the background.
  - Provide a progress indicator to show how much of the relabeling task has been completed.

4. Train: Add Video Instructions for Lightning AI Integration
- [ ] **Provide video instructions for file placement in Lightning AI**: 
  - Create a video tutorial explaining where to place the generated files in the Lightning AI environment.
  - Ensure the tutorial includes clear, step-by-step instructions for users to load and train the model correctly in Lightning AI.

5. Label Data: Fix Path Issues on Windows
- [ ] **Resolve issues with paths on Windows**: 
  - Currently, the labelling process is not working correctly on Windows due to differences in how paths are handled compared to macOS and Linux.
  - Ensure the tool handles file paths correctly across all platforms (Windows, macOS, Linux).
  - Implement platform-specific path handling to ensure compatibility, using libraries like `os.path.join()` for cross-platform path construction and avoiding issues with backslashes (`\`) on Windows.

6. Apply Atomic Design in the Frontend
- [ ] **To fully implement the Atomic Design methodology**:
  - Add a `Templates` folder:  
    Create a new folder called `Templates` in the appropriate directory within the React app (e.g., `src/components/Templates`).  
  - Move all template components:  
    Identify and relocate all components that define the structure of page layouts (e.g., header, footer, content arrangement) into this `Templates` folder.  
  - Update import:  
    Check all existing files where the moved components are imported and update the file paths to reflect the new `Templates` folder.  

7. Testing
- [ ] **Write tests for frontend with Jest**
- [ ] **Write tests for backend with Pytest**
- [ ] **Resolve all failed tests**

8. Release: Publish Version 1.1.0 on GitHub
- [ ] **Prepare for release**: 
  - Ensure all issues (including those related to Windows path handling) are resolved.
  - Test the app thoroughly on Windows, Apple, and Linux to confirm that it works as expected.
  
- [ ] **Create a release on GitHub**: 
  - Create a new GitHub release tagged as version `1.1.0` for Windows, Apple and Linux.
  - Include release notes summarizing the changes and fixes (including the improvements to the Label UI, path issues on Windows, etc.).
  - Upload the release binaries and any necessary files for easy installation.
     
## Application File Structure

The application is divided into two main parts: the **frontend** and the **backend**.

### Frontend

The React frontend can be found in the `client` folder and follows the **Atomic Design** methodology. This structure organizes components into the following levels:

- **Atoms**: Small, reusable components (e.g., buttons, inputs).
- **Molecules**: Groups of atoms that form slightly more complex UI elements.
- **Organisms**: Combinations of molecules that make up distinct sections of the UI.
- **Templates**: Page layouts with predefined structures.
- **Pages**: Complete views that users interact with.

### Backend

The backend resides in the `server` folder and is organized by functionality. Each feature or functionality has its own folder with the following files:

- **`_init_.js`**: Handles initialization and configuration.
- **`models.js`**: Defines database models for the feature.
- **`routes.js`**: Contains the API routes related to the feature.
- **`utils.js`**: Utility functions specific to the feature.

Additionally, shared code that is reused across multiple functionalities is placed in the `common` folder.

This modular structure ensures clarity, reusability, and maintainability across the application.

## Run application

To run both the backend and frontend of your application simultaneously, open two separate terminal windows or tabs. Start the backend server in one terminal, and launch the frontend interface in the other. This ensures that both components can operate concurrently.


### Run Python backend

#### Initial Setup

1. Navigate to the backend directory. Adjust the path as needed:

```
cd AfstuderenOU/server/
```

2. Create a virtual environment. Use either `python` or `python3`, depending on your system:

```
python -m venv venv
```

3. Activate the virtual environment based on your operating system:

_Windows:_

```
venv\Scripts\activate
```

_macOS and Linux:_

```
source venv/bin/activate
```

4. Install the required dependencies into the virtual environment. Use `pip` or `pip3` depending on your system:

```
pip install -r requirements.txt
```

#### Running the Flask Backend

In the backend directory:

```
python app.py
```

### Run React frontend

#### Initial Setup

1. Go to frontend directory, change the path accordingly

```
cd AfstuderenOU/client/
```

2. Install packages

```
npm install
```

#### Running the Frontend

In the frontend directory:

```
npm start
```

To run the app locally in Electron:

```
npm run electron
```

## Problems

### CORS

When encountering CORS errors, please check the backend url in [config.js](client/src/config.js). 

## Instructions

Video's:

- [Instruction - Labelling Dataset For Image Classification](https://youtu.be/HW69zI7CNKQ)
- [Instruction - Labelling Dataset For Object Detection](https://youtu.be/pwOoCZuG5D0)
- [Instruction - Training An Image Classification Model](https://youtu.be/NMM9BDRcjWU)
- [Instruction - Training An Object Detection Model](https://youtu.be/ZujOy_GrcRU)
- [Instruction - Making Predictions With A Trained Model](https://youtu.be/KpvPJ98CwWg)
  
Documents:

- [Collect dataset](./documentation/COLLECTDATASET.md)
- [Train with YOLOv8](./documentation/TRAIN.md)
- [Predict with trained model](./documentation/PREDICT.md)
- [How to test the application](./documentation/TESTING.md)
- [How to build application for publishing](./documentation/APPLICATION_BUILD.md)
- [Instructions of packaged app for the end user](./documentation/USER_INSTRUCTIONS.md)
