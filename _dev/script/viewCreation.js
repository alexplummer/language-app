
// Imports
import {cl, clv} from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';

// Exports
export {viewCreate};

// Create app view
const viewCreate = function viewCreate(termsToCreate) {

    let viewHTML = [];

    for (let value of termsToCreate) {
        
        // Get terms and definitions from data
        let termValue       = appData.terms[value].term;
        let definitionValue = appData.terms[value].definition;
        let viewsCount;

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

        viewHTML.push(newHolder);
        // Cycle for of loop
    }
    // Add to view
    viewHTML = viewHTML.join('');
    ops.container.innerHTML = viewHTML;
}
