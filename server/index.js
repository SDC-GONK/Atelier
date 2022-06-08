require('dotenv').config();
const express = require('express');
const pool = require('../db.js');

const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`QA server listening on port:'${process.env.PORT}`)
});
pool.connect();
