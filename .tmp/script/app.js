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

    // Check if two words the same
    function checkQuery(item1, item2) {

        if (item1 === item2) return true;
        if (item1.toUpperCase() === item2.toUpperCase()) return true;

        // Perform fuzzy comparison
        var getBigrams = function getBigrams(string) {
            var i = void 0,
                j = void 0,
                ref = void 0,
                s = void 0,
                v = void 0;
            s = string.toLowerCase();
            v = new Array(s.length - 1);
            for (i = j = 0, ref = v.length; j <= ref; i = j += 1) {
                v[i] = s.slice(i, i + 2);
            }
            return v;
        };
        var stringSimilarity = function stringSimilarity(str1, str2) {
            var hit_count = void 0,
                j = void 0,
                k = void 0,
                len = void 0,
                len1 = void 0,
                pairs1 = void 0,
                pairs2 = void 0,
                union = void 0,
                x = void 0,
                y = void 0;
            if (str1.length > 0 && str2.length > 0) {
                pairs1 = getBigrams(str1);
                pairs2 = getBigrams(str2);
                union = pairs1.length + pairs2.length;
                hit_count = 0;
                for (j = 0, len = pairs1.length; j < len; j++) {
                    x = pairs1[j];
                    for (k = 0, len1 = pairs2.length; k < len1; k++) {
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
        var relevance = stringSimilarity(item1, item2);
        if (relevance > ops$1.wordAccuracy) return "mispelled";

        // Else false
        return false;
    }

    // When user navigates away from page
    var appBlur = function appBlur() {
        var hidden = "hidden";

        // Standards:
        if (hidden in document) document.addEventListener("visibilitychange", onchange);else if ((hidden = "mozHidden") in document) document.addEventListener("mozvisibilitychange", onchange);else if ((hidden = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", onchange);else if ((hidden = "msHidden") in document) document.addEventListener("msvisibilitychange", onchange);
        // IE 9 and lower:
        else if ("onfocusin" in document) document.onfocusin = document.onfocusout = onchange;
            // All others:
            else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

        function onchange(evt) {
            var v = "visible",
                h = "hidden",
                evtMap = {
                focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
            };

            evt = evt || window.event;
            if (evt.type in evtMap) document.body.className = evtMap[evt.type];else location.reload();
        }

        // set the initial state (but only if browser supports the Page Visibility API)
        if (document[hidden] !== undefined) onchange({ type: document[hidden] ? "blur" : "focus" });
    };

    // App data

    var appData = {

        terms: {
            accogliere: {
                term: "accogliere",
                definition: "receive",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>accolgo</td></tr><tr><td>tu</td><td data='irregular'>accogli</td></tr><tr><td>lui/lei</td><td data='regular'>accoglie</td></tr><tr><td>noi</td><td data='irregular'>accogliamo</td></tr><tr><td>voi</td><td data='regular'>accogliete</td></tr><tr><td>loro</td><td data='irregular'>accolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>accoglievo</td></tr><tr><td>tu</td><td data='regular'>accoglievi</td></tr><tr><td>lui/lei</td><td data='regular'>accoglieva</td></tr><tr><td>noi</td><td data='regular'>accoglievamo</td></tr><tr><td>voi</td><td data='regular'>accoglievate</td></tr><tr><td>loro</td><td data='regular'>accoglievano</td></tr></tbody></table></div>"
            },
            accompagnare: {
                term: "accompagnare",
                definition: "accompany",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>accompagno</td></tr><tr><td>tu</td><td data='regular'>accompagni</td></tr><tr><td>lui/lei</td><td data='regular'>accompagna</td></tr><tr><td>noi</td><td data='regular'>accompagniamo</td></tr><tr><td>voi</td><td data='regular'>accompagnate</td></tr><tr><td>loro</td><td data='regular'>accompagnano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>accompagnavo</td></tr><tr><td>tu</td><td data='regular'>accompagnavi</td></tr><tr><td>lui/lei</td><td data='regular'>accompagnava</td></tr><tr><td>noi</td><td data='regular'>accompagnavamo</td></tr><tr><td>voi</td><td data='regular'>accompagnavate</td></tr><tr><td>loro</td><td data='regular'>accompagnavano</td></tr></tbody></table></div>"
            },
            affermare: {
                term: "affermare",
                definition: "affirm",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>affermo</td></tr><tr><td>tu</td><td data='regular'>affermi</td></tr><tr><td>lui/lei</td><td data='regular'>afferma</td></tr><tr><td>noi</td><td data='regular'>affermiamo</td></tr><tr><td>voi</td><td data='regular'>affermate</td></tr><tr><td>loro</td><td data='regular'>affermano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>affermavo</td></tr><tr><td>tu</td><td data='regular'>affermavi</td></tr><tr><td>lui/lei</td><td data='regular'>affermava</td></tr><tr><td>noi</td><td data='regular'>affermavamo</td></tr><tr><td>voi</td><td data='regular'>affermavate</td></tr><tr><td>loro</td><td data='regular'>affermavano</td></tr></tbody></table></div>"
            },
            affrontare: {
                term: "affrontare",
                definition: "face",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>affronto</td></tr><tr><td>tu</td><td data='regular'>affronti</td></tr><tr><td>lui/lei</td><td data='regular'>affronta</td></tr><tr><td>noi</td><td data='regular'>affrontiamo</td></tr><tr><td>voi</td><td data='regular'>affrontate</td></tr><tr><td>loro</td><td data='regular'>affrontano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>affrontavo</td></tr><tr><td>tu</td><td data='regular'>affrontavi</td></tr><tr><td>lui/lei</td><td data='regular'>affrontava</td></tr><tr><td>noi</td><td data='regular'>affrontavamo</td></tr><tr><td>voi</td><td data='regular'>affrontavate</td></tr><tr><td>loro</td><td data='regular'>affrontavano</td></tr></tbody></table></div>"
            },
            aggiungere: {
                term: "aggiungere",
                definition: "add",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>aggiungo</td></tr><tr><td>tu</td><td data='regular'>aggiungi</td></tr><tr><td>lui/lei</td><td data='regular'>aggiunge</td></tr><tr><td>noi</td><td data='regular'>aggiungiamo</td></tr><tr><td>voi</td><td data='regular'>aggiungete</td></tr><tr><td>loro</td><td data='regular'>aggiungono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>aggiungevo</td></tr><tr><td>tu</td><td data='regular'>aggiungevi</td></tr><tr><td>lui/lei</td><td data='regular'>aggiungeva</td></tr><tr><td>noi</td><td data='regular'>aggiungevamo</td></tr><tr><td>voi</td><td data='regular'>aggiungevate</td></tr><tr><td>loro</td><td data='regular'>aggiungevano</td></tr></tbody></table></div>"
            },
            aiutare: {
                term: "aiutare",
                definition: "help",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>aiuto</td></tr><tr><td>tu</td><td data='regular'>aiuti</td></tr><tr><td>lui/lei</td><td data='regular'>aiuta</td></tr><tr><td>noi</td><td data='regular'>aiutiamo</td></tr><tr><td>voi</td><td data='regular'>aiutate</td></tr><tr><td>loro</td><td data='regular'>aiutano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>aiutavo</td></tr><tr><td>tu</td><td data='regular'>aiutavi</td></tr><tr><td>lui/lei</td><td data='regular'>aiutava</td></tr><tr><td>noi</td><td data='regular'>aiutavamo</td></tr><tr><td>voi</td><td data='regular'>aiutavate</td></tr><tr><td>loro</td><td data='regular'>aiutavano</td></tr></tbody></table></div>"
            },
            allontanare: {
                term: "allontanare",
                definition: "remove",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>allontano</td></tr><tr><td>tu</td><td data='regular'>allontani</td></tr><tr><td>lui/lei</td><td data='regular'>allontana</td></tr><tr><td>noi</td><td data='regular'>allontaniamo</td></tr><tr><td>voi</td><td data='regular'>allontanate</td></tr><tr><td>loro</td><td data='regular'>allontanano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>allontanavo</td></tr><tr><td>tu</td><td data='regular'>allontanavi</td></tr><tr><td>lui/lei</td><td data='regular'>allontanava</td></tr><tr><td>noi</td><td data='regular'>allontanavamo</td></tr><tr><td>voi</td><td data='regular'>allontanavate</td></tr><tr><td>loro</td><td data='regular'>allontanavano</td></tr></tbody></table></div>"
            },
            alzare: {
                term: "alzare",
                definition: "raise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>alzo</td></tr><tr><td>tu</td><td data='regular'>alzi</td></tr><tr><td>lui/lei</td><td data='regular'>alza</td></tr><tr><td>noi</td><td data='regular'>alziamo</td></tr><tr><td>voi</td><td data='regular'>alzate</td></tr><tr><td>loro</td><td data='regular'>alzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>alzavo</td></tr><tr><td>tu</td><td data='regular'>alzavi</td></tr><tr><td>lui/lei</td><td data='regular'>alzava</td></tr><tr><td>noi</td><td data='regular'>alzavamo</td></tr><tr><td>voi</td><td data='regular'>alzavate</td></tr><tr><td>loro</td><td data='regular'>alzavano</td></tr></tbody></table></div>"
            },
            amare: {
                term: "amare",
                definition: "love",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>amo</td></tr><tr><td>tu</td><td data='regular'>ami</td></tr><tr><td>lui/lei</td><td data='regular'>ama</td></tr><tr><td>noi</td><td data='regular'>amiamo</td></tr><tr><td>voi</td><td data='regular'>amate</td></tr><tr><td>loro</td><td data='regular'>amano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>amavo</td></tr><tr><td>tu</td><td data='regular'>amavi</td></tr><tr><td>lui/lei</td><td data='regular'>amava</td></tr><tr><td>noi</td><td data='regular'>amavamo</td></tr><tr><td>voi</td><td data='regular'>amavate</td></tr><tr><td>loro</td><td data='regular'>amavano</td></tr></tbody></table></div>"
            },
            ammazzare: {
                term: "ammazzare",
                definition: "kill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ammazzo</td></tr><tr><td>tu</td><td data='regular'>ammazzi</td></tr><tr><td>lui/lei</td><td data='regular'>ammazza</td></tr><tr><td>noi</td><td data='regular'>ammazziamo</td></tr><tr><td>voi</td><td data='regular'>ammazzate</td></tr><tr><td>loro</td><td data='regular'>ammazzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ammazzavo</td></tr><tr><td>tu</td><td data='regular'>ammazzavi</td></tr><tr><td>lui/lei</td><td data='regular'>ammazzava</td></tr><tr><td>noi</td><td data='regular'>ammazzavamo</td></tr><tr><td>voi</td><td data='regular'>ammazzavate</td></tr><tr><td>loro</td><td data='regular'>ammazzavano</td></tr></tbody></table></div>"
            },
            ammettere: {
                term: "ammettere",
                definition: "admit",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ammetto</td></tr><tr><td>tu</td><td data='regular'>ammetti</td></tr><tr><td>lui/lei</td><td data='regular'>ammette</td></tr><tr><td>noi</td><td data='regular'>ammettiamo</td></tr><tr><td>voi</td><td data='regular'>ammettete</td></tr><tr><td>loro</td><td data='regular'>ammettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ammettevo</td></tr><tr><td>tu</td><td data='regular'>ammettevi</td></tr><tr><td>lui/lei</td><td data='regular'>ammetteva</td></tr><tr><td>noi</td><td data='regular'>ammettevamo</td></tr><tr><td>voi</td><td data='regular'>ammettevate</td></tr><tr><td>loro</td><td data='regular'>ammettevano</td></tr></tbody></table></div>"
            },
            andare: {
                term: "andare",
                definition: "go",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>vado</td></tr><tr><td>tu</td><td data='irregular'>vai</td></tr><tr><td>lui/lei</td><td data='irregular'>va</td></tr><tr><td>noi</td><td data='regular'>andiamo</td></tr><tr><td>voi</td><td data='regular'>andate</td></tr><tr><td>loro</td><td data='irregular'>vanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>andavo</td></tr><tr><td>tu</td><td data='regular'>andavi</td></tr><tr><td>lui/lei</td><td data='regular'>andava</td></tr><tr><td>noi</td><td data='regular'>andavamo</td></tr><tr><td>voi</td><td data='regular'>andavate</td></tr><tr><td>loro</td><td data='regular'>andavano</td></tr></tbody></table></div>"
            },
            annunciare: {
                term: "annunciare",
                definition: "announce",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>annuncio</td></tr><tr><td>tu</td><td data='regular'>annunci</td></tr><tr><td>lui/lei</td><td data='regular'>annuncia</td></tr><tr><td>noi</td><td data='regular'>annunciamo</td></tr><tr><td>voi</td><td data='regular'>annunciate</td></tr><tr><td>loro</td><td data='regular'>annunciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>annunciavo</td></tr><tr><td>tu</td><td data='regular'>annunciavi</td></tr><tr><td>lui/lei</td><td data='regular'>annunciava</td></tr><tr><td>noi</td><td data='regular'>annunciavamo</td></tr><tr><td>voi</td><td data='regular'>annunciavate</td></tr><tr><td>loro</td><td data='regular'>annunciavano</td></tr></tbody></table></div>"
            },
            apparire: {
                term: "apparire",
                definition: "appear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>appaio</td></tr><tr><td>tu</td><td data='regular'>appari</td></tr><tr><td>lui/lei</td><td data='regular'>appare</td></tr><tr><td>noi</td><td data='regular'>appariamo</td></tr><tr><td>voi</td><td data='regular'>apparite</td></tr><tr><td>loro</td><td data='irregular'>appaiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>apparivo</td></tr><tr><td>tu</td><td data='regular'>apparivi</td></tr><tr><td>lui/lei</td><td data='regular'>appariva</td></tr><tr><td>noi</td><td data='regular'>apparivamo</td></tr><tr><td>voi</td><td data='regular'>apparivate</td></tr><tr><td>loro</td><td data='regular'>apparivano</td></tr></tbody></table></div>"
            },
            appartenere: {
                term: "appartenere",
                definition: "belong",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>appartengo</td></tr><tr><td>tu</td><td data='irregular'>appartieni</td></tr><tr><td>lui/lei</td><td data='irregular'>appartiene</td></tr><tr><td>noi</td><td data='regular'>apparteniamo</td></tr><tr><td>voi</td><td data='regular'>appartenete</td></tr><tr><td>loro</td><td data='irregular'>appartengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>appartenevo</td></tr><tr><td>tu</td><td data='regular'>appartenevi</td></tr><tr><td>lui/lei</td><td data='regular'>apparteneva</td></tr><tr><td>noi</td><td data='regular'>appartenevamo</td></tr><tr><td>voi</td><td data='regular'>appartenevate</td></tr><tr><td>loro</td><td data='regular'>appartenevano</td></tr></tbody></table></div>"
            },
            appoggiare: {
                term: "appoggiare",
                definition: "support",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>appoggio</td></tr><tr><td>tu</td><td data='regular'>appoggi</td></tr><tr><td>lui/lei</td><td data='regular'>appoggia</td></tr><tr><td>noi</td><td data='regular'>appoggiamo</td></tr><tr><td>voi</td><td data='regular'>appoggiate</td></tr><tr><td>loro</td><td data='regular'>appoggiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>appoggiavo</td></tr><tr><td>tu</td><td data='regular'>appoggiavi</td></tr><tr><td>lui/lei</td><td data='regular'>appoggiava</td></tr><tr><td>noi</td><td data='regular'>appoggiavamo</td></tr><tr><td>voi</td><td data='regular'>appoggiavate</td></tr><tr><td>loro</td><td data='regular'>appoggiavano</td></tr></tbody></table></div>"
            },
            aprire: {
                term: "aprire",
                definition: "open",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>apro</td></tr><tr><td>tu</td><td data='regular'>apri</td></tr><tr><td>lui/lei</td><td data='regular'>apre</td></tr><tr><td>noi</td><td data='regular'>apriamo</td></tr><tr><td>voi</td><td data='regular'>aprite</td></tr><tr><td>loro</td><td data='regular'>aprono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>aprivo</td></tr><tr><td>tu</td><td data='regular'>aprivi</td></tr><tr><td>lui/lei</td><td data='regular'>apriva</td></tr><tr><td>noi</td><td data='regular'>aprivamo</td></tr><tr><td>voi</td><td data='regular'>aprivate</td></tr><tr><td>loro</td><td data='regular'>aprivano</td></tr></tbody></table></div>"
            },
            armare: {
                term: "armare",
                definition: "arm",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>armo</td></tr><tr><td>tu</td><td data='regular'>armi</td></tr><tr><td>lui/lei</td><td data='regular'>arma</td></tr><tr><td>noi</td><td data='regular'>armiamo</td></tr><tr><td>voi</td><td data='regular'>armate</td></tr><tr><td>loro</td><td data='regular'>armano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>armavo</td></tr><tr><td>tu</td><td data='regular'>armavi</td></tr><tr><td>lui/lei</td><td data='regular'>armava</td></tr><tr><td>noi</td><td data='regular'>armavamo</td></tr><tr><td>voi</td><td data='regular'>armavate</td></tr><tr><td>loro</td><td data='regular'>armavano</td></tr></tbody></table></div>"
            },
            arrestare: {
                term: "arrestare",
                definition: "stop",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>arresto</td></tr><tr><td>tu</td><td data='regular'>arresti</td></tr><tr><td>lui/lei</td><td data='regular'>arresta</td></tr><tr><td>noi</td><td data='regular'>arrestiamo</td></tr><tr><td>voi</td><td data='regular'>arrestate</td></tr><tr><td>loro</td><td data='regular'>arrestano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>arrestavo</td></tr><tr><td>tu</td><td data='regular'>arrestavi</td></tr><tr><td>lui/lei</td><td data='regular'>arrestava</td></tr><tr><td>noi</td><td data='regular'>arrestavamo</td></tr><tr><td>voi</td><td data='regular'>arrestavate</td></tr><tr><td>loro</td><td data='regular'>arrestavano</td></tr></tbody></table></div>"
            },
            arrivare: {
                term: "arrivare",
                definition: "arrive",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>arrivo</td></tr><tr><td>tu</td><td data='regular'>arrivi</td></tr><tr><td>lui/lei</td><td data='regular'>arriva</td></tr><tr><td>noi</td><td data='regular'>arriviamo</td></tr><tr><td>voi</td><td data='regular'>arrivate</td></tr><tr><td>loro</td><td data='regular'>arrivano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>arrivavo</td></tr><tr><td>tu</td><td data='regular'>arrivavi</td></tr><tr><td>lui/lei</td><td data='regular'>arrivava</td></tr><tr><td>noi</td><td data='regular'>arrivavamo</td></tr><tr><td>voi</td><td data='regular'>arrivavate</td></tr><tr><td>loro</td><td data='regular'>arrivavano</td></tr></tbody></table></div>"
            },
            ascoltare: {
                term: "ascoltare",
                definition: "listen",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ascolto</td></tr><tr><td>tu</td><td data='regular'>ascolti</td></tr><tr><td>lui/lei</td><td data='regular'>ascolta</td></tr><tr><td>noi</td><td data='regular'>ascoltiamo</td></tr><tr><td>voi</td><td data='regular'>ascoltate</td></tr><tr><td>loro</td><td data='regular'>ascoltano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ascoltavo</td></tr><tr><td>tu</td><td data='regular'>ascoltavi</td></tr><tr><td>lui/lei</td><td data='regular'>ascoltava</td></tr><tr><td>noi</td><td data='regular'>ascoltavamo</td></tr><tr><td>voi</td><td data='regular'>ascoltavate</td></tr><tr><td>loro</td><td data='regular'>ascoltavano</td></tr></tbody></table></div>"
            },
            aspettare: {
                term: "aspettare",
                definition: "wait",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>aspetto</td></tr><tr><td>tu</td><td data='regular'>aspetti</td></tr><tr><td>lui/lei</td><td data='regular'>aspetta</td></tr><tr><td>noi</td><td data='regular'>aspettiamo</td></tr><tr><td>voi</td><td data='regular'>aspettate</td></tr><tr><td>loro</td><td data='regular'>aspettano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>aspettavo</td></tr><tr><td>tu</td><td data='regular'>aspettavi</td></tr><tr><td>lui/lei</td><td data='regular'>aspettava</td></tr><tr><td>noi</td><td data='regular'>aspettavamo</td></tr><tr><td>voi</td><td data='regular'>aspettavate</td></tr><tr><td>loro</td><td data='regular'>aspettavano</td></tr></tbody></table></div>"
            },
            assicurare: {
                term: "assicurare",
                definition: "ensure",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>assicuro</td></tr><tr><td>tu</td><td data='regular'>assicuri</td></tr><tr><td>lui/lei</td><td data='regular'>assicura</td></tr><tr><td>noi</td><td data='regular'>assicuriamo</td></tr><tr><td>voi</td><td data='regular'>assicurate</td></tr><tr><td>loro</td><td data='regular'>assicurano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>assicuravo</td></tr><tr><td>tu</td><td data='regular'>assicuravi</td></tr><tr><td>lui/lei</td><td data='regular'>assicurava</td></tr><tr><td>noi</td><td data='regular'>assicuravamo</td></tr><tr><td>voi</td><td data='regular'>assicuravate</td></tr><tr><td>loro</td><td data='regular'>assicuravano</td></tr></tbody></table></div>"
            },
            assistere: {
                term: "assistere",
                definition: "assist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>assisto</td></tr><tr><td>tu</td><td data='regular'>assisti</td></tr><tr><td>lui/lei</td><td data='regular'>assiste</td></tr><tr><td>noi</td><td data='regular'>assistiamo</td></tr><tr><td>voi</td><td data='regular'>assistete</td></tr><tr><td>loro</td><td data='regular'>assistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>assistevo</td></tr><tr><td>tu</td><td data='regular'>assistevi</td></tr><tr><td>lui/lei</td><td data='regular'>assisteva</td></tr><tr><td>noi</td><td data='regular'>assistevamo</td></tr><tr><td>voi</td><td data='regular'>assistevate</td></tr><tr><td>loro</td><td data='regular'>assistevano</td></tr></tbody></table></div>"
            },
            assumere: {
                term: "assumere",
                definition: "take",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>assumo</td></tr><tr><td>tu</td><td data='regular'>assumi</td></tr><tr><td>lui/lei</td><td data='regular'>assume</td></tr><tr><td>noi</td><td data='regular'>assumiamo</td></tr><tr><td>voi</td><td data='regular'>assumete</td></tr><tr><td>loro</td><td data='regular'>assumono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>assumevo</td></tr><tr><td>tu</td><td data='regular'>assumevi</td></tr><tr><td>lui/lei</td><td data='regular'>assumeva</td></tr><tr><td>noi</td><td data='regular'>assumevamo</td></tr><tr><td>voi</td><td data='regular'>assumevate</td></tr><tr><td>loro</td><td data='regular'>assumevano</td></tr></tbody></table></div>"
            },
            attaccare: {
                term: "attaccare",
                definition: "attack",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>attacco</td></tr><tr><td>tu</td><td data='regular'>attacchi</td></tr><tr><td>lui/lei</td><td data='regular'>attacca</td></tr><tr><td>noi</td><td data='regular'>attacchiamo</td></tr><tr><td>voi</td><td data='regular'>attaccate</td></tr><tr><td>loro</td><td data='regular'>attaccano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>attaccavo</td></tr><tr><td>tu</td><td data='regular'>attaccavi</td></tr><tr><td>lui/lei</td><td data='regular'>attaccava</td></tr><tr><td>noi</td><td data='regular'>attaccavamo</td></tr><tr><td>voi</td><td data='regular'>attaccavate</td></tr><tr><td>loro</td><td data='regular'>attaccavano</td></tr></tbody></table></div>"
            },
            attendere: {
                term: "attendere",
                definition: "wait for",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>attendo</td></tr><tr><td>tu</td><td data='regular'>attendi</td></tr><tr><td>lui/lei</td><td data='regular'>attende</td></tr><tr><td>noi</td><td data='regular'>attendiamo</td></tr><tr><td>voi</td><td data='regular'>attendete</td></tr><tr><td>loro</td><td data='regular'>attendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>attendevo</td></tr><tr><td>tu</td><td data='regular'>attendevi</td></tr><tr><td>lui/lei</td><td data='regular'>attendeva</td></tr><tr><td>noi</td><td data='regular'>attendevamo</td></tr><tr><td>voi</td><td data='regular'>attendevate</td></tr><tr><td>loro</td><td data='regular'>attendevano</td></tr></tbody></table></div>"
            },
            attraversare: {
                term: "attraversare",
                definition: "cross",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>attraverso</td></tr><tr><td>tu</td><td data='regular'>attraversi</td></tr><tr><td>lui/lei</td><td data='regular'>attraversa</td></tr><tr><td>noi</td><td data='regular'>attraversiamo</td></tr><tr><td>voi</td><td data='regular'>attraversate</td></tr><tr><td>loro</td><td data='regular'>attraversano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>attraversavo</td></tr><tr><td>tu</td><td data='regular'>attraversavi</td></tr><tr><td>lui/lei</td><td data='regular'>attraversava</td></tr><tr><td>noi</td><td data='regular'>attraversavamo</td></tr><tr><td>voi</td><td data='regular'>attraversavate</td></tr><tr><td>loro</td><td data='regular'>attraversavano</td></tr></tbody></table></div>"
            },
            aumentare: {
                term: "aumentare",
                definition: "increase",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>aumento</td></tr><tr><td>tu</td><td data='regular'>aumenti</td></tr><tr><td>lui/lei</td><td data='regular'>aumenta</td></tr><tr><td>noi</td><td data='regular'>aumentiamo</td></tr><tr><td>voi</td><td data='regular'>aumentate</td></tr><tr><td>loro</td><td data='regular'>aumentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>aumentavo</td></tr><tr><td>tu</td><td data='regular'>aumentavi</td></tr><tr><td>lui/lei</td><td data='regular'>aumentava</td></tr><tr><td>noi</td><td data='regular'>aumentavamo</td></tr><tr><td>voi</td><td data='regular'>aumentavate</td></tr><tr><td>loro</td><td data='regular'>aumentavano</td></tr></tbody></table></div>"
            },
            avanzare: {
                term: "avanzare",
                definition: "advance",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>avanzo</td></tr><tr><td>tu</td><td data='regular'>avanzi</td></tr><tr><td>lui/lei</td><td data='regular'>avanza</td></tr><tr><td>noi</td><td data='regular'>avanziamo</td></tr><tr><td>voi</td><td data='regular'>avanzate</td></tr><tr><td>loro</td><td data='regular'>avanzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>avanzavo</td></tr><tr><td>tu</td><td data='regular'>avanzavi</td></tr><tr><td>lui/lei</td><td data='regular'>avanzava</td></tr><tr><td>noi</td><td data='regular'>avanzavamo</td></tr><tr><td>voi</td><td data='regular'>avanzavate</td></tr><tr><td>loro</td><td data='regular'>avanzavano</td></tr></tbody></table></div>"
            },
            avere: {
                term: "avere",
                definition: "have",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>ho</td></tr><tr><td>tu</td><td data='irregular'>hai</td></tr><tr><td>lui/lei</td><td data='irregular'>ha</td></tr><tr><td>noi</td><td data='irregular'>abbiamo</td></tr><tr><td>voi</td><td data='regular'>avete</td></tr><tr><td>loro</td><td data='irregular'>hanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>avevo</td></tr><tr><td>tu</td><td data='regular'>avevi</td></tr><tr><td>lui/lei</td><td data='regular'>aveva</td></tr><tr><td>noi</td><td data='regular'>avevamo</td></tr><tr><td>voi</td><td data='regular'>avevate</td></tr><tr><td>loro</td><td data='regular'>avevano</td></tr></tbody></table></div>"
            },
            avvertire: {
                term: "avvertire",
                definition: "warn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>avverto</td></tr><tr><td>tu</td><td data='regular'>avverti</td></tr><tr><td>lui/lei</td><td data='regular'>avverte</td></tr><tr><td>noi</td><td data='regular'>avvertiamo</td></tr><tr><td>voi</td><td data='regular'>avvertite</td></tr><tr><td>loro</td><td data='regular'>avvertono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>avvertivo</td></tr><tr><td>tu</td><td data='regular'>avvertivi</td></tr><tr><td>lui/lei</td><td data='regular'>avvertiva</td></tr><tr><td>noi</td><td data='regular'>avvertivamo</td></tr><tr><td>voi</td><td data='regular'>avvertivate</td></tr><tr><td>loro</td><td data='regular'>avvertivano</td></tr></tbody></table></div>"
            },
            avvicinare: {
                term: "avvicinare",
                definition: "approach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>avvicino</td></tr><tr><td>tu</td><td data='regular'>avvicini</td></tr><tr><td>lui/lei</td><td data='regular'>avvicina</td></tr><tr><td>noi</td><td data='regular'>avviciniamo</td></tr><tr><td>voi</td><td data='regular'>avvicinate</td></tr><tr><td>loro</td><td data='regular'>avvicinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>avvicinavo</td></tr><tr><td>tu</td><td data='regular'>avvicinavi</td></tr><tr><td>lui/lei</td><td data='regular'>avvicinava</td></tr><tr><td>noi</td><td data='regular'>avvicinavamo</td></tr><tr><td>voi</td><td data='regular'>avvicinavate</td></tr><tr><td>loro</td><td data='regular'>avvicinavano</td></tr></tbody></table></div>"
            },
            baciare: {
                term: "baciare",
                definition: "kiss",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>bacio</td></tr><tr><td>tu</td><td data='regular'>baci</td></tr><tr><td>lui/lei</td><td data='regular'>bacia</td></tr><tr><td>noi</td><td data='regular'>baciamo</td></tr><tr><td>voi</td><td data='regular'>baciate</td></tr><tr><td>loro</td><td data='regular'>baciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>baciavo</td></tr><tr><td>tu</td><td data='regular'>baciavi</td></tr><tr><td>lui/lei</td><td data='regular'>baciava</td></tr><tr><td>noi</td><td data='regular'>baciavamo</td></tr><tr><td>voi</td><td data='regular'>baciavate</td></tr><tr><td>loro</td><td data='regular'>baciavano</td></tr></tbody></table></div>"
            },
            badare: {
                term: "badare",
                definition: "look after",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>bado</td></tr><tr><td>tu</td><td data='regular'>badi</td></tr><tr><td>lui/lei</td><td data='regular'>bada</td></tr><tr><td>noi</td><td data='regular'>badiamo</td></tr><tr><td>voi</td><td data='regular'>badate</td></tr><tr><td>loro</td><td data='regular'>badano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>badavo</td></tr><tr><td>tu</td><td data='regular'>badavi</td></tr><tr><td>lui/lei</td><td data='regular'>badava</td></tr><tr><td>noi</td><td data='regular'>badavamo</td></tr><tr><td>voi</td><td data='regular'>badavate</td></tr><tr><td>loro</td><td data='regular'>badavano</td></tr></tbody></table></div>"
            },
            bastare: {
                term: "bastare",
                definition: "suffice",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>basto</td></tr><tr><td>tu</td><td data='regular'>basti</td></tr><tr><td>lui/lei</td><td data='regular'>basta</td></tr><tr><td>noi</td><td data='regular'>bastiamo</td></tr><tr><td>voi</td><td data='regular'>bastate</td></tr><tr><td>loro</td><td data='regular'>bastano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>bastavo</td></tr><tr><td>tu</td><td data='regular'>bastavi</td></tr><tr><td>lui/lei</td><td data='regular'>bastava</td></tr><tr><td>noi</td><td data='regular'>bastavamo</td></tr><tr><td>voi</td><td data='regular'>bastavate</td></tr><tr><td>loro</td><td data='regular'>bastavano</td></tr></tbody></table></div>"
            },
            battere: {
                term: "battere",
                definition: "beat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>batto</td></tr><tr><td>tu</td><td data='regular'>batti</td></tr><tr><td>lui/lei</td><td data='regular'>batte</td></tr><tr><td>noi</td><td data='regular'>battiamo</td></tr><tr><td>voi</td><td data='regular'>battete</td></tr><tr><td>loro</td><td data='regular'>battono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>battevo</td></tr><tr><td>tu</td><td data='regular'>battevi</td></tr><tr><td>lui/lei</td><td data='regular'>batteva</td></tr><tr><td>noi</td><td data='regular'>battevamo</td></tr><tr><td>voi</td><td data='regular'>battevate</td></tr><tr><td>loro</td><td data='regular'>battevano</td></tr></tbody></table></div>"
            },
            bere: {
                term: "bere",
                definition: "drinking",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>bevo</td></tr><tr><td>tu</td><td data='irregular'>bevi</td></tr><tr><td>lui/lei</td><td data='irregular'>beve</td></tr><tr><td>noi</td><td data='irregular'>beviamo</td></tr><tr><td>voi</td><td data='irregular'>bevete</td></tr><tr><td>loro</td><td data='irregular'>bevono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>bevevo</td></tr><tr><td>tu</td><td data='irregular'>bevevi</td></tr><tr><td>lui/lei</td><td data='irregular'>beveva</td></tr><tr><td>noi</td><td data='irregular'>bevevamo</td></tr><tr><td>voi</td><td data='irregular'>bevevate</td></tr><tr><td>loro</td><td data='irregular'>bevevano</td></tr></tbody></table></div>"
            },
            bisognare: {
                term: "bisognare",
                definition: "bisognare",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td>-</td></tr><tr><td>tu</td><td>-</td></tr><tr><td>lui/lei</td><td data='regular'>bisogna</td></tr><tr><td>noi</td><td>-</td></tr><tr><td>voi</td><td>-</td></tr><tr><td>loro</td><td>-</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>-</td></tr><tr><td>tu</td><td>-</td></tr><tr><td>lui/lei</td><td data='regular'>bisognava</td></tr><tr><td>noi</td><td>-</td></tr><tr><td>voi</td><td>-</td></tr><tr><td>loro</td><td>-</td></tr></tbody></table></div>"
            },
            bruciare: {
                term: "bruciare",
                definition: "burn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>brucio</td></tr><tr><td>tu</td><td data='regular'>bruci</td></tr><tr><td>lui/lei</td><td data='regular'>brucia</td></tr><tr><td>noi</td><td data='regular'>bruciamo</td></tr><tr><td>voi</td><td data='regular'>bruciate</td></tr><tr><td>loro</td><td data='regular'>bruciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>bruciavo</td></tr><tr><td>tu</td><td data='regular'>bruciavi</td></tr><tr><td>lui/lei</td><td data='regular'>bruciava</td></tr><tr><td>noi</td><td data='regular'>bruciavamo</td></tr><tr><td>voi</td><td data='regular'>bruciavate</td></tr><tr><td>loro</td><td data='regular'>bruciavano</td></tr></tbody></table></div>"
            },
            buttare: {
                term: "buttare",
                definition: "throw",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>butto</td></tr><tr><td>tu</td><td data='regular'>butti</td></tr><tr><td>lui/lei</td><td data='regular'>butta</td></tr><tr><td>noi</td><td data='regular'>buttiamo</td></tr><tr><td>voi</td><td data='regular'>buttate</td></tr><tr><td>loro</td><td data='regular'>buttano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>buttavo</td></tr><tr><td>tu</td><td data='regular'>buttavi</td></tr><tr><td>lui/lei</td><td data='regular'>buttava</td></tr><tr><td>noi</td><td data='regular'>buttavamo</td></tr><tr><td>voi</td><td data='regular'>buttavate</td></tr><tr><td>loro</td><td data='regular'>buttavano</td></tr></tbody></table></div>"
            },
            cadere: {
                term: "cadere",
                definition: "fall",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>cado</td></tr><tr><td>tu</td><td data='regular'>cadi</td></tr><tr><td>lui/lei</td><td data='regular'>cade</td></tr><tr><td>noi</td><td data='regular'>cadiamo</td></tr><tr><td>voi</td><td data='regular'>cadete</td></tr><tr><td>loro</td><td data='regular'>cadono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>cadevo</td></tr><tr><td>tu</td><td data='regular'>cadevi</td></tr><tr><td>lui/lei</td><td data='regular'>cadeva</td></tr><tr><td>noi</td><td data='regular'>cadevamo</td></tr><tr><td>voi</td><td data='regular'>cadevate</td></tr><tr><td>loro</td><td data='regular'>cadevano</td></tr></tbody></table></div>"
            },
            cambiare: {
                term: "cambiare",
                definition: "change",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>cambio</td></tr><tr><td>tu</td><td data='regular'>cambi</td></tr><tr><td>lui/lei</td><td data='regular'>cambia</td></tr><tr><td>noi</td><td data='regular'>cambiamo</td></tr><tr><td>voi</td><td data='regular'>cambiate</td></tr><tr><td>loro</td><td data='regular'>cambiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>cambiavo</td></tr><tr><td>tu</td><td data='regular'>cambiavi</td></tr><tr><td>lui/lei</td><td data='regular'>cambiava</td></tr><tr><td>noi</td><td data='regular'>cambiavamo</td></tr><tr><td>voi</td><td data='regular'>cambiavate</td></tr><tr><td>loro</td><td data='regular'>cambiavano</td></tr></tbody></table></div>"
            },
            camminare: {
                term: "camminare",
                definition: "walk",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>cammino</td></tr><tr><td>tu</td><td data='regular'>cammini</td></tr><tr><td>lui/lei</td><td data='regular'>cammina</td></tr><tr><td>noi</td><td data='regular'>camminiamo</td></tr><tr><td>voi</td><td data='regular'>camminate</td></tr><tr><td>loro</td><td data='regular'>camminano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>camminavo</td></tr><tr><td>tu</td><td data='regular'>camminavi</td></tr><tr><td>lui/lei</td><td data='regular'>camminava</td></tr><tr><td>noi</td><td data='regular'>camminavamo</td></tr><tr><td>voi</td><td data='regular'>camminavate</td></tr><tr><td>loro</td><td data='regular'>camminavano</td></tr></tbody></table></div>"
            },
            cantare: {
                term: "cantare",
                definition: "sing",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>canto</td></tr><tr><td>tu</td><td data='regular'>canti</td></tr><tr><td>lui/lei</td><td data='regular'>canta</td></tr><tr><td>noi</td><td data='regular'>cantiamo</td></tr><tr><td>voi</td><td data='regular'>cantate</td></tr><tr><td>loro</td><td data='regular'>cantano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>cantavo</td></tr><tr><td>tu</td><td data='regular'>cantavi</td></tr><tr><td>lui/lei</td><td data='regular'>cantava</td></tr><tr><td>noi</td><td data='regular'>cantavamo</td></tr><tr><td>voi</td><td data='regular'>cantavate</td></tr><tr><td>loro</td><td data='regular'>cantavano</td></tr></tbody></table></div>"
            },
            capire: {
                term: "capire",
                definition: "understand",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>capisco</td></tr><tr><td>tu</td><td data='irregular'>capisci</td></tr><tr><td>lui/lei</td><td data='irregular'>capisce</td></tr><tr><td>noi</td><td data='regular'>capiamo</td></tr><tr><td>voi</td><td data='regular'>capite</td></tr><tr><td>loro</td><td data='irregular'>capiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>capivo</td></tr><tr><td>tu</td><td data='regular'>capivi</td></tr><tr><td>lui/lei</td><td data='regular'>capiva</td></tr><tr><td>noi</td><td data='regular'>capivamo</td></tr><tr><td>voi</td><td data='regular'>capivate</td></tr><tr><td>loro</td><td data='regular'>capivano</td></tr></tbody></table></div>"
            },
            celebrare: {
                term: "celebrare",
                definition: "celebrate",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>celebro</td></tr><tr><td>tu</td><td data='regular'>celebri</td></tr><tr><td>lui/lei</td><td data='regular'>celebra</td></tr><tr><td>noi</td><td data='regular'>celebriamo</td></tr><tr><td>voi</td><td data='regular'>celebrate</td></tr><tr><td>loro</td><td data='regular'>celebrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>celebravo</td></tr><tr><td>tu</td><td data='regular'>celebravi</td></tr><tr><td>lui/lei</td><td data='regular'>celebrava</td></tr><tr><td>noi</td><td data='regular'>celebravamo</td></tr><tr><td>voi</td><td data='regular'>celebravate</td></tr><tr><td>loro</td><td data='regular'>celebravano</td></tr></tbody></table></div>"
            },
            cercare: {
                term: "cercare",
                definition: "search",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>cerco</td></tr><tr><td>tu</td><td data='regular'>cerchi</td></tr><tr><td>lui/lei</td><td data='regular'>cerca</td></tr><tr><td>noi</td><td data='regular'>cerchiamo</td></tr><tr><td>voi</td><td data='regular'>cercate</td></tr><tr><td>loro</td><td data='regular'>cercano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>cercavo</td></tr><tr><td>tu</td><td data='regular'>cercavi</td></tr><tr><td>lui/lei</td><td data='regular'>cercava</td></tr><tr><td>noi</td><td data='regular'>cercavamo</td></tr><tr><td>voi</td><td data='regular'>cercavate</td></tr><tr><td>loro</td><td data='regular'>cercavano</td></tr></tbody></table></div>"
            },
            chiamare: {
                term: "chiamare",
                definition: "call",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>chiamo</td></tr><tr><td>tu</td><td data='regular'>chiami</td></tr><tr><td>lui/lei</td><td data='regular'>chiama</td></tr><tr><td>noi</td><td data='regular'>chiamiamo</td></tr><tr><td>voi</td><td data='regular'>chiamate</td></tr><tr><td>loro</td><td data='regular'>chiamano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>chiamavo</td></tr><tr><td>tu</td><td data='regular'>chiamavi</td></tr><tr><td>lui/lei</td><td data='regular'>chiamava</td></tr><tr><td>noi</td><td data='regular'>chiamavamo</td></tr><tr><td>voi</td><td data='regular'>chiamavate</td></tr><tr><td>loro</td><td data='regular'>chiamavano</td></tr></tbody></table></div>"
            },
            chiedere: {
                term: "chiedere",
                definition: "ask",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>chiedo</td></tr><tr><td>tu</td><td data='regular'>chiedi</td></tr><tr><td>lui/lei</td><td data='regular'>chiede</td></tr><tr><td>noi</td><td data='regular'>chiediamo</td></tr><tr><td>voi</td><td data='regular'>chiedete</td></tr><tr><td>loro</td><td data='regular'>chiedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>chiedevo</td></tr><tr><td>tu</td><td data='regular'>chiedevi</td></tr><tr><td>lui/lei</td><td data='regular'>chiedeva</td></tr><tr><td>noi</td><td data='regular'>chiedevamo</td></tr><tr><td>voi</td><td data='regular'>chiedevate</td></tr><tr><td>loro</td><td data='regular'>chiedevano</td></tr></tbody></table></div>"
            },
            chiudere: {
                term: "chiudere",
                definition: "close",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>chiudo</td></tr><tr><td>tu</td><td data='regular'>chiudi</td></tr><tr><td>lui/lei</td><td data='regular'>chiude</td></tr><tr><td>noi</td><td data='regular'>chiudiamo</td></tr><tr><td>voi</td><td data='regular'>chiudete</td></tr><tr><td>loro</td><td data='regular'>chiudono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>chiudevo</td></tr><tr><td>tu</td><td data='regular'>chiudevi</td></tr><tr><td>lui/lei</td><td data='regular'>chiudeva</td></tr><tr><td>noi</td><td data='regular'>chiudevamo</td></tr><tr><td>voi</td><td data='regular'>chiudevate</td></tr><tr><td>loro</td><td data='regular'>chiudevano</td></tr></tbody></table></div>"
            },
            colpire: {
                term: "colpire",
                definition: "hit",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>colpisco</td></tr><tr><td>tu</td><td data='irregular'>colpisci</td></tr><tr><td>lui/lei</td><td data='irregular'>colpisce</td></tr><tr><td>noi</td><td data='regular'>colpiamo</td></tr><tr><td>voi</td><td data='regular'>colpite</td></tr><tr><td>loro</td><td data='irregular'>colpiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>colpivo</td></tr><tr><td>tu</td><td data='regular'>colpivi</td></tr><tr><td>lui/lei</td><td data='regular'>colpiva</td></tr><tr><td>noi</td><td data='regular'>colpivamo</td></tr><tr><td>voi</td><td data='regular'>colpivate</td></tr><tr><td>loro</td><td data='regular'>colpivano</td></tr></tbody></table></div>"
            },
            cominciare: {
                term: "cominciare",
                definition: "begin",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>comincio</td></tr><tr><td>tu</td><td data='regular'>cominci</td></tr><tr><td>lui/lei</td><td data='regular'>comincia</td></tr><tr><td>noi</td><td data='regular'>cominciamo</td></tr><tr><td>voi</td><td data='regular'>cominciate</td></tr><tr><td>loro</td><td data='regular'>cominciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>cominciavo</td></tr><tr><td>tu</td><td data='regular'>cominciavi</td></tr><tr><td>lui/lei</td><td data='regular'>cominciava</td></tr><tr><td>noi</td><td data='regular'>cominciavamo</td></tr><tr><td>voi</td><td data='regular'>cominciavate</td></tr><tr><td>loro</td><td data='regular'>cominciavano</td></tr></tbody></table></div>"
            },
            compiere: {
                term: "compiere",
                definition: "fulfill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>compio</td></tr><tr><td>tu</td><td data='regular'>compii</td></tr><tr><td>lui/lei</td><td data='regular'>compie</td></tr><tr><td>noi</td><td data='regular'>compiiamo</td></tr><tr><td>voi</td><td data='regular'>compiete</td></tr><tr><td>loro</td><td data='regular'>compiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>compievo</td></tr><tr><td>tu</td><td data='regular'>compievi</td></tr><tr><td>lui/lei</td><td data='regular'>compieva</td></tr><tr><td>noi</td><td data='regular'>compievamo</td></tr><tr><td>voi</td><td data='regular'>compievate</td></tr><tr><td>loro</td><td data='regular'>compievano</td></tr></tbody></table></div>"
            },
            comporre: {
                term: "comporre",
                definition: "compose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>compongo</td></tr><tr><td>tu</td><td data='irregular'>componi</td></tr><tr><td>lui/lei</td><td data='irregular'>compone</td></tr><tr><td>noi</td><td data='irregular'>componiamo</td></tr><tr><td>voi</td><td data='irregular'>componete</td></tr><tr><td>loro</td><td data='irregular'>compongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>componevo</td></tr><tr><td>tu</td><td data='irregular'>componevi</td></tr><tr><td>lui/lei</td><td data='irregular'>componeva</td></tr><tr><td>noi</td><td data='irregular'>componevamo</td></tr><tr><td>voi</td><td data='irregular'>componevate</td></tr><tr><td>loro</td><td data='irregular'>componevano</td></tr></tbody></table></div>"
            },
            comprendere: {
                term: "comprendere",
                definition: "understand",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>comprendo</td></tr><tr><td>tu</td><td data='regular'>comprendi</td></tr><tr><td>lui/lei</td><td data='regular'>comprende</td></tr><tr><td>noi</td><td data='regular'>comprendiamo</td></tr><tr><td>voi</td><td data='regular'>comprendete</td></tr><tr><td>loro</td><td data='regular'>comprendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>comprendevo</td></tr><tr><td>tu</td><td data='regular'>comprendevi</td></tr><tr><td>lui/lei</td><td data='regular'>comprendeva</td></tr><tr><td>noi</td><td data='regular'>comprendevamo</td></tr><tr><td>voi</td><td data='regular'>comprendevate</td></tr><tr><td>loro</td><td data='regular'>comprendevano</td></tr></tbody></table></div>"
            },
            comprare: {
                term: "comprare",
                definition: "buy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>compro</td></tr><tr><td>tu</td><td data='regular'>compri</td></tr><tr><td>lui/lei</td><td data='regular'>compra</td></tr><tr><td>noi</td><td data='regular'>compriamo</td></tr><tr><td>voi</td><td data='regular'>comprate</td></tr><tr><td>loro</td><td data='regular'>comprano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>compravo</td></tr><tr><td>tu</td><td data='regular'>compravi</td></tr><tr><td>lui/lei</td><td data='regular'>comprava</td></tr><tr><td>noi</td><td data='regular'>compravamo</td></tr><tr><td>voi</td><td data='regular'>compravate</td></tr><tr><td>loro</td><td data='regular'>compravano</td></tr></tbody></table></div>"
            },
            concludere: {
                term: "concludere",
                definition: "conclude",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>concludo</td></tr><tr><td>tu</td><td data='regular'>concludi</td></tr><tr><td>lui/lei</td><td data='regular'>conclude</td></tr><tr><td>noi</td><td data='regular'>concludiamo</td></tr><tr><td>voi</td><td data='regular'>concludete</td></tr><tr><td>loro</td><td data='regular'>concludono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>concludevo</td></tr><tr><td>tu</td><td data='regular'>concludevi</td></tr><tr><td>lui/lei</td><td data='regular'>concludeva</td></tr><tr><td>noi</td><td data='regular'>concludevamo</td></tr><tr><td>voi</td><td data='regular'>concludevate</td></tr><tr><td>loro</td><td data='regular'>concludevano</td></tr></tbody></table></div>"
            },
            condurre: {
                term: "condurre",
                definition: "lead",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>conduco</td></tr><tr><td>tu</td><td data='irregular'>conduci</td></tr><tr><td>lui/lei</td><td data='irregular'>conduce</td></tr><tr><td>noi</td><td data='irregular'>conduciamo</td></tr><tr><td>voi</td><td data='irregular'>conducete</td></tr><tr><td>loro</td><td data='irregular'>conducono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>conducevo</td></tr><tr><td>tu</td><td data='irregular'>conducevi</td></tr><tr><td>lui/lei</td><td data='irregular'>conduceva</td></tr><tr><td>noi</td><td data='irregular'>conducevamo</td></tr><tr><td>voi</td><td data='irregular'>conducevate</td></tr><tr><td>loro</td><td data='irregular'>conducevano</td></tr></tbody></table></div>"
            },
            confessare: {
                term: "confessare",
                definition: "confess",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>confesso</td></tr><tr><td>tu</td><td data='regular'>confessi</td></tr><tr><td>lui/lei</td><td data='regular'>confessa</td></tr><tr><td>noi</td><td data='regular'>confessiamo</td></tr><tr><td>voi</td><td data='regular'>confessate</td></tr><tr><td>loro</td><td data='regular'>confessano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>confessavo</td></tr><tr><td>tu</td><td data='regular'>confessavi</td></tr><tr><td>lui/lei</td><td data='regular'>confessava</td></tr><tr><td>noi</td><td data='regular'>confessavamo</td></tr><tr><td>voi</td><td data='regular'>confessavate</td></tr><tr><td>loro</td><td data='regular'>confessavano</td></tr></tbody></table></div>"
            },
            conoscere: {
                term: "conoscere",
                definition: "know",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>conosco</td></tr><tr><td>tu</td><td data='regular'>conosci</td></tr><tr><td>lui/lei</td><td data='regular'>conosce</td></tr><tr><td>noi</td><td data='regular'>conosciamo</td></tr><tr><td>voi</td><td data='regular'>conoscete</td></tr><tr><td>loro</td><td data='regular'>conoscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>conoscevo</td></tr><tr><td>tu</td><td data='regular'>conoscevi</td></tr><tr><td>lui/lei</td><td data='regular'>conosceva</td></tr><tr><td>noi</td><td data='regular'>conoscevamo</td></tr><tr><td>voi</td><td data='regular'>conoscevate</td></tr><tr><td>loro</td><td data='regular'>conoscevano</td></tr></tbody></table></div>"
            },
            consentire: {
                term: "consentire",
                definition: "allow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>consento</td></tr><tr><td>tu</td><td data='regular'>consenti</td></tr><tr><td>lui/lei</td><td data='regular'>consente</td></tr><tr><td>noi</td><td data='regular'>consentiamo</td></tr><tr><td>voi</td><td data='regular'>consentite</td></tr><tr><td>loro</td><td data='regular'>consentono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>consentivo</td></tr><tr><td>tu</td><td data='regular'>consentivi</td></tr><tr><td>lui/lei</td><td data='regular'>consentiva</td></tr><tr><td>noi</td><td data='regular'>consentivamo</td></tr><tr><td>voi</td><td data='regular'>consentivate</td></tr><tr><td>loro</td><td data='regular'>consentivano</td></tr></tbody></table></div>"
            },
            conservare: {
                term: "conservare",
                definition: "save",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>conservo</td></tr><tr><td>tu</td><td data='regular'>conservi</td></tr><tr><td>lui/lei</td><td data='regular'>conserva</td></tr><tr><td>noi</td><td data='regular'>conserviamo</td></tr><tr><td>voi</td><td data='regular'>conservate</td></tr><tr><td>loro</td><td data='regular'>conservano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>conservavo</td></tr><tr><td>tu</td><td data='regular'>conservavi</td></tr><tr><td>lui/lei</td><td data='regular'>conservava</td></tr><tr><td>noi</td><td data='regular'>conservavamo</td></tr><tr><td>voi</td><td data='regular'>conservavate</td></tr><tr><td>loro</td><td data='regular'>conservavano</td></tr></tbody></table></div>"
            },
            considerare: {
                term: "considerare",
                definition: "consider",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>considero</td></tr><tr><td>tu</td><td data='regular'>consideri</td></tr><tr><td>lui/lei</td><td data='regular'>considera</td></tr><tr><td>noi</td><td data='regular'>consideriamo</td></tr><tr><td>voi</td><td data='regular'>considerate</td></tr><tr><td>loro</td><td data='regular'>considerano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>consideravo</td></tr><tr><td>tu</td><td data='regular'>consideravi</td></tr><tr><td>lui/lei</td><td data='regular'>considerava</td></tr><tr><td>noi</td><td data='regular'>consideravamo</td></tr><tr><td>voi</td><td data='regular'>consideravate</td></tr><tr><td>loro</td><td data='regular'>consideravano</td></tr></tbody></table></div>"
            },
            contare: {
                term: "contare",
                definition: "count",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>conto</td></tr><tr><td>tu</td><td data='regular'>conti</td></tr><tr><td>lui/lei</td><td data='regular'>conta</td></tr><tr><td>noi</td><td data='regular'>contiamo</td></tr><tr><td>voi</td><td data='regular'>contate</td></tr><tr><td>loro</td><td data='regular'>contano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>contavo</td></tr><tr><td>tu</td><td data='regular'>contavi</td></tr><tr><td>lui/lei</td><td data='regular'>contava</td></tr><tr><td>noi</td><td data='regular'>contavamo</td></tr><tr><td>voi</td><td data='regular'>contavate</td></tr><tr><td>loro</td><td data='regular'>contavano</td></tr></tbody></table></div>"
            },
            contenere: {
                term: "contenere",
                definition: "contain",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>contengo</td></tr><tr><td>tu</td><td data='irregular'>contieni</td></tr><tr><td>lui/lei</td><td data='irregular'>contiene</td></tr><tr><td>noi</td><td data='regular'>conteniamo</td></tr><tr><td>voi</td><td data='regular'>contenete</td></tr><tr><td>loro</td><td data='irregular'>contengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>contenevo</td></tr><tr><td>tu</td><td data='regular'>contenevi</td></tr><tr><td>lui/lei</td><td data='regular'>conteneva</td></tr><tr><td>noi</td><td data='regular'>contenevamo</td></tr><tr><td>voi</td><td data='regular'>contenevate</td></tr><tr><td>loro</td><td data='regular'>contenevano</td></tr></tbody></table></div>"
            },
            continuare: {
                term: "continuare",
                definition: "continue",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>continuo</td></tr><tr><td>tu</td><td data='regular'>continui</td></tr><tr><td>lui/lei</td><td data='regular'>continua</td></tr><tr><td>noi</td><td data='regular'>continuiamo</td></tr><tr><td>voi</td><td data='regular'>continuate</td></tr><tr><td>loro</td><td data='regular'>continuano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>continuavo</td></tr><tr><td>tu</td><td data='regular'>continuavi</td></tr><tr><td>lui/lei</td><td data='regular'>continuava</td></tr><tr><td>noi</td><td data='regular'>continuavamo</td></tr><tr><td>voi</td><td data='regular'>continuavate</td></tr><tr><td>loro</td><td data='regular'>continuavano</td></tr></tbody></table></div>"
            },
            convincere: {
                term: "convincere",
                definition: "convince",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>convinco</td></tr><tr><td>tu</td><td data='regular'>convinci</td></tr><tr><td>lui/lei</td><td data='regular'>convince</td></tr><tr><td>noi</td><td data='regular'>convinciamo</td></tr><tr><td>voi</td><td data='regular'>convincete</td></tr><tr><td>loro</td><td data='regular'>convincono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>convincevo</td></tr><tr><td>tu</td><td data='regular'>convincevi</td></tr><tr><td>lui/lei</td><td data='regular'>convinceva</td></tr><tr><td>noi</td><td data='regular'>convincevamo</td></tr><tr><td>voi</td><td data='regular'>convincevate</td></tr><tr><td>loro</td><td data='regular'>convincevano</td></tr></tbody></table></div>"
            },
            coprire: {
                term: "coprire",
                definition: "cover",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>copro</td></tr><tr><td>tu</td><td data='regular'>copri</td></tr><tr><td>lui/lei</td><td data='regular'>copre</td></tr><tr><td>noi</td><td data='regular'>copriamo</td></tr><tr><td>voi</td><td data='regular'>coprite</td></tr><tr><td>loro</td><td data='regular'>coprono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>coprivo</td></tr><tr><td>tu</td><td data='regular'>coprivi</td></tr><tr><td>lui/lei</td><td data='regular'>copriva</td></tr><tr><td>noi</td><td data='regular'>coprivamo</td></tr><tr><td>voi</td><td data='regular'>coprivate</td></tr><tr><td>loro</td><td data='regular'>coprivano</td></tr></tbody></table></div>"
            },
            correre: {
                term: "correre",
                definition: "run",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>corro</td></tr><tr><td>tu</td><td data='regular'>corri</td></tr><tr><td>lui/lei</td><td data='regular'>corre</td></tr><tr><td>noi</td><td data='regular'>corriamo</td></tr><tr><td>voi</td><td data='regular'>correte</td></tr><tr><td>loro</td><td data='regular'>corrono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>correvo</td></tr><tr><td>tu</td><td data='regular'>correvi</td></tr><tr><td>lui/lei</td><td data='regular'>correva</td></tr><tr><td>noi</td><td data='regular'>correvamo</td></tr><tr><td>voi</td><td data='regular'>correvate</td></tr><tr><td>loro</td><td data='regular'>correvano</td></tr></tbody></table></div>"
            },
            costituire: {
                term: "costituire",
                definition: "constitute",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>costituisco</td></tr><tr><td>tu</td><td data='irregular'>costituisci</td></tr><tr><td>lui/lei</td><td data='irregular'>costituisce</td></tr><tr><td>noi</td><td data='regular'>costituiamo</td></tr><tr><td>voi</td><td data='regular'>costituite</td></tr><tr><td>loro</td><td data='irregular'>costituiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>costituivo</td></tr><tr><td>tu</td><td data='regular'>costituivi</td></tr><tr><td>lui/lei</td><td data='regular'>costituiva</td></tr><tr><td>noi</td><td data='regular'>costituivamo</td></tr><tr><td>voi</td><td data='regular'>costituivate</td></tr><tr><td>loro</td><td data='regular'>costituivano</td></tr></tbody></table></div>"
            },
            costruire: {
                term: "costruire",
                definition: "build",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>costruisco</td></tr><tr><td>tu</td><td data='irregular'>costruisci</td></tr><tr><td>lui/lei</td><td data='irregular'>costruisce</td></tr><tr><td>noi</td><td data='regular'>costruiamo</td></tr><tr><td>voi</td><td data='regular'>costruite</td></tr><tr><td>loro</td><td data='irregular'>costruiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>costruivo</td></tr><tr><td>tu</td><td data='regular'>costruivi</td></tr><tr><td>lui/lei</td><td data='regular'>costruiva</td></tr><tr><td>noi</td><td data='regular'>costruivamo</td></tr><tr><td>voi</td><td data='regular'>costruivate</td></tr><tr><td>loro</td><td data='regular'>costruivano</td></tr></tbody></table></div>"
            },
            creare: {
                term: "creare",
                definition: "create",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>creo</td></tr><tr><td>tu</td><td data='regular'>crei</td></tr><tr><td>lui/lei</td><td data='regular'>crea</td></tr><tr><td>noi</td><td data='regular'>creiamo</td></tr><tr><td>voi</td><td data='regular'>create</td></tr><tr><td>loro</td><td data='regular'>creano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>creavo</td></tr><tr><td>tu</td><td data='regular'>creavi</td></tr><tr><td>lui/lei</td><td data='regular'>creava</td></tr><tr><td>noi</td><td data='regular'>creavamo</td></tr><tr><td>voi</td><td data='regular'>creavate</td></tr><tr><td>loro</td><td data='regular'>creavano</td></tr></tbody></table></div>"
            },
            credere: {
                term: "credere",
                definition: "believe",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>credo</td></tr><tr><td>tu</td><td data='regular'>credi</td></tr><tr><td>lui/lei</td><td data='regular'>crede</td></tr><tr><td>noi</td><td data='regular'>crediamo</td></tr><tr><td>voi</td><td data='regular'>credete</td></tr><tr><td>loro</td><td data='regular'>credono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>credevo</td></tr><tr><td>tu</td><td data='regular'>credevi</td></tr><tr><td>lui/lei</td><td data='regular'>credeva</td></tr><tr><td>noi</td><td data='regular'>credevamo</td></tr><tr><td>voi</td><td data='regular'>credevate</td></tr><tr><td>loro</td><td data='regular'>credevano</td></tr></tbody></table></div>"
            },
            crescere: {
                term: "crescere",
                definition: "grow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>cresco</td></tr><tr><td>tu</td><td data='regular'>cresci</td></tr><tr><td>lui/lei</td><td data='regular'>cresce</td></tr><tr><td>noi</td><td data='regular'>cresciamo</td></tr><tr><td>voi</td><td data='regular'>crescete</td></tr><tr><td>loro</td><td data='regular'>crescono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>crescevo</td></tr><tr><td>tu</td><td data='regular'>crescevi</td></tr><tr><td>lui/lei</td><td data='regular'>cresceva</td></tr><tr><td>noi</td><td data='regular'>crescevamo</td></tr><tr><td>voi</td><td data='regular'>crescevate</td></tr><tr><td>loro</td><td data='regular'>crescevano</td></tr></tbody></table></div>"
            },
            dare: {
                term: "dare",
                definition: "give",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>do</td></tr><tr><td>tu</td><td data='irregular'>dai</td></tr><tr><td>lui/lei</td><td data='regular'>dà</td></tr><tr><td>noi</td><td data='regular'>diamo</td></tr><tr><td>voi</td><td data='regular'>date</td></tr><tr><td>loro</td><td data='irregular'>dànno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>davo</td></tr><tr><td>tu</td><td data='regular'>davi</td></tr><tr><td>lui/lei</td><td data='regular'>dava</td></tr><tr><td>noi</td><td data='regular'>davamo</td></tr><tr><td>voi</td><td data='regular'>davate</td></tr><tr><td>loro</td><td data='regular'>davano</td></tr></tbody></table></div>"
            },
            decidere: {
                term: "decidere",
                definition: "decide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>decido</td></tr><tr><td>tu</td><td data='regular'>decidi</td></tr><tr><td>lui/lei</td><td data='regular'>decide</td></tr><tr><td>noi</td><td data='regular'>decidiamo</td></tr><tr><td>voi</td><td data='regular'>decidete</td></tr><tr><td>loro</td><td data='regular'>decidono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>decidevo</td></tr><tr><td>tu</td><td data='regular'>decidevi</td></tr><tr><td>lui/lei</td><td data='regular'>decideva</td></tr><tr><td>noi</td><td data='regular'>decidevamo</td></tr><tr><td>voi</td><td data='regular'>decidevate</td></tr><tr><td>loro</td><td data='regular'>decidevano</td></tr></tbody></table></div>"
            },
            dedicare: {
                term: "dedicare",
                definition: "devote",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>dedico</td></tr><tr><td>tu</td><td data='regular'>dedichi</td></tr><tr><td>lui/lei</td><td data='regular'>dedica</td></tr><tr><td>noi</td><td data='regular'>dedichiamo</td></tr><tr><td>voi</td><td data='regular'>dedicate</td></tr><tr><td>loro</td><td data='regular'>dedicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dedicavo</td></tr><tr><td>tu</td><td data='regular'>dedicavi</td></tr><tr><td>lui/lei</td><td data='regular'>dedicava</td></tr><tr><td>noi</td><td data='regular'>dedicavamo</td></tr><tr><td>voi</td><td data='regular'>dedicavate</td></tr><tr><td>loro</td><td data='regular'>dedicavano</td></tr></tbody></table></div>"
            },
            descrivere: {
                term: "descrivere",
                definition: "describe",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>descrivo</td></tr><tr><td>tu</td><td data='regular'>descrivi</td></tr><tr><td>lui/lei</td><td data='regular'>descrive</td></tr><tr><td>noi</td><td data='regular'>descriviamo</td></tr><tr><td>voi</td><td data='regular'>descrivete</td></tr><tr><td>loro</td><td data='regular'>descrivono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>descrivevo</td></tr><tr><td>tu</td><td data='regular'>descrivevi</td></tr><tr><td>lui/lei</td><td data='regular'>descriveva</td></tr><tr><td>noi</td><td data='regular'>descrivevamo</td></tr><tr><td>voi</td><td data='regular'>descrivevate</td></tr><tr><td>loro</td><td data='regular'>descrivevano</td></tr></tbody></table></div>"
            },
            desiderare: {
                term: "desiderare",
                definition: "wish",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>desidero</td></tr><tr><td>tu</td><td data='regular'>desideri</td></tr><tr><td>lui/lei</td><td data='regular'>desidera</td></tr><tr><td>noi</td><td data='regular'>desideriamo</td></tr><tr><td>voi</td><td data='regular'>desiderate</td></tr><tr><td>loro</td><td data='regular'>desiderano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>desideravo</td></tr><tr><td>tu</td><td data='regular'>desideravi</td></tr><tr><td>lui/lei</td><td data='regular'>desiderava</td></tr><tr><td>noi</td><td data='regular'>desideravamo</td></tr><tr><td>voi</td><td data='regular'>desideravate</td></tr><tr><td>loro</td><td data='regular'>desideravano</td></tr></tbody></table></div>"
            },
            determinare: {
                term: "determinare",
                definition: "determine",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>determino</td></tr><tr><td>tu</td><td data='regular'>determini</td></tr><tr><td>lui/lei</td><td data='regular'>determina</td></tr><tr><td>noi</td><td data='regular'>determiniamo</td></tr><tr><td>voi</td><td data='regular'>determinate</td></tr><tr><td>loro</td><td data='regular'>determinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>determinavo</td></tr><tr><td>tu</td><td data='regular'>determinavi</td></tr><tr><td>lui/lei</td><td data='regular'>determinava</td></tr><tr><td>noi</td><td data='regular'>determinavamo</td></tr><tr><td>voi</td><td data='regular'>determinavate</td></tr><tr><td>loro</td><td data='regular'>determinavano</td></tr></tbody></table></div>"
            },
            dichiarare: {
                term: "dichiarare",
                definition: "declare",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>dichiaro</td></tr><tr><td>tu</td><td data='regular'>dichiari</td></tr><tr><td>lui/lei</td><td data='regular'>dichiara</td></tr><tr><td>noi</td><td data='regular'>dichiariamo</td></tr><tr><td>voi</td><td data='regular'>dichiarate</td></tr><tr><td>loro</td><td data='regular'>dichiarano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dichiaravo</td></tr><tr><td>tu</td><td data='regular'>dichiaravi</td></tr><tr><td>lui/lei</td><td data='regular'>dichiarava</td></tr><tr><td>noi</td><td data='regular'>dichiaravamo</td></tr><tr><td>voi</td><td data='regular'>dichiaravate</td></tr><tr><td>loro</td><td data='regular'>dichiaravano</td></tr></tbody></table></div>"
            },
            difendere: {
                term: "difendere",
                definition: "defend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>difendo</td></tr><tr><td>tu</td><td data='regular'>difendi</td></tr><tr><td>lui/lei</td><td data='regular'>difende</td></tr><tr><td>noi</td><td data='regular'>difendiamo</td></tr><tr><td>voi</td><td data='regular'>difendete</td></tr><tr><td>loro</td><td data='regular'>difendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>difendevo</td></tr><tr><td>tu</td><td data='regular'>difendevi</td></tr><tr><td>lui/lei</td><td data='regular'>difendeva</td></tr><tr><td>noi</td><td data='regular'>difendevamo</td></tr><tr><td>voi</td><td data='regular'>difendevate</td></tr><tr><td>loro</td><td data='regular'>difendevano</td></tr></tbody></table></div>"
            },
            diffondere: {
                term: "diffondere",
                definition: "spread",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>diffondo</td></tr><tr><td>tu</td><td data='regular'>diffondi</td></tr><tr><td>lui/lei</td><td data='regular'>diffonde</td></tr><tr><td>noi</td><td data='regular'>diffondiamo</td></tr><tr><td>voi</td><td data='regular'>diffondete</td></tr><tr><td>loro</td><td data='regular'>diffondono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>diffondevo</td></tr><tr><td>tu</td><td data='regular'>diffondevi</td></tr><tr><td>lui/lei</td><td data='regular'>diffondeva</td></tr><tr><td>noi</td><td data='regular'>diffondevamo</td></tr><tr><td>voi</td><td data='regular'>diffondevate</td></tr><tr><td>loro</td><td data='regular'>diffondevano</td></tr></tbody></table></div>"
            },
            dimenticare: {
                term: "dimenticare",
                definition: "forget",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>dimentico</td></tr><tr><td>tu</td><td data='regular'>dimentichi</td></tr><tr><td>lui/lei</td><td data='regular'>dimentica</td></tr><tr><td>noi</td><td data='regular'>dimentichiamo</td></tr><tr><td>voi</td><td data='regular'>dimenticate</td></tr><tr><td>loro</td><td data='regular'>dimenticano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dimenticavo</td></tr><tr><td>tu</td><td data='regular'>dimenticavi</td></tr><tr><td>lui/lei</td><td data='regular'>dimenticava</td></tr><tr><td>noi</td><td data='regular'>dimenticavamo</td></tr><tr><td>voi</td><td data='regular'>dimenticavate</td></tr><tr><td>loro</td><td data='regular'>dimenticavano</td></tr></tbody></table></div>"
            },
            dimostrare: {
                term: "dimostrare",
                definition: "show",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>dimostro</td></tr><tr><td>tu</td><td data='regular'>dimostri</td></tr><tr><td>lui/lei</td><td data='regular'>dimostra</td></tr><tr><td>noi</td><td data='regular'>dimostriamo</td></tr><tr><td>voi</td><td data='regular'>dimostrate</td></tr><tr><td>loro</td><td data='regular'>dimostrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dimostravo</td></tr><tr><td>tu</td><td data='regular'>dimostravi</td></tr><tr><td>lui/lei</td><td data='regular'>dimostrava</td></tr><tr><td>noi</td><td data='regular'>dimostravamo</td></tr><tr><td>voi</td><td data='regular'>dimostravate</td></tr><tr><td>loro</td><td data='regular'>dimostravano</td></tr></tbody></table></div>"
            },
            dipendere: {
                term: "dipendere",
                definition: "depend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>dipendo</td></tr><tr><td>tu</td><td data='regular'>dipendi</td></tr><tr><td>lui/lei</td><td data='regular'>dipende</td></tr><tr><td>noi</td><td data='regular'>dipendiamo</td></tr><tr><td>voi</td><td data='regular'>dipendete</td></tr><tr><td>loro</td><td data='regular'>dipendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dipendevo</td></tr><tr><td>tu</td><td data='regular'>dipendevi</td></tr><tr><td>lui/lei</td><td data='regular'>dipendeva</td></tr><tr><td>noi</td><td data='regular'>dipendevamo</td></tr><tr><td>voi</td><td data='regular'>dipendevate</td></tr><tr><td>loro</td><td data='regular'>dipendevano</td></tr></tbody></table></div>"
            },
            dire: {
                term: "dire",
                definition: "say",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>dico</td></tr><tr><td>tu</td><td data='irregular'>dici</td></tr><tr><td>lui/lei</td><td data='irregular'>dice</td></tr><tr><td>noi</td><td data='irregular'>diciamo</td></tr><tr><td>voi</td><td data='regular'>dite</td></tr><tr><td>loro</td><td data='irregular'>dicono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>dicevo</td></tr><tr><td>tu</td><td data='irregular'>dicevi</td></tr><tr><td>lui/lei</td><td data='irregular'>diceva</td></tr><tr><td>noi</td><td data='irregular'>dicevamo</td></tr><tr><td>voi</td><td data='irregular'>dicevate</td></tr><tr><td>loro</td><td data='irregular'>dicevano</td></tr></tbody></table></div>"
            },
            dirigere: {
                term: "dirigere",
                definition: "direct",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>dirigo</td></tr><tr><td>tu</td><td data='regular'>dirigi</td></tr><tr><td>lui/lei</td><td data='regular'>dirige</td></tr><tr><td>noi</td><td data='regular'>dirigiamo</td></tr><tr><td>voi</td><td data='regular'>dirigete</td></tr><tr><td>loro</td><td data='regular'>dirigono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dirigevo</td></tr><tr><td>tu</td><td data='regular'>dirigevi</td></tr><tr><td>lui/lei</td><td data='regular'>dirigeva</td></tr><tr><td>noi</td><td data='regular'>dirigevamo</td></tr><tr><td>voi</td><td data='regular'>dirigevate</td></tr><tr><td>loro</td><td data='regular'>dirigevano</td></tr></tbody></table></div>"
            },
            discutere: {
                term: "discutere",
                definition: "discuss",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>discuto</td></tr><tr><td>tu</td><td data='regular'>discuti</td></tr><tr><td>lui/lei</td><td data='regular'>discute</td></tr><tr><td>noi</td><td data='regular'>discutiamo</td></tr><tr><td>voi</td><td data='regular'>discutete</td></tr><tr><td>loro</td><td data='regular'>discutono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>discutevo</td></tr><tr><td>tu</td><td data='regular'>discutevi</td></tr><tr><td>lui/lei</td><td data='regular'>discuteva</td></tr><tr><td>noi</td><td data='regular'>discutevamo</td></tr><tr><td>voi</td><td data='regular'>discutevate</td></tr><tr><td>loro</td><td data='regular'>discutevano</td></tr></tbody></table></div>"
            },
            disporre: {
                term: "disporre",
                definition: "have",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>dispongo</td></tr><tr><td>tu</td><td data='irregular'>disponi</td></tr><tr><td>lui/lei</td><td data='irregular'>dispone</td></tr><tr><td>noi</td><td data='irregular'>disponiamo</td></tr><tr><td>voi</td><td data='irregular'>disponete</td></tr><tr><td>loro</td><td data='irregular'>dispongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>disponevo</td></tr><tr><td>tu</td><td data='irregular'>disponevi</td></tr><tr><td>lui/lei</td><td data='irregular'>disponeva</td></tr><tr><td>noi</td><td data='irregular'>disponevamo</td></tr><tr><td>voi</td><td data='irregular'>disponevate</td></tr><tr><td>loro</td><td data='irregular'>disponevano</td></tr></tbody></table></div>"
            },
            distinguere: {
                term: "distinguere",
                definition: "distinguish",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>distinguo</td></tr><tr><td>tu</td><td data='regular'>distingui</td></tr><tr><td>lui/lei</td><td data='regular'>distingue</td></tr><tr><td>noi</td><td data='regular'>distinguiamo</td></tr><tr><td>voi</td><td data='regular'>distinguete</td></tr><tr><td>loro</td><td data='regular'>distinguono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>distinguevo</td></tr><tr><td>tu</td><td data='regular'>distinguevi</td></tr><tr><td>lui/lei</td><td data='regular'>distingueva</td></tr><tr><td>noi</td><td data='regular'>distinguevamo</td></tr><tr><td>voi</td><td data='regular'>distinguevate</td></tr><tr><td>loro</td><td data='regular'>distinguevano</td></tr></tbody></table></div>"
            },
            distruggere: {
                term: "distruggere",
                definition: "destroy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>distruggo</td></tr><tr><td>tu</td><td data='regular'>distruggi</td></tr><tr><td>lui/lei</td><td data='regular'>distrugge</td></tr><tr><td>noi</td><td data='regular'>distruggiamo</td></tr><tr><td>voi</td><td data='regular'>distruggete</td></tr><tr><td>loro</td><td data='regular'>distruggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>distruggevo</td></tr><tr><td>tu</td><td data='regular'>distruggevi</td></tr><tr><td>lui/lei</td><td data='regular'>distruggeva</td></tr><tr><td>noi</td><td data='regular'>distruggevamo</td></tr><tr><td>voi</td><td data='regular'>distruggevate</td></tr><tr><td>loro</td><td data='regular'>distruggevano</td></tr></tbody></table></div>"
            },
            diventare: {
                term: "diventare",
                definition: "become",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>divento</td></tr><tr><td>tu</td><td data='regular'>diventi</td></tr><tr><td>lui/lei</td><td data='regular'>diventa</td></tr><tr><td>noi</td><td data='regular'>diventiamo</td></tr><tr><td>voi</td><td data='regular'>diventate</td></tr><tr><td>loro</td><td data='regular'>diventano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>diventavo</td></tr><tr><td>tu</td><td data='regular'>diventavi</td></tr><tr><td>lui/lei</td><td data='regular'>diventava</td></tr><tr><td>noi</td><td data='regular'>diventavamo</td></tr><tr><td>voi</td><td data='regular'>diventavate</td></tr><tr><td>loro</td><td data='regular'>diventavano</td></tr></tbody></table></div>"
            },
            divertire: {
                term: "divertire",
                definition: "entertain",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>diverto</td></tr><tr><td>tu</td><td data='regular'>diverti</td></tr><tr><td>lui/lei</td><td data='regular'>diverte</td></tr><tr><td>noi</td><td data='regular'>divertiamo</td></tr><tr><td>voi</td><td data='regular'>divertite</td></tr><tr><td>loro</td><td data='regular'>divertono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>divertivo</td></tr><tr><td>tu</td><td data='regular'>divertivi</td></tr><tr><td>lui/lei</td><td data='regular'>divertiva</td></tr><tr><td>noi</td><td data='regular'>divertivamo</td></tr><tr><td>voi</td><td data='regular'>divertivate</td></tr><tr><td>loro</td><td data='regular'>divertivano</td></tr></tbody></table></div>"
            },
            dividere: {
                term: "dividere",
                definition: "divide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>divido</td></tr><tr><td>tu</td><td data='regular'>dividi</td></tr><tr><td>lui/lei</td><td data='regular'>divide</td></tr><tr><td>noi</td><td data='regular'>dividiamo</td></tr><tr><td>voi</td><td data='regular'>dividete</td></tr><tr><td>loro</td><td data='regular'>dividono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dividevo</td></tr><tr><td>tu</td><td data='regular'>dividevi</td></tr><tr><td>lui/lei</td><td data='regular'>divideva</td></tr><tr><td>noi</td><td data='regular'>dividevamo</td></tr><tr><td>voi</td><td data='regular'>dividevate</td></tr><tr><td>loro</td><td data='regular'>dividevano</td></tr></tbody></table></div>"
            },
            domandare: {
                term: "domandare",
                definition: "ask",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>domando</td></tr><tr><td>tu</td><td data='regular'>domandi</td></tr><tr><td>lui/lei</td><td data='regular'>domanda</td></tr><tr><td>noi</td><td data='regular'>domandiamo</td></tr><tr><td>voi</td><td data='regular'>domandate</td></tr><tr><td>loro</td><td data='regular'>domandano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>domandavo</td></tr><tr><td>tu</td><td data='regular'>domandavi</td></tr><tr><td>lui/lei</td><td data='regular'>domandava</td></tr><tr><td>noi</td><td data='regular'>domandavamo</td></tr><tr><td>voi</td><td data='regular'>domandavate</td></tr><tr><td>loro</td><td data='regular'>domandavano</td></tr></tbody></table></div>"
            },
            dormire: {
                term: "dormire",
                definition: "sleep",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>dormo</td></tr><tr><td>tu</td><td data='regular'>dormi</td></tr><tr><td>lui/lei</td><td data='regular'>dorme</td></tr><tr><td>noi</td><td data='regular'>dormiamo</td></tr><tr><td>voi</td><td data='regular'>dormite</td></tr><tr><td>loro</td><td data='regular'>dormono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dormivo</td></tr><tr><td>tu</td><td data='regular'>dormivi</td></tr><tr><td>lui/lei</td><td data='regular'>dormiva</td></tr><tr><td>noi</td><td data='regular'>dormivamo</td></tr><tr><td>voi</td><td data='regular'>dormivate</td></tr><tr><td>loro</td><td data='regular'>dormivano</td></tr></tbody></table></div>"
            },
            dovere: {
                term: "dovere",
                definition: "duty",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>devo</td></tr><tr><td>tu</td><td data='irregular'>devi</td></tr><tr><td>lui/lei</td><td data='irregular'>deve</td></tr><tr><td>noi</td><td data='irregular'>dobbiamo</td></tr><tr><td>voi</td><td data='regular'>dovete</td></tr><tr><td>loro</td><td data='irregular'>devono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>dovevo</td></tr><tr><td>tu</td><td data='regular'>dovevi</td></tr><tr><td>lui/lei</td><td data='regular'>doveva</td></tr><tr><td>noi</td><td data='regular'>dovevamo</td></tr><tr><td>voi</td><td data='regular'>dovevate</td></tr><tr><td>loro</td><td data='regular'>dovevano</td></tr></tbody></table></div>"
            },
            durare: {
                term: "durare",
                definition: "last",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>duro</td></tr><tr><td>tu</td><td data='regular'>duri</td></tr><tr><td>lui/lei</td><td data='regular'>dura</td></tr><tr><td>noi</td><td data='regular'>duriamo</td></tr><tr><td>voi</td><td data='regular'>durate</td></tr><tr><td>loro</td><td data='regular'>durano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>duravo</td></tr><tr><td>tu</td><td data='regular'>duravi</td></tr><tr><td>lui/lei</td><td data='regular'>durava</td></tr><tr><td>noi</td><td data='regular'>duravamo</td></tr><tr><td>voi</td><td data='regular'>duravate</td></tr><tr><td>loro</td><td data='regular'>duravano</td></tr></tbody></table></div>"
            },
            elevare: {
                term: "elevare",
                definition: "elevate",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>elevo</td></tr><tr><td>tu</td><td data='regular'>elevi</td></tr><tr><td>lui/lei</td><td data='regular'>eleva</td></tr><tr><td>noi</td><td data='regular'>eleviamo</td></tr><tr><td>voi</td><td data='regular'>elevate</td></tr><tr><td>loro</td><td data='regular'>elevano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>elevavo</td></tr><tr><td>tu</td><td data='regular'>elevavi</td></tr><tr><td>lui/lei</td><td data='regular'>elevava</td></tr><tr><td>noi</td><td data='regular'>elevavamo</td></tr><tr><td>voi</td><td data='regular'>elevavate</td></tr><tr><td>loro</td><td data='regular'>elevavano</td></tr></tbody></table></div>"
            },
            entrare: {
                term: "entrare",
                definition: "enter",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>entro</td></tr><tr><td>tu</td><td data='regular'>entri</td></tr><tr><td>lui/lei</td><td data='regular'>entra</td></tr><tr><td>noi</td><td data='regular'>entriamo</td></tr><tr><td>voi</td><td data='regular'>entrate</td></tr><tr><td>loro</td><td data='regular'>entrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>entravo</td></tr><tr><td>tu</td><td data='regular'>entravi</td></tr><tr><td>lui/lei</td><td data='regular'>entrava</td></tr><tr><td>noi</td><td data='regular'>entravamo</td></tr><tr><td>voi</td><td data='regular'>entravate</td></tr><tr><td>loro</td><td data='regular'>entravano</td></tr></tbody></table></div>"
            },
            escludere: {
                term: "escludere",
                definition: "exclude",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>escludo</td></tr><tr><td>tu</td><td data='regular'>escludi</td></tr><tr><td>lui/lei</td><td data='regular'>esclude</td></tr><tr><td>noi</td><td data='regular'>escludiamo</td></tr><tr><td>voi</td><td data='regular'>escludete</td></tr><tr><td>loro</td><td data='regular'>escludono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>escludevo</td></tr><tr><td>tu</td><td data='regular'>escludevi</td></tr><tr><td>lui/lei</td><td data='regular'>escludeva</td></tr><tr><td>noi</td><td data='regular'>escludevamo</td></tr><tr><td>voi</td><td data='regular'>escludevate</td></tr><tr><td>loro</td><td data='regular'>escludevano</td></tr></tbody></table></div>"
            },
            esistere: {
                term: "esistere",
                definition: "exist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>esisto</td></tr><tr><td>tu</td><td data='regular'>esisti</td></tr><tr><td>lui/lei</td><td data='regular'>esiste</td></tr><tr><td>noi</td><td data='regular'>esistiamo</td></tr><tr><td>voi</td><td data='regular'>esistete</td></tr><tr><td>loro</td><td data='regular'>esistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>esistevo</td></tr><tr><td>tu</td><td data='regular'>esistevi</td></tr><tr><td>lui/lei</td><td data='regular'>esisteva</td></tr><tr><td>noi</td><td data='regular'>esistevamo</td></tr><tr><td>voi</td><td data='regular'>esistevate</td></tr><tr><td>loro</td><td data='regular'>esistevano</td></tr></tbody></table></div>"
            },
            esporre: {
                term: "esporre",
                definition: "expose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>espongo</td></tr><tr><td>tu</td><td data='irregular'>esponi</td></tr><tr><td>lui/lei</td><td data='irregular'>espone</td></tr><tr><td>noi</td><td data='irregular'>esponiamo</td></tr><tr><td>voi</td><td data='irregular'>esponete</td></tr><tr><td>loro</td><td data='irregular'>espongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>esponevo</td></tr><tr><td>tu</td><td data='irregular'>esponevi</td></tr><tr><td>lui/lei</td><td data='irregular'>esponeva</td></tr><tr><td>noi</td><td data='irregular'>esponevamo</td></tr><tr><td>voi</td><td data='irregular'>esponevate</td></tr><tr><td>loro</td><td data='irregular'>esponevano</td></tr></tbody></table></div>"
            },
            esprimere: {
                term: "esprimere",
                definition: "express",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>esprimo</td></tr><tr><td>tu</td><td data='regular'>esprimi</td></tr><tr><td>lui/lei</td><td data='regular'>esprime</td></tr><tr><td>noi</td><td data='regular'>esprimiamo</td></tr><tr><td>voi</td><td data='regular'>esprimete</td></tr><tr><td>loro</td><td data='regular'>esprimono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>esprimevo</td></tr><tr><td>tu</td><td data='regular'>esprimevi</td></tr><tr><td>lui/lei</td><td data='regular'>esprimeva</td></tr><tr><td>noi</td><td data='regular'>esprimevamo</td></tr><tr><td>voi</td><td data='regular'>esprimevate</td></tr><tr><td>loro</td><td data='regular'>esprimevano</td></tr></tbody></table></div>"
            },
            essere: {
                term: "essere",
                definition: "be",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>sono</td></tr><tr><td>tu</td><td data='irregular'>sei</td></tr><tr><td>lui/lei</td><td data='irregular'>è</td></tr><tr><td>noi</td><td data='irregular'>siamo</td></tr><tr><td>voi</td><td data='irregular'>siete</td></tr><tr><td>loro</td><td data='irregular'>sono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>ero</td></tr><tr><td>tu</td><td data='irregular'>eri</td></tr><tr><td>lui/lei</td><td data='irregular'>era</td></tr><tr><td>noi</td><td data='irregular'>eravamo</td></tr><tr><td>voi</td><td data='irregular'>eravate</td></tr><tr><td>loro</td><td data='irregular'>erano</td></tr></tbody></table></div>"
            },
            estendere: {
                term: "estendere",
                definition: "extend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>estendo</td></tr><tr><td>tu</td><td data='regular'>estendi</td></tr><tr><td>lui/lei</td><td data='regular'>estende</td></tr><tr><td>noi</td><td data='regular'>estendiamo</td></tr><tr><td>voi</td><td data='regular'>estendete</td></tr><tr><td>loro</td><td data='regular'>estendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>estendevo</td></tr><tr><td>tu</td><td data='regular'>estendevi</td></tr><tr><td>lui/lei</td><td data='regular'>estendeva</td></tr><tr><td>noi</td><td data='regular'>estendevamo</td></tr><tr><td>voi</td><td data='regular'>estendevate</td></tr><tr><td>loro</td><td data='regular'>estendevano</td></tr></tbody></table></div>"
            },
            evitare: {
                term: "evitare",
                definition: "avoid",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>evito</td></tr><tr><td>tu</td><td data='regular'>eviti</td></tr><tr><td>lui/lei</td><td data='regular'>evita</td></tr><tr><td>noi</td><td data='regular'>evitiamo</td></tr><tr><td>voi</td><td data='regular'>evitate</td></tr><tr><td>loro</td><td data='regular'>evitano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>evitavo</td></tr><tr><td>tu</td><td data='regular'>evitavi</td></tr><tr><td>lui/lei</td><td data='regular'>evitava</td></tr><tr><td>noi</td><td data='regular'>evitavamo</td></tr><tr><td>voi</td><td data='regular'>evitavate</td></tr><tr><td>loro</td><td data='regular'>evitavano</td></tr></tbody></table></div>"
            },
            ferire: {
                term: "ferire",
                definition: "hurt",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>ferisco</td></tr><tr><td>tu</td><td data='irregular'>ferisci</td></tr><tr><td>lui/lei</td><td data='irregular'>ferisce</td></tr><tr><td>noi</td><td data='regular'>feriamo</td></tr><tr><td>voi</td><td data='regular'>ferite</td></tr><tr><td>loro</td><td data='irregular'>feriscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ferivo</td></tr><tr><td>tu</td><td data='regular'>ferivi</td></tr><tr><td>lui/lei</td><td data='regular'>feriva</td></tr><tr><td>noi</td><td data='regular'>ferivamo</td></tr><tr><td>voi</td><td data='regular'>ferivate</td></tr><tr><td>loro</td><td data='regular'>ferivano</td></tr></tbody></table></div>"
            },
            fermare: {
                term: "fermare",
                definition: "stop",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>fermo</td></tr><tr><td>tu</td><td data='regular'>fermi</td></tr><tr><td>lui/lei</td><td data='regular'>ferma</td></tr><tr><td>noi</td><td data='regular'>fermiamo</td></tr><tr><td>voi</td><td data='regular'>fermate</td></tr><tr><td>loro</td><td data='regular'>fermano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>fermavo</td></tr><tr><td>tu</td><td data='regular'>fermavi</td></tr><tr><td>lui/lei</td><td data='regular'>fermava</td></tr><tr><td>noi</td><td data='regular'>fermavamo</td></tr><tr><td>voi</td><td data='regular'>fermavate</td></tr><tr><td>loro</td><td data='regular'>fermavano</td></tr></tbody></table></div>"
            },
            figurare: {
                term: "figurare",
                definition: "appear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>figuro</td></tr><tr><td>tu</td><td data='regular'>figuri</td></tr><tr><td>lui/lei</td><td data='regular'>figura</td></tr><tr><td>noi</td><td data='regular'>figuriamo</td></tr><tr><td>voi</td><td data='regular'>figurate</td></tr><tr><td>loro</td><td data='regular'>figurano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>figuravo</td></tr><tr><td>tu</td><td data='regular'>figuravi</td></tr><tr><td>lui/lei</td><td data='regular'>figurava</td></tr><tr><td>noi</td><td data='regular'>figuravamo</td></tr><tr><td>voi</td><td data='regular'>figuravate</td></tr><tr><td>loro</td><td data='regular'>figuravano</td></tr></tbody></table></div>"
            },
            finire: {
                term: "finire",
                definition: "end",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>finisco</td></tr><tr><td>tu</td><td data='irregular'>finisci</td></tr><tr><td>lui/lei</td><td data='irregular'>finisce</td></tr><tr><td>noi</td><td data='regular'>finiamo</td></tr><tr><td>voi</td><td data='regular'>finite</td></tr><tr><td>loro</td><td data='irregular'>finiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>finivo</td></tr><tr><td>tu</td><td data='regular'>finivi</td></tr><tr><td>lui/lei</td><td data='regular'>finiva</td></tr><tr><td>noi</td><td data='regular'>finivamo</td></tr><tr><td>voi</td><td data='regular'>finivate</td></tr><tr><td>loro</td><td data='regular'>finivano</td></tr></tbody></table></div>"
            },
            fissare: {
                term: "fissare",
                definition: "fix",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>fisso</td></tr><tr><td>tu</td><td data='regular'>fissi</td></tr><tr><td>lui/lei</td><td data='regular'>fissa</td></tr><tr><td>noi</td><td data='regular'>fissiamo</td></tr><tr><td>voi</td><td data='regular'>fissate</td></tr><tr><td>loro</td><td data='regular'>fissano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>fissavo</td></tr><tr><td>tu</td><td data='regular'>fissavi</td></tr><tr><td>lui/lei</td><td data='regular'>fissava</td></tr><tr><td>noi</td><td data='regular'>fissavamo</td></tr><tr><td>voi</td><td data='regular'>fissavate</td></tr><tr><td>loro</td><td data='regular'>fissavano</td></tr></tbody></table></div>"
            },
            fondare: {
                term: "fondare",
                definition: "found",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>fondo</td></tr><tr><td>tu</td><td data='regular'>fondi</td></tr><tr><td>lui/lei</td><td data='regular'>fonda</td></tr><tr><td>noi</td><td data='regular'>fondiamo</td></tr><tr><td>voi</td><td data='regular'>fondate</td></tr><tr><td>loro</td><td data='regular'>fondano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>fondavo</td></tr><tr><td>tu</td><td data='regular'>fondavi</td></tr><tr><td>lui/lei</td><td data='regular'>fondava</td></tr><tr><td>noi</td><td data='regular'>fondavamo</td></tr><tr><td>voi</td><td data='regular'>fondavate</td></tr><tr><td>loro</td><td data='regular'>fondavano</td></tr></tbody></table></div>"
            },
            formare: {
                term: "formare",
                definition: "form",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>formo</td></tr><tr><td>tu</td><td data='regular'>formi</td></tr><tr><td>lui/lei</td><td data='regular'>forma</td></tr><tr><td>noi</td><td data='regular'>formiamo</td></tr><tr><td>voi</td><td data='regular'>formate</td></tr><tr><td>loro</td><td data='regular'>formano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>formavo</td></tr><tr><td>tu</td><td data='regular'>formavi</td></tr><tr><td>lui/lei</td><td data='regular'>formava</td></tr><tr><td>noi</td><td data='regular'>formavamo</td></tr><tr><td>voi</td><td data='regular'>formavate</td></tr><tr><td>loro</td><td data='regular'>formavano</td></tr></tbody></table></div>"
            },
            fornire: {
                term: "fornire",
                definition: "provide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>fornisco</td></tr><tr><td>tu</td><td data='irregular'>fornisci</td></tr><tr><td>lui/lei</td><td data='irregular'>fornisce</td></tr><tr><td>noi</td><td data='regular'>forniamo</td></tr><tr><td>voi</td><td data='regular'>fornite</td></tr><tr><td>loro</td><td data='irregular'>forniscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>fornivo</td></tr><tr><td>tu</td><td data='regular'>fornivi</td></tr><tr><td>lui/lei</td><td data='regular'>forniva</td></tr><tr><td>noi</td><td data='regular'>fornivamo</td></tr><tr><td>voi</td><td data='regular'>fornivate</td></tr><tr><td>loro</td><td data='regular'>fornivano</td></tr></tbody></table></div>"
            },
            fuggire: {
                term: "fuggire",
                definition: "flee",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>fuggo</td></tr><tr><td>tu</td><td data='regular'>fuggi</td></tr><tr><td>lui/lei</td><td data='regular'>fugge</td></tr><tr><td>noi</td><td data='regular'>fuggiamo</td></tr><tr><td>voi</td><td data='regular'>fuggite</td></tr><tr><td>loro</td><td data='regular'>fuggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>fuggivo</td></tr><tr><td>tu</td><td data='regular'>fuggivi</td></tr><tr><td>lui/lei</td><td data='regular'>fuggiva</td></tr><tr><td>noi</td><td data='regular'>fuggivamo</td></tr><tr><td>voi</td><td data='regular'>fuggivate</td></tr><tr><td>loro</td><td data='regular'>fuggivano</td></tr></tbody></table></div>"
            },
            fumare: {
                term: "fumare",
                definition: "smoke",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>fumo</td></tr><tr><td>tu</td><td data='regular'>fumi</td></tr><tr><td>lui/lei</td><td data='regular'>fuma</td></tr><tr><td>noi</td><td data='regular'>fumiamo</td></tr><tr><td>voi</td><td data='regular'>fumate</td></tr><tr><td>loro</td><td data='regular'>fumano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>fumavo</td></tr><tr><td>tu</td><td data='regular'>fumavi</td></tr><tr><td>lui/lei</td><td data='regular'>fumava</td></tr><tr><td>noi</td><td data='regular'>fumavamo</td></tr><tr><td>voi</td><td data='regular'>fumavate</td></tr><tr><td>loro</td><td data='regular'>fumavano</td></tr></tbody></table></div>"
            },
            gettare: {
                term: "gettare",
                definition: "throw",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>getto</td></tr><tr><td>tu</td><td data='regular'>getti</td></tr><tr><td>lui/lei</td><td data='regular'>getta</td></tr><tr><td>noi</td><td data='regular'>gettiamo</td></tr><tr><td>voi</td><td data='regular'>gettate</td></tr><tr><td>loro</td><td data='regular'>gettano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>gettavo</td></tr><tr><td>tu</td><td data='regular'>gettavi</td></tr><tr><td>lui/lei</td><td data='regular'>gettava</td></tr><tr><td>noi</td><td data='regular'>gettavamo</td></tr><tr><td>voi</td><td data='regular'>gettavate</td></tr><tr><td>loro</td><td data='regular'>gettavano</td></tr></tbody></table></div>"
            },
            giocare: {
                term: "giocare",
                definition: "play",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>gioco</td></tr><tr><td>tu</td><td data='regular'>giochi</td></tr><tr><td>lui/lei</td><td data='regular'>gioca</td></tr><tr><td>noi</td><td data='regular'>giochiamo</td></tr><tr><td>voi</td><td data='regular'>giocate</td></tr><tr><td>loro</td><td data='regular'>giocano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>giocavo</td></tr><tr><td>tu</td><td data='regular'>giocavi</td></tr><tr><td>lui/lei</td><td data='regular'>giocava</td></tr><tr><td>noi</td><td data='regular'>giocavamo</td></tr><tr><td>voi</td><td data='regular'>giocavate</td></tr><tr><td>loro</td><td data='regular'>giocavano</td></tr></tbody></table></div>"
            },
            girare: {
                term: "girare",
                definition: "turn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>giro</td></tr><tr><td>tu</td><td data='regular'>giri</td></tr><tr><td>lui/lei</td><td data='regular'>gira</td></tr><tr><td>noi</td><td data='regular'>giriamo</td></tr><tr><td>voi</td><td data='regular'>girate</td></tr><tr><td>loro</td><td data='regular'>girano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>giravo</td></tr><tr><td>tu</td><td data='regular'>giravi</td></tr><tr><td>lui/lei</td><td data='regular'>girava</td></tr><tr><td>noi</td><td data='regular'>giravamo</td></tr><tr><td>voi</td><td data='regular'>giravate</td></tr><tr><td>loro</td><td data='regular'>giravano</td></tr></tbody></table></div>"
            },
            giudicare: {
                term: "giudicare",
                definition: "judge",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>giudico</td></tr><tr><td>tu</td><td data='regular'>giudichi</td></tr><tr><td>lui/lei</td><td data='regular'>giudica</td></tr><tr><td>noi</td><td data='regular'>giudichiamo</td></tr><tr><td>voi</td><td data='regular'>giudicate</td></tr><tr><td>loro</td><td data='regular'>giudicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>giudicavo</td></tr><tr><td>tu</td><td data='regular'>giudicavi</td></tr><tr><td>lui/lei</td><td data='regular'>giudicava</td></tr><tr><td>noi</td><td data='regular'>giudicavamo</td></tr><tr><td>voi</td><td data='regular'>giudicavate</td></tr><tr><td>loro</td><td data='regular'>giudicavano</td></tr></tbody></table></div>"
            },
            giungere: {
                term: "giungere",
                definition: "reach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>giungo</td></tr><tr><td>tu</td><td data='regular'>giungi</td></tr><tr><td>lui/lei</td><td data='regular'>giunge</td></tr><tr><td>noi</td><td data='regular'>giungiamo</td></tr><tr><td>voi</td><td data='regular'>giungete</td></tr><tr><td>loro</td><td data='regular'>giungono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>giungevo</td></tr><tr><td>tu</td><td data='regular'>giungevi</td></tr><tr><td>lui/lei</td><td data='regular'>giungeva</td></tr><tr><td>noi</td><td data='regular'>giungevamo</td></tr><tr><td>voi</td><td data='regular'>giungevate</td></tr><tr><td>loro</td><td data='regular'>giungevano</td></tr></tbody></table></div>"
            },
            godere: {
                term: "godere",
                definition: "be happy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>godo</td></tr><tr><td>tu</td><td data='regular'>godi</td></tr><tr><td>lui/lei</td><td data='regular'>gode</td></tr><tr><td>noi</td><td data='regular'>godiamo</td></tr><tr><td>voi</td><td data='regular'>godete</td></tr><tr><td>loro</td><td data='regular'>godono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>godevo</td></tr><tr><td>tu</td><td data='regular'>godevi</td></tr><tr><td>lui/lei</td><td data='regular'>godeva</td></tr><tr><td>noi</td><td data='regular'>godevamo</td></tr><tr><td>voi</td><td data='regular'>godevate</td></tr><tr><td>loro</td><td data='regular'>godevano</td></tr></tbody></table></div>"
            },
            gridare: {
                term: "gridare",
                definition: "shout",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>grido</td></tr><tr><td>tu</td><td data='regular'>gridi</td></tr><tr><td>lui/lei</td><td data='regular'>grida</td></tr><tr><td>noi</td><td data='regular'>gridiamo</td></tr><tr><td>voi</td><td data='regular'>gridate</td></tr><tr><td>loro</td><td data='regular'>gridano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>gridavo</td></tr><tr><td>tu</td><td data='regular'>gridavi</td></tr><tr><td>lui/lei</td><td data='regular'>gridava</td></tr><tr><td>noi</td><td data='regular'>gridavamo</td></tr><tr><td>voi</td><td data='regular'>gridavate</td></tr><tr><td>loro</td><td data='regular'>gridavano</td></tr></tbody></table></div>"
            },
            guardare: {
                term: "guardare",
                definition: "look",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>guardo</td></tr><tr><td>tu</td><td data='regular'>guardi</td></tr><tr><td>lui/lei</td><td data='regular'>guarda</td></tr><tr><td>noi</td><td data='regular'>guardiamo</td></tr><tr><td>voi</td><td data='regular'>guardate</td></tr><tr><td>loro</td><td data='regular'>guardano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>guardavo</td></tr><tr><td>tu</td><td data='regular'>guardavi</td></tr><tr><td>lui/lei</td><td data='regular'>guardava</td></tr><tr><td>noi</td><td data='regular'>guardavamo</td></tr><tr><td>voi</td><td data='regular'>guardavate</td></tr><tr><td>loro</td><td data='regular'>guardavano</td></tr></tbody></table></div>"
            },
            guidare: {
                term: "guidare",
                definition: "lead",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>guido</td></tr><tr><td>tu</td><td data='regular'>guidi</td></tr><tr><td>lui/lei</td><td data='regular'>guida</td></tr><tr><td>noi</td><td data='regular'>guidiamo</td></tr><tr><td>voi</td><td data='regular'>guidate</td></tr><tr><td>loro</td><td data='regular'>guidano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>guidavo</td></tr><tr><td>tu</td><td data='regular'>guidavi</td></tr><tr><td>lui/lei</td><td data='regular'>guidava</td></tr><tr><td>noi</td><td data='regular'>guidavamo</td></tr><tr><td>voi</td><td data='regular'>guidavate</td></tr><tr><td>loro</td><td data='regular'>guidavano</td></tr></tbody></table></div>"
            },
            immaginare: {
                term: "immaginare",
                definition: "imagine",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>immagino</td></tr><tr><td>tu</td><td data='regular'>immagini</td></tr><tr><td>lui/lei</td><td data='regular'>immagina</td></tr><tr><td>noi</td><td data='regular'>immaginiamo</td></tr><tr><td>voi</td><td data='regular'>immaginate</td></tr><tr><td>loro</td><td data='regular'>immaginano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>immaginavo</td></tr><tr><td>tu</td><td data='regular'>immaginavi</td></tr><tr><td>lui/lei</td><td data='regular'>immaginava</td></tr><tr><td>noi</td><td data='regular'>immaginavamo</td></tr><tr><td>voi</td><td data='regular'>immaginavate</td></tr><tr><td>loro</td><td data='regular'>immaginavano</td></tr></tbody></table></div>"
            },
            imparare: {
                term: "imparare",
                definition: "learn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>imparo</td></tr><tr><td>tu</td><td data='regular'>impari</td></tr><tr><td>lui/lei</td><td data='regular'>impara</td></tr><tr><td>noi</td><td data='regular'>impariamo</td></tr><tr><td>voi</td><td data='regular'>imparate</td></tr><tr><td>loro</td><td data='regular'>imparano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>imparavo</td></tr><tr><td>tu</td><td data='regular'>imparavi</td></tr><tr><td>lui/lei</td><td data='regular'>imparava</td></tr><tr><td>noi</td><td data='regular'>imparavamo</td></tr><tr><td>voi</td><td data='regular'>imparavate</td></tr><tr><td>loro</td><td data='regular'>imparavano</td></tr></tbody></table></div>"
            },
            impedire: {
                term: "impedire",
                definition: "prevent",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>impedisco</td></tr><tr><td>tu</td><td data='irregular'>impedisci</td></tr><tr><td>lui/lei</td><td data='irregular'>impedisce</td></tr><tr><td>noi</td><td data='regular'>impediamo</td></tr><tr><td>voi</td><td data='regular'>impedite</td></tr><tr><td>loro</td><td data='irregular'>impediscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>impedivo</td></tr><tr><td>tu</td><td data='regular'>impedivi</td></tr><tr><td>lui/lei</td><td data='regular'>impediva</td></tr><tr><td>noi</td><td data='regular'>impedivamo</td></tr><tr><td>voi</td><td data='regular'>impedivate</td></tr><tr><td>loro</td><td data='regular'>impedivano</td></tr></tbody></table></div>"
            },
            importare: {
                term: "importare",
                definition: "import",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>importo</td></tr><tr><td>tu</td><td data='regular'>importi</td></tr><tr><td>lui/lei</td><td data='regular'>importa</td></tr><tr><td>noi</td><td data='regular'>importiamo</td></tr><tr><td>voi</td><td data='regular'>importate</td></tr><tr><td>loro</td><td data='regular'>importano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>importavo</td></tr><tr><td>tu</td><td data='regular'>importavi</td></tr><tr><td>lui/lei</td><td data='regular'>importava</td></tr><tr><td>noi</td><td data='regular'>importavamo</td></tr><tr><td>voi</td><td data='regular'>importavate</td></tr><tr><td>loro</td><td data='regular'>importavano</td></tr></tbody></table></div>"
            },
            imporre: {
                term: "imporre",
                definition: "impose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>impongo</td></tr><tr><td>tu</td><td data='irregular'>imponi</td></tr><tr><td>lui/lei</td><td data='irregular'>impone</td></tr><tr><td>noi</td><td data='irregular'>imponiamo</td></tr><tr><td>voi</td><td data='irregular'>imponete</td></tr><tr><td>loro</td><td data='irregular'>impongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>imponevo</td></tr><tr><td>tu</td><td data='irregular'>imponevi</td></tr><tr><td>lui/lei</td><td data='irregular'>imponeva</td></tr><tr><td>noi</td><td data='irregular'>imponevamo</td></tr><tr><td>voi</td><td data='irregular'>imponevate</td></tr><tr><td>loro</td><td data='irregular'>imponevano</td></tr></tbody></table></div>"
            },
            incontrare: {
                term: "incontrare",
                definition: "meet",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>incontro</td></tr><tr><td>tu</td><td data='regular'>incontri</td></tr><tr><td>lui/lei</td><td data='regular'>incontra</td></tr><tr><td>noi</td><td data='regular'>incontriamo</td></tr><tr><td>voi</td><td data='regular'>incontrate</td></tr><tr><td>loro</td><td data='regular'>incontrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>incontravo</td></tr><tr><td>tu</td><td data='regular'>incontravi</td></tr><tr><td>lui/lei</td><td data='regular'>incontrava</td></tr><tr><td>noi</td><td data='regular'>incontravamo</td></tr><tr><td>voi</td><td data='regular'>incontravate</td></tr><tr><td>loro</td><td data='regular'>incontravano</td></tr></tbody></table></div>"
            },
            indicare: {
                term: "indicare",
                definition: "indicate",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>indico</td></tr><tr><td>tu</td><td data='regular'>indichi</td></tr><tr><td>lui/lei</td><td data='regular'>indica</td></tr><tr><td>noi</td><td data='regular'>indichiamo</td></tr><tr><td>voi</td><td data='regular'>indicate</td></tr><tr><td>loro</td><td data='regular'>indicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>indicavo</td></tr><tr><td>tu</td><td data='regular'>indicavi</td></tr><tr><td>lui/lei</td><td data='regular'>indicava</td></tr><tr><td>noi</td><td data='regular'>indicavamo</td></tr><tr><td>voi</td><td data='regular'>indicavate</td></tr><tr><td>loro</td><td data='regular'>indicavano</td></tr></tbody></table></div>"
            },
            iniziare: {
                term: "iniziare",
                definition: "start",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>inizio</td></tr><tr><td>tu</td><td data='regular'>inizi</td></tr><tr><td>lui/lei</td><td data='regular'>inizia</td></tr><tr><td>noi</td><td data='regular'>iniziamo</td></tr><tr><td>voi</td><td data='regular'>iniziate</td></tr><tr><td>loro</td><td data='regular'>iniziano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>iniziavo</td></tr><tr><td>tu</td><td data='regular'>iniziavi</td></tr><tr><td>lui/lei</td><td data='regular'>iniziava</td></tr><tr><td>noi</td><td data='regular'>iniziavamo</td></tr><tr><td>voi</td><td data='regular'>iniziavate</td></tr><tr><td>loro</td><td data='regular'>iniziavano</td></tr></tbody></table></div>"
            },
            insegnare: {
                term: "insegnare",
                definition: "teach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>insegno</td></tr><tr><td>tu</td><td data='regular'>insegni</td></tr><tr><td>lui/lei</td><td data='regular'>insegna</td></tr><tr><td>noi</td><td data='regular'>insegniamo</td></tr><tr><td>voi</td><td data='regular'>insegnate</td></tr><tr><td>loro</td><td data='regular'>insegnano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>insegnavo</td></tr><tr><td>tu</td><td data='regular'>insegnavi</td></tr><tr><td>lui/lei</td><td data='regular'>insegnava</td></tr><tr><td>noi</td><td data='regular'>insegnavamo</td></tr><tr><td>voi</td><td data='regular'>insegnavate</td></tr><tr><td>loro</td><td data='regular'>insegnavano</td></tr></tbody></table></div>"
            },
            insistere: {
                term: "insistere",
                definition: "insist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>insisto</td></tr><tr><td>tu</td><td data='regular'>insisti</td></tr><tr><td>lui/lei</td><td data='regular'>insiste</td></tr><tr><td>noi</td><td data='regular'>insistiamo</td></tr><tr><td>voi</td><td data='regular'>insistete</td></tr><tr><td>loro</td><td data='regular'>insistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>insistevo</td></tr><tr><td>tu</td><td data='regular'>insistevi</td></tr><tr><td>lui/lei</td><td data='regular'>insisteva</td></tr><tr><td>noi</td><td data='regular'>insistevamo</td></tr><tr><td>voi</td><td data='regular'>insistevate</td></tr><tr><td>loro</td><td data='regular'>insistevano</td></tr></tbody></table></div>"
            },
            intendere: {
                term: "intendere",
                definition: "hear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>intendo</td></tr><tr><td>tu</td><td data='regular'>intendi</td></tr><tr><td>lui/lei</td><td data='regular'>intende</td></tr><tr><td>noi</td><td data='regular'>intendiamo</td></tr><tr><td>voi</td><td data='regular'>intendete</td></tr><tr><td>loro</td><td data='regular'>intendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>intendevo</td></tr><tr><td>tu</td><td data='regular'>intendevi</td></tr><tr><td>lui/lei</td><td data='regular'>intendeva</td></tr><tr><td>noi</td><td data='regular'>intendevamo</td></tr><tr><td>voi</td><td data='regular'>intendevate</td></tr><tr><td>loro</td><td data='regular'>intendevano</td></tr></tbody></table></div>"
            },
            interessare: {
                term: "interessare",
                definition: "affect",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>interesso</td></tr><tr><td>tu</td><td data='regular'>interessi</td></tr><tr><td>lui/lei</td><td data='regular'>interessa</td></tr><tr><td>noi</td><td data='regular'>interessiamo</td></tr><tr><td>voi</td><td data='regular'>interessate</td></tr><tr><td>loro</td><td data='regular'>interessano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>interessavo</td></tr><tr><td>tu</td><td data='regular'>interessavi</td></tr><tr><td>lui/lei</td><td data='regular'>interessava</td></tr><tr><td>noi</td><td data='regular'>interessavamo</td></tr><tr><td>voi</td><td data='regular'>interessavate</td></tr><tr><td>loro</td><td data='regular'>interessavano</td></tr></tbody></table></div>"
            },
            invitare: {
                term: "invitare",
                definition: "invite",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>invito</td></tr><tr><td>tu</td><td data='regular'>inviti</td></tr><tr><td>lui/lei</td><td data='regular'>invita</td></tr><tr><td>noi</td><td data='regular'>invitiamo</td></tr><tr><td>voi</td><td data='regular'>invitate</td></tr><tr><td>loro</td><td data='regular'>invitano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>invitavo</td></tr><tr><td>tu</td><td data='regular'>invitavi</td></tr><tr><td>lui/lei</td><td data='regular'>invitava</td></tr><tr><td>noi</td><td data='regular'>invitavamo</td></tr><tr><td>voi</td><td data='regular'>invitavate</td></tr><tr><td>loro</td><td data='regular'>invitavano</td></tr></tbody></table></div>"
            },
            lanciare: {
                term: "lanciare",
                definition: "launch",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>lancio</td></tr><tr><td>tu</td><td data='regular'>lanci</td></tr><tr><td>lui/lei</td><td data='regular'>lancia</td></tr><tr><td>noi</td><td data='regular'>lanciamo</td></tr><tr><td>voi</td><td data='regular'>lanciate</td></tr><tr><td>loro</td><td data='regular'>lanciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>lanciavo</td></tr><tr><td>tu</td><td data='regular'>lanciavi</td></tr><tr><td>lui/lei</td><td data='regular'>lanciava</td></tr><tr><td>noi</td><td data='regular'>lanciavamo</td></tr><tr><td>voi</td><td data='regular'>lanciavate</td></tr><tr><td>loro</td><td data='regular'>lanciavano</td></tr></tbody></table></div>"
            },
            lasciare: {
                term: "lasciare",
                definition: "leave",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>lascio</td></tr><tr><td>tu</td><td data='regular'>lasci</td></tr><tr><td>lui/lei</td><td data='regular'>lascia</td></tr><tr><td>noi</td><td data='regular'>lasciamo</td></tr><tr><td>voi</td><td data='regular'>lasciate</td></tr><tr><td>loro</td><td data='regular'>lasciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>lasciavo</td></tr><tr><td>tu</td><td data='regular'>lasciavi</td></tr><tr><td>lui/lei</td><td data='regular'>lasciava</td></tr><tr><td>noi</td><td data='regular'>lasciavamo</td></tr><tr><td>voi</td><td data='regular'>lasciavate</td></tr><tr><td>loro</td><td data='regular'>lasciavano</td></tr></tbody></table></div>"
            },
            lavorare: {
                term: "lavorare",
                definition: "work",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>lavoro</td></tr><tr><td>tu</td><td data='regular'>lavori</td></tr><tr><td>lui/lei</td><td data='regular'>lavora</td></tr><tr><td>noi</td><td data='regular'>lavoriamo</td></tr><tr><td>voi</td><td data='regular'>lavorate</td></tr><tr><td>loro</td><td data='regular'>lavorano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>lavoravo</td></tr><tr><td>tu</td><td data='regular'>lavoravi</td></tr><tr><td>lui/lei</td><td data='regular'>lavorava</td></tr><tr><td>noi</td><td data='regular'>lavoravamo</td></tr><tr><td>voi</td><td data='regular'>lavoravate</td></tr><tr><td>loro</td><td data='regular'>lavoravano</td></tr></tbody></table></div>"
            },
            legare: {
                term: "legare",
                definition: "tie",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>lego</td></tr><tr><td>tu</td><td data='regular'>leghi</td></tr><tr><td>lui/lei</td><td data='regular'>lega</td></tr><tr><td>noi</td><td data='regular'>leghiamo</td></tr><tr><td>voi</td><td data='regular'>legate</td></tr><tr><td>loro</td><td data='regular'>legano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>legavo</td></tr><tr><td>tu</td><td data='regular'>legavi</td></tr><tr><td>lui/lei</td><td data='regular'>legava</td></tr><tr><td>noi</td><td data='regular'>legavamo</td></tr><tr><td>voi</td><td data='regular'>legavate</td></tr><tr><td>loro</td><td data='regular'>legavano</td></tr></tbody></table></div>"
            },
            leggere: {
                term: "leggere",
                definition: "read",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>leggo</td></tr><tr><td>tu</td><td data='regular'>leggi</td></tr><tr><td>lui/lei</td><td data='regular'>legge</td></tr><tr><td>noi</td><td data='regular'>leggiamo</td></tr><tr><td>voi</td><td data='regular'>leggete</td></tr><tr><td>loro</td><td data='regular'>leggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>leggevo</td></tr><tr><td>tu</td><td data='regular'>leggevi</td></tr><tr><td>lui/lei</td><td data='regular'>leggeva</td></tr><tr><td>noi</td><td data='regular'>leggevamo</td></tr><tr><td>voi</td><td data='regular'>leggevate</td></tr><tr><td>loro</td><td data='regular'>leggevano</td></tr></tbody></table></div>"
            },
            liberare: {
                term: "liberare",
                definition: "release",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>libero</td></tr><tr><td>tu</td><td data='regular'>liberi</td></tr><tr><td>lui/lei</td><td data='regular'>libera</td></tr><tr><td>noi</td><td data='regular'>liberiamo</td></tr><tr><td>voi</td><td data='regular'>liberate</td></tr><tr><td>loro</td><td data='regular'>liberano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>liberavo</td></tr><tr><td>tu</td><td data='regular'>liberavi</td></tr><tr><td>lui/lei</td><td data='regular'>liberava</td></tr><tr><td>noi</td><td data='regular'>liberavamo</td></tr><tr><td>voi</td><td data='regular'>liberavate</td></tr><tr><td>loro</td><td data='regular'>liberavano</td></tr></tbody></table></div>"
            },
            limitare: {
                term: "limitare",
                definition: "limit",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>limito</td></tr><tr><td>tu</td><td data='regular'>limiti</td></tr><tr><td>lui/lei</td><td data='regular'>limita</td></tr><tr><td>noi</td><td data='regular'>limitiamo</td></tr><tr><td>voi</td><td data='regular'>limitate</td></tr><tr><td>loro</td><td data='regular'>limitano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>limitavo</td></tr><tr><td>tu</td><td data='regular'>limitavi</td></tr><tr><td>lui/lei</td><td data='regular'>limitava</td></tr><tr><td>noi</td><td data='regular'>limitavamo</td></tr><tr><td>voi</td><td data='regular'>limitavate</td></tr><tr><td>loro</td><td data='regular'>limitavano</td></tr></tbody></table></div>"
            },
            mancare: {
                term: "mancare",
                definition: "miss",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>manco</td></tr><tr><td>tu</td><td data='regular'>manchi</td></tr><tr><td>lui/lei</td><td data='regular'>manca</td></tr><tr><td>noi</td><td data='regular'>manchiamo</td></tr><tr><td>voi</td><td data='regular'>mancate</td></tr><tr><td>loro</td><td data='regular'>mancano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>mancavo</td></tr><tr><td>tu</td><td data='regular'>mancavi</td></tr><tr><td>lui/lei</td><td data='regular'>mancava</td></tr><tr><td>noi</td><td data='regular'>mancavamo</td></tr><tr><td>voi</td><td data='regular'>mancavate</td></tr><tr><td>loro</td><td data='regular'>mancavano</td></tr></tbody></table></div>"
            },
            mandare: {
                term: "mandare",
                definition: "send",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>mando</td></tr><tr><td>tu</td><td data='regular'>mandi</td></tr><tr><td>lui/lei</td><td data='regular'>manda</td></tr><tr><td>noi</td><td data='regular'>mandiamo</td></tr><tr><td>voi</td><td data='regular'>mandate</td></tr><tr><td>loro</td><td data='regular'>mandano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>mandavo</td></tr><tr><td>tu</td><td data='regular'>mandavi</td></tr><tr><td>lui/lei</td><td data='regular'>mandava</td></tr><tr><td>noi</td><td data='regular'>mandavamo</td></tr><tr><td>voi</td><td data='regular'>mandavate</td></tr><tr><td>loro</td><td data='regular'>mandavano</td></tr></tbody></table></div>"
            },
            mangiare: {
                term: "mangiare",
                definition: "eat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>mangio</td></tr><tr><td>tu</td><td data='regular'>mangi</td></tr><tr><td>lui/lei</td><td data='regular'>mangia</td></tr><tr><td>noi</td><td data='regular'>mangiamo</td></tr><tr><td>voi</td><td data='regular'>mangiate</td></tr><tr><td>loro</td><td data='regular'>mangiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>mangiavo</td></tr><tr><td>tu</td><td data='regular'>mangiavi</td></tr><tr><td>lui/lei</td><td data='regular'>mangiava</td></tr><tr><td>noi</td><td data='regular'>mangiavamo</td></tr><tr><td>voi</td><td data='regular'>mangiavate</td></tr><tr><td>loro</td><td data='regular'>mangiavano</td></tr></tbody></table></div>"
            },
            mantenere: {
                term: "mantenere",
                definition: "keep",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>mantengo</td></tr><tr><td>tu</td><td data='irregular'>mantieni</td></tr><tr><td>lui/lei</td><td data='irregular'>mantiene</td></tr><tr><td>noi</td><td data='regular'>manteniamo</td></tr><tr><td>voi</td><td data='regular'>mantenete</td></tr><tr><td>loro</td><td data='irregular'>mantengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>mantenevo</td></tr><tr><td>tu</td><td data='regular'>mantenevi</td></tr><tr><td>lui/lei</td><td data='regular'>manteneva</td></tr><tr><td>noi</td><td data='regular'>mantenevamo</td></tr><tr><td>voi</td><td data='regular'>mantenevate</td></tr><tr><td>loro</td><td data='regular'>mantenevano</td></tr></tbody></table></div>"
            },
            meritare: {
                term: "meritare",
                definition: "deserve",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>merito</td></tr><tr><td>tu</td><td data='regular'>meriti</td></tr><tr><td>lui/lei</td><td data='regular'>merita</td></tr><tr><td>noi</td><td data='regular'>meritiamo</td></tr><tr><td>voi</td><td data='regular'>meritate</td></tr><tr><td>loro</td><td data='regular'>meritano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>meritavo</td></tr><tr><td>tu</td><td data='regular'>meritavi</td></tr><tr><td>lui/lei</td><td data='regular'>meritava</td></tr><tr><td>noi</td><td data='regular'>meritavamo</td></tr><tr><td>voi</td><td data='regular'>meritavate</td></tr><tr><td>loro</td><td data='regular'>meritavano</td></tr></tbody></table></div>"
            },
            mettere: {
                term: "mettere",
                definition: "put",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>metto</td></tr><tr><td>tu</td><td data='regular'>metti</td></tr><tr><td>lui/lei</td><td data='regular'>mette</td></tr><tr><td>noi</td><td data='regular'>mettiamo</td></tr><tr><td>voi</td><td data='regular'>mettete</td></tr><tr><td>loro</td><td data='regular'>mettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>mettevo</td></tr><tr><td>tu</td><td data='regular'>mettevi</td></tr><tr><td>lui/lei</td><td data='regular'>metteva</td></tr><tr><td>noi</td><td data='regular'>mettevamo</td></tr><tr><td>voi</td><td data='regular'>mettevate</td></tr><tr><td>loro</td><td data='regular'>mettevano</td></tr></tbody></table></div>"
            },
            morire: {
                term: "morire",
                definition: "die",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>muoio</td></tr><tr><td>tu</td><td data='irregular'>muori</td></tr><tr><td>lui/lei</td><td data='irregular'>muore</td></tr><tr><td>noi</td><td data='regular'>moriamo</td></tr><tr><td>voi</td><td data='regular'>morite</td></tr><tr><td>loro</td><td data='irregular'>muoiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>morivo</td></tr><tr><td>tu</td><td data='regular'>morivi</td></tr><tr><td>lui/lei</td><td data='regular'>moriva</td></tr><tr><td>noi</td><td data='regular'>morivamo</td></tr><tr><td>voi</td><td data='regular'>morivate</td></tr><tr><td>loro</td><td data='regular'>morivano</td></tr></tbody></table></div>"
            },
            mostrare: {
                term: "mostrare",
                definition: "show",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>mostro</td></tr><tr><td>tu</td><td data='regular'>mostri</td></tr><tr><td>lui/lei</td><td data='regular'>mostra</td></tr><tr><td>noi</td><td data='regular'>mostriamo</td></tr><tr><td>voi</td><td data='regular'>mostrate</td></tr><tr><td>loro</td><td data='regular'>mostrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>mostravo</td></tr><tr><td>tu</td><td data='regular'>mostravi</td></tr><tr><td>lui/lei</td><td data='regular'>mostrava</td></tr><tr><td>noi</td><td data='regular'>mostravamo</td></tr><tr><td>voi</td><td data='regular'>mostravate</td></tr><tr><td>loro</td><td data='regular'>mostravano</td></tr></tbody></table></div>"
            },
            muovere: {
                term: "muovere",
                definition: "move",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>muovo</td></tr><tr><td>tu</td><td data='regular'>muovi</td></tr><tr><td>lui/lei</td><td data='regular'>muove</td></tr><tr><td>noi</td><td data='regular'>muoviamo</td></tr><tr><td>voi</td><td data='regular'>muovete</td></tr><tr><td>loro</td><td data='regular'>muovono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>muovevo</td></tr><tr><td>tu</td><td data='regular'>muovevi</td></tr><tr><td>lui/lei</td><td data='regular'>muoveva</td></tr><tr><td>noi</td><td data='regular'>muovevamo</td></tr><tr><td>voi</td><td data='regular'>muovevate</td></tr><tr><td>loro</td><td data='regular'>muovevano</td></tr></tbody></table></div>"
            },
            nascere: {
                term: "nascere",
                definition: "be born",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>nasco</td></tr><tr><td>tu</td><td data='regular'>nasci</td></tr><tr><td>lui/lei</td><td data='regular'>nasce</td></tr><tr><td>noi</td><td data='regular'>nasciamo</td></tr><tr><td>voi</td><td data='regular'>nascete</td></tr><tr><td>loro</td><td data='regular'>nascono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>nascevo</td></tr><tr><td>tu</td><td data='regular'>nascevi</td></tr><tr><td>lui/lei</td><td data='regular'>nasceva</td></tr><tr><td>noi</td><td data='regular'>nascevamo</td></tr><tr><td>voi</td><td data='regular'>nascevate</td></tr><tr><td>loro</td><td data='regular'>nascevano</td></tr></tbody></table></div>"
            },
            nascondere: {
                term: "nascondere",
                definition: "hide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>nascondo</td></tr><tr><td>tu</td><td data='regular'>nascondi</td></tr><tr><td>lui/lei</td><td data='regular'>nasconde</td></tr><tr><td>noi</td><td data='regular'>nascondiamo</td></tr><tr><td>voi</td><td data='regular'>nascondete</td></tr><tr><td>loro</td><td data='regular'>nascondono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>nascondevo</td></tr><tr><td>tu</td><td data='regular'>nascondevi</td></tr><tr><td>lui/lei</td><td data='regular'>nascondeva</td></tr><tr><td>noi</td><td data='regular'>nascondevamo</td></tr><tr><td>voi</td><td data='regular'>nascondevate</td></tr><tr><td>loro</td><td data='regular'>nascondevano</td></tr></tbody></table></div>"
            },
            notare: {
                term: "notare",
                definition: "note",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>noto</td></tr><tr><td>tu</td><td data='regular'>noti</td></tr><tr><td>lui/lei</td><td data='regular'>nota</td></tr><tr><td>noi</td><td data='regular'>notiamo</td></tr><tr><td>voi</td><td data='regular'>notate</td></tr><tr><td>loro</td><td data='regular'>notano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>notavo</td></tr><tr><td>tu</td><td data='regular'>notavi</td></tr><tr><td>lui/lei</td><td data='regular'>notava</td></tr><tr><td>noi</td><td data='regular'>notavamo</td></tr><tr><td>voi</td><td data='regular'>notavate</td></tr><tr><td>loro</td><td data='regular'>notavano</td></tr></tbody></table></div>"
            },
            offendere: {
                term: "offendere",
                definition: "offend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>offendo</td></tr><tr><td>tu</td><td data='regular'>offendi</td></tr><tr><td>lui/lei</td><td data='regular'>offende</td></tr><tr><td>noi</td><td data='regular'>offendiamo</td></tr><tr><td>voi</td><td data='regular'>offendete</td></tr><tr><td>loro</td><td data='regular'>offendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>offendevo</td></tr><tr><td>tu</td><td data='regular'>offendevi</td></tr><tr><td>lui/lei</td><td data='regular'>offendeva</td></tr><tr><td>noi</td><td data='regular'>offendevamo</td></tr><tr><td>voi</td><td data='regular'>offendevate</td></tr><tr><td>loro</td><td data='regular'>offendevano</td></tr></tbody></table></div>"
            },
            offrire: {
                term: "offrire",
                definition: "offer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>offro</td></tr><tr><td>tu</td><td data='regular'>offri</td></tr><tr><td>lui/lei</td><td data='regular'>offre</td></tr><tr><td>noi</td><td data='regular'>offriamo</td></tr><tr><td>voi</td><td data='regular'>offrite</td></tr><tr><td>loro</td><td data='regular'>offrono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>offrivo</td></tr><tr><td>tu</td><td data='regular'>offrivi</td></tr><tr><td>lui/lei</td><td data='regular'>offriva</td></tr><tr><td>noi</td><td data='regular'>offrivamo</td></tr><tr><td>voi</td><td data='regular'>offrivate</td></tr><tr><td>loro</td><td data='regular'>offrivano</td></tr></tbody></table></div>"
            },
            opporre: {
                term: "opporre",
                definition: "offer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>oppongo</td></tr><tr><td>tu</td><td data='irregular'>opponi</td></tr><tr><td>lui/lei</td><td data='irregular'>oppone</td></tr><tr><td>noi</td><td data='irregular'>opponiamo</td></tr><tr><td>voi</td><td data='irregular'>opponete</td></tr><tr><td>loro</td><td data='irregular'>oppongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>opponevo</td></tr><tr><td>tu</td><td data='irregular'>opponevi</td></tr><tr><td>lui/lei</td><td data='irregular'>opponeva</td></tr><tr><td>noi</td><td data='irregular'>opponevamo</td></tr><tr><td>voi</td><td data='irregular'>opponevate</td></tr><tr><td>loro</td><td data='irregular'>opponevano</td></tr></tbody></table></div>"
            },
            ordinare: {
                term: "ordinare",
                definition: "order",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ordino</td></tr><tr><td>tu</td><td data='regular'>ordini</td></tr><tr><td>lui/lei</td><td data='regular'>ordina</td></tr><tr><td>noi</td><td data='regular'>ordiniamo</td></tr><tr><td>voi</td><td data='regular'>ordinate</td></tr><tr><td>loro</td><td data='regular'>ordinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ordinavo</td></tr><tr><td>tu</td><td data='regular'>ordinavi</td></tr><tr><td>lui/lei</td><td data='regular'>ordinava</td></tr><tr><td>noi</td><td data='regular'>ordinavamo</td></tr><tr><td>voi</td><td data='regular'>ordinavate</td></tr><tr><td>loro</td><td data='regular'>ordinavano</td></tr></tbody></table></div>"
            },
            organizzare: {
                term: "organizzare",
                definition: "organize",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>organizzo</td></tr><tr><td>tu</td><td data='regular'>organizzi</td></tr><tr><td>lui/lei</td><td data='regular'>organizza</td></tr><tr><td>noi</td><td data='regular'>organizziamo</td></tr><tr><td>voi</td><td data='regular'>organizzate</td></tr><tr><td>loro</td><td data='regular'>organizzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>organizzavo</td></tr><tr><td>tu</td><td data='regular'>organizzavi</td></tr><tr><td>lui/lei</td><td data='regular'>organizzava</td></tr><tr><td>noi</td><td data='regular'>organizzavamo</td></tr><tr><td>voi</td><td data='regular'>organizzavate</td></tr><tr><td>loro</td><td data='regular'>organizzavano</td></tr></tbody></table></div>"
            },
            osservare: {
                term: "osservare",
                definition: "observe",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>osservo</td></tr><tr><td>tu</td><td data='regular'>osservi</td></tr><tr><td>lui/lei</td><td data='regular'>osserva</td></tr><tr><td>noi</td><td data='regular'>osserviamo</td></tr><tr><td>voi</td><td data='regular'>osservate</td></tr><tr><td>loro</td><td data='regular'>osservano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>osservavo</td></tr><tr><td>tu</td><td data='regular'>osservavi</td></tr><tr><td>lui/lei</td><td data='regular'>osservava</td></tr><tr><td>noi</td><td data='regular'>osservavamo</td></tr><tr><td>voi</td><td data='regular'>osservavate</td></tr><tr><td>loro</td><td data='regular'>osservavano</td></tr></tbody></table></div>"
            },
            ottenere: {
                term: "ottenere",
                definition: "get",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>ottengo</td></tr><tr><td>tu</td><td data='irregular'>ottieni</td></tr><tr><td>lui/lei</td><td data='irregular'>ottiene</td></tr><tr><td>noi</td><td data='regular'>otteniamo</td></tr><tr><td>voi</td><td data='regular'>ottenete</td></tr><tr><td>loro</td><td data='irregular'>ottengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ottenevo</td></tr><tr><td>tu</td><td data='regular'>ottenevi</td></tr><tr><td>lui/lei</td><td data='regular'>otteneva</td></tr><tr><td>noi</td><td data='regular'>ottenevamo</td></tr><tr><td>voi</td><td data='regular'>ottenevate</td></tr><tr><td>loro</td><td data='regular'>ottenevano</td></tr></tbody></table></div>"
            },
            pagare: {
                term: "pagare",
                definition: "pay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>pago</td></tr><tr><td>tu</td><td data='regular'>paghi</td></tr><tr><td>lui/lei</td><td data='regular'>paga</td></tr><tr><td>noi</td><td data='regular'>paghiamo</td></tr><tr><td>voi</td><td data='regular'>pagate</td></tr><tr><td>loro</td><td data='regular'>pagano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>pagavo</td></tr><tr><td>tu</td><td data='regular'>pagavi</td></tr><tr><td>lui/lei</td><td data='regular'>pagava</td></tr><tr><td>noi</td><td data='regular'>pagavamo</td></tr><tr><td>voi</td><td data='regular'>pagavate</td></tr><tr><td>loro</td><td data='regular'>pagavano</td></tr></tbody></table></div>"
            },
            parere: {
                term: "parere",
                definition: "opinion",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>paio</td></tr><tr><td>tu</td><td data='regular'>pari</td></tr><tr><td>lui/lei</td><td data='regular'>pare</td></tr><tr><td>noi</td><td data='irregular'>paiamo</td></tr><tr><td>voi</td><td data='regular'>parete</td></tr><tr><td>loro</td><td data='irregular'>paiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>parevo</td></tr><tr><td>tu</td><td data='regular'>parevi</td></tr><tr><td>lui/lei</td><td data='regular'>pareva</td></tr><tr><td>noi</td><td data='regular'>parevamo</td></tr><tr><td>voi</td><td data='regular'>parevate</td></tr><tr><td>loro</td><td data='regular'>parevano</td></tr></tbody></table></div>"
            },
            parlare: {
                term: "parlare",
                definition: "speak",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>parlo</td></tr><tr><td>tu</td><td data='regular'>parli</td></tr><tr><td>lui/lei</td><td data='regular'>parla</td></tr><tr><td>noi</td><td data='regular'>parliamo</td></tr><tr><td>voi</td><td data='regular'>parlate</td></tr><tr><td>loro</td><td data='regular'>parlano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>parlavo</td></tr><tr><td>tu</td><td data='regular'>parlavi</td></tr><tr><td>lui/lei</td><td data='regular'>parlava</td></tr><tr><td>noi</td><td data='regular'>parlavamo</td></tr><tr><td>voi</td><td data='regular'>parlavate</td></tr><tr><td>loro</td><td data='regular'>parlavano</td></tr></tbody></table></div>"
            },
            partecipare: {
                term: "partecipare",
                definition: "take part",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>partecipo</td></tr><tr><td>tu</td><td data='regular'>partecipi</td></tr><tr><td>lui/lei</td><td data='regular'>partecipa</td></tr><tr><td>noi</td><td data='regular'>partecipiamo</td></tr><tr><td>voi</td><td data='regular'>partecipate</td></tr><tr><td>loro</td><td data='regular'>partecipano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>partecipavo</td></tr><tr><td>tu</td><td data='regular'>partecipavi</td></tr><tr><td>lui/lei</td><td data='regular'>partecipava</td></tr><tr><td>noi</td><td data='regular'>partecipavamo</td></tr><tr><td>voi</td><td data='regular'>partecipavate</td></tr><tr><td>loro</td><td data='regular'>partecipavano</td></tr></tbody></table></div>"
            },
            partire: {
                term: "partire",
                definition: "leave",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>parto</td></tr><tr><td>tu</td><td data='regular'>parti</td></tr><tr><td>lui/lei</td><td data='regular'>parte</td></tr><tr><td>noi</td><td data='regular'>partiamo</td></tr><tr><td>voi</td><td data='regular'>partite</td></tr><tr><td>loro</td><td data='regular'>partono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>partivo</td></tr><tr><td>tu</td><td data='regular'>partivi</td></tr><tr><td>lui/lei</td><td data='regular'>partiva</td></tr><tr><td>noi</td><td data='regular'>partivamo</td></tr><tr><td>voi</td><td data='regular'>partivate</td></tr><tr><td>loro</td><td data='regular'>partivano</td></tr></tbody></table></div>"
            },
            passare: {
                term: "passare",
                definition: "switch",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>passo</td></tr><tr><td>tu</td><td data='regular'>passi</td></tr><tr><td>lui/lei</td><td data='regular'>passa</td></tr><tr><td>noi</td><td data='regular'>passiamo</td></tr><tr><td>voi</td><td data='regular'>passate</td></tr><tr><td>loro</td><td data='regular'>passano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>passavo</td></tr><tr><td>tu</td><td data='regular'>passavi</td></tr><tr><td>lui/lei</td><td data='regular'>passava</td></tr><tr><td>noi</td><td data='regular'>passavamo</td></tr><tr><td>voi</td><td data='regular'>passavate</td></tr><tr><td>loro</td><td data='regular'>passavano</td></tr></tbody></table></div>"
            },
            pensare: {
                term: "pensare",
                definition: "think",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>penso</td></tr><tr><td>tu</td><td data='regular'>pensi</td></tr><tr><td>lui/lei</td><td data='regular'>pensa</td></tr><tr><td>noi</td><td data='regular'>pensiamo</td></tr><tr><td>voi</td><td data='regular'>pensate</td></tr><tr><td>loro</td><td data='regular'>pensano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>pensavo</td></tr><tr><td>tu</td><td data='regular'>pensavi</td></tr><tr><td>lui/lei</td><td data='regular'>pensava</td></tr><tr><td>noi</td><td data='regular'>pensavamo</td></tr><tr><td>voi</td><td data='regular'>pensavate</td></tr><tr><td>loro</td><td data='regular'>pensavano</td></tr></tbody></table></div>"
            },
            perdere: {
                term: "perdere",
                definition: "lose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>perdo</td></tr><tr><td>tu</td><td data='regular'>perdi</td></tr><tr><td>lui/lei</td><td data='regular'>perde</td></tr><tr><td>noi</td><td data='regular'>perdiamo</td></tr><tr><td>voi</td><td data='regular'>perdete</td></tr><tr><td>loro</td><td data='regular'>perdono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>perdevo</td></tr><tr><td>tu</td><td data='regular'>perdevi</td></tr><tr><td>lui/lei</td><td data='regular'>perdeva</td></tr><tr><td>noi</td><td data='regular'>perdevamo</td></tr><tr><td>voi</td><td data='regular'>perdevate</td></tr><tr><td>loro</td><td data='regular'>perdevano</td></tr></tbody></table></div>"
            },
            permettere: {
                term: "permettere",
                definition: "allow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>permetto</td></tr><tr><td>tu</td><td data='regular'>permetti</td></tr><tr><td>lui/lei</td><td data='regular'>permette</td></tr><tr><td>noi</td><td data='regular'>permettiamo</td></tr><tr><td>voi</td><td data='regular'>permettete</td></tr><tr><td>loro</td><td data='regular'>permettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>permettevo</td></tr><tr><td>tu</td><td data='regular'>permettevi</td></tr><tr><td>lui/lei</td><td data='regular'>permetteva</td></tr><tr><td>noi</td><td data='regular'>permettevamo</td></tr><tr><td>voi</td><td data='regular'>permettevate</td></tr><tr><td>loro</td><td data='regular'>permettevano</td></tr></tbody></table></div>"
            },
            pesare: {
                term: "pesare",
                definition: "weigh",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>peso</td></tr><tr><td>tu</td><td data='regular'>pesi</td></tr><tr><td>lui/lei</td><td data='regular'>pesa</td></tr><tr><td>noi</td><td data='regular'>pesiamo</td></tr><tr><td>voi</td><td data='regular'>pesate</td></tr><tr><td>loro</td><td data='regular'>pesano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>pesavo</td></tr><tr><td>tu</td><td data='regular'>pesavi</td></tr><tr><td>lui/lei</td><td data='regular'>pesava</td></tr><tr><td>noi</td><td data='regular'>pesavamo</td></tr><tr><td>voi</td><td data='regular'>pesavate</td></tr><tr><td>loro</td><td data='regular'>pesavano</td></tr></tbody></table></div>"
            },
            piacere: {
                term: "piacere",
                definition: "pleasure",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>piaccio</td></tr><tr><td>tu</td><td data='regular'>piaci</td></tr><tr><td>lui/lei</td><td data='regular'>piace</td></tr><tr><td>noi</td><td data='irregular'>piacciamo</td></tr><tr><td>voi</td><td data='regular'>piacete</td></tr><tr><td>loro</td><td data='irregular'>piacciono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>piacevo</td></tr><tr><td>tu</td><td data='regular'>piacevi</td></tr><tr><td>lui/lei</td><td data='regular'>piaceva</td></tr><tr><td>noi</td><td data='regular'>piacevamo</td></tr><tr><td>voi</td><td data='regular'>piacevate</td></tr><tr><td>loro</td><td data='regular'>piacevano</td></tr></tbody></table></div>"
            },
            piangere: {
                term: "piangere",
                definition: "cry",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>piango</td></tr><tr><td>tu</td><td data='regular'>piangi</td></tr><tr><td>lui/lei</td><td data='regular'>piange</td></tr><tr><td>noi</td><td data='regular'>piangiamo</td></tr><tr><td>voi</td><td data='regular'>piangete</td></tr><tr><td>loro</td><td data='regular'>piangono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>piangevo</td></tr><tr><td>tu</td><td data='regular'>piangevi</td></tr><tr><td>lui/lei</td><td data='regular'>piangeva</td></tr><tr><td>noi</td><td data='regular'>piangevamo</td></tr><tr><td>voi</td><td data='regular'>piangevate</td></tr><tr><td>loro</td><td data='regular'>piangevano</td></tr></tbody></table></div>"
            },
            piantare: {
                term: "piantare",
                definition: "plant",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>pianto</td></tr><tr><td>tu</td><td data='regular'>pianti</td></tr><tr><td>lui/lei</td><td data='regular'>pianta</td></tr><tr><td>noi</td><td data='regular'>piantiamo</td></tr><tr><td>voi</td><td data='regular'>piantate</td></tr><tr><td>loro</td><td data='regular'>piantano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>piantavo</td></tr><tr><td>tu</td><td data='regular'>piantavi</td></tr><tr><td>lui/lei</td><td data='regular'>piantava</td></tr><tr><td>noi</td><td data='regular'>piantavamo</td></tr><tr><td>voi</td><td data='regular'>piantavate</td></tr><tr><td>loro</td><td data='regular'>piantavano</td></tr></tbody></table></div>"
            },
            porre: {
                term: "porre",
                definition: "place",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>pongo</td></tr><tr><td>tu</td><td data='irregular'>poni</td></tr><tr><td>lui/lei</td><td data='irregular'>pone</td></tr><tr><td>noi</td><td data='irregular'>poniamo</td></tr><tr><td>voi</td><td data='irregular'>ponete</td></tr><tr><td>loro</td><td data='irregular'>pongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>ponevo</td></tr><tr><td>tu</td><td data='irregular'>ponevi</td></tr><tr><td>lui/lei</td><td data='irregular'>poneva</td></tr><tr><td>noi</td><td data='irregular'>ponevamo</td></tr><tr><td>voi</td><td data='irregular'>ponevate</td></tr><tr><td>loro</td><td data='irregular'>ponevano</td></tr></tbody></table></div>"
            },
            portare: {
                term: "portare",
                definition: "bring",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>porto</td></tr><tr><td>tu</td><td data='regular'>porti</td></tr><tr><td>lui/lei</td><td data='regular'>porta</td></tr><tr><td>noi</td><td data='regular'>portiamo</td></tr><tr><td>voi</td><td data='regular'>portate</td></tr><tr><td>loro</td><td data='regular'>portano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>portavo</td></tr><tr><td>tu</td><td data='regular'>portavi</td></tr><tr><td>lui/lei</td><td data='regular'>portava</td></tr><tr><td>noi</td><td data='regular'>portavamo</td></tr><tr><td>voi</td><td data='regular'>portavate</td></tr><tr><td>loro</td><td data='regular'>portavano</td></tr></tbody></table></div>"
            },
            possedere: {
                term: "possedere",
                definition: "own",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>possiedo</td></tr><tr><td>tu</td><td data='irregular'>possiedi</td></tr><tr><td>lui/lei</td><td data='irregular'>possiede</td></tr><tr><td>noi</td><td data='regular'>possediamo</td></tr><tr><td>voi</td><td data='regular'>possedete</td></tr><tr><td>loro</td><td data='irregular'>possiedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>possedevo</td></tr><tr><td>tu</td><td data='regular'>possedevi</td></tr><tr><td>lui/lei</td><td data='regular'>possedeva</td></tr><tr><td>noi</td><td data='regular'>possedevamo</td></tr><tr><td>voi</td><td data='regular'>possedevate</td></tr><tr><td>loro</td><td data='regular'>possedevano</td></tr></tbody></table></div>"
            },
            potere: {
                term: "potere",
                definition: "power",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>posso</td></tr><tr><td>tu</td><td data='irregular'>puoi</td></tr><tr><td>lui/lei</td><td data='irregular'>può</td></tr><tr><td>noi</td><td data='irregular'>possiamo</td></tr><tr><td>voi</td><td data='regular'>potete</td></tr><tr><td>loro</td><td data='irregular'>possono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>potevo</td></tr><tr><td>tu</td><td data='regular'>potevi</td></tr><tr><td>lui/lei</td><td data='regular'>poteva</td></tr><tr><td>noi</td><td data='regular'>potevamo</td></tr><tr><td>voi</td><td data='regular'>potevate</td></tr><tr><td>loro</td><td data='regular'>potevano</td></tr></tbody></table></div>"
            },
            preferire: {
                term: "preferire",
                definition: "prefer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>preferisco</td></tr><tr><td>tu</td><td data='irregular'>preferisci</td></tr><tr><td>lui/lei</td><td data='irregular'>preferisce</td></tr><tr><td>noi</td><td data='regular'>preferiamo</td></tr><tr><td>voi</td><td data='regular'>preferite</td></tr><tr><td>loro</td><td data='irregular'>preferiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>preferivo</td></tr><tr><td>tu</td><td data='regular'>preferivi</td></tr><tr><td>lui/lei</td><td data='regular'>preferiva</td></tr><tr><td>noi</td><td data='regular'>preferivamo</td></tr><tr><td>voi</td><td data='regular'>preferivate</td></tr><tr><td>loro</td><td data='regular'>preferivano</td></tr></tbody></table></div>"
            },
            pregare: {
                term: "pregare",
                definition: "pray",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>prego</td></tr><tr><td>tu</td><td data='regular'>preghi</td></tr><tr><td>lui/lei</td><td data='regular'>prega</td></tr><tr><td>noi</td><td data='regular'>preghiamo</td></tr><tr><td>voi</td><td data='regular'>pregate</td></tr><tr><td>loro</td><td data='regular'>pregano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>pregavo</td></tr><tr><td>tu</td><td data='regular'>pregavi</td></tr><tr><td>lui/lei</td><td data='regular'>pregava</td></tr><tr><td>noi</td><td data='regular'>pregavamo</td></tr><tr><td>voi</td><td data='regular'>pregavate</td></tr><tr><td>loro</td><td data='regular'>pregavano</td></tr></tbody></table></div>"
            },
            prendere: {
                term: "prendere",
                definition: "take",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>prendo</td></tr><tr><td>tu</td><td data='regular'>prendi</td></tr><tr><td>lui/lei</td><td data='regular'>prende</td></tr><tr><td>noi</td><td data='regular'>prendiamo</td></tr><tr><td>voi</td><td data='regular'>prendete</td></tr><tr><td>loro</td><td data='regular'>prendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>prendevo</td></tr><tr><td>tu</td><td data='regular'>prendevi</td></tr><tr><td>lui/lei</td><td data='regular'>prendeva</td></tr><tr><td>noi</td><td data='regular'>prendevamo</td></tr><tr><td>voi</td><td data='regular'>prendevate</td></tr><tr><td>loro</td><td data='regular'>prendevano</td></tr></tbody></table></div>"
            },
            preparare: {
                term: "preparare",
                definition: "prepare",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>preparo</td></tr><tr><td>tu</td><td data='regular'>prepari</td></tr><tr><td>lui/lei</td><td data='regular'>prepara</td></tr><tr><td>noi</td><td data='regular'>prepariamo</td></tr><tr><td>voi</td><td data='regular'>preparate</td></tr><tr><td>loro</td><td data='regular'>preparano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>preparavo</td></tr><tr><td>tu</td><td data='regular'>preparavi</td></tr><tr><td>lui/lei</td><td data='regular'>preparava</td></tr><tr><td>noi</td><td data='regular'>preparavamo</td></tr><tr><td>voi</td><td data='regular'>preparavate</td></tr><tr><td>loro</td><td data='regular'>preparavano</td></tr></tbody></table></div>"
            },
            presentare: {
                term: "presentare",
                definition: "present",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>presento</td></tr><tr><td>tu</td><td data='regular'>presenti</td></tr><tr><td>lui/lei</td><td data='regular'>presenta</td></tr><tr><td>noi</td><td data='regular'>presentiamo</td></tr><tr><td>voi</td><td data='regular'>presentate</td></tr><tr><td>loro</td><td data='regular'>presentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>presentavo</td></tr><tr><td>tu</td><td data='regular'>presentavi</td></tr><tr><td>lui/lei</td><td data='regular'>presentava</td></tr><tr><td>noi</td><td data='regular'>presentavamo</td></tr><tr><td>voi</td><td data='regular'>presentavate</td></tr><tr><td>loro</td><td data='regular'>presentavano</td></tr></tbody></table></div>"
            },
            procedere: {
                term: "procedere",
                definition: "continue",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>procedo</td></tr><tr><td>tu</td><td data='regular'>procedi</td></tr><tr><td>lui/lei</td><td data='regular'>procede</td></tr><tr><td>noi</td><td data='regular'>procediamo</td></tr><tr><td>voi</td><td data='regular'>procedete</td></tr><tr><td>loro</td><td data='regular'>procedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>procedevo</td></tr><tr><td>tu</td><td data='regular'>procedevi</td></tr><tr><td>lui/lei</td><td data='regular'>procedeva</td></tr><tr><td>noi</td><td data='regular'>procedevamo</td></tr><tr><td>voi</td><td data='regular'>procedevate</td></tr><tr><td>loro</td><td data='regular'>procedevano</td></tr></tbody></table></div>"
            },
            produrre: {
                term: "produrre",
                definition: "produce",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>produco</td></tr><tr><td>tu</td><td data='irregular'>produci</td></tr><tr><td>lui/lei</td><td data='irregular'>produce</td></tr><tr><td>noi</td><td data='irregular'>produciamo</td></tr><tr><td>voi</td><td data='irregular'>producete</td></tr><tr><td>loro</td><td data='irregular'>producono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>producevo</td></tr><tr><td>tu</td><td data='irregular'>producevi</td></tr><tr><td>lui/lei</td><td data='irregular'>produceva</td></tr><tr><td>noi</td><td data='irregular'>producevamo</td></tr><tr><td>voi</td><td data='irregular'>producevate</td></tr><tr><td>loro</td><td data='irregular'>producevano</td></tr></tbody></table></div>"
            },
            promettere: {
                term: "promettere",
                definition: "promise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>prometto</td></tr><tr><td>tu</td><td data='regular'>prometti</td></tr><tr><td>lui/lei</td><td data='regular'>promette</td></tr><tr><td>noi</td><td data='regular'>promettiamo</td></tr><tr><td>voi</td><td data='regular'>promettete</td></tr><tr><td>loro</td><td data='regular'>promettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>promettevo</td></tr><tr><td>tu</td><td data='regular'>promettevi</td></tr><tr><td>lui/lei</td><td data='regular'>prometteva</td></tr><tr><td>noi</td><td data='regular'>promettevamo</td></tr><tr><td>voi</td><td data='regular'>promettevate</td></tr><tr><td>loro</td><td data='regular'>promettevano</td></tr></tbody></table></div>"
            },
            proporre: {
                term: "proporre",
                definition: "propose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>propongo</td></tr><tr><td>tu</td><td data='irregular'>proponi</td></tr><tr><td>lui/lei</td><td data='irregular'>propone</td></tr><tr><td>noi</td><td data='irregular'>proponiamo</td></tr><tr><td>voi</td><td data='irregular'>proponete</td></tr><tr><td>loro</td><td data='irregular'>propongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>proponevo</td></tr><tr><td>tu</td><td data='irregular'>proponevi</td></tr><tr><td>lui/lei</td><td data='irregular'>proponeva</td></tr><tr><td>noi</td><td data='irregular'>proponevamo</td></tr><tr><td>voi</td><td data='irregular'>proponevate</td></tr><tr><td>loro</td><td data='irregular'>proponevano</td></tr></tbody></table></div>"
            },
            provare: {
                term: "provare",
                definition: "try",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>provo</td></tr><tr><td>tu</td><td data='regular'>provi</td></tr><tr><td>lui/lei</td><td data='regular'>prova</td></tr><tr><td>noi</td><td data='regular'>proviamo</td></tr><tr><td>voi</td><td data='regular'>provate</td></tr><tr><td>loro</td><td data='regular'>provano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>provavo</td></tr><tr><td>tu</td><td data='regular'>provavi</td></tr><tr><td>lui/lei</td><td data='regular'>provava</td></tr><tr><td>noi</td><td data='regular'>provavamo</td></tr><tr><td>voi</td><td data='regular'>provavate</td></tr><tr><td>loro</td><td data='regular'>provavano</td></tr></tbody></table></div>"
            },
            provocare: {
                term: "provocare",
                definition: "cause",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>provoco</td></tr><tr><td>tu</td><td data='regular'>provochi</td></tr><tr><td>lui/lei</td><td data='regular'>provoca</td></tr><tr><td>noi</td><td data='regular'>provochiamo</td></tr><tr><td>voi</td><td data='regular'>provocate</td></tr><tr><td>loro</td><td data='regular'>provocano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>provocavo</td></tr><tr><td>tu</td><td data='regular'>provocavi</td></tr><tr><td>lui/lei</td><td data='regular'>provocava</td></tr><tr><td>noi</td><td data='regular'>provocavamo</td></tr><tr><td>voi</td><td data='regular'>provocavate</td></tr><tr><td>loro</td><td data='regular'>provocavano</td></tr></tbody></table></div>"
            },
            provvedere: {
                term: "provvedere",
                definition: "provide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>provvedo</td></tr><tr><td>tu</td><td data='regular'>provvedi</td></tr><tr><td>lui/lei</td><td data='regular'>provvede</td></tr><tr><td>noi</td><td data='regular'>provvediamo</td></tr><tr><td>voi</td><td data='regular'>provvedete</td></tr><tr><td>loro</td><td data='regular'>provvedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>provvedevo</td></tr><tr><td>tu</td><td data='regular'>provvedevi</td></tr><tr><td>lui/lei</td><td data='regular'>provvedeva</td></tr><tr><td>noi</td><td data='regular'>provvedevamo</td></tr><tr><td>voi</td><td data='regular'>provvedevate</td></tr><tr><td>loro</td><td data='regular'>provvedevano</td></tr></tbody></table></div>"
            },
            pubblicare: {
                term: "pubblicare",
                definition: "publish",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>pubblico</td></tr><tr><td>tu</td><td data='regular'>pubblichi</td></tr><tr><td>lui/lei</td><td data='regular'>pubblica</td></tr><tr><td>noi</td><td data='regular'>pubblichiamo</td></tr><tr><td>voi</td><td data='regular'>pubblicate</td></tr><tr><td>loro</td><td data='regular'>pubblicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>pubblicavo</td></tr><tr><td>tu</td><td data='regular'>pubblicavi</td></tr><tr><td>lui/lei</td><td data='regular'>pubblicava</td></tr><tr><td>noi</td><td data='regular'>pubblicavamo</td></tr><tr><td>voi</td><td data='regular'>pubblicavate</td></tr><tr><td>loro</td><td data='regular'>pubblicavano</td></tr></tbody></table></div>"
            },
            raccogliere: {
                term: "raccogliere",
                definition: "gather",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>raccolgo</td></tr><tr><td>tu</td><td data='irregular'>raccogli</td></tr><tr><td>lui/lei</td><td data='regular'>raccoglie</td></tr><tr><td>noi</td><td data='irregular'>raccogliamo</td></tr><tr><td>voi</td><td data='regular'>raccogliete</td></tr><tr><td>loro</td><td data='irregular'>raccolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>raccoglievo</td></tr><tr><td>tu</td><td data='regular'>raccoglievi</td></tr><tr><td>lui/lei</td><td data='regular'>raccoglieva</td></tr><tr><td>noi</td><td data='regular'>raccoglievamo</td></tr><tr><td>voi</td><td data='regular'>raccoglievate</td></tr><tr><td>loro</td><td data='regular'>raccoglievano</td></tr></tbody></table></div>"
            },
            raccontare: {
                term: "raccontare",
                definition: "tell",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>racconto</td></tr><tr><td>tu</td><td data='regular'>racconti</td></tr><tr><td>lui/lei</td><td data='regular'>racconta</td></tr><tr><td>noi</td><td data='regular'>raccontiamo</td></tr><tr><td>voi</td><td data='regular'>raccontate</td></tr><tr><td>loro</td><td data='regular'>raccontano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>raccontavo</td></tr><tr><td>tu</td><td data='regular'>raccontavi</td></tr><tr><td>lui/lei</td><td data='regular'>raccontava</td></tr><tr><td>noi</td><td data='regular'>raccontavamo</td></tr><tr><td>voi</td><td data='regular'>raccontavate</td></tr><tr><td>loro</td><td data='regular'>raccontavano</td></tr></tbody></table></div>"
            },
            raggiungere: {
                term: "raggiungere",
                definition: "reach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>raggiungo</td></tr><tr><td>tu</td><td data='regular'>raggiungi</td></tr><tr><td>lui/lei</td><td data='regular'>raggiunge</td></tr><tr><td>noi</td><td data='regular'>raggiungiamo</td></tr><tr><td>voi</td><td data='regular'>raggiungete</td></tr><tr><td>loro</td><td data='regular'>raggiungono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>raggiungevo</td></tr><tr><td>tu</td><td data='regular'>raggiungevi</td></tr><tr><td>lui/lei</td><td data='regular'>raggiungeva</td></tr><tr><td>noi</td><td data='regular'>raggiungevamo</td></tr><tr><td>voi</td><td data='regular'>raggiungevate</td></tr><tr><td>loro</td><td data='regular'>raggiungevano</td></tr></tbody></table></div>"
            },
            rappresentare: {
                term: "rappresentare",
                definition: "represent",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rappresento</td></tr><tr><td>tu</td><td data='regular'>rappresenti</td></tr><tr><td>lui/lei</td><td data='regular'>rappresenta</td></tr><tr><td>noi</td><td data='regular'>rappresentiamo</td></tr><tr><td>voi</td><td data='regular'>rappresentate</td></tr><tr><td>loro</td><td data='regular'>rappresentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rappresentavo</td></tr><tr><td>tu</td><td data='regular'>rappresentavi</td></tr><tr><td>lui/lei</td><td data='regular'>rappresentava</td></tr><tr><td>noi</td><td data='regular'>rappresentavamo</td></tr><tr><td>voi</td><td data='regular'>rappresentavate</td></tr><tr><td>loro</td><td data='regular'>rappresentavano</td></tr></tbody></table></div>"
            },
            rendere: {
                term: "rendere",
                definition: "make",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rendo</td></tr><tr><td>tu</td><td data='regular'>rendi</td></tr><tr><td>lui/lei</td><td data='regular'>rende</td></tr><tr><td>noi</td><td data='regular'>rendiamo</td></tr><tr><td>voi</td><td data='regular'>rendete</td></tr><tr><td>loro</td><td data='regular'>rendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rendevo</td></tr><tr><td>tu</td><td data='regular'>rendevi</td></tr><tr><td>lui/lei</td><td data='regular'>rendeva</td></tr><tr><td>noi</td><td data='regular'>rendevamo</td></tr><tr><td>voi</td><td data='regular'>rendevate</td></tr><tr><td>loro</td><td data='regular'>rendevano</td></tr></tbody></table></div>"
            },
            resistere: {
                term: "resistere",
                definition: "resist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>resisto</td></tr><tr><td>tu</td><td data='regular'>resisti</td></tr><tr><td>lui/lei</td><td data='regular'>resiste</td></tr><tr><td>noi</td><td data='regular'>resistiamo</td></tr><tr><td>voi</td><td data='regular'>resistete</td></tr><tr><td>loro</td><td data='regular'>resistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>resistevo</td></tr><tr><td>tu</td><td data='regular'>resistevi</td></tr><tr><td>lui/lei</td><td data='regular'>resisteva</td></tr><tr><td>noi</td><td data='regular'>resistevamo</td></tr><tr><td>voi</td><td data='regular'>resistevate</td></tr><tr><td>loro</td><td data='regular'>resistevano</td></tr></tbody></table></div>"
            },
            restare: {
                term: "restare",
                definition: "stay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>resto</td></tr><tr><td>tu</td><td data='regular'>resti</td></tr><tr><td>lui/lei</td><td data='regular'>resta</td></tr><tr><td>noi</td><td data='regular'>restiamo</td></tr><tr><td>voi</td><td data='regular'>restate</td></tr><tr><td>loro</td><td data='regular'>restano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>restavo</td></tr><tr><td>tu</td><td data='regular'>restavi</td></tr><tr><td>lui/lei</td><td data='regular'>restava</td></tr><tr><td>noi</td><td data='regular'>restavamo</td></tr><tr><td>voi</td><td data='regular'>restavate</td></tr><tr><td>loro</td><td data='regular'>restavano</td></tr></tbody></table></div>"
            },
            ricevere: {
                term: "ricevere",
                definition: "receive",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ricevo</td></tr><tr><td>tu</td><td data='regular'>ricevi</td></tr><tr><td>lui/lei</td><td data='regular'>riceve</td></tr><tr><td>noi</td><td data='regular'>riceviamo</td></tr><tr><td>voi</td><td data='regular'>ricevete</td></tr><tr><td>loro</td><td data='regular'>ricevono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ricevevo</td></tr><tr><td>tu</td><td data='regular'>ricevevi</td></tr><tr><td>lui/lei</td><td data='regular'>riceveva</td></tr><tr><td>noi</td><td data='regular'>ricevevamo</td></tr><tr><td>voi</td><td data='regular'>ricevevate</td></tr><tr><td>loro</td><td data='regular'>ricevevano</td></tr></tbody></table></div>"
            },
            riconoscere: {
                term: "riconoscere",
                definition: "recognize",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>riconosco</td></tr><tr><td>tu</td><td data='regular'>riconosci</td></tr><tr><td>lui/lei</td><td data='regular'>riconosce</td></tr><tr><td>noi</td><td data='regular'>riconosciamo</td></tr><tr><td>voi</td><td data='regular'>riconoscete</td></tr><tr><td>loro</td><td data='regular'>riconoscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riconoscevo</td></tr><tr><td>tu</td><td data='regular'>riconoscevi</td></tr><tr><td>lui/lei</td><td data='regular'>riconosceva</td></tr><tr><td>noi</td><td data='regular'>riconoscevamo</td></tr><tr><td>voi</td><td data='regular'>riconoscevate</td></tr><tr><td>loro</td><td data='regular'>riconoscevano</td></tr></tbody></table></div>"
            },
            ricordare: {
                term: "ricordare",
                definition: "remember",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ricordo</td></tr><tr><td>tu</td><td data='regular'>ricordi</td></tr><tr><td>lui/lei</td><td data='regular'>ricorda</td></tr><tr><td>noi</td><td data='regular'>ricordiamo</td></tr><tr><td>voi</td><td data='regular'>ricordate</td></tr><tr><td>loro</td><td data='regular'>ricordano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ricordavo</td></tr><tr><td>tu</td><td data='regular'>ricordavi</td></tr><tr><td>lui/lei</td><td data='regular'>ricordava</td></tr><tr><td>noi</td><td data='regular'>ricordavamo</td></tr><tr><td>voi</td><td data='regular'>ricordavate</td></tr><tr><td>loro</td><td data='regular'>ricordavano</td></tr></tbody></table></div>"
            },
            ridere: {
                term: "ridere",
                definition: "laugh",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rido</td></tr><tr><td>tu</td><td data='regular'>ridi</td></tr><tr><td>lui/lei</td><td data='regular'>ride</td></tr><tr><td>noi</td><td data='regular'>ridiamo</td></tr><tr><td>voi</td><td data='regular'>ridete</td></tr><tr><td>loro</td><td data='regular'>ridono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ridevo</td></tr><tr><td>tu</td><td data='regular'>ridevi</td></tr><tr><td>lui/lei</td><td data='regular'>rideva</td></tr><tr><td>noi</td><td data='regular'>ridevamo</td></tr><tr><td>voi</td><td data='regular'>ridevate</td></tr><tr><td>loro</td><td data='regular'>ridevano</td></tr></tbody></table></div>"
            },
            ridurre: {
                term: "ridurre",
                definition: "reduce",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>riduco</td></tr><tr><td>tu</td><td data='irregular'>riduci</td></tr><tr><td>lui/lei</td><td data='irregular'>riduce</td></tr><tr><td>noi</td><td data='irregular'>riduciamo</td></tr><tr><td>voi</td><td data='irregular'>riducete</td></tr><tr><td>loro</td><td data='irregular'>riducono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='irregular'>riducevo</td></tr><tr><td>tu</td><td data='irregular'>riducevi</td></tr><tr><td>lui/lei</td><td data='irregular'>riduceva</td></tr><tr><td>noi</td><td data='irregular'>riducevamo</td></tr><tr><td>voi</td><td data='irregular'>riducevate</td></tr><tr><td>loro</td><td data='irregular'>riducevano</td></tr></tbody></table></div>"
            },
            riempire: {
                term: "riempire",
                definition: "fill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>riempio</td></tr><tr><td>tu</td><td data='regular'>riempi</td></tr><tr><td>lui/lei</td><td data='irregular'>riempie</td></tr><tr><td>noi</td><td data='regular'>riempiamo</td></tr><tr><td>voi</td><td data='regular'>riempite</td></tr><tr><td>loro</td><td data='irregular'>riempiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riempivo</td></tr><tr><td>tu</td><td data='regular'>riempivi</td></tr><tr><td>lui/lei</td><td data='regular'>riempiva</td></tr><tr><td>noi</td><td data='regular'>riempivamo</td></tr><tr><td>voi</td><td data='regular'>riempivate</td></tr><tr><td>loro</td><td data='regular'>riempivano</td></tr></tbody></table></div>"
            },
            riferire: {
                term: "riferire",
                definition: "report",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>riferisco</td></tr><tr><td>tu</td><td data='irregular'>riferisci</td></tr><tr><td>lui/lei</td><td data='irregular'>riferisce</td></tr><tr><td>noi</td><td data='regular'>riferiamo</td></tr><tr><td>voi</td><td data='regular'>riferite</td></tr><tr><td>loro</td><td data='irregular'>riferiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riferivo</td></tr><tr><td>tu</td><td data='regular'>riferivi</td></tr><tr><td>lui/lei</td><td data='regular'>riferiva</td></tr><tr><td>noi</td><td data='regular'>riferivamo</td></tr><tr><td>voi</td><td data='regular'>riferivate</td></tr><tr><td>loro</td><td data='regular'>riferivano</td></tr></tbody></table></div>"
            },
            riguardare: {
                term: "riguardare",
                definition: "concern",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>riguardo</td></tr><tr><td>tu</td><td data='regular'>riguardi</td></tr><tr><td>lui/lei</td><td data='regular'>riguarda</td></tr><tr><td>noi</td><td data='regular'>riguardiamo</td></tr><tr><td>voi</td><td data='regular'>riguardate</td></tr><tr><td>loro</td><td data='regular'>riguardano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riguardavo</td></tr><tr><td>tu</td><td data='regular'>riguardavi</td></tr><tr><td>lui/lei</td><td data='regular'>riguardava</td></tr><tr><td>noi</td><td data='regular'>riguardavamo</td></tr><tr><td>voi</td><td data='regular'>riguardavate</td></tr><tr><td>loro</td><td data='regular'>riguardavano</td></tr></tbody></table></div>"
            },
            rimanere: {
                term: "rimanere",
                definition: "stay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>rimango</td></tr><tr><td>tu</td><td data='regular'>rimani</td></tr><tr><td>lui/lei</td><td data='regular'>rimane</td></tr><tr><td>noi</td><td data='regular'>rimaniamo</td></tr><tr><td>voi</td><td data='regular'>rimanete</td></tr><tr><td>loro</td><td data='irregular'>rimangono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rimanevo</td></tr><tr><td>tu</td><td data='regular'>rimanevi</td></tr><tr><td>lui/lei</td><td data='regular'>rimaneva</td></tr><tr><td>noi</td><td data='regular'>rimanevamo</td></tr><tr><td>voi</td><td data='regular'>rimanevate</td></tr><tr><td>loro</td><td data='regular'>rimanevano</td></tr></tbody></table></div>"
            },
            rimettere: {
                term: "rimettere",
                definition: "return",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rimetto</td></tr><tr><td>tu</td><td data='regular'>rimetti</td></tr><tr><td>lui/lei</td><td data='regular'>rimette</td></tr><tr><td>noi</td><td data='regular'>rimettiamo</td></tr><tr><td>voi</td><td data='regular'>rimettete</td></tr><tr><td>loro</td><td data='regular'>rimettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rimettevo</td></tr><tr><td>tu</td><td data='regular'>rimettevi</td></tr><tr><td>lui/lei</td><td data='regular'>rimetteva</td></tr><tr><td>noi</td><td data='regular'>rimettevamo</td></tr><tr><td>voi</td><td data='regular'>rimettevate</td></tr><tr><td>loro</td><td data='regular'>rimettevano</td></tr></tbody></table></div>"
            },
            ringraziare: {
                term: "ringraziare",
                definition: "thank",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ringrazio</td></tr><tr><td>tu</td><td data='regular'>ringrazi</td></tr><tr><td>lui/lei</td><td data='regular'>ringrazia</td></tr><tr><td>noi</td><td data='regular'>ringraziamo</td></tr><tr><td>voi</td><td data='regular'>ringraziate</td></tr><tr><td>loro</td><td data='regular'>ringraziano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ringraziavo</td></tr><tr><td>tu</td><td data='regular'>ringraziavi</td></tr><tr><td>lui/lei</td><td data='regular'>ringraziava</td></tr><tr><td>noi</td><td data='regular'>ringraziavamo</td></tr><tr><td>voi</td><td data='regular'>ringraziavate</td></tr><tr><td>loro</td><td data='regular'>ringraziavano</td></tr></tbody></table></div>"
            },
            ripetere: {
                term: "ripetere",
                definition: "repeat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ripeto</td></tr><tr><td>tu</td><td data='regular'>ripeti</td></tr><tr><td>lui/lei</td><td data='regular'>ripete</td></tr><tr><td>noi</td><td data='regular'>ripetiamo</td></tr><tr><td>voi</td><td data='regular'>ripetete</td></tr><tr><td>loro</td><td data='regular'>ripetono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ripetevo</td></tr><tr><td>tu</td><td data='regular'>ripetevi</td></tr><tr><td>lui/lei</td><td data='regular'>ripeteva</td></tr><tr><td>noi</td><td data='regular'>ripetevamo</td></tr><tr><td>voi</td><td data='regular'>ripetevate</td></tr><tr><td>loro</td><td data='regular'>ripetevano</td></tr></tbody></table></div>"
            },
            riportare: {
                term: "riportare",
                definition: "report",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>riporto</td></tr><tr><td>tu</td><td data='regular'>riporti</td></tr><tr><td>lui/lei</td><td data='regular'>riporta</td></tr><tr><td>noi</td><td data='regular'>riportiamo</td></tr><tr><td>voi</td><td data='regular'>riportate</td></tr><tr><td>loro</td><td data='regular'>riportano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riportavo</td></tr><tr><td>tu</td><td data='regular'>riportavi</td></tr><tr><td>lui/lei</td><td data='regular'>riportava</td></tr><tr><td>noi</td><td data='regular'>riportavamo</td></tr><tr><td>voi</td><td data='regular'>riportavate</td></tr><tr><td>loro</td><td data='regular'>riportavano</td></tr></tbody></table></div>"
            },
            riprendere: {
                term: "riprendere",
                definition: "resume",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>riprendo</td></tr><tr><td>tu</td><td data='regular'>riprendi</td></tr><tr><td>lui/lei</td><td data='regular'>riprende</td></tr><tr><td>noi</td><td data='regular'>riprendiamo</td></tr><tr><td>voi</td><td data='regular'>riprendete</td></tr><tr><td>loro</td><td data='regular'>riprendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riprendevo</td></tr><tr><td>tu</td><td data='regular'>riprendevi</td></tr><tr><td>lui/lei</td><td data='regular'>riprendeva</td></tr><tr><td>noi</td><td data='regular'>riprendevamo</td></tr><tr><td>voi</td><td data='regular'>riprendevate</td></tr><tr><td>loro</td><td data='regular'>riprendevano</td></tr></tbody></table></div>"
            },
            risolvere: {
                term: "risolvere",
                definition: "solve",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>risolvo</td></tr><tr><td>tu</td><td data='regular'>risolvi</td></tr><tr><td>lui/lei</td><td data='regular'>risolve</td></tr><tr><td>noi</td><td data='regular'>risolviamo</td></tr><tr><td>voi</td><td data='regular'>risolvete</td></tr><tr><td>loro</td><td data='regular'>risolvono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>risolvevo</td></tr><tr><td>tu</td><td data='regular'>risolvevi</td></tr><tr><td>lui/lei</td><td data='regular'>risolveva</td></tr><tr><td>noi</td><td data='regular'>risolvevamo</td></tr><tr><td>voi</td><td data='regular'>risolvevate</td></tr><tr><td>loro</td><td data='regular'>risolvevano</td></tr></tbody></table></div>"
            },
            rispondere: {
                term: "rispondere",
                definition: "answer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rispondo</td></tr><tr><td>tu</td><td data='regular'>rispondi</td></tr><tr><td>lui/lei</td><td data='regular'>risponde</td></tr><tr><td>noi</td><td data='regular'>rispondiamo</td></tr><tr><td>voi</td><td data='regular'>rispondete</td></tr><tr><td>loro</td><td data='regular'>rispondono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rispondevo</td></tr><tr><td>tu</td><td data='regular'>rispondevi</td></tr><tr><td>lui/lei</td><td data='regular'>rispondeva</td></tr><tr><td>noi</td><td data='regular'>rispondevamo</td></tr><tr><td>voi</td><td data='regular'>rispondevate</td></tr><tr><td>loro</td><td data='regular'>rispondevano</td></tr></tbody></table></div>"
            },
            risultare: {
                term: "risultare",
                definition: "result",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>risulto</td></tr><tr><td>tu</td><td data='regular'>risulti</td></tr><tr><td>lui/lei</td><td data='regular'>risulta</td></tr><tr><td>noi</td><td data='regular'>risultiamo</td></tr><tr><td>voi</td><td data='regular'>risultate</td></tr><tr><td>loro</td><td data='regular'>risultano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>risultavo</td></tr><tr><td>tu</td><td data='regular'>risultavi</td></tr><tr><td>lui/lei</td><td data='regular'>risultava</td></tr><tr><td>noi</td><td data='regular'>risultavamo</td></tr><tr><td>voi</td><td data='regular'>risultavate</td></tr><tr><td>loro</td><td data='regular'>risultavano</td></tr></tbody></table></div>"
            },
            ritenere: {
                term: "ritenere",
                definition: "consider",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>ritengo</td></tr><tr><td>tu</td><td data='irregular'>ritieni</td></tr><tr><td>lui/lei</td><td data='irregular'>ritiene</td></tr><tr><td>noi</td><td data='regular'>riteniamo</td></tr><tr><td>voi</td><td data='regular'>ritenete</td></tr><tr><td>loro</td><td data='irregular'>ritengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ritenevo</td></tr><tr><td>tu</td><td data='regular'>ritenevi</td></tr><tr><td>lui/lei</td><td data='regular'>riteneva</td></tr><tr><td>noi</td><td data='regular'>ritenevamo</td></tr><tr><td>voi</td><td data='regular'>ritenevate</td></tr><tr><td>loro</td><td data='regular'>ritenevano</td></tr></tbody></table></div>"
            },
            ritornare: {
                term: "ritornare",
                definition: "return",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>ritorno</td></tr><tr><td>tu</td><td data='regular'>ritorni</td></tr><tr><td>lui/lei</td><td data='regular'>ritorna</td></tr><tr><td>noi</td><td data='regular'>ritorniamo</td></tr><tr><td>voi</td><td data='regular'>ritornate</td></tr><tr><td>loro</td><td data='regular'>ritornano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>ritornavo</td></tr><tr><td>tu</td><td data='regular'>ritornavi</td></tr><tr><td>lui/lei</td><td data='regular'>ritornava</td></tr><tr><td>noi</td><td data='regular'>ritornavamo</td></tr><tr><td>voi</td><td data='regular'>ritornavate</td></tr><tr><td>loro</td><td data='regular'>ritornavano</td></tr></tbody></table></div>"
            },
            riunire: {
                term: "riunire",
                definition: "gather",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>riunisco</td></tr><tr><td>tu</td><td data='irregular'>riunisci</td></tr><tr><td>lui/lei</td><td data='irregular'>riunisce</td></tr><tr><td>noi</td><td data='regular'>riuniamo</td></tr><tr><td>voi</td><td data='regular'>riunite</td></tr><tr><td>loro</td><td data='irregular'>riuniscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riunivo</td></tr><tr><td>tu</td><td data='regular'>riunivi</td></tr><tr><td>lui/lei</td><td data='regular'>riuniva</td></tr><tr><td>noi</td><td data='regular'>riunivamo</td></tr><tr><td>voi</td><td data='regular'>riunivate</td></tr><tr><td>loro</td><td data='regular'>riunivano</td></tr></tbody></table></div>"
            },
            riuscire: {
                term: "riuscire",
                definition: "succeed",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>riesco</td></tr><tr><td>tu</td><td data='irregular'>riesci</td></tr><tr><td>lui/lei</td><td data='irregular'>riesce</td></tr><tr><td>noi</td><td data='regular'>riusciamo</td></tr><tr><td>voi</td><td data='regular'>riuscite</td></tr><tr><td>loro</td><td data='irregular'>riescono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>riuscivo</td></tr><tr><td>tu</td><td data='regular'>riuscivi</td></tr><tr><td>lui/lei</td><td data='regular'>riusciva</td></tr><tr><td>noi</td><td data='regular'>riuscivamo</td></tr><tr><td>voi</td><td data='regular'>riuscivate</td></tr><tr><td>loro</td><td data='regular'>riuscivano</td></tr></tbody></table></div>"
            },
            rivedere: {
                term: "rivedere",
                definition: "review",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rivedo</td></tr><tr><td>tu</td><td data='regular'>rivedi</td></tr><tr><td>lui/lei</td><td data='regular'>rivede</td></tr><tr><td>noi</td><td data='regular'>rivediamo</td></tr><tr><td>voi</td><td data='regular'>rivedete</td></tr><tr><td>loro</td><td data='regular'>rivedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rivedevo</td></tr><tr><td>tu</td><td data='regular'>rivedevi</td></tr><tr><td>lui/lei</td><td data='regular'>rivedeva</td></tr><tr><td>noi</td><td data='regular'>rivedevamo</td></tr><tr><td>voi</td><td data='regular'>rivedevate</td></tr><tr><td>loro</td><td data='regular'>rivedevano</td></tr></tbody></table></div>"
            },
            rivelare: {
                term: "rivelare",
                definition: "reveal",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rivelo</td></tr><tr><td>tu</td><td data='regular'>riveli</td></tr><tr><td>lui/lei</td><td data='regular'>rivela</td></tr><tr><td>noi</td><td data='regular'>riveliamo</td></tr><tr><td>voi</td><td data='regular'>rivelate</td></tr><tr><td>loro</td><td data='regular'>rivelano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rivelavo</td></tr><tr><td>tu</td><td data='regular'>rivelavi</td></tr><tr><td>lui/lei</td><td data='regular'>rivelava</td></tr><tr><td>noi</td><td data='regular'>rivelavamo</td></tr><tr><td>voi</td><td data='regular'>rivelavate</td></tr><tr><td>loro</td><td data='regular'>rivelavano</td></tr></tbody></table></div>"
            },
            rompere: {
                term: "rompere",
                definition: "break",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>rompo</td></tr><tr><td>tu</td><td data='regular'>rompi</td></tr><tr><td>lui/lei</td><td data='regular'>rompe</td></tr><tr><td>noi</td><td data='regular'>rompiamo</td></tr><tr><td>voi</td><td data='regular'>rompete</td></tr><tr><td>loro</td><td data='regular'>rompono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>rompevo</td></tr><tr><td>tu</td><td data='regular'>rompevi</td></tr><tr><td>lui/lei</td><td data='regular'>rompeva</td></tr><tr><td>noi</td><td data='regular'>rompevamo</td></tr><tr><td>voi</td><td data='regular'>rompevate</td></tr><tr><td>loro</td><td data='regular'>rompevano</td></tr></tbody></table></div>"
            },
            salire: {
                term: "salire",
                definition: "go up",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>salgo</td></tr><tr><td>tu</td><td data='regular'>sali</td></tr><tr><td>lui/lei</td><td data='regular'>sale</td></tr><tr><td>noi</td><td data='regular'>saliamo</td></tr><tr><td>voi</td><td data='regular'>salite</td></tr><tr><td>loro</td><td data='irregular'>salgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>salivo</td></tr><tr><td>tu</td><td data='regular'>salivi</td></tr><tr><td>lui/lei</td><td data='regular'>saliva</td></tr><tr><td>noi</td><td data='regular'>salivamo</td></tr><tr><td>voi</td><td data='regular'>salivate</td></tr><tr><td>loro</td><td data='regular'>salivano</td></tr></tbody></table></div>"
            },
            saltare: {
                term: "saltare",
                definition: "skip",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>salto</td></tr><tr><td>tu</td><td data='regular'>salti</td></tr><tr><td>lui/lei</td><td data='regular'>salta</td></tr><tr><td>noi</td><td data='regular'>saltiamo</td></tr><tr><td>voi</td><td data='regular'>saltate</td></tr><tr><td>loro</td><td data='regular'>saltano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>saltavo</td></tr><tr><td>tu</td><td data='regular'>saltavi</td></tr><tr><td>lui/lei</td><td data='regular'>saltava</td></tr><tr><td>noi</td><td data='regular'>saltavamo</td></tr><tr><td>voi</td><td data='regular'>saltavate</td></tr><tr><td>loro</td><td data='regular'>saltavano</td></tr></tbody></table></div>"
            },
            salutare: {
                term: "salutare",
                definition: "healthy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>saluto</td></tr><tr><td>tu</td><td data='regular'>saluti</td></tr><tr><td>lui/lei</td><td data='regular'>saluta</td></tr><tr><td>noi</td><td data='regular'>salutiamo</td></tr><tr><td>voi</td><td data='regular'>salutate</td></tr><tr><td>loro</td><td data='regular'>salutano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>salutavo</td></tr><tr><td>tu</td><td data='regular'>salutavi</td></tr><tr><td>lui/lei</td><td data='regular'>salutava</td></tr><tr><td>noi</td><td data='regular'>salutavamo</td></tr><tr><td>voi</td><td data='regular'>salutavate</td></tr><tr><td>loro</td><td data='regular'>salutavano</td></tr></tbody></table></div>"
            },
            salvare: {
                term: "salvare",
                definition: "save",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>salvo</td></tr><tr><td>tu</td><td data='regular'>salvi</td></tr><tr><td>lui/lei</td><td data='regular'>salva</td></tr><tr><td>noi</td><td data='regular'>salviamo</td></tr><tr><td>voi</td><td data='regular'>salvate</td></tr><tr><td>loro</td><td data='regular'>salvano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>salvavo</td></tr><tr><td>tu</td><td data='regular'>salvavi</td></tr><tr><td>lui/lei</td><td data='regular'>salvava</td></tr><tr><td>noi</td><td data='regular'>salvavamo</td></tr><tr><td>voi</td><td data='regular'>salvavate</td></tr><tr><td>loro</td><td data='regular'>salvavano</td></tr></tbody></table></div>"
            },
            sapere: {
                term: "sapere",
                definition: "know",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>so</td></tr><tr><td>tu</td><td data='irregular'>sai</td></tr><tr><td>lui/lei</td><td data='irregular'>sa</td></tr><tr><td>noi</td><td data='irregular'>sappiamo</td></tr><tr><td>voi</td><td data='regular'>sapete</td></tr><tr><td>loro</td><td data='irregular'>sanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sapevo</td></tr><tr><td>tu</td><td data='regular'>sapevi</td></tr><tr><td>lui/lei</td><td data='regular'>sapeva</td></tr><tr><td>noi</td><td data='regular'>sapevamo</td></tr><tr><td>voi</td><td data='regular'>sapevate</td></tr><tr><td>loro</td><td data='regular'>sapevano</td></tr></tbody></table></div>"
            },
            sbagliare: {
                term: "sbagliare",
                definition: "make a mistake",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sbaglio</td></tr><tr><td>tu</td><td data='regular'>sbagli</td></tr><tr><td>lui/lei</td><td data='regular'>sbaglia</td></tr><tr><td>noi</td><td data='regular'>sbagliamo</td></tr><tr><td>voi</td><td data='regular'>sbagliate</td></tr><tr><td>loro</td><td data='regular'>sbagliano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sbagliavo</td></tr><tr><td>tu</td><td data='regular'>sbagliavi</td></tr><tr><td>lui/lei</td><td data='regular'>sbagliava</td></tr><tr><td>noi</td><td data='regular'>sbagliavamo</td></tr><tr><td>voi</td><td data='regular'>sbagliavate</td></tr><tr><td>loro</td><td data='regular'>sbagliavano</td></tr></tbody></table></div>"
            },
            scappare: {
                term: "scappare",
                definition: "escape",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>scappo</td></tr><tr><td>tu</td><td data='regular'>scappi</td></tr><tr><td>lui/lei</td><td data='regular'>scappa</td></tr><tr><td>noi</td><td data='regular'>scappiamo</td></tr><tr><td>voi</td><td data='regular'>scappate</td></tr><tr><td>loro</td><td data='regular'>scappano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>scappavo</td></tr><tr><td>tu</td><td data='regular'>scappavi</td></tr><tr><td>lui/lei</td><td data='regular'>scappava</td></tr><tr><td>noi</td><td data='regular'>scappavamo</td></tr><tr><td>voi</td><td data='regular'>scappavate</td></tr><tr><td>loro</td><td data='regular'>scappavano</td></tr></tbody></table></div>"
            },
            scegliere: {
                term: "scegliere",
                definition: "choose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>scelgo</td></tr><tr><td>tu</td><td data='irregular'>scegli</td></tr><tr><td>lui/lei</td><td data='regular'>sceglie</td></tr><tr><td>noi</td><td data='irregular'>scegliamo</td></tr><tr><td>voi</td><td data='regular'>scegliete</td></tr><tr><td>loro</td><td data='irregular'>scelgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sceglievo</td></tr><tr><td>tu</td><td data='regular'>sceglievi</td></tr><tr><td>lui/lei</td><td data='regular'>sceglieva</td></tr><tr><td>noi</td><td data='regular'>sceglievamo</td></tr><tr><td>voi</td><td data='regular'>sceglievate</td></tr><tr><td>loro</td><td data='regular'>sceglievano</td></tr></tbody></table></div>"
            },
            scendere: {
                term: "scendere",
                definition: "get off",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>scendo</td></tr><tr><td>tu</td><td data='regular'>scendi</td></tr><tr><td>lui/lei</td><td data='regular'>scende</td></tr><tr><td>noi</td><td data='regular'>scendiamo</td></tr><tr><td>voi</td><td data='regular'>scendete</td></tr><tr><td>loro</td><td data='regular'>scendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>scendevo</td></tr><tr><td>tu</td><td data='regular'>scendevi</td></tr><tr><td>lui/lei</td><td data='regular'>scendeva</td></tr><tr><td>noi</td><td data='regular'>scendevamo</td></tr><tr><td>voi</td><td data='regular'>scendevate</td></tr><tr><td>loro</td><td data='regular'>scendevano</td></tr></tbody></table></div>"
            },
            scherzare: {
                term: "scherzare",
                definition: "joke",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>scherzo</td></tr><tr><td>tu</td><td data='regular'>scherzi</td></tr><tr><td>lui/lei</td><td data='regular'>scherza</td></tr><tr><td>noi</td><td data='regular'>scherziamo</td></tr><tr><td>voi</td><td data='regular'>scherzate</td></tr><tr><td>loro</td><td data='regular'>scherzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>scherzavo</td></tr><tr><td>tu</td><td data='regular'>scherzavi</td></tr><tr><td>lui/lei</td><td data='regular'>scherzava</td></tr><tr><td>noi</td><td data='regular'>scherzavamo</td></tr><tr><td>voi</td><td data='regular'>scherzavate</td></tr><tr><td>loro</td><td data='regular'>scherzavano</td></tr></tbody></table></div>"
            },
            scoprire: {
                term: "scoprire",
                definition: "discover",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>scopro</td></tr><tr><td>tu</td><td data='regular'>scopri</td></tr><tr><td>lui/lei</td><td data='regular'>scopre</td></tr><tr><td>noi</td><td data='regular'>scopriamo</td></tr><tr><td>voi</td><td data='regular'>scoprite</td></tr><tr><td>loro</td><td data='regular'>scoprono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>scoprivo</td></tr><tr><td>tu</td><td data='regular'>scoprivi</td></tr><tr><td>lui/lei</td><td data='regular'>scopriva</td></tr><tr><td>noi</td><td data='regular'>scoprivamo</td></tr><tr><td>voi</td><td data='regular'>scoprivate</td></tr><tr><td>loro</td><td data='regular'>scoprivano</td></tr></tbody></table></div>"
            },
            scrivere: {
                term: "scrivere",
                definition: "write",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>scrivo</td></tr><tr><td>tu</td><td data='regular'>scrivi</td></tr><tr><td>lui/lei</td><td data='regular'>scrive</td></tr><tr><td>noi</td><td data='regular'>scriviamo</td></tr><tr><td>voi</td><td data='regular'>scrivete</td></tr><tr><td>loro</td><td data='regular'>scrivono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>scrivevo</td></tr><tr><td>tu</td><td data='regular'>scrivevi</td></tr><tr><td>lui/lei</td><td data='regular'>scriveva</td></tr><tr><td>noi</td><td data='regular'>scrivevamo</td></tr><tr><td>voi</td><td data='regular'>scrivevate</td></tr><tr><td>loro</td><td data='regular'>scrivevano</td></tr></tbody></table></div>"
            },
            scusare: {
                term: "scusare",
                definition: "excuse",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>scuso</td></tr><tr><td>tu</td><td data='regular'>scusi</td></tr><tr><td>lui/lei</td><td data='regular'>scusa</td></tr><tr><td>noi</td><td data='regular'>scusiamo</td></tr><tr><td>voi</td><td data='regular'>scusate</td></tr><tr><td>loro</td><td data='regular'>scusano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>scusavo</td></tr><tr><td>tu</td><td data='regular'>scusavi</td></tr><tr><td>lui/lei</td><td data='regular'>scusava</td></tr><tr><td>noi</td><td data='regular'>scusavamo</td></tr><tr><td>voi</td><td data='regular'>scusavate</td></tr><tr><td>loro</td><td data='regular'>scusavano</td></tr></tbody></table></div>"
            },
            sedere: {
                term: "sedere",
                definition: "sit down",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>siedo</td></tr><tr><td>tu</td><td data='irregular'>siedi</td></tr><tr><td>lui/lei</td><td data='irregular'>siede</td></tr><tr><td>noi</td><td data='regular'>sediamo</td></tr><tr><td>voi</td><td data='regular'>sedete</td></tr><tr><td>loro</td><td data='irregular'>siedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sedevo</td></tr><tr><td>tu</td><td data='regular'>sedevi</td></tr><tr><td>lui/lei</td><td data='regular'>sedeva</td></tr><tr><td>noi</td><td data='regular'>sedevamo</td></tr><tr><td>voi</td><td data='regular'>sedevate</td></tr><tr><td>loro</td><td data='regular'>sedevano</td></tr></tbody></table></div>"
            },
            segnare: {
                term: "segnare",
                definition: "score",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>segno</td></tr><tr><td>tu</td><td data='regular'>segni</td></tr><tr><td>lui/lei</td><td data='regular'>segna</td></tr><tr><td>noi</td><td data='regular'>segniamo</td></tr><tr><td>voi</td><td data='regular'>segnate</td></tr><tr><td>loro</td><td data='regular'>segnano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>segnavo</td></tr><tr><td>tu</td><td data='regular'>segnavi</td></tr><tr><td>lui/lei</td><td data='regular'>segnava</td></tr><tr><td>noi</td><td data='regular'>segnavamo</td></tr><tr><td>voi</td><td data='regular'>segnavate</td></tr><tr><td>loro</td><td data='regular'>segnavano</td></tr></tbody></table></div>"
            },
            seguire: {
                term: "seguire",
                definition: "follow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>seguo</td></tr><tr><td>tu</td><td data='regular'>segui</td></tr><tr><td>lui/lei</td><td data='regular'>segue</td></tr><tr><td>noi</td><td data='regular'>seguiamo</td></tr><tr><td>voi</td><td data='regular'>seguite</td></tr><tr><td>loro</td><td data='regular'>seguono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>seguivo</td></tr><tr><td>tu</td><td data='regular'>seguivi</td></tr><tr><td>lui/lei</td><td data='regular'>seguiva</td></tr><tr><td>noi</td><td data='regular'>seguivamo</td></tr><tr><td>voi</td><td data='regular'>seguivate</td></tr><tr><td>loro</td><td data='regular'>seguivano</td></tr></tbody></table></div>"
            },
            sembrare: {
                term: "sembrare",
                definition: "look",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sembro</td></tr><tr><td>tu</td><td data='regular'>sembri</td></tr><tr><td>lui/lei</td><td data='regular'>sembra</td></tr><tr><td>noi</td><td data='regular'>sembriamo</td></tr><tr><td>voi</td><td data='regular'>sembrate</td></tr><tr><td>loro</td><td data='regular'>sembrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sembravo</td></tr><tr><td>tu</td><td data='regular'>sembravi</td></tr><tr><td>lui/lei</td><td data='regular'>sembrava</td></tr><tr><td>noi</td><td data='regular'>sembravamo</td></tr><tr><td>voi</td><td data='regular'>sembravate</td></tr><tr><td>loro</td><td data='regular'>sembravano</td></tr></tbody></table></div>"
            },
            sentire: {
                term: "sentire",
                definition: "feel",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sento</td></tr><tr><td>tu</td><td data='regular'>senti</td></tr><tr><td>lui/lei</td><td data='regular'>sente</td></tr><tr><td>noi</td><td data='regular'>sentiamo</td></tr><tr><td>voi</td><td data='regular'>sentite</td></tr><tr><td>loro</td><td data='regular'>sentono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sentivo</td></tr><tr><td>tu</td><td data='regular'>sentivi</td></tr><tr><td>lui/lei</td><td data='regular'>sentiva</td></tr><tr><td>noi</td><td data='regular'>sentivamo</td></tr><tr><td>voi</td><td data='regular'>sentivate</td></tr><tr><td>loro</td><td data='regular'>sentivano</td></tr></tbody></table></div>"
            },
            servire: {
                term: "servire",
                definition: "serve",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>servo</td></tr><tr><td>tu</td><td data='regular'>servi</td></tr><tr><td>lui/lei</td><td data='regular'>serve</td></tr><tr><td>noi</td><td data='regular'>serviamo</td></tr><tr><td>voi</td><td data='regular'>servite</td></tr><tr><td>loro</td><td data='regular'>servono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>servivo</td></tr><tr><td>tu</td><td data='regular'>servivi</td></tr><tr><td>lui/lei</td><td data='regular'>serviva</td></tr><tr><td>noi</td><td data='regular'>servivamo</td></tr><tr><td>voi</td><td data='regular'>servivate</td></tr><tr><td>loro</td><td data='regular'>servivano</td></tr></tbody></table></div>"
            },
            significare: {
                term: "significare",
                definition: "mean",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>significo</td></tr><tr><td>tu</td><td data='regular'>significhi</td></tr><tr><td>lui/lei</td><td data='regular'>significa</td></tr><tr><td>noi</td><td data='regular'>significhiamo</td></tr><tr><td>voi</td><td data='regular'>significate</td></tr><tr><td>loro</td><td data='regular'>significano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>significavo</td></tr><tr><td>tu</td><td data='regular'>significavi</td></tr><tr><td>lui/lei</td><td data='regular'>significava</td></tr><tr><td>noi</td><td data='regular'>significavamo</td></tr><tr><td>voi</td><td data='regular'>significavate</td></tr><tr><td>loro</td><td data='regular'>significavano</td></tr></tbody></table></div>"
            },
            smettere: {
                term: "smettere",
                definition: "stop",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>smetto</td></tr><tr><td>tu</td><td data='regular'>smetti</td></tr><tr><td>lui/lei</td><td data='regular'>smette</td></tr><tr><td>noi</td><td data='regular'>smettiamo</td></tr><tr><td>voi</td><td data='regular'>smettete</td></tr><tr><td>loro</td><td data='regular'>smettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>smettevo</td></tr><tr><td>tu</td><td data='regular'>smettevi</td></tr><tr><td>lui/lei</td><td data='regular'>smetteva</td></tr><tr><td>noi</td><td data='regular'>smettevamo</td></tr><tr><td>voi</td><td data='regular'>smettevate</td></tr><tr><td>loro</td><td data='regular'>smettevano</td></tr></tbody></table></div>"
            },
            soffrire: {
                term: "soffrire",
                definition: "suffer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>soffro</td></tr><tr><td>tu</td><td data='regular'>soffri</td></tr><tr><td>lui/lei</td><td data='regular'>soffre</td></tr><tr><td>noi</td><td data='regular'>soffriamo</td></tr><tr><td>voi</td><td data='regular'>soffrite</td></tr><tr><td>loro</td><td data='regular'>soffrono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>soffrivo</td></tr><tr><td>tu</td><td data='regular'>soffrivi</td></tr><tr><td>lui/lei</td><td data='regular'>soffriva</td></tr><tr><td>noi</td><td data='regular'>soffrivamo</td></tr><tr><td>voi</td><td data='regular'>soffrivate</td></tr><tr><td>loro</td><td data='regular'>soffrivano</td></tr></tbody></table></div>"
            },
            sognare: {
                term: "sognare",
                definition: "dream",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sogno</td></tr><tr><td>tu</td><td data='regular'>sogni</td></tr><tr><td>lui/lei</td><td data='regular'>sogna</td></tr><tr><td>noi</td><td data='regular'>sogniamo</td></tr><tr><td>voi</td><td data='regular'>sognate</td></tr><tr><td>loro</td><td data='regular'>sognano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sognavo</td></tr><tr><td>tu</td><td data='regular'>sognavi</td></tr><tr><td>lui/lei</td><td data='regular'>sognava</td></tr><tr><td>noi</td><td data='regular'>sognavamo</td></tr><tr><td>voi</td><td data='regular'>sognavate</td></tr><tr><td>loro</td><td data='regular'>sognavano</td></tr></tbody></table></div>"
            },
            sorgere: {
                term: "sorgere",
                definition: "rise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sorgo</td></tr><tr><td>tu</td><td data='regular'>sorgi</td></tr><tr><td>lui/lei</td><td data='regular'>sorge</td></tr><tr><td>noi</td><td data='regular'>sorgiamo</td></tr><tr><td>voi</td><td data='regular'>sorgete</td></tr><tr><td>loro</td><td data='regular'>sorgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sorgevo</td></tr><tr><td>tu</td><td data='regular'>sorgevi</td></tr><tr><td>lui/lei</td><td data='regular'>sorgeva</td></tr><tr><td>noi</td><td data='regular'>sorgevamo</td></tr><tr><td>voi</td><td data='regular'>sorgevate</td></tr><tr><td>loro</td><td data='regular'>sorgevano</td></tr></tbody></table></div>"
            },
            sorprendere: {
                term: "sorprendere",
                definition: "surprise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sorprendo</td></tr><tr><td>tu</td><td data='regular'>sorprendi</td></tr><tr><td>lui/lei</td><td data='regular'>sorprende</td></tr><tr><td>noi</td><td data='regular'>sorprendiamo</td></tr><tr><td>voi</td><td data='regular'>sorprendete</td></tr><tr><td>loro</td><td data='regular'>sorprendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sorprendevo</td></tr><tr><td>tu</td><td data='regular'>sorprendevi</td></tr><tr><td>lui/lei</td><td data='regular'>sorprendeva</td></tr><tr><td>noi</td><td data='regular'>sorprendevamo</td></tr><tr><td>voi</td><td data='regular'>sorprendevate</td></tr><tr><td>loro</td><td data='regular'>sorprendevano</td></tr></tbody></table></div>"
            },
            sorridere: {
                term: "sorridere",
                definition: "smile",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sorrido</td></tr><tr><td>tu</td><td data='regular'>sorridi</td></tr><tr><td>lui/lei</td><td data='regular'>sorride</td></tr><tr><td>noi</td><td data='regular'>sorridiamo</td></tr><tr><td>voi</td><td data='regular'>sorridete</td></tr><tr><td>loro</td><td data='regular'>sorridono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sorridevo</td></tr><tr><td>tu</td><td data='regular'>sorridevi</td></tr><tr><td>lui/lei</td><td data='regular'>sorrideva</td></tr><tr><td>noi</td><td data='regular'>sorridevamo</td></tr><tr><td>voi</td><td data='regular'>sorridevate</td></tr><tr><td>loro</td><td data='regular'>sorridevano</td></tr></tbody></table></div>"
            },
            sostenere: {
                term: "sostenere",
                definition: "support",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>sostengo</td></tr><tr><td>tu</td><td data='irregular'>sostieni</td></tr><tr><td>lui/lei</td><td data='irregular'>sostiene</td></tr><tr><td>noi</td><td data='regular'>sosteniamo</td></tr><tr><td>voi</td><td data='regular'>sostenete</td></tr><tr><td>loro</td><td data='irregular'>sostengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sostenevo</td></tr><tr><td>tu</td><td data='regular'>sostenevi</td></tr><tr><td>lui/lei</td><td data='regular'>sosteneva</td></tr><tr><td>noi</td><td data='regular'>sostenevamo</td></tr><tr><td>voi</td><td data='regular'>sostenevate</td></tr><tr><td>loro</td><td data='regular'>sostenevano</td></tr></tbody></table></div>"
            },
            spegnere: {
                term: "spegnere",
                definition: "switch off",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>spengo</td></tr><tr><td>tu</td><td data='regular'>spegni</td></tr><tr><td>lui/lei</td><td data='regular'>spegne</td></tr><tr><td>noi</td><td data='regular'>spegniamo</td></tr><tr><td>voi</td><td data='regular'>spegnete</td></tr><tr><td>loro</td><td data='irregular'>spengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>spegnevo</td></tr><tr><td>tu</td><td data='regular'>spegnevi</td></tr><tr><td>lui/lei</td><td data='regular'>spegneva</td></tr><tr><td>noi</td><td data='regular'>spegnevamo</td></tr><tr><td>voi</td><td data='regular'>spegnevate</td></tr><tr><td>loro</td><td data='regular'>spegnevano</td></tr></tbody></table></div>"
            },
            sperare: {
                term: "sperare",
                definition: "hope",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>spero</td></tr><tr><td>tu</td><td data='regular'>speri</td></tr><tr><td>lui/lei</td><td data='regular'>spera</td></tr><tr><td>noi</td><td data='regular'>speriamo</td></tr><tr><td>voi</td><td data='regular'>sperate</td></tr><tr><td>loro</td><td data='regular'>sperano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>speravo</td></tr><tr><td>tu</td><td data='regular'>speravi</td></tr><tr><td>lui/lei</td><td data='regular'>sperava</td></tr><tr><td>noi</td><td data='regular'>speravamo</td></tr><tr><td>voi</td><td data='regular'>speravate</td></tr><tr><td>loro</td><td data='regular'>speravano</td></tr></tbody></table></div>"
            },
            spiegare: {
                term: "spiegare",
                definition: "explain",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>spiego</td></tr><tr><td>tu</td><td data='regular'>spieghi</td></tr><tr><td>lui/lei</td><td data='regular'>spiega</td></tr><tr><td>noi</td><td data='regular'>spieghiamo</td></tr><tr><td>voi</td><td data='regular'>spiegate</td></tr><tr><td>loro</td><td data='regular'>spiegano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>spiegavo</td></tr><tr><td>tu</td><td data='regular'>spiegavi</td></tr><tr><td>lui/lei</td><td data='regular'>spiegava</td></tr><tr><td>noi</td><td data='regular'>spiegavamo</td></tr><tr><td>voi</td><td data='regular'>spiegavate</td></tr><tr><td>loro</td><td data='regular'>spiegavano</td></tr></tbody></table></div>"
            },
            sposare: {
                term: "sposare",
                definition: "marry",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sposo</td></tr><tr><td>tu</td><td data='regular'>sposi</td></tr><tr><td>lui/lei</td><td data='regular'>sposa</td></tr><tr><td>noi</td><td data='regular'>sposiamo</td></tr><tr><td>voi</td><td data='regular'>sposate</td></tr><tr><td>loro</td><td data='regular'>sposano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>sposavo</td></tr><tr><td>tu</td><td data='regular'>sposavi</td></tr><tr><td>lui/lei</td><td data='regular'>sposava</td></tr><tr><td>noi</td><td data='regular'>sposavamo</td></tr><tr><td>voi</td><td data='regular'>sposavate</td></tr><tr><td>loro</td><td data='regular'>sposavano</td></tr></tbody></table></div>"
            },
            stare: {
                term: "stare",
                definition: "stay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sto</td></tr><tr><td>tu</td><td data='irregular'>stai</td></tr><tr><td>lui/lei</td><td data='regular'>sta</td></tr><tr><td>noi</td><td data='regular'>stiamo</td></tr><tr><td>voi</td><td data='regular'>state</td></tr><tr><td>loro</td><td data='irregular'>stanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>stavo</td></tr><tr><td>tu</td><td data='regular'>stavi</td></tr><tr><td>lui/lei</td><td data='regular'>stava</td></tr><tr><td>noi</td><td data='regular'>stavamo</td></tr><tr><td>voi</td><td data='regular'>stavate</td></tr><tr><td>loro</td><td data='regular'>stavano</td></tr></tbody></table></div>"
            },
            studiare: {
                term: "studiare",
                definition: "study",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>studio</td></tr><tr><td>tu</td><td data='regular'>studi</td></tr><tr><td>lui/lei</td><td data='regular'>studia</td></tr><tr><td>noi</td><td data='regular'>studiamo</td></tr><tr><td>voi</td><td data='regular'>studiate</td></tr><tr><td>loro</td><td data='regular'>studiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>studiavo</td></tr><tr><td>tu</td><td data='regular'>studiavi</td></tr><tr><td>lui/lei</td><td data='regular'>studiava</td></tr><tr><td>noi</td><td data='regular'>studiavamo</td></tr><tr><td>voi</td><td data='regular'>studiavate</td></tr><tr><td>loro</td><td data='regular'>studiavano</td></tr></tbody></table></div>"
            },
            succedere: {
                term: "succedere",
                definition: "happen",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>succedo</td></tr><tr><td>tu</td><td data='regular'>succedi</td></tr><tr><td>lui/lei</td><td data='regular'>succede</td></tr><tr><td>noi</td><td data='regular'>succediamo</td></tr><tr><td>voi</td><td data='regular'>succedete</td></tr><tr><td>loro</td><td data='regular'>succedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>succedevo</td></tr><tr><td>tu</td><td data='regular'>succedevi</td></tr><tr><td>lui/lei</td><td data='regular'>succedeva</td></tr><tr><td>noi</td><td data='regular'>succedevamo</td></tr><tr><td>voi</td><td data='regular'>succedevate</td></tr><tr><td>loro</td><td data='regular'>succedevano</td></tr></tbody></table></div>"
            },
            suonare: {
                term: "suonare",
                definition: "play",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>suono</td></tr><tr><td>tu</td><td data='regular'>suoni</td></tr><tr><td>lui/lei</td><td data='regular'>suona</td></tr><tr><td>noi</td><td data='regular'>suoniamo</td></tr><tr><td>voi</td><td data='regular'>suonate</td></tr><tr><td>loro</td><td data='regular'>suonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>suonavo</td></tr><tr><td>tu</td><td data='regular'>suonavi</td></tr><tr><td>lui/lei</td><td data='regular'>suonava</td></tr><tr><td>noi</td><td data='regular'>suonavamo</td></tr><tr><td>voi</td><td data='regular'>suonavate</td></tr><tr><td>loro</td><td data='regular'>suonavano</td></tr></tbody></table></div>"
            },
            superare: {
                term: "superare",
                definition: "exceed",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>supero</td></tr><tr><td>tu</td><td data='regular'>superi</td></tr><tr><td>lui/lei</td><td data='regular'>supera</td></tr><tr><td>noi</td><td data='regular'>superiamo</td></tr><tr><td>voi</td><td data='regular'>superate</td></tr><tr><td>loro</td><td data='regular'>superano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>superavo</td></tr><tr><td>tu</td><td data='regular'>superavi</td></tr><tr><td>lui/lei</td><td data='regular'>superava</td></tr><tr><td>noi</td><td data='regular'>superavamo</td></tr><tr><td>voi</td><td data='regular'>superavate</td></tr><tr><td>loro</td><td data='regular'>superavano</td></tr></tbody></table></div>"
            },
            svegliare: {
                term: "svegliare",
                definition: "wake",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>sveglio</td></tr><tr><td>tu</td><td data='regular'>svegli</td></tr><tr><td>lui/lei</td><td data='regular'>sveglia</td></tr><tr><td>noi</td><td data='regular'>svegliamo</td></tr><tr><td>voi</td><td data='regular'>svegliate</td></tr><tr><td>loro</td><td data='regular'>svegliano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>svegliavo</td></tr><tr><td>tu</td><td data='regular'>svegliavi</td></tr><tr><td>lui/lei</td><td data='regular'>svegliava</td></tr><tr><td>noi</td><td data='regular'>svegliavamo</td></tr><tr><td>voi</td><td data='regular'>svegliavate</td></tr><tr><td>loro</td><td data='regular'>svegliavano</td></tr></tbody></table></div>"
            },
            svolgere: {
                term: "svolgere",
                definition: "perform",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>svolgo</td></tr><tr><td>tu</td><td data='regular'>svolgi</td></tr><tr><td>lui/lei</td><td data='regular'>svolge</td></tr><tr><td>noi</td><td data='regular'>svolgiamo</td></tr><tr><td>voi</td><td data='regular'>svolgete</td></tr><tr><td>loro</td><td data='regular'>svolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>svolgevo</td></tr><tr><td>tu</td><td data='regular'>svolgevi</td></tr><tr><td>lui/lei</td><td data='regular'>svolgeva</td></tr><tr><td>noi</td><td data='regular'>svolgevamo</td></tr><tr><td>voi</td><td data='regular'>svolgevate</td></tr><tr><td>loro</td><td data='regular'>svolgevano</td></tr></tbody></table></div>"
            },
            tacere: {
                term: "tacere",
                definition: "be silent",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>taccio</td></tr><tr><td>tu</td><td data='regular'>taci</td></tr><tr><td>lui/lei</td><td data='regular'>tace</td></tr><tr><td>noi</td><td data='regular'>taciamo</td></tr><tr><td>voi</td><td data='regular'>tacete</td></tr><tr><td>loro</td><td data='irregular'>tacciono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>tacevo</td></tr><tr><td>tu</td><td data='regular'>tacevi</td></tr><tr><td>lui/lei</td><td data='regular'>taceva</td></tr><tr><td>noi</td><td data='regular'>tacevamo</td></tr><tr><td>voi</td><td data='regular'>tacevate</td></tr><tr><td>loro</td><td data='regular'>tacevano</td></tr></tbody></table></div>"
            },
            tagliare: {
                term: "tagliare",
                definition: "cut",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>taglio</td></tr><tr><td>tu</td><td data='regular'>tagli</td></tr><tr><td>lui/lei</td><td data='regular'>taglia</td></tr><tr><td>noi</td><td data='regular'>tagliamo</td></tr><tr><td>voi</td><td data='regular'>tagliate</td></tr><tr><td>loro</td><td data='regular'>tagliano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>tagliavo</td></tr><tr><td>tu</td><td data='regular'>tagliavi</td></tr><tr><td>lui/lei</td><td data='regular'>tagliava</td></tr><tr><td>noi</td><td data='regular'>tagliavamo</td></tr><tr><td>voi</td><td data='regular'>tagliavate</td></tr><tr><td>loro</td><td data='regular'>tagliavano</td></tr></tbody></table></div>"
            },
            temere: {
                term: "temere",
                definition: "fear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>temo</td></tr><tr><td>tu</td><td data='regular'>temi</td></tr><tr><td>lui/lei</td><td data='regular'>teme</td></tr><tr><td>noi</td><td data='regular'>temiamo</td></tr><tr><td>voi</td><td data='regular'>temete</td></tr><tr><td>loro</td><td data='regular'>temono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>temevo</td></tr><tr><td>tu</td><td data='regular'>temevi</td></tr><tr><td>lui/lei</td><td data='regular'>temeva</td></tr><tr><td>noi</td><td data='regular'>temevamo</td></tr><tr><td>voi</td><td data='regular'>temevate</td></tr><tr><td>loro</td><td data='regular'>temevano</td></tr></tbody></table></div>"
            },
            tenere: {
                term: "tenere",
                definition: "hold",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>tengo</td></tr><tr><td>tu</td><td data='irregular'>tieni</td></tr><tr><td>lui/lei</td><td data='irregular'>tiene</td></tr><tr><td>noi</td><td data='regular'>teniamo</td></tr><tr><td>voi</td><td data='regular'>tenete</td></tr><tr><td>loro</td><td data='irregular'>tengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>tenevo</td></tr><tr><td>tu</td><td data='regular'>tenevi</td></tr><tr><td>lui/lei</td><td data='regular'>teneva</td></tr><tr><td>noi</td><td data='regular'>tenevamo</td></tr><tr><td>voi</td><td data='regular'>tenevate</td></tr><tr><td>loro</td><td data='regular'>tenevano</td></tr></tbody></table></div>"
            },
            tentare: {
                term: "tentare",
                definition: "groped",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>tento</td></tr><tr><td>tu</td><td data='regular'>tenti</td></tr><tr><td>lui/lei</td><td data='regular'>tenta</td></tr><tr><td>noi</td><td data='regular'>tentiamo</td></tr><tr><td>voi</td><td data='regular'>tentate</td></tr><tr><td>loro</td><td data='regular'>tentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>tentavo</td></tr><tr><td>tu</td><td data='regular'>tentavi</td></tr><tr><td>lui/lei</td><td data='regular'>tentava</td></tr><tr><td>noi</td><td data='regular'>tentavamo</td></tr><tr><td>voi</td><td data='regular'>tentavate</td></tr><tr><td>loro</td><td data='regular'>tentavano</td></tr></tbody></table></div>"
            },
            tirare: {
                term: "tirare",
                definition: "pull",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>tiro</td></tr><tr><td>tu</td><td data='regular'>tiri</td></tr><tr><td>lui/lei</td><td data='regular'>tira</td></tr><tr><td>noi</td><td data='regular'>tiriamo</td></tr><tr><td>voi</td><td data='regular'>tirate</td></tr><tr><td>loro</td><td data='regular'>tirano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>tiravo</td></tr><tr><td>tu</td><td data='regular'>tiravi</td></tr><tr><td>lui/lei</td><td data='regular'>tirava</td></tr><tr><td>noi</td><td data='regular'>tiravamo</td></tr><tr><td>voi</td><td data='regular'>tiravate</td></tr><tr><td>loro</td><td data='regular'>tiravano</td></tr></tbody></table></div>"
            },
            toccare: {
                term: "toccare",
                definition: "touch",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>tocco</td></tr><tr><td>tu</td><td data='regular'>tocchi</td></tr><tr><td>lui/lei</td><td data='regular'>tocca</td></tr><tr><td>noi</td><td data='regular'>tocchiamo</td></tr><tr><td>voi</td><td data='regular'>toccate</td></tr><tr><td>loro</td><td data='regular'>toccano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>toccavo</td></tr><tr><td>tu</td><td data='regular'>toccavi</td></tr><tr><td>lui/lei</td><td data='regular'>toccava</td></tr><tr><td>noi</td><td data='regular'>toccavamo</td></tr><tr><td>voi</td><td data='regular'>toccavate</td></tr><tr><td>loro</td><td data='regular'>toccavano</td></tr></tbody></table></div>"
            },
            togliere: {
                term: "togliere",
                definition: "remove",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>tolgo</td></tr><tr><td>tu</td><td data='irregular'>togli</td></tr><tr><td>lui/lei</td><td data='regular'>toglie</td></tr><tr><td>noi</td><td data='irregular'>togliamo</td></tr><tr><td>voi</td><td data='regular'>togliete</td></tr><tr><td>loro</td><td data='irregular'>tolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>toglievo</td></tr><tr><td>tu</td><td data='regular'>toglievi</td></tr><tr><td>lui/lei</td><td data='regular'>toglieva</td></tr><tr><td>noi</td><td data='regular'>toglievamo</td></tr><tr><td>voi</td><td data='regular'>toglievate</td></tr><tr><td>loro</td><td data='regular'>toglievano</td></tr></tbody></table></div>"
            },
            tornare: {
                term: "tornare",
                definition: "return",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>torno</td></tr><tr><td>tu</td><td data='regular'>torni</td></tr><tr><td>lui/lei</td><td data='regular'>torna</td></tr><tr><td>noi</td><td data='regular'>torniamo</td></tr><tr><td>voi</td><td data='regular'>tornate</td></tr><tr><td>loro</td><td data='regular'>tornano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>tornavo</td></tr><tr><td>tu</td><td data='regular'>tornavi</td></tr><tr><td>lui/lei</td><td data='regular'>tornava</td></tr><tr><td>noi</td><td data='regular'>tornavamo</td></tr><tr><td>voi</td><td data='regular'>tornavate</td></tr><tr><td>loro</td><td data='regular'>tornavano</td></tr></tbody></table></div>"
            },
            trarre: {
                term: "trarre",
                definition: "draw",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>traggo</td></tr><tr><td>tu</td><td data='regular'>trai</td></tr><tr><td>lui/lei</td><td data='regular'>trae</td></tr><tr><td>noi</td><td data='regular'>traiamo</td></tr><tr><td>voi</td><td data='regular'>traete</td></tr><tr><td>loro</td><td data='irregular'>traggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>traevo</td></tr><tr><td>tu</td><td data='regular'>traevi</td></tr><tr><td>lui/lei</td><td data='regular'>traeva</td></tr><tr><td>noi</td><td data='regular'>traevamo</td></tr><tr><td>voi</td><td data='regular'>traevate</td></tr><tr><td>loro</td><td data='regular'>traevano</td></tr></tbody></table></div>"
            },
            trascinare: {
                term: "trascinare",
                definition: "drag",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>trascino</td></tr><tr><td>tu</td><td data='regular'>trascini</td></tr><tr><td>lui/lei</td><td data='regular'>trascina</td></tr><tr><td>noi</td><td data='regular'>trasciniamo</td></tr><tr><td>voi</td><td data='regular'>trascinate</td></tr><tr><td>loro</td><td data='regular'>trascinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>trascinavo</td></tr><tr><td>tu</td><td data='regular'>trascinavi</td></tr><tr><td>lui/lei</td><td data='regular'>trascinava</td></tr><tr><td>noi</td><td data='regular'>trascinavamo</td></tr><tr><td>voi</td><td data='regular'>trascinavate</td></tr><tr><td>loro</td><td data='regular'>trascinavano</td></tr></tbody></table></div>"
            },
            trasformare: {
                term: "trasformare",
                definition: "transform",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>trasformo</td></tr><tr><td>tu</td><td data='regular'>trasformi</td></tr><tr><td>lui/lei</td><td data='regular'>trasforma</td></tr><tr><td>noi</td><td data='regular'>trasformiamo</td></tr><tr><td>voi</td><td data='regular'>trasformate</td></tr><tr><td>loro</td><td data='regular'>trasformano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>trasformavo</td></tr><tr><td>tu</td><td data='regular'>trasformavi</td></tr><tr><td>lui/lei</td><td data='regular'>trasformava</td></tr><tr><td>noi</td><td data='regular'>trasformavamo</td></tr><tr><td>voi</td><td data='regular'>trasformavate</td></tr><tr><td>loro</td><td data='regular'>trasformavano</td></tr></tbody></table></div>"
            },
            trattare: {
                term: "trattare",
                definition: "treat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>tratto</td></tr><tr><td>tu</td><td data='regular'>tratti</td></tr><tr><td>lui/lei</td><td data='regular'>tratta</td></tr><tr><td>noi</td><td data='regular'>trattiamo</td></tr><tr><td>voi</td><td data='regular'>trattate</td></tr><tr><td>loro</td><td data='regular'>trattano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>trattavo</td></tr><tr><td>tu</td><td data='regular'>trattavi</td></tr><tr><td>lui/lei</td><td data='regular'>trattava</td></tr><tr><td>noi</td><td data='regular'>trattavamo</td></tr><tr><td>voi</td><td data='regular'>trattavate</td></tr><tr><td>loro</td><td data='regular'>trattavano</td></tr></tbody></table></div>"
            },
            trovare: {
                term: "trovare",
                definition: "find",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>trovo</td></tr><tr><td>tu</td><td data='regular'>trovi</td></tr><tr><td>lui/lei</td><td data='regular'>trova</td></tr><tr><td>noi</td><td data='regular'>troviamo</td></tr><tr><td>voi</td><td data='regular'>trovate</td></tr><tr><td>loro</td><td data='regular'>trovano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>trovavo</td></tr><tr><td>tu</td><td data='regular'>trovavi</td></tr><tr><td>lui/lei</td><td data='regular'>trovava</td></tr><tr><td>noi</td><td data='regular'>trovavamo</td></tr><tr><td>voi</td><td data='regular'>trovavate</td></tr><tr><td>loro</td><td data='regular'>trovavano</td></tr></tbody></table></div>"
            },
            uccidere: {
                term: "uccidere",
                definition: "kill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>uccido</td></tr><tr><td>tu</td><td data='regular'>uccidi</td></tr><tr><td>lui/lei</td><td data='regular'>uccide</td></tr><tr><td>noi</td><td data='regular'>uccidiamo</td></tr><tr><td>voi</td><td data='regular'>uccidete</td></tr><tr><td>loro</td><td data='regular'>uccidono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>uccidevo</td></tr><tr><td>tu</td><td data='regular'>uccidevi</td></tr><tr><td>lui/lei</td><td data='regular'>uccideva</td></tr><tr><td>noi</td><td data='regular'>uccidevamo</td></tr><tr><td>voi</td><td data='regular'>uccidevate</td></tr><tr><td>loro</td><td data='regular'>uccidevano</td></tr></tbody></table></div>"
            },
            udire: {
                term: "udire",
                definition: "hear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>odo</td></tr><tr><td>tu</td><td data='irregular'>odi</td></tr><tr><td>lui/lei</td><td data='irregular'>ode</td></tr><tr><td>noi</td><td data='regular'>udiamo</td></tr><tr><td>voi</td><td data='regular'>udite</td></tr><tr><td>loro</td><td data='irregular'>odono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>udivo</td></tr><tr><td>tu</td><td data='regular'>udivi</td></tr><tr><td>lui/lei</td><td data='regular'>udiva</td></tr><tr><td>noi</td><td data='regular'>udivamo</td></tr><tr><td>voi</td><td data='regular'>udivate</td></tr><tr><td>loro</td><td data='regular'>udivano</td></tr></tbody></table></div>"
            },
            unire: {
                term: "unire",
                definition: "unite",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>unisco</td></tr><tr><td>tu</td><td data='irregular'>unisci</td></tr><tr><td>lui/lei</td><td data='irregular'>unisce</td></tr><tr><td>noi</td><td data='regular'>uniamo</td></tr><tr><td>voi</td><td data='regular'>unite</td></tr><tr><td>loro</td><td data='irregular'>uniscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>univo</td></tr><tr><td>tu</td><td data='regular'>univi</td></tr><tr><td>lui/lei</td><td data='regular'>univa</td></tr><tr><td>noi</td><td data='regular'>univamo</td></tr><tr><td>voi</td><td data='regular'>univate</td></tr><tr><td>loro</td><td data='regular'>univano</td></tr></tbody></table></div>"
            },
            usare: {
                term: "usare",
                definition: "use",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>uso</td></tr><tr><td>tu</td><td data='regular'>usi</td></tr><tr><td>lui/lei</td><td data='regular'>usa</td></tr><tr><td>noi</td><td data='regular'>usiamo</td></tr><tr><td>voi</td><td data='regular'>usate</td></tr><tr><td>loro</td><td data='regular'>usano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>usavo</td></tr><tr><td>tu</td><td data='regular'>usavi</td></tr><tr><td>lui/lei</td><td data='regular'>usava</td></tr><tr><td>noi</td><td data='regular'>usavamo</td></tr><tr><td>voi</td><td data='regular'>usavate</td></tr><tr><td>loro</td><td data='regular'>usavano</td></tr></tbody></table></div>"
            },
            uscire: {
                term: "uscire",
                definition: "go out",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>esco</td></tr><tr><td>tu</td><td data='irregular'>esci</td></tr><tr><td>lui/lei</td><td data='irregular'>esce</td></tr><tr><td>noi</td><td data='regular'>usciamo</td></tr><tr><td>voi</td><td data='regular'>uscite</td></tr><tr><td>loro</td><td data='irregular'>escono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>uscivo</td></tr><tr><td>tu</td><td data='regular'>uscivi</td></tr><tr><td>lui/lei</td><td data='regular'>usciva</td></tr><tr><td>noi</td><td data='regular'>uscivamo</td></tr><tr><td>voi</td><td data='regular'>uscivate</td></tr><tr><td>loro</td><td data='regular'>uscivano</td></tr></tbody></table></div>"
            },
            valere: {
                term: "valere",
                definition: "be worth",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>valgo</td></tr><tr><td>tu</td><td data='regular'>vali</td></tr><tr><td>lui/lei</td><td data='regular'>vale</td></tr><tr><td>noi</td><td data='regular'>valiamo</td></tr><tr><td>voi</td><td data='regular'>valete</td></tr><tr><td>loro</td><td data='irregular'>valgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>valevo</td></tr><tr><td>tu</td><td data='regular'>valevi</td></tr><tr><td>lui/lei</td><td data='regular'>valeva</td></tr><tr><td>noi</td><td data='regular'>valevamo</td></tr><tr><td>voi</td><td data='regular'>valevate</td></tr><tr><td>loro</td><td data='regular'>valevano</td></tr></tbody></table></div>"
            },
            vedere: {
                term: "vedere",
                definition: "see",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>vedo</td></tr><tr><td>tu</td><td data='regular'>vedi</td></tr><tr><td>lui/lei</td><td data='regular'>vede</td></tr><tr><td>noi</td><td data='regular'>vediamo</td></tr><tr><td>voi</td><td data='regular'>vedete</td></tr><tr><td>loro</td><td data='regular'>vedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>vedevo</td></tr><tr><td>tu</td><td data='regular'>vedevi</td></tr><tr><td>lui/lei</td><td data='regular'>vedeva</td></tr><tr><td>noi</td><td data='regular'>vedevamo</td></tr><tr><td>voi</td><td data='regular'>vedevate</td></tr><tr><td>loro</td><td data='regular'>vedevano</td></tr></tbody></table></div>"
            },
            vendere: {
                term: "vendere",
                definition: "sell",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>vendo</td></tr><tr><td>tu</td><td data='regular'>vendi</td></tr><tr><td>lui/lei</td><td data='regular'>vende</td></tr><tr><td>noi</td><td data='regular'>vendiamo</td></tr><tr><td>voi</td><td data='regular'>vendete</td></tr><tr><td>loro</td><td data='regular'>vendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>vendevo</td></tr><tr><td>tu</td><td data='regular'>vendevi</td></tr><tr><td>lui/lei</td><td data='regular'>vendeva</td></tr><tr><td>noi</td><td data='regular'>vendevamo</td></tr><tr><td>voi</td><td data='regular'>vendevate</td></tr><tr><td>loro</td><td data='regular'>vendevano</td></tr></tbody></table></div>"
            },
            venire: {
                term: "venire",
                definition: "come",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>vengo</td></tr><tr><td>tu</td><td data='irregular'>vieni</td></tr><tr><td>lui/lei</td><td data='irregular'>viene</td></tr><tr><td>noi</td><td data='regular'>veniamo</td></tr><tr><td>voi</td><td data='regular'>venite</td></tr><tr><td>loro</td><td data='irregular'>vengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>venivo</td></tr><tr><td>tu</td><td data='regular'>venivi</td></tr><tr><td>lui/lei</td><td data='regular'>veniva</td></tr><tr><td>noi</td><td data='regular'>venivamo</td></tr><tr><td>voi</td><td data='regular'>venivate</td></tr><tr><td>loro</td><td data='regular'>venivano</td></tr></tbody></table></div>"
            },
            vestire: {
                term: "vestire",
                definition: "dress",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>vesto</td></tr><tr><td>tu</td><td data='regular'>vesti</td></tr><tr><td>lui/lei</td><td data='regular'>veste</td></tr><tr><td>noi</td><td data='regular'>vestiamo</td></tr><tr><td>voi</td><td data='regular'>vestite</td></tr><tr><td>loro</td><td data='regular'>vestono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>vestivo</td></tr><tr><td>tu</td><td data='regular'>vestivi</td></tr><tr><td>lui/lei</td><td data='regular'>vestiva</td></tr><tr><td>noi</td><td data='regular'>vestivamo</td></tr><tr><td>voi</td><td data='regular'>vestivate</td></tr><tr><td>loro</td><td data='regular'>vestivano</td></tr></tbody></table></div>"
            },
            vincere: {
                term: "vincere",
                definition: "win",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>vinco</td></tr><tr><td>tu</td><td data='regular'>vinci</td></tr><tr><td>lui/lei</td><td data='regular'>vince</td></tr><tr><td>noi</td><td data='regular'>vinciamo</td></tr><tr><td>voi</td><td data='regular'>vincete</td></tr><tr><td>loro</td><td data='regular'>vincono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>vincevo</td></tr><tr><td>tu</td><td data='regular'>vincevi</td></tr><tr><td>lui/lei</td><td data='regular'>vinceva</td></tr><tr><td>noi</td><td data='regular'>vincevamo</td></tr><tr><td>voi</td><td data='regular'>vincevate</td></tr><tr><td>loro</td><td data='regular'>vincevano</td></tr></tbody></table></div>"
            },
            vivere: {
                term: "vivere",
                definition: "live",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>vivo</td></tr><tr><td>tu</td><td data='regular'>vivi</td></tr><tr><td>lui/lei</td><td data='regular'>vive</td></tr><tr><td>noi</td><td data='regular'>viviamo</td></tr><tr><td>voi</td><td data='regular'>vivete</td></tr><tr><td>loro</td><td data='regular'>vivono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>vivevo</td></tr><tr><td>tu</td><td data='regular'>vivevi</td></tr><tr><td>lui/lei</td><td data='regular'>viveva</td></tr><tr><td>noi</td><td data='regular'>vivevamo</td></tr><tr><td>voi</td><td data='regular'>vivevate</td></tr><tr><td>loro</td><td data='regular'>vivevano</td></tr></tbody></table></div>"
            },
            volare: {
                term: "volare",
                definition: "fly",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>volo</td></tr><tr><td>tu</td><td data='regular'>voli</td></tr><tr><td>lui/lei</td><td data='regular'>vola</td></tr><tr><td>noi</td><td data='regular'>voliamo</td></tr><tr><td>voi</td><td data='regular'>volate</td></tr><tr><td>loro</td><td data='regular'>volano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>volavo</td></tr><tr><td>tu</td><td data='regular'>volavi</td></tr><tr><td>lui/lei</td><td data='regular'>volava</td></tr><tr><td>noi</td><td data='regular'>volavamo</td></tr><tr><td>voi</td><td data='regular'>volavate</td></tr><tr><td>loro</td><td data='regular'>volavano</td></tr></tbody></table></div>"
            },
            volere: {
                term: "volere",
                definition: "want",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='irregular'>voglio</td></tr><tr><td>tu</td><td data='irregular'>vuoi</td></tr><tr><td>lui/lei</td><td data='irregular'>vuole</td></tr><tr><td>noi</td><td data='irregular'>vogliamo</td></tr><tr><td>voi</td><td data='regular'>volete</td></tr><tr><td>loro</td><td data='irregular'>vogliono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>volevo</td></tr><tr><td>tu</td><td data='regular'>volevi</td></tr><tr><td>lui/lei</td><td data='regular'>voleva</td></tr><tr><td>noi</td><td data='regular'>volevamo</td></tr><tr><td>voi</td><td data='regular'>volevate</td></tr><tr><td>loro</td><td data='regular'>volevano</td></tr></tbody></table></div>"
            },
            voltare: {
                term: "voltare",
                definition: "turn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td data='regular'>volto</td></tr><tr><td>tu</td><td data='regular'>volti</td></tr><tr><td>lui/lei</td><td data='regular'>volta</td></tr><tr><td>noi</td><td data='regular'>voltiamo</td></tr><tr><td>voi</td><td data='regular'>voltate</td></tr><tr><td>loro</td><td data='regular'>voltano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td data='regular'>voltavo</td></tr><tr><td>tu</td><td data='regular'>voltavi</td></tr><tr><td>lui/lei</td><td data='regular'>voltava</td></tr><tr><td>noi</td><td data='regular'>voltavamo</td></tr><tr><td>voi</td><td data='regular'>voltavate</td></tr><tr><td>loro</td><td data='regular'>voltavano</td></tr></tbody></table></div>"
            }
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

                // Add reminder for previous incorrect term
                if (Object.keys(ops$1.storedData.incorrectTerms).length > 0) {

                    var reminderTerm = void 0;

                    // Add reminded terms list
                    ops$1.storedData.remindedTerms = ops$1.storedData.remindedTerms || {};

                    // Keep reminded term the same
                    if (ops$1.storedData.dailyReminder === undefined) {
                        ops$1.storedData.dailyReminder = {};
                        reminderTerm = pickRandom(ops$1.storedData.incorrectTerms);
                        ops$1.storedData.dailyReminder[reminderTerm] = appData.terms[reminderTerm].definition;
                    } else {
                        reminderTerm = ops$1.storedData.dailyReminder;
                        reminderTerm = Object.getOwnPropertyNames(reminderTerm);
                    }
                    // Add to terms
                    listOfTerms.push(reminderTerm);
                    // Remove from incorrect terms
                    delete ops$1.storedData.incorrectTerms[reminderTerm];
                    // Add to list of reminded terms
                    ops$1.storedData.remindedTerms[reminderTerm] = appData.terms[reminderTerm].definition;
                    i++;
                }
                // Choose terms to  display
                while (i < ops$1.displayedTerms) {
                    var viewedLength = Object.keys(ops$1.storedData.viewedTerms).length;

                    // If all terms viewed
                    if (viewedLength === dataLength) {

                        var viewedSorted = [];

                        // Convert viewed terms to array
                        for (var term in ops$1.storedData.viewedTerms) {
                            viewedSorted.push([term, ops$1.storedData.viewedTerms[term]]);
                        }
                        // If reminder term picked remove from selection
                        if (ops$1.storedData.dailyReminder !== undefined) {
                            for (var m = viewedSorted.length - 1; m >= 0; m--) {
                                if (ops$1.storedData.dailyReminder.hasOwnProperty(viewedSorted[m][0])) {
                                    viewedSorted.splice(m, 1);
                                }
                            }
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
                var newHolder = '<div class="m-term-wrapper">\n                <p class="term-holder">' + termValue + '</p>\n                <div class="right">\n                    <p class="term-views"><span>Goal :</span> <span class="count">' + viewsCount + '</span> / ' + ops$1.revealDailyBonusTarget + '</p>\n                    <button class="reveal">Reveal</button>\n                </div>\n                <div class="definition-wrapper hidden">\n                    <p class="definition-holder">' + definitionValue + '</p>\n                    <div class="support-wrapper">' + supportValue + '</div>\n                </div>\n            </div>';

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
                            var revealTerm = revealBtn[i].parentNode.parentNode.querySelector('.term-holder').innerHTML;

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
        var heartHolder = document.querySelector('.hearts');
        var heartsHTML = "";

        // If no hearts data exists
        if (ops$1.storedData.hearts === undefined) {
            ops$1.storedData.hearts = ops$1.points.hearts;
        }
        for (var i = 0; i < ops$1.storedData.hearts; i++) {
            heartsHTML += '<p></p>';
        }
        // Add to view
        heartHolder.innerHTML = heartsHTML;

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);
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

            if (ops$1.storedData.dailyQuery === undefined) {
                // Pick a random term
                randomTerm = pickRandom(ops$1.storedData.revealedTermCount);
                ops$1.storedData.dailyQuery = randomTerm;
            } else {
                randomTerm = ops$1.storedData.dailyQuery;
            }
            // If query not from correct terms
            if (!ops$1.storedData.correctTerms.hasOwnProperty(randomTerm)) {

                // If query not from daily reminder term
                if (ops$1.storedData.dailyReminder !== undefined) {
                    if (!ops$1.storedData.dailyReminder.hasOwnProperty(randomTerm)) {
                        queryHandler();
                        break;
                    }
                }
                // If query not from daily terms
                else if (!ops$1.storedData.dailyTerms.hasOwnProperty(randomTerm)) {
                        queryHandler();
                        break;
                    }
            }
            // Else look for another
            i++;
            if (i === Object.keys(ops$1.storedData.revealedTermCount).length) {
                document.querySelector('.result-holder').innerHTML = "Reveal more terms to get a query";
                document.querySelector('.result-holder').classList.remove('hidden');
            }
        }

        // Build the query
        function queryHandler() {
            var queryWrapper = document.querySelector('.m-query-wrapper');
            var queryHolder = document.querySelector('.query-holder');
            var querySubmit = document.querySelector('.query-submit');
            var resultHolder = document.querySelector('.result-holder');
            var scoreHolder = document.querySelector('.score-holder');
            var heartHolder = document.querySelector('.hearts');
            var score = parseInt(scoreHolder.innerHTML);
            var definition = appData.terms[randomTerm].definition;
            var count = 0;

            // Add hearts
            delete ops$1.storedData.hearts;
            addHearts();

            // Show the query wrapper
            queryWrapper.classList.remove('hidden');

            // Set value of query
            queryHolder.innerHTML = randomTerm;

            // Query outcomes
            querySubmit.addEventListener("click", function () {
                var queryInput = document.querySelector('.query-input').value;

                if (checkQuery(queryInput, definition) === true) {
                    winCase();
                } else if (checkQuery(queryInput, definition) === "mispelled") {
                    winCase("mispelled");
                } else if (queryInput === "") {
                    resultHolder.innerHTML = "Enter a definition.";
                    resultHolder.classList.remove('hidden');
                } else {
                    loseCase();
                }
            });

            // If definition is right
            function winCase(spelling) {
                // Hide the query input
                queryWrapper.classList.add('hidden');
                heartHolder.classList.add('hidden');
                // If mispelled
                if (spelling === "mispelled") {
                    // Display win message
                    resultHolder.innerHTML = "Well done but check your spelling, the definition for <strong>\"" + randomTerm + "\"</strong> is <strong>\"" + definition + "\"</strong>";
                    resultHolder.classList.remove('hidden');
                } else {
                    // Display win message
                    resultHolder.innerHTML = "Well done, the definition for <strong>\"" + randomTerm + "\"</strong> is <strong>\"" + definition + "\"</strong>";
                    resultHolder.classList.remove('hidden');
                }
                // Add to score
                score += ops$1.points.correct;
                // Update view
                scoreHolder.innerHTML = score;
                // Add to stored data
                ops$1.storedData.score = score;
                ops$1.storedData.correctTerms[randomTerm] = definition;
                ops$1.storedData.queryComplete = true;
                delete ops$1.storedData.dailyQuery;
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
                resultHolder.classList.remove('hidden');
                // Add placeholder
                queryInput.placeholder = queryInput.value;
                // Remove guess
                queryInput.value = "";
                // Lose a heart
                heartHolder.removeChild(heartHolder.getElementsByTagName('p')[0]);
                ops$1.storedData.hearts -= 1;
                // If all hearts lost
                if (ops$1.storedData.hearts === 0) {
                    // Hide query 
                    queryWrapper.classList.add('hidden');
                    heartHolder.classList.add('hidden');
                    // Update DOM
                    queryInput.value = "";
                    queryInput.placeholder = "Enter the definition";
                    // Update view
                    resultHolder.innerHTML = "Sorry you lose.";
                    resultHolder.classList.remove('hidden');
                    // Add to storedDatta 
                    ops$1.storedData.incorrectTerms[randomTerm] = definition;
                    cl(ops$1.storedData.incorrectTerms);
                    ops$1.storedData.queryComplete = true;
                    delete ops$1.storedData.hearts;
                }
                // Save to storage
                localforage.setItem('ops.storedData', ops$1.storedData);
            }
            // If game won
            function gameWon() {
                cl('game won');
            }
        }
    };

    // Imports
    // Handles functions when reveal button clicked
    var revealedBtnHandler = function revealedBtnHandler() {

        var revealBtn = document.querySelectorAll('.reveal');

        clickListener(revealBtn, function (i) {

            // Disabled button prevention
            if (revealBtn[i].classList.contains('disabled')) {
                return false;
            }

            var term = [revealBtn[i].parentNode.parentNode.querySelector('.term-holder').innerHTML];

            // Updates the revealed view counter
            var countHolder = revealBtn[i].parentNode.querySelector('.count');
            var definitionWrapper = revealBtn[i].parentNode.parentNode.querySelector('.definition-wrapper');
            var definitionHolder = revealBtn[i].parentNode.parentNode.querySelector('.definition-holder');
            var count = parseInt(countHolder.innerHTML);

            // Show definition
            definitionWrapper.classList.remove('hidden');

            // Increase count by one
            countHolder.innerHTML = count + 1;

            // Pass to updateDataCount function
            var dataCount = updateDataCount('revealedTermCount', term, 1);

            // Set storedData
            ops$1.storedData.revealedTermCount = dataCount;

            // Daily reveal bonus
            var revealBonusCount = void 0;

            // If no daily bonus data
            if (ops$1.storedData.revealDailyBonus === undefined) {
                ops$1.storedData.revealDailyBonus = {};
            }
            // If no existing term bonus
            if (ops$1.storedData.revealDailyBonus[term] === undefined) {
                revealBonusCount = 1;
            }
            // Add one to daily bonus
            else {
                    revealBonusCount = ops$1.storedData.revealDailyBonus[term];
                    revealBonusCount += 1;
                }
            // If bonus is met
            if (revealBonusCount === ops$1.revealDailyBonusTarget) {
                // If daily bonus not already triggered
                if (ops$1.storedData.revealDailyBonus.complete === false) {
                    // Keep query active 
                    ops$1.storedData.queryComplete = false;
                    // Create a new query
                    createNewQuery();
                }
                // Set only once a day
                ops$1.storedData.revealDailyBonus.complete = true;
                ops$1.storedData.score += ops$1.points.dailyBonus;
                setScore();
            }
            ops$1.storedData.revealDailyBonus[term] = revealBonusCount;

            // Save to storage
            localforage.setItem('ops.storedData', ops$1.storedData);

            // Starts a timer 
            createRevealTimer(revealBtn[i]);
        });
    };

    // Adds a timer to the reveal button
    var createRevealTimer = function createRevealTimer(revealBtn) {

        // If no stored data for reveal countdowns
        if (ops$1.storedData.revealCountdowns === undefined) {
            ops$1.storedData.revealCountdowns = {};
        }

        var term = [revealBtn.parentNode.parentNode.querySelector('.term-holder').innerHTML];

        var minutes = ops$1.counterMins;
        var seconds = ops$1.counterSecs;
        var remainingMinutes = void 0;
        var remainingSeconds = void 0;
        var startTime = void 0;
        var timerEnded = void 0;

        // New timer
        if (ops$1.storedData.revealCountdowns[term] === undefined) {

            // Get a new time
            startTime = new Date().getTime();

            // Set storedData
            ops$1.storedData.revealCountdowns[term] = {
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
            var nowTime = new Date().getTime();

            // Disable button
            revealBtn.classList.add('disabled');
            revealBtn.setAttribute("disabled", true);

            // Get terms start time for countdown
            startTime = ops$1.storedData.revealCountdowns[term].startTime;
            timerEnded = ops$1.storedData.revealCountdowns[term].timerEnded;

            // Get difference in seconds
            var diffSecs = Math.floor((nowTime - startTime) / 1000);
            // Get total in seconds
            var totalSecs = ops$1.counterMins * 60 + seconds;

            // NowTime overtaken startTime
            if (diffSecs >= totalSecs) {
                timerEnded = true;
                // Stop interval
                clearInterval(ops$1.storedData.revealCountdowns[term].timerUpdate);
                // Clear storage for term timer
                delete ops$1.storedData.revealCountdowns[term];
            }
            // Timer stopped, return to normal
            if (timerEnded === true) {
                localforage.setItem('ops.storedData', ops$1.storedData);
                return false;
            }
            // Set remaining time 
            remainingSeconds = totalSecs - diffSecs;
        }

        // Set start time to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        var timeout = void 0;
        var checkCount = 0;

        // If timer is active   
        if (timerEnded === false) {

            // Start timer interval
            ops$1.storedData.revealCountdowns[term].timerUpdate = setInterval(function () {
                // Resync timer in some devices when off screen
                checkCount += 1;
                if (checkCount % 5 === 0) {
                    startTimer();
                }
                // Call UI timer build
                buttonTimer();
            }, 1000);
        }

        // Builds the timer
        function buttonTimer() {
            var displayedMinutes = Math.floor(remainingSeconds / 60);
            var displayedSeconds = remainingSeconds % 60;
            var hiddenZero = '';

            // Timer end
            if (remainingSeconds === 0) {
                revealBtn.innerHTML = "Reveal";
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
            revealBtn.innerHTML = displayedMinutes + ':' + hiddenZero + displayedSeconds;

            // Decrease timer
            remainingSeconds -= 1;
        }
    };

    // Imports
    // Global options
    var ops$1 = {
        displayedTerms: 3,
        counterMins: 60,
        counterSecs: 0,
        revealDailyBonusTarget: 3,
        wordAccuracy: 0.5,
        container: document.querySelector(".terms-wrapper"),
        addDay: true,
        debug: true,
        points: {
            correct: 50,
            dailyBonus: 10,
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

                // Set daily limit
                ops$1.storedData.revealDailyBonus = ops$1.storedData.revealDailyBonus || {};
                // Reset daily reveal bonus
                ops$1.storedData.revealDailyBonus.complete = false;
            }

        // Create initial view
        viewCreate(pickedTerms);
        setScore();

        // Create opened date, daily terms, viewed terms
        ops$1.storedData.dateOpened = getTodaysDate();
        ops$1.storedData.dailyTerms = pickedTerms;
        ops$1.storedData.viewedTerms = updateDataCount('viewedTerms', pickedTerms, 0);

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        // Handles events for revealed terms
        revealedBtnHandler();

        // Keep query active each day
        ops$1.storedData.queryComplete = ops$1.storedData.queryComplete || {};

        if (ops$1.storedData.newDay === true) {
            delete ops$1.storedData.dailyQuery;
            ops$1.storedData.queryComplete = false;
            ops$1.storedData.remindedTerms = ops$1.storedData.remindedTerms || {};

            // Delete daily reminder
            if (ops$1.storedData.remindedTerms.dailyReminder !== undefined) {
                delete ops$1.storedData.remindedTerms.dailyReminder;
            }
        }
        // Create query if revealed terms
        if (ops$1.storedData.revealedTermCount !== undefined && ops$1.storedData.queryComplete === false) {
            createNewQuery();
        }

        // Refresh window on blur
        appBlur();

        // Debug code
        if (ops$1.debug === true) {
            cl(ops$1.storedData);
            //cl('Revealed terms count:');
            //cl(ops.storedData.revealedTermCount);
            //cl('Viewed terms count:');
            //cl(ops.storedData.viewedTerms);
            //cl('Revealed terms timer:');
            //cl(ops.storedData.revealCountdowns);
        }
    };

    return ops$1;
}();
//# sourceMappingURL=app.js.map
