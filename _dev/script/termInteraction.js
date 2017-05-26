
// Imports
import { cl, clv, clickListener, alertMsg, jsonp, findKeys, findOneKey, makeSafeClass } from 'helperFunctions';
import appData from 'appData';
import tinyTerms from 'app';
import { createNewQuery } from 'queryInteraction';
import { setScore, addHearts, progressBar, goalMeters } from 'viewCreation';

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

        // Explode!!
        let explode = revealBtn[i].parentNode.parentNode.querySelector('.explosion');

        explode.classList.add('explode');

        setTimeout(() => explode.classList.remove('explode'), 1000);

        let term = [revealBtn[i].parentNode.parentNode.querySelector('.term-holder').innerHTML];

        // Updates the revealed view counter
        let countHolder = revealBtn[i].parentNode.querySelector('.count');
        let definitionWrapper = revealBtn[i].parentNode.parentNode.querySelector('.definition-wrapper');
        let definitionHolder = revealBtn[i].parentNode.parentNode.querySelector('.definition-holder');
        let count = parseInt(countHolder.innerHTML);

        // Show definition
        definitionWrapper.classList.remove('hidden');

        // Animations
        definitionWrapper.classList.add('slideInUp', 'animated');
        revealBtn[i].parentNode.classList.add('rubberBand', 'animated');

        // Set storedData
        tinyTerms[tinyTerms.pickedList].storedData.viewedTerms = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms || {};
        tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term] = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term] || {};
        tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].viewCount = tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].viewCount || 0;
        tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].viewCount += 1;

        // Daily reveal bonus
        let revealGoalCount;

        // If no existing term bonus
        if (tinyTerms[tinyTerms.pickedList].storedData.revealGoal[term] === undefined) {
            revealGoalCount = 1;
        }

        // Add one to daily bonus
        else {
            revealGoalCount = tinyTerms[tinyTerms.pickedList].storedData.revealGoal[term];
            revealGoalCount += 1;
        }

        // Update DOM
        countHolder.innerHTML = revealGoalCount;

        // Add to goal meter
        goalMeters();

        // If bonus is met
        if (revealGoalCount === tinyTerms[tinyTerms.pickedList].ops.revealGoalTarget) {

            // Add term to learned terms list
            tinyTerms[tinyTerms.pickedList].storedData.learnedTerms = tinyTerms[tinyTerms.pickedList].storedData.learnedTerms || {};
            tinyTerms[tinyTerms.pickedList].storedData.learnedTerms[term] = tinyTerms[tinyTerms.pickedList].terms[term].definition;

            // Check if whole term list answered correctly
            if (Object.keys(tinyTerms[tinyTerms.pickedList].storedData.learnedTerms).length === Object.keys(tinyTerms[tinyTerms.pickedList].terms).length) {
                tinyTerms[tinyTerms.pickedList].storedData.gameWon = true;
                gameWon();
            }

            // If game won
            function gameWon() {
                let modal = document.querySelector('.m-modal');

                // Bring up modal
                modal.classList.remove('hidden');
                document.getElementsByTagName('body')[0].classList.add('modal-active');

                let view = `<header>
                                <h2 class="">Whoop whoop!!</h2>
                            </header>
                            <p>Well done you completed the whole list! You get a bonus 10 points for each term learned.</p>
                            <p>You can keep learning this list, reset it in the options to start from scratch or move on to
                            learn something new entirely.</p>
                            <p><strong>Great job!</strong></p>`;

                // Add view
                modal.querySelector('.content').innerHTML += view;

                // Award bonus points
                let completeBonus = Object.keys(tinyTerms[tinyTerms.pickedList].terms).length * tinyTerms[tinyTerms.pickedList].ops.points.winBonus;

                // Add to score
                let score = tinyTerms.score;
                score += completeBonus;
                // Update view
                scoreHolder.innerHTML = score;
                // Add to stored data
                tinyTerms.score = score;
                // Save to storage
                localforage.setItem('tinyTerms.score', score);
            }

            // Update progress bar
            progressBar();

            // If daily bonus not already triggered
            if (tinyTerms[tinyTerms.pickedList].storedData.revealGoal.complete === false) {

                // Keep query active 
                tinyTerms[tinyTerms.pickedList].storedData.queryComplete = false;

                // Delete hearts
                delete tinyTerms[tinyTerms.pickedList].storedData.hearts;

                // Create a new query
                createNewQuery(true);
            }
            // Set only once a day
            tinyTerms[tinyTerms.pickedList].storedData.revealGoal.complete = true;

            // Add to score
            let score = tinyTerms.score;
            score += tinyTerms[tinyTerms.pickedList].ops.points.dailyBonus;
            // Update view
            document.querySelector('.score-holder').innerHTML = score;
            // Add to stored data
            tinyTerms.score = score;
            // Save to storage
            localforage.setItem('tinyTerms.score', score);
        }
        tinyTerms[tinyTerms.pickedList].storedData.revealGoal[term] = revealGoalCount;

        // Save to storage
        localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

        // Starts a timer 
        createRevealTimer(revealBtn[i]);
    });
}

