'use strict';

var app = function () {
    'use strict';

    // Imports
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

    // Checks if the same or new day
    function checkSameDay() {

        var todaysDate = getTodaysDate();
        var storedDate = [];

        // Get date last stored
        storedDate = Array.from(ops$1.storedData.dateOpened);

        // Check if same day
        if (arrayCheck(todaysDate, storedDate) === true) {
            if (ops$1.addDay === true) {
                ops$1.storedData.newDay = true;
            } else {
                ops$1.storedData.newDay = false;
            }
        }
        // Otherwise a new day
        else {
                ops$1.storedData.newDay = true;
            }
    }

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

        // If same return true
        if (JSON.stringify(arr1) == JSON.stringify(arr2)) {
            return true;
        }
        // Else false
        return false;
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

    // Get a random term
    function pickRandom(objectList) {
        var keys = Object.keys(objectList),
            pickedTerm = keys[keys.length * Math.random() << 0];

        return pickedTerm;
    }

    // App data

    var appData = {

        terms: {
            verb_1: { term: "verb_1", definition: "ans_1", support: "<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>" },
            verb_2: { term: "verb_2", definition: "ans_2", support: "<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>" },
            verb_3: { term: "verb_3", definition: "ans_3", support: "<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>" },
            verb_4: { term: "verb_4", definition: "ans_4", support: "<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>" },
            verb_5: { term: "verb_5", definition: "ans_5", support: "<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>" }
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
                var pickedTerm = pickRandom(appData.terms);

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
                        //if ()
                        // Finish off iterator with lowest viewed terms
                        while (i < ops$1.displayedTerms) {
                            listOfTerms.push(viewedSorted[i][0]);
                            i++;
                        }
                        // Overflow protection
                        i++;
                    }
                    // Still unviewed terms in data
                    else {
                            var _pickedTerm = pickRandom(appData.terms);

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
                    if (j > 10000) {
                        i = ops$1.displayedTerms;
                    }
                    j++;
                }
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
            var definitionWrapper = revealBtn[i].parentNode.querySelector('.definition-wrapper');
            var definitionHolder = revealBtn[i].parentNode.querySelector('.definition-holder');
            var count = parseInt(countHolder.innerHTML);

            // Show definition
            definitionWrapper.classList.remove('hidden');

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
        var timerEnded = false;

        // New timer
        if (revealCountdowns[term] === undefined) {

            minutes = 60;
            seconds = 0;
            startTime = getTimeComplete();

            // Set storedData
            ops$1.storedData.revealCountdowns[term] = startTime;
        }
        // Existing timer
        else {
                // Get time from start to now
                timeSinceStart();
            }
        function timeSinceStart() {
            var nowTime = getTimeComplete()[0];

            // Get terms start time for countdown
            startTime = revealCountdowns[term][0];

            cl('Hours: ' + startTime[2] + ' now: ' + nowTime[2]);
            cl('Minutes: ' + startTime[3] + ' now: ' + nowTime[3]);

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
                delete ops$1.storedData.revealCountdowns[term];
                return false;
            }
        }

        // Set start time to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        var timeout = void 0;
        var checkCount = 0;

        // If timer is active
        if (timerEnded === false) {
            // Button timer, use timeout to run in background some browsers
            timeout = setTimeout(timeoutCall, 1000);
        }

        // Self calling function
        function timeoutCall() {
            // Sync timer in some devices
            checkCount += 1;
            if (checkCount % 5 === 0) {}
            //timeSinceStart();

            // Call UI timer build
            buttonTimer();
            timeout = setTimeout(timeoutCall, 1000);
        }

        // Builds the timer
        function buttonTimer() {
            var displayedMinutes = minutes;
            var displayedSeconds = seconds;
            var hiddenZero = '';

            // Timer end
            if (seconds === 0 && minutes === 0) {
                revealBtn.innerHTML = "Reveal";
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
            revealBtn.innerHTML = displayedMinutes + ':' + hiddenZero + displayedSeconds;
            revealBtn.classList.add('disabled');
            revealBtn.setAttribute("disabled", true);

            // Decrease timer
            seconds -= 1;
        }
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
                var supportValue = appData.terms[value].support;
                var revealCounter = void 0;
                var viewsCount = void 0;

                // Check storage for revealed count
                if (ops$1.storedData.revealedTermCount === undefined) {
                    viewsCount = 0;
                } else {
                    viewsCount = ops$1.storedData.revealedTermCount[value] || 0;
                }

                // Create terms HTML
                var newHolder = '<div class="term-wrapper">\n                <p class="term-holder">' + termValue + '</p>\n                <div class="definition-wrapper hidden">\n                    <p class="definition-holder">' + definitionValue + '</p>\n                    <div class="support-wrapper">' + supportValue + '</div>\n                </div>\n                <p class="term-views">' + viewsCount + '</p>\n                <button class="reveal">Reveal definition</button>\n            </div>';

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

    // Add hearts to page
    var addHearts = function addHearts() {

        // Only show hearts if a new day
        if (ops$1.storedData.newDay === true) {
            var heartHolder = document.querySelector('.hearts');
            var heartsHTML = "";

            // If no hearts data exists
            if (ops$1.storedData.hearts === undefined) {
                ops$1.storedData.hearts = ops$1.points.hearts;
            }
            var hearts = ops$1.storedData.hearts;

            for (var i = 0; i < hearts; i++) {
                heartsHTML += '<p>❤</p>';
            }
            // Add to view
            heartHolder.innerHTML = heartsHTML;

            // Add to storage
            localforage.setItem('ops.storedData', ops$1.storedData);
        }
    };

    // Sets the score
    var setScore = function setScore() {

        var scoreHolder = document.querySelector('.score-holder');

        // Set score if it doesn't exist
        if (ops$1.storedData.score === undefined) {
            ops$1.storedData.score = 0;
        }

        var score = ops$1.storedData.score;

        // Add to view
        scoreHolder.innerHTML = score;
    };

    // Imports
    // Sets up query
    var createNewQuery = function createNewQuery() {

        // If no stored data for reveal countdowns
        if (ops$1.storedData.queryTerms === undefined) {
            ops$1.storedData.queryTerms = {};
        }

        // Pick a term for query
        var randomTerm = void 0;
        var i = 0;

        // Set correctTerms storage if not exists
        if (ops$1.storedData.correctTerms === undefined) {
            ops$1.storedData.correctTerms = {};
        }

        // Set incorrectTerms storage if not exists
        if (ops$1.storedData.incorrectTerms === undefined) {
            ops$1.storedData.incorrectTerms = {};
        }

        // Prevent choosing query already answered correct
        while (i < Object.keys(ops$1.storedData.revealedTermCount).length) {

            // Pick a random term
            randomTerm = pickRandom(ops$1.storedData.revealedTermCount);

            // If query not from correct terms
            if (!ops$1.storedData.correctTerms.hasOwnProperty(randomTerm)) {
                buildQuery();
                break;
            }
            // Else look for another
            i++;
        }

        // Build the query
        function buildQuery() {
            var queryWrapper = document.querySelector('.query-wrapper');
            var queryHolder = document.querySelector('.query-holder');
            var querySubmit = document.querySelector('.query-submit');
            var resultHolder = document.querySelector('.result-holder');
            var scoreHolder = document.querySelector('.score-holder');
            var heartHolder = document.querySelector('.hearts');
            var score = parseInt(scoreHolder.innerHTML);
            var definition = appData.terms[randomTerm].definition;
            var heartCount = ops$1.storedData.hearts;
            var count = 0;

            // Show the query wrapper
            queryWrapper.classList.remove('hidden');

            // Set value of query
            queryHolder.innerHTML = randomTerm;

            // Query outcomes
            querySubmit.addEventListener("click", function () {
                var queryInput = document.querySelector('.query-input').value;

                if (queryInput === definition || queryInput.toUpperCase() === definition.toUpperCase()) {
                    winCase();
                } else if (queryInput === "") {
                    resultHolder.innerHTML = "Enter a definition.";
                } else {
                    loseCase();
                }
            });

            // If definition is right
            function winCase() {
                // Hide the query input
                queryWrapper.classList.add('hidden');
                // Display win message
                resultHolder.innerHTML = "Well done, the definition for <strong>\"" + randomTerm + "\"</strong> is <strong>\"" + definition + "\"</strong>";
                // Add to score
                score += ops$1.points.correct;
                // Update view
                scoreHolder.innerHTML = score;
                // Add to stored data
                ops$1.storedData.score = score;
                ops$1.storedData.correctTerms[randomTerm] = definition;
                // Check if whole term list answered correctly
                if (Object.keys(ops$1.storedData.correctTerms).length === Object.keys(appData.terms).length) {
                    ops$1.storedData.gameWon = true;
                    gameWon();
                }
                // Save to storage
                localforage.setItem('ops.storedData', ops$1.storedData);
            }
            // If definition is wrong
            function loseCase() {
                var queryInput = document.querySelector('.query-input');
                // Update view
                resultHolder.innerHTML = "Try again.";
                // Add placeholder
                queryInput.placeholder = queryInput.value;
                // Remove guess
                queryInput.value = "";
                // Lose a heart
                heartHolder.removeChild(heartHolder.getElementsByTagName('p')[0]);
                count += 1;
                // If all hearts lost
                if (count === heartCount) {
                    // Hide query 
                    queryWrapper.classList.add('hidden');
                    heartHolder.classList.add('hidden');
                    // Update view
                    resultHolder.innerHTML = "Sorry you lose.";
                    // Add to storedDatta 
                    ops$1.storedData.incorrectTerms[randomTerm] = definition;
                    // Save to storage
                    localforage.setItem('ops.storedData', ops$1.storedData);
                }
            }
            // If game won
            function gameWon() {
                cl('game won');
            }
        }
    };

    // Imports
    // Global options
    var ops$1 = {
        displayedTerms: 3,
        container: document.querySelector(".terms-wrapper"),
        addDay: false,
        debug: true,
        points: {
            correct: 50,
            hearts: 3
        },
        storedData: {}
    };

    // Initialise modules on load
    ready(function () {
        'use strict';

        checkFirstTime();
        // Resets button
        resetData();
    });

    // Runs when app opens
    var checkFirstTime = function checkFirstTime() {

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
        appBuildHandler();

        // Set first time to false
        ops$1.storedData.firstTime = false;

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);
    };

    // Initialises data and app
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
            checkSameDay();

            // Start build
            appBuildHandler();
        }
    };

    // Calls functions to handle app creation and running
    var appBuildHandler = function appBuildHandler() {

        // Get initial terms
        var pickedTerms = void 0;

        // If same day, used daily terms
        if (ops$1.storedData.newDay === false) {
            pickedTerms = ops$1.storedData.dailyTerms;
        }
        // Else get new  
        else {
                pickedTerms = getListOfTerms();
            }

        // Create initial view
        viewCreate(pickedTerms);
        addHearts();
        setScore();

        // Create opened date, daily terms, viewed terms
        ops$1.storedData.dateOpened = getTodaysDate();
        ops$1.storedData.dailyTerms = pickedTerms;
        ops$1.storedData.viewedTerms = updateDataCount('viewedTerms', pickedTerms, 0);

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        // Handles events for revealed terms
        revealedBtnHandler();

        // Create query if revealed terms
        if (ops$1.storedData.revealedTermCount !== undefined && ops$1.storedData.newDay === true) {
            createNewQuery();
        }

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
