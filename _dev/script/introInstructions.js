
// Imports
import { cl, clv, clickListener } from 'helperFunctions';
import tinyTerms from 'app';
import { hideModal } from 'termInteraction';
import { createNewQuery } from 'queryInteraction';

// Exports
export { onboardShow, optionsDisplay };

// Show home screen
const onboardShow = function onboardShow() {
    let modal = document.querySelector('.m-modal');
    let onBoardText = document.querySelector('.m-onboarding');
    let topTerm = document.querySelectorAll('.m-term-wrapper')[0];
    let definitionHolder = topTerm.querySelector('.definition-holder');

    tinyTerms.tutComplete = false;
    localforage.setItem("tinyTerms.tutComplete", tinyTerms.tutComplete);

    // Onboard - Stage 1
    modal.classList.remove('hidden');
    document.getElementsByTagName('body')[0].classList.add('modal-active');

    let view = `<header>
                    <h2 class="icon-child">Welcome to Tiny Terms!</h2>
                </header>
                <p>Looks like this is your first time here, so let's go over some basics before you get started.</p>
                <button class="onboard-1">Let's go!</button>
                <a href="#" class="close-tut">Skip the tutorial</a>
                `;
    modal.querySelector('.content').innerHTML = view;
    modal.classList.add('onboard');
    document.querySelector('.close-tut').addEventListener("click", () => {
        hideModal(true);
        modal.classList.remove('onboard');
        tinyTerms.tutComplete = true;
        localforage.setItem("tinyTerms.tutComplete", tinyTerms.tutComplete);
    });

    document.querySelector('.onboard-1').addEventListener('click', (e) => {
        onboardStage2();
    });
    function onboardStage2() {
        hideModal(true);
        topTerm.style.zIndex = "100";
        topTerm.querySelector('.term-holder').classList.add('animated', 'pulse', 'infinite');
        document.getElementsByTagName('body')[0].classList.add('modal-active');
        topTerm.getElementsByTagName('button')[0].setAttribute('disabled', 'true');
        onBoardText.classList.remove('hidden');

        let view = `<p>This is one of the terms you will be learning, you get 5 each day.</p>
                    <button class="onboard-2">Next</button>`;
        onBoardText.innerHTML = view;
        let termOffset = topTerm.offsetTop + topTerm.offsetHeight;
        onBoardText.style.top = termOffset + "px";

        document.querySelector('.onboard-2').addEventListener('click', (e) => {
            onboardStage3();
        });
    }
    function onboardStage3() {
        topTerm.querySelector('.term-holder').classList.remove('animated', 'pulse', 'infinite');
        topTerm.querySelector('.term-views').classList.add('animated', 'pulse', 'infinite');
        let view = `<p>On the right is the goal meter, fill this and the term is marked as complete.</p>
                    <button class="onboard-3">Next</button>`;
        onBoardText.innerHTML = view;

        onBoardText.classList.add('onboard-right');

        document.querySelector('.onboard-3').addEventListener('click', (e) => {
            onboardStage4();
        });
    }
    function onboardStage4() {
        topTerm.querySelector('.term-views').classList.remove('animated', 'pulse', 'infinite');
        topTerm.getElementsByTagName('button')[0].classList.add('animated', 'pulse', 'infinite');
        topTerm.getElementsByTagName('button')[0].removeAttribute('disabled');
        let view = `<p style="border:0; margin: 10px 0; padding: 0">Press the reveal button to continue!</p>
                    `;
        onBoardText.innerHTML = view;

        topTerm.getElementsByTagName('button')[0].addEventListener('click', (e) => {
            onboardStage5();
        });
    }
    function onboardStage5() {
        topTerm.getElementsByTagName('button')[0].classList.remove('animated', 'pulse', 'infinite');
        topTerm.querySelector('.definition-wrapper').classList.remove('hidden');
        topTerm.querySelector('.definition-holder').classList.add('animated', 'pulse', 'infinite');

        let termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
        onBoardText.style.top = termOffset + "px";

        let view = `<p>This is the definition you need to learn, helpful information is displayed underneath.</p>
                    <button class="onboard-5">Next</button>`;
        onBoardText.innerHTML = view;
        onBoardText.classList.remove('onboard-right');

        document.querySelector('.onboard-5').addEventListener('click', (e) => {
            onboardStage6();
        });
    }
    function onboardStage6() {
        topTerm.querySelector('.definition-holder').classList.remove('animated', 'pulse', 'infinite');

        let termOffset = topTerm.offsetTop + definitionHolder.offsetTop + 95;
        onBoardText.style.top = termOffset + "px";

        let view = `<p>Tiny Terms uses spaced repetition, check back in an hour to add to the goal.</p>
                    <button class="onboard-6">Next</button>`;
        onBoardText.innerHTML = view;
        onBoardText.classList.add('onboard-right');

        document.querySelector('.onboard-6').addEventListener('click', (e) => {
            onboardStage7();
        });
    }
    function onboardStage7() {
        topTerm.querySelector('.colour').classList.add('animated', 'pulse', 'infinite');
        topTerm.querySelector('.symbol').classList.add('animated', 'pulse', 'infinite');
        topTerm.querySelector('.colour').setAttribute('disabled', 'true');
        topTerm.querySelector('.symbol').setAttribute('disabled', 'true');

        let termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
        onBoardText.style.top = termOffset + "px";

        let view = `<p>You can add a colour and symbol to the term, the visual association will help you rememeber.</p>
                    <button class="onboard-7">Next</button>`;
        onBoardText.innerHTML = view;

        document.querySelector('.onboard-7').addEventListener('click', (e) => {
            onboardStage8();
        });
    }
    function onboardStage8() {
        topTerm.querySelector('.colour').classList.remove('animated', 'pulse', 'infinite');
        topTerm.querySelector('.symbol').classList.remove('animated', 'pulse', 'infinite');
        topTerm.querySelector('.colour').removeAttribute('disabled');
        topTerm.querySelector('.symbol').removeAttribute('disabled');
        topTerm.style.zIndex = "50";
        let queryWrap = document.querySelector('.m-query-wrapper');
        document.querySelector('.query-submit').setAttribute('disabled', 'true');

        createNewQuery(true);

        let termOffset = queryWrap.offsetTop + queryWrap.offsetHeight;
        onBoardText.style.top = termOffset + "px";
        queryWrap.style.zIndex = "100";

        let view = `<p>Each day you get a mini test to see how well you have rememebered, you can also unlock an extra test by completing at least one goal meter in a day.</p>
                    <button class="onboard-8">Next</button>`;
        onBoardText.innerHTML = view;

        document.querySelector('.onboard-8').addEventListener('click', (e) => {
            onboardStage9();
        });
    }
    function onboardStage9() {
        modal.classList.remove('hidden');
        onBoardText.innerHTML = "";
        onBoardText.classList.add('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');
        let queryWrap = document.querySelector('.m-query-wrapper');
        document.querySelector('.query-submit').removeAttribute('disabled');

        queryWrap.style.zIndex = "50";
        queryWrap.classList.add('hidden');
        topTerm.querySelector('.definition-wrapper').classList.remove('hidden');

        let view = `<header>
                        <h2 class="">That's about it</h2>
                    </header>
                    <p>Fill the progress bar by completing the goal meters to finish the list! You get points for answering tests correctly and completing goal meters, use them to unlock cool stuff. <br>Good luck!</p>
                    <button class="close-tut">Close the tutorial</button>
                    `;
        modal.querySelector('.content').innerHTML = view;
        modal.classList.add('onboard');
        document.querySelector('.close-tut').addEventListener("click", () => {
            hideModal(true);
            delete tinyTerms[tinyTerms.pickedList].storedData.dailyQuery;
            tinyTerms.tutComplete = true;
            localforage.setItem("tinyTerms.tutComplete", tinyTerms.tutComplete);
            modal.classList.remove('onboard');
        });
    }
}

