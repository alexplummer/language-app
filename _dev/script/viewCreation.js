
// Imports
import { cl, clv } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { createRevealTimer } from 'termInteraction';

// Exports
export { viewCreate, addHearts, setScore, progressBar };

// Create app view
const viewCreate = function viewCreate(termsToCreate) {

    let viewHTML = "";

    // Create HTML for terms
    for (let value of termsToCreate) {

        // Get terms and definitions from data
        let termValue = appData.terms[value].term;
        let definitionValue = appData.terms[value].definition;
        let supportValue = appData.terms[value].support;
        let revealCounter;
        let viewsCount;

        // Check storage for revealed count
        if (ops.storedData.revealDailyBonus === undefined) {
            viewsCount = 0;
        }
        else {
            viewsCount = ops.storedData.revealDailyBonus[value] || 0;
        }

        // Create terms HTML
        let newHolder =
            `<div class="m-term-wrapper ${termValue}">
                <p class="term-holder">${termValue}</p>
                <div class="theme-holder"><p class="symbol-holder"></p></div>
                <div class="right">
                    <p class="term-views"><span>Goal:</span> <span class="count">${viewsCount}</span> / ${ops.revealDailyBonusTarget}</p>
                    <button class="reveal">Reveal</button>
                </div>
                <div class="definition-wrapper hidden">
                    <p class="definition-holder">${definitionValue}</p>
                    <div class="helpers">
                        <a href="#" class="lookup"></a>
                        <a href="#" class="colour"></a>
                        <a href="#" class="symbol"></a>
                    </div>
                    <div class="support-wrapper">${supportValue}</div>
                </div>
            </div>`;

        viewHTML += newHolder;
    }
    // Add to view
    ops.container.innerHTML = viewHTML;

    // Add theme to previously created terms
    for (let value of termsToCreate) {
        let termValue = appData.terms[value].term;

        // Check storage for assigned colour
        ops.storedData.viewedTerms = ops.storedData.viewedTerms || {};

        if (ops.storedData.viewedTerms[termValue] !== undefined && ops.storedData.viewedTerms[termValue].colour !== undefined) {
            let termWrapper = document.querySelector('.' + termValue + '');
            let pickedColour = ops.storedData.viewedTerms[termValue].colour;
            // Add colour to object
            termWrapper.querySelector('.theme-holder').style.background = pickedColour;
            termWrapper.querySelector('.theme-holder').classList.add('bg-active');
            termWrapper.querySelector('.term-holder').style.color = "#fff";
            termWrapper.querySelector('.right').style.border = "0";
        }
        // Check storage for assigned symbol
        if (ops.storedData.viewedTerms[termValue] !== undefined && ops.storedData.viewedTerms[termValue].symbol !== undefined) {
            let termWrapper = document.querySelector('.' + termValue + '');
            let pickedSymbol = ops.storedData.viewedTerms[termValue].symbol;
            // Add symbol to object
            termWrapper.querySelector('.symbol-holder').classList = ('symbol-holder');
            termWrapper.querySelector('.symbol-holder').classList.add(pickedSymbol);
        }
    }

    // Add countdown timers to term buttons
    for (let value of termsToCreate) {

        // Check if timer data exists
        if (ops.storedData.revealCountdowns !== undefined) {

            // Add countdown timers to buttons
            if (ops.storedData.revealCountdowns[value] !== undefined) {

                let revealBtn = document.querySelectorAll('.reveal');

                // Find button node that matches term in DOM
                for (let i = 0; i < revealBtn.length; i++) {
                    let revealTerm = revealBtn[i].parentNode.parentNode.querySelector('.term-holder').innerHTML;

                    if (revealTerm === value) {
                        createRevealTimer(revealBtn[i]);
                    }
                }
            }
        }
    }
}

// Add hearts to page
const addHearts = function addHearts() {
    let heartHolder = document.querySelector('.hearts');
    let heartsHTML = "";

    // If no hearts data exists
    if (ops.storedData.hearts === undefined) {
        ops.storedData.hearts = ops.points.hearts;
    }
    for (let i = 0; i < ops.storedData.hearts; i++) {
        heartsHTML += '<p></p>';
    }
    // Add to view
    heartHolder.innerHTML = heartsHTML;

    // Add to storage
    localforage.setItem('ops.storedData', ops.storedData);
}

// Sets the score
const setScore = function setScore() {

    let scoreHolder = document.querySelector('.score-holder');

    // Set score if it doesn't exist
    if (ops.storedData.score === undefined) {
        ops.storedData.score = 0;
    }

    let score = ops.storedData.score;

    // Add to view
    scoreHolder.innerHTML = score;
}

// Add progress bar
const progressBar = function progressBar() {
    // Create correct terms default
    ops.storedData.correctTerms = ops.storedData.correctTerms || {};
    let completed = Object.keys(ops.storedData.viewedTerms).length;
    let remaining = Object.keys(appData.terms).length;

    // Add to DOM
    document.querySelector('.m-footer').querySelector('.completed').innerHTML = completed;
    document.querySelector('.m-footer').querySelector('.remaining').innerHTML = ' / ' + remaining;
    document.querySelector('.m-footer').querySelector('.progress-bar').style.width = ((completed / remaining) * 100) + "%";
}