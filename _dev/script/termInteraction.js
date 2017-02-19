
// Imports
import { cl, clv, clickListener, getTimeComplete } from 'helperFunctions';
import appData from 'verbs';
import ops from 'app';
import { updateDataCount } from 'termCreation';

// Exports
export { revealedBtnHandler, createRevealTimer };

// Handles functions when reveal button clicked
const revealedBtnHandler = function revealedBtnHandler() {

    let revealBtn = document.querySelectorAll('.reveal');

    clickListener(revealBtn, (i) => {

        if (revealBtn[i].classList.contains('disabled')) {
            return false;
        }
        let term = [revealBtn[i].parentNode.querySelector('.term-holder').innerHTML];

        // Updates the revealed view counter
        let countHolder = revealBtn[i].parentNode.querySelector('.term-views');
        let definitionWrapper = revealBtn[i].parentNode.querySelector('.definition-wrapper');
        let definitionHolder = revealBtn[i].parentNode.querySelector('.definition-holder');
        let count = parseInt(countHolder.innerHTML);

        // Show definition
        definitionWrapper.classList.remove('hidden');

        // Increase count by one
        countHolder.innerHTML = count + 1;

        // Pass to updateDataCount function
        let dataCount = updateDataCount('revealedTermCount', term, 1);

        // Set storedData
        ops.storedData.revealedTermCount = dataCount;

        // Starts a timer 
        createRevealTimer(revealBtn[i]);

        // Save to storage
        localforage.setItem('ops.storedData', ops.storedData);
    });
}

// Adds a timer to the reveal button
const createRevealTimer = function createRevealTimer(revealBtn) {

    // If no stored data for reveal countdowns
    if (ops.storedData.revealCountdowns === undefined) {
        ops.storedData.revealCountdowns = {};
    }

    let revealCountdowns = ops.storedData.revealCountdowns || {};
    let term = [revealBtn.parentNode.querySelector('.term-holder').innerHTML];
    let minutes;
    let seconds;
    let startTime;
    let timerEnded = false;
    
    // New timer
    if (revealCountdowns[term] === undefined) {

        minutes = 60;
        seconds = 0;
        startTime = getTimeComplete();

        // Set storedData
        ops.storedData.revealCountdowns[term] = startTime;
    }
    // Existing timer
    else {
        // Get time from start to now
        timeSinceStart();
    }
    function timeSinceStart() {
        let nowTime = getTimeComplete()[0];

        // Get terms start time for countdown
        startTime = revealCountdowns[term][0];

        cl('Hours: '+startTime[2] + ' now: ' + nowTime[2]);
        cl('Minutes: '+startTime[3] + ' now: ' + nowTime[3]);

        // Check remaining timer, format: startTime[day, month, hour, minute, second]
        
        // If day or month are different
        if (startTime[0] !== nowTime[0] || startTime[1] !== nowTime[1]) {
            timerEnded = true;
        } 
        // If more than 2 hours different
        else if (Math.abs(startTime[2] - nowTime[2]) >= 2) {
            timerEnded = true; // Todo hour can break
        }
        // If 1 hour different
        else if (Math.abs(startTime[2] - nowTime[2]) === 1) {
cl('1 hour');
            // NowTime overtaken startTime
            if (startTime[3] < nowTime[3]) {
                cl('ended');
                 timerEnded = true; 
            }
            // Otherwise still under 60 mins
            else {
                minutes = getRemainingMinutes();
                seconds = getRemainingSeconds();
            }
        }
        // Else same hour, subtract remaining minutes
        else {
            minutes = getRemainingMinutes();
            seconds = getRemainingSeconds();
        }
        // Calculate remaining minutes
        function getRemainingMinutes() {
            // If nowTime minutes less, indicates change of hour
            if (startTime[3] > nowTime[3]) {
                // Remaining minutes in hour
                minutes = startTime[3] - nowTime[3];
            }
            // Else same hour, subtract remaining minutes
            else {
                minutes = 59 - (nowTime[3] - startTime[3]);
            }
            return minutes;
        }
        // Calculate remaining seconds
        function getRemainingSeconds() {
            // If nowTime seconds less, indicates change of minute
            if (startTime[4] > nowTime[4]) {
                // Remaining seconds in minute
                seconds = startTime[4] - nowTime[4];
            }
            // Else same minute, subtract remaining seconds
            else {
                seconds = 59 - (nowTime[4] - startTime[4]);
            }
            return seconds;
        }

        // Timer stopped, return to normal
        if (timerEnded === true) {
            delete ops.storedData.revealCountdowns[term];
            return false;
        }
    }

    // Set start time to storage
    localforage.setItem('ops.storedData', ops.storedData);

    let timeout;
    let checkCount = 0;

    // If timer is active
    if (timerEnded === false) {
        // Button timer, use timeout to run in background some browsers
        timeout = setTimeout(timeoutCall, 1000)  
    }

    // Self calling function
    function timeoutCall() {
        // Sync timer in some devices
        checkCount += 1;
        if (checkCount % 5 === 0) {
            //timeSinceStart();
        }
        // Call UI timer build
        buttonTimer();
        timeout = setTimeout(timeoutCall, 1000);
    }

    // Builds the timer
    function buttonTimer() {
        let displayedMinutes = minutes;
        let displayedSeconds = seconds;
        let hiddenZero = '';

        // Timer end
        if (seconds === 0 && minutes === 0) {
            revealBtn.innerHTML = ("Reveal");
            revealBtn.classList.remove('disabled');
            revealBtn.setAttribute("disabled", false);
            return false;
        }

        // Handle issues like zero index
        if (seconds < 10 && seconds > 0) {
            hiddenZero = '0';
        }
        if (seconds === 0) {
            seconds = 60;
            minutes -= 1;
        }
        if (seconds === 60) {
            displayedSeconds = '00';
        }
        // Update DOM
        revealBtn.innerHTML = (displayedMinutes + ':' + hiddenZero + displayedSeconds);
        revealBtn.classList.add('disabled');
        revealBtn.setAttribute("disabled", true);

        // Decrease timer
        seconds -= 1;
    }
};





