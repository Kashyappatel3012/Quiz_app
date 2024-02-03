// Define variables to store questions, highscore, and attempt counts
let questions;
let highscore = 0;
let correctAttempts = 0;
let incorrectAttempts = 0;
let skipquestions = 0;

// Fetch questions from JSON file
fetch('JS_Files/questions.json')
  .then(response => {
    // Check if the network response is OK; otherwise, throw an error
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    // Store the fetched questions in the variable and display the first question
    questions = data;
    displayQuestion(0);
  })
  .catch(error => console.error('Error fetching questions:', error));

// Function to display a question
function displayQuestion(index) {
  // Select the HTML element for displaying questions
  const questionContainer = document.querySelector('.quiz-container');
  // Set the HTML content to display the current question
  questionContainer.innerHTML = `<h2>${questions[index].question}</h2>`;

  // Create a container for options
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';

  // Iterate through options and create HTML elements for each
  questions[index].options.forEach((option, optionIndex) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    // Add a click event listener to check the answer when an option is clicked
    optionElement.addEventListener('click', function() {
      checkAnswer(option, optionIndex, index);
    });

    optionsContainer.appendChild(optionElement);
  });

  // Add a skip button
  const skipButton = document.createElement('button');
  skipButton.textContent = 'Skip';
  skipButton.addEventListener('click', function() {
    // Increase skipquestions count and move to the next question or display result
    skipquestions++;
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      displayQuestion(nextIndex);
    } else {
      displayResult();
    }
  });
  questionContainer.appendChild(optionsContainer);
  questionContainer.appendChild(skipButton);
}

// Function to check the selected answer
function checkAnswer(selectedOption, selectedIndex, currentIndex) {
  // Extract the option text (without the prefix) for comparison
  const selectedText = selectedOption.substring(3);
  // Retrieve the correct answer from the JSON data
  const correctAnswer = questions[currentIndex].answer.substring(3);

  // Check if the selected option is correct or incorrect
  if (selectedText === correctAnswer) {
    // Display a message for a correct answer and update scores
    alert('Correct answer!');
    highscore += 10;
    correctAttempts++;
  } else if(selectedText!== correctAnswer) {
    // Display a message for a wrong answer and update scores
    alert('Wrong answer. Try again!');
    highscore -= 3;
    incorrectAttempts++;
  } else {
    // If the skip button is clicked, update the skipquestions count
    skipquestions++;
  }

  // Move to the next question or display result
  const nextIndex = currentIndex + 1;
  if (nextIndex < questions.length) {
    displayQuestion(nextIndex);
  } else {
    displayResult();
  }
}

// Function to display the result
function displayResult() {
  // Retrieve player name from local storage or use default value
  const playerName = localStorage.getItem('playerName') || 'Player';
  // Retrieve previous best score and player name from local storage or use default values
  const previousBestScore = localStorage.getItem('bestScore') || 0;
  const previousPlayerName = localStorage.getItem('bestPlayerName') || 'Player';

  // Compare the current highscore with the previous best score
  if (highscore > previousBestScore) {
    // If the current highscore is higher, update the best score and player name in local storage
    localStorage.setItem('bestScore', highscore);
    localStorage.setItem('bestPlayerName', playerName);
    // Display a congratulatory message for achieving a new best score
    alert(`Congratulations, ${playerName}! New Best Score: ${highscore}`);
  }

  // Store correct and incorrect attempts, highscore, and skipquestions in local storage
  localStorage.setItem('correctAttempts', correctAttempts);
  localStorage.setItem('incorrectAttempts', incorrectAttempts);
  localStorage.setItem('highscore', highscore);
  localStorage.setItem('skipquestions', skipquestions);

  // Redirect to the result page with highscore and player name as URL parameters
  window.location.href = `result.html?highscore=${highscore}&playerName=${encodeURIComponent(playerName)}`;
}
