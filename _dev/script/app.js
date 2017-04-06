// Imports
import { ready, cl, clv, buildData, errorReport, errorAlert, alertMsg, checkSameDay, checkConnection, arrayCheck, getTodaysDate, appBlur } from "helperFunctions";
import { getListOfTerms } from "termCreation";
import { revealedBtnHandler, dictionaryLookup, textToSpeech, addColour, hideModal, pickSymbol } from "termInteraction";
import { viewCreate, addHearts, setScore, progressBar } from "viewCreation";
import { createNewQuery } from "queryInteraction";
import { showHome } from "homeScreen";
import { onboardShow } from "introInstructions";
import { navMenu, footerMenu, optionsDisplay } from "menuInteraction";
import appData from "appData";

// Exports
export default tinyTerms;

// App namespace
let tinyTerms = tinyTerms || {};

// Global options
let ops = {
	displayedTerms: 5,
	counterMins: 60,
	counterSecs: 0,
	revealGoalTarget: 3,
	wordAccuracy: 0.7,
	addDay: false,
	debug: true,
	loadDelay: 2500,
	points: {
		correct: 50,
		dailyBonus: 10,
		hearts: 3
	}
};

// Crash protection
let notLoaded = true;

setTimeout(() => {
	document.getElementsByTagName("body")[0].classList.remove("loading");

	if (notLoaded === true) {
		let modal = document.querySelector('.m-modal');
		modal.classList.remove("hidden");
		document.getElementsByTagName("body")[0].classList.add("modal-active");

		let view = `<header>
						<h2 class="">Uh oh!</h2>
					</header>
					<br>
					<h3>Sorry something went wrong</h3>
					<br>
					<button class="crash-report">Report issue</button><button class="home-btn">Close</button>
					`;

		// Add view
		modal.querySelector(".content").innerHTML = view;
		modal.classList.add('onboard');

		document.querySelector('.crash-report').addEventListener("click", (e) => {
			e.preventDefault();
			errorReport();
		});

		document.querySelector(".home-btn").addEventListener("click", (e) => {
			e.preventDefault();
			showHome();
		});
	}
}, 20000);

// Initialise modules on load
ready(function () {
	"use strict";

	// Error handling
	errorAlert('Sorry there was a problem.', () => {

		// Clear list references callback
		localforage.removeItem(tinyTerms.storedName).then(function () {
			localforage.removeItem(tinyTerms.pickedList);
		});
		notLoaded = false;
	});

	localforage.getItem("tinyTerms.lists", function (err, lists) {

		// Check for internet, pull list references if connection
		if (typeof Connection !== "undefined") {
			let connection = checkConnection();
			notLoaded = false;

			if (connection === 'Unknown' || connection === '2G' || connection === 'Cell' || connection === 'None') {
				
				if (lists === null) {
					alertMsg("Please connect to the internet to download lists, after they will be available offline.", () => {
						document.querySelector(".home-btn").addEventListener("click", (e) => {
							e.preventDefault();
							showHome();
						});
					});
				}
				else {
					tinyTerms.listChoices = lists;
					getLists();
				}
			}
			else {
				buildLists();
			}
		}
		else {
			buildLists();
		}
	});

	function buildLists() {

		Tabletop.init({
			key: 'https://docs.google.com/spreadsheets/d/1T8sb0SJRxJQdwgWywAQQnq6rxHt0JRo-81q5Hz_jvXQ/pubhtml',
			callback: fetchListData,
			simpleSheet: false
		});

		function fetchListData(data) {
			// Reset default
			tinyTerms.listChoices = {};

			for (let i = 0; i < data.Sheet1.elements.length; i++) {

				tinyTerms.listChoices[data.Sheet1.elements[i].Name] = {
					name: data.Sheet1.elements[i].Name,
					category: data.Sheet1.elements[i].Category,
					sheetURL: data.Sheet1.elements[i].sheetURL,
					version: data.Sheet1.elements[i].Version
				}
			}
			localforage.setItem("tinyTerms.lists", tinyTerms.listChoices, () => {
				getLists();
			});
		}
	}
});

// Pick a list
function getLists(skipDefaultCheck) {
	let tinyTermsDefault;

	localforage.getItem("tinyTerms.tutComplete", function (err, tutStatus) {
		tinyTerms.tutComplete = tutStatus;

		// Check for default list, used on very first load
		localforage.getItem("tinyTermsDefault", function (err, value) {
			tinyTermsDefault = value;

			if (tinyTermsDefault === null) {
				notLoaded = false;
				showHome();
			} else {
				checkDefault();
			}
		});
	});

	function checkDefault() {
		// Check for existing data of newly picked list
		localforage.getItem("tinyTerms" + tinyTermsDefault, function (err, value) {
			if (value !== null) {
				tinyTerms.pickedList = tinyTermsDefault;
				normalLoad(tinyTerms.pickedList);
			}
			else {
				if (typeof Connection !== "undefined") {
					let connection = checkConnection();
					notLoaded = false;

					if (connection === 'Unknown' || connection === '2G' || connection === 'Cell' || connection === 'None') {

						alertMsg("Please connect to the internet to download list, after it will be available offline.", () => {
							document.querySelector(".home-btn").addEventListener("click", (e) => {
								e.preventDefault();
								showHome()
							});
						});
					}
					else {
						firstLoad();
					}
				}
				else {
					firstLoad();
				}
			}
		});
	}

	function normalLoad(defaultlist) {
		tinyTerms.storedName = "tinyTerms" + defaultlist;

		localforage.getItem("tinyTerms" + defaultlist, function (err, value) {
			// Set session storage to stored
			tinyTerms[tinyTerms.pickedList] = value;

			// Update stored ops
			tinyTerms[tinyTerms.pickedList].ops = ops;
			initialise();
		});
	}
}

