
// Imports
import { ready, cl, clv, buildData, checkSameDay,arrayCheck, getTodaysDate, appBlur } from 'helperFunctions';
import { getListOfTerms } from 'termCreation';
import { revealedBtnHandler, dictionaryLookup, textToSpeech, addColour, hideModal, pickSymbol } from 'termInteraction';
import { viewCreate, addHearts, setScore, progressBar } from 'viewCreation';
import { createNewQuery } from 'queryInteraction';
import { showHome } from 'homeScreen';
import { onboardShow, optionsDisplay } from 'introInstructions';
import appData from 'appData';

// Exports
export default tinyTerms;

// App namespace
let tinyTerms = tinyTerms || {};

// Global options
let ops = {
    displayedTerms: 5,
    counterMins: 60,
    counterSecs: 0,
    revealDailyBonusTarget: 5,
    wordAccuracy: 0.7,
    addDay: false,
    debug: true,
    loadDelay: 2500,
    points: {
        correct: 50,
        dailyBonus: 10,
        hearts: 3
    }
}

// Default list choices
tinyTerms.listChoices = {
    "Italian Verbs (ENG)": {
        name: "Italian Verbs (ENG)",
        sheetURL: "https://docs.google.com/spreadsheets/d/1Q1pmDXybg_GDB6bSXknuBET2Nm8L-Roi2Kj01SHm_WI/pubhtml"
    },
    "Computer Components": {
        name: "Computer Components",
        sheetURL: "https://docs.google.com/spreadsheets/d/1Ho5Viqg71mIBlbyAIjLIqHEWRr4znDCLZSBtwVTtZk0/edit"
    },
    "Periodic Elements": {
        name: "Periodic Elements",
        sheetURL: "https://docs.google.com/spreadsheets/d/1sL3kTrZq3Hdb_iBo7hC8x9oGXXownlxmmdmmvALAPlU/edit#gid=0"
    }
}

// Crash protection
setTimeout(() => {
    document.getElementsByTagName('body')[0].classList.remove('loading');
}, 10000);

// Initialise modules on load
ready(function () {
    'use strict';
    pickList();
});

// Pick a list
const pickList = function pickList(skipDefaultCheck) {    
    let tinyTermsDefault;

    localforage.getItem('tinyTerms.tutComplete', function(err, tutStatus) {
        tinyTerms.tutComplete = tutStatus;

        // Check for default list, used on very first load
        localforage.getItem('tinyTermsDefault', function(err, value) {
            tinyTermsDefault = value;

            if (tinyTermsDefault === null) {
                showHome();
            }
            else {
                checkDefault();
            }
        });
    });
    function checkDefault() {
        // Check for existing data of newly picked list
        localforage.getItem('tinyTerms'+tinyTermsDefault, function(err, value) {

            if (value !== null) {
                tinyTerms.pickedList = tinyTermsDefault;
                normalLoad(tinyTerms.pickedList);
            }
            else {
                firstLoad();
            }
        });
    }
    function normalLoad(defaultlist) {

        tinyTerms.storedName = "tinyTerms"+defaultlist;

        localforage.getItem('tinyTerms'+defaultlist, function(err, value) {
            // Set session storage to stored
            tinyTerms[tinyTerms.pickedList] = value;
            // Update stored ops
            tinyTerms[tinyTerms.pickedList].ops = ops;
            initialise();
        });
    }
}

// Sets up new list, gets data
const firstLoad = function firstLoad() {
    localforage.getItem('tinyTermsDefault', function(err, value) {
        // Set session storage to stored
        tinyTerms.pickedList = value;
        // Set picked list and create data object for it
        tinyTerms[tinyTerms.pickedList] = {};
        tinyTerms[tinyTerms.pickedList].storedData = {};
        tinyTerms[tinyTerms.pickedList].ops = ops;
        tinyTerms.storedName = "tinyTerms"+tinyTerms.pickedList;
        // Set new list to storage, add as default
        localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
        // Add default lists to uploadedLists, same place as user upload
        localforage.getItem('tinyTerms.uploadedLists', function(err, uploadedLists) {
            
            // Get uploaded lists
            for (let val in uploadedLists) {
                let listName = uploadedLists[val].name;
                let listURL = uploadedLists[val].sheetURL;
                
                tinyTerms.listChoices[listName] = {
                    name: listName,
                    sheetURL: listURL
                }
            }
            // Fetch data for list
            fetchData(tinyTerms.listChoices[tinyTerms.pickedList].sheetURL, firstTime);
        });
    });
}

