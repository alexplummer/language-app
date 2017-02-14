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
    // Creates a list of terms
    var getListOfTerms = function getListOfTerms() {

        var i = 0;
        var j = 0;
        var listOfTerms = [];
        var scannedTerms = [];
        var dataLength = Object.keys(appData.terms).length;

        // Prevent overflow
        if (ops$1.displayedTerms > dataLength) {
            ops$1.displayedTerms = dataLength;
        }

        // First time app opened
        if (ops$1.storedData.firstTime === undefined) {

            while (i < ops$1.displayedTerms) {
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

                while (i < ops$1.displayedTerms) {
                    var viewedLength = Object.keys(ops$1.storedData.viewedTerms).length;

                    // If all terms viewed
                    if (viewedLength === dataLength) {

                        var viewedSorted = [];

                        // Convert viewed terms to array
                        for (var term in ops$1.storedData.viewedTerms) {
                            viewedSorted.push([term, ops$1.storedData.viewedTerms[term]]);
                        }

                        // Sort array by view count
                        viewedSorted.sort(function (a, b) {
                            return a[1] - b[1];
                        });

                        // Finish off iterator with lowest viewed terms
                        while (i < ops$1.displayedTerms) {
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
                            if (!ops$1.storedData.viewedTerms.hasOwnProperty(_pickedTerm)) {
                                listOfTerms.push(_pickedTerm);
                                ops$1.storedData.viewedTerms[_pickedTerm] = 0;
                                localforage.setItem('ops.storedData', ops$1.storedData);
                                i++;
                            }
                        }
                    }
                    // Overflow protection
                    if (j > 1000) {
                        i = ops$1.displayedTerms;
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
        // Return final list of terms
        return listOfTerms;
    };

    // Handles count of a type of data
    var updateDataCount = function updateDataCount(dataType, termsToAdjust) {

        var dataTypeHolder = ops$1.storedData[dataType] || {};

        // If no viewed data, create new 
        if (!ops$1.storedData.hasOwnProperty(dataType)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = termsToAdjust[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    dataTypeHolder[value] = 0;
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
        }
        // If viewed data exists
        else {
                // If viewed term exists, update count
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = termsToAdjust[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _value = _step2.value;


                        if (ops$1.storedData[dataType].hasOwnProperty(_value)) {
                            var count = ops$1.storedData[dataType][_value];
                            count += 1;
                            dataTypeHolder[_value] = count;
                        } else {
                            dataTypeHolder[termsToAdjust] = 0;
                        }
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
        // Pass back final object
        return dataTypeHolder;
    };

    // Imports
    // Setup stored data

    var createRevealedCount = function createRevealedCount() {

        var revealBtn = document.querySelectorAll('.reveal');

        var _loop = function _loop(i) {

            revealBtn[i].addEventListener("click", function () {
                var term = [revealBtn[i].parentNode.querySelector('.term-holder').innerHTML];
                var countHolder = revealBtn[i].parentNode.querySelector('.term-views');
                var count = parseInt(countHolder.innerHTML);

                countHolder.innerHTML = count + 1;
                ops$1.storedData.revealedTermCount = updateDataCount('revealedTermCount', term);
                localforage.setItem('ops.storedData', ops$1.storedData);
            });
        };

        for (var i = 0; i < revealBtn.length; i++) {
            _loop(i);
        }
    };

    // Imports
    // Create app view
    var viewCreate = function viewCreate(termsToCreate) {

        var viewHTML = [];

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = termsToCreate[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var value = _step3.value;


                // Get terms and definitions from data
                var termValue = appData.terms[value].term;
                var definitionValue = appData.terms[value].definition;
                var viewsCount = void 0;

                if (ops$1.storedData.revealedTermCount === undefined) {
                    viewsCount = 0;
                } else {
                    viewsCount = ops$1.storedData.revealedTermCount[value] || 0;
                }

                // Create view
                var newHolder = '<div class="term-wrapper">\n                <p class="term-holder">' + termValue + '</p>\n                <p class="definition-holder">' + definitionValue + '</p>\n                <p class="term-views">' + viewsCount + '</p>\n                <button class="reveal">Reveal definition</button>\n            </div>';

                viewHTML.push(newHolder);
                // Cycle for of loop
            }
            // Add to view
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

        viewHTML = viewHTML.join('');
        ops$1.container.innerHTML = viewHTML;
    };

    // Imports
    // Global options
    var ops$1 = {
        displayedTerms: 3,
        container: document.querySelector(".container"),
        addDay: true,
        debug: true,
        storedData: {}
    };

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
                    ops$1.storedData.firstTime = false;
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
        ops$1.storedData.firstTime = false;

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);
    };

    // Initialises app
    var initialise = function initialise() {

        // Get stored data
        localforage.getItem('ops.storedData').then(function (retrievedData) {
            checkData(retrievedData);
        }).catch(function (err) {
            console.log(err);
        });

        // Handle retrieved data
        function checkData(retrievedData) {

            // Set data in app from storage
            ops$1.storedData = retrievedData;

            // Check if a new day
            var todaysDate = getTodaysDate();
            var storedDate = [];
            var addOneDay = true;

            // Get date last stored
            storedDate = Array.from(retrievedData.dateOpened);

            // If same day, use dailyTerms data
            if (arrayCheck(todaysDate, storedDate) === true) {
                if (ops$1.addDay === true) {
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
        ops$1.storedData.dateOpened = getTodaysDate();
        ops$1.storedData.dailyTerms = pickedTerms;
        ops$1.storedData.viewedTerms = updateDataCount('viewedTerms', pickedTerms);

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        // Handles counter for revealed terms
        createRevealedCount();

        // Debug code
        if (ops$1.debug === true) {
            cl(ops$1.storedData);
            cl('Revealed terms count:');
            cl(ops$1.storedData.revealedTermCount);
            cl('Viewed terms count:');
            cl(ops$1.storedData.viewedTerms);
        }
    };

    return ops$1;
}();
//# sourceMappingURL=app.js.map
