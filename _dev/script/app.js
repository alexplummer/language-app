
// Imports
import { ready, cl, clv, checkSameDay, resetData, arrayCheck, getTodaysDate } from 'helperFunctions';
import { getListOfTerms, updateDataCount } from 'termCreation';
import { revealedBtnHandler } from 'termInteraction';
import { viewCreate, addHearts, setScore } from 'viewCreation';
import { createNewQuery } from 'queryInteraction';

// Exports
export default ops;

// Global options
let ops = {
    displayedTerms: 3,
    counterMins: 0,
    counterSecs: 1,
    revealDailyBonusTarget: 2,
    wordAccuracy: 0.5,
    container: document.querySelector(".terms-wrapper"),
    addDay: true,
    debug: true,
    points: {
        correct: 50,
        dailyBonus: 10,
        hearts: 1
    },
    storedData: {}
}

// Initialise modules on load
ready(function () {
    'use strict';
    checkFirstTime();
    // Resets button
    resetData();
});

// Runs when app opens
const checkFirstTime = function checkFirstTime() {

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
    appBuildHandler();

    // Set first time to false
    ops.storedData.firstTime = false;

    // Add to storage
    localforage.setItem('ops.storedData', ops.storedData);
}

// Initialises data and app
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
        checkSameDay();

        // Start build
        appBuildHandler();
    }
}

// Calls functions to handle app creation and running
const appBuildHandler = function appBuildHandler() {

    // Get initial terms
    let pickedTerms;

    // If same day, used daily terms
    if (ops.storedData.newDay === false) {
        pickedTerms = ops.storedData.dailyTerms;
    }
    // Else get new  
    else {
        pickedTerms = getListOfTerms();
        
        // Set daily limit
        if (ops.storedData.revealDailyBonus === undefined) {
            ops.storedData.revealDailyBonus = {};
        }
        // Reset daily reveal bonus
        ops.storedData.revealDailyBonus.complete = false;
    }

    // Create initial view
    viewCreate(pickedTerms);
    setScore();

    // Create opened date, daily terms, viewed terms
    ops.storedData.dateOpened = getTodaysDate();
    ops.storedData.dailyTerms = pickedTerms;
    ops.storedData.viewedTerms = updateDataCount('viewedTerms', pickedTerms, 0);

    // Add to storage
    localforage.setItem('ops.storedData', ops.storedData);

    // Handles events for revealed terms
    revealedBtnHandler();

    // Keep query active each day
    if (ops.storedData.queryComplete === undefined) {
        ops.storedData.queryComplete = {};
    }
    if (ops.storedData.newDay === true) {
        delete ops.storedData.dailyQuery;
        ops.storedData.queryComplete = false;

        // Delete daily reminder
        if (ops.storedData.remindedTerms.dailyReminder !== undefined) {
            delete ops.storedData.remindedTerms.dailyReminder;
        }
    }
    // Create query if revealed terms
    if (ops.storedData.revealedTermCount !== undefined && ops.storedData.queryComplete === false) {
        createNewQuery();
    }

    // Debug code
    if (ops.debug === true) {
        cl(ops.storedData);
        //cl('Revealed terms count:');
        //cl(ops.storedData.revealedTermCount);
        //cl('Viewed terms count:');
        //cl(ops.storedData.viewedTerms);
        //cl('Revealed terms timer:');
        //cl(ops.storedData.revealCountdowns);
    };
}

