//- Global helper functions

// JS ready
export function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Console log -> cl
export function cl(log) {
    console.log(log);
}

// Console log plus value
export function clv(term, log) {
    console.log(term + '= ' + log);
}

// Creates array of day and month
export function getTodaysDate() {

    // Get current day + month
    let todayDate = [];
    let day = new Date().getDate()
    let month = new Date().getMonth();

    todayDate.push([day, month]);

    return todayDate;
}

// Creates array of day, month, hour, minute, second
export function getTimeComplete() {

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
export function arrayCheck(arr1, arr2) {

    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

// Resets stored data
export function resetData() {

    document.querySelector('.reset').addEventListener('click', (e) => {
        e.preventDefault;
        localforage.clear();
        cl('APP RESET');
    })
}


// Adds click functionality to selectors
export function clickListener(elements, clickFunction) {

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", () => { clickFunction(i) });
    }
}