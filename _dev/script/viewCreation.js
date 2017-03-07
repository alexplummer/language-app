
// Imports
import { cl, clv, makeSafeClass } from 'helperFunctions';
import appData from 'appData';
import tinyTerms from 'app';
import { createRevealTimer } from 'termInteraction';

// Exports
export { viewCreate, addHearts, setScore, progressBar };

// Create app view
const viewCreate = function viewCreate(termsToCreate) {

    let viewHTML = "";

    // Create HTML for terms
    for (let value of termsToCreate) {

        // Get terms and definitions from data
        let termValue = tinyTerms[tinyTerms.pickedList].terms[value].term;
        let definitionValue = tinyTerms[tinyTerms.pickedList].terms[value].definition;
        let supportValue = tinyTerms[tinyTerms.pickedList].terms[value].support;
        let termEncode = makeSafeClass(termValue);
        let revealCounter;
        let viewsCount;

        // Check storage for revealed count
        tinyTerms[tinyTerms.pickedList].storedData.viewedTerms = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms || {};
        if (tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue] === undefined) {
            viewsCount = 0;
        }
        else {
            viewsCount = (tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue].viewCount + 1) || 0;
        }

        document.querySelector('h1').innerHTML = tinyTerms.pickedList;
        document.querySelector('.list-action').innerHTML = tinyTerms[tinyTerms.pickedList].action + '<span class="query-holder"></span>';

        // Create terms HTML
        let newHolder =
            `<div class="m-term-wrapper ${termEncode}">
                <p class="term-holder">${termValue}</p>
                <div class="theme-holder"><p class="symbol-holder"></p></div>
                <div class="right">
                    <p class="term-views"><span>Goal:</span> <span class="count">${viewsCount}</span> / ${tinyTerms[tinyTerms.pickedList].ops.revealDailyBonusTarget}</p>
                    <button class="reveal">Reveal</button>
                </div>
                <div class="definition-wrapper hidden">
                    <p class="definition-holder">${definitionValue}</p>
                    <div class="helpers">
                        <a href="#" class="lookup"></a>
                        <a href="#" class="colour"></a>
                        <a href="#" class="symbol"></a>
                    </div>
                    <div class="support-wrapper">${supportValue}</div>
                </div>
            </div>`;

        viewHTML += newHolder;
    }
    // Add to view
    document.querySelector('.terms-wrapper').innerHTML = viewHTML;

    // Add theme to previously created terms
    for (let value of termsToCreate) {
        let termValue = tinyTerms[tinyTerms.pickedList].terms[value].term;
        let termEncode = makeSafeClass(termValue);

        // Check storage for assigned colour
        tinyTerms[tinyTerms.pickedList].storedData.viewedTerms = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms || {};

        if (tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue] !== undefined && tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue].colour !== undefined) {
            let termWrapper = document.querySelector('.' + termEncode + '');
            let pickedColour = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue].colour;
            // Add colour to object
            termWrapper.querySelector('.theme-holder').style.background = pickedColour;
            termWrapper.querySelector('.theme-holder').classList.add('bg-active');
            termWrapper.querySelector('.term-holder').style.color = "#fff";
            termWrapper.querySelector('.right').style.border = "0";
        }
        // Check storage for assigned symbol
        if (tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue] !== undefined && tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue].symbol !== undefined) {
            let termWrapper = document.querySelector('.' + termEncode + '');
            let pickedSymbol = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[termValue].symbol;
            // Add symbol to object
            termWrapper.querySelector('.symbol-holder').classList = ('symbol-holder');
            termWrapper.querySelector('.symbol-holder').classList.add(pickedSymbol);
        }
    }

    // Add countdown timers to term buttons
    for (let value of termsToCreate) {

        // Check if timer data exists
        if (tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns !== undefined) {

            // Add countdown timers to buttons
            if (tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[value] !== undefined) {

                let revealBtn = document.querySelectorAll('.reveal');

                // Find button node that matches term in DOM
                for (let i = 0; i < revealBtn.length; i++) {
                    let revealTerm = revealBtn[i].parentNode.parentNode.querySelector('.term-holder').innerHTML;

                    if (revealTerm === value) {
                        createRevealTimer(revealBtn[i]);
                    }
                }
            }
        }
    }
}

// Add hearts to page
const addHearts = function addHearts() {
    let heartHolder = document.querySelector('.hearts');
    let heartsHTML = "";

    // If no hearts data exists
    if (tinyTerms[tinyTerms.pickedList].storedData.hearts === undefined) {
        tinyTerms[tinyTerms.pickedList].storedData.hearts = tinyTerms[tinyTerms.pickedList].ops.points.hearts;
    }
    for (let i = 0; i < tinyTerms[tinyTerms.pickedList].storedData.hearts; i++) {
        heartsHTML += '<p></p>';
    }
    // Add to view
    heartHolder.innerHTML = heartsHTML;

    // Add to storage
    localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
}

// Sets the score
const setScore = function setScore() {

    let scoreHolder = document.querySelector('.score-holder');

    // Set score if it doesn't exist
    if (tinyTerms[tinyTerms.pickedList].storedData.score === undefined) {
        tinyTerms[tinyTerms.pickedList].storedData.score = 0;
    }

    let score = tinyTerms[tinyTerms.pickedList].storedData.score;

    // Add to view
    scoreHolder.innerHTML = score;
}

// Add progress bar
const progressBar = function progressBar() {
    // Create correct terms default
    tinyTerms[tinyTerms.pickedList].storedData.learnedTerms = tinyTerms[tinyTerms.pickedList].storedData.learnedTerms || {};
    let completed = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.learnedTerms).length;
    let remaining = Object.keys(tinyTerms[tinyTerms.pickedList].terms).length;

    // Add to DOM
    document.querySelector('.m-footer').querySelector('.completed').innerHTML = completed;
    document.querySelector('.m-footer').querySelector('.remaining').innerHTML = ' / ' + remaining;
    document.querySelector('.m-footer').querySelector('.progress-bar').style.width = ((completed / remaining) * 100) + "%";
}