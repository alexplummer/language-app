'use strict';

var app = function () {
    'use strict';

    //- Global helper functions

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


    // Creates array of day and month
    function getTodaysDate() {

        // Set opened date to storedData
        var todayDate = [],
            day = new Date().getDate(),
            month = new Date().getMonth();

        todayDate.push(day);
        todayDate.push(month);

        return todayDate;
    }

    // Check if arrays are the same
    function arrayCheck(arr1, arr2) {

        if (arr1.length !== arr2.length) return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }

    // Resets stored data
    function resetData() {

        document.querySelector('.reset').addEventListener('click', function (e) {
            e.preventDefault;
            localforage.clear();
            cl('App reset');
        });
    }

    // App data

    var appData = {

        terms: {
            verb_1: { term: "verb_1", definition: "ans_1" },
            verb_2: { term: "verb_2", definition: "ans_2" },
            verb_3: { term: "verb_3", definition: "ans_3" },
            verb_4: { term: "verb_4", definition: "ans_4" },
            verb_5: { term: "verb_5", definition: "ans_5" }
        }
    };

    // Imports
    // Setup stored data
    var storedData$1 = storedData$1 || {};

    // Creates a list of terms
    var getListOfTerms = function getListOfTerms() {

        var i = 0;
        var j = 0;
        var listOfTerms = [];
        var scannedTerms = [];
        var dataLength = Object.keys(appData.terms).length;

        // Prevent overflow
        if (globals$1.displayedTerms > dataLength) {
            globals$1.displayedTerms = dataLength;
        }

        // First time app opened
        if (storedData$1.firstTime === undefined) {

            while (i < globals$1.displayedTerms) {
                var pickedTerm = pickRandom();

                // Ensure term hasn't been already scanned
                if (!listOfTerms.includes(pickedTerm)) {
                    listOfTerms.push(pickedTerm);
                    i++;
                }
            }
        }
        // App opened before
        else {
                var viewedLength = Object.keys(storedData$1.viewedTerms).length;

                while (i < globals$1.displayedTerms) {

                    // If all terms viewed
                    if (viewedLength === dataLength) {
                        var viewedSorted = [];

                        // Convert viewed terms to array
                        for (var term in storedData$1.viewedTerms) {
                            viewedSorted.push([term, storedData$1.viewedTerms[term]]);
                        }
                        // Sort array by view count
                        viewedSorted.sort(function (a, b) {
                            return a[1] - b[1];
                        });
                        // Finish off iterator with lowest viewed terms
                        while (i < globals$1.displayedTerms) {
                            listOfTerms.push(viewedSorted[i][0]);
                            i++;
                        }
                        // Overflow protection
                        i++;
                    } else {
                        var _pickedTerm = pickRandom();
                        // Ensure term hasn't been already scanned
                        if (!scannedTerms.includes(_pickedTerm)) {
                            scannedTerms.push(_pickedTerm);
                            // Ensure term not viewed before
                            if (!storedData$1.viewedTerms.hasOwnProperty(_pickedTerm)) {
                                listOfTerms.push(_pickedTerm);
                                storedData$1.viewedTerms[_pickedTerm] = 0;
                                localforage.setItem('storedData', storedData$1);
                                i++;
                            }
                        }
                    }
                    // Overflow protection
                    if (j > 1000) {
                        i = globals$1.displayedTerms;
                    }
                    j++;
                }
            }
        // Get random terms from data
        function pickRandom() {
            var keys = Object.keys(appData.terms),
                pickedTerm = keys[keys.length * Math.random() << 0];

            return pickedTerm;
        }
        return listOfTerms;
    };

    // Create app view
    var viewCreate = function viewCreate(termsToCreate) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {

            for (var _iterator = termsToCreate[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;


                // Get terms and definitions from data
                var termValue = appData.terms[value].term,
                    definitionValue = appData.terms[value].definition;

                // Create holders
                var newTermHolder = document.createElement('p'),
                    newdefinitionHolder = document.createElement('p');

                // Add classes to holders
                newTermHolder.classList.add('holder-term');
                newdefinitionHolder.classList.add('holder-definition');

                // Add content to holders
                newTermHolder.textContent = termValue;
                newdefinitionHolder.textContent = definitionValue;

                // Add to view
                globals$1.container.appendChild(newTermHolder);
                globals$1.container.appendChild(newdefinitionHolder);

                // Cycle for of loop
                value++;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    // Handles count of viewed terms
    var createViewedTerms = function createViewedTerms(termsToAdd) {

        var viewedTermsData = storedData$1.viewedTerms || {};

        // If no viewed data, create new 
        if (!storedData$1.hasOwnProperty('viewedTerms')) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {

                for (var _iterator2 = termsToAdd[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var value = _step2.value;

                    viewedTermsData[value] = 0;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        // If viewed data exists
        else {
                // If viewed term exists, update count
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = termsToAdd[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _value = _step3.value;


                        if (storedData$1.viewedTerms.hasOwnProperty(_value)) {
                            var count = storedData$1.viewedTerms[_value];
                            count += 1;
                            viewedTermsData[_value] = count;
                        } else {
                            viewedTermsData[termsToAdd] = 0;
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        // Pass back final object
        return viewedTermsData;
    };

    // Imports
    // Global options
    var globals$1 = {
        displayedTerms: 3,
        container: document.querySelector(".container"),
        addDay: false,
        debug: true
    };

    // Setup stored data
    var storedData = storedData || {};

    // Initialise modules on load
    ready(function () {
        'use strict';

        openApp();
        // Resets button
        resetData();
    });

    // Runs when app opens
    var openApp = function openApp() {

        // Check if this is the first time app has run
        localforage.length().then(function (numberOfKeys) {

            // If first time
            if (numberOfKeys === 0) {
                firstTime();
            }
            // Not first time
            else {
                    storedData.firstTime = false;
                    initialise();
                }
        }).catch(function (err) {
            console.log(err);
        });
    };

    // Runs if first time app has run
    var firstTime = function firstTime() {

        // Create terms
        createTermsHandler();

        // Set first time to false
        storedData.firstTime = false;

        // Add to storage
        localforage.setItem('storedData', storedData);
    };

    // Initialises app
    var initialise = function initialise() {

        // Get stored data
        localforage.getItem('storedData').then(function (retrievedData) {
            checkData(retrievedData);
        }).catch(function (err) {
            console.log(err);
        });

        // Handle retrieved data
        function checkData(retrievedData) {

            // Set data in app from storage
            storedData = retrievedData;

            // Check if a new day
            var todaysDate = getTodaysDate();
            var storedDate = [];
            var addOneDay = true;

            // Get date last stored
            storedDate = Array.from(retrievedData.dateOpened);

            // If same day, use dailyTerms data
            if (arrayCheck(todaysDate, storedDate) === true) {
                if (globals$1.addDay === true) {
                    createTermsHandler();
                } else {
                    viewCreate(retrievedData.dailyTerms);
                }
            }
            // Else create new terms
            else {
                    createTermsHandler();
                }
        }
    };

    // Calls functions to handle term creation
    var createTermsHandler = function createTermsHandler() {

        // Get initial terms
        var pickedTerms = getListOfTerms();

        // Create initial view
        viewCreate(pickedTerms);

        // Create opened date, daily terms, viewed terms
        storedData.dateOpened = getTodaysDate();
        storedData.dailyTerms = pickedTerms;
        storedData.viewedTerms = createViewedTerms(pickedTerms);

        // Add to storage
        localforage.setItem('storedData', storedData);
    };

    return globals$1;
}();
//# sourceMappingURL=app.js.map
