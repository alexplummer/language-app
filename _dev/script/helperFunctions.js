// Imports
import tinyTerms from "app";
import { showHome } from "homeScreen";
import { hideModal } from 'termInteraction';

// Exports
export {
	ready,
	cl,
	clv,
	errorReport,
	buildData,
	checkSameDay,
	arrayCheck,
	checkConnection,
	makeSafeClass,
	getTodaysDate,
	checkURL,
	errorAlert,
	alertMsg,
	pickRandom,
	clickListener,
	countLines,
	getTimeComplete,
	checkQuery,
	sortArrayByKey,
	appBlur,
	jsonp,
	findKeys,
	updateDataCount,
	getCSS
};

// JS ready
function ready(fn) {
	if (document.readyState != "loading") {
		fn();
	}
	else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

// Console log -> cl
function cl(log) {
	console.log(log);
}

// Console log plus value
function clv(term, log) {
	console.log(term + "= " + log);
}

// Send crash report
const errorReport = function errorReport() {

	if (typeof cordova !== "undefined") {
		cordova.plugins.instabug.invoke();
	}
	else {
		let modal = document.querySelector('.m-modal');
		modal.classList.remove("hidden");
		document.getElementsByTagName("body")[0].classList.add("modal-active");

		let view = `<header>
						<h2 class="">Get in touch</h2>
					</header>
					<p>We always welcome feedback especially if something isn't working as expected.
					<br><br>
					Please email us at <a href="mailto:info@tiny-terms.com">info@tiny-terms.com</a> with your thoughts.</p>

					<button class="close-feedback">Close</button>
					`;

		// Add view
		modal.querySelector(".content").innerHTML = view;
		modal.classList.add('onboard');
		
		document.querySelector('.close-feedback').addEventListener("click", (e) => {
            e.preventDefault();
            hideModal(true);
            tinyTerms.tutComplete = true;
            localforage.setItem("tinyTerms.tutComplete", tinyTerms.tutComplete);
            modal.classList.remove('onboard');
        });
		return false;
	}
}

// Alert errors
const errorAlert = function errorAlert(message, cb) {

	window.onerror = (errorMsg, url, lineNumber, column, errorObj) => {
		let modal = document.querySelector('.m-modal');
		modal.classList.remove("hidden");
		document.getElementsByTagName("body")[0].classList.add("modal-active");

		let view = `<header>
                        <h2 class="">Uh oh!</h2>
                    </header>
                    <br>
                    <h3>${message}</h3>
                    <p><strong>Here's the exact problem:</strong></p>
                    <p>'Error: ${errorMsg}</p> 
                    <p>Script: ${url}</p> 
                    <p>Line: ${lineNumber}</p>
                    <p>Column: ${column}</p> 
                    <p>StackTrace: ${errorObj}</p>

                    <button class="crash-report">Report issue</button><button class="home-btn">Close</button>
                    `;

		// Add view
		modal.querySelector(".content").innerHTML = view;
		modal.classList.add('onboard');
		cb();

		document.querySelector('.crash-report').addEventListener("click", (e) => {
			e.preventDefault();
			errorReport();
		});

		document.querySelector(".home-btn").addEventListener("click", (e) => {
			e.preventDefault();
			showHome()
		});
		return false;
	};
}

// Alert errors
const alertMsg = function alertMsg(message, cb) {

	let modal = document.querySelector('.m-modal');
	modal.classList.remove("hidden");
	document.getElementsByTagName("body")[0].classList.add("modal-active");

	let view = `<header>
					<h2 class="">Something's not right</h2>
				</header>
				<p>${message}</p>

				<button class="home-btn">Close</button>
				`;

	// Add view
	modal.querySelector(".content").innerHTML = view;
	modal.classList.add('onboard');
	document.querySelector(".home-btn").addEventListener("click", (e) => {
			e.preventDefault();
			showHome()
		});
	cb();
	return false;
}

// Gets data from Google Sheets
const buildData = function buildData(data) {
	let columnName = data.Sheet1.columnNames[1];

	tinyTerms[tinyTerms.pickedList].speechLang = columnName;
	tinyTerms[tinyTerms.pickedList].dictFrom = data.Sheet1.elements[0][columnName];
	tinyTerms[tinyTerms.pickedList].dictTo = data.Sheet1.elements[1][columnName];
	tinyTerms[tinyTerms.pickedList].action = data.Sheet1.elements[2][columnName];
	tinyTerms[tinyTerms.pickedList].terms = tinyTerms[tinyTerms.pickedList].terms || {};

	for (let i = 0; i < data.Sheet1.elements.length; i++) {
		let termContent = data.Sheet1.elements[i].Term;
		let definitionContent = data.Sheet1.elements[i].Definition;
		let supportContent = data.Sheet1.elements[i].Support;

		tinyTerms[tinyTerms.pickedList].terms[termContent] = {};
		tinyTerms[tinyTerms.pickedList].terms[termContent].term = termContent;
		tinyTerms[tinyTerms.pickedList].terms[termContent].definition = definitionContent;
		tinyTerms[tinyTerms.pickedList].terms[termContent].support = supportContent;
	}
	tinyTerms.postBuildCallback();
};

// Check for network connection
const checkConnection = function checkConnection() {

	let networkState = navigator.connection.type;
	let states = {};

	states[Connection.UNKNOWN] = 'Unknown';
	states[Connection.ETHERNET] = 'Ethernet';
	states[Connection.WIFI] = 'WiFi';
	states[Connection.CELL_2G] = '2G';
	states[Connection.CELL_3G] = '3G';
	states[Connection.CELL_4G] = '4G';
	states[Connection.CELL] = 'Cell';
	states[Connection.NONE] = 'None';

	return states[networkState];
}

// Count number of lines of text
const countLines = function countLines(target) {
	let style = window.getComputedStyle(target, null);
	let height = parseInt(style.getPropertyValue("height"));
	let font_size = parseInt(style.getPropertyValue("font-size"));
	let line_height = parseInt(style.getPropertyValue("line-height"));
	let box_sizing = style.getPropertyValue("box-sizing");

	if (isNaN(line_height)) line_height = font_size * 1.2;

	if (box_sizing == 'border-box') {
		let padding_top = parseInt(style.getPropertyValue("padding-top"));
		let padding_bottom = parseInt(style.getPropertyValue("padding-bottom"));
		let border_top = parseInt(style.getPropertyValue("border-top-width"));
		let border_bottom = parseInt(style.getPropertyValue("border-bottom-width"));
		height = height - padding_top - padding_bottom - border_top - border_bottom
	}
	let lines = Math.ceil(height / line_height);
	return lines;
}

// Checks if the same or new day
function checkSameDay() {
	let todaysDate = getTodaysDate();
	let storedDate = [];

	// Get date last stored
	storedDate = Array.from(
		tinyTerms[tinyTerms.pickedList].storedData.dateOpened
	);

	// Check if same day
	if (arrayCheck(todaysDate, storedDate) === true) {
		if (tinyTerms[tinyTerms.pickedList].ops.addDay === true) {
			tinyTerms[tinyTerms.pickedList].storedData.newDay = true;
		}
		else {
			tinyTerms[tinyTerms.pickedList].storedData.newDay = false;
		}
	}
	else {
		// Otherwise a new day
		tinyTerms[tinyTerms.pickedList].storedData.newDay = true;
	}
}

// Creates array of day and month
function getTodaysDate() {
	// Get current day + month
	let todayDate = [];
	let day = new Date().getDate();
	let month = new Date().getMonth();

	todayDate.push([day, month]);

	return todayDate;
}

// Creates array of day, month, hour, minute, second
function getTimeComplete() {
	// Get complete date time value
	let timeComplete = [];
	let day = new Date().getDate();
	let month = new Date().getMonth();
	let hour = new Date().getHours();
	let minute = new Date().getMinutes();
	let second = new Date().getSeconds();

	timeComplete.push([day, month, hour, minute, second]);

	return timeComplete;
}

// Validate URL
const checkURL = function checkURL(str) {
	let a = document.createElement("a");
	a.href = str;
	return a.host && a.host != window.location.host;
};

// Makes a safe class name
const makeSafeClass = function makeSafeClass(name) {
	return name.replace(/[^a-z0-9]/g, function (s) {
		let c = s.charCodeAt(0);
		if (c == 32) return "-";
		if (c >= 65 && c <= 90) return "_" + s.toLowerCase();
		return "__" + ("000" + c.toString(16)).slice(-4);
	});
};

// Check if arrays are the same
function arrayCheck(arr1, arr2) {
	// If same return true
	if (JSON.stringify(arr1) == JSON.stringify(arr2)) {
		return true;
	}
	// Else false
	return false;
}

// Adds click functionality to selectors
function clickListener(elements, clickFunction) {
	for (let i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", e => {
			e.preventDefault();
			clickFunction(i);
		});
	}
}

