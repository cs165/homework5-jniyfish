const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

const key = require('./privateSettings.json');
const SPREADSHEET_ID = '15zl8QaCvHDMXizKLTSNZwV9OK4ZAEP6H99let8F7NIc';

const app = express();
const jsonParser = bodyParser.json();
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

app.use(express.static('public'));

async function onGet(req, res) {
  console.log("method:get");
  const result = await sheet.getRows();
  const rows = result.rows;
  console.log(rows);

  var array = [];

  for (var i = 1; i < rows.length; i++) {
    let json = {};
    for (var j = 0; j < rows[0].length; j++) {
      json[rows[0][j]] = rows[i][j];
    }
    array.push(json);;
  }
  res.json(array);
}
app.get('/api', onGet);

async function onDelete(req, res) {
  console.log("method:detele");
  const column = req.params.column;
  const value = req.params.value;
  const result = await sheet.getRows();
  const rows = result.rows;
  var del=0;
  console.log(column);
  for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] == column && rows[i][1]==value) {
        await sheet.deleteRow(i);
        del=1;
        break;
      }   
    if(del==1)
     break;
  }
  const result2 = await sheet.getRows();
  const rows2 = result2.rows;
  var array = [];

  for (var i = 1; i < rows2.length; i++) {
    let json = {};
    for (var j = 0; j < rows2[0].length; j++) {
      json[rows2[0][j]] = rows2[i][j];
    }
    array.push(json);;
  }
  res.json(array);
}
app.delete('/api/:column/:value', onDelete);

async function onPost(req, res) {
  console.log("method:post");
  const messageBody = req.body;
  const idList = Object.keys(messageBody);
  var nameList = Object.values(messageBody);
  var newrow = [];
  const result = await sheet.getRows();
  const rows = result.rows;
  if (idList.length == rows[0].length) {
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[0].length; j++) {
        if (idList[j] == rows[0][i]) {
          newrow[i] = nameList[j];
        }
      }
    }
  }
  else{
  }
  await sheet.appendRow(newrow);
  console.log(newrow);
  const result2 = await sheet.getRows();
  const rows2 = result2.rows;
  var array = [];

  for (var i = 1; i < rows2.length; i++) {
    let json = {};
    for (var j = 0; j < rows2[0].length; j++) {
      json[rows2[0][j]] = rows2[i][j];
    }
    array.push(json);;
  }
  res.json(array);

}
app.post('/api', jsonParser, onPost);

// TODO(you): Add at least 1 GET route and 1 POST route.

// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});


