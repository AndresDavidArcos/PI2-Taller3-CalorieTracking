const { uploadFile } = require("../controllers/files");
const express = require("express");
const multer = require('multer');
const upload = multer();

const app = express();

app.post("/subirarchivo", upload.single('imagen'), uploadFile);

module.exports = app;