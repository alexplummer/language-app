
// Imports
import { cl, clv } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { createRevealTimer } from 'termInteraction';

// Exports
export { viewCreate };

// Create app view
const viewCreate = function viewCreate(termsToCreate) {

    let viewHTML = "";

    // Create HTML for terms
    for (let value of termsToCreate) {

        // Get terms and definitions from data
        let termValue = appData.terms[value].term;
        let definitionValue = appData.terms[value].definition;
        let revealCounter;
        let viewsCount;

        // Check storage for revealed count
        if (ops.storedData.revealedTermCount === undefined) {
            viewsCount = 0;
        }
        else {
            viewsCount = ops.storedData.revealedTermCount[value] || 0;
        }

        // Create view
        let newHolder =
            `<div class="term-wrapper">
                <p class="term-holder">${termValue}</p>
                <p class="definition-holder">${definitionValue}</p>
                <p class="term-views">${viewsCount}</p>
                <button class="reveal">Reveal definition</button>
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
                    let revealTerm = revealBtn[i].parentNode.querySelector('.term-holder').innerHTML;

                    if (revealTerm === value) {
                        createRevealTimer(revealBtn[i]);
                    }
                }
            }
        }
    }
}
