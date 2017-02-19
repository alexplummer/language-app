
// Imports
import ops from 'app';

// Exports
export { ready, cl, clv, checkSameDay, resetData, arrayCheck, getTodaysDate, pickRandom, clickListener, getTimeComplete };

// JS ready
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Console log -> cl
function cl(log) {
    console.log(log);
}

// Console log plus value
function clv(term, log) {
    console.log(term + '= ' + log);
}

// Checks if the same or new day
function checkSameDay() {
    
    let todaysDate = getTodaysDate();
    let storedDate = [];

    // Get date last stored
    storedDate = Array.from(ops.storedData.dateOpened);

    // Check if same day
    if (arrayCheck(todaysDate, storedDate) === true) {
        if (ops.addDay === true) { ops.storedData.newDay = true }
        else { ops.storedData.newDay = false }
    }
    // Otherwise a new day
    else {
        ops.storedData.newDay = true;
    }
}

// Creates array of day and month
function getTodaysDate() {

    // Get current day + month
    let todayDate = [];
    let day = new Date().getDate()
    let month = new Date().getMonth();

    todayDate.push([day, month]);

    return todayDate;
}

// Creates array of day, month, hour, minute, second
function getTimeComplete() {

    // Get complete date time value 
    let timeComplete = [];
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();

    timeComplete.push([day, month, hour, minute, second]);

    return timeComplete;
}

// Check if arrays are the same
function arrayCheck(arr1, arr2) {

    // If same return true
    if (JSON.stringify(arr1) == JSON.stringify(arr2)) {
        return true;
    }
    // Else false
    return false;
}

// Resets stored data
function resetData() {

    document.querySelector('.reset').addEventListener('click', (e) => {
        e.preventDefault;
        localforage.clear();
        cl('APP RESET');
    })
}

// Adds click functionality to selectors
function clickListener(elements, clickFunction) {

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", () => { clickFunction(i) });
    }
}

// Get a random term
function pickRandom(objectList) {
    let keys = Object.keys(objectList),
        pickedTerm = keys[keys.length * Math.random() << 0];

    return pickedTerm;
}