// Get a random term
function pickRandom(objectList) {
	let keys = Object.keys(objectList);
	let pickedTerm = keys[keys.length * Math.random() << 0];
	return pickedTerm;
}

// Check if two words the same
function checkQuery(item1, item2) {
	if (item1 === item2) return true;
	if (item1.toUpperCase() === item2.toUpperCase()) return true;

	// Perform fuzzy comparison
	let getBigrams = function (string) {
		let i, j, ref, s, v;
		s = string.toLowerCase();
		v = new Array(s.length - 1);
		for ((i = (j = 0)), (ref = v.length); j <= ref; i = (j += 1)) {
			v[i] = s.slice(i, i + 2);
		}
		return v;
	};
	let stringSimilarity = function (str1, str2) {
		let hit_count, j, k, len, len1, pairs1, pairs2, union, x, y;
		if (str1.length > 0 && str2.length > 0) {
			pairs1 = getBigrams(str1);
			pairs2 = getBigrams(str2);
			union = pairs1.length + pairs2.length;
			hit_count = 0;
			for ((j = 0), (len = pairs1.length); j < len; j++) {
				x = pairs1[j];
				for ((k = 0), (len1 = pairs2.length); k < len1; k++) {
					y = pairs2[k];
					if (x === y) {
						hit_count++;
					}
				}
			}
			if (hit_count > 0) {
				return 2.0 * hit_count / union;
			}
		}
		return 0.0;
	};
	let relevance = stringSimilarity(item1, item2);
	if (relevance > tinyTerms[tinyTerms.pickedList].ops.wordAccuracy)
		return "mispelled";

	// Else false
	return false;
}

