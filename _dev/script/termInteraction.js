
// Imports
import { cl, clv, clickListener, jsonp, findKeys } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { createNewQuery } from 'queryInteraction';
import { setScore, addHearts, progressBar } from 'viewCreation';

// Exports
export { revealedBtnHandler, createRevealTimer, dictionaryLookup, textToSpeech, addColour, hideModal, pickSymbol };

// Handles functions when reveal button clicked
const revealedBtnHandler = function revealedBtnHandler() {

    let revealBtn = document.querySelectorAll('.reveal');

    clickListener(revealBtn, (i) => {

        // Disabled button prevention
        if (revealBtn[i].classList.contains('disabled')) {
            return false;
        }

        let term = [revealBtn[i].parentNode.parentNode.querySelector('.term-holder').innerHTML];

        // Updates the revealed view counter
        let countHolder = revealBtn[i].parentNode.querySelector('.count');
        let definitionWrapper = revealBtn[i].parentNode.parentNode.querySelector('.definition-wrapper');
        let definitionHolder = revealBtn[i].parentNode.parentNode.querySelector('.definition-holder');
        let count = parseInt(countHolder.innerHTML);

        // Show definition
        definitionWrapper.classList.remove('hidden');

        // Animations
        definitionWrapper.classList.add('slideInUp','animated');
        revealBtn[i].parentNode.classList.add('rubberBand','animated');

        // Set storedData
        ops.storedData.viewedTerms = ops.storedData.viewedTerms || {};
        ops.storedData.viewedTerms[term] = ops.storedData.viewedTerms[term] || {};
        ops.storedData.viewedTerms[term].viewCount = ops.storedData.viewedTerms[term].viewCount || -1;
        ops.storedData.viewedTerms[term].viewCount += 1;

        // Daily reveal bonus
        let revealBonusCount;

        // If no existing term bonus
        if (ops.storedData.revealDailyBonus[term] === undefined) {
            revealBonusCount = 1;
        }
        // Add one to daily bonus
        else {
            revealBonusCount = ops.storedData.revealDailyBonus[term];
            revealBonusCount += 1;
        }
        // Update progress bar
        progressBar();
        // Update DOM
        countHolder.innerHTML = revealBonusCount;
        // If bonus is met
        if (revealBonusCount === ops.revealDailyBonusTarget) {
            // If daily bonus not already triggered
            if (ops.storedData.revealDailyBonus.complete === false) {
                // Keep query active 
                ops.storedData.queryComplete = false;
                // Create a new query
                createNewQuery(true);
            }
            // Set only once a day
            ops.storedData.revealDailyBonus.complete = true;
            ops.storedData.score += ops.points.dailyBonus;
            setScore();
        }
        ops.storedData.revealDailyBonus[term] = revealBonusCount;

        // Save to storage
        localforage.setItem('ops.storedData', ops.storedData);

        // Starts a timer 
        createRevealTimer(revealBtn[i]);
    });
}

