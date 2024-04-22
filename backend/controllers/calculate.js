const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env['VISION_ENDPOINT'];
const key = process.env['VISION_KEY'];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = [
    'Caption',
    'Read'
];

module.exports = {
    async calculate(req, res) {

        try {
            // if (!req.body.url) {
            //     return res.status(400).json({ error: 'url is required' });
            // }

            const url = 'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png';

            const result = await client.path('/imageanalysis:analyze').post({
                body: {
                    url: url
                },
                queryParameters: {
                    features: features
                },
                contentType: 'application/json'
            });

            const texto = result.body.captionResult.text;

            res.status(200).json({ message: 'Image analyzed successfully', data: texto });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}