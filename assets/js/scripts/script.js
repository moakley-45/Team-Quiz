/* Variables */

const modal = document.getElementById('user-name_modal');
const form = document.getElementById('nameForm');

const correctAnswer = document.getElementById('answer_a');
const incorrectAnswer = document.getElementById('answer_b');


/* Functions */


/* Modal Functions */


/** Shows the modal when needed */
function showModal() {
    modal.classList.remove('hidden');
}


/** Hides the modal when needed */
function hideModal() {
    modal.classList.add('hidden');
}

/** Loads the modal when page finishes loading */
window.onload = function() {
    showModal();
};

/** Adds an event listener - when the user submits
 * a name, the modal is hidden and the Player Elements
 * Section is updated with their data
 */
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('userNameInput').value;
    document.getElementById("player_name").innerHTML = userInput;
    hideModal();
})

/* /Modal Functions */