// Adds a timer to the reveal button
const createRevealTimer = function createRevealTimer(revealBtn) {

    // If no stored data for reveal countdowns
    tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns = tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns || {};

    let term = [revealBtn.parentNode.parentNode.querySelector('.term-holder').innerHTML];
    let minutes = tinyTerms[tinyTerms.pickedList].ops.counterMins;
    let seconds = tinyTerms[tinyTerms.pickedList].ops.counterSecs;
    let remainingMinutes;
    let remainingSeconds;
    let startTime;
    let timerEnded;

    // New timer
    if (tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[term] === undefined) {

        // Get a new time
        startTime = new Date().getTime();

        // Set storedData
        tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[term] = {
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
        startTime = tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[term].startTime;
        timerEnded = tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[term].timerEnded;

        // Get difference in seconds
        let diffSecs = Math.floor((nowTime - startTime) / 1000);
        // Get total in seconds
        let totalSecs = (tinyTerms[tinyTerms.pickedList].ops.counterMins * 60) + seconds;

        // NowTime overtaken startTime
        if (diffSecs >= totalSecs) {
            timerEnded = true;
            // Stop interval
            clearInterval(tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[term].timerUpdate);
            // Clear storage for term timer
            delete tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[term];
        }
        // Timer stopped, return to normal
        if (timerEnded === true) {
            localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
            return false;
        }
        // Set remaining time 
        remainingSeconds = totalSecs - diffSecs;
    }

    // Set start time to storage
    localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

    let timeout;
    let checkCount = 0;

    // If timer is active   
    if (timerEnded === false) {

        // Start timer interval
        tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns[term].timerUpdate = setInterval(() => {
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

        let languages = {
            'German': 'de-DE',
            'English': 'en-GB',
            'Spanish': 'es-ES',
            'French': 'fr-FR',
            'Italian': 'it-IT',
            'Portuguese': 'pt-BR'
        }

        if (typeof TTS === "undefined") {
            let speech = new SpeechSynthesisUtterance(termHolder[i].innerHTML);
            speech.lang = languages[tinyTerms[tinyTerms.pickedList].speechLang];

            window.speechSynthesis.speak(speech);
        }
        else {
            TTS
                .speak({
                    text: termHolder[i].innerHTML,
                    locale: languages[tinyTerms[tinyTerms.pickedList].speechLang],
                    rate: 1
                }, function () {
                }, function (reason) {
                    alertMsg(reason);
                });
        }
    });
    if (tinyTerms[tinyTerms.pickedList].speechLang === "None") {
        for (let k = 0; k < termHolder.length; k++) {
            termHolder[k].classList.add('no-speak');
        }
    }
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
                        <h2 class="dictionary">Further study</h2>
                    </header>
                    <h3>Practice writing</h3>
                    <textarea class="writing-practice" placeholder="Write the definition here, alone or as part of a sentance."></textarea>
                    <button class="writing-check">Check</button>
                    <h3 class="dotted">Dictionary definitions</h3>
                    <p>${term}:</p>
                    <ul class="definitions"></ul>
                    <h3 class="dotted">Wiki info</h3>
                    <ul class="wiki-link-wrapper"></ul>
                    <div class="wiki-result"></div>
                    `;

        modal.querySelector('.content').innerHTML += view;

        // Check practice writing
        document.querySelector('.writing-check').addEventListener('click',(e) => {
            e.preventDefault();
            let practiceContent = document.querySelector('.writing-practice').value.toUpperCase();
            let definition = tinyTerms[tinyTerms.pickedList].terms[term].definition.toUpperCase();

            if (practiceContent.indexOf(definition) > -1) {
                document.querySelector('.writing-practice').value = "";
                document.querySelector('.writing-practice').placeholder = "Well done, that's correct!"; 
            }
            else {
                document.querySelector('.writing-practice').value = "";
                document.querySelector('.writing-practice').placeholder = "That's incorrect, try again.";
            }
        });

        // Make JSONP call to Glosbe API
        let definitionHolder = modal.querySelector('.definitions');
        let dictionaryLookup = encodeURI('https://glosbe.com/gapi/translate?from=' + tinyTerms[tinyTerms.pickedList]
            .dictFrom + '&dest=' + tinyTerms[tinyTerms.pickedList]
                .dictTo + '&format=json&pretty=true&phrase=' + term.toLowerCase() + '');

        // Make request to Glosbe
        jsonp(dictionaryLookup)
            .then(function (data) {
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
                    if (data.tuc === undefined || data.tuc.length === 0) {
                        dictionaryResponses = "(Sorry, no dictionary results found)"
                    }
                    // Add to DOM
                    definitionHolder.innerHTML = dictionaryResponses;
                }
                catch (err) {
                    console.log(err);
                }
            });

        // Wiki lookup
        jsonp('https://' + tinyTerms[tinyTerms.pickedList].dictFrom + '.wikipedia.org/w/api.php?action=opensearch&limit=3&namespace=0&format=json&search=' + term).then(function (data) {

            // List out wiki results
            for (let i = 0; i < 3; i++) {

                if (data[1][i] !== undefined) {
                    document.querySelector('.wiki-link-wrapper').innerHTML += '<li><a href="#" class="wiki-link">' + data[1][i] + '</a></li>';
                }
            }

            // List out wiki results
            let wikiLink = document.querySelectorAll('.wiki-link');

            wikiLink[0].classList.add('active');

            // Write out the first result
            let firstTerm = wikiLink[0].innerHTML;

            jsonp('https://' + tinyTerms[tinyTerms.pickedList].dictFrom + '.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&redirects=true&titles=' + firstTerm).then(function (data) {

                let result = Object.keys(data.query.pages)[0];
                result = data.query.pages[result].extract;

                if (result === undefined) { 
                    jsonp('https://' + tinyTerms[tinyTerms.pickedList].dictFrom + '.wikipedia.org/w/api.php?action=parse&prop=text&page=' + firstTerm).then(function (data) {
                        result = JSON.parse(data.parse.text["*"]);
                    });
                }
                if (result === undefined) { 
                    result = "Sorry, no info found.";
                }
                document.querySelector('.wiki-result').innerHTML = result;
            });

            // Add event listeners for other results
            for (let j = 0; j < wikiLink.length; j++) {

                wikiLink[j].addEventListener('click', (e) => {
                    e.preventDefault();
                    let term = wikiLink[j].innerHTML;

                    document.querySelector('.active').classList.remove('active');
                    wikiLink[j].classList.add('active');

                    jsonp('https://' + tinyTerms[tinyTerms.pickedList].dictFrom + '.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&redirects=true&titles=' + term).then(function (data) {

                        let result = Object.keys(data.query.pages)[0];
                        result = data.query.pages[result].extract;

                        if (result === undefined) { 
                            jsonp('https://' + tinyTerms[tinyTerms.pickedList].dictFrom + '.wikipedia.org/w/api.php?action=parse&prop=text&page=' + term).then(function (data) {
                                result = JSON.parse(data.parse.text["*"]);
                            });
                        }
                        if (result === undefined) { 
                            result = "Sorry, no info found.";
                        }
                        document.querySelector('.wiki-result').innerHTML = result;
                    });
                })
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
                    <p>Click below to add a colour for <br>"<span class="colour-term">${term}</span>":</p>
                    <ul class="colour-wrap">
                        <li><a href="#" data-colour="#F44336"></a></li>
						<li><a href="#" data-colour="#E91E63"></a></li>
						<li><a href="#" data-colour="#9C27B0"></a></li>
						<li><a href="#" data-colour="#3F51B5"></a></li>
						<li><a href="#" data-colour="#2196F3"></a></li>
						<li><a href="#" data-colour="#009688"></a></li>
                        <br>
                        <li><a href="#" data-colour="#4CAF50"></a></li>
                        <li><a href="#" data-colour="#CDDC39"></a></li>
                        <li><a href="#" data-colour="#FFC107"></a></li>
                        <li><a href="#" data-colour="#FF5722"></a></li>
                        <li><a href="#" data-colour="#212121"></a></li>
                        <li><a href="#" class="no-colour" data-colour="#fff"></a></li>
                    </ul>`;

        let neonColours = `
                           <li><a href="#" data-colour="#FF0099"></a></li>
                           <li><a href="#" data-colour="#83F52C"></a></li>
                           <li><a href="#" data-colour="#FD1C03"></a></li>
                           <li><a href="#" data-colour="#00FFFF"></a></li>
                           <li><a href="#" data-colour="#9D00FF"></a></li>
                           <li><a href="#" data-colour="#E6FB04"></a></li>
                            `;

        let metalColours = `
                           <li><a href="#" data-colour="#CC9900"></a></li>
                           <li><a href="#" data-colour="#C0C0C0"></a></li>
                           <li><a href="#" data-colour="#CD7f32"></a></li>
                            `;

        // Add view
        modal.querySelector('.content').innerHTML += view;

        // Unlocks
        if (tinyTerms.globalUnlocks !== undefined) {

            // Neon colours
            if (tinyTerms.globalUnlocks.coloursNeon.active === 'unlocked') {
                modal.querySelector('.colour-wrap').innerHTML += neonColours;
            }

            // Metal colours
            if (tinyTerms.globalUnlocks.coloursMetal.active === 'unlocked') {
                modal.querySelector('.colour-wrap').innerHTML += metalColours;
            }
        }

        let coloursHolder = modal.querySelector('.colour-wrap');

        // Add colour vars
        colours = coloursHolder.getElementsByTagName('a');

        for (let j = 0; j < colours.length; j++) {
            colours[j].style.backgroundColor = colours[j].getAttribute('data-colour');
        }
        colourListener();
    });

    // Add colour function
    function colourListener() {
        let term = document.querySelector('.colour-term').innerHTML;
        let termEncode = makeSafeClass(term);
        let termWrapper = document.querySelector('.' + termEncode + '');

        // Pick a colour
        clickListener(colours, (i) => {
            let pickedColour = colours[i].getAttribute('data-colour');

            // Add colour to object
            termWrapper.querySelector('.theme-holder').style.background = pickedColour;
        
            if (pickedColour !== "#fff") {
                termWrapper.querySelector('.term-holder').style.color = "#fff";
                termWrapper.classList.add('bg-active');
            }

            // Set storage
            tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].colour = pickedColour;
            localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

            // Hide modal
            hideModal(true);
        });
        document.querySelector('.no-colour').addEventListener('click', (e) => {
            termWrapper.querySelector('.term-holder').style.color = "#3F4747";
            // Set storage
            delete tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].colour;
            localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
        });
    }
}

