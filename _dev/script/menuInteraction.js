
// Imports
import { cl, clv, errorReport, clickListener } from 'helperFunctions';
import tinyTerms from 'app';
import { getListOfTerms } from "termCreation";
import { showHome } from "homeScreen";
import { onboardShow } from "introInstructions";
import { hideModal } from 'termInteraction';

// Exports
export { navMenu, footerMenu, optionsDisplay, notifyAsk };

// Nav menu functions
const navMenu = function navMenu() {
    let nav = document.querySelector('.m-nav').querySelectorAll('nav')[0];

    showNav();

    function showNav() {
        document.getElementsByTagName('h1')[0].addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.m-nav').classList.remove('hidden', 'slideOutLeft');
            document.querySelector('.m-nav').classList.add('animated', 'slideInLeft');

            document.querySelector('.nav-bg').classList.add('animated', 'fadeIn');
            document.querySelector('.nav-bg').classList.remove('fadeOut');
            document.getElementsByTagName('body')[0].classList.add('nav-on');

            setTimeout(() => { hideNav() }, 100);
        });
    }

    function hideNav() {
        document.querySelector('.nav-bg').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.m-nav').classList.remove('slideInLeft');
            document.querySelector('.m-nav').classList.add('slideOutLeft');
            document.getElementsByTagName('body')[0].classList.remove('nav-on');

            document.querySelector('.nav-bg').classList.add('fadeOut');
            document.querySelector('.nav-bg').classList.remove('fadeIn');

            setTimeout(() => { showNav() }, 100);
        });
    }

    document.querySelector('.nav-close').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.m-nav').classList.remove('slideInLeft');
        document.querySelector('.m-nav').classList.add('slideOutLeft');
        document.getElementsByTagName('body')[0].classList.remove('nav-on');

        document.querySelector('.nav-bg').classList.add('fadeOut');
        document.querySelector('.nav-bg').classList.remove('fadeIn');

        setTimeout(() => { showNav() }, 100);
    });


    localforage.getItem("tinyTermsAllPicked", function (err, tinyTermsAllPicked) {
        tinyTerms.AllPicked = tinyTermsAllPicked || [];
        let navHTML = nav.innerHTML;

        for (let i = 0; i < tinyTerms.AllPicked.length; i++) {
            navHTML += '<a href="#">' + tinyTerms.AllPicked[i] + '</a>';
        }
        nav.innerHTML = navHTML;

        let navItems = nav.querySelectorAll('a');
        let i = 1;

        do {
            navItems[i].addEventListener('click', function (e) {

                e.preventDefault();
                tinyTerms.pickedList = this.innerHTML;

                localforage.setItem('tinyTermsDefault', tinyTerms.pickedList, () => {
                    location.reload();
                });
            });
            i++
        }
        while (i < navItems.length);

        document.querySelector('.view-all').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.m-nav').classList.add('hidden');
            document.getElementsByTagName('body')[0].classList.remove('nav-on');
            document.getElementsByTagName("body")[0].classList.add("loading");
            showHome();
        });
    });
}