// Adds a timer to the reveal button
const createRevealTimer = function createRevealTimer(revealBtn) {

    // If no stored data for reveal countdowns
    ops.storedData.revealCountdowns = ops.storedData.revealCountdowns || {};

    let term = [revealBtn.parentNode.parentNode.querySelector('.term-holder').innerHTML];
    let minutes = ops.counterMins;
    let seconds = ops.counterSecs;
    let remainingMinutes;
    let remainingSeconds;
    let startTime;
    let timerEnded;

    // New timer
    if (ops.storedData.revealCountdowns[term] === undefined) {

        // Get a new time
        startTime = new Date().getTime();

        // Set storedData
        ops.storedData.revealCountdowns[term] = {
            "startTime": startTime,
            "timerEnded": false
        };

        // Start timer
        startTimer();
    }
    // Existing timer
    else {
        // Start timer
        startTimer();
    }

    function startTimer() {
        let nowTime = new Date().getTime();
        
        // Disable button
        revealBtn.classList.add('disabled');
        revealBtn.setAttribute("disabled", true);

        // Get terms start time for countdown
        startTime = ops.storedData.revealCountdowns[term].startTime;
        timerEnded = ops.storedData.revealCountdowns[term].timerEnded;

        // Get difference in seconds
        let diffSecs = Math.floor((nowTime - startTime) / 1000);
        // Get total in seconds
        let totalSecs = (ops.counterMins * 60) + seconds;

        // NowTime overtaken startTime
        if (diffSecs >= totalSecs) {
            timerEnded = true;
            // Stop interval
            clearInterval(ops.storedData.revealCountdowns[term].timerUpdate);
            // Clear storage for term timer
            delete ops.storedData.revealCountdowns[term];
        }
        // Timer stopped, return to normal
        if (timerEnded === true) {
            localforage.setItem('ops.storedData', ops.storedData);
            return false;
        }
        // Set remaining time 
        remainingSeconds = totalSecs - diffSecs;
    }

    // Set start time to storage
    localforage.setItem('ops.storedData', ops.storedData);

    let timeout;
    let checkCount = 0;

    // If timer is active   
    if (timerEnded === false) {

        // Start timer interval
        ops.storedData.revealCountdowns[term].timerUpdate = setInterval(() => {
            // Resync timer in some devices when off screen
            checkCount += 1;
            if (checkCount % 5 === 0) {
                startTimer();
            }
            // Call UI timer build
            buttonTimer();
        }, 1000)
    }
    else {
        revealBtn.innerHTML = ("Reveal");
        revealBtn.classList.remove('disabled');
        revealBtn.disabled = false;
    }

    // Builds the timer
    function buttonTimer() {
        let displayedMinutes = Math.floor(remainingSeconds / 60);
        let displayedSeconds = remainingSeconds % 60;
        let hiddenZero = '';

        // Timer end
        if (remainingSeconds <= 0) {
            revealBtn.innerHTML = ("Reveal");
            revealBtn.classList.remove('disabled');
            revealBtn.disabled = false;
            return false;
        }

        // Handle issues like zero index
        if (displayedSeconds < 10 && displayedSeconds >= 0) {
            hiddenZero = '0';
        }
        if (remainingSeconds === 60) {
            displayedSeconds = '00';
        }
        // Update DOM
        revealBtn.innerHTML = (displayedMinutes + ':' + hiddenZero + displayedSeconds);

        // Decrease timer
        remainingSeconds -= 1;
    }
};

// Allows for text to speech
const textToSpeech = function textToSpeech() {

    let termHolder = document.querySelectorAll('.term-holder');

    clickListener(termHolder, (i) => {
        let speech = new SpeechSynthesisUtterance(termHolder[i].innerHTML);
        speech.lang = "it";
        window.speechSynthesis.speak(speech);
    });
}

// Retrieves dictionary references
const dictionaryLookup = function dictionaryLookup() {

    let dictionaryBtn = document.querySelectorAll('.lookup');
    let modal = document.querySelector('.m-modal');

    clickListener(dictionaryBtn, (i) => {
        let term = dictionaryBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

        // Bring up modal
        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        let view = `<header>
                        <h2 class="dictionary">Dictionary definitions</h2>
                    </header>
                    <p>${term}:</p>
                    <ul class="definitions">
                    </ul>`;

        modal.querySelector('.content').innerHTML += view;
        let definitionHolder = modal.querySelector('.definitions');

        // Make request to Glosbe
        jsonp('https://glosbe.com/gapi/translate?from=ita&dest=eng&format=json&pretty=true&phrase=' + term.toLowerCase() + '').then(function (data) {
            let dictionaryResponses = "";

            try {
                // Search through data for "meanings"
                findProp(data, "text");

                function findProp(obj, key, out) {
                    let i;
                    let proto = Object.prototype;
                    let ts = proto.toString;
                    let hasOwn = proto.hasOwnProperty.bind(obj);

                    for (i in obj) {
                        if (hasOwn(i)) {
                            if (i === key) {
                                dictionaryResponses += '<li>' + obj[i] + '</li>';
                            } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
                                findProp(obj[i], key, out);
                            }
                        }
                    }
                    return out;
                }
                // Add to DOM
                definitionHolder.innerHTML = dictionaryResponses;
            }
            catch (err) {
                console.log('error');
            }
        });
    });
}

