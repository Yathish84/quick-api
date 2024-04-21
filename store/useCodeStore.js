import { create } from "zustand";
import JSZip from "jszip";

const useFolderStructureStore = create((set) => ({
  folderStructure: {
    config: {
      "config.js": "// Configuration file",
    },
    controllers: {
      "exampleController.js": "// Example controller",
    },
    middleware: {
      "authMiddleware.js": "// Example middleware",
    },
    models: {
      "exampleModel.js": "// Example model",
    },
    routes: {
      "exampleRoutes.js": "// Example route file",
    },
    "app.js": "",
    "package.json": "// Dependency information",
  },
  setFolderStructure: (newStructure) => set({ folderStructure: newStructure }),
  downloadFolderStructure: () => {
    const { folderStructure } = useFolderStructureStore.getState();
    const zip = new JSZip();

    // Add files to the zip folder
    Object.entries(folderStructure).forEach(([folderName, files]) => {
      let folder; // Declare folder variable here
      console.log("files", files);
      // Ensure folders are created
      console.log("folder", folderName);

      if (folderName === "app.js") {
        zip.file("app.js", files);
        return;
      } else if (folderName === "package.json") {
        zip.file("package.json", JSON.stringify(files, null, 2));
        return;
      } else {
        folder = zip.folder(folderName); // Initialize folder variable
      }

      Object.entries(files).forEach(([fileName, fileContent]) => {
        console.log("filename", fileName);
        // Explicitly add extension for app.js and format package.json

        folder.file(fileName, fileContent);

        // Optional logging for verification
        // console.log(`Creating file: ${folderName}/${fileName}`);
      });
    });

    // Generate the zip file
    zip.generateAsync({ type: "blob" }).then((content) => {
      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "folder_structure.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  updateFileContent: (filePath, content) => {
    // Get current folder structure
    const { folderStructure } = useFolderStructureStore.getState();

    // Split the filePath into an array of folder names and the filename
    const filePathParts = filePath.split("/");

    // Pop the last element to get the filename
    const fileName = filePathParts.pop();

    // Traverse the folderStructure based on the filePathParts
    let currentFolder = folderStructure;
    for (const folder of filePathParts) {
      if (!currentFolder[folder]) {
        // If the folder doesn't exist, create it
        currentFolder[folder] = {};
      }
      // Move to the next level of the folder structure
      currentFolder = currentFolder[folder];
    }

    // Update or add the file directly to the currentFolder
    currentFolder[fileName] = content;

    // Update the state with the modified folder structure
    set({
      folderStructure: {
        ...folderStructure,
      },
    });
  },
}));

export default useFolderStructureStore;
