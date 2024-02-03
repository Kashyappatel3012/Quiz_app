document.addEventListener('DOMContentLoaded', function() {
    // Retrieve counts from local storage
    const correctAttempts = localStorage.getItem('correctAttempts') || 0;
    const incorrectAttempts = localStorage.getItem('incorrectAttempts') || 0;
    const highscore = localStorage.getItem('highscore') || 0;
    const skipquestions = localStorage.getItem('skipquestions') || 0;

    // Display the correct, incorrect attempts, highscore, and skipped questions on the result page
    document.getElementById('correct-count').innerHTML = correctAttempts;
    document.getElementById('incorrect-count').innerHTML = incorrectAttempts;
    document.getElementById('highscore').innerHTML = highscore;
    document.getElementById('skip-questions').innerHTML = skipquestions;

    // Clear local storage after retrieving the values
    localStorage.removeItem('correctAttempts');
    localStorage.removeItem('incorrectAttempts');
    localStorage.removeItem('highscore');
    localStorage.removeItem('skipquestions');
});
