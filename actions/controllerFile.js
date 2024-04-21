export async function ControllerFileCode(actionName, tableName) {
  if (!actionName || !tableName ) {
    return {
      error: "Action name, table name, output parameters, are required",
    };
  }

  const controllerQueryCode = `
  const ${tableName}Model = require('../models/${tableName}')

module.exports = {
    ${actionName}: (req, res) => {
        ${tableName}Model.${actionName}fn()
        .then(result => res.json(result))
        .catch(err => console.log(err))
    },
  }
  `;
  const data = {
    success: "Controller code added",
    data: controllerQueryCode,
  };

  return data;
}
