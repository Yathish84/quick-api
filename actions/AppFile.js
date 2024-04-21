export async function AppFileCode(tableName) {
  if ( !tableName) {
    return {
      error: "Action name, table name, output parameters, are required",
    };
  }

  const Code = `
  require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const ${tableName}Route = require('./routes/${tableName}')

const app = express()

const port = process.env.SERVER_PORT || 3030

app.listen(port, () => {
    console.log('Server running on port ' + port)
})


app.use(bodyParser.urlencoded({extended: false}))

app.use('/api', ${tableName}Route)
  `;
  const data = {
    success: "App code added",
    data: Code,
  };

  return data;
}
