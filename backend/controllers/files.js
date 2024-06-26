const { BlobServiceClient } = require('@azure/storage-blob');
const axios = require('axios');
const { response } = require('../routes/calculate');

// Load the .env file if it exists
require("dotenv").config();

const blobSausUrl = process.env['BLOBSAUSIRL'];
const blobServiceClient = new BlobServiceClient(blobSausUrl);

const containerName = 'calorietracking';
const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports = {
    async uploadFile(req, res) {
        try {
            const file = req.file.buffer;
            const blobName = 'imagen.jpg';
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(file);
            res.status(200).json({ message: 'File uploaded successfully', data: response.data });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
