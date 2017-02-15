'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

        // Get current day + month
        var todayDate = [];
        var day = new Date().getDate();
        var month = new Date().getMonth();

        todayDate.push([day, month]);

        return todayDate;
    }

    // Creates array of day, month, hour, minute, second
    function getTimeComplete() {

        // Get complete date time value 
        var timeComplete = [];
        var day = new Date().getDate();
        var month = new Date().getMonth();
        var hour = new Date().getHours();
        var minute = new Date().getMinutes();
        var second = new Date().getSeconds();

        timeComplete.push([day, month, hour, minute, second]);

        return timeComplete;
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
            cl('APP RESET');
        });
    }

    // Adds click functionality to selectors
    function clickListener(elements, clickFunction) {
        var _loop = function _loop(i) {
            elements[i].addEventListener("click", function () {
                clickFunction(i);
            });
        };

        for (var i = 0; i < elements.length; i++) {
            _loop(i);
        }
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
    var updateDataCount = function updateDataCount(dataType, termsToAdjust, baseValue) {

        var dataTypeHolder = ops$1.storedData[dataType] || {};

        // If no viewed data, create new 
        if (!ops$1.storedData.hasOwnProperty(dataType)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = termsToAdjust[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    dataTypeHolder[value] = baseValue;
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
                            dataTypeHolder[termsToAdjust] = baseValue;
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
    // Handles functions when reveal button clicked
    var revealedBtnHandler = function revealedBtnHandler() {

        var revealBtn = document.querySelectorAll('.reveal');

        clickListener(revealBtn, function (i) {

            if (revealBtn[i].classList.contains('disabled')) {
                return false;
            }
            var term = [revealBtn[i].parentNode.querySelector('.term-holder').innerHTML];

            // Updates the revealed view counter
            var countHolder = revealBtn[i].parentNode.querySelector('.term-views');
            var definitionHolder = revealBtn[i].parentNode.querySelector('.definition-holder');
            var count = parseInt(countHolder.innerHTML);

            // Show definition
            definitionHolder.classList.add('shown');

            // Increase count by one
            countHolder.innerHTML = count + 1;

            // Pass to updateDataCount function
            var dataCount = updateDataCount('revealedTermCount', term, 1);

            // Set storedData
            ops$1.storedData.revealedTermCount = dataCount;

            // Starts a timer 
            createRevealTimer(revealBtn[i]);

            // Save to storage
            localforage.setItem('ops.storedData', ops$1.storedData);
        });
    };

    // Adds a timer to the reveal button
    var createRevealTimer = function createRevealTimer(revealBtn) {

        // If no stored data for reveal countdowns
        if (ops$1.storedData.revealCountdowns === undefined) {
            ops$1.storedData.revealCountdowns = {};
        }

        var revealCountdowns = ops$1.storedData.revealCountdowns || {};
        var term = [revealBtn.parentNode.querySelector('.term-holder').innerHTML];
        var minutes = void 0;
        var seconds = void 0;
        var startTime = void 0;

        // New timer
        if (revealCountdowns[term] === undefined) {

            minutes = 59;
            seconds = 59;
            startTime = getTimeComplete();

            // Set storedData
            ops$1.storedData.revealCountdowns[term] = startTime;
        }
        // Existing timer
        else {
                var _ret2 = function () {
                    // Calculate remaining seconds
                    var getRemainingSeconds = function getRemainingSeconds() {
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
                    };

                    // Timer stopped, return to normal


                    var nowTime = getTimeComplete()[0];
                    var timerEnded = false;

                    // Get terms start time for countdown
                    startTime = revealCountdowns[term][0];

                    // Check remaining timer, format: startTime[day, month, hour, minute, second]

                    // If day or month are different
                    if (startTime[0] !== nowTime[0] || startTime[1] !== nowTime[1]) {
                        timerEnded = true;
                    }
                    // If more than 2 hours different
                    else if (Math.abs(startTime[2] - nowTime[2]) >= 2) {
                            timerEnded = true;
                        }
                        // If nowTime minutes less, indicates change of hour
                        else if (startTime[3] > nowTime[3]) {
                                // Remaining minutes in hour
                                minutes = startTime[3] - nowTime[3];
                                seconds = getRemainingSeconds();
                            }
                            // Else same hour, subtract remaining minutes
                            else {
                                    minutes = 59 - (nowTime[3] - startTime[3]);
                                    seconds = getRemainingSeconds();
                                }if (timerEnded === true) {
                        return {
                            v: false
                        };
                    }
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }

        // Set start time to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        // Sets a visual timer on the button
        setInterval(function () {
            var displayedMinutes = minutes;
            var displayedSeconds = seconds;
            var hiddenZero = '';

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
            revealBtn.innerHTML = displayedMinutes + ':' + hiddenZero + displayedSeconds;
            revealBtn.classList.add('disabled');
            revealBtn.setAttribute("disabled", true);

            // Decrease timer
            seconds -= 1;
        }, 1000);
    };

    // Imports
    // Create app view
    var viewCreate = function viewCreate(termsToCreate) {

        var viewHTML = "";

        // Create HTML for terms
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = termsToCreate[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var value = _step3.value;


                // Get terms and definitions from data
                var termValue = appData.terms[value].term;
                var definitionValue = appData.terms[value].definition;
                var revealCounter = void 0;
                var viewsCount = void 0;

                // Check storage for revealed count
                if (ops$1.storedData.revealedTermCount === undefined) {
                    viewsCount = 0;
                } else {
                    viewsCount = ops$1.storedData.revealedTermCount[value] || 0;
                }

                // Create view
                var newHolder = '<div class="term-wrapper">\n                <p class="term-holder">' + termValue + '</p>\n                <p class="definition-holder">' + definitionValue + '</p>\n                <p class="term-views">' + viewsCount + '</p>\n                <button class="reveal">Reveal definition</button>\n            </div>';

                viewHTML += newHolder;
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

        ops$1.container.innerHTML = viewHTML;

        // Add countdown timers to term buttons
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = termsToCreate[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _value2 = _step4.value;


                // Check if timer data exists
                if (ops$1.storedData.revealCountdowns !== undefined) {

                    // Add countdown timers to buttons
                    if (ops$1.storedData.revealCountdowns[_value2] !== undefined) {

                        var revealBtn = document.querySelectorAll('.reveal');

                        // Find button node that matches term in DOM
                        for (var i = 0; i < revealBtn.length; i++) {
                            var revealTerm = revealBtn[i].parentNode.querySelector('.term-holder').innerHTML;

                            if (revealTerm === _value2) {
                                createRevealTimer(revealBtn[i]);
                            }
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
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
        ops$1.storedData.viewedTerms = updateDataCount('viewedTerms', pickedTerms, 0);

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        // Handles events for revealed terms
        revealedBtnHandler();

        // Debug code
        if (ops$1.debug === true) {
            cl(ops$1.storedData);
            cl('Revealed terms count:');
            cl(ops$1.storedData.revealedTermCount);
            cl('Viewed terms count:');
            cl(ops$1.storedData.viewedTerms);
            cl('Revealed terms timer:');
            cl(ops$1.storedData.revealCountdowns);
        }
    };

    return ops$1;
}();
//# sourceMappingURL=app.js.map
