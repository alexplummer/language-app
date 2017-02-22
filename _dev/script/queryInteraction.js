
// Imports
import { cl, clv, pickRandom, checkQuery } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { addHearts } from 'viewCreation';
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

        if (ops.storedData.dailyQuery === undefined) {
            // Pick a random term
            randomTerm = pickRandom(ops.storedData.revealedTermCount);
            ops.storedData.dailyQuery = randomTerm;
        }
        else {
            randomTerm = ops.storedData.dailyQuery;
        }
        // If query not from correct terms
        if (!ops.storedData.correctTerms.hasOwnProperty(randomTerm)) {

            // If query not from daily reminder term
            if (ops.storedData.dailyReminder !== undefined) {
                if (!ops.storedData.dailyReminder.hasOwnProperty(randomTerm)) {
                    queryHandler();
                    break;
                }
            }
            // If query not from daily terms
            else if (!ops.storedData.dailyTerms.hasOwnProperty(randomTerm)) {
                queryHandler();
                break;
            }
        }
        // Else look for another
        i++;
        if (i === Object.keys(ops.storedData.revealedTermCount).length) {
            document.querySelector('.result-holder').innerHTML = "Reveal more terms to get a query";
        }
    }
    
    // Build the query
    function queryHandler() {
        let queryWrapper = document.querySelector('.query-wrapper');
        let queryHolder = document.querySelector('.query-holder');
        let querySubmit = document.querySelector('.query-submit');
        let resultHolder = document.querySelector('.result-holder');
        let scoreHolder = document.querySelector('.score-holder');
        let heartHolder = document.querySelector('.hearts');
        let score = parseInt(scoreHolder.innerHTML);
        let definition = appData.terms[randomTerm].definition;
        let count = 0;

        // Add hearts
        delete ops.storedData.hearts;
        addHearts();

        // Show the query wrapper
        queryWrapper.classList.remove('hidden');

        // Set value of query
        queryHolder.innerHTML = randomTerm;

        // Query outcomes
        querySubmit.addEventListener("click", () => {
            let queryInput = document.querySelector('.query-input').value;

            if (checkQuery(queryInput, definition) === true) {
                winCase();
            }
            else if (checkQuery(queryInput, definition) === "mispelled") {
                winCase("mispelled");
            }
            else if (queryInput === "") {
                resultHolder.innerHTML = "Enter a definition.";
            }
            else {
                loseCase();
            }
        });

        // If definition is right
        function winCase(spelling) {
            // Hide the query input
            queryWrapper.classList.add('hidden');
            heartHolder.classList.add('hidden');
            // If mispelled
            if (spelling === "mispelled") {
                // Display win message
                resultHolder.innerHTML = "Well done but check your spelling, the definition for <strong>\"" + randomTerm + "\"</strong> is <strong>\"" + definition + "\"</strong>";
            }
            else {
                // Display win message
                resultHolder.innerHTML = "Well done, the definition for <strong>\"" + randomTerm + "\"</strong> is <strong>\"" + definition + "\"</strong>";
            }
            // Add to score
            score += ops.points.correct;
            // Update view
            scoreHolder.innerHTML = score;
            // Add to stored data
            ops.storedData.score = score;
            ops.storedData.correctTerms[randomTerm] = definition;
            ops.storedData.queryComplete = true;
            delete ops.storedData.dailyQuery;
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
            ops.storedData.hearts -= 1;
            // If all hearts lost
            if (ops.storedData.hearts === 0) {
                // Hide query 
                queryWrapper.classList.add('hidden');
                heartHolder.classList.add('hidden');
                // Update DOM
                queryInput.value = "";
                queryInput.placeholder = "Enter the definition";
                // Update view
                resultHolder.innerHTML = "Sorry you lose.";
                // Add to storedDatta 
                ops.storedData.incorrectTerms[randomTerm] = definition;
                cl(ops.storedData.incorrectTerms);
                ops.storedData.queryComplete = true;
                delete ops.storedData.hearts;
            }
            // Save to storage
            localforage.setItem('ops.storedData', ops.storedData);
        }
        // If game won
        function gameWon() {
            cl('game won');
        }
    }
}