// Footer menu functions
const footerMenu = function footerMenu() {
    let modal = document.querySelector('.m-modal');

    document.querySelector('.refresh').addEventListener('click', (e) => {
        e.preventDefault();
        location.reload();
    });

    document.querySelector('.store').addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        let view = `<header>
                        <h2 class="icon-007-signs">Store</h2>
                    </header>
                    <div class="options store">
                        <p>Paid unlocks:</p>
                        <a href="#" class="points-10-terms"><strong>59p</strong> Get 10 terms a day</a>
                        <p>Points rewards - this list:</p>
                        <a href="#" class="points-refresh-terms"><strong>250</strong> Refresh terms</a>
                        <a href="#" class="points-half-timer"><strong>300</strong> Half timer (1 day)</a>
                        <p>Points rewards - all lists:</p>
                        <a href="#" class="points-neon-colours"><strong>500</strong> Neon colours</a>
                        <a href="#" class="points-solid-symbols"><strong>1000</strong> Solid symbols</a>
                        <a href="#" class="points-star-bg"><strong>3000</strong> Star background</a>
                        <a href="#" class="points-feather-symbols"><strong>5000</strong> Feather symbols</a>
                        <a href="#" class="points-letters-bg"><strong>10,000</strong> Letters background</a>
                        <a href="#" class="points-metal-colours"><strong>50,000</strong> Metal colours</a>
                        <p>Apply code:</p>
                        <input class="" type="text" placeholder="Add code here">
                        <button class="submit">Submit</button>
                    </div>
                    `;
        // Add view
        modal.querySelector('.content').innerHTML += view;

        // Values must match paid unlocks object order in app.js
        let paidItems = [
            '.points-10-terms'
        ];

        // Values must match list unlocks object order in app.js
        let listItems = [
            '.points-refresh-terms',
            '.points-half-timer'
        ];

        // Values must match global unlocks object order in app.js
        let globalItems = [
            '.points-neon-colours',
            '.points-solid-symbols',
            '.points-star-bg',
            '.points-feather-symbols',
            '.points-letters-bg',
            '.points-metal-colours'
        ];

        // God mode..... FEEL THE POWEEERR!!!
        if (tinyTerms[tinyTerms.pickedList].ops.godMode === true) {
            tinyTerms.score = 1000000;
            document.querySelector('.score-holder').innerHTML = tinyTerms.score;
        }

        // Click listener for list store items
        clickListenerFromVar(listItems, (i) => {
            let unlockItem = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.listUnlocks)[i];
            let currentScore = tinyTerms.score;
            let itemCost = tinyTerms[tinyTerms.pickedList].storedData.listUnlocks[unlockItem].points;

            if (currentScore - itemCost > 0) {
                let score = currentScore - itemCost;

                tinyTerms[tinyTerms.pickedList].storedData.listUnlocks[unlockItem].active = 'unlocked';

                // Refresh terms
                if (tinyTerms[tinyTerms.pickedList].storedData.listUnlocks.termsRefresh.active === 'unlocked') {
                    let pickedTerms = getListOfTerms();
                    tinyTerms[tinyTerms.pickedList].storedData.dailyTerms = pickedTerms;
                }
                localforage.setItem('tinyTerms.score', score, () => {
                    // Save to storage
                    localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList], () => {
                        // Refresh
                        location.reload();
                    });
                });
            }
            else {
                let modal = document.querySelector('.m-modal');
                let view = `<header>
                                <h2 class="">Sorry, not enough points</h2>
                            </header>
                            <p>You can earn more points by completing goal meters, passing tests and finishing lists.</p>

                            <button class="home-btn">Close</button>
                            `;

                // Add view
                modal.querySelector(".content").innerHTML = view;
                document.querySelector(".home-btn").addEventListener("click", (e) => {
                    e.preventDefault();
                    hideModal(true);
                });
            }
        });

        // Paid unlocks click listeners
        clickListenerFromVar(paidItems, (i) => {
            let unlockItem = Object.keys(tinyTerms.paidUnlocks)[i];

            if (tinyTerms.paidUnlocks[unlockItem].active === 'unlocked'
                || tinyTerms.paidUnlocks[unlockItem].active === 'inactive') {
                return false;
            }
            else {

                let webView = `<header>
                                    <h2 class="">Available in the app</h2>
                                </header>
                                <p>Download the Android app today to unlock this feature.</p>`;

                if (typeof store !== 'undefined') {
                    store.refresh();
                    let product = store.get("extra items");

                    if (product.owned) {
                        tinyTerms.paidUnlocks[unlockItem].active = 'unlocked';
                        check10();
                    }
                    else {
                        store.order('extra items');

                        store.when("extra items").approved(function (order) {
                            tinyTerms.paidUnlocks[unlockItem].active = 'unlocked';
                            order.finish();
                            check10();
                        });
                    }
                }
                else {
                    modal.querySelector('.content').innerHTML = webView;
                }

                check10();

                function check10() {
                    // 10 terms
                    if (tinyTerms.paidUnlocks.terms10.active === 'unlocked') {
                        let pickedTerms = getListOfTerms();
                        let existingTerms = tinyTerms[tinyTerms.pickedList].storedData.dailyTerms;
                        let joinedTerms = existingTerms.concat(pickedTerms);

                        tinyTerms[tinyTerms.pickedList].storedData.dailyTerms = joinedTerms;

                        localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList], () => {
                            // Save to storage
                            localforage.setItem('tinyTerms.paidUnlocks', tinyTerms.paidUnlocks, () => {
                                // Refresh
                                location.reload();
                            });
                        });
                    }
                }
            }
        });

        // Hide 10 terms
        if (tinyTerms.paidUnlocks.terms10.active === 'unlocked') {
            document.querySelector('.points-10-terms').innerHTML = "(Unlocked)";
        }

        // Click listener for global store items
        clickListenerFromVar(globalItems, (i) => {
            let unlockItem = Object.keys(tinyTerms.globalUnlocks)[i];
            let currentScore = tinyTerms.score;
            let itemCost = tinyTerms.globalUnlocks[unlockItem].points;

            if (tinyTerms.globalUnlocks[unlockItem].active === 'unlocked'
                || tinyTerms.globalUnlocks[unlockItem].active === 'inactive') {
                return false;
            }
            else if (currentScore - itemCost > 0) {
                let score = currentScore - itemCost;

                tinyTerms.globalUnlocks[unlockItem].active = 'unlocked';

                localforage.setItem('tinyTerms.score', score, () => {
                    // Like a christmas tree all up in here
                    localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList], () => {
                        // Save to storage
                        localforage.setItem('tinyTerms.globalUnlocks', tinyTerms.globalUnlocks, () => {
                            // Refresh
                            location.reload();
                        });
                    });
                });
            }
            else {
                let modal = document.querySelector('.m-modal');
                let view = `<header>
                                <h2 class="">Sorry, not enough points</h2>
                            </header>
                            <p>You can earn more points by completing goal meters, passing tests and finishing lists.</p>

                            <button class="home-btn">Close</button>
                            `;

                // Add view
                modal.querySelector(".content").innerHTML = view;
                document.querySelector(".home-btn").addEventListener("click", (e) => {
                    e.preventDefault();
                    hideModal(true);
                });
            }
        });

        // Adds click functionality to selectors
        function clickListenerFromVar(elements, clickFunction) {

            for (let i = 0; i < elements.length; i++) {

                document.querySelector(elements[i]).addEventListener("click", e => {
                    e.preventDefault();
                    clickFunction(i);
                });
            }
        }

        // Menu mod for list unlocked items
        for (let i = 0; i < listItems.length; i++) {
            let unlockItem = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.listUnlocks)[i];

            if (tinyTerms[tinyTerms.pickedList].storedData.listUnlocks[unlockItem].active === 'unlocked') {
                document.querySelector(listItems[i]).parentNode.removeChild(document.querySelector(listItems[i]));
            }
        }

        let buttonOnHTML = `<button class="store-on">Turn on</button>`;
        let buttonOffHTML = `<button class="store-off">Turn off</button>`;

        // Menu mod for global unlocked items
        for (let i = 0; i < globalItems.length; i++) {
            let thisItem = globalItems[i];
            let unlockItem = Object.keys(tinyTerms.globalUnlocks)[i];
            let storedValue = tinyTerms.globalUnlocks[unlockItem].active;

            if (storedValue === 'unlocked') {
                document.querySelector(thisItem).innerHTML = buttonOffHTML;
            }
            if (storedValue === 'inactive') {
                document.querySelector(thisItem).innerHTML = buttonOnHTML;
            }
        }
        // Click listener store off buttons
        for (let i = 0; i < document.querySelectorAll('.store-off').length; i++) {

            document.querySelectorAll('.store-off')[i].addEventListener('click', (e) => {
                e.preventDefault();

                let clickedItem = document.querySelectorAll('.store-off')[i].parentNode.className;
                let thisItem = '.' + clickedItem;
                let itemIndex = globalItems.indexOf('.' + clickedItem);
                let unlockItem = Object.keys(tinyTerms.globalUnlocks)[itemIndex];
                let storedValue = tinyTerms.globalUnlocks[unlockItem].active;

                document.querySelector(thisItem).querySelector('.store-off').outerHTML = buttonOnHTML;

                tinyTerms.globalUnlocks[unlockItem].active = 'inactive';

                // Save to storage
                localforage.setItem('tinyTerms.globalUnlocks', tinyTerms.globalUnlocks, () => {
                    // Refresh
                    location.reload();
                });
            });
        }
        // Click listener store on buttons
        for (let i = 0; i < document.querySelectorAll('.store-on').length; i++) {

            document.querySelectorAll('.store-on')[i].addEventListener('click', (e) => {
                e.preventDefault();

                let clickedItem = document.querySelectorAll('.store-on')[i].parentNode.className;
                let thisItem = '.' + clickedItem;
                let itemIndex = globalItems.indexOf('.' + clickedItem);
                let unlockItem = Object.keys(tinyTerms.globalUnlocks)[itemIndex];
                let storedValue = tinyTerms.globalUnlocks[unlockItem].active;

                document.querySelector(thisItem).querySelector('.store-on').outerHTML = buttonOffHTML;

                tinyTerms.globalUnlocks[unlockItem].active = 'unlocked';

                // Save to storage
                localforage.setItem('tinyTerms.globalUnlocks', tinyTerms.globalUnlocks, () => {
                    // Refresh
                    location.reload();
                });
            });
        }
    });

    document.querySelector('.stats').addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        let name = tinyTerms.pickedList;
        let completed = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.learnedTerms).length;
        let remaining = Object.keys(tinyTerms[tinyTerms.pickedList].terms).length;
        let viewed = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.viewedTerms).length;
        let correct = 0;
        let incorrect = 0;

        if (tinyTerms[tinyTerms.pickedList].storedData.correctTerms !== undefined) {
            correct = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.correctTerms).length;
        }
        if (tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms !== undefined) {
            incorrect = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms).length;
        }

        let learned = [];

        for (let i = 0; i < completed; i++) {
            let learnedTerm = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.learnedTerms)[i];
            let learnedDefinition = tinyTerms[tinyTerms.pickedList].storedData.learnedTerms[learnedTerm];
            learned += '<p class="small">' + learnedTerm + ' - ' + learnedDefinition + '</p>';
        }
        if (completed === 0) {
            learned = '<p class="small">No completed terms, fill some goals!</p>'
        }

        let view = `<header>
                        <h2 class="icon-008-bar-chart">Progress</h2>
                    </header>
                    <div class="options stats">
                        <p><strong>${name}</strong></p>
                        <p><strong>Total completed terms:</strong> <span class="right">${completed} <span class="small">/ ${remaining}</span></span></p>
                        <br>
                        <p><strong>Total viewed terms:</strong> <span class="right">${viewed} <span class="small">/ ${remaining}</span></span></p>
                        <p><strong>Total correct tests:</strong> <span class="right">${correct}</span></p>
                        <p><strong>Total incorrect tests:</strong> <span class="right">${incorrect}</span></p>
                        <h3>Completed terms:</h3>
                        ${learned}
                    </div>
                    `;
        // Add view
        modal.querySelector('.content').innerHTML += view;
    });
}

