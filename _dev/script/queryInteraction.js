
// Imports
import { cl, clv, pickRandom, checkQuery } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { addHearts } from 'viewCreation';

// Exports
export { createNewQuery };

// Sets up query
const createNewQuery = function createNewQuery(bonus) {

    // Pick a term for query
    let randomTerm;
    let i = 0;

    // If no stored data for reveal countdowns
    ops.storedData.queryTerms = ops.storedData.queryTerms || {};

    // Set correctTerms storage if not exists
    ops.storedData.correctTerms = ops.storedData.correctTerms || {};

    // Set incorrectTerms storage if not exists
    ops.storedData.incorrectTerms = ops.storedData.incorrectTerms || {};

    let cycledTerms = [];
    // Choose term from viewed terms
    while (i < Object.keys(ops.storedData.viewedTerms).length) {

        // If no daily term
        if (ops.storedData.dailyQuery === undefined) {
            // Pick a random term
            randomTerm = pickRandom(ops.storedData.viewedTerms);
        }
        else {
            randomTerm = ops.storedData.dailyQuery;
        }
        // Make sure not answered correctly before
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
        if (!cycledTerms.indexOf(randomTerm)) {
            i++
        }
        // Else look for another
        if (i === Object.keys(ops.storedData.viewedTerms).length) {
            document.querySelector('.result-holder').innerHTML = "Reveal more terms to get a query";
            document.querySelector('.result-holder').classList.remove('hidden');
        }
    }

    // Build the query
    function queryHandler() {
        let queryWrapper = document.querySelector('.m-query-wrapper');
        let queryHolder = document.querySelector('.query-holder');
        let querySubmit = document.querySelector('.query-submit');
        let resultHolder = document.querySelector('.result-holder');
        let scoreHolder = document.querySelector('.score-holder');
        let heartHolder = document.querySelector('.hearts');
        let score = parseInt(scoreHolder.innerHTML);
        let definition = appData.terms[randomTerm].definition;
        let count = 0;

        // Add to storage
        ops.storedData.dailyQuery = randomTerm;
        ops.storedData.queryComplete = false;

        // Hide daily term definition if same
        if (document.querySelector('.' + randomTerm + '') !== null) {
            document.querySelector('.' + randomTerm + '').querySelector('.definition-wrapper').classList.add('hidden');
        }

        // Add hearts
        delete ops.storedData.hearts;
        addHearts();

        // Show the query wrapper
        queryWrapper.classList.remove('hidden');

        // Change title if bonus
        if (bonus === true) {
            queryWrapper.getElementsByTagName('h2')[0].innerHTML = "Bonus Test"
        }

        // Set value of query
        queryHolder.innerHTML = randomTerm;

        window.addEventListener("keypress", function (e) {
            if (e.keyCode === 13) {
                querySubmit.click();
            }
        });

        // Query outcomes
        querySubmit.addEventListener("click", () => {
            let queryInput = document.querySelector('.query-input').value;

            if (checkQuery(queryInput, definition) === true) {
                winCase();
            }
            else if (checkQuery(queryInput, definition) === "mispelled") {
                winCase("mispelled", queryInput);
            }
            else if (queryInput === "") {
                resultHolder.innerHTML = "Enter a definition.";
                resultHolder.classList.remove('hidden');
            }
            else {
                loseCase();
            }
        });

        // If definition is right
        function winCase(spelling, input) {
            // Hide the query input
            document.querySelector('.query-form').classList.add('hidden');
            heartHolder.classList.add('hidden');
            // If mispelled
            if (spelling === "mispelled") {
                // Display win message
                resultHolder.innerHTML = "Well done but check your spelling (" + input + "), the definition is <strong>\"" + definition + "\"</strong>";
                resultHolder.classList.remove('hidden');
            }
            else {
                // Display win message
                resultHolder.innerHTML = "Well done, the definition is <strong>\"" + definition + "\"</strong>";
                resultHolder.classList.remove('hidden');
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
            resultHolder.classList.remove('hidden');
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
                document.querySelector('.query-form').classList.add('hidden');
                heartHolder.classList.add('hidden');
                // Update DOM
                queryInput.value = "";
                queryInput.placeholder = "Enter the definition";
                // Update view
                resultHolder.innerHTML = "Sorry, you are out of attempts!";
                resultHolder.classList.remove('hidden');
                // Add to storedDatta 
                ops.storedData.incorrectTerms[randomTerm] = definition;
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