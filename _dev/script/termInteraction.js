
// Imports
import { cl, clv, clickListener, jsonp, findKeys } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { createNewQuery } from 'queryInteraction';
import { updateDataCount } from 'termCreation';
import { setScore, addHearts } from 'viewCreation';

// Exports
export { revealedBtnHandler, createRevealTimer, dictionaryLookup };

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

        // Increase count by one
        countHolder.innerHTML = count + 1;

        // Pass to updateDataCount function
        let dataCount = updateDataCount('revealedTermCount', term, 1);

        // Set storedData
        ops.storedData.revealedTermCount = dataCount;

        // Daily reveal bonus
        let revealBonusCount;

        // If no daily bonus data
        if (ops.storedData.revealDailyBonus === undefined) {
            ops.storedData.revealDailyBonus = {};
        }
        // If no existing term bonus
        if (ops.storedData.revealDailyBonus[term] === undefined) {
            revealBonusCount = 1;
        }
        // Add one to daily bonus
        else {
            revealBonusCount = ops.storedData.revealDailyBonus[term];
            revealBonusCount += 1;
        }
        // If bonus is met
        if (revealBonusCount === ops.revealDailyBonusTarget) {
            // If daily bonus not already triggered
            if (ops.storedData.revealDailyBonus.complete === false) {
                // Keep query active 
                ops.storedData.queryComplete = false;
                // Create a new query
                createNewQuery();
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
    if (ops.storedData.revealCountdowns === undefined) {
        ops.storedData.revealCountdowns = {};
    }

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

    // Builds the timer
    function buttonTimer() {
        let displayedMinutes = Math.floor(remainingSeconds / 60);
        let displayedSeconds = remainingSeconds % 60;
        let hiddenZero = '';

        // Timer end
        if (remainingSeconds === 0) {
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

const dictionaryLookup = function dictionaryLookup() {

    let dictionaryBtn = document.querySelectorAll('.lookup');
    let modal = document.querySelector('.m-modal');
    let definitionHolder = document.querySelector('.dictionary-definitions');

    clickListener(dictionaryBtn, (i) => {
        let term = dictionaryBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

        // Bring up modal
        modal.classList.remove('hidden');
        document.querySelector('.container').classList.add('modal-active');
        modal.getElementsByTagName('p')[0].innerHTML = term+":";

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
                                dictionaryResponses += '<li>'+obj[i]+'</li>';
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
                cl('error');
            }
        })
    });

    // Hide modal, clear it's contents
    let modalClose = modal.querySelector('.close');

    modalClose.addEventListener("click", () => {
        // Hide modal
        modal.classList.add('hidden');
        document.querySelector('.container').classList.remove('modal-active');
        defintionHolder.innerHTML = "";
    })
}



