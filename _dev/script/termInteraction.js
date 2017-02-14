
// Imports
import {cl, clv} from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import {updateDataCount} from 'termCreation';

// Exports
export {createRevealedCount};

// Setup stored data

const createRevealedCount = function createRevealedCount() {
    
    let revealBtn = document.querySelectorAll('.reveal');

    for (let i=0; i<revealBtn.length;i++) {
        
        revealBtn[i].addEventListener("click", () => {
            let term = [revealBtn[i].parentNode.querySelector('.term-holder').innerHTML];
            let countHolder = revealBtn[i].parentNode.querySelector('.term-views');
            let count = parseInt(countHolder.innerHTML);
            
            countHolder.innerHTML = count + 1;
            ops.storedData.revealedTermCount = updateDataCount('revealedTermCount', term); 
            localforage.setItem('ops.storedData', ops.storedData);
        });
    }
    
}

       