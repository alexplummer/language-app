
// Imports
import { cl, clv, pickRandom, checkQuery } from 'helperFunctions';
import appData from 'appData';
import tinyTerms from 'app';
import { addHearts } from 'viewCreation';

// Exports
export { createNewQuery };

// Sets up query
const createNewQuery = function createNewQuery(bonus) {

    // Pick a term for query
    let randomTerm;
    let i = 0;

    // If no stored data for reveal countdowns
    tinyTerms[tinyTerms.pickedList].storedData.queryTerms = tinyTerms[tinyTerms.pickedList].storedData.queryTerms || {};

    // Set correctTerms storage if not exists
    tinyTerms[tinyTerms.pickedList].storedData.correctTerms = tinyTerms[tinyTerms.pickedList].storedData.correctTerms || {};

    // Set incorrectTerms storage if not exists
    tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms = tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms || {};

    let cycledTerms = [];
    // Choose term from viewed terms
    while (i < Object.keys(tinyTerms[tinyTerms.pickedList].storedData.viewedTerms).length) {

        // If no daily term
        if (tinyTerms[tinyTerms.pickedList].storedData.dailyQuery === undefined) {
            // Pick a random term
            randomTerm = pickRandom(tinyTerms[tinyTerms.pickedList].storedData.viewedTerms);
        }
        else {
            randomTerm = tinyTerms[tinyTerms.pickedList].storedData.dailyQuery;
        }
        // Make sure not answered correctly before
        if (!tinyTerms[tinyTerms.pickedList].storedData.correctTerms.hasOwnProperty(randomTerm)) {

            // If query not from daily reminder term
            if (tinyTerms[tinyTerms.pickedList].storedData.dailyReminder !== undefined) {
                if (!tinyTerms[tinyTerms.pickedList].storedData.dailyReminder.hasOwnProperty(randomTerm)) {
                    queryHandler();
                    break;
                }
            }
            // If query not from daily terms
            else if (!tinyTerms[tinyTerms.pickedList].storedData.dailyTerms.hasOwnProperty(randomTerm)) {
                queryHandler();
                break;
            }
        }
        if (!cycledTerms.indexOf(randomTerm)) {
            i++
        }
        // Else look for another
        if (i === Object.keys(tinyTerms[tinyTerms.pickedList].storedData.viewedTerms).length) {
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
        let definition = tinyTerms[tinyTerms.pickedList].terms[randomTerm].definition;
        let count = 0;

        // Save to storage
        tinyTerms[tinyTerms.pickedList].storedData.dailyQuery = randomTerm;
        tinyTerms[tinyTerms.pickedList].storedData.queryComplete = false;

        localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

        // Hide daily term definition if same
        if (document.querySelector('.' + randomTerm + '') !== null) {
            document.querySelector('.' + randomTerm + '').querySelector('.definition-wrapper').classList.add('hidden');
        }

        // Add hearts
        delete tinyTerms[tinyTerms.pickedList].storedData.hearts;
        addHearts();

        // Show the query wrapper
        queryWrapper.classList.remove('hidden');

        // Change title if bonus
        if (bonus) {
            queryWrapper.getElementsByTagName('h2')[0].innerHTML = "Bonus Test";
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
            score += tinyTerms[tinyTerms.pickedList].ops.points.correct;
            // Update view
            scoreHolder.innerHTML = score;
            // Add to stored data
            tinyTerms[tinyTerms.pickedList].storedData.score = score;
            tinyTerms[tinyTerms.pickedList].storedData.correctTerms[randomTerm] = definition;
            tinyTerms[tinyTerms.pickedList].storedData.queryComplete = true;
            delete tinyTerms[tinyTerms.pickedList].storedData.dailyQuery;
            // Check if whole term list answered correctly
            if (Object.keys(tinyTerms[tinyTerms.pickedList].storedData.correctTerms).length === Object.keys(tinyTerms[tinyTerms.pickedList].terms).length) {
                tinyTerms[tinyTerms.pickedList].storedData.gameWon = true;
                gameWon();
            }
            // Save to storage
            localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
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
            tinyTerms[tinyTerms.pickedList].storedData.hearts -= 1;
            // If all hearts lost
            if (tinyTerms[tinyTerms.pickedList].storedData.hearts === 0) {
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
                tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms[randomTerm] = definition;
                tinyTerms[tinyTerms.pickedList].storedData.queryComplete = true;
                delete tinyTerms[tinyTerms.pickedList].storedData.hearts;
            }
            // Save to storage
            localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
        }
        // If game won
        function gameWon() {
            cl('game won');
        }
    }
}