// Adds colours to term holders
const addColour = function addColour() {

    let modal = document.querySelector('.m-modal');
    let colourBtn = document.querySelectorAll('.colour');
    let picker;
    let colours;

    clickListener(colourBtn, (i) => {
        // Bring up modal
        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        let termHolder = colourBtn[i].parentNode.parentNode.parentNode;
        let term = colourBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

        let view = `<header>
                        <h2 class="colour">Colour picker</h2>
                    </header>
                    <p>Click below to add a colour for "<span class="colour-term">${term}</span>":</p>
                    <ul class="colour-wrap">
                        <li><a href="#" data-colour="#1abc9c"></a></li>
						<li><a href="#" data-colour="#3498db"></a></li>
						<li><a href="#" data-colour="#9b59b6"></a></li>
						<li><a href="#" data-colour="#f1c40f"></a></li>
						<li><a href="#" data-colour="#e67e22"></a></li>
						<li><a href="#" data-colour="#e74c3c"></a></li>
                    </ul>`;

        // Add view
        modal.querySelector('.content').innerHTML += view;

        let coloursHolder = modal.querySelector('.colour-wrap');
        // Add colour vars
        colours = coloursHolder.getElementsByTagName('a');
        colourListener();
    });

    // Add colour function
    function colourListener() {
        let term = document.querySelector('.colour-term').innerHTML;
        let termWrapper = document.querySelector('.' + term + '');

        // Pick a colour
        clickListener(colours, (i) => {
            let pickedColour = colours[i].getAttribute('data-colour');
            // Add colour to object
            termWrapper.querySelector('.theme-holder').style.background = pickedColour;
            termWrapper.querySelector('.theme-holder').classList.add('bg-active');
            termWrapper.querySelector('.term-holder').style.color = "#fff";
            termWrapper.querySelector('.right').style.border = "0";
            // Set storage
            ops.storedData.viewedTerms[term].colour = pickedColour;
            localforage.setItem('ops.storedData', ops.storedData);
            // Hide modal
            hideModal(true);
        });
    }
}

// Symbol picker
const pickSymbol = function pickSymbol() {
    let modal = document.querySelector('.m-modal');
    let symbolBtn = document.querySelectorAll('.symbol');
    let symbolHTML = "<tr>";
    let symbols = appData.fonts;
    let k = 0;

    for (let i = 0; i < appData.fonts.feather.length; i++) {

        if (k % 5 === 0 && k != 0) {
            symbolHTML += '</tr><tr>';
        }
        symbolHTML += '<td><p class='+appData.fonts.feather[i]+'></p></td>';
        k++;

        if (i === (appData.fonts.feather.length - 1)) {
            symbolHTML += "</tr>"
        }
    }

    /* OLD UNICODE SYMOBLS
    let symbolRanges = [[0x2600,0x26FF]]; //,[0x1200, 0x135A],[0xA000, 0xA48C]
    for (let j = 0; j < symbolRanges.length; j++) {

        for (let i = symbolRanges[j][0]; i < symbolRanges[j][1]; i++) {

            if (k % 5 === 0 && k != 0) {
                symbolHTML += '</tr><tr>';
            }

            let symbol = String.fromCodePoint(i);
            symbolHTML += '<td><p>' + symbol + '&#xFE0E;</p></td>';
            k++;

            if (i === (symbolRanges[j][1] - 1)) {
                symbolHTML += "</tr>"
            }
        }
    }
    */

    clickListener(symbolBtn, (i) => {
        // Bring up modal
        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        let termHolder = symbolBtn[i].parentNode.parentNode.parentNode;
        let term = symbolBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

        let view = `<header>
                        <h2 class="symbol">Glyph picker</h2>
                    </header>
                    <p>Click below to add a glyph for "<span class="symbol-term">${term}</span>":</p>
                    <div class="symbol-wrap">
                        <table>${symbolHTML}</table>
                    </div>`;

        // Add view
        modal.querySelector('.content').innerHTML += view;

        symbolListener();
    });
    // Check for clicked symbol
    function symbolListener() {
        let term = document.querySelector('.symbol-term').innerHTML;
        let termWrapper = document.querySelector('.' + term + '');
        let pickedSymbol = "";

        modal.getElementsByTagName('table')[0].addEventListener('click', function(e) {
            e = e || window.event;
            let target = e.target || e.srcElement;
            pickedSymbol = target.getAttribute("class");   
            cl(pickedSymbol);
            // Add symbol to object
            termWrapper.querySelector('.symbol-holder').classList = ('symbol-holder');
            termWrapper.querySelector('.symbol-holder').classList.add(pickedSymbol);
            // Set storage
            ops.storedData.viewedTerms[term].symbol = pickedSymbol;
            localforage.setItem('ops.storedData', ops.storedData);
            // Hide modal
            hideModal(true);
        }, false);
    }
}

// Hide modal
const hideModal = function hideModal(trigger) {
    let modal = document.querySelector('.m-modal');
    let modalClose = modal.querySelector('.close');

    modalClose.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });
    // Programatically close modal
    if (trigger) {
        closeModal();
    }
    // Hide modal
    function closeModal() {
        document.getElementsByTagName('body')[0].classList.remove('modal-active');
        modal.classList.add('hidden');
        modal.querySelector('.content').innerHTML = "";
    }
}
