
// Imports
import { cl, clv, clickListener } from 'helperFunctions';
import tinyTerms from 'app';
import { hideModal } from 'termInteraction';
import { createNewQuery } from 'queryInteraction';

// Exports
export { onboardShow };

// Show home screen
const onboardShow = function onboardShow() {
    let modal = document.querySelector('.m-modal');
    let onBoardText = document.querySelector('.m-onboarding');
    let topTerm = document.querySelectorAll('.m-term-wrapper')[0];
    let definitionHolder = topTerm.querySelector('.definition-holder');
	let topBtn = topTerm.getElementsByTagName('button')[0];

    tinyTerms.tutComplete = false;
    localforage.setItem("tinyTerms.tutComplete", tinyTerms.tutComplete);

    // Onboard - Stage 1
    modal.classList.remove('hidden');
    document.getElementsByTagName('body')[0].classList.add('modal-active');

    let view = `<header>
                    <h2 class="icon-compass">Welcome</h2>
                </header>
                <p>Looks like this is your first time here, so let's go over some basics before you get started.</p>
                <button class="onboard-1">Let's go!</button>
                <a href="#" class="close-tut">Skip the tutorial</a>
                `;
    modal.querySelector('.content').innerHTML = view;
    modal.classList.add('onboard');
    document.querySelector('.close-tut').addEventListener('click', (e) => {
        e.preventDefault();
        hideModal(true);
        modal.classList.remove('onboard');
        tinyTerms.tutComplete = true;
        localforage.setItem("tinyTerms.tutComplete", tinyTerms.tutComplete);
    });

    document.querySelector('.onboard-1').addEventListener('click', (e) => {
        e.preventDefault();
        onboardStage2();
    });
    function onboardStage2() {
        hideModal(true);
        topTerm.style.zIndex = "100";
        topTerm.querySelector('.term-holder').classList.add('animated', 'pulse', 'infinite');
        topTerm.querySelector('.definition-wrapper').classList.add('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');
        topBtn.setAttribute('disabled', 'true');
        document.querySelector('.m-modal').style.cssText = "display: none !important";
        onBoardText.classList.remove('hidden');

        let view = `<p>This is one of the terms you will be learning, you get 5 each day.</p>
                    <button class="onboard-2">Next</button>`;
        onBoardText.innerHTML = view;
        let termOffset = topTerm.offsetTop + topTerm.offsetHeight;
        onBoardText.style.top = termOffset + "px";

        document.querySelector('.onboard-2').addEventListener('click', (e) => {
            e.preventDefault();
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
            e.preventDefault();
            onboardStage4();
        });
    }
    function onboardStage4() {
        topTerm.querySelector('.term-views').classList.remove('animated', 'pulse', 'infinite');
        topBtn.classList.add('animated', 'pulse', 'infinite');
        
		let timerOveride = setInterval(()=>{
			topBtn.classList.remove('disabled');
        	topBtn.removeAttribute('disabled');
		},100);

        let view = `<p style="border:0; margin: 10px 0; padding: 0">Press the reveal button to continue!</p>
                    `;
        onBoardText.innerHTML = view;

        topBtn.addEventListener('click', (e) => {
            e.preventDefault();
			clearInterval(timerOveride);
            onboardStage5();
        });
    }
    function onboardStage5() {
        topBtn.classList.remove('animated', 'pulse', 'infinite');
        topTerm.querySelector('.definition-wrapper').classList.remove('hidden');
        topTerm.querySelector('.definition-holder').classList.add('animated', 'pulse', 'infinite');
        topBtn.classList.add('disabled');

		// Prevent cheating
		let goal = topTerm.querySelector('.count');
		let goalCount = parseInt(goal.innerHTML);

		if (goalCount > 1) {
			goalCount -= 1;
			goal.innerHTML = goalCount;
			let term = topTerm.querySelector('.term-holder').innerHTML;
			tinyTerms[tinyTerms.pickedList].storedData.viewedTerms[term].viewCount = goalCount;
			tinyTerms[tinyTerms.pickedList].storedData.revealGoal[term] = goal.innerHTML = goalCount;
			 // Save to storage
        	localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
		}

        let termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
        onBoardText.style.top = termOffset + "px";

        let view = `<p>This is the definition you need to learn, helpful information is displayed underneath.</p>
                    <button class="onboard-5">Next</button>`;
        onBoardText.innerHTML = view;
        onBoardText.classList.remove('onboard-right');

        document.querySelector('.onboard-5').addEventListener('click', (e) => {
            e.preventDefault();
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
            e.preventDefault();
            onboardStage7();
        });
    }
    function onboardStage7() {
        topTerm.querySelector('.lookup').classList.add('animated', 'pulse', 'infinite');
        document.querySelector('.query-holder').setAttribute('disabled', 'true');

        let termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
        onBoardText.style.top = termOffset + "px";

        let view = `<p>Clicking the Further Study button will give you detailed info on the term and the ability to practice writing it.</p>
                    <button class="onboard-7">Next</button>`;
        onBoardText.innerHTML = view;

        document.querySelector('.onboard-7').addEventListener('click', (e) => {
            e.preventDefault();
            onboardStage7b();
        });
    }
    function onboardStage7b() {
        topTerm.querySelector('.lookup').classList.remove('animated', 'pulse', 'infinite');
        topTerm.querySelector('.colour').classList.add('animated', 'pulse', 'infinite');
        topTerm.querySelector('.symbol').classList.add('animated', 'pulse', 'infinite');

        let termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
        onBoardText.style.top = termOffset + "px";

        let view = `<p>You can add a colour and symbol to the term, the visual association will help you remember.</p>
                    <button class="onboard-7">Next</button>`;
        onBoardText.innerHTML = view;

        document.querySelector('.onboard-7').addEventListener('click', (e) => {
            e.preventDefault();
            onboardStage8();
        });
    }
    function onboardStage8() {
        topTerm.querySelector('.colour').classList.remove('animated', 'pulse', 'infinite');
        topTerm.querySelector('.symbol').classList.remove('animated', 'pulse', 'infinite');
        topTerm.style.zIndex = "50";
        let queryWrap = document.querySelector('.m-query');
        document.querySelector('.query-submit').setAttribute('disabled', 'true');
        document.querySelector('.query-input').setAttribute('disabled', 'true');
        document.querySelector('.m-modal').style.cssText = "";
        hideModal(true);

        createNewQuery(true);
        delete tinyTerms[tinyTerms.pickedList].storedData.dailyQuery;
        localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

        let termOffset = queryWrap.offsetTop + queryWrap.offsetHeight;
        onBoardText.style.top = termOffset + "px";
        queryWrap.style.zIndex = "100";

        let view = `<p>Each day you get a mini test to see how well you have remembered, you can also unlock an extra test by completing at least one goal meter in a day.</p>
                    <button class="onboard-8">Next</button>`;
        onBoardText.innerHTML = view;

        document.querySelector('.onboard-8').addEventListener('click', (e) => {
            e.preventDefault();
            onboardStage9();
        });
    }
    function onboardStage9() {
        modal.classList.remove('hidden');
        onBoardText.innerHTML = "";
        onBoardText.classList.add('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');
        let queryWrap = document.querySelector('.m-query');
        document.querySelector('.query-holder').removeAttribute('disabled');
        document.querySelector('.query-submit').removeAttribute('disabled');
        document.querySelector('.query-input').removeAttribute('disabled');
        

        queryWrap.style.zIndex = "50";
        queryWrap.classList.add('hidden');
        topTerm.querySelector('.definition-wrapper').classList.remove('hidden');

        let view = `<header>
                        <h2 class="">That's about it</h2>
                    </header>
                    <p>Fill the progress bar by completing the goal meters to finish the list! You get points for answering tests correctly and completing goal meters, use them to unlock cool stuff. <br><br>Good luck!</p>
                    <button class="close-tut">Close the tutorial</button>
                    `;
        modal.querySelector('.content').innerHTML = view;
        modal.classList.add('onboard');
        document.querySelector('.close-tut').addEventListener("click", (e) => {
            e.preventDefault();
            hideModal(true);
            tinyTerms.tutComplete = true;
            localforage.setItem("tinyTerms.tutComplete", tinyTerms.tutComplete);
            modal.classList.remove('onboard');
        });
    }
}