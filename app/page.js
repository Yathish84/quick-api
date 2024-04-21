"use client";
import Image from "next/image";
import JSZip from "jszip";
import { databaseFileCode } from "@/actions/databaseFile";
import useFolderStructureStore from "@/store/useCodeStore";
import {  ModalCodeFile } from "@/actions/modelFile";
import {  ControllerFileCode } from "@/actions/controllerFile";
import { AppFileCode } from "@/actions/AppFile";
import { RouteFileCode } from "@/actions/RoutesFile";
export default function Home() {
  const { updateFileContent, downloadFolderStructure, folderStructure } =
    useFolderStructureStore();
  const handleUpdateFile = async () => {
    const filePath = "config/config.js";
    const content = await databaseFileCode(3000);
    updateFileContent(filePath, content?.data);
  };
  const actionName = "getBooks"; // Action name
  const tableName = "books"; // Table name
  const outputParameters = [
    // Output parameters
    { name: "id", datatype: "INT" },
    { name: "title", datatype: "VARCHAR(255)" },
    { name: "description", datatype: "TEXT" },
  ];
  const handleModal = async () => {
    const filePath = `models/${tableName}.js`;
    const content = await ModalCodeFile(
      actionName,
      tableName,
      outputParameters
    );
    updateFileContent(filePath, content?.data);
    const CfilePath = `controllers/${tableName}.js`;
    const controllercontent = await ControllerFileCode(actionName, tableName);
    updateFileContent(CfilePath, controllercontent?.data);

      const RfilePath = `routes/${tableName}.js`;
      const routeContent = await RouteFileCode(actionName, "get" , "/",tableName);
      updateFileContent(RfilePath, routeContent?.data);



     const AfilePath = `app.js`;
     const Appcontent = await AppFileCode(tableName);
     updateFileContent(AfilePath, Appcontent?.data);

  };

  console.log(folderStructure);
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Download API Structure</h1>
      <button onClick={downloadFolderStructure}>Download</button>
      <button onClick={handleUpdateFile}>update db</button>
      <button onClick={handleModal}>update modal</button>
    </div>
  );
}
