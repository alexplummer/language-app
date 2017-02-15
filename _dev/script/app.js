
// Imports
import { ready, cl, clv, resetData, arrayCheck, getTodaysDate } from 'helperFunctions';
import { getListOfTerms, updateDataCount } from 'termCreation';
import { revealedBtnHandler } from 'termInteraction';
import { viewCreate } from 'viewCreation';

// Exports
export default ops;

// Global options
let ops = {
    displayedTerms: 3,
    container: document.querySelector(".container"),
    addDay: true,
    debug: true,
    storedData: {}
}

// Initialise modules on load
ready(function () {
    'use strict';
    openApp();
    // Resets button
    resetData();
});

// Runs when app opens
const openApp = function openApp() {

    // Check if this is the first time app has run
    localforage.length().then(numberOfKeys => {

        // If first time
        if (numberOfKeys === 0) {
            firstTime();
        }
        // Not first time
        else {
            ops.storedData.firstTime = false;
            initialise();
        }
    }).catch(err => {
        console.log(err);
    });
}

// Runs if first time app has run
const firstTime = function firstTime() {

    // Create terms
    createTermsHandler();

    // Set first time to false
    ops.storedData.firstTime = false;

    // Add to storage
    localforage.setItem('ops.storedData', ops.storedData);
}

// Initialises app
const initialise = function initialise() {

    // Get stored data
    localforage.getItem('ops.storedData').then(retrievedData => {
        checkData(retrievedData);
    }).catch(err => {
        console.log(err);
    });

    // Handle retrieved data
    function checkData(retrievedData) {

        // Set data in app from storage
        ops.storedData = retrievedData;

        // Check if a new day
        let todaysDate = getTodaysDate();
        let storedDate = [];
        let addOneDay = true;

        // Get date last stored
        storedDate = Array.from(retrievedData.dateOpened);

        // If same day, use dailyTerms data
        if (arrayCheck(todaysDate, storedDate) === true) {
            if (ops.addDay === true) { createTermsHandler(); }
            else { viewCreate(retrievedData.dailyTerms); }
        }
        // Else create new terms
        else {
            createTermsHandler();
        }
    }
}

// Calls functions to handle term creation
const createTermsHandler = function createTermsHandler() {

    // Get initial terms
    let pickedTerms = getListOfTerms();

    // Create initial view
    viewCreate(pickedTerms);

    // Create opened date, daily terms, viewed terms
    ops.storedData.dateOpened = getTodaysDate();
    ops.storedData.dailyTerms = pickedTerms;
    ops.storedData.viewedTerms = updateDataCount('viewedTerms', pickedTerms, 0);

    // Add to storage
    localforage.setItem('ops.storedData', ops.storedData);

    // Handles events for revealed terms
    revealedBtnHandler();

    // Debug code
    if (ops.debug === true) {
        cl(ops.storedData);
        cl('Revealed terms count:');
        cl(ops.storedData.revealedTermCount);
        cl('Viewed terms count:');
        cl(ops.storedData.viewedTerms);
        cl('Revealed terms timer:');
        cl(ops.storedData.revealCountdowns);
    };
}

