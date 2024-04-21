export async function ModalCodeFile(actionName, tableName, outputParameters) {
  if (!actionName || !tableName || !outputParameters) {
    return {
      error: "Action name, table name, output parameters, are required",
    };
  }
  let outputParamsCode = "";
  outputParameters.forEach((param) => {
    outputParamsCode += `${tableName}.${param.name}, `;
  });
  // Remove trailing comma and space
  outputParamsCode = outputParamsCode.slice(0, -2);
  const databaseQueryCode = `
  const db = require('../config/config');

  module.exports = {
    ${actionName}fn: () => {
      return new Promise((resolve, reject) => {
        db.query(\`SELECT ${outputParamsCode} FROM ${tableName}\`, (err, result) =>{
          if(!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
      })
    },
  }
  `;
  const data = {
    success: "Database file code generated successfully",
    data: databaseQueryCode,
  };

  return data;
}
