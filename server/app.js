const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database');

const app = express();

app.use(cors());
app.use(/(\/rooms\/100|\/rooms\/[1-9][0-9]|\/rooms\/[1-9])\b/, express.static(path.join(__dirname, '../client/dist/')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

app.get('/api/rooms/:id/general', (req, res) => {
  const { id } = req.params;
  db.getGeneralInfo(id)
    .then((data) => {
      res.statusCode = 200;
      res.type = 'json';
      res.end(JSON.stringify(data[0]));
    })
    .catch((err) => {
      res.statusCode = 500;
      res.end(JSON.stringify(err));
    });
});

app.get('/api/rooms/:id/amenities', (req, res) => {
  const { id } = req.params;
  db.getAmenities(id)
    .then((data) => {
      res.statusCode = 200;
      res.type = 'json';
      res.end(JSON.stringify(data[0]));
    })
    .catch((err) => {
      res.statusCode = 500;
      res.end(JSON.stringify(err));
    });
});

module.exports = app;