// Sets up new list, gets data
const firstLoad = function firstLoad() {

	localforage.getItem("tinyTermsDefault", function (err, value) {
		// Set session storage to stored
		tinyTerms.pickedList = value;

		// Set picked list and create data object for it
		tinyTerms[tinyTerms.pickedList] = {};
		tinyTerms[tinyTerms.pickedList].storedData = {};
		tinyTerms[tinyTerms.pickedList].ops = ops;
		tinyTerms.storedName = "tinyTerms" + tinyTerms.pickedList;

		// Set new list to storage, add as default
		localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

		// Add default lists to uploadedLists, same place as user upload
		localforage.getItem("tinyTerms.uploadedLists", function (err, uploadedLists) {
			let sheetURL;

			uploadedLists = uploadedLists || {};
			// If list from uploaded lists
			if (uploadedLists.hasOwnProperty(tinyTerms.pickedList)) {
				sheetURL = uploadedLists[tinyTerms.pickedList].sheetURL;
			}
			// Else from default lists
			else {
				sheetURL = tinyTerms.listChoices[tinyTerms.pickedList].sheetURL;
			}

			// Fetch data for list
			fetchData(sheetURL, firstTime);
		});
	});
};

// Fetches list data
const fetchData = function fetchData(sheetURL, postBuildCallback) {

	// Add a callback method
	tinyTerms.postBuildCallback = postBuildCallback;

	// Error handling for Tabletop
	errorAlert('Couldn\'t load the list URL, did you copy it correctly?', () => {

		// Clear list references callback
		localforage.removeItem(tinyTerms.storedName).then(function () {
			localforage.removeItem(tinyTerms.pickedList);
		});
		notLoaded = false;
	});

	// Get data from sheets
	Tabletop.init({
		key: sheetURL,
		callback: buildData,
		simpleSheet: false
	});
};

// Runs if first time app has run
const firstTime = function firstTime() {

	if (tinyTerms[tinyTerms.pickedList].ops.debug !== true) {
		window.onerror = "";
	}

	// Create terms
	appBuildHandler();

	// Show intro onboarding
	if (tinyTerms.tutComplete === null) {
		onboardShow();
	}

	// Then set first time to false
	tinyTerms[tinyTerms.pickedList].storedData.firstTime = false;

	// Add to storage
	localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);
};

// Initialises data and app
const initialise = function initialise() {

	// Check if a new day
	checkSameDay();

	// Start build
	appBuildHandler();
};

// Calls functions to handle app creation and running
const appBuildHandler = function appBuildHandler() {
	// Get initial terms
	let pickedTerms;

	// If same day, used daily terms
	if (tinyTerms[tinyTerms.pickedList].storedData.newDay === false) {
		pickedTerms = tinyTerms[tinyTerms.pickedList].storedData.dailyTerms;

		// Load query if it exists already
		if (
			tinyTerms[tinyTerms.pickedList].storedData.dailyQuery !== undefined &&
			tinyTerms[tinyTerms.pickedList].storedData.queryComplete !== true
		) {
			createNewQuery();
		}
	} else {
		// Else get new
		pickedTerms = getListOfTerms();

		// Clear daily goals
		delete tinyTerms[tinyTerms.pickedList].storedData.revealedTermCount;
		delete tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns;
		delete tinyTerms[tinyTerms.pickedList].storedData.dailyQuery;
		delete tinyTerms[tinyTerms.pickedList].storedData.dailyReminder;

		// Reset daily reveal bonus
		tinyTerms[tinyTerms.pickedList].storedData.revealGoal = tinyTerms[tinyTerms.pickedList].storedData.revealGoal || {};
		tinyTerms[tinyTerms.pickedList].storedData.revealGoal.complete = false;

		// Create query if revealed terms
		if (tinyTerms[tinyTerms.pickedList].storedData.viewedTerms !== undefined) {
			createNewQuery();
		}

		// Create reminded terms default
		tinyTerms[tinyTerms.pickedList].storedData.remindedTerms = tinyTerms[tinyTerms.pickedList].storedData.remindedTerms || {};
	}

	// Create initial view
	viewCreate(pickedTerms);
	setScore();

	// Create opened date, daily terms, viewed terms
	tinyTerms[tinyTerms.pickedList].storedData.dateOpened = getTodaysDate();
	tinyTerms[tinyTerms.pickedList].storedData.dailyTerms = pickedTerms;

	// Add to storage
	localforage.setItem(tinyTerms.storedName, tinyTerms[tinyTerms.pickedList]);

	// Keep query active each day
	tinyTerms[tinyTerms.pickedList].storedData.queryComplete = tinyTerms[tinyTerms.pickedList].storedData.queryComplete || {};

	// Handles events for revealed terms
	revealedBtnHandler();
	dictionaryLookup();
	textToSpeech();
	addColour();
	pickSymbol();
	hideModal();

	// Builds UI elements
	progressBar();

	// Shows options menu
	navMenu();
	footerMenu();
	optionsDisplay();

	// Refresh window on blur
	appBlur();

	// App should have loaded by here
	notLoaded = false;

	// Once loaded
	setTimeout(
		() => {
			document.getElementsByTagName("body")[0].classList.remove("loading");
			document
				.querySelector(".m-query")
				.classList.add("animated", "slideInDown");
		},
		tinyTerms[tinyTerms.pickedList].ops.loadDelay
	);

	// Show onboard if incomplete
	if (tinyTerms.tutComplete === false) {
		onboardShow();
	}

	// Debug code
	if (tinyTerms[tinyTerms.pickedList].ops.debug === true) {
		console.log(tinyTerms);
	}
};