// Help screen
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
                        <p>Spend points: (coming soon)</p>
                        <a href="#" class="icon-award-empty points-neon-colours">1000: Unlock neon colours</a>
                        <a href="#" class="icon-award points-life-glyphs">5000: Unlock solid symbols</a>
                        <a href="#" class="icon-award-1 points-metal-colours">10000: Unlock metal colours</a>
                        <p>More Options</p>
                        <a href="#" class="icon-right-open-big reset-list">Reset list progress</a>
                        <a href="#" class="icon-right-open-big reset">Reset the app</a>
                    </div>
                    `;

        // Add view
        modal.querySelector('.content').innerHTML += view;
        let resetList = document.querySelector('.reset-list');
        let resetApp = document.querySelector('.reset');

        resetList.addEventListener('click', (e) => {
            e.preventDefault;
            resetList.innerHTML = "Are you sure you want to delete progress for this list? (Can't undo)";
            resetList.parentNode.insertBefore(document.createElement("div"), resetList.nextSibling);
            resetList.nextSibling.innerHTML = '<button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

            document.querySelector('.delete-confirm').addEventListener('click', () => { 
                delete tinyTerms[tinyTerms.pickedList];
                localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
                location.reload();
            });
            document.querySelector('.delete-cancel').addEventListener('click', () => { 
                hideModal(true);
            });
        });
        document.querySelector('.reset').addEventListener('click', (e) => {
            e.preventDefault;
            resetList.innerHTML = "Are you sure you want to delete all progress for the app? (Can't undo)";
            resetList.parentNode.insertBefore(document.createElement("div"), resetList.nextSibling);
            resetList.nextSibling.innerHTML = '<button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

            document.querySelector('.delete-confirm').addEventListener('click', () => { 
                localforage.clear();
                location.reload();
            });
        });
    });
}