// Options menu
const optionsDisplay = function optionsDisplay() {
    let modal = document.querySelector('.m-modal');
    let settingsBtn = document.querySelector('.settings');

    settingsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        let view = `<header>
                        <h2 class="icon-cog-outline">Options</h2>
                    </header>
                    <div class="options">
                        <p>Help</p>
                        <a href="#" class="icon-right-open show-tut">Show the tutorial again</a>
                        <a href="mailto:info@tiny-terms.com" class="icon-right-open">Email a question</a>
                        <a href="#" class="icon-right-open feedback">Report a bug/leave feedback</a>
                        <p>More Options</p>
                        <a href="#" class="icon-right-open reminders">Reminders</a>
                        <a href="#" class="icon-right-open reset-list">Reset list progress</a>
                        <a href="#" class="icon-right-open reset">Reset the app</a>
                        <p class="low-header">Credits</p>
                        <p><small>All design and development by Alex Plummer.</small><br>
                        <small>Icons courtesy of <a href="http://www.toicon.com/authors/1">Shannon E Thomas</a> at <a href="http://www.toicon.com">toicon.com</a></small></p>
                    </div>
                    `;

        // Add view
        modal.querySelector('.content').innerHTML += view;

        let resetList = document.querySelector('.reset-list');
        let resetApp = document.querySelector('.reset');

        if (typeof cordova === 'undefined') {
            document.querySelector('.options').removeChild(document.querySelector('.options').querySelector('.reminders'));
        }
        else {
            document.querySelector('.reminders').addEventListener('click', (e) => { e.preventDefault(); notifyAsk() });
        }

        document.querySelector('.show-tut').addEventListener('click', (e) => { e.preventDefault(); onboardShow() });

        document.querySelector('.feedback').addEventListener('click', (e) => { e.preventDefault(); errorReport() });

        function resetMenu() {
            if (document.querySelector('.delete-confirm') !== null) {
                resetList.innerHTML = "Reset list progress";
                resetApp.innerHTML = "Reset the app";
                document.querySelector('.delete-confirm').parentNode.removeChild(document.querySelector('.delete-cancel'));
                document.querySelector('.delete-confirm').parentNode.removeChild(document.querySelector('.delete-confirm'));
            }
        }
        resetList.addEventListener('click', (e) => {
            e.preventDefault();
            resetMenu();
            resetList.innerHTML = "Are you sure you want to delete progress for this list? (Can't undo)";
            resetList.parentNode.insertBefore(document.createElement("div"), resetList.nextSibling);
            resetList.nextSibling.innerHTML = '<button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

            document.querySelector('.delete-confirm').addEventListener('click', () => {
                delete tinyTerms[tinyTerms.pickedList];
                localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]).then(function (value) {
                    localforage.removeItem('tinyTermsDefault').then(function () {
                        location.reload();
                    });
                });
            });
            document.querySelector('.delete-cancel').addEventListener('click', () => {
                hideModal(true);
            });
        });
        document.querySelector('.reset').addEventListener('click', (e) => {
            e.preventDefault();
            resetMenu();
            resetApp.innerHTML = "Are you sure you want to delete all progress for the app? (Can't undo)";
            resetApp.parentNode.insertBefore(document.createElement("div"), resetApp.nextSibling);
            resetApp.nextSibling.innerHTML = '<button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

            document.querySelector('.delete-confirm').addEventListener('click', () => {
                localforage.clear().then(() => {
                    location.reload();
                });
            });
            document.querySelector('.delete-cancel').addEventListener('click', () => {
                hideModal(true);
            });
        });
    });
}

