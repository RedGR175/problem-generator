const OpenAI = require('openai').default;
const fs = require('fs').promises;

//for replit: key = process.env.OPENAI_API_KEY
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateProblem(userInput) {

    try {
        console.log('sending request');
        // Read the prompt from the text file
        const prompt = await fs.readFile('prompt.txt', 'utf8');



        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": prompt},
                {"role": "user", "content": userInput}
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 100 
        });
        response = completion.choices[0].message.content

        return response        

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
    }

}

module.exports = {generateProblem};