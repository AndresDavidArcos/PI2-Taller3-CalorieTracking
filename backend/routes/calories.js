const { showCalories } = require("../controllers/calories");
const express = require("express");
const multer = require('multer');
const upload = multer();

const app = express();

app.post("/askgemini", showCalories);

module.exports = app;