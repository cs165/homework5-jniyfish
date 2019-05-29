const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

const key = require('./privateSettings.json');

// TODO(you): Change the value of this string to the spreadsheet id for your
// GSA spreadsheet. See HW5 spec for more information.
const SPREADSHEET_ID = '15zl8QaCvHDMXizKLTSNZwV9OK4ZAEP6H99let8F7NIc';

const app = express();
const jsonParser = bodyParser.json();
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

app.use(express.static('public'));

async function onGet(req, res) {
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
    console.log(array);
    console.log(json);
  }
  res.json(array);




}
app.get('/api', onGet);

async function onPost(req, res) {
  const messageBody = req.body;
  const idList = Object.keys(messageBody);
  var nameList = Object.values(messageBody);
  var newrow = [];
  const result = await sheet.getRows();
  const rows = result.rows;
  console.log(idList);
  console.log(nameList);
  if (idList.length == rows[0].length) {
    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[0].length; j++) {
        if (idList[j] == rows[0][i]) {
          newrow[i] = nameList[j];
        }
      }
    }
    res.json({ "response": "success" });
  }
  else{
    res.json({ "response": "success" });
  }
  sheet.appendRow(newrow);
  console.log(newrow);

}
app.post('/api', jsonParser, onPost);

async function onPatch(req, res) {
  const column = req.params.column;
  const value = req.params.value;
  const messageBody = req.body;
  const idList = Object.keys(messageBody);
  var nameList = Object.values(messageBody);
  const result = await sheet.getRows();
  const rows = result.rows;
  var json = {};
  var newrow = [];
  var index=0;

  for (let i = 0; i < rows[0].length; i++)
  {
    if(column==rows[0][i])
    {
      colindex=i;
      break;
    }
  }
  for (let i = 0; i < rows.length; i++) {
      if (rows[i][colindex] == value) {
        index=i;
        break;
      } 
  }
  for (let i = 0; i < rows[0].length; i++) {
    {
      newrow[i]=rows[index][i];
      for (let j=0 ; j< idList.length ; j++)
      {
          if(idList[j] == rows[0][i])
          {
            newrow[i] = nameList[j];
            json[rows[0][i]]=nameList[j];
            break;
          }
      }
    }
  }
  res.json(json);
  sheet.setRow(index,newrow);
  console.log(newrow);
}
app.patch('/api/:column/:value', jsonParser, onPatch);

async function onDelete(req, res) {
  const column = req.params.column;
  const value = req.params.value;
  const result = await sheet.getRows();
  const rows = result.rows;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] == value) {
        sheet.deleteRow(i);
        res.json({ "response": "success" });
        break;
      }
    }
  }
}
app.delete('/api/:column/:value', onDelete);


// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
