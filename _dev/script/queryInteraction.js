
// Imports
import { cl, clv, pickRandom } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { updateDataCount } from 'termCreation';

// Exports
export { createNewQuery };

// Sets up query
const createNewQuery = function createNewQuery() {

    // If no stored data for reveal countdowns
    if (ops.storedData.queryTerms === undefined) {
        ops.storedData.queryTerms = {};
    }

    // Pick a term for query
    let randomTerm;
    let i = 0;

    // Set correctTerms storage if not exists
    if (ops.storedData.correctTerms === undefined) {
        ops.storedData.correctTerms = {};
    }

    // Set incorrectTerms storage if not exists
    if (ops.storedData.incorrectTerms === undefined) {
        ops.storedData.incorrectTerms = {};
    }

    // Prevent choosing query already answered correct
    while (i < Object.keys(ops.storedData.revealedTermCount).length) {
        
        // Pick a random term
        randomTerm = pickRandom(ops.storedData.revealedTermCount);
        
        // If query not from correct terms
        if (!ops.storedData.correctTerms.hasOwnProperty(randomTerm)) {
            buildQuery();
            break;
        }
        // Else look for another
        i++;
    }
    
    // Build the query
    function buildQuery() {
        let queryWrapper = document.querySelector('.query-wrapper');
        let queryHolder = document.querySelector('.query-holder');
        let querySubmit = document.querySelector('.query-submit');
        let resultHolder = document.querySelector('.result-holder');
        let scoreHolder = document.querySelector('.score-holder');
        let heartHolder = document.querySelector('.hearts');
        let score = parseInt(scoreHolder.innerHTML);
        let definition = appData.terms[randomTerm].definition;
        let heartCount = ops.storedData.hearts;
        let count = 0;

        // Show the query wrapper
        queryWrapper.classList.remove('hidden');

        // Set value of query
        queryHolder.innerHTML = randomTerm;

        // Query outcomes
        querySubmit.addEventListener("click", () => {
            let queryInput = document.querySelector('.query-input').value;

            if (queryInput === definition || queryInput.toUpperCase() === definition.toUpperCase()) {
                winCase();
            }
            else if (queryInput === "") {
                resultHolder.innerHTML = "Enter a definition.";
            }
            else {
                loseCase();
            }
        });

        // If definition is right
        function winCase() {
            // Hide the query input
            queryWrapper.classList.add('hidden');
            // Display win message
            resultHolder.innerHTML = "Well done, the definition for <strong>\"" + randomTerm + "\"</strong> is <strong>\"" + definition + "\"</strong>";
            // Add to score
            score += ops.points.correct;
            // Update view
            scoreHolder.innerHTML = score;
            // Add to stored data
            ops.storedData.score = score;
            ops.storedData.correctTerms[randomTerm] = definition;
            // Check if whole term list answered correctly
            if (Object.keys(ops.storedData.correctTerms).length === Object.keys(appData.terms).length) {
                ops.storedData.gameWon = true;
                gameWon();
            }
            // Save to storage
            localforage.setItem('ops.storedData', ops.storedData);
        }
        // If definition is wrong
        function loseCase() {
            let queryInput = document.querySelector('.query-input');
            // Update view
            resultHolder.innerHTML = "Try again.";
            // Add placeholder
            queryInput.placeholder = queryInput.value;
            // Remove guess
            queryInput.value = "";
            // Lose a heart
            heartHolder.removeChild(heartHolder.getElementsByTagName('p')[0]);
            count += 1;
            // If all hearts lost
            if (count === heartCount) {
                // Hide query 
                queryWrapper.classList.add('hidden');
                heartHolder.classList.add('hidden');
                // Update view
                resultHolder.innerHTML = "Sorry you lose.";
                // Add to storedDatta 
                ops.storedData.incorrectTerms[randomTerm] = definition;
                // Save to storage
                localforage.setItem('ops.storedData', ops.storedData);
            }
        }
        // If game won
        function gameWon() {
            cl('game won');
        }
    }
}