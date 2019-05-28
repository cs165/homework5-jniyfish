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
    for(var j=0;j<rows[0].length;j++)
    {
      json[rows[0][j]]=rows[i][j];
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
  var newrow=[];
  newrow[0]= messageBody[0];
  newrow[1]= messageBody[1];
  const idList = Object.keys(messageBody);
  const nameList = Object.values(messageBody);
  //sheet.appendRow("message","312312");
  //sheet.appendRow(["hello","31231@3213"]);
  //sheet.appendRow(newrow);


  console.log(idList);
  console.log(nameList);
  sheet.appendRow(nameList);
  // TODO(you): Implement onPost.

  res.json({ status: 'unimplemented' });
}
app.post('/api', jsonParser, onPost);

async function onPatch(req, res) {
  const column = req.params.column;
  const value = req.params.value;
  const messageBody = req.body;

  // TODO(you): Implement onPatch.

  res.json({ status: 'unimplemented' });
}
app.patch('/api/:column/:value', jsonParser, onPatch);

async function onDelete(req, res) {
  const column = req.params.column;
  const value = req.params.value;
  const result = await sheet.getRows();
  const rows = result.rows;
  for(let i=0 ;i<rows.length;i++)
  {
    for(let j=0 ;j<rows[i].length;j++)
    {
      if(rows[i][j]==value)
      {
          sheet.deleteRow(i);
          res.json({"response":"success"});
      }
    }
  }

  // TODO(you): Implement onDelete.

 // res.json(rows[1]);
}
app.delete('/api/:column/:value', onDelete);


// Please don't change this; this is needed to deploy on Heroku.
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
