const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./api/search');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, function(){
  console.log("Listening on port %s...", server.address().port)
});

app.use('/', router);