// Ask for reminders
const notifyAsk = function notifyAsk() {
    let modal = document.querySelector('.m-modal');

    modal.classList.remove('hidden');
    document.getElementsByTagName('body')[0].classList.add('modal-active');

    let view = `<header>
                    <h2 class="icon-cog-outline">Reminders</h2>
                </header>
                <div class="m-reminders options">
                    <p>You can configure reminders here, they are really helpful if you keep forgetting to learn terms!</p>
                    <button class="save-times">Save reminders</button>
                    <button class="add-time">New reminder</button>
                    <div class="time-holders">
                    </div>
                </div>
                `;

    // Add view
    modal.querySelector('.content').innerHTML = view;

    let defaultTimes = [[8, 15], [12, 15], [17, 50]];

    tinyTerms[tinyTerms.pickedList].storedData.reminderTimes = tinyTerms[tinyTerms.pickedList].storedData.reminderTimes || defaultTimes;

    // Get stored times, then add to DOM
    getTimes();

    function getTimes() {
        let reminderTimesLength = tinyTerms[tinyTerms.pickedList].storedData.reminderTimes.length;

        document.querySelector('.time-holders').innerHTML = "";

        // Build times based off stored data
        for (let i = 0; i < reminderTimesLength; i++) {
            let hours = tinyTerms[tinyTerms.pickedList].storedData.reminderTimes[i][0];
            let mins = tinyTerms[tinyTerms.pickedList].storedData.reminderTimes[i][1];
            if (mins === 0) { mins = '00' };
            let time = hours + ':' + mins;

            addTime(i, time);
        }
    }

    // Add to DOM
    function addTime(i, time) {
        let timeClass = 'time-' + i;
        let timeTemplate = `<div class="time-wrap ${timeClass}">
                                <input type="text" class="time-input" disabled value="${time}">
                                <button class="change-time">Change</button>
                                <button class="remove-time">Remove</button>
                            </div>`;

        document.querySelector('.time-holders').innerHTML += timeTemplate;
        updateListeners();
    }

    // Add a new time 
    document.querySelector('.add-time').addEventListener('click', (e) => {
        tinyTerms[tinyTerms.pickedList].storedData.reminderTimes.push([12, 0]);
        getTimes();
    });

    // Save reminders
    document.querySelector('.save-times').addEventListener('click', (e) => {
        e.preventDefault();
        saveReminders();

        // Save to storage
        localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]).then(function (value) {
            let view = `<header>
                            <h2 class="icon-cog-outline">Saved</h2>
                        </header>
                        <div class="m-reminders options">
                            <p>Thanks, your reminders have been saved.</p>
                        </div>
                        `;

            // Add view
            modal.querySelector('.content').innerHTML = view;
        });
    });

    function saveReminders() {
        let reminderTimesLength = tinyTerms[tinyTerms.pickedList].storedData.reminderTimes.length;

        // Reset stored
        tinyTerms[tinyTerms.pickedList].storedData.reminderTimes = [];
        cordova.plugins.notification.local.cancelAll(function() {}, this);

        // Build times based off edited times
        let timeButtons = document.querySelectorAll('.time-wrap');
        let timeCount = timeButtons.length;

        for (let i = 0; i < timeCount; i++) {
            let editedTime = document.querySelectorAll('.time-wrap')[i].querySelector('.time-input').value;

            let hours = editedTime.split(":")[0];
            let mins = editedTime.split(":")[1];

            // Add to stored
            tinyTerms[tinyTerms.pickedList].storedData.reminderTimes.push([hours, mins]);

            let theDate = new Date();

            theDate.setHours(hours);
            theDate.setMinutes(mins);
            theDate.setSeconds(0);

            cordova.plugins.notification.local.schedule({
                id: i,
                text: "It's time to learn!",
                firstAt: theDate,
                every: "day",
                led: "e21657"
            });
        }
    }

    // Update listeners for buttons
    function updateListeners() {
        let timeButtons = document.querySelectorAll('.time-wrap');
        let timeCount = timeButtons.length;

        // Edit time
        for (let i = 0; i < timeCount; i++) {
            document.querySelectorAll('.time-wrap')[i].querySelector('.change-time').addEventListener('click', function (e) {
                e.preventDefault();
                let thisToggle = 'x' + i;
                let thisWrap = '.time-' + i;
                let thisInput = document.querySelector(thisWrap).getElementsByTagName('input')[0];

                thisToggle = new mdDateTimePicker.default({
                    type: 'time',
                    mode: true
                });

                thisToggle.time = moment().hours(12).minutes(0);
                thisToggle.toggle();
                thisToggle.trigger = thisInput;

                thisInput.addEventListener('onOk', function () {
                    let hours = thisToggle.time.hours().toString();
                    let mins = thisToggle.time.minutes().toString();

                    if (mins < 10) { mins = '0' + mins };
                    this.value = hours + ':' + mins;
                });
            });

            // Remove time
            document.querySelectorAll('.time-wrap')[i].querySelector('.remove-time').addEventListener('click', function (e) {
                tinyTerms[tinyTerms.pickedList].storedData.reminderTimes.splice(i, 1).pop();
                getTimes();
            });
        }
    }
}