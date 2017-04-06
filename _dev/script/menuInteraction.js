
// Imports
import { cl, clv, errorReport } from 'helperFunctions';
import tinyTerms from 'app';
import { showHome } from "homeScreen";
import { onboardShow } from "introInstructions";
import { hideModal } from 'termInteraction';

// Exports
export { navMenu, footerMenu, optionsDisplay };

// Nav menu functions
const navMenu = function navMenu() {
    let nav = document.querySelector('.m-nav').querySelectorAll('nav')[0];

    showNav();

    function showNav() {
        document.getElementsByTagName('h1')[0].addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.m-nav').classList.remove('hidden');
            document.getElementsByTagName('body')[0].classList.add('nav-on');

            setTimeout(() => { hideNav() }, 100);
        });
    }

    function hideNav() {
        document.querySelector('.nav-bg').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.m-nav').classList.add('hidden');
            document.getElementsByTagName('body')[0].classList.remove('nav-on');

            setTimeout(() => { showNav() }, 100);
        });
    }

    document.querySelector('.nav-close').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.m-nav').classList.add('hidden');
        document.getElementsByTagName('body')[0].classList.remove('nav-on');

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
                        <h2 class="icon-gift">Store</h2>
                    </header>
                    <div class="options">
                        <p>Unlocks: (coming soon)</p>
                        <a href="#" class="icon-right-open points-neon-colours">1000: Unlock neon colours</a>
                        <a href="#" class="icon-right-open points-life-glyphs">5000: Unlock solid symbols</a>
                        <a href="#" class="icon-right-open points-metal-colours">10000: Unlock metal colours</a>
                    </div>
                    `;
        // Add view
        modal.querySelector('.content').innerHTML += view;
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

        if (tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms !== undefined) {
            correct = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.incorrectTerms);
        }
        if (tinyTerms[tinyTerms.pickedList].storedData.correctTerms !== undefined) {
            incorrect = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.correctTerms);
        }

        let learned = [];

        for (let i = 0; i < completed; i++) {
            let learnedTerm = Object.keys(tinyTerms[tinyTerms.pickedList].storedData.learnedTerms)[i];
            let learnedDefinition = tinyTerms[tinyTerms.pickedList].storedData.learnedTerms[learnedTerm];
            learned += '<p class="small">'+learnedTerm+' - '+learnedDefinition+'</p>';
        }
        if (completed === 0) {
            learned = '<p class="small">No completed terms, fill some goals!</p>'
        }

        let view = `<header>
                        <h2 class="icon-chart-bar">Progress</h2>
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
                localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]).then(function (value) {;
                    localforage.removeItem('tinyTermsDefault').then(function() {
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