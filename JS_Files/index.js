// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the highscore and player name from local storage, default to 0 if not found
    const highscore = localStorage.getItem('bestScore') || 0;
    const playerName = localStorage.getItem('bestPlayerName') || 0;

    // Update the content of the element with id 'highscore' with the player name and highscore
    document.getElementById('highscore').innerHTML = `${playerName}, High-score: ${highscore}`;
});

// Function to start the game
function startGame() {
    // Retrieve the player name from the input element with id 'name'
    const playerName = document.getElementById('name').value;

    // Check if the player name is not empty
    if (playerName !== '') {
        // Store the player name in local storage
        localStorage.setItem('playerName', playerName);

        // Redirect to the start_game.html page
        window.location.href = "start_game.html";
    } else {
        // Display an alert if the player name is empty
        alert('Enter the player Name..');
    }
}
