//- Global helper functions

// JS ready
export function ready(fn) {
	if (document.readyState != 'loading'){
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
export function clv(term,log) {
	console.log(term+'= '+log);
}

// Creates array of day and month
export function getTodaysDate() {

    // Set opened date to storedData
    let todayDate = [],
        day = new Date().getDate(),
        month = new Date().getMonth();

    todayDate.push(day);
    todayDate.push(month);

    return todayDate;
}

// Check if arrays are the same
export function arrayCheck(arr1, arr2) {

    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

// Resets stored data
export function resetData() {

    document.querySelector('.reset').addEventListener('click', (e) => {
        e.preventDefault;
        localforage.clear();
        cl('App reset');
    })
}