// Fetches list data
const fetchData = function fetchData(sheetURL, postBuildCallback) {
    // Add a callback method
    tinyTerms.postBuildCallback = postBuildCallback;
    
    // Get data from sheets
    Tabletop.init({
        key: sheetURL,
        callback: buildData,
        simpleSheet: false
    });
}

// Runs if first time app has run
const firstTime = function firstTime() {
    // Create terms
    appBuildHandler();
    // Show intro onboarding
    if (tinyTerms.tutComplete === null) {
        onboardShow();
    }
    // Then set first time to false
    tinyTerms[tinyTerms.pickedList].storedData.firstTime = false;
    // Add to storage
    localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
}

// Initialises data and app
const initialise = function initialise() {
    // Check if a new day
    checkSameDay();
    // Start build
    appBuildHandler();
}

// Calls functions to handle app creation and running
const appBuildHandler = function appBuildHandler() {

    // Get initial terms
    let pickedTerms;
    
    // If same day, used daily terms
    if (tinyTerms[tinyTerms.pickedList].storedData.newDay === false) {
        pickedTerms = tinyTerms[tinyTerms.pickedList].storedData.dailyTerms;
    }
    // Else get new  
    else {
        pickedTerms = getListOfTerms();

        // Clear daily goals
        delete tinyTerms[tinyTerms.pickedList].storedData.revealedTermCount;
        delete tinyTerms[tinyTerms.pickedList].storedData.revealDailyBonus;
        delete tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns;
        delete tinyTerms[tinyTerms.pickedList].storedData.dailyQuery;
        delete tinyTerms[tinyTerms.pickedList].storedData.dailyReminder;

        // Set daily limit
        tinyTerms[tinyTerms.pickedList].storedData.revealDailyBonus = {};
        // Reset daily reveal bonus
        tinyTerms[tinyTerms.pickedList].storedData.revealDailyBonus.complete = false;
        
        // Create query if revealed terms
        if (tinyTerms[tinyTerms.pickedList].storedData.viewedTerms !== undefined) {
            createNewQuery();
        }

        // Create reminded terms default
        tinyTerms[tinyTerms.pickedList].storedData.remindedTerms = tinyTerms[tinyTerms.pickedList].storedData.remindedTerms || {}
    }
    
    // Create initial view
    viewCreate(pickedTerms);
    setScore();

    // Create opened date, daily terms, viewed terms
    tinyTerms[tinyTerms.pickedList].storedData.dateOpened = getTodaysDate();
    tinyTerms[tinyTerms.pickedList].storedData.dailyTerms = pickedTerms;

    // Add to storage
    localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

    // Keep query active each day
    tinyTerms[tinyTerms.pickedList].storedData.queryComplete = tinyTerms[tinyTerms.pickedList].storedData.queryComplete || {};

    // Load query if it exists already
    if (tinyTerms[tinyTerms.pickedList].storedData.dailyQuery !== undefined && tinyTerms[tinyTerms.pickedList].storedData.queryComplete !== true) {
        createNewQuery();
    }

    // Handles events for revealed terms
    revealedBtnHandler();
    dictionaryLookup();
    textToSpeech();
    addColour();
    pickSymbol();
    hideModal();
    progressBar();

    // Shows options menu
    optionsDisplay();
    
    // Refresh window on blur
    appBlur();

    // Once loaded
    setTimeout(() => {
        document.getElementsByTagName('body')[0].classList.remove('loading');
        document.querySelector('.m-query').classList.add('animated', 'slideInDown');
    }, tinyTerms[tinyTerms.pickedList].ops.loadDelay);

     // Set menu button listener
    let menuTrigger = document.getElementsByTagName('h1');

    menuTrigger[0].addEventListener('click', (e)=>{
        e.preventDefault();
        showHome();
    });

    // Show onboard if incomplete
    if (tinyTerms.tutComplete === false) {
        onboardShow();
    }

    // Debug code
    if (tinyTerms[tinyTerms.pickedList].ops.debug === true) {
        cl(tinyTerms);
        //cl('Revealed terms count:');
        //cl(tinyTerms[tinyTerms.pickedList].storedData.revealedTermCount);
        //cl('Viewed terms count:');
        //cl(tinyTerms[tinyTerms.pickedList].storedData.viewedTerms);
        //cl('Revealed terms timer:');
        //cl(tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns);
    };
}

