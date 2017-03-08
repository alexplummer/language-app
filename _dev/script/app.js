
// Imports
import { ready, cl, clv, checkSameDay, resetData, arrayCheck, getTodaysDate, appBlur } from 'helperFunctions';
import { getListOfTerms } from 'termCreation';
import { revealedBtnHandler, dictionaryLookup, textToSpeech, addColour, hideModal, pickSymbol } from 'termInteraction';
import { viewCreate, addHearts, setScore, progressBar } from 'viewCreation';
import { createNewQuery } from 'queryInteraction';
import appData from 'verbs';

// Exports
export default ops;

let sheetURL = "https://docs.google.com/spreadsheets/d/1Q1pmDXybg_GDB6bSXknuBET2Nm8L-Roi2Kj01SHm_WI/pubhtml";
let tinyTermsData = {};

// Global options
let ops = {
    displayedTerms: 5,
    counterMins: 60,
    counterSecs: 0,
    revealDailyBonusTarget: 5,
    wordAccuracy: 0.7,
    container: document.querySelector(".terms-wrapper"),
    addDay: false,
    debug: true,
    points: {
        correct: 50,
        dailyBonus: 10,
        hearts: 3
    },
    storedData: {}
}

// Initialise modules on load
ready(function () {
    'use strict';
    getData(sheetURL);
    checkFirstTime();
    // Resets button
    resetData();
});

// Gets data from Google Sheets
const getData = function getData(sheetURL) {

    function init() {
        Tabletop.init({
            key: sheetURL,
            callback: buildData,
            simpleSheet: false
        })
    }

    function buildData(data) {
        let listName = data.Sheet1.columnNames[1];

        tinyTermsData[listName] = {};
        tinyTermsData[listName].speechLang = data.Sheet1.elements[0]["Italian Verbs"];
        tinyTermsData[listName].dictFrom = data.Sheet1.elements[1]["Italian Verbs"];
        tinyTermsData[listName].dictTo = data.Sheet1.elements[2]["Italian Verbs"];
        tinyTermsData[listName].action = data.Sheet1.elements[3]["Italian Verbs"];
        tinyTermsData[listName].terms = tinyTermsData[listName].terms || {};

        for (let i = 1; i < data.Sheet1.elements.length; i++) {
            let termContent = data.Sheet1.elements[i].Term;
            let definitionContent = data.Sheet1.elements[i].Definition;
            let supportContent = data.Sheet1.elements[i].Support;

            tinyTermsData[listName].terms[termContent] = {};
            tinyTermsData[listName].terms[termContent].term = termContent;
            tinyTermsData[listName].terms[termContent].definition = definitionContent;
            tinyTermsData[listName].terms[termContent].support = supportContent;
        }
    }
    window.addEventListener('DOMContentLoaded', init)
}

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

        // Clear daily goals
        delete ops.storedData.revealedTermCount;
        delete ops.storedData.revealDailyBonus;

        // Set daily limit
        ops.storedData.revealDailyBonus = ops.storedData.revealDailyBonus || {};
        // Reset daily reveal bonus
        ops.storedData.revealDailyBonus.complete = false;
    }

    // Create initial view
    viewCreate(pickedTerms);
    setScore();

    // Create opened date, daily terms, viewed terms
    ops.storedData.dateOpened = getTodaysDate();
    ops.storedData.dailyTerms = pickedTerms;

    // Add to storage
    localforage.setItem('ops.storedData', ops.storedData);

    // Keep query active each day
    ops.storedData.queryComplete = ops.storedData.queryComplete || {};

    if (ops.storedData.newDay === true) {
        // Reset daily counters
        delete ops.storedData.dailyQuery;
        delete ops.storedData.dailyReminder;
        delete ops.storedData.revealCountdowns;

        ops.storedData.remindedTerms = ops.storedData.remindedTerms || {}

        // Delete daily reminder
        if (ops.storedData.remindedTerms.dailyReminder !== undefined) {
            delete ops.storedData.remindedTerms.dailyReminder;
        }
    }
    // Create query if revealed terms
    if (ops.storedData.viewedTerms !== undefined && ops.storedData.queryComplete !== true && ops.storedData.newDay === true) {
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

    // Refresh window on blur
    appBlur();

    // Once loaded
    setTimeout(() => {
        document.getElementsByTagName('body')[0].classList = "";
        document.querySelector('.m-query-wrapper').classList.add('animated', 'slideInDown');
    }, 3000);


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

