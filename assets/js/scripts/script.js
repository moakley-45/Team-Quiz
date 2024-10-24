/* Variables */

const modal = document.getElementById('user-name_modal');
const form = document.getElementById('nameForm');
const modalClose = document.getElementById('nameModalClose');

let score = 0;


/* Functions */


/* Modal Functions */


/** Shows the modal when needed */
function showModal() {
    modal.classList.remove('hidden');
    localStorage.setItem('modalShown', 'true');
}


/** Hides the modal when needed */
function hideModal() {
    modal.classList.add('hidden');
}

function rememberName() {
    const userInput = localStorage.getItem('userName'); // Correct key name
    if (userInput) {
        document.getElementById('player_name').innerHTML = userInput;
    }
}
/** Loads the modal when page finishes loading */
window.onload = function() {
    // Check if 'modalShown' is not in localStorage (i.e., first visit)
    if (!localStorage.getItem('modalShown')) {
        showModal();
    }
    else {
        rememberName();
    }
};

modalClose.addEventListener('click', hideModal);

/** Adds an event listener - when the user submits
 * a name, the modal is hidden and the Player Elements
 * Section is updated with their data
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('userNameInput').value;
    document.getElementById("player_name").innerHTML = userInput;
    localStorage.setItem('userName', userInput);
    hideModal();
})

/* /Modal Functions */

/* Answer functions */

// Function to update the score on the page
function updateScore() {
    const scoreDisplay = document.getElementById('player_score');
    scoreDisplay.textContent = `${score}`;
}

// Function to handle when an answer card is clicked
function handleCardClick(event) {
    const clickedCard = event.currentTarget;  
    const cardTag = clickedCard.getAttribute('data-tag');

    // Check if the clicked card is correct
    if (cardTag === 'answer_a') {
        clickedCard.classList.add('correct_answer');  // Add the correct answer class
        score++;  // Increment the score
        updateScore();  // Update the score display
    } else {
        clickedCard.classList.add('incorrect_answer');  // Add the incorrect answer class
    }

    // Disable further clicks on the clicked card
    clickedCard.removeEventListener('click', handleCardClick);

    // Disable other cards for the same question after an answer is selected
    disableQuestionCards(clickedCard);
}

// Function to disable all cards in the same question once one is clicked
function disableQuestionCards(clickedCard) {
    const parentContainer = clickedCard.closest('.image-questions');  // Find the parent container (question)
    const questionCards = parentContainer.querySelectorAll('.answer_card');  // Find all answer cards in this question
    questionCards.forEach(card => {
        card.removeEventListener('click', handleCardClick);  // Disable further clicks on all cards for this question
    });
}

// Attach event listeners to all answer cards
document.querySelectorAll('.answer_card').forEach(card => {
    card.addEventListener('click', handleCardClick);
});
