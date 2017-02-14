
// Imports
import {ready, cl, clv, arrayCheck} from 'helperFunctions';
import appData from 'verbs';
import globals from 'app';

// Exports
export {getListOfTerms, viewCreate, createViewedTerms};

// Setup stored data
let storedData = storedData || {};

// Creates a list of terms
const getListOfTerms = function getListOfTerms() {
   
    let i = 0;
    let j = 0;
    let listOfTerms = [];
    let scannedTerms = [];
    const dataLength = Object.keys(appData.terms).length;

    // Prevent overflow
    if (globals.displayedTerms > dataLength) {
        globals.displayedTerms = dataLength;
    }
    
    // First time app opened
    if (storedData.firstTime === undefined) {
       
        while (i<globals.displayedTerms) {
        let pickedTerm = pickRandom();

            // Ensure term hasn't been already scanned
            if (!listOfTerms.includes(pickedTerm)) {
                listOfTerms.push(pickedTerm);
                i++;
            }
        }
    }
    // App opened before
    else {
        const viewedLength = Object.keys(storedData.viewedTerms).length;
        
        while (i<globals.displayedTerms) {
            
            // If all terms viewed
            if (viewedLength === dataLength) {              
                let viewedSorted = [];
                
                // Convert viewed terms to array
                for (let term in storedData.viewedTerms) {
                    viewedSorted.push([term, storedData.viewedTerms[term]])
                }
                // Sort array by view count
                viewedSorted.sort( (a, b) => {
                    return a[1] - b[1]
                })
                // Finish off iterator with lowest viewed terms
                while (i<globals.displayedTerms) {
                    listOfTerms.push(viewedSorted[i][0]);
                    i++;
                }
                // Overflow protection
                i++;
            }
            else {
                let pickedTerm = pickRandom();
                // Ensure term hasn't been already scanned
                if (!scannedTerms.includes(pickedTerm)) {
                    scannedTerms.push(pickedTerm);
                    // Ensure term not viewed before
                    if (!storedData.viewedTerms.hasOwnProperty(pickedTerm)) {
                        listOfTerms.push(pickedTerm);
                        storedData.viewedTerms[pickedTerm] = 0;
                        localforage.setItem('storedData', storedData);
                        i++;
                    }
                }   
            }
            // Overflow protection
            if (j > 1000) {
                i = globals.displayedTerms;
            }
            j++;
        }
    }
    // Get random terms from data
    function pickRandom() {
        let keys = Object.keys(appData.terms),
            pickedTerm = keys[ keys.length * Math.random() << 0];

        return pickedTerm;
    }
    return listOfTerms;
}

// Create app view
const viewCreate = function viewCreate(termsToCreate) {

    for (let value of termsToCreate) {
        
        // Get terms and definitions from data
        let termValue       = appData.terms[value].term,
            definitionValue = appData.terms[value].definition;
        
        // Create holders
        let newTermHolder = document.createElement('p'),
            newdefinitionHolder = document.createElement('p');

        // Add classes to holders
        newTermHolder.classList.add('holder-term');
        newdefinitionHolder.classList.add('holder-definition');

        // Add content to holders
        newTermHolder.textContent = termValue;
        newdefinitionHolder.textContent = definitionValue;

        // Add to view
        globals.container.appendChild(newTermHolder);
        globals.container.appendChild(newdefinitionHolder);
        
        // Cycle for of loop
        value++;
    }
}

// Handles count of viewed terms
const createViewedTerms = function(termsToAdd) {

    let viewedTermsData = storedData.viewedTerms || {};

    // If no viewed data, create new 
    if (!storedData.hasOwnProperty('viewedTerms')) {
        
        for (let value of termsToAdd) {   
            viewedTermsData[value] = 0;
        }
    }
    // If viewed data exists
    else {
        // If viewed term exists, update count
        for (let value of termsToAdd) {   
            
            if (storedData.viewedTerms.hasOwnProperty(value)) {
                let count = storedData.viewedTerms[value];
                count += 1;
                viewedTermsData[value] = count;
            }
            else {
                viewedTermsData[termsToAdd] = 0;
            }       
        }
    }
    // Pass back final object
    return viewedTermsData;
}