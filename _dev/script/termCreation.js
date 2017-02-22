
// Imports
import { cl, clv, pickRandom } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';

// Exports
export { getListOfTerms, updateDataCount };

// Creates a list of terms
const getListOfTerms = function getListOfTerms() {

    let i = 0;
    let j = 0;
    let listOfTerms = [];
    let scannedTerms = [];
    const dataLength = Object.keys(appData.terms).length;

    // Prevent overflow
    if (ops.displayedTerms > dataLength) {
        ops.displayedTerms = dataLength;
    }

    // First time app opened
    if (ops.storedData.firstTime === undefined) {

        while (i < ops.displayedTerms) {
            let pickedTerm = pickRandom(appData.terms);

            // Ensure term hasn't been already scanned
            if (!listOfTerms.includes(pickedTerm)) {
                listOfTerms.push(pickedTerm);
                i++;
            }
        }
    }
    // App opened before
    else {

        // Add reminder for previous incorrect term
        if (Object.keys(ops.storedData.incorrectTerms).length > 0) {
            
            let reminderTerm;

            // Add reminded terms list
            if (ops.storedData.remindedTerms === undefined) {
                ops.storedData.remindedTerms = {};
            }
            // Keep reminded term the same
            if (ops.storedData.dailyReminder === undefined) {
                ops.storedData.dailyReminder = {};
                reminderTerm = pickRandom(ops.storedData.incorrectTerms);
                reminderTerm = Object.getOwnPropertyNames(reminderTerm);
                ops.storedData.dailyReminder[reminderTerm] = appData.terms[reminderTerm].definition; 
            }
            else { 
                reminderTerm = ops.storedData.dailyReminder;
                reminderTerm = Object.getOwnPropertyNames(reminderTerm);
            }
            // Add to terms
            listOfTerms.push(reminderTerm);
            // Remove from incorrect terms
            delete ops.storedData.incorrectTerms[reminderTerm];
            // Add to list of reminded terms
            ops.storedData.remindedTerms[reminderTerm] = appData.terms[reminderTerm].definition;
            i++;
        }
        // Choose terms to  display
        while (i < ops.displayedTerms) {
            let viewedLength = Object.keys(ops.storedData.viewedTerms).length;

            // If all terms viewed
            if (viewedLength === dataLength) {

                let viewedSorted = [];

                // Convert viewed terms to array
                for (let term in ops.storedData.viewedTerms) {
                    viewedSorted.push([term, ops.storedData.viewedTerms[term]]);
                }
                // If reminder term picked remove from selection
                if (ops.storedData.dailyReminder !== undefined) {
                    for (let m=viewedSorted.length-1; m>=0; m--) {
                        if (ops.storedData.dailyReminder.hasOwnProperty(viewedSorted[m][0])) { 
                            viewedSorted.splice(m, 1);
                        }
                    }
                }
                // Sort array by view count
                viewedSorted.sort((a, b) => {
                    return a[1] - b[1]
                })
                // Finish off iterator with lowest viewed terms
                while (i < ops.displayedTerms) {
                    listOfTerms.push(viewedSorted[i][0]);
                    i++;
                }
                // Overflow protection
                i++;
            }
            // Still unviewed terms in data
            else {
                let pickedTerm = pickRandom(appData.terms);

                // Ensure term hasn't been already scanned
                if (!scannedTerms.includes(pickedTerm)) {
                    scannedTerms.push(pickedTerm);

                    // Ensure term not viewed before
                    if (!ops.storedData.viewedTerms.hasOwnProperty(pickedTerm)) {
                        listOfTerms.push(pickedTerm);
                        ops.storedData.viewedTerms[pickedTerm] = 0;
                        localforage.setItem('ops.storedData', ops.storedData);
                        i++;
                    }
                }
            }
            // Overflow protection
            if (j > 10000) {
                i = ops.displayedTerms;
            }
            j++;
        }
    }
    // Return final list of terms
    return listOfTerms;
}

// Handles count of a type of data
const updateDataCount = function (dataType, termsToAdjust, baseValue) {

    let dataTypeHolder = ops.storedData[dataType] || {};

    // If no viewed data, create new 
    if (!ops.storedData.hasOwnProperty(dataType)) {

        for (let value of termsToAdjust) {
            dataTypeHolder[value] = baseValue;
        }
    }
    // If viewed data exists
    else {
        // If viewed term exists, update count
        for (let value of termsToAdjust) {

            if (ops.storedData[dataType].hasOwnProperty(value)) {
                let count = ops.storedData[dataType][value];
                count += 1;
                dataTypeHolder[value] = count;
            }
            else {
                dataTypeHolder[termsToAdjust] = baseValue;
            }
        }
    }
    // Pass back final object
    return dataTypeHolder;
}