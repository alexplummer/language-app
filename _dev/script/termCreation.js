
// Imports
import { cl, clv, pickRandom } from 'helperFunctions';
import tinyTerms from 'app';

// Exports
export { getListOfTerms };

// Creates a list of terms
const getListOfTerms = function getListOfTerms() {

    let i = 0;
    let j = 0;
    let listOfTerms = [];
    let scannedTerms = [];
    const dataLength = Object.keys(tinyTerms[tinyTerms.pickedList].terms).length;

    // Prevent overflow
    if (tinyTerms[tinyTerms.pickedList].ops.displayedTerms > dataLength) {
        tinyTerms[tinyTerms.pickedList].ops.displayedTerms = dataLength;
    }

    // First time app opened
    if (tinyTerms[tinyTerms.pickedList].storedData.firstTime === undefined) {

        while (i < tinyTerms[tinyTerms.pickedList].ops.displayedTerms) {
            let pickedTerm = pickRandom(tinyTerms[tinyTerms.pickedList].terms);

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
        tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms = tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms || {};

        if (Object.keys(tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms).length > 0) {
            
            let reminderTerm;

            // Add reminded terms list
            tinyTerms[tinyTerms.pickedList].storedData.remindedTerms = tinyTerms[tinyTerms.pickedList].storedData.remindedTerms || {};

            // Keep reminded term the same
            if (tinyTerms[tinyTerms.pickedList].storedData.dailyReminder === undefined) {
                tinyTerms[tinyTerms.pickedList].storedData.dailyReminder = {};
                reminderTerm = pickRandom(tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms);
                tinyTerms[tinyTerms.pickedList].storedData.dailyReminder[reminderTerm] = tinyTerms[tinyTerms.pickedList].terms[reminderTerm].definition; 
            }
            else { 
                reminderTerm = tinyTerms[tinyTerms.pickedList].storedData.dailyReminder;
                reminderTerm = Object.getOwnPropertyNames(reminderTerm);
            }
            // Add to terms
            listOfTerms.push(reminderTerm);
            // Remove from incorrect terms
            delete tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms[reminderTerm];
            // Add to list of reminded terms
            tinyTerms[tinyTerms.pickedList].storedData.remindedTerms[reminderTerm] = tinyTerms[tinyTerms.pickedList].terms[reminderTerm].definition;
            i++;
        }
        // Choose terms to  display
        while (i < tinyTerms[tinyTerms.pickedList].ops.displayedTerms) {
            tinyTerms[tinyTerms.pickedList].storedData.viewedTerms = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms || {};
            let viewedLength = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.viewedTerms).length;

            // If all terms viewed
            if (viewedLength === dataLength) {

                let viewedSorted = [];

                // Convert viewed terms to array
                for (let term in tinyTerms[tinyTerms.pickedList].storedData.viewedTerms) {
                    viewedSorted.push([term, tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term]]);
                }
                // If reminder term picked remove from selection
                if (tinyTerms[tinyTerms.pickedList].storedData.dailyReminder !== undefined) {
                    for (let m=viewedSorted.length-1; m>=0; m--) {
                        if (tinyTerms[tinyTerms.pickedList].storedData.dailyReminder.hasOwnProperty(viewedSorted[m][0])) { 
                            viewedSorted.splice(m, 1);
                        }
                    }
                }
                // Sort array by view count
                viewedSorted.sort((a, b) => {
                    return a[1] - b[1]
                })
                // Finish off iterator with lowest viewed terms
                while (i < tinyTerms[tinyTerms.pickedList].ops.displayedTerms) {
                    listOfTerms.push(viewedSorted[i][0]);
                    i++;
                }
                // Overflow protection
                i++;
            }
            // Still unviewed terms in data
            else {
                let pickedTerm = pickRandom(tinyTerms[tinyTerms.pickedList].terms);

                // Ensure term hasn't been already scanned
                if (!scannedTerms.includes(pickedTerm)) {
                    scannedTerms.push(pickedTerm);

                    // Ensure term not viewed before
                    if (!tinyTerms[tinyTerms.pickedList].storedData.viewedTerms.hasOwnProperty(pickedTerm)) {
                        listOfTerms.push(pickedTerm);
                        i++;
                    }
                }
            }
            // Overflow protection
            if (j > 10000) {
                i = tinyTerms[tinyTerms.pickedList].ops.displayedTerms;
            }
            j++;
        }
    }
    // Return final list of terms
    return listOfTerms;
}