// When user navigates away from page
const appBlur = function appBlur() {
	let hidden = "hidden";

	// Standards:
	if (hidden in document)
		document.addEventListener("visibilitychange", onchange);
	else if ((hidden = "mozHidden") in document)
		document.addEventListener("mozvisibilitychange", onchange);
	else if ((hidden = "webkitHidden") in document)
		document.addEventListener("webkitvisibilitychange", onchange);
	else if ((hidden = "msHidden") in document)
		document.addEventListener("msvisibilitychange", onchange);
	else if ("onfocusin" in document)
		// IE 9 and lower:
		document.onfocusin = (document.onfocusout = onchange);
	else
		// All others:
		window.onpageshow = (window.onpagehide = (window.onfocus = (window.onblur = onchange)));

	function onchange(evt) {
		let v = "visible",
			h = "hidden",
			evtMap = {
				focus: v,
				focusin: v,
				pageshow: v,
				blur: h,
				focusout: h,
				pagehide: h
			};

		evt = evt || window.event;
		if (evt.type in evtMap) {
			//cl(evtMap[evt.type]);
		}
		else {
			location.reload();
		}
	}

	// set the initial state (but only if browser supports the Page Visibility API)
	if (document[hidden] !== undefined)
		onchange({
			type: document[hidden] ? "blur" : "focus"
		});
};

// Order array based on nested key
const sortArrayByKey = function sortArrayByKey(arr, key, reverse) {
	let sortOrder = 1;
	if (reverse) {
		sortOrder = -1;
	}
	return arr.sort(function (a, b) {
		let x = a[1][key];
		let y = b[1][key];
		return sortOrder * (x < y ? -1 : x > y ? 1 : 0);
	});
};

// Creates JSONP requests
const jsonp = function jsonp(uri) {
	return new Promise(function (resolve, reject) {
		let id = "_" + Math.round(10000 * Math.random());
		let callbackName = "jsonp_callback_" + id;
		window[callbackName] = function (data) {
			delete window[callbackName];
			let ele = document.getElementById(id);
			ele.parentNode.removeChild(ele);
			resolve(data);
		};

		let src = uri + "&callback=" + callbackName;
		let script = document.createElement("script");
		script.src = src;
		script.id = id;
		script.addEventListener("error", reject);
		(document.getElementsByTagName("head")[0] ||
			document.body ||
			document.documentElement)
			.appendChild(script);
	});
};

// Find all keys in object ! Potentially cyclicle !
const findKeys = function findKeys(obj, key) {
	let val = obj[key];
	let keysList = [];

	for (val in obj) {
		if (obj[val] === key) {
			keysList.push(obj[val]);
		}
	}
	return keysList;
};

// Handles count of a type of data
const updateDataCount = function updateDataCount(
	objectParent,
	newProps,
	baseValue
) {
	// If no viewed data, create new
	if (!objectParent.hasOwnProperty(newProps)) {
		for (let value of newProps) {
			objectParent[value] = baseValue;
		}
	}
	else {
		// If viewed data exists
		// Update count
		for (let value of newProps) {
			if (objectParent.hasOwnProperty(value)) {
				objectParent[value] += 1;
			}
			else {
				objectParent[value] = baseValue;
			}
		}
	}
	// Pass back final object
	return objectParent;
};

// Returns a CSS property for an elements
const getCSS = function getCSS(style, selector) {
	for (let i = 0; i < document.styleSheets.length; i++) {
		let mysheet = document.styleSheets[i];
		let myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
		for (let j = 0; j < myrules.length; j++) {
			if (
				myrules[j].selectorText &&
				myrules[j].selectorText.toLowerCase() === selector
			) {
				return myrules[j].style[style];
			}
		}
	}
};