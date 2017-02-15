
// Imports
import { cl, clv } from 'helperFunctions';
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

        while (i < ops.displayedTerms) {
            let viewedLength = Object.keys(ops.storedData.viewedTerms).length;

            // If all terms viewed
            if (viewedLength === dataLength) {

                let viewedSorted = [];

                // Convert viewed terms to array
                for (let term in ops.storedData.viewedTerms) {
                    viewedSorted.push([term, ops.storedData.viewedTerms[term]])
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
            else {
                let pickedTerm = pickRandom();

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
            if (j > 1000) {
                i = ops.displayedTerms;
            }
            j++;
        }
    }
    // Get random terms from data
    function pickRandom() {
        let keys = Object.keys(appData.terms),
            pickedTerm = keys[keys.length * Math.random() << 0];

        return pickedTerm;
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