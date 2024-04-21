export async function RouteFileCode(actionName, method, path, tableName) {
  if (!actionName || !tableName) {
    return {
      error: "Action name, table name, output parameters, are required",
    };
  }

  const Code = `
  const express = require('express')
const Route = express.Router()

const ${tableName}Controller = require('../controller/books')


Route
    // RESTful BOOK
    .${method}('${path}', ${tableName}Controller.${actionName})
  `;
  const data = {
    success: "App code added",
    data: Code,
  };

  return data;
}
