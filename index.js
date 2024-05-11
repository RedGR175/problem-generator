require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
  // Use the promise-based version of 'fs'
const {generateProblem} = require('./business.js')

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'))

// Initialize the OpenAI client with your API key


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to handle questions
app.post('/ask', async (req, res) => {
    console.log('request sent to index...')

    try {
        console.log(req.body.userInput)
        const response = await generateProblem(req.body.promptData)
        res.json({ answer: response })

    } catch (error) {
        console.log(`Error occured ${error}`)
        res.status(500).send('Internal Server Error')

    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