// Symbol picker
const pickSymbol = function pickSymbol() {
    let modal = document.querySelector('.m-modal');
    let symbolBtn = document.querySelectorAll('.symbol');
    let symbolHTML = "<tr>";
    let symbols = appData.fonts;

    // Solid symbols
    if (tinyTerms.globalUnlocks.symbolsSolid.active === 'unlocked') {

        symbolHTML += '<table>';
        let k = 0;

        for (let i = 0; i < appData.fonts.solid.length; i++) {

            if (k % 5 === 0 && k != 0) {
                symbolHTML += '</tr><tr>';
            }
            symbolHTML += '<td><p class=' + appData.fonts.solid[i] + '></p></td>';
            k++;

            if (i === (appData.fonts.solid.length - 1)) {
                symbolHTML += "</tr>"
            }
        }
        symbolHTML += '</table>';
    }

    // Feather symbols
    if (tinyTerms.globalUnlocks.symbolsFeather.active === 'unlocked') {

        symbolHTML += '<table>';
        let k = 0;

        for (let i = 0; i < appData.fonts.light.length; i++) {

            if (k % 5 === 0 && k != 0) {
                symbolHTML += '</tr><tr>';
            }
            symbolHTML += '<td><p class=' + appData.fonts.light[i] + '></p></td>';
            k++;

            if (i === (appData.fonts.light.length - 1)) {
                symbolHTML += "</tr>"
            }
        }

        symbolHTML += '</table>';
    }

    symbolHTML += '<table>';
    let k = 0;

    // Default symbols
    for (let i = 0; i < appData.fonts.feather.length; i++) {



        if (k % 5 === 0 && k != 0) {
            symbolHTML += '</tr><tr>';
        }
        symbolHTML += '<td><p class=' + appData.fonts.feather[i] + '></p></td>';
        k++;

        if (i === (appData.fonts.feather.length - 1)) {
            symbolHTML += "</tr>"
        }
    }

    symbolHTML += '</table>';

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
                    <p>Click below to add a glyph for <br>"<span class="symbol-term">${term}</span>":</p>
                    <div class="symbol-wrap">
                        <a href="#" class="symbol-clear icon-right-open">Clear selected symbol</a>
                        ${symbolHTML}
                    </div>`;

        // Add view
        modal.querySelector('.content').innerHTML += view;

        symbolListener();
    });
    // Check for clicked symbol
    function symbolListener() {
        let term = document.querySelector('.symbol-term').innerHTML;
        let termEncode = makeSafeClass(term);
        let termWrapper = document.querySelector('.' + termEncode + '');
        let pickedSymbol = "";

        for (let i = 0; i < modal.getElementsByTagName('table').length; i++) {
            symbolClickListener(modal.getElementsByTagName('table')[i]);
        }

        function symbolClickListener(eachTable) {

            eachTable.addEventListener('click', function (e) {
                e = e || window.event;
                let target = e.target || e.srcElement;
                pickedSymbol = target.getAttribute("class");
                // Add symbol to object
                termWrapper.querySelector('.symbol-holder').classList = ('symbol-holder');
                termWrapper.querySelector('.symbol-holder').classList.add(pickedSymbol);
                // Set storage
                tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].symbol = pickedSymbol;
                localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
                // Hide modal
                hideModal(true);
            }, false);
        }

        document.querySelector('.symbol-clear').addEventListener('click', (e) => {
            // Set storage
            termWrapper.querySelector('.symbol-holder').classList = ('symbol-holder');
            delete tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].symbol;
            localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
            hideModal(true);
        });
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
