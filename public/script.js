let difficulty = 'default'; // Initialize to some default value
let isStoryProb = 'default'; // Initialize to some default value

document.addEventListener("DOMContentLoaded", function() {
    const difficultyButtons = document.querySelectorAll('.selector-container.difficulty .selector-button');
    const storyProblemButtons = document.querySelectorAll('.selector-container.story-problem .selector-button');

    // Add event listeners to difficulty buttons
    difficultyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'selected' class from all buttons
            difficultyButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            // Add 'selected' class to the clicked button
            button.classList.add('selected');

            difficulty = button.id; // Update the value of the variable
        });
    });

    // Add event listeners to story problem buttons
    storyProblemButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'selected' class from all buttons
            storyProblemButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            // Add 'selected' class to the clicked button
            button.classList.add('selected');

            isStoryProb = button.id; // Update the value of the variable
        });
    });
});

async function submit() {
    console.log('submit function called'); // Check if the function is being called
    
    let promptData = getValues()

    const data = await ask(promptData)
    
    console.log('response:', data); // Check the response from the server
    document.getElementById('output').textContent = data.answer; // Display the answer property
}


function getValues() {
    const probemPrompt = document.getElementById('user-input').value;

    let userInput = probemPrompt;

    // Append difficulty and isStoryProb values to probemPrompt
    userInput += ` || Difficulty: ${difficulty} || Story Problem: ${isStoryProb}`;

    console.log('probemPrompt:', probemPrompt); // Check the value of probemPrompt
    return userInput;
    

}   

async function ask(promptData) {
    console.log('starting fetch request'); // Check if the fetch request is initiated


    const response = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ promptData })
    });

    if (!response.ok) {
        console.error('Request failed with status:', response.status);
        return;
    }

   return await response.json(); // Parse JSON response

}