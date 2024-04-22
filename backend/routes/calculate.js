const { calculate } = require("../controllers/calculate");
const express = require("express");
const multer = require('multer');
const upload = multer();

const app = express();

app.post("/calculatecalories", calculate);

module.exports = app;