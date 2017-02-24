
// Imports
import { cl, clv } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { createRevealTimer } from 'termInteraction';

// Exports
export { viewCreate, addHearts, setScore };

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
        if (ops.storedData.revealedTermCount === undefined) {
            viewsCount = 0;
        }
        else {
            viewsCount = ops.storedData.revealedTermCount[value] || 0;
        }

        // Create terms HTML
        let newHolder =
            `<div class="m-term-wrapper">
                <p class="term-holder">${termValue}</p>
                <div class="right">
                    <p class="term-views"><span>Goal :</span> <span class="count">${viewsCount}</span> / ${ops.revealDailyBonusTarget}</p>
                    <button class="reveal">Reveal</button>
                </div>
                <div class="definition-wrapper hidden">
                    <p class="definition-holder">${definitionValue}</p>
                    <div class="support-wrapper">${supportValue}</div>
                </div>
            </div>`;

        viewHTML += newHolder;
        // Cycle for of loop
    }
    // Add to view
    ops.container.innerHTML = viewHTML;

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