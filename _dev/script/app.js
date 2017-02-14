
// Imports
import {ready, cl, clv, resetData, arrayCheck, getTodaysDate} from 'helperFunctions';
import {getListOfTerms, viewCreate, createViewedTerms} from 'termCreation';

// Exports
export default globals;

// Global options
const globals = {
    displayedTerms: 3,
    container: document.querySelector(".container"),
    addDay: false,
    debug: true,
}

// Setup stored data
let storedData = storedData || {};

// Initialise modules on load
ready(function(){
	'use strict';
	openApp();
    // Resets button
    resetData();
});

// Runs when app opens
const openApp = function openApp() {

    // Check if this is the first time app has run
    localforage.length().then( numberOfKeys => {
        
        // If first time
        if(numberOfKeys===0) {
            firstTime();
        }
        // Not first time
        else {
            storedData.firstTime = false;
            initialise();
        }
    }).catch( err => {
        console.log(err);
    });
}

// Runs if first time app has run
const firstTime = function firstTime() {
    
    // Create terms
    createTermsHandler();

    // Set first time to false
    storedData.firstTime = false;

    // Add to storage
    localforage.setItem('storedData', storedData);
}

// Initialises app
const initialise = function initialise() {

    // Get stored data
    localforage.getItem('storedData').then( retrievedData => {
        checkData(retrievedData);
    }).catch( err => {
        console.log(err);
    });

    // Handle retrieved data
    function checkData(retrievedData) {

        // Set data in app from storage
        storedData = retrievedData;
        
        // Check if a new day
        let todaysDate = getTodaysDate();
        let storedDate = [];
        let addOneDay = true;
            
        // Get date last stored
        storedDate = Array.from(retrievedData.dateOpened);

        // If same day, use dailyTerms data
        if (arrayCheck(todaysDate, storedDate) === true) {
            if (globals.addDay === true) {createTermsHandler();}
            else {viewCreate(retrievedData.dailyTerms);}
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
    storedData.dateOpened = getTodaysDate();
    storedData.dailyTerms = pickedTerms;    
    storedData.viewedTerms = createViewedTerms(pickedTerms);
    
    // Add to storage
    localforage.setItem('storedData', storedData);
} 

