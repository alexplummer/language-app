
// Imports
import { cl, clv, makeSafeClass, countLines } from 'helperFunctions';
import appData from 'appData';
import tinyTerms from 'app';
import { createRevealTimer } from 'termInteraction';

// Exports
export { viewCreate, addHearts, goalMeters, setScore, progressBar };

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
        tinyTerms[tinyTerms.pickedList].storedData.revealGoal = tinyTerms[tinyTerms.pickedList].storedData.revealGoal || {};

        if (tinyTerms[tinyTerms.pickedList].storedData.revealGoal[termValue] === undefined) {
            viewsCount = 0;
        }
        else {
            viewsCount = (tinyTerms[tinyTerms.pickedList].storedData.revealGoal[termValue]) || 0;
        }

        // Star background
        if (tinyTerms.globalUnlocks.bgStars.active === 'unlocked') {
            document.querySelector('body').classList.add('stars');
        }

        // Letters background
        if (tinyTerms.globalUnlocks.bgLetters.active === 'unlocked') {
            document.querySelector('body').classList.add('letters');
        }

        document.querySelector('h1').innerHTML = tinyTerms.pickedList;
        document.querySelector('.list-action').innerHTML = tinyTerms[tinyTerms.pickedList].action + '<span class="query-holder">'+tinyTerms[tinyTerms.pickedList].storedData.dailyQuery+'</span>';

        let particles = "";

        for (let j = 0; j < 50; j++) {
            particles += '<div class="particle">&#9733;</div>';
        }

        // Create terms HTML
        let newHolder =
            `<div class="m-term-wrapper ${termEncode}">
                <p class="term-holder">${termValue}</p>
                <div class="theme-holder"><p class="symbol-holder"></p></div>
                <div class="explosion">
                    ${particles}
                </div>
                <div class="right">
                    <p class="term-views"><span>Goal:</span> <span class="count">${viewsCount}</span> / ${tinyTerms[tinyTerms.pickedList].ops.revealGoalTarget}</p>
                    <div class="goal-indicators">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
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
    
    // Style terms based on number of lines
    let termHolders = document.querySelectorAll('.term-holder');

    for (let i = 0; i < termHolders.length; i++) {
        termHolders[i].style.minHeight = '0px';
        termHolders[i].classList.add('lines-'+countLines(termHolders[i]));
        termHolders[i].style.minHeight = '101px';
    }

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
            
            if (pickedColour !== "#fff") {
                termWrapper.querySelector('.term-holder').style.color = "#fff";
                termWrapper.classList.add('bg-active');
            }
            
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

// Fill goal meters
const goalMeters = function goalMeters() {
    let termWrappers = document.querySelectorAll('.m-term-wrapper');

    for (let i = 0; i < termWrappers.length; i++) {
        let goalCount = termWrappers[i].querySelector('.count').innerHTML;
        goalCount = parseInt(goalCount);

        for (let j = 0; j < goalCount; j++) {

            if (j < 3) {
                termWrappers[i].querySelector('.goal-indicators').getElementsByTagName('span')[j].classList.add('filled');
            }
        }
    }
}

// Sets the score
const setScore = function setScore() {

    // Add to storage
    localforage.getItem('tinyTerms.score', (err, savedScore) => {

        // Set score if it doesn't exist
        if (savedScore === null) {
            tinyTerms.score = 0;

            // Add to storage
            localforage.setItem('tinyTerms.score', score);
        }
        else {
            tinyTerms.score = savedScore;
        }

        let score = tinyTerms.score;

        // Add to view
        document.querySelector('.score-holder').innerHTML = score;
    });
}

// Add progress bar
const progressBar = function progressBar() {
    // Create correct terms default
    tinyTerms[tinyTerms.pickedList].storedData.learnedTerms = tinyTerms[tinyTerms.pickedList].storedData.learnedTerms || {};
    let completed = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.learnedTerms).length;
    let remaining = Object.keys(tinyTerms[tinyTerms.pickedList].terms).length;

    // Add to DOM
    document.querySelector('.m-progress-bar').querySelector('.completed').innerHTML = completed;
    document.querySelector('.m-progress-bar').querySelector('.remaining').innerHTML = ' / ' + remaining;
    document.querySelector('.m-progress-bar').querySelector('.progress-bg').style.width = ((completed / remaining) * 100) + "%";
}
