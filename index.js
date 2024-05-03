require('dotenv').config();
const express = require('express');
const OpenAI = require('openai').default;
const bodyParser = require('body-parser');
const fs = require('fs').promises;  // Use the promise-based version of 'fs'

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'))

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint to handle questions
app.post('/ask', async (req, res) => {
    try {
        console.log('sending request');
        // Read the prompt from the text file
        const prompt = await fs.readFile('prompt.txt', 'utf8');

        const userInput = req.body.question;
        const completion = await openai.chat.completions.create({
            messages: [
                { "role": "system", "content": prompt },
                { "role": "user", "content": userInput }
            ],
            model: "gpt-3.5-turbo",
            //response_format: { type: "json_object" }
        });
        res.json({ answer: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Error processing your request');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
