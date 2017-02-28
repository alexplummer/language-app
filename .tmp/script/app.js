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
            elements[i].addEventListener("click", function (e) {
                e.preventDefault();clickFunction(i);
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

    // Creates JSONP requests
    var jsonp = function jsonp(uri) {
        return new Promise(function (resolve, reject) {
            var id = '_' + Math.round(10000 * Math.random());
            var callbackName = 'jsonp_callback_' + id;
            window[callbackName] = function (data) {
                delete window[callbackName];
                var ele = document.getElementById(id);
                ele.parentNode.removeChild(ele);
                resolve(data);
            };

            var src = uri + '&callback=' + callbackName;
            var script = document.createElement('script');
            script.src = src;
            script.id = id;
            script.addEventListener('error', reject);
            (document.getElementsByTagName('head')[0] || document.body || document.documentElement).appendChild(script);
        });
    };

    // App data

    var appData = {

        terms: {
            accogliere: {
                term: "accogliere",
                definition: "receive",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>accolgo</td></tr><tr><td>tu</td><td class='irregular'>accogli</td></tr><tr><td>lui/lei</td><td class='regular'>accoglie</td></tr><tr><td>noi</td><td class='irregular'>accogliamo</td></tr><tr><td>voi</td><td class='regular'>accogliete</td></tr><tr><td>loro</td><td class='irregular'>accolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>accoglievo</td></tr><tr><td>tu</td><td class='regular'>accoglievi</td></tr><tr><td>lui/lei</td><td class='regular'>accoglieva</td></tr><tr><td>noi</td><td class='regular'>accoglievamo</td></tr><tr><td>voi</td><td class='regular'>accoglievate</td></tr><tr><td>loro</td><td class='regular'>accoglievano</td></tr></tbody></table></div>"
            },
            accompagnare: {
                term: "accompagnare",
                definition: "accompany",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>accompagno</td></tr><tr><td>tu</td><td class='regular'>accompagni</td></tr><tr><td>lui/lei</td><td class='regular'>accompagna</td></tr><tr><td>noi</td><td class='regular'>accompagniamo</td></tr><tr><td>voi</td><td class='regular'>accompagnate</td></tr><tr><td>loro</td><td class='regular'>accompagnano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>accompagnavo</td></tr><tr><td>tu</td><td class='regular'>accompagnavi</td></tr><tr><td>lui/lei</td><td class='regular'>accompagnava</td></tr><tr><td>noi</td><td class='regular'>accompagnavamo</td></tr><tr><td>voi</td><td class='regular'>accompagnavate</td></tr><tr><td>loro</td><td class='regular'>accompagnavano</td></tr></tbody></table></div>"
            },
            affermare: {
                term: "affermare",
                definition: "affirm",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>affermo</td></tr><tr><td>tu</td><td class='regular'>affermi</td></tr><tr><td>lui/lei</td><td class='regular'>afferma</td></tr><tr><td>noi</td><td class='regular'>affermiamo</td></tr><tr><td>voi</td><td class='regular'>affermate</td></tr><tr><td>loro</td><td class='regular'>affermano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>affermavo</td></tr><tr><td>tu</td><td class='regular'>affermavi</td></tr><tr><td>lui/lei</td><td class='regular'>affermava</td></tr><tr><td>noi</td><td class='regular'>affermavamo</td></tr><tr><td>voi</td><td class='regular'>affermavate</td></tr><tr><td>loro</td><td class='regular'>affermavano</td></tr></tbody></table></div>"
            },
            affrontare: {
                term: "affrontare",
                definition: "face",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>affronto</td></tr><tr><td>tu</td><td class='regular'>affronti</td></tr><tr><td>lui/lei</td><td class='regular'>affronta</td></tr><tr><td>noi</td><td class='regular'>affrontiamo</td></tr><tr><td>voi</td><td class='regular'>affrontate</td></tr><tr><td>loro</td><td class='regular'>affrontano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>affrontavo</td></tr><tr><td>tu</td><td class='regular'>affrontavi</td></tr><tr><td>lui/lei</td><td class='regular'>affrontava</td></tr><tr><td>noi</td><td class='regular'>affrontavamo</td></tr><tr><td>voi</td><td class='regular'>affrontavate</td></tr><tr><td>loro</td><td class='regular'>affrontavano</td></tr></tbody></table></div>"
            },
            aggiungere: {
                term: "aggiungere",
                definition: "add",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>aggiungo</td></tr><tr><td>tu</td><td class='regular'>aggiungi</td></tr><tr><td>lui/lei</td><td class='regular'>aggiunge</td></tr><tr><td>noi</td><td class='regular'>aggiungiamo</td></tr><tr><td>voi</td><td class='regular'>aggiungete</td></tr><tr><td>loro</td><td class='regular'>aggiungono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>aggiungevo</td></tr><tr><td>tu</td><td class='regular'>aggiungevi</td></tr><tr><td>lui/lei</td><td class='regular'>aggiungeva</td></tr><tr><td>noi</td><td class='regular'>aggiungevamo</td></tr><tr><td>voi</td><td class='regular'>aggiungevate</td></tr><tr><td>loro</td><td class='regular'>aggiungevano</td></tr></tbody></table></div>"
            },
            aiutare: {
                term: "aiutare",
                definition: "help",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>aiuto</td></tr><tr><td>tu</td><td class='regular'>aiuti</td></tr><tr><td>lui/lei</td><td class='regular'>aiuta</td></tr><tr><td>noi</td><td class='regular'>aiutiamo</td></tr><tr><td>voi</td><td class='regular'>aiutate</td></tr><tr><td>loro</td><td class='regular'>aiutano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>aiutavo</td></tr><tr><td>tu</td><td class='regular'>aiutavi</td></tr><tr><td>lui/lei</td><td class='regular'>aiutava</td></tr><tr><td>noi</td><td class='regular'>aiutavamo</td></tr><tr><td>voi</td><td class='regular'>aiutavate</td></tr><tr><td>loro</td><td class='regular'>aiutavano</td></tr></tbody></table></div>"
            },
            allontanare: {
                term: "allontanare",
                definition: "remove",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>allontano</td></tr><tr><td>tu</td><td class='regular'>allontani</td></tr><tr><td>lui/lei</td><td class='regular'>allontana</td></tr><tr><td>noi</td><td class='regular'>allontaniamo</td></tr><tr><td>voi</td><td class='regular'>allontanate</td></tr><tr><td>loro</td><td class='regular'>allontanano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>allontanavo</td></tr><tr><td>tu</td><td class='regular'>allontanavi</td></tr><tr><td>lui/lei</td><td class='regular'>allontanava</td></tr><tr><td>noi</td><td class='regular'>allontanavamo</td></tr><tr><td>voi</td><td class='regular'>allontanavate</td></tr><tr><td>loro</td><td class='regular'>allontanavano</td></tr></tbody></table></div>"
            },
            alzare: {
                term: "alzare",
                definition: "raise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>alzo</td></tr><tr><td>tu</td><td class='regular'>alzi</td></tr><tr><td>lui/lei</td><td class='regular'>alza</td></tr><tr><td>noi</td><td class='regular'>alziamo</td></tr><tr><td>voi</td><td class='regular'>alzate</td></tr><tr><td>loro</td><td class='regular'>alzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>alzavo</td></tr><tr><td>tu</td><td class='regular'>alzavi</td></tr><tr><td>lui/lei</td><td class='regular'>alzava</td></tr><tr><td>noi</td><td class='regular'>alzavamo</td></tr><tr><td>voi</td><td class='regular'>alzavate</td></tr><tr><td>loro</td><td class='regular'>alzavano</td></tr></tbody></table></div>"
            },
            amare: {
                term: "amare",
                definition: "love",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>amo</td></tr><tr><td>tu</td><td class='regular'>ami</td></tr><tr><td>lui/lei</td><td class='regular'>ama</td></tr><tr><td>noi</td><td class='regular'>amiamo</td></tr><tr><td>voi</td><td class='regular'>amate</td></tr><tr><td>loro</td><td class='regular'>amano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>amavo</td></tr><tr><td>tu</td><td class='regular'>amavi</td></tr><tr><td>lui/lei</td><td class='regular'>amava</td></tr><tr><td>noi</td><td class='regular'>amavamo</td></tr><tr><td>voi</td><td class='regular'>amavate</td></tr><tr><td>loro</td><td class='regular'>amavano</td></tr></tbody></table></div>"
            },
            ammazzare: {
                term: "ammazzare",
                definition: "kill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ammazzo</td></tr><tr><td>tu</td><td class='regular'>ammazzi</td></tr><tr><td>lui/lei</td><td class='regular'>ammazza</td></tr><tr><td>noi</td><td class='regular'>ammazziamo</td></tr><tr><td>voi</td><td class='regular'>ammazzate</td></tr><tr><td>loro</td><td class='regular'>ammazzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ammazzavo</td></tr><tr><td>tu</td><td class='regular'>ammazzavi</td></tr><tr><td>lui/lei</td><td class='regular'>ammazzava</td></tr><tr><td>noi</td><td class='regular'>ammazzavamo</td></tr><tr><td>voi</td><td class='regular'>ammazzavate</td></tr><tr><td>loro</td><td class='regular'>ammazzavano</td></tr></tbody></table></div>"
            },
            ammettere: {
                term: "ammettere",
                definition: "admit",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ammetto</td></tr><tr><td>tu</td><td class='regular'>ammetti</td></tr><tr><td>lui/lei</td><td class='regular'>ammette</td></tr><tr><td>noi</td><td class='regular'>ammettiamo</td></tr><tr><td>voi</td><td class='regular'>ammettete</td></tr><tr><td>loro</td><td class='regular'>ammettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ammettevo</td></tr><tr><td>tu</td><td class='regular'>ammettevi</td></tr><tr><td>lui/lei</td><td class='regular'>ammetteva</td></tr><tr><td>noi</td><td class='regular'>ammettevamo</td></tr><tr><td>voi</td><td class='regular'>ammettevate</td></tr><tr><td>loro</td><td class='regular'>ammettevano</td></tr></tbody></table></div>"
            },
            andare: {
                term: "andare",
                definition: "go",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>vado</td></tr><tr><td>tu</td><td class='irregular'>vai</td></tr><tr><td>lui/lei</td><td class='irregular'>va</td></tr><tr><td>noi</td><td class='regular'>andiamo</td></tr><tr><td>voi</td><td class='regular'>andate</td></tr><tr><td>loro</td><td class='irregular'>vanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>andavo</td></tr><tr><td>tu</td><td class='regular'>andavi</td></tr><tr><td>lui/lei</td><td class='regular'>andava</td></tr><tr><td>noi</td><td class='regular'>andavamo</td></tr><tr><td>voi</td><td class='regular'>andavate</td></tr><tr><td>loro</td><td class='regular'>andavano</td></tr></tbody></table></div>"
            },
            annunciare: {
                term: "annunciare",
                definition: "announce",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>annuncio</td></tr><tr><td>tu</td><td class='regular'>annunci</td></tr><tr><td>lui/lei</td><td class='regular'>annuncia</td></tr><tr><td>noi</td><td class='regular'>annunciamo</td></tr><tr><td>voi</td><td class='regular'>annunciate</td></tr><tr><td>loro</td><td class='regular'>annunciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>annunciavo</td></tr><tr><td>tu</td><td class='regular'>annunciavi</td></tr><tr><td>lui/lei</td><td class='regular'>annunciava</td></tr><tr><td>noi</td><td class='regular'>annunciavamo</td></tr><tr><td>voi</td><td class='regular'>annunciavate</td></tr><tr><td>loro</td><td class='regular'>annunciavano</td></tr></tbody></table></div>"
            },
            apparire: {
                term: "apparire",
                definition: "appear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>appaio</td></tr><tr><td>tu</td><td class='regular'>appari</td></tr><tr><td>lui/lei</td><td class='regular'>appare</td></tr><tr><td>noi</td><td class='regular'>appariamo</td></tr><tr><td>voi</td><td class='regular'>apparite</td></tr><tr><td>loro</td><td class='irregular'>appaiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>apparivo</td></tr><tr><td>tu</td><td class='regular'>apparivi</td></tr><tr><td>lui/lei</td><td class='regular'>appariva</td></tr><tr><td>noi</td><td class='regular'>apparivamo</td></tr><tr><td>voi</td><td class='regular'>apparivate</td></tr><tr><td>loro</td><td class='regular'>apparivano</td></tr></tbody></table></div>"
            },
            appartenere: {
                term: "appartenere",
                definition: "belong",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>appartengo</td></tr><tr><td>tu</td><td class='irregular'>appartieni</td></tr><tr><td>lui/lei</td><td class='irregular'>appartiene</td></tr><tr><td>noi</td><td class='regular'>apparteniamo</td></tr><tr><td>voi</td><td class='regular'>appartenete</td></tr><tr><td>loro</td><td class='irregular'>appartengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>appartenevo</td></tr><tr><td>tu</td><td class='regular'>appartenevi</td></tr><tr><td>lui/lei</td><td class='regular'>apparteneva</td></tr><tr><td>noi</td><td class='regular'>appartenevamo</td></tr><tr><td>voi</td><td class='regular'>appartenevate</td></tr><tr><td>loro</td><td class='regular'>appartenevano</td></tr></tbody></table></div>"
            },
            appoggiare: {
                term: "appoggiare",
                definition: "support",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>appoggio</td></tr><tr><td>tu</td><td class='regular'>appoggi</td></tr><tr><td>lui/lei</td><td class='regular'>appoggia</td></tr><tr><td>noi</td><td class='regular'>appoggiamo</td></tr><tr><td>voi</td><td class='regular'>appoggiate</td></tr><tr><td>loro</td><td class='regular'>appoggiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>appoggiavo</td></tr><tr><td>tu</td><td class='regular'>appoggiavi</td></tr><tr><td>lui/lei</td><td class='regular'>appoggiava</td></tr><tr><td>noi</td><td class='regular'>appoggiavamo</td></tr><tr><td>voi</td><td class='regular'>appoggiavate</td></tr><tr><td>loro</td><td class='regular'>appoggiavano</td></tr></tbody></table></div>"
            },
            aprire: {
                term: "aprire",
                definition: "open",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>apro</td></tr><tr><td>tu</td><td class='regular'>apri</td></tr><tr><td>lui/lei</td><td class='regular'>apre</td></tr><tr><td>noi</td><td class='regular'>apriamo</td></tr><tr><td>voi</td><td class='regular'>aprite</td></tr><tr><td>loro</td><td class='regular'>aprono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>aprivo</td></tr><tr><td>tu</td><td class='regular'>aprivi</td></tr><tr><td>lui/lei</td><td class='regular'>apriva</td></tr><tr><td>noi</td><td class='regular'>aprivamo</td></tr><tr><td>voi</td><td class='regular'>aprivate</td></tr><tr><td>loro</td><td class='regular'>aprivano</td></tr></tbody></table></div>"
            },
            armare: {
                term: "armare",
                definition: "arm",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>armo</td></tr><tr><td>tu</td><td class='regular'>armi</td></tr><tr><td>lui/lei</td><td class='regular'>arma</td></tr><tr><td>noi</td><td class='regular'>armiamo</td></tr><tr><td>voi</td><td class='regular'>armate</td></tr><tr><td>loro</td><td class='regular'>armano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>armavo</td></tr><tr><td>tu</td><td class='regular'>armavi</td></tr><tr><td>lui/lei</td><td class='regular'>armava</td></tr><tr><td>noi</td><td class='regular'>armavamo</td></tr><tr><td>voi</td><td class='regular'>armavate</td></tr><tr><td>loro</td><td class='regular'>armavano</td></tr></tbody></table></div>"
            },
            arrestare: {
                term: "arrestare",
                definition: "stop",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>arresto</td></tr><tr><td>tu</td><td class='regular'>arresti</td></tr><tr><td>lui/lei</td><td class='regular'>arresta</td></tr><tr><td>noi</td><td class='regular'>arrestiamo</td></tr><tr><td>voi</td><td class='regular'>arrestate</td></tr><tr><td>loro</td><td class='regular'>arrestano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>arrestavo</td></tr><tr><td>tu</td><td class='regular'>arrestavi</td></tr><tr><td>lui/lei</td><td class='regular'>arrestava</td></tr><tr><td>noi</td><td class='regular'>arrestavamo</td></tr><tr><td>voi</td><td class='regular'>arrestavate</td></tr><tr><td>loro</td><td class='regular'>arrestavano</td></tr></tbody></table></div>"
            },
            arrivare: {
                term: "arrivare",
                definition: "arrive",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>arrivo</td></tr><tr><td>tu</td><td class='regular'>arrivi</td></tr><tr><td>lui/lei</td><td class='regular'>arriva</td></tr><tr><td>noi</td><td class='regular'>arriviamo</td></tr><tr><td>voi</td><td class='regular'>arrivate</td></tr><tr><td>loro</td><td class='regular'>arrivano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>arrivavo</td></tr><tr><td>tu</td><td class='regular'>arrivavi</td></tr><tr><td>lui/lei</td><td class='regular'>arrivava</td></tr><tr><td>noi</td><td class='regular'>arrivavamo</td></tr><tr><td>voi</td><td class='regular'>arrivavate</td></tr><tr><td>loro</td><td class='regular'>arrivavano</td></tr></tbody></table></div>"
            },
            ascoltare: {
                term: "ascoltare",
                definition: "listen",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ascolto</td></tr><tr><td>tu</td><td class='regular'>ascolti</td></tr><tr><td>lui/lei</td><td class='regular'>ascolta</td></tr><tr><td>noi</td><td class='regular'>ascoltiamo</td></tr><tr><td>voi</td><td class='regular'>ascoltate</td></tr><tr><td>loro</td><td class='regular'>ascoltano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ascoltavo</td></tr><tr><td>tu</td><td class='regular'>ascoltavi</td></tr><tr><td>lui/lei</td><td class='regular'>ascoltava</td></tr><tr><td>noi</td><td class='regular'>ascoltavamo</td></tr><tr><td>voi</td><td class='regular'>ascoltavate</td></tr><tr><td>loro</td><td class='regular'>ascoltavano</td></tr></tbody></table></div>"
            },
            aspettare: {
                term: "aspettare",
                definition: "wait",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>aspetto</td></tr><tr><td>tu</td><td class='regular'>aspetti</td></tr><tr><td>lui/lei</td><td class='regular'>aspetta</td></tr><tr><td>noi</td><td class='regular'>aspettiamo</td></tr><tr><td>voi</td><td class='regular'>aspettate</td></tr><tr><td>loro</td><td class='regular'>aspettano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>aspettavo</td></tr><tr><td>tu</td><td class='regular'>aspettavi</td></tr><tr><td>lui/lei</td><td class='regular'>aspettava</td></tr><tr><td>noi</td><td class='regular'>aspettavamo</td></tr><tr><td>voi</td><td class='regular'>aspettavate</td></tr><tr><td>loro</td><td class='regular'>aspettavano</td></tr></tbody></table></div>"
            },
            assicurare: {
                term: "assicurare",
                definition: "ensure",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>assicuro</td></tr><tr><td>tu</td><td class='regular'>assicuri</td></tr><tr><td>lui/lei</td><td class='regular'>assicura</td></tr><tr><td>noi</td><td class='regular'>assicuriamo</td></tr><tr><td>voi</td><td class='regular'>assicurate</td></tr><tr><td>loro</td><td class='regular'>assicurano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>assicuravo</td></tr><tr><td>tu</td><td class='regular'>assicuravi</td></tr><tr><td>lui/lei</td><td class='regular'>assicurava</td></tr><tr><td>noi</td><td class='regular'>assicuravamo</td></tr><tr><td>voi</td><td class='regular'>assicuravate</td></tr><tr><td>loro</td><td class='regular'>assicuravano</td></tr></tbody></table></div>"
            },
            assistere: {
                term: "assistere",
                definition: "assist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>assisto</td></tr><tr><td>tu</td><td class='regular'>assisti</td></tr><tr><td>lui/lei</td><td class='regular'>assiste</td></tr><tr><td>noi</td><td class='regular'>assistiamo</td></tr><tr><td>voi</td><td class='regular'>assistete</td></tr><tr><td>loro</td><td class='regular'>assistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>assistevo</td></tr><tr><td>tu</td><td class='regular'>assistevi</td></tr><tr><td>lui/lei</td><td class='regular'>assisteva</td></tr><tr><td>noi</td><td class='regular'>assistevamo</td></tr><tr><td>voi</td><td class='regular'>assistevate</td></tr><tr><td>loro</td><td class='regular'>assistevano</td></tr></tbody></table></div>"
            },
            assumere: {
                term: "assumere",
                definition: "take",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>assumo</td></tr><tr><td>tu</td><td class='regular'>assumi</td></tr><tr><td>lui/lei</td><td class='regular'>assume</td></tr><tr><td>noi</td><td class='regular'>assumiamo</td></tr><tr><td>voi</td><td class='regular'>assumete</td></tr><tr><td>loro</td><td class='regular'>assumono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>assumevo</td></tr><tr><td>tu</td><td class='regular'>assumevi</td></tr><tr><td>lui/lei</td><td class='regular'>assumeva</td></tr><tr><td>noi</td><td class='regular'>assumevamo</td></tr><tr><td>voi</td><td class='regular'>assumevate</td></tr><tr><td>loro</td><td class='regular'>assumevano</td></tr></tbody></table></div>"
            },
            attaccare: {
                term: "attaccare",
                definition: "attack",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>attacco</td></tr><tr><td>tu</td><td class='regular'>attacchi</td></tr><tr><td>lui/lei</td><td class='regular'>attacca</td></tr><tr><td>noi</td><td class='regular'>attacchiamo</td></tr><tr><td>voi</td><td class='regular'>attaccate</td></tr><tr><td>loro</td><td class='regular'>attaccano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>attaccavo</td></tr><tr><td>tu</td><td class='regular'>attaccavi</td></tr><tr><td>lui/lei</td><td class='regular'>attaccava</td></tr><tr><td>noi</td><td class='regular'>attaccavamo</td></tr><tr><td>voi</td><td class='regular'>attaccavate</td></tr><tr><td>loro</td><td class='regular'>attaccavano</td></tr></tbody></table></div>"
            },
            attendere: {
                term: "attendere",
                definition: "wait for",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>attendo</td></tr><tr><td>tu</td><td class='regular'>attendi</td></tr><tr><td>lui/lei</td><td class='regular'>attende</td></tr><tr><td>noi</td><td class='regular'>attendiamo</td></tr><tr><td>voi</td><td class='regular'>attendete</td></tr><tr><td>loro</td><td class='regular'>attendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>attendevo</td></tr><tr><td>tu</td><td class='regular'>attendevi</td></tr><tr><td>lui/lei</td><td class='regular'>attendeva</td></tr><tr><td>noi</td><td class='regular'>attendevamo</td></tr><tr><td>voi</td><td class='regular'>attendevate</td></tr><tr><td>loro</td><td class='regular'>attendevano</td></tr></tbody></table></div>"
            },
            attraversare: {
                term: "attraversare",
                definition: "cross",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>attraverso</td></tr><tr><td>tu</td><td class='regular'>attraversi</td></tr><tr><td>lui/lei</td><td class='regular'>attraversa</td></tr><tr><td>noi</td><td class='regular'>attraversiamo</td></tr><tr><td>voi</td><td class='regular'>attraversate</td></tr><tr><td>loro</td><td class='regular'>attraversano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>attraversavo</td></tr><tr><td>tu</td><td class='regular'>attraversavi</td></tr><tr><td>lui/lei</td><td class='regular'>attraversava</td></tr><tr><td>noi</td><td class='regular'>attraversavamo</td></tr><tr><td>voi</td><td class='regular'>attraversavate</td></tr><tr><td>loro</td><td class='regular'>attraversavano</td></tr></tbody></table></div>"
            },
            aumentare: {
                term: "aumentare",
                definition: "increase",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>aumento</td></tr><tr><td>tu</td><td class='regular'>aumenti</td></tr><tr><td>lui/lei</td><td class='regular'>aumenta</td></tr><tr><td>noi</td><td class='regular'>aumentiamo</td></tr><tr><td>voi</td><td class='regular'>aumentate</td></tr><tr><td>loro</td><td class='regular'>aumentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>aumentavo</td></tr><tr><td>tu</td><td class='regular'>aumentavi</td></tr><tr><td>lui/lei</td><td class='regular'>aumentava</td></tr><tr><td>noi</td><td class='regular'>aumentavamo</td></tr><tr><td>voi</td><td class='regular'>aumentavate</td></tr><tr><td>loro</td><td class='regular'>aumentavano</td></tr></tbody></table></div>"
            },
            avanzare: {
                term: "avanzare",
                definition: "advance",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>avanzo</td></tr><tr><td>tu</td><td class='regular'>avanzi</td></tr><tr><td>lui/lei</td><td class='regular'>avanza</td></tr><tr><td>noi</td><td class='regular'>avanziamo</td></tr><tr><td>voi</td><td class='regular'>avanzate</td></tr><tr><td>loro</td><td class='regular'>avanzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>avanzavo</td></tr><tr><td>tu</td><td class='regular'>avanzavi</td></tr><tr><td>lui/lei</td><td class='regular'>avanzava</td></tr><tr><td>noi</td><td class='regular'>avanzavamo</td></tr><tr><td>voi</td><td class='regular'>avanzavate</td></tr><tr><td>loro</td><td class='regular'>avanzavano</td></tr></tbody></table></div>"
            },
            avere: {
                term: "avere",
                definition: "have",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>ho</td></tr><tr><td>tu</td><td class='irregular'>hai</td></tr><tr><td>lui/lei</td><td class='irregular'>ha</td></tr><tr><td>noi</td><td class='irregular'>abbiamo</td></tr><tr><td>voi</td><td class='regular'>avete</td></tr><tr><td>loro</td><td class='irregular'>hanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>avevo</td></tr><tr><td>tu</td><td class='regular'>avevi</td></tr><tr><td>lui/lei</td><td class='regular'>aveva</td></tr><tr><td>noi</td><td class='regular'>avevamo</td></tr><tr><td>voi</td><td class='regular'>avevate</td></tr><tr><td>loro</td><td class='regular'>avevano</td></tr></tbody></table></div>"
            },
            avvertire: {
                term: "avvertire",
                definition: "warn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>avverto</td></tr><tr><td>tu</td><td class='regular'>avverti</td></tr><tr><td>lui/lei</td><td class='regular'>avverte</td></tr><tr><td>noi</td><td class='regular'>avvertiamo</td></tr><tr><td>voi</td><td class='regular'>avvertite</td></tr><tr><td>loro</td><td class='regular'>avvertono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>avvertivo</td></tr><tr><td>tu</td><td class='regular'>avvertivi</td></tr><tr><td>lui/lei</td><td class='regular'>avvertiva</td></tr><tr><td>noi</td><td class='regular'>avvertivamo</td></tr><tr><td>voi</td><td class='regular'>avvertivate</td></tr><tr><td>loro</td><td class='regular'>avvertivano</td></tr></tbody></table></div>"
            },
            avvicinare: {
                term: "avvicinare",
                definition: "approach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>avvicino</td></tr><tr><td>tu</td><td class='regular'>avvicini</td></tr><tr><td>lui/lei</td><td class='regular'>avvicina</td></tr><tr><td>noi</td><td class='regular'>avviciniamo</td></tr><tr><td>voi</td><td class='regular'>avvicinate</td></tr><tr><td>loro</td><td class='regular'>avvicinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>avvicinavo</td></tr><tr><td>tu</td><td class='regular'>avvicinavi</td></tr><tr><td>lui/lei</td><td class='regular'>avvicinava</td></tr><tr><td>noi</td><td class='regular'>avvicinavamo</td></tr><tr><td>voi</td><td class='regular'>avvicinavate</td></tr><tr><td>loro</td><td class='regular'>avvicinavano</td></tr></tbody></table></div>"
            },
            baciare: {
                term: "baciare",
                definition: "kiss",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>bacio</td></tr><tr><td>tu</td><td class='regular'>baci</td></tr><tr><td>lui/lei</td><td class='regular'>bacia</td></tr><tr><td>noi</td><td class='regular'>baciamo</td></tr><tr><td>voi</td><td class='regular'>baciate</td></tr><tr><td>loro</td><td class='regular'>baciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>baciavo</td></tr><tr><td>tu</td><td class='regular'>baciavi</td></tr><tr><td>lui/lei</td><td class='regular'>baciava</td></tr><tr><td>noi</td><td class='regular'>baciavamo</td></tr><tr><td>voi</td><td class='regular'>baciavate</td></tr><tr><td>loro</td><td class='regular'>baciavano</td></tr></tbody></table></div>"
            },
            badare: {
                term: "badare",
                definition: "look after",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>bado</td></tr><tr><td>tu</td><td class='regular'>badi</td></tr><tr><td>lui/lei</td><td class='regular'>bada</td></tr><tr><td>noi</td><td class='regular'>badiamo</td></tr><tr><td>voi</td><td class='regular'>badate</td></tr><tr><td>loro</td><td class='regular'>badano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>badavo</td></tr><tr><td>tu</td><td class='regular'>badavi</td></tr><tr><td>lui/lei</td><td class='regular'>badava</td></tr><tr><td>noi</td><td class='regular'>badavamo</td></tr><tr><td>voi</td><td class='regular'>badavate</td></tr><tr><td>loro</td><td class='regular'>badavano</td></tr></tbody></table></div>"
            },
            bastare: {
                term: "bastare",
                definition: "suffice",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>basto</td></tr><tr><td>tu</td><td class='regular'>basti</td></tr><tr><td>lui/lei</td><td class='regular'>basta</td></tr><tr><td>noi</td><td class='regular'>bastiamo</td></tr><tr><td>voi</td><td class='regular'>bastate</td></tr><tr><td>loro</td><td class='regular'>bastano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>bastavo</td></tr><tr><td>tu</td><td class='regular'>bastavi</td></tr><tr><td>lui/lei</td><td class='regular'>bastava</td></tr><tr><td>noi</td><td class='regular'>bastavamo</td></tr><tr><td>voi</td><td class='regular'>bastavate</td></tr><tr><td>loro</td><td class='regular'>bastavano</td></tr></tbody></table></div>"
            },
            battere: {
                term: "battere",
                definition: "beat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>batto</td></tr><tr><td>tu</td><td class='regular'>batti</td></tr><tr><td>lui/lei</td><td class='regular'>batte</td></tr><tr><td>noi</td><td class='regular'>battiamo</td></tr><tr><td>voi</td><td class='regular'>battete</td></tr><tr><td>loro</td><td class='regular'>battono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>battevo</td></tr><tr><td>tu</td><td class='regular'>battevi</td></tr><tr><td>lui/lei</td><td class='regular'>batteva</td></tr><tr><td>noi</td><td class='regular'>battevamo</td></tr><tr><td>voi</td><td class='regular'>battevate</td></tr><tr><td>loro</td><td class='regular'>battevano</td></tr></tbody></table></div>"
            },
            bere: {
                term: "bere",
                definition: "drinking",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>bevo</td></tr><tr><td>tu</td><td class='irregular'>bevi</td></tr><tr><td>lui/lei</td><td class='irregular'>beve</td></tr><tr><td>noi</td><td class='irregular'>beviamo</td></tr><tr><td>voi</td><td class='irregular'>bevete</td></tr><tr><td>loro</td><td class='irregular'>bevono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>bevevo</td></tr><tr><td>tu</td><td class='irregular'>bevevi</td></tr><tr><td>lui/lei</td><td class='irregular'>beveva</td></tr><tr><td>noi</td><td class='irregular'>bevevamo</td></tr><tr><td>voi</td><td class='irregular'>bevevate</td></tr><tr><td>loro</td><td class='irregular'>bevevano</td></tr></tbody></table></div>"
            },
            bisognare: {
                term: "bisognare",
                definition: "bisognare",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td>-</td></tr><tr><td>tu</td><td>-</td></tr><tr><td>lui/lei</td><td class='regular'>bisogna</td></tr><tr><td>noi</td><td>-</td></tr><tr><td>voi</td><td>-</td></tr><tr><td>loro</td><td>-</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>-</td></tr><tr><td>tu</td><td>-</td></tr><tr><td>lui/lei</td><td class='regular'>bisognava</td></tr><tr><td>noi</td><td>-</td></tr><tr><td>voi</td><td>-</td></tr><tr><td>loro</td><td>-</td></tr></tbody></table></div>"
            },
            bruciare: {
                term: "bruciare",
                definition: "burn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>brucio</td></tr><tr><td>tu</td><td class='regular'>bruci</td></tr><tr><td>lui/lei</td><td class='regular'>brucia</td></tr><tr><td>noi</td><td class='regular'>bruciamo</td></tr><tr><td>voi</td><td class='regular'>bruciate</td></tr><tr><td>loro</td><td class='regular'>bruciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>bruciavo</td></tr><tr><td>tu</td><td class='regular'>bruciavi</td></tr><tr><td>lui/lei</td><td class='regular'>bruciava</td></tr><tr><td>noi</td><td class='regular'>bruciavamo</td></tr><tr><td>voi</td><td class='regular'>bruciavate</td></tr><tr><td>loro</td><td class='regular'>bruciavano</td></tr></tbody></table></div>"
            },
            buttare: {
                term: "buttare",
                definition: "throw",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>butto</td></tr><tr><td>tu</td><td class='regular'>butti</td></tr><tr><td>lui/lei</td><td class='regular'>butta</td></tr><tr><td>noi</td><td class='regular'>buttiamo</td></tr><tr><td>voi</td><td class='regular'>buttate</td></tr><tr><td>loro</td><td class='regular'>buttano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>buttavo</td></tr><tr><td>tu</td><td class='regular'>buttavi</td></tr><tr><td>lui/lei</td><td class='regular'>buttava</td></tr><tr><td>noi</td><td class='regular'>buttavamo</td></tr><tr><td>voi</td><td class='regular'>buttavate</td></tr><tr><td>loro</td><td class='regular'>buttavano</td></tr></tbody></table></div>"
            },
            cadere: {
                term: "cadere",
                definition: "fall",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>cado</td></tr><tr><td>tu</td><td class='regular'>cadi</td></tr><tr><td>lui/lei</td><td class='regular'>cade</td></tr><tr><td>noi</td><td class='regular'>cadiamo</td></tr><tr><td>voi</td><td class='regular'>cadete</td></tr><tr><td>loro</td><td class='regular'>cadono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>cadevo</td></tr><tr><td>tu</td><td class='regular'>cadevi</td></tr><tr><td>lui/lei</td><td class='regular'>cadeva</td></tr><tr><td>noi</td><td class='regular'>cadevamo</td></tr><tr><td>voi</td><td class='regular'>cadevate</td></tr><tr><td>loro</td><td class='regular'>cadevano</td></tr></tbody></table></div>"
            },
            cambiare: {
                term: "cambiare",
                definition: "change",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>cambio</td></tr><tr><td>tu</td><td class='regular'>cambi</td></tr><tr><td>lui/lei</td><td class='regular'>cambia</td></tr><tr><td>noi</td><td class='regular'>cambiamo</td></tr><tr><td>voi</td><td class='regular'>cambiate</td></tr><tr><td>loro</td><td class='regular'>cambiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>cambiavo</td></tr><tr><td>tu</td><td class='regular'>cambiavi</td></tr><tr><td>lui/lei</td><td class='regular'>cambiava</td></tr><tr><td>noi</td><td class='regular'>cambiavamo</td></tr><tr><td>voi</td><td class='regular'>cambiavate</td></tr><tr><td>loro</td><td class='regular'>cambiavano</td></tr></tbody></table></div>"
            },
            camminare: {
                term: "camminare",
                definition: "walk",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>cammino</td></tr><tr><td>tu</td><td class='regular'>cammini</td></tr><tr><td>lui/lei</td><td class='regular'>cammina</td></tr><tr><td>noi</td><td class='regular'>camminiamo</td></tr><tr><td>voi</td><td class='regular'>camminate</td></tr><tr><td>loro</td><td class='regular'>camminano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>camminavo</td></tr><tr><td>tu</td><td class='regular'>camminavi</td></tr><tr><td>lui/lei</td><td class='regular'>camminava</td></tr><tr><td>noi</td><td class='regular'>camminavamo</td></tr><tr><td>voi</td><td class='regular'>camminavate</td></tr><tr><td>loro</td><td class='regular'>camminavano</td></tr></tbody></table></div>"
            },
            cantare: {
                term: "cantare",
                definition: "sing",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>canto</td></tr><tr><td>tu</td><td class='regular'>canti</td></tr><tr><td>lui/lei</td><td class='regular'>canta</td></tr><tr><td>noi</td><td class='regular'>cantiamo</td></tr><tr><td>voi</td><td class='regular'>cantate</td></tr><tr><td>loro</td><td class='regular'>cantano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>cantavo</td></tr><tr><td>tu</td><td class='regular'>cantavi</td></tr><tr><td>lui/lei</td><td class='regular'>cantava</td></tr><tr><td>noi</td><td class='regular'>cantavamo</td></tr><tr><td>voi</td><td class='regular'>cantavate</td></tr><tr><td>loro</td><td class='regular'>cantavano</td></tr></tbody></table></div>"
            },
            capire: {
                term: "capire",
                definition: "understand",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>capisco</td></tr><tr><td>tu</td><td class='irregular'>capisci</td></tr><tr><td>lui/lei</td><td class='irregular'>capisce</td></tr><tr><td>noi</td><td class='regular'>capiamo</td></tr><tr><td>voi</td><td class='regular'>capite</td></tr><tr><td>loro</td><td class='irregular'>capiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>capivo</td></tr><tr><td>tu</td><td class='regular'>capivi</td></tr><tr><td>lui/lei</td><td class='regular'>capiva</td></tr><tr><td>noi</td><td class='regular'>capivamo</td></tr><tr><td>voi</td><td class='regular'>capivate</td></tr><tr><td>loro</td><td class='regular'>capivano</td></tr></tbody></table></div>"
            },
            celebrare: {
                term: "celebrare",
                definition: "celebrate",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>celebro</td></tr><tr><td>tu</td><td class='regular'>celebri</td></tr><tr><td>lui/lei</td><td class='regular'>celebra</td></tr><tr><td>noi</td><td class='regular'>celebriamo</td></tr><tr><td>voi</td><td class='regular'>celebrate</td></tr><tr><td>loro</td><td class='regular'>celebrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>celebravo</td></tr><tr><td>tu</td><td class='regular'>celebravi</td></tr><tr><td>lui/lei</td><td class='regular'>celebrava</td></tr><tr><td>noi</td><td class='regular'>celebravamo</td></tr><tr><td>voi</td><td class='regular'>celebravate</td></tr><tr><td>loro</td><td class='regular'>celebravano</td></tr></tbody></table></div>"
            },
            cercare: {
                term: "cercare",
                definition: "search",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>cerco</td></tr><tr><td>tu</td><td class='regular'>cerchi</td></tr><tr><td>lui/lei</td><td class='regular'>cerca</td></tr><tr><td>noi</td><td class='regular'>cerchiamo</td></tr><tr><td>voi</td><td class='regular'>cercate</td></tr><tr><td>loro</td><td class='regular'>cercano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>cercavo</td></tr><tr><td>tu</td><td class='regular'>cercavi</td></tr><tr><td>lui/lei</td><td class='regular'>cercava</td></tr><tr><td>noi</td><td class='regular'>cercavamo</td></tr><tr><td>voi</td><td class='regular'>cercavate</td></tr><tr><td>loro</td><td class='regular'>cercavano</td></tr></tbody></table></div>"
            },
            chiamare: {
                term: "chiamare",
                definition: "call",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>chiamo</td></tr><tr><td>tu</td><td class='regular'>chiami</td></tr><tr><td>lui/lei</td><td class='regular'>chiama</td></tr><tr><td>noi</td><td class='regular'>chiamiamo</td></tr><tr><td>voi</td><td class='regular'>chiamate</td></tr><tr><td>loro</td><td class='regular'>chiamano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>chiamavo</td></tr><tr><td>tu</td><td class='regular'>chiamavi</td></tr><tr><td>lui/lei</td><td class='regular'>chiamava</td></tr><tr><td>noi</td><td class='regular'>chiamavamo</td></tr><tr><td>voi</td><td class='regular'>chiamavate</td></tr><tr><td>loro</td><td class='regular'>chiamavano</td></tr></tbody></table></div>"
            },
            chiedere: {
                term: "chiedere",
                definition: "ask",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>chiedo</td></tr><tr><td>tu</td><td class='regular'>chiedi</td></tr><tr><td>lui/lei</td><td class='regular'>chiede</td></tr><tr><td>noi</td><td class='regular'>chiediamo</td></tr><tr><td>voi</td><td class='regular'>chiedete</td></tr><tr><td>loro</td><td class='regular'>chiedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>chiedevo</td></tr><tr><td>tu</td><td class='regular'>chiedevi</td></tr><tr><td>lui/lei</td><td class='regular'>chiedeva</td></tr><tr><td>noi</td><td class='regular'>chiedevamo</td></tr><tr><td>voi</td><td class='regular'>chiedevate</td></tr><tr><td>loro</td><td class='regular'>chiedevano</td></tr></tbody></table></div>"
            },
            chiudere: {
                term: "chiudere",
                definition: "close",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>chiudo</td></tr><tr><td>tu</td><td class='regular'>chiudi</td></tr><tr><td>lui/lei</td><td class='regular'>chiude</td></tr><tr><td>noi</td><td class='regular'>chiudiamo</td></tr><tr><td>voi</td><td class='regular'>chiudete</td></tr><tr><td>loro</td><td class='regular'>chiudono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>chiudevo</td></tr><tr><td>tu</td><td class='regular'>chiudevi</td></tr><tr><td>lui/lei</td><td class='regular'>chiudeva</td></tr><tr><td>noi</td><td class='regular'>chiudevamo</td></tr><tr><td>voi</td><td class='regular'>chiudevate</td></tr><tr><td>loro</td><td class='regular'>chiudevano</td></tr></tbody></table></div>"
            },
            colpire: {
                term: "colpire",
                definition: "hit",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>colpisco</td></tr><tr><td>tu</td><td class='irregular'>colpisci</td></tr><tr><td>lui/lei</td><td class='irregular'>colpisce</td></tr><tr><td>noi</td><td class='regular'>colpiamo</td></tr><tr><td>voi</td><td class='regular'>colpite</td></tr><tr><td>loro</td><td class='irregular'>colpiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>colpivo</td></tr><tr><td>tu</td><td class='regular'>colpivi</td></tr><tr><td>lui/lei</td><td class='regular'>colpiva</td></tr><tr><td>noi</td><td class='regular'>colpivamo</td></tr><tr><td>voi</td><td class='regular'>colpivate</td></tr><tr><td>loro</td><td class='regular'>colpivano</td></tr></tbody></table></div>"
            },
            cominciare: {
                term: "cominciare",
                definition: "begin",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>comincio</td></tr><tr><td>tu</td><td class='regular'>cominci</td></tr><tr><td>lui/lei</td><td class='regular'>comincia</td></tr><tr><td>noi</td><td class='regular'>cominciamo</td></tr><tr><td>voi</td><td class='regular'>cominciate</td></tr><tr><td>loro</td><td class='regular'>cominciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>cominciavo</td></tr><tr><td>tu</td><td class='regular'>cominciavi</td></tr><tr><td>lui/lei</td><td class='regular'>cominciava</td></tr><tr><td>noi</td><td class='regular'>cominciavamo</td></tr><tr><td>voi</td><td class='regular'>cominciavate</td></tr><tr><td>loro</td><td class='regular'>cominciavano</td></tr></tbody></table></div>"
            },
            compiere: {
                term: "compiere",
                definition: "fulfill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>compio</td></tr><tr><td>tu</td><td class='regular'>compii</td></tr><tr><td>lui/lei</td><td class='regular'>compie</td></tr><tr><td>noi</td><td class='regular'>compiiamo</td></tr><tr><td>voi</td><td class='regular'>compiete</td></tr><tr><td>loro</td><td class='regular'>compiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>compievo</td></tr><tr><td>tu</td><td class='regular'>compievi</td></tr><tr><td>lui/lei</td><td class='regular'>compieva</td></tr><tr><td>noi</td><td class='regular'>compievamo</td></tr><tr><td>voi</td><td class='regular'>compievate</td></tr><tr><td>loro</td><td class='regular'>compievano</td></tr></tbody></table></div>"
            },
            comporre: {
                term: "comporre",
                definition: "compose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>compongo</td></tr><tr><td>tu</td><td class='irregular'>componi</td></tr><tr><td>lui/lei</td><td class='irregular'>compone</td></tr><tr><td>noi</td><td class='irregular'>componiamo</td></tr><tr><td>voi</td><td class='irregular'>componete</td></tr><tr><td>loro</td><td class='irregular'>compongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>componevo</td></tr><tr><td>tu</td><td class='irregular'>componevi</td></tr><tr><td>lui/lei</td><td class='irregular'>componeva</td></tr><tr><td>noi</td><td class='irregular'>componevamo</td></tr><tr><td>voi</td><td class='irregular'>componevate</td></tr><tr><td>loro</td><td class='irregular'>componevano</td></tr></tbody></table></div>"
            },
            comprendere: {
                term: "comprendere",
                definition: "understand",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>comprendo</td></tr><tr><td>tu</td><td class='regular'>comprendi</td></tr><tr><td>lui/lei</td><td class='regular'>comprende</td></tr><tr><td>noi</td><td class='regular'>comprendiamo</td></tr><tr><td>voi</td><td class='regular'>comprendete</td></tr><tr><td>loro</td><td class='regular'>comprendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>comprendevo</td></tr><tr><td>tu</td><td class='regular'>comprendevi</td></tr><tr><td>lui/lei</td><td class='regular'>comprendeva</td></tr><tr><td>noi</td><td class='regular'>comprendevamo</td></tr><tr><td>voi</td><td class='regular'>comprendevate</td></tr><tr><td>loro</td><td class='regular'>comprendevano</td></tr></tbody></table></div>"
            },
            comprare: {
                term: "comprare",
                definition: "buy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>compro</td></tr><tr><td>tu</td><td class='regular'>compri</td></tr><tr><td>lui/lei</td><td class='regular'>compra</td></tr><tr><td>noi</td><td class='regular'>compriamo</td></tr><tr><td>voi</td><td class='regular'>comprate</td></tr><tr><td>loro</td><td class='regular'>comprano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>compravo</td></tr><tr><td>tu</td><td class='regular'>compravi</td></tr><tr><td>lui/lei</td><td class='regular'>comprava</td></tr><tr><td>noi</td><td class='regular'>compravamo</td></tr><tr><td>voi</td><td class='regular'>compravate</td></tr><tr><td>loro</td><td class='regular'>compravano</td></tr></tbody></table></div>"
            },
            concludere: {
                term: "concludere",
                definition: "conclude",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>concludo</td></tr><tr><td>tu</td><td class='regular'>concludi</td></tr><tr><td>lui/lei</td><td class='regular'>conclude</td></tr><tr><td>noi</td><td class='regular'>concludiamo</td></tr><tr><td>voi</td><td class='regular'>concludete</td></tr><tr><td>loro</td><td class='regular'>concludono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>concludevo</td></tr><tr><td>tu</td><td class='regular'>concludevi</td></tr><tr><td>lui/lei</td><td class='regular'>concludeva</td></tr><tr><td>noi</td><td class='regular'>concludevamo</td></tr><tr><td>voi</td><td class='regular'>concludevate</td></tr><tr><td>loro</td><td class='regular'>concludevano</td></tr></tbody></table></div>"
            },
            condurre: {
                term: "condurre",
                definition: "lead",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>conduco</td></tr><tr><td>tu</td><td class='irregular'>conduci</td></tr><tr><td>lui/lei</td><td class='irregular'>conduce</td></tr><tr><td>noi</td><td class='irregular'>conduciamo</td></tr><tr><td>voi</td><td class='irregular'>conducete</td></tr><tr><td>loro</td><td class='irregular'>conducono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>conducevo</td></tr><tr><td>tu</td><td class='irregular'>conducevi</td></tr><tr><td>lui/lei</td><td class='irregular'>conduceva</td></tr><tr><td>noi</td><td class='irregular'>conducevamo</td></tr><tr><td>voi</td><td class='irregular'>conducevate</td></tr><tr><td>loro</td><td class='irregular'>conducevano</td></tr></tbody></table></div>"
            },
            confessare: {
                term: "confessare",
                definition: "confess",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>confesso</td></tr><tr><td>tu</td><td class='regular'>confessi</td></tr><tr><td>lui/lei</td><td class='regular'>confessa</td></tr><tr><td>noi</td><td class='regular'>confessiamo</td></tr><tr><td>voi</td><td class='regular'>confessate</td></tr><tr><td>loro</td><td class='regular'>confessano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>confessavo</td></tr><tr><td>tu</td><td class='regular'>confessavi</td></tr><tr><td>lui/lei</td><td class='regular'>confessava</td></tr><tr><td>noi</td><td class='regular'>confessavamo</td></tr><tr><td>voi</td><td class='regular'>confessavate</td></tr><tr><td>loro</td><td class='regular'>confessavano</td></tr></tbody></table></div>"
            },
            conoscere: {
                term: "conoscere",
                definition: "know",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>conosco</td></tr><tr><td>tu</td><td class='regular'>conosci</td></tr><tr><td>lui/lei</td><td class='regular'>conosce</td></tr><tr><td>noi</td><td class='regular'>conosciamo</td></tr><tr><td>voi</td><td class='regular'>conoscete</td></tr><tr><td>loro</td><td class='regular'>conoscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>conoscevo</td></tr><tr><td>tu</td><td class='regular'>conoscevi</td></tr><tr><td>lui/lei</td><td class='regular'>conosceva</td></tr><tr><td>noi</td><td class='regular'>conoscevamo</td></tr><tr><td>voi</td><td class='regular'>conoscevate</td></tr><tr><td>loro</td><td class='regular'>conoscevano</td></tr></tbody></table></div>"
            },
            consentire: {
                term: "consentire",
                definition: "allow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>consento</td></tr><tr><td>tu</td><td class='regular'>consenti</td></tr><tr><td>lui/lei</td><td class='regular'>consente</td></tr><tr><td>noi</td><td class='regular'>consentiamo</td></tr><tr><td>voi</td><td class='regular'>consentite</td></tr><tr><td>loro</td><td class='regular'>consentono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>consentivo</td></tr><tr><td>tu</td><td class='regular'>consentivi</td></tr><tr><td>lui/lei</td><td class='regular'>consentiva</td></tr><tr><td>noi</td><td class='regular'>consentivamo</td></tr><tr><td>voi</td><td class='regular'>consentivate</td></tr><tr><td>loro</td><td class='regular'>consentivano</td></tr></tbody></table></div>"
            },
            conservare: {
                term: "conservare",
                definition: "save",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>conservo</td></tr><tr><td>tu</td><td class='regular'>conservi</td></tr><tr><td>lui/lei</td><td class='regular'>conserva</td></tr><tr><td>noi</td><td class='regular'>conserviamo</td></tr><tr><td>voi</td><td class='regular'>conservate</td></tr><tr><td>loro</td><td class='regular'>conservano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>conservavo</td></tr><tr><td>tu</td><td class='regular'>conservavi</td></tr><tr><td>lui/lei</td><td class='regular'>conservava</td></tr><tr><td>noi</td><td class='regular'>conservavamo</td></tr><tr><td>voi</td><td class='regular'>conservavate</td></tr><tr><td>loro</td><td class='regular'>conservavano</td></tr></tbody></table></div>"
            },
            considerare: {
                term: "considerare",
                definition: "consider",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>considero</td></tr><tr><td>tu</td><td class='regular'>consideri</td></tr><tr><td>lui/lei</td><td class='regular'>considera</td></tr><tr><td>noi</td><td class='regular'>consideriamo</td></tr><tr><td>voi</td><td class='regular'>considerate</td></tr><tr><td>loro</td><td class='regular'>considerano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>consideravo</td></tr><tr><td>tu</td><td class='regular'>consideravi</td></tr><tr><td>lui/lei</td><td class='regular'>considerava</td></tr><tr><td>noi</td><td class='regular'>consideravamo</td></tr><tr><td>voi</td><td class='regular'>consideravate</td></tr><tr><td>loro</td><td class='regular'>consideravano</td></tr></tbody></table></div>"
            },
            contare: {
                term: "contare",
                definition: "count",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>conto</td></tr><tr><td>tu</td><td class='regular'>conti</td></tr><tr><td>lui/lei</td><td class='regular'>conta</td></tr><tr><td>noi</td><td class='regular'>contiamo</td></tr><tr><td>voi</td><td class='regular'>contate</td></tr><tr><td>loro</td><td class='regular'>contano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>contavo</td></tr><tr><td>tu</td><td class='regular'>contavi</td></tr><tr><td>lui/lei</td><td class='regular'>contava</td></tr><tr><td>noi</td><td class='regular'>contavamo</td></tr><tr><td>voi</td><td class='regular'>contavate</td></tr><tr><td>loro</td><td class='regular'>contavano</td></tr></tbody></table></div>"
            },
            contenere: {
                term: "contenere",
                definition: "contain",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>contengo</td></tr><tr><td>tu</td><td class='irregular'>contieni</td></tr><tr><td>lui/lei</td><td class='irregular'>contiene</td></tr><tr><td>noi</td><td class='regular'>conteniamo</td></tr><tr><td>voi</td><td class='regular'>contenete</td></tr><tr><td>loro</td><td class='irregular'>contengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>contenevo</td></tr><tr><td>tu</td><td class='regular'>contenevi</td></tr><tr><td>lui/lei</td><td class='regular'>conteneva</td></tr><tr><td>noi</td><td class='regular'>contenevamo</td></tr><tr><td>voi</td><td class='regular'>contenevate</td></tr><tr><td>loro</td><td class='regular'>contenevano</td></tr></tbody></table></div>"
            },
            continuare: {
                term: "continuare",
                definition: "continue",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>continuo</td></tr><tr><td>tu</td><td class='regular'>continui</td></tr><tr><td>lui/lei</td><td class='regular'>continua</td></tr><tr><td>noi</td><td class='regular'>continuiamo</td></tr><tr><td>voi</td><td class='regular'>continuate</td></tr><tr><td>loro</td><td class='regular'>continuano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>continuavo</td></tr><tr><td>tu</td><td class='regular'>continuavi</td></tr><tr><td>lui/lei</td><td class='regular'>continuava</td></tr><tr><td>noi</td><td class='regular'>continuavamo</td></tr><tr><td>voi</td><td class='regular'>continuavate</td></tr><tr><td>loro</td><td class='regular'>continuavano</td></tr></tbody></table></div>"
            },
            convincere: {
                term: "convincere",
                definition: "convince",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>convinco</td></tr><tr><td>tu</td><td class='regular'>convinci</td></tr><tr><td>lui/lei</td><td class='regular'>convince</td></tr><tr><td>noi</td><td class='regular'>convinciamo</td></tr><tr><td>voi</td><td class='regular'>convincete</td></tr><tr><td>loro</td><td class='regular'>convincono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>convincevo</td></tr><tr><td>tu</td><td class='regular'>convincevi</td></tr><tr><td>lui/lei</td><td class='regular'>convinceva</td></tr><tr><td>noi</td><td class='regular'>convincevamo</td></tr><tr><td>voi</td><td class='regular'>convincevate</td></tr><tr><td>loro</td><td class='regular'>convincevano</td></tr></tbody></table></div>"
            },
            coprire: {
                term: "coprire",
                definition: "cover",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>copro</td></tr><tr><td>tu</td><td class='regular'>copri</td></tr><tr><td>lui/lei</td><td class='regular'>copre</td></tr><tr><td>noi</td><td class='regular'>copriamo</td></tr><tr><td>voi</td><td class='regular'>coprite</td></tr><tr><td>loro</td><td class='regular'>coprono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>coprivo</td></tr><tr><td>tu</td><td class='regular'>coprivi</td></tr><tr><td>lui/lei</td><td class='regular'>copriva</td></tr><tr><td>noi</td><td class='regular'>coprivamo</td></tr><tr><td>voi</td><td class='regular'>coprivate</td></tr><tr><td>loro</td><td class='regular'>coprivano</td></tr></tbody></table></div>"
            },
            correre: {
                term: "correre",
                definition: "run",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>corro</td></tr><tr><td>tu</td><td class='regular'>corri</td></tr><tr><td>lui/lei</td><td class='regular'>corre</td></tr><tr><td>noi</td><td class='regular'>corriamo</td></tr><tr><td>voi</td><td class='regular'>correte</td></tr><tr><td>loro</td><td class='regular'>corrono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>correvo</td></tr><tr><td>tu</td><td class='regular'>correvi</td></tr><tr><td>lui/lei</td><td class='regular'>correva</td></tr><tr><td>noi</td><td class='regular'>correvamo</td></tr><tr><td>voi</td><td class='regular'>correvate</td></tr><tr><td>loro</td><td class='regular'>correvano</td></tr></tbody></table></div>"
            },
            costituire: {
                term: "costituire",
                definition: "constitute",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>costituisco</td></tr><tr><td>tu</td><td class='irregular'>costituisci</td></tr><tr><td>lui/lei</td><td class='irregular'>costituisce</td></tr><tr><td>noi</td><td class='regular'>costituiamo</td></tr><tr><td>voi</td><td class='regular'>costituite</td></tr><tr><td>loro</td><td class='irregular'>costituiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>costituivo</td></tr><tr><td>tu</td><td class='regular'>costituivi</td></tr><tr><td>lui/lei</td><td class='regular'>costituiva</td></tr><tr><td>noi</td><td class='regular'>costituivamo</td></tr><tr><td>voi</td><td class='regular'>costituivate</td></tr><tr><td>loro</td><td class='regular'>costituivano</td></tr></tbody></table></div>"
            },
            costruire: {
                term: "costruire",
                definition: "build",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>costruisco</td></tr><tr><td>tu</td><td class='irregular'>costruisci</td></tr><tr><td>lui/lei</td><td class='irregular'>costruisce</td></tr><tr><td>noi</td><td class='regular'>costruiamo</td></tr><tr><td>voi</td><td class='regular'>costruite</td></tr><tr><td>loro</td><td class='irregular'>costruiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>costruivo</td></tr><tr><td>tu</td><td class='regular'>costruivi</td></tr><tr><td>lui/lei</td><td class='regular'>costruiva</td></tr><tr><td>noi</td><td class='regular'>costruivamo</td></tr><tr><td>voi</td><td class='regular'>costruivate</td></tr><tr><td>loro</td><td class='regular'>costruivano</td></tr></tbody></table></div>"
            },
            creare: {
                term: "creare",
                definition: "create",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>creo</td></tr><tr><td>tu</td><td class='regular'>crei</td></tr><tr><td>lui/lei</td><td class='regular'>crea</td></tr><tr><td>noi</td><td class='regular'>creiamo</td></tr><tr><td>voi</td><td class='regular'>create</td></tr><tr><td>loro</td><td class='regular'>creano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>creavo</td></tr><tr><td>tu</td><td class='regular'>creavi</td></tr><tr><td>lui/lei</td><td class='regular'>creava</td></tr><tr><td>noi</td><td class='regular'>creavamo</td></tr><tr><td>voi</td><td class='regular'>creavate</td></tr><tr><td>loro</td><td class='regular'>creavano</td></tr></tbody></table></div>"
            },
            credere: {
                term: "credere",
                definition: "believe",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>credo</td></tr><tr><td>tu</td><td class='regular'>credi</td></tr><tr><td>lui/lei</td><td class='regular'>crede</td></tr><tr><td>noi</td><td class='regular'>crediamo</td></tr><tr><td>voi</td><td class='regular'>credete</td></tr><tr><td>loro</td><td class='regular'>credono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>credevo</td></tr><tr><td>tu</td><td class='regular'>credevi</td></tr><tr><td>lui/lei</td><td class='regular'>credeva</td></tr><tr><td>noi</td><td class='regular'>credevamo</td></tr><tr><td>voi</td><td class='regular'>credevate</td></tr><tr><td>loro</td><td class='regular'>credevano</td></tr></tbody></table></div>"
            },
            crescere: {
                term: "crescere",
                definition: "grow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>cresco</td></tr><tr><td>tu</td><td class='regular'>cresci</td></tr><tr><td>lui/lei</td><td class='regular'>cresce</td></tr><tr><td>noi</td><td class='regular'>cresciamo</td></tr><tr><td>voi</td><td class='regular'>crescete</td></tr><tr><td>loro</td><td class='regular'>crescono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>crescevo</td></tr><tr><td>tu</td><td class='regular'>crescevi</td></tr><tr><td>lui/lei</td><td class='regular'>cresceva</td></tr><tr><td>noi</td><td class='regular'>crescevamo</td></tr><tr><td>voi</td><td class='regular'>crescevate</td></tr><tr><td>loro</td><td class='regular'>crescevano</td></tr></tbody></table></div>"
            },
            dare: {
                term: "dare",
                definition: "give",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>do</td></tr><tr><td>tu</td><td class='irregular'>dai</td></tr><tr><td>lui/lei</td><td class='regular'>dà</td></tr><tr><td>noi</td><td class='regular'>diamo</td></tr><tr><td>voi</td><td class='regular'>date</td></tr><tr><td>loro</td><td class='irregular'>dànno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>davo</td></tr><tr><td>tu</td><td class='regular'>davi</td></tr><tr><td>lui/lei</td><td class='regular'>dava</td></tr><tr><td>noi</td><td class='regular'>davamo</td></tr><tr><td>voi</td><td class='regular'>davate</td></tr><tr><td>loro</td><td class='regular'>davano</td></tr></tbody></table></div>"
            },
            decidere: {
                term: "decidere",
                definition: "decide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>decido</td></tr><tr><td>tu</td><td class='regular'>decidi</td></tr><tr><td>lui/lei</td><td class='regular'>decide</td></tr><tr><td>noi</td><td class='regular'>decidiamo</td></tr><tr><td>voi</td><td class='regular'>decidete</td></tr><tr><td>loro</td><td class='regular'>decidono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>decidevo</td></tr><tr><td>tu</td><td class='regular'>decidevi</td></tr><tr><td>lui/lei</td><td class='regular'>decideva</td></tr><tr><td>noi</td><td class='regular'>decidevamo</td></tr><tr><td>voi</td><td class='regular'>decidevate</td></tr><tr><td>loro</td><td class='regular'>decidevano</td></tr></tbody></table></div>"
            },
            dedicare: {
                term: "dedicare",
                definition: "devote",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>dedico</td></tr><tr><td>tu</td><td class='regular'>dedichi</td></tr><tr><td>lui/lei</td><td class='regular'>dedica</td></tr><tr><td>noi</td><td class='regular'>dedichiamo</td></tr><tr><td>voi</td><td class='regular'>dedicate</td></tr><tr><td>loro</td><td class='regular'>dedicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dedicavo</td></tr><tr><td>tu</td><td class='regular'>dedicavi</td></tr><tr><td>lui/lei</td><td class='regular'>dedicava</td></tr><tr><td>noi</td><td class='regular'>dedicavamo</td></tr><tr><td>voi</td><td class='regular'>dedicavate</td></tr><tr><td>loro</td><td class='regular'>dedicavano</td></tr></tbody></table></div>"
            },
            descrivere: {
                term: "descrivere",
                definition: "describe",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>descrivo</td></tr><tr><td>tu</td><td class='regular'>descrivi</td></tr><tr><td>lui/lei</td><td class='regular'>descrive</td></tr><tr><td>noi</td><td class='regular'>descriviamo</td></tr><tr><td>voi</td><td class='regular'>descrivete</td></tr><tr><td>loro</td><td class='regular'>descrivono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>descrivevo</td></tr><tr><td>tu</td><td class='regular'>descrivevi</td></tr><tr><td>lui/lei</td><td class='regular'>descriveva</td></tr><tr><td>noi</td><td class='regular'>descrivevamo</td></tr><tr><td>voi</td><td class='regular'>descrivevate</td></tr><tr><td>loro</td><td class='regular'>descrivevano</td></tr></tbody></table></div>"
            },
            desiderare: {
                term: "desiderare",
                definition: "wish",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>desidero</td></tr><tr><td>tu</td><td class='regular'>desideri</td></tr><tr><td>lui/lei</td><td class='regular'>desidera</td></tr><tr><td>noi</td><td class='regular'>desideriamo</td></tr><tr><td>voi</td><td class='regular'>desiderate</td></tr><tr><td>loro</td><td class='regular'>desiderano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>desideravo</td></tr><tr><td>tu</td><td class='regular'>desideravi</td></tr><tr><td>lui/lei</td><td class='regular'>desiderava</td></tr><tr><td>noi</td><td class='regular'>desideravamo</td></tr><tr><td>voi</td><td class='regular'>desideravate</td></tr><tr><td>loro</td><td class='regular'>desideravano</td></tr></tbody></table></div>"
            },
            determinare: {
                term: "determinare",
                definition: "determine",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>determino</td></tr><tr><td>tu</td><td class='regular'>determini</td></tr><tr><td>lui/lei</td><td class='regular'>determina</td></tr><tr><td>noi</td><td class='regular'>determiniamo</td></tr><tr><td>voi</td><td class='regular'>determinate</td></tr><tr><td>loro</td><td class='regular'>determinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>determinavo</td></tr><tr><td>tu</td><td class='regular'>determinavi</td></tr><tr><td>lui/lei</td><td class='regular'>determinava</td></tr><tr><td>noi</td><td class='regular'>determinavamo</td></tr><tr><td>voi</td><td class='regular'>determinavate</td></tr><tr><td>loro</td><td class='regular'>determinavano</td></tr></tbody></table></div>"
            },
            dichiarare: {
                term: "dichiarare",
                definition: "declare",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>dichiaro</td></tr><tr><td>tu</td><td class='regular'>dichiari</td></tr><tr><td>lui/lei</td><td class='regular'>dichiara</td></tr><tr><td>noi</td><td class='regular'>dichiariamo</td></tr><tr><td>voi</td><td class='regular'>dichiarate</td></tr><tr><td>loro</td><td class='regular'>dichiarano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dichiaravo</td></tr><tr><td>tu</td><td class='regular'>dichiaravi</td></tr><tr><td>lui/lei</td><td class='regular'>dichiarava</td></tr><tr><td>noi</td><td class='regular'>dichiaravamo</td></tr><tr><td>voi</td><td class='regular'>dichiaravate</td></tr><tr><td>loro</td><td class='regular'>dichiaravano</td></tr></tbody></table></div>"
            },
            difendere: {
                term: "difendere",
                definition: "defend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>difendo</td></tr><tr><td>tu</td><td class='regular'>difendi</td></tr><tr><td>lui/lei</td><td class='regular'>difende</td></tr><tr><td>noi</td><td class='regular'>difendiamo</td></tr><tr><td>voi</td><td class='regular'>difendete</td></tr><tr><td>loro</td><td class='regular'>difendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>difendevo</td></tr><tr><td>tu</td><td class='regular'>difendevi</td></tr><tr><td>lui/lei</td><td class='regular'>difendeva</td></tr><tr><td>noi</td><td class='regular'>difendevamo</td></tr><tr><td>voi</td><td class='regular'>difendevate</td></tr><tr><td>loro</td><td class='regular'>difendevano</td></tr></tbody></table></div>"
            },
            diffondere: {
                term: "diffondere",
                definition: "spread",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>diffondo</td></tr><tr><td>tu</td><td class='regular'>diffondi</td></tr><tr><td>lui/lei</td><td class='regular'>diffonde</td></tr><tr><td>noi</td><td class='regular'>diffondiamo</td></tr><tr><td>voi</td><td class='regular'>diffondete</td></tr><tr><td>loro</td><td class='regular'>diffondono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>diffondevo</td></tr><tr><td>tu</td><td class='regular'>diffondevi</td></tr><tr><td>lui/lei</td><td class='regular'>diffondeva</td></tr><tr><td>noi</td><td class='regular'>diffondevamo</td></tr><tr><td>voi</td><td class='regular'>diffondevate</td></tr><tr><td>loro</td><td class='regular'>diffondevano</td></tr></tbody></table></div>"
            },
            dimenticare: {
                term: "dimenticare",
                definition: "forget",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>dimentico</td></tr><tr><td>tu</td><td class='regular'>dimentichi</td></tr><tr><td>lui/lei</td><td class='regular'>dimentica</td></tr><tr><td>noi</td><td class='regular'>dimentichiamo</td></tr><tr><td>voi</td><td class='regular'>dimenticate</td></tr><tr><td>loro</td><td class='regular'>dimenticano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dimenticavo</td></tr><tr><td>tu</td><td class='regular'>dimenticavi</td></tr><tr><td>lui/lei</td><td class='regular'>dimenticava</td></tr><tr><td>noi</td><td class='regular'>dimenticavamo</td></tr><tr><td>voi</td><td class='regular'>dimenticavate</td></tr><tr><td>loro</td><td class='regular'>dimenticavano</td></tr></tbody></table></div>"
            },
            dimostrare: {
                term: "dimostrare",
                definition: "show",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>dimostro</td></tr><tr><td>tu</td><td class='regular'>dimostri</td></tr><tr><td>lui/lei</td><td class='regular'>dimostra</td></tr><tr><td>noi</td><td class='regular'>dimostriamo</td></tr><tr><td>voi</td><td class='regular'>dimostrate</td></tr><tr><td>loro</td><td class='regular'>dimostrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dimostravo</td></tr><tr><td>tu</td><td class='regular'>dimostravi</td></tr><tr><td>lui/lei</td><td class='regular'>dimostrava</td></tr><tr><td>noi</td><td class='regular'>dimostravamo</td></tr><tr><td>voi</td><td class='regular'>dimostravate</td></tr><tr><td>loro</td><td class='regular'>dimostravano</td></tr></tbody></table></div>"
            },
            dipendere: {
                term: "dipendere",
                definition: "depend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>dipendo</td></tr><tr><td>tu</td><td class='regular'>dipendi</td></tr><tr><td>lui/lei</td><td class='regular'>dipende</td></tr><tr><td>noi</td><td class='regular'>dipendiamo</td></tr><tr><td>voi</td><td class='regular'>dipendete</td></tr><tr><td>loro</td><td class='regular'>dipendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dipendevo</td></tr><tr><td>tu</td><td class='regular'>dipendevi</td></tr><tr><td>lui/lei</td><td class='regular'>dipendeva</td></tr><tr><td>noi</td><td class='regular'>dipendevamo</td></tr><tr><td>voi</td><td class='regular'>dipendevate</td></tr><tr><td>loro</td><td class='regular'>dipendevano</td></tr></tbody></table></div>"
            },
            dire: {
                term: "dire",
                definition: "say",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>dico</td></tr><tr><td>tu</td><td class='irregular'>dici</td></tr><tr><td>lui/lei</td><td class='irregular'>dice</td></tr><tr><td>noi</td><td class='irregular'>diciamo</td></tr><tr><td>voi</td><td class='regular'>dite</td></tr><tr><td>loro</td><td class='irregular'>dicono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>dicevo</td></tr><tr><td>tu</td><td class='irregular'>dicevi</td></tr><tr><td>lui/lei</td><td class='irregular'>diceva</td></tr><tr><td>noi</td><td class='irregular'>dicevamo</td></tr><tr><td>voi</td><td class='irregular'>dicevate</td></tr><tr><td>loro</td><td class='irregular'>dicevano</td></tr></tbody></table></div>"
            },
            dirigere: {
                term: "dirigere",
                definition: "direct",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>dirigo</td></tr><tr><td>tu</td><td class='regular'>dirigi</td></tr><tr><td>lui/lei</td><td class='regular'>dirige</td></tr><tr><td>noi</td><td class='regular'>dirigiamo</td></tr><tr><td>voi</td><td class='regular'>dirigete</td></tr><tr><td>loro</td><td class='regular'>dirigono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dirigevo</td></tr><tr><td>tu</td><td class='regular'>dirigevi</td></tr><tr><td>lui/lei</td><td class='regular'>dirigeva</td></tr><tr><td>noi</td><td class='regular'>dirigevamo</td></tr><tr><td>voi</td><td class='regular'>dirigevate</td></tr><tr><td>loro</td><td class='regular'>dirigevano</td></tr></tbody></table></div>"
            },
            discutere: {
                term: "discutere",
                definition: "discuss",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>discuto</td></tr><tr><td>tu</td><td class='regular'>discuti</td></tr><tr><td>lui/lei</td><td class='regular'>discute</td></tr><tr><td>noi</td><td class='regular'>discutiamo</td></tr><tr><td>voi</td><td class='regular'>discutete</td></tr><tr><td>loro</td><td class='regular'>discutono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>discutevo</td></tr><tr><td>tu</td><td class='regular'>discutevi</td></tr><tr><td>lui/lei</td><td class='regular'>discuteva</td></tr><tr><td>noi</td><td class='regular'>discutevamo</td></tr><tr><td>voi</td><td class='regular'>discutevate</td></tr><tr><td>loro</td><td class='regular'>discutevano</td></tr></tbody></table></div>"
            },
            disporre: {
                term: "disporre",
                definition: "have",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>dispongo</td></tr><tr><td>tu</td><td class='irregular'>disponi</td></tr><tr><td>lui/lei</td><td class='irregular'>dispone</td></tr><tr><td>noi</td><td class='irregular'>disponiamo</td></tr><tr><td>voi</td><td class='irregular'>disponete</td></tr><tr><td>loro</td><td class='irregular'>dispongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>disponevo</td></tr><tr><td>tu</td><td class='irregular'>disponevi</td></tr><tr><td>lui/lei</td><td class='irregular'>disponeva</td></tr><tr><td>noi</td><td class='irregular'>disponevamo</td></tr><tr><td>voi</td><td class='irregular'>disponevate</td></tr><tr><td>loro</td><td class='irregular'>disponevano</td></tr></tbody></table></div>"
            },
            distinguere: {
                term: "distinguere",
                definition: "distinguish",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>distinguo</td></tr><tr><td>tu</td><td class='regular'>distingui</td></tr><tr><td>lui/lei</td><td class='regular'>distingue</td></tr><tr><td>noi</td><td class='regular'>distinguiamo</td></tr><tr><td>voi</td><td class='regular'>distinguete</td></tr><tr><td>loro</td><td class='regular'>distinguono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>distinguevo</td></tr><tr><td>tu</td><td class='regular'>distinguevi</td></tr><tr><td>lui/lei</td><td class='regular'>distingueva</td></tr><tr><td>noi</td><td class='regular'>distinguevamo</td></tr><tr><td>voi</td><td class='regular'>distinguevate</td></tr><tr><td>loro</td><td class='regular'>distinguevano</td></tr></tbody></table></div>"
            },
            distruggere: {
                term: "distruggere",
                definition: "destroy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>distruggo</td></tr><tr><td>tu</td><td class='regular'>distruggi</td></tr><tr><td>lui/lei</td><td class='regular'>distrugge</td></tr><tr><td>noi</td><td class='regular'>distruggiamo</td></tr><tr><td>voi</td><td class='regular'>distruggete</td></tr><tr><td>loro</td><td class='regular'>distruggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>distruggevo</td></tr><tr><td>tu</td><td class='regular'>distruggevi</td></tr><tr><td>lui/lei</td><td class='regular'>distruggeva</td></tr><tr><td>noi</td><td class='regular'>distruggevamo</td></tr><tr><td>voi</td><td class='regular'>distruggevate</td></tr><tr><td>loro</td><td class='regular'>distruggevano</td></tr></tbody></table></div>"
            },
            diventare: {
                term: "diventare",
                definition: "become",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>divento</td></tr><tr><td>tu</td><td class='regular'>diventi</td></tr><tr><td>lui/lei</td><td class='regular'>diventa</td></tr><tr><td>noi</td><td class='regular'>diventiamo</td></tr><tr><td>voi</td><td class='regular'>diventate</td></tr><tr><td>loro</td><td class='regular'>diventano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>diventavo</td></tr><tr><td>tu</td><td class='regular'>diventavi</td></tr><tr><td>lui/lei</td><td class='regular'>diventava</td></tr><tr><td>noi</td><td class='regular'>diventavamo</td></tr><tr><td>voi</td><td class='regular'>diventavate</td></tr><tr><td>loro</td><td class='regular'>diventavano</td></tr></tbody></table></div>"
            },
            divertire: {
                term: "divertire",
                definition: "entertain",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>diverto</td></tr><tr><td>tu</td><td class='regular'>diverti</td></tr><tr><td>lui/lei</td><td class='regular'>diverte</td></tr><tr><td>noi</td><td class='regular'>divertiamo</td></tr><tr><td>voi</td><td class='regular'>divertite</td></tr><tr><td>loro</td><td class='regular'>divertono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>divertivo</td></tr><tr><td>tu</td><td class='regular'>divertivi</td></tr><tr><td>lui/lei</td><td class='regular'>divertiva</td></tr><tr><td>noi</td><td class='regular'>divertivamo</td></tr><tr><td>voi</td><td class='regular'>divertivate</td></tr><tr><td>loro</td><td class='regular'>divertivano</td></tr></tbody></table></div>"
            },
            dividere: {
                term: "dividere",
                definition: "divide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>divido</td></tr><tr><td>tu</td><td class='regular'>dividi</td></tr><tr><td>lui/lei</td><td class='regular'>divide</td></tr><tr><td>noi</td><td class='regular'>dividiamo</td></tr><tr><td>voi</td><td class='regular'>dividete</td></tr><tr><td>loro</td><td class='regular'>dividono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dividevo</td></tr><tr><td>tu</td><td class='regular'>dividevi</td></tr><tr><td>lui/lei</td><td class='regular'>divideva</td></tr><tr><td>noi</td><td class='regular'>dividevamo</td></tr><tr><td>voi</td><td class='regular'>dividevate</td></tr><tr><td>loro</td><td class='regular'>dividevano</td></tr></tbody></table></div>"
            },
            domandare: {
                term: "domandare",
                definition: "ask",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>domando</td></tr><tr><td>tu</td><td class='regular'>domandi</td></tr><tr><td>lui/lei</td><td class='regular'>domanda</td></tr><tr><td>noi</td><td class='regular'>domandiamo</td></tr><tr><td>voi</td><td class='regular'>domandate</td></tr><tr><td>loro</td><td class='regular'>domandano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>domandavo</td></tr><tr><td>tu</td><td class='regular'>domandavi</td></tr><tr><td>lui/lei</td><td class='regular'>domandava</td></tr><tr><td>noi</td><td class='regular'>domandavamo</td></tr><tr><td>voi</td><td class='regular'>domandavate</td></tr><tr><td>loro</td><td class='regular'>domandavano</td></tr></tbody></table></div>"
            },
            dormire: {
                term: "dormire",
                definition: "sleep",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>dormo</td></tr><tr><td>tu</td><td class='regular'>dormi</td></tr><tr><td>lui/lei</td><td class='regular'>dorme</td></tr><tr><td>noi</td><td class='regular'>dormiamo</td></tr><tr><td>voi</td><td class='regular'>dormite</td></tr><tr><td>loro</td><td class='regular'>dormono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dormivo</td></tr><tr><td>tu</td><td class='regular'>dormivi</td></tr><tr><td>lui/lei</td><td class='regular'>dormiva</td></tr><tr><td>noi</td><td class='regular'>dormivamo</td></tr><tr><td>voi</td><td class='regular'>dormivate</td></tr><tr><td>loro</td><td class='regular'>dormivano</td></tr></tbody></table></div>"
            },
            dovere: {
                term: "dovere",
                definition: "duty",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>devo</td></tr><tr><td>tu</td><td class='irregular'>devi</td></tr><tr><td>lui/lei</td><td class='irregular'>deve</td></tr><tr><td>noi</td><td class='irregular'>dobbiamo</td></tr><tr><td>voi</td><td class='regular'>dovete</td></tr><tr><td>loro</td><td class='irregular'>devono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>dovevo</td></tr><tr><td>tu</td><td class='regular'>dovevi</td></tr><tr><td>lui/lei</td><td class='regular'>doveva</td></tr><tr><td>noi</td><td class='regular'>dovevamo</td></tr><tr><td>voi</td><td class='regular'>dovevate</td></tr><tr><td>loro</td><td class='regular'>dovevano</td></tr></tbody></table></div>"
            },
            durare: {
                term: "durare",
                definition: "last",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>duro</td></tr><tr><td>tu</td><td class='regular'>duri</td></tr><tr><td>lui/lei</td><td class='regular'>dura</td></tr><tr><td>noi</td><td class='regular'>duriamo</td></tr><tr><td>voi</td><td class='regular'>durate</td></tr><tr><td>loro</td><td class='regular'>durano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>duravo</td></tr><tr><td>tu</td><td class='regular'>duravi</td></tr><tr><td>lui/lei</td><td class='regular'>durava</td></tr><tr><td>noi</td><td class='regular'>duravamo</td></tr><tr><td>voi</td><td class='regular'>duravate</td></tr><tr><td>loro</td><td class='regular'>duravano</td></tr></tbody></table></div>"
            },
            elevare: {
                term: "elevare",
                definition: "elevate",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>elevo</td></tr><tr><td>tu</td><td class='regular'>elevi</td></tr><tr><td>lui/lei</td><td class='regular'>eleva</td></tr><tr><td>noi</td><td class='regular'>eleviamo</td></tr><tr><td>voi</td><td class='regular'>elevate</td></tr><tr><td>loro</td><td class='regular'>elevano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>elevavo</td></tr><tr><td>tu</td><td class='regular'>elevavi</td></tr><tr><td>lui/lei</td><td class='regular'>elevava</td></tr><tr><td>noi</td><td class='regular'>elevavamo</td></tr><tr><td>voi</td><td class='regular'>elevavate</td></tr><tr><td>loro</td><td class='regular'>elevavano</td></tr></tbody></table></div>"
            },
            entrare: {
                term: "entrare",
                definition: "enter",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>entro</td></tr><tr><td>tu</td><td class='regular'>entri</td></tr><tr><td>lui/lei</td><td class='regular'>entra</td></tr><tr><td>noi</td><td class='regular'>entriamo</td></tr><tr><td>voi</td><td class='regular'>entrate</td></tr><tr><td>loro</td><td class='regular'>entrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>entravo</td></tr><tr><td>tu</td><td class='regular'>entravi</td></tr><tr><td>lui/lei</td><td class='regular'>entrava</td></tr><tr><td>noi</td><td class='regular'>entravamo</td></tr><tr><td>voi</td><td class='regular'>entravate</td></tr><tr><td>loro</td><td class='regular'>entravano</td></tr></tbody></table></div>"
            },
            escludere: {
                term: "escludere",
                definition: "exclude",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>escludo</td></tr><tr><td>tu</td><td class='regular'>escludi</td></tr><tr><td>lui/lei</td><td class='regular'>esclude</td></tr><tr><td>noi</td><td class='regular'>escludiamo</td></tr><tr><td>voi</td><td class='regular'>escludete</td></tr><tr><td>loro</td><td class='regular'>escludono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>escludevo</td></tr><tr><td>tu</td><td class='regular'>escludevi</td></tr><tr><td>lui/lei</td><td class='regular'>escludeva</td></tr><tr><td>noi</td><td class='regular'>escludevamo</td></tr><tr><td>voi</td><td class='regular'>escludevate</td></tr><tr><td>loro</td><td class='regular'>escludevano</td></tr></tbody></table></div>"
            },
            esistere: {
                term: "esistere",
                definition: "exist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>esisto</td></tr><tr><td>tu</td><td class='regular'>esisti</td></tr><tr><td>lui/lei</td><td class='regular'>esiste</td></tr><tr><td>noi</td><td class='regular'>esistiamo</td></tr><tr><td>voi</td><td class='regular'>esistete</td></tr><tr><td>loro</td><td class='regular'>esistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>esistevo</td></tr><tr><td>tu</td><td class='regular'>esistevi</td></tr><tr><td>lui/lei</td><td class='regular'>esisteva</td></tr><tr><td>noi</td><td class='regular'>esistevamo</td></tr><tr><td>voi</td><td class='regular'>esistevate</td></tr><tr><td>loro</td><td class='regular'>esistevano</td></tr></tbody></table></div>"
            },
            esporre: {
                term: "esporre",
                definition: "expose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>espongo</td></tr><tr><td>tu</td><td class='irregular'>esponi</td></tr><tr><td>lui/lei</td><td class='irregular'>espone</td></tr><tr><td>noi</td><td class='irregular'>esponiamo</td></tr><tr><td>voi</td><td class='irregular'>esponete</td></tr><tr><td>loro</td><td class='irregular'>espongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>esponevo</td></tr><tr><td>tu</td><td class='irregular'>esponevi</td></tr><tr><td>lui/lei</td><td class='irregular'>esponeva</td></tr><tr><td>noi</td><td class='irregular'>esponevamo</td></tr><tr><td>voi</td><td class='irregular'>esponevate</td></tr><tr><td>loro</td><td class='irregular'>esponevano</td></tr></tbody></table></div>"
            },
            esprimere: {
                term: "esprimere",
                definition: "express",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>esprimo</td></tr><tr><td>tu</td><td class='regular'>esprimi</td></tr><tr><td>lui/lei</td><td class='regular'>esprime</td></tr><tr><td>noi</td><td class='regular'>esprimiamo</td></tr><tr><td>voi</td><td class='regular'>esprimete</td></tr><tr><td>loro</td><td class='regular'>esprimono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>esprimevo</td></tr><tr><td>tu</td><td class='regular'>esprimevi</td></tr><tr><td>lui/lei</td><td class='regular'>esprimeva</td></tr><tr><td>noi</td><td class='regular'>esprimevamo</td></tr><tr><td>voi</td><td class='regular'>esprimevate</td></tr><tr><td>loro</td><td class='regular'>esprimevano</td></tr></tbody></table></div>"
            },
            essere: {
                term: "essere",
                definition: "be",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>sono</td></tr><tr><td>tu</td><td class='irregular'>sei</td></tr><tr><td>lui/lei</td><td class='irregular'>è</td></tr><tr><td>noi</td><td class='irregular'>siamo</td></tr><tr><td>voi</td><td class='irregular'>siete</td></tr><tr><td>loro</td><td class='irregular'>sono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>ero</td></tr><tr><td>tu</td><td class='irregular'>eri</td></tr><tr><td>lui/lei</td><td class='irregular'>era</td></tr><tr><td>noi</td><td class='irregular'>eravamo</td></tr><tr><td>voi</td><td class='irregular'>eravate</td></tr><tr><td>loro</td><td class='irregular'>erano</td></tr></tbody></table></div>"
            },
            estendere: {
                term: "estendere",
                definition: "extend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>estendo</td></tr><tr><td>tu</td><td class='regular'>estendi</td></tr><tr><td>lui/lei</td><td class='regular'>estende</td></tr><tr><td>noi</td><td class='regular'>estendiamo</td></tr><tr><td>voi</td><td class='regular'>estendete</td></tr><tr><td>loro</td><td class='regular'>estendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>estendevo</td></tr><tr><td>tu</td><td class='regular'>estendevi</td></tr><tr><td>lui/lei</td><td class='regular'>estendeva</td></tr><tr><td>noi</td><td class='regular'>estendevamo</td></tr><tr><td>voi</td><td class='regular'>estendevate</td></tr><tr><td>loro</td><td class='regular'>estendevano</td></tr></tbody></table></div>"
            },
            evitare: {
                term: "evitare",
                definition: "avoid",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>evito</td></tr><tr><td>tu</td><td class='regular'>eviti</td></tr><tr><td>lui/lei</td><td class='regular'>evita</td></tr><tr><td>noi</td><td class='regular'>evitiamo</td></tr><tr><td>voi</td><td class='regular'>evitate</td></tr><tr><td>loro</td><td class='regular'>evitano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>evitavo</td></tr><tr><td>tu</td><td class='regular'>evitavi</td></tr><tr><td>lui/lei</td><td class='regular'>evitava</td></tr><tr><td>noi</td><td class='regular'>evitavamo</td></tr><tr><td>voi</td><td class='regular'>evitavate</td></tr><tr><td>loro</td><td class='regular'>evitavano</td></tr></tbody></table></div>"
            },
            ferire: {
                term: "ferire",
                definition: "hurt",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>ferisco</td></tr><tr><td>tu</td><td class='irregular'>ferisci</td></tr><tr><td>lui/lei</td><td class='irregular'>ferisce</td></tr><tr><td>noi</td><td class='regular'>feriamo</td></tr><tr><td>voi</td><td class='regular'>ferite</td></tr><tr><td>loro</td><td class='irregular'>feriscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ferivo</td></tr><tr><td>tu</td><td class='regular'>ferivi</td></tr><tr><td>lui/lei</td><td class='regular'>feriva</td></tr><tr><td>noi</td><td class='regular'>ferivamo</td></tr><tr><td>voi</td><td class='regular'>ferivate</td></tr><tr><td>loro</td><td class='regular'>ferivano</td></tr></tbody></table></div>"
            },
            fermare: {
                term: "fermare",
                definition: "stop",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>fermo</td></tr><tr><td>tu</td><td class='regular'>fermi</td></tr><tr><td>lui/lei</td><td class='regular'>ferma</td></tr><tr><td>noi</td><td class='regular'>fermiamo</td></tr><tr><td>voi</td><td class='regular'>fermate</td></tr><tr><td>loro</td><td class='regular'>fermano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>fermavo</td></tr><tr><td>tu</td><td class='regular'>fermavi</td></tr><tr><td>lui/lei</td><td class='regular'>fermava</td></tr><tr><td>noi</td><td class='regular'>fermavamo</td></tr><tr><td>voi</td><td class='regular'>fermavate</td></tr><tr><td>loro</td><td class='regular'>fermavano</td></tr></tbody></table></div>"
            },
            figurare: {
                term: "figurare",
                definition: "appear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>figuro</td></tr><tr><td>tu</td><td class='regular'>figuri</td></tr><tr><td>lui/lei</td><td class='regular'>figura</td></tr><tr><td>noi</td><td class='regular'>figuriamo</td></tr><tr><td>voi</td><td class='regular'>figurate</td></tr><tr><td>loro</td><td class='regular'>figurano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>figuravo</td></tr><tr><td>tu</td><td class='regular'>figuravi</td></tr><tr><td>lui/lei</td><td class='regular'>figurava</td></tr><tr><td>noi</td><td class='regular'>figuravamo</td></tr><tr><td>voi</td><td class='regular'>figuravate</td></tr><tr><td>loro</td><td class='regular'>figuravano</td></tr></tbody></table></div>"
            },
            finire: {
                term: "finire",
                definition: "end",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>finisco</td></tr><tr><td>tu</td><td class='irregular'>finisci</td></tr><tr><td>lui/lei</td><td class='irregular'>finisce</td></tr><tr><td>noi</td><td class='regular'>finiamo</td></tr><tr><td>voi</td><td class='regular'>finite</td></tr><tr><td>loro</td><td class='irregular'>finiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>finivo</td></tr><tr><td>tu</td><td class='regular'>finivi</td></tr><tr><td>lui/lei</td><td class='regular'>finiva</td></tr><tr><td>noi</td><td class='regular'>finivamo</td></tr><tr><td>voi</td><td class='regular'>finivate</td></tr><tr><td>loro</td><td class='regular'>finivano</td></tr></tbody></table></div>"
            },
            fissare: {
                term: "fissare",
                definition: "fix",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>fisso</td></tr><tr><td>tu</td><td class='regular'>fissi</td></tr><tr><td>lui/lei</td><td class='regular'>fissa</td></tr><tr><td>noi</td><td class='regular'>fissiamo</td></tr><tr><td>voi</td><td class='regular'>fissate</td></tr><tr><td>loro</td><td class='regular'>fissano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>fissavo</td></tr><tr><td>tu</td><td class='regular'>fissavi</td></tr><tr><td>lui/lei</td><td class='regular'>fissava</td></tr><tr><td>noi</td><td class='regular'>fissavamo</td></tr><tr><td>voi</td><td class='regular'>fissavate</td></tr><tr><td>loro</td><td class='regular'>fissavano</td></tr></tbody></table></div>"
            },
            fondare: {
                term: "fondare",
                definition: "found",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>fondo</td></tr><tr><td>tu</td><td class='regular'>fondi</td></tr><tr><td>lui/lei</td><td class='regular'>fonda</td></tr><tr><td>noi</td><td class='regular'>fondiamo</td></tr><tr><td>voi</td><td class='regular'>fondate</td></tr><tr><td>loro</td><td class='regular'>fondano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>fondavo</td></tr><tr><td>tu</td><td class='regular'>fondavi</td></tr><tr><td>lui/lei</td><td class='regular'>fondava</td></tr><tr><td>noi</td><td class='regular'>fondavamo</td></tr><tr><td>voi</td><td class='regular'>fondavate</td></tr><tr><td>loro</td><td class='regular'>fondavano</td></tr></tbody></table></div>"
            },
            formare: {
                term: "formare",
                definition: "form",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>formo</td></tr><tr><td>tu</td><td class='regular'>formi</td></tr><tr><td>lui/lei</td><td class='regular'>forma</td></tr><tr><td>noi</td><td class='regular'>formiamo</td></tr><tr><td>voi</td><td class='regular'>formate</td></tr><tr><td>loro</td><td class='regular'>formano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>formavo</td></tr><tr><td>tu</td><td class='regular'>formavi</td></tr><tr><td>lui/lei</td><td class='regular'>formava</td></tr><tr><td>noi</td><td class='regular'>formavamo</td></tr><tr><td>voi</td><td class='regular'>formavate</td></tr><tr><td>loro</td><td class='regular'>formavano</td></tr></tbody></table></div>"
            },
            fornire: {
                term: "fornire",
                definition: "provide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>fornisco</td></tr><tr><td>tu</td><td class='irregular'>fornisci</td></tr><tr><td>lui/lei</td><td class='irregular'>fornisce</td></tr><tr><td>noi</td><td class='regular'>forniamo</td></tr><tr><td>voi</td><td class='regular'>fornite</td></tr><tr><td>loro</td><td class='irregular'>forniscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>fornivo</td></tr><tr><td>tu</td><td class='regular'>fornivi</td></tr><tr><td>lui/lei</td><td class='regular'>forniva</td></tr><tr><td>noi</td><td class='regular'>fornivamo</td></tr><tr><td>voi</td><td class='regular'>fornivate</td></tr><tr><td>loro</td><td class='regular'>fornivano</td></tr></tbody></table></div>"
            },
            fuggire: {
                term: "fuggire",
                definition: "flee",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>fuggo</td></tr><tr><td>tu</td><td class='regular'>fuggi</td></tr><tr><td>lui/lei</td><td class='regular'>fugge</td></tr><tr><td>noi</td><td class='regular'>fuggiamo</td></tr><tr><td>voi</td><td class='regular'>fuggite</td></tr><tr><td>loro</td><td class='regular'>fuggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>fuggivo</td></tr><tr><td>tu</td><td class='regular'>fuggivi</td></tr><tr><td>lui/lei</td><td class='regular'>fuggiva</td></tr><tr><td>noi</td><td class='regular'>fuggivamo</td></tr><tr><td>voi</td><td class='regular'>fuggivate</td></tr><tr><td>loro</td><td class='regular'>fuggivano</td></tr></tbody></table></div>"
            },
            fumare: {
                term: "fumare",
                definition: "smoke",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>fumo</td></tr><tr><td>tu</td><td class='regular'>fumi</td></tr><tr><td>lui/lei</td><td class='regular'>fuma</td></tr><tr><td>noi</td><td class='regular'>fumiamo</td></tr><tr><td>voi</td><td class='regular'>fumate</td></tr><tr><td>loro</td><td class='regular'>fumano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>fumavo</td></tr><tr><td>tu</td><td class='regular'>fumavi</td></tr><tr><td>lui/lei</td><td class='regular'>fumava</td></tr><tr><td>noi</td><td class='regular'>fumavamo</td></tr><tr><td>voi</td><td class='regular'>fumavate</td></tr><tr><td>loro</td><td class='regular'>fumavano</td></tr></tbody></table></div>"
            },
            gettare: {
                term: "gettare",
                definition: "throw",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>getto</td></tr><tr><td>tu</td><td class='regular'>getti</td></tr><tr><td>lui/lei</td><td class='regular'>getta</td></tr><tr><td>noi</td><td class='regular'>gettiamo</td></tr><tr><td>voi</td><td class='regular'>gettate</td></tr><tr><td>loro</td><td class='regular'>gettano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>gettavo</td></tr><tr><td>tu</td><td class='regular'>gettavi</td></tr><tr><td>lui/lei</td><td class='regular'>gettava</td></tr><tr><td>noi</td><td class='regular'>gettavamo</td></tr><tr><td>voi</td><td class='regular'>gettavate</td></tr><tr><td>loro</td><td class='regular'>gettavano</td></tr></tbody></table></div>"
            },
            giocare: {
                term: "giocare",
                definition: "play",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>gioco</td></tr><tr><td>tu</td><td class='regular'>giochi</td></tr><tr><td>lui/lei</td><td class='regular'>gioca</td></tr><tr><td>noi</td><td class='regular'>giochiamo</td></tr><tr><td>voi</td><td class='regular'>giocate</td></tr><tr><td>loro</td><td class='regular'>giocano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>giocavo</td></tr><tr><td>tu</td><td class='regular'>giocavi</td></tr><tr><td>lui/lei</td><td class='regular'>giocava</td></tr><tr><td>noi</td><td class='regular'>giocavamo</td></tr><tr><td>voi</td><td class='regular'>giocavate</td></tr><tr><td>loro</td><td class='regular'>giocavano</td></tr></tbody></table></div>"
            },
            girare: {
                term: "girare",
                definition: "turn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>giro</td></tr><tr><td>tu</td><td class='regular'>giri</td></tr><tr><td>lui/lei</td><td class='regular'>gira</td></tr><tr><td>noi</td><td class='regular'>giriamo</td></tr><tr><td>voi</td><td class='regular'>girate</td></tr><tr><td>loro</td><td class='regular'>girano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>giravo</td></tr><tr><td>tu</td><td class='regular'>giravi</td></tr><tr><td>lui/lei</td><td class='regular'>girava</td></tr><tr><td>noi</td><td class='regular'>giravamo</td></tr><tr><td>voi</td><td class='regular'>giravate</td></tr><tr><td>loro</td><td class='regular'>giravano</td></tr></tbody></table></div>"
            },
            giudicare: {
                term: "giudicare",
                definition: "judge",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>giudico</td></tr><tr><td>tu</td><td class='regular'>giudichi</td></tr><tr><td>lui/lei</td><td class='regular'>giudica</td></tr><tr><td>noi</td><td class='regular'>giudichiamo</td></tr><tr><td>voi</td><td class='regular'>giudicate</td></tr><tr><td>loro</td><td class='regular'>giudicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>giudicavo</td></tr><tr><td>tu</td><td class='regular'>giudicavi</td></tr><tr><td>lui/lei</td><td class='regular'>giudicava</td></tr><tr><td>noi</td><td class='regular'>giudicavamo</td></tr><tr><td>voi</td><td class='regular'>giudicavate</td></tr><tr><td>loro</td><td class='regular'>giudicavano</td></tr></tbody></table></div>"
            },
            giungere: {
                term: "giungere",
                definition: "reach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>giungo</td></tr><tr><td>tu</td><td class='regular'>giungi</td></tr><tr><td>lui/lei</td><td class='regular'>giunge</td></tr><tr><td>noi</td><td class='regular'>giungiamo</td></tr><tr><td>voi</td><td class='regular'>giungete</td></tr><tr><td>loro</td><td class='regular'>giungono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>giungevo</td></tr><tr><td>tu</td><td class='regular'>giungevi</td></tr><tr><td>lui/lei</td><td class='regular'>giungeva</td></tr><tr><td>noi</td><td class='regular'>giungevamo</td></tr><tr><td>voi</td><td class='regular'>giungevate</td></tr><tr><td>loro</td><td class='regular'>giungevano</td></tr></tbody></table></div>"
            },
            godere: {
                term: "godere",
                definition: "be happy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>godo</td></tr><tr><td>tu</td><td class='regular'>godi</td></tr><tr><td>lui/lei</td><td class='regular'>gode</td></tr><tr><td>noi</td><td class='regular'>godiamo</td></tr><tr><td>voi</td><td class='regular'>godete</td></tr><tr><td>loro</td><td class='regular'>godono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>godevo</td></tr><tr><td>tu</td><td class='regular'>godevi</td></tr><tr><td>lui/lei</td><td class='regular'>godeva</td></tr><tr><td>noi</td><td class='regular'>godevamo</td></tr><tr><td>voi</td><td class='regular'>godevate</td></tr><tr><td>loro</td><td class='regular'>godevano</td></tr></tbody></table></div>"
            },
            gridare: {
                term: "gridare",
                definition: "shout",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>grido</td></tr><tr><td>tu</td><td class='regular'>gridi</td></tr><tr><td>lui/lei</td><td class='regular'>grida</td></tr><tr><td>noi</td><td class='regular'>gridiamo</td></tr><tr><td>voi</td><td class='regular'>gridate</td></tr><tr><td>loro</td><td class='regular'>gridano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>gridavo</td></tr><tr><td>tu</td><td class='regular'>gridavi</td></tr><tr><td>lui/lei</td><td class='regular'>gridava</td></tr><tr><td>noi</td><td class='regular'>gridavamo</td></tr><tr><td>voi</td><td class='regular'>gridavate</td></tr><tr><td>loro</td><td class='regular'>gridavano</td></tr></tbody></table></div>"
            },
            guardare: {
                term: "guardare",
                definition: "look",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>guardo</td></tr><tr><td>tu</td><td class='regular'>guardi</td></tr><tr><td>lui/lei</td><td class='regular'>guarda</td></tr><tr><td>noi</td><td class='regular'>guardiamo</td></tr><tr><td>voi</td><td class='regular'>guardate</td></tr><tr><td>loro</td><td class='regular'>guardano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>guardavo</td></tr><tr><td>tu</td><td class='regular'>guardavi</td></tr><tr><td>lui/lei</td><td class='regular'>guardava</td></tr><tr><td>noi</td><td class='regular'>guardavamo</td></tr><tr><td>voi</td><td class='regular'>guardavate</td></tr><tr><td>loro</td><td class='regular'>guardavano</td></tr></tbody></table></div>"
            },
            guidare: {
                term: "guidare",
                definition: "lead",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>guido</td></tr><tr><td>tu</td><td class='regular'>guidi</td></tr><tr><td>lui/lei</td><td class='regular'>guida</td></tr><tr><td>noi</td><td class='regular'>guidiamo</td></tr><tr><td>voi</td><td class='regular'>guidate</td></tr><tr><td>loro</td><td class='regular'>guidano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>guidavo</td></tr><tr><td>tu</td><td class='regular'>guidavi</td></tr><tr><td>lui/lei</td><td class='regular'>guidava</td></tr><tr><td>noi</td><td class='regular'>guidavamo</td></tr><tr><td>voi</td><td class='regular'>guidavate</td></tr><tr><td>loro</td><td class='regular'>guidavano</td></tr></tbody></table></div>"
            },
            immaginare: {
                term: "immaginare",
                definition: "imagine",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>immagino</td></tr><tr><td>tu</td><td class='regular'>immagini</td></tr><tr><td>lui/lei</td><td class='regular'>immagina</td></tr><tr><td>noi</td><td class='regular'>immaginiamo</td></tr><tr><td>voi</td><td class='regular'>immaginate</td></tr><tr><td>loro</td><td class='regular'>immaginano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>immaginavo</td></tr><tr><td>tu</td><td class='regular'>immaginavi</td></tr><tr><td>lui/lei</td><td class='regular'>immaginava</td></tr><tr><td>noi</td><td class='regular'>immaginavamo</td></tr><tr><td>voi</td><td class='regular'>immaginavate</td></tr><tr><td>loro</td><td class='regular'>immaginavano</td></tr></tbody></table></div>"
            },
            imparare: {
                term: "imparare",
                definition: "learn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>imparo</td></tr><tr><td>tu</td><td class='regular'>impari</td></tr><tr><td>lui/lei</td><td class='regular'>impara</td></tr><tr><td>noi</td><td class='regular'>impariamo</td></tr><tr><td>voi</td><td class='regular'>imparate</td></tr><tr><td>loro</td><td class='regular'>imparano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>imparavo</td></tr><tr><td>tu</td><td class='regular'>imparavi</td></tr><tr><td>lui/lei</td><td class='regular'>imparava</td></tr><tr><td>noi</td><td class='regular'>imparavamo</td></tr><tr><td>voi</td><td class='regular'>imparavate</td></tr><tr><td>loro</td><td class='regular'>imparavano</td></tr></tbody></table></div>"
            },
            impedire: {
                term: "impedire",
                definition: "prevent",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>impedisco</td></tr><tr><td>tu</td><td class='irregular'>impedisci</td></tr><tr><td>lui/lei</td><td class='irregular'>impedisce</td></tr><tr><td>noi</td><td class='regular'>impediamo</td></tr><tr><td>voi</td><td class='regular'>impedite</td></tr><tr><td>loro</td><td class='irregular'>impediscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>impedivo</td></tr><tr><td>tu</td><td class='regular'>impedivi</td></tr><tr><td>lui/lei</td><td class='regular'>impediva</td></tr><tr><td>noi</td><td class='regular'>impedivamo</td></tr><tr><td>voi</td><td class='regular'>impedivate</td></tr><tr><td>loro</td><td class='regular'>impedivano</td></tr></tbody></table></div>"
            },
            importare: {
                term: "importare",
                definition: "import",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>importo</td></tr><tr><td>tu</td><td class='regular'>importi</td></tr><tr><td>lui/lei</td><td class='regular'>importa</td></tr><tr><td>noi</td><td class='regular'>importiamo</td></tr><tr><td>voi</td><td class='regular'>importate</td></tr><tr><td>loro</td><td class='regular'>importano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>importavo</td></tr><tr><td>tu</td><td class='regular'>importavi</td></tr><tr><td>lui/lei</td><td class='regular'>importava</td></tr><tr><td>noi</td><td class='regular'>importavamo</td></tr><tr><td>voi</td><td class='regular'>importavate</td></tr><tr><td>loro</td><td class='regular'>importavano</td></tr></tbody></table></div>"
            },
            imporre: {
                term: "imporre",
                definition: "impose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>impongo</td></tr><tr><td>tu</td><td class='irregular'>imponi</td></tr><tr><td>lui/lei</td><td class='irregular'>impone</td></tr><tr><td>noi</td><td class='irregular'>imponiamo</td></tr><tr><td>voi</td><td class='irregular'>imponete</td></tr><tr><td>loro</td><td class='irregular'>impongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>imponevo</td></tr><tr><td>tu</td><td class='irregular'>imponevi</td></tr><tr><td>lui/lei</td><td class='irregular'>imponeva</td></tr><tr><td>noi</td><td class='irregular'>imponevamo</td></tr><tr><td>voi</td><td class='irregular'>imponevate</td></tr><tr><td>loro</td><td class='irregular'>imponevano</td></tr></tbody></table></div>"
            },
            incontrare: {
                term: "incontrare",
                definition: "meet",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>incontro</td></tr><tr><td>tu</td><td class='regular'>incontri</td></tr><tr><td>lui/lei</td><td class='regular'>incontra</td></tr><tr><td>noi</td><td class='regular'>incontriamo</td></tr><tr><td>voi</td><td class='regular'>incontrate</td></tr><tr><td>loro</td><td class='regular'>incontrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>incontravo</td></tr><tr><td>tu</td><td class='regular'>incontravi</td></tr><tr><td>lui/lei</td><td class='regular'>incontrava</td></tr><tr><td>noi</td><td class='regular'>incontravamo</td></tr><tr><td>voi</td><td class='regular'>incontravate</td></tr><tr><td>loro</td><td class='regular'>incontravano</td></tr></tbody></table></div>"
            },
            indicare: {
                term: "indicare",
                definition: "indicate",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>indico</td></tr><tr><td>tu</td><td class='regular'>indichi</td></tr><tr><td>lui/lei</td><td class='regular'>indica</td></tr><tr><td>noi</td><td class='regular'>indichiamo</td></tr><tr><td>voi</td><td class='regular'>indicate</td></tr><tr><td>loro</td><td class='regular'>indicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>indicavo</td></tr><tr><td>tu</td><td class='regular'>indicavi</td></tr><tr><td>lui/lei</td><td class='regular'>indicava</td></tr><tr><td>noi</td><td class='regular'>indicavamo</td></tr><tr><td>voi</td><td class='regular'>indicavate</td></tr><tr><td>loro</td><td class='regular'>indicavano</td></tr></tbody></table></div>"
            },
            iniziare: {
                term: "iniziare",
                definition: "start",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>inizio</td></tr><tr><td>tu</td><td class='regular'>inizi</td></tr><tr><td>lui/lei</td><td class='regular'>inizia</td></tr><tr><td>noi</td><td class='regular'>iniziamo</td></tr><tr><td>voi</td><td class='regular'>iniziate</td></tr><tr><td>loro</td><td class='regular'>iniziano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>iniziavo</td></tr><tr><td>tu</td><td class='regular'>iniziavi</td></tr><tr><td>lui/lei</td><td class='regular'>iniziava</td></tr><tr><td>noi</td><td class='regular'>iniziavamo</td></tr><tr><td>voi</td><td class='regular'>iniziavate</td></tr><tr><td>loro</td><td class='regular'>iniziavano</td></tr></tbody></table></div>"
            },
            insegnare: {
                term: "insegnare",
                definition: "teach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>insegno</td></tr><tr><td>tu</td><td class='regular'>insegni</td></tr><tr><td>lui/lei</td><td class='regular'>insegna</td></tr><tr><td>noi</td><td class='regular'>insegniamo</td></tr><tr><td>voi</td><td class='regular'>insegnate</td></tr><tr><td>loro</td><td class='regular'>insegnano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>insegnavo</td></tr><tr><td>tu</td><td class='regular'>insegnavi</td></tr><tr><td>lui/lei</td><td class='regular'>insegnava</td></tr><tr><td>noi</td><td class='regular'>insegnavamo</td></tr><tr><td>voi</td><td class='regular'>insegnavate</td></tr><tr><td>loro</td><td class='regular'>insegnavano</td></tr></tbody></table></div>"
            },
            insistere: {
                term: "insistere",
                definition: "insist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>insisto</td></tr><tr><td>tu</td><td class='regular'>insisti</td></tr><tr><td>lui/lei</td><td class='regular'>insiste</td></tr><tr><td>noi</td><td class='regular'>insistiamo</td></tr><tr><td>voi</td><td class='regular'>insistete</td></tr><tr><td>loro</td><td class='regular'>insistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>insistevo</td></tr><tr><td>tu</td><td class='regular'>insistevi</td></tr><tr><td>lui/lei</td><td class='regular'>insisteva</td></tr><tr><td>noi</td><td class='regular'>insistevamo</td></tr><tr><td>voi</td><td class='regular'>insistevate</td></tr><tr><td>loro</td><td class='regular'>insistevano</td></tr></tbody></table></div>"
            },
            intendere: {
                term: "intendere",
                definition: "hear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>intendo</td></tr><tr><td>tu</td><td class='regular'>intendi</td></tr><tr><td>lui/lei</td><td class='regular'>intende</td></tr><tr><td>noi</td><td class='regular'>intendiamo</td></tr><tr><td>voi</td><td class='regular'>intendete</td></tr><tr><td>loro</td><td class='regular'>intendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>intendevo</td></tr><tr><td>tu</td><td class='regular'>intendevi</td></tr><tr><td>lui/lei</td><td class='regular'>intendeva</td></tr><tr><td>noi</td><td class='regular'>intendevamo</td></tr><tr><td>voi</td><td class='regular'>intendevate</td></tr><tr><td>loro</td><td class='regular'>intendevano</td></tr></tbody></table></div>"
            },
            interessare: {
                term: "interessare",
                definition: "affect",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>interesso</td></tr><tr><td>tu</td><td class='regular'>interessi</td></tr><tr><td>lui/lei</td><td class='regular'>interessa</td></tr><tr><td>noi</td><td class='regular'>interessiamo</td></tr><tr><td>voi</td><td class='regular'>interessate</td></tr><tr><td>loro</td><td class='regular'>interessano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>interessavo</td></tr><tr><td>tu</td><td class='regular'>interessavi</td></tr><tr><td>lui/lei</td><td class='regular'>interessava</td></tr><tr><td>noi</td><td class='regular'>interessavamo</td></tr><tr><td>voi</td><td class='regular'>interessavate</td></tr><tr><td>loro</td><td class='regular'>interessavano</td></tr></tbody></table></div>"
            },
            invitare: {
                term: "invitare",
                definition: "invite",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>invito</td></tr><tr><td>tu</td><td class='regular'>inviti</td></tr><tr><td>lui/lei</td><td class='regular'>invita</td></tr><tr><td>noi</td><td class='regular'>invitiamo</td></tr><tr><td>voi</td><td class='regular'>invitate</td></tr><tr><td>loro</td><td class='regular'>invitano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>invitavo</td></tr><tr><td>tu</td><td class='regular'>invitavi</td></tr><tr><td>lui/lei</td><td class='regular'>invitava</td></tr><tr><td>noi</td><td class='regular'>invitavamo</td></tr><tr><td>voi</td><td class='regular'>invitavate</td></tr><tr><td>loro</td><td class='regular'>invitavano</td></tr></tbody></table></div>"
            },
            lanciare: {
                term: "lanciare",
                definition: "launch",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>lancio</td></tr><tr><td>tu</td><td class='regular'>lanci</td></tr><tr><td>lui/lei</td><td class='regular'>lancia</td></tr><tr><td>noi</td><td class='regular'>lanciamo</td></tr><tr><td>voi</td><td class='regular'>lanciate</td></tr><tr><td>loro</td><td class='regular'>lanciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>lanciavo</td></tr><tr><td>tu</td><td class='regular'>lanciavi</td></tr><tr><td>lui/lei</td><td class='regular'>lanciava</td></tr><tr><td>noi</td><td class='regular'>lanciavamo</td></tr><tr><td>voi</td><td class='regular'>lanciavate</td></tr><tr><td>loro</td><td class='regular'>lanciavano</td></tr></tbody></table></div>"
            },
            lasciare: {
                term: "lasciare",
                definition: "leave",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>lascio</td></tr><tr><td>tu</td><td class='regular'>lasci</td></tr><tr><td>lui/lei</td><td class='regular'>lascia</td></tr><tr><td>noi</td><td class='regular'>lasciamo</td></tr><tr><td>voi</td><td class='regular'>lasciate</td></tr><tr><td>loro</td><td class='regular'>lasciano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>lasciavo</td></tr><tr><td>tu</td><td class='regular'>lasciavi</td></tr><tr><td>lui/lei</td><td class='regular'>lasciava</td></tr><tr><td>noi</td><td class='regular'>lasciavamo</td></tr><tr><td>voi</td><td class='regular'>lasciavate</td></tr><tr><td>loro</td><td class='regular'>lasciavano</td></tr></tbody></table></div>"
            },
            lavorare: {
                term: "lavorare",
                definition: "work",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>lavoro</td></tr><tr><td>tu</td><td class='regular'>lavori</td></tr><tr><td>lui/lei</td><td class='regular'>lavora</td></tr><tr><td>noi</td><td class='regular'>lavoriamo</td></tr><tr><td>voi</td><td class='regular'>lavorate</td></tr><tr><td>loro</td><td class='regular'>lavorano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>lavoravo</td></tr><tr><td>tu</td><td class='regular'>lavoravi</td></tr><tr><td>lui/lei</td><td class='regular'>lavorava</td></tr><tr><td>noi</td><td class='regular'>lavoravamo</td></tr><tr><td>voi</td><td class='regular'>lavoravate</td></tr><tr><td>loro</td><td class='regular'>lavoravano</td></tr></tbody></table></div>"
            },
            legare: {
                term: "legare",
                definition: "tie",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>lego</td></tr><tr><td>tu</td><td class='regular'>leghi</td></tr><tr><td>lui/lei</td><td class='regular'>lega</td></tr><tr><td>noi</td><td class='regular'>leghiamo</td></tr><tr><td>voi</td><td class='regular'>legate</td></tr><tr><td>loro</td><td class='regular'>legano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>legavo</td></tr><tr><td>tu</td><td class='regular'>legavi</td></tr><tr><td>lui/lei</td><td class='regular'>legava</td></tr><tr><td>noi</td><td class='regular'>legavamo</td></tr><tr><td>voi</td><td class='regular'>legavate</td></tr><tr><td>loro</td><td class='regular'>legavano</td></tr></tbody></table></div>"
            },
            leggere: {
                term: "leggere",
                definition: "read",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>leggo</td></tr><tr><td>tu</td><td class='regular'>leggi</td></tr><tr><td>lui/lei</td><td class='regular'>legge</td></tr><tr><td>noi</td><td class='regular'>leggiamo</td></tr><tr><td>voi</td><td class='regular'>leggete</td></tr><tr><td>loro</td><td class='regular'>leggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>leggevo</td></tr><tr><td>tu</td><td class='regular'>leggevi</td></tr><tr><td>lui/lei</td><td class='regular'>leggeva</td></tr><tr><td>noi</td><td class='regular'>leggevamo</td></tr><tr><td>voi</td><td class='regular'>leggevate</td></tr><tr><td>loro</td><td class='regular'>leggevano</td></tr></tbody></table></div>"
            },
            liberare: {
                term: "liberare",
                definition: "release",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>libero</td></tr><tr><td>tu</td><td class='regular'>liberi</td></tr><tr><td>lui/lei</td><td class='regular'>libera</td></tr><tr><td>noi</td><td class='regular'>liberiamo</td></tr><tr><td>voi</td><td class='regular'>liberate</td></tr><tr><td>loro</td><td class='regular'>liberano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>liberavo</td></tr><tr><td>tu</td><td class='regular'>liberavi</td></tr><tr><td>lui/lei</td><td class='regular'>liberava</td></tr><tr><td>noi</td><td class='regular'>liberavamo</td></tr><tr><td>voi</td><td class='regular'>liberavate</td></tr><tr><td>loro</td><td class='regular'>liberavano</td></tr></tbody></table></div>"
            },
            limitare: {
                term: "limitare",
                definition: "limit",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>limito</td></tr><tr><td>tu</td><td class='regular'>limiti</td></tr><tr><td>lui/lei</td><td class='regular'>limita</td></tr><tr><td>noi</td><td class='regular'>limitiamo</td></tr><tr><td>voi</td><td class='regular'>limitate</td></tr><tr><td>loro</td><td class='regular'>limitano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>limitavo</td></tr><tr><td>tu</td><td class='regular'>limitavi</td></tr><tr><td>lui/lei</td><td class='regular'>limitava</td></tr><tr><td>noi</td><td class='regular'>limitavamo</td></tr><tr><td>voi</td><td class='regular'>limitavate</td></tr><tr><td>loro</td><td class='regular'>limitavano</td></tr></tbody></table></div>"
            },
            mancare: {
                term: "mancare",
                definition: "miss",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>manco</td></tr><tr><td>tu</td><td class='regular'>manchi</td></tr><tr><td>lui/lei</td><td class='regular'>manca</td></tr><tr><td>noi</td><td class='regular'>manchiamo</td></tr><tr><td>voi</td><td class='regular'>mancate</td></tr><tr><td>loro</td><td class='regular'>mancano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>mancavo</td></tr><tr><td>tu</td><td class='regular'>mancavi</td></tr><tr><td>lui/lei</td><td class='regular'>mancava</td></tr><tr><td>noi</td><td class='regular'>mancavamo</td></tr><tr><td>voi</td><td class='regular'>mancavate</td></tr><tr><td>loro</td><td class='regular'>mancavano</td></tr></tbody></table></div>"
            },
            mandare: {
                term: "mandare",
                definition: "send",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>mando</td></tr><tr><td>tu</td><td class='regular'>mandi</td></tr><tr><td>lui/lei</td><td class='regular'>manda</td></tr><tr><td>noi</td><td class='regular'>mandiamo</td></tr><tr><td>voi</td><td class='regular'>mandate</td></tr><tr><td>loro</td><td class='regular'>mandano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>mandavo</td></tr><tr><td>tu</td><td class='regular'>mandavi</td></tr><tr><td>lui/lei</td><td class='regular'>mandava</td></tr><tr><td>noi</td><td class='regular'>mandavamo</td></tr><tr><td>voi</td><td class='regular'>mandavate</td></tr><tr><td>loro</td><td class='regular'>mandavano</td></tr></tbody></table></div>"
            },
            mangiare: {
                term: "mangiare",
                definition: "eat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>mangio</td></tr><tr><td>tu</td><td class='regular'>mangi</td></tr><tr><td>lui/lei</td><td class='regular'>mangia</td></tr><tr><td>noi</td><td class='regular'>mangiamo</td></tr><tr><td>voi</td><td class='regular'>mangiate</td></tr><tr><td>loro</td><td class='regular'>mangiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>mangiavo</td></tr><tr><td>tu</td><td class='regular'>mangiavi</td></tr><tr><td>lui/lei</td><td class='regular'>mangiava</td></tr><tr><td>noi</td><td class='regular'>mangiavamo</td></tr><tr><td>voi</td><td class='regular'>mangiavate</td></tr><tr><td>loro</td><td class='regular'>mangiavano</td></tr></tbody></table></div>"
            },
            mantenere: {
                term: "mantenere",
                definition: "keep",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>mantengo</td></tr><tr><td>tu</td><td class='irregular'>mantieni</td></tr><tr><td>lui/lei</td><td class='irregular'>mantiene</td></tr><tr><td>noi</td><td class='regular'>manteniamo</td></tr><tr><td>voi</td><td class='regular'>mantenete</td></tr><tr><td>loro</td><td class='irregular'>mantengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>mantenevo</td></tr><tr><td>tu</td><td class='regular'>mantenevi</td></tr><tr><td>lui/lei</td><td class='regular'>manteneva</td></tr><tr><td>noi</td><td class='regular'>mantenevamo</td></tr><tr><td>voi</td><td class='regular'>mantenevate</td></tr><tr><td>loro</td><td class='regular'>mantenevano</td></tr></tbody></table></div>"
            },
            meritare: {
                term: "meritare",
                definition: "deserve",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>merito</td></tr><tr><td>tu</td><td class='regular'>meriti</td></tr><tr><td>lui/lei</td><td class='regular'>merita</td></tr><tr><td>noi</td><td class='regular'>meritiamo</td></tr><tr><td>voi</td><td class='regular'>meritate</td></tr><tr><td>loro</td><td class='regular'>meritano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>meritavo</td></tr><tr><td>tu</td><td class='regular'>meritavi</td></tr><tr><td>lui/lei</td><td class='regular'>meritava</td></tr><tr><td>noi</td><td class='regular'>meritavamo</td></tr><tr><td>voi</td><td class='regular'>meritavate</td></tr><tr><td>loro</td><td class='regular'>meritavano</td></tr></tbody></table></div>"
            },
            mettere: {
                term: "mettere",
                definition: "put",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>metto</td></tr><tr><td>tu</td><td class='regular'>metti</td></tr><tr><td>lui/lei</td><td class='regular'>mette</td></tr><tr><td>noi</td><td class='regular'>mettiamo</td></tr><tr><td>voi</td><td class='regular'>mettete</td></tr><tr><td>loro</td><td class='regular'>mettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>mettevo</td></tr><tr><td>tu</td><td class='regular'>mettevi</td></tr><tr><td>lui/lei</td><td class='regular'>metteva</td></tr><tr><td>noi</td><td class='regular'>mettevamo</td></tr><tr><td>voi</td><td class='regular'>mettevate</td></tr><tr><td>loro</td><td class='regular'>mettevano</td></tr></tbody></table></div>"
            },
            morire: {
                term: "morire",
                definition: "die",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>muoio</td></tr><tr><td>tu</td><td class='irregular'>muori</td></tr><tr><td>lui/lei</td><td class='irregular'>muore</td></tr><tr><td>noi</td><td class='regular'>moriamo</td></tr><tr><td>voi</td><td class='regular'>morite</td></tr><tr><td>loro</td><td class='irregular'>muoiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>morivo</td></tr><tr><td>tu</td><td class='regular'>morivi</td></tr><tr><td>lui/lei</td><td class='regular'>moriva</td></tr><tr><td>noi</td><td class='regular'>morivamo</td></tr><tr><td>voi</td><td class='regular'>morivate</td></tr><tr><td>loro</td><td class='regular'>morivano</td></tr></tbody></table></div>"
            },
            mostrare: {
                term: "mostrare",
                definition: "show",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>mostro</td></tr><tr><td>tu</td><td class='regular'>mostri</td></tr><tr><td>lui/lei</td><td class='regular'>mostra</td></tr><tr><td>noi</td><td class='regular'>mostriamo</td></tr><tr><td>voi</td><td class='regular'>mostrate</td></tr><tr><td>loro</td><td class='regular'>mostrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>mostravo</td></tr><tr><td>tu</td><td class='regular'>mostravi</td></tr><tr><td>lui/lei</td><td class='regular'>mostrava</td></tr><tr><td>noi</td><td class='regular'>mostravamo</td></tr><tr><td>voi</td><td class='regular'>mostravate</td></tr><tr><td>loro</td><td class='regular'>mostravano</td></tr></tbody></table></div>"
            },
            muovere: {
                term: "muovere",
                definition: "move",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>muovo</td></tr><tr><td>tu</td><td class='regular'>muovi</td></tr><tr><td>lui/lei</td><td class='regular'>muove</td></tr><tr><td>noi</td><td class='regular'>muoviamo</td></tr><tr><td>voi</td><td class='regular'>muovete</td></tr><tr><td>loro</td><td class='regular'>muovono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>muovevo</td></tr><tr><td>tu</td><td class='regular'>muovevi</td></tr><tr><td>lui/lei</td><td class='regular'>muoveva</td></tr><tr><td>noi</td><td class='regular'>muovevamo</td></tr><tr><td>voi</td><td class='regular'>muovevate</td></tr><tr><td>loro</td><td class='regular'>muovevano</td></tr></tbody></table></div>"
            },
            nascere: {
                term: "nascere",
                definition: "be born",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>nasco</td></tr><tr><td>tu</td><td class='regular'>nasci</td></tr><tr><td>lui/lei</td><td class='regular'>nasce</td></tr><tr><td>noi</td><td class='regular'>nasciamo</td></tr><tr><td>voi</td><td class='regular'>nascete</td></tr><tr><td>loro</td><td class='regular'>nascono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>nascevo</td></tr><tr><td>tu</td><td class='regular'>nascevi</td></tr><tr><td>lui/lei</td><td class='regular'>nasceva</td></tr><tr><td>noi</td><td class='regular'>nascevamo</td></tr><tr><td>voi</td><td class='regular'>nascevate</td></tr><tr><td>loro</td><td class='regular'>nascevano</td></tr></tbody></table></div>"
            },
            nascondere: {
                term: "nascondere",
                definition: "hide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>nascondo</td></tr><tr><td>tu</td><td class='regular'>nascondi</td></tr><tr><td>lui/lei</td><td class='regular'>nasconde</td></tr><tr><td>noi</td><td class='regular'>nascondiamo</td></tr><tr><td>voi</td><td class='regular'>nascondete</td></tr><tr><td>loro</td><td class='regular'>nascondono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>nascondevo</td></tr><tr><td>tu</td><td class='regular'>nascondevi</td></tr><tr><td>lui/lei</td><td class='regular'>nascondeva</td></tr><tr><td>noi</td><td class='regular'>nascondevamo</td></tr><tr><td>voi</td><td class='regular'>nascondevate</td></tr><tr><td>loro</td><td class='regular'>nascondevano</td></tr></tbody></table></div>"
            },
            notare: {
                term: "notare",
                definition: "note",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>noto</td></tr><tr><td>tu</td><td class='regular'>noti</td></tr><tr><td>lui/lei</td><td class='regular'>nota</td></tr><tr><td>noi</td><td class='regular'>notiamo</td></tr><tr><td>voi</td><td class='regular'>notate</td></tr><tr><td>loro</td><td class='regular'>notano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>notavo</td></tr><tr><td>tu</td><td class='regular'>notavi</td></tr><tr><td>lui/lei</td><td class='regular'>notava</td></tr><tr><td>noi</td><td class='regular'>notavamo</td></tr><tr><td>voi</td><td class='regular'>notavate</td></tr><tr><td>loro</td><td class='regular'>notavano</td></tr></tbody></table></div>"
            },
            offendere: {
                term: "offendere",
                definition: "offend",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>offendo</td></tr><tr><td>tu</td><td class='regular'>offendi</td></tr><tr><td>lui/lei</td><td class='regular'>offende</td></tr><tr><td>noi</td><td class='regular'>offendiamo</td></tr><tr><td>voi</td><td class='regular'>offendete</td></tr><tr><td>loro</td><td class='regular'>offendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>offendevo</td></tr><tr><td>tu</td><td class='regular'>offendevi</td></tr><tr><td>lui/lei</td><td class='regular'>offendeva</td></tr><tr><td>noi</td><td class='regular'>offendevamo</td></tr><tr><td>voi</td><td class='regular'>offendevate</td></tr><tr><td>loro</td><td class='regular'>offendevano</td></tr></tbody></table></div>"
            },
            offrire: {
                term: "offrire",
                definition: "offer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>offro</td></tr><tr><td>tu</td><td class='regular'>offri</td></tr><tr><td>lui/lei</td><td class='regular'>offre</td></tr><tr><td>noi</td><td class='regular'>offriamo</td></tr><tr><td>voi</td><td class='regular'>offrite</td></tr><tr><td>loro</td><td class='regular'>offrono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>offrivo</td></tr><tr><td>tu</td><td class='regular'>offrivi</td></tr><tr><td>lui/lei</td><td class='regular'>offriva</td></tr><tr><td>noi</td><td class='regular'>offrivamo</td></tr><tr><td>voi</td><td class='regular'>offrivate</td></tr><tr><td>loro</td><td class='regular'>offrivano</td></tr></tbody></table></div>"
            },
            opporre: {
                term: "opporre",
                definition: "offer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>oppongo</td></tr><tr><td>tu</td><td class='irregular'>opponi</td></tr><tr><td>lui/lei</td><td class='irregular'>oppone</td></tr><tr><td>noi</td><td class='irregular'>opponiamo</td></tr><tr><td>voi</td><td class='irregular'>opponete</td></tr><tr><td>loro</td><td class='irregular'>oppongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>opponevo</td></tr><tr><td>tu</td><td class='irregular'>opponevi</td></tr><tr><td>lui/lei</td><td class='irregular'>opponeva</td></tr><tr><td>noi</td><td class='irregular'>opponevamo</td></tr><tr><td>voi</td><td class='irregular'>opponevate</td></tr><tr><td>loro</td><td class='irregular'>opponevano</td></tr></tbody></table></div>"
            },
            ordinare: {
                term: "ordinare",
                definition: "order",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ordino</td></tr><tr><td>tu</td><td class='regular'>ordini</td></tr><tr><td>lui/lei</td><td class='regular'>ordina</td></tr><tr><td>noi</td><td class='regular'>ordiniamo</td></tr><tr><td>voi</td><td class='regular'>ordinate</td></tr><tr><td>loro</td><td class='regular'>ordinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ordinavo</td></tr><tr><td>tu</td><td class='regular'>ordinavi</td></tr><tr><td>lui/lei</td><td class='regular'>ordinava</td></tr><tr><td>noi</td><td class='regular'>ordinavamo</td></tr><tr><td>voi</td><td class='regular'>ordinavate</td></tr><tr><td>loro</td><td class='regular'>ordinavano</td></tr></tbody></table></div>"
            },
            organizzare: {
                term: "organizzare",
                definition: "organize",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>organizzo</td></tr><tr><td>tu</td><td class='regular'>organizzi</td></tr><tr><td>lui/lei</td><td class='regular'>organizza</td></tr><tr><td>noi</td><td class='regular'>organizziamo</td></tr><tr><td>voi</td><td class='regular'>organizzate</td></tr><tr><td>loro</td><td class='regular'>organizzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>organizzavo</td></tr><tr><td>tu</td><td class='regular'>organizzavi</td></tr><tr><td>lui/lei</td><td class='regular'>organizzava</td></tr><tr><td>noi</td><td class='regular'>organizzavamo</td></tr><tr><td>voi</td><td class='regular'>organizzavate</td></tr><tr><td>loro</td><td class='regular'>organizzavano</td></tr></tbody></table></div>"
            },
            osservare: {
                term: "osservare",
                definition: "observe",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>osservo</td></tr><tr><td>tu</td><td class='regular'>osservi</td></tr><tr><td>lui/lei</td><td class='regular'>osserva</td></tr><tr><td>noi</td><td class='regular'>osserviamo</td></tr><tr><td>voi</td><td class='regular'>osservate</td></tr><tr><td>loro</td><td class='regular'>osservano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>osservavo</td></tr><tr><td>tu</td><td class='regular'>osservavi</td></tr><tr><td>lui/lei</td><td class='regular'>osservava</td></tr><tr><td>noi</td><td class='regular'>osservavamo</td></tr><tr><td>voi</td><td class='regular'>osservavate</td></tr><tr><td>loro</td><td class='regular'>osservavano</td></tr></tbody></table></div>"
            },
            ottenere: {
                term: "ottenere",
                definition: "get",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>ottengo</td></tr><tr><td>tu</td><td class='irregular'>ottieni</td></tr><tr><td>lui/lei</td><td class='irregular'>ottiene</td></tr><tr><td>noi</td><td class='regular'>otteniamo</td></tr><tr><td>voi</td><td class='regular'>ottenete</td></tr><tr><td>loro</td><td class='irregular'>ottengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ottenevo</td></tr><tr><td>tu</td><td class='regular'>ottenevi</td></tr><tr><td>lui/lei</td><td class='regular'>otteneva</td></tr><tr><td>noi</td><td class='regular'>ottenevamo</td></tr><tr><td>voi</td><td class='regular'>ottenevate</td></tr><tr><td>loro</td><td class='regular'>ottenevano</td></tr></tbody></table></div>"
            },
            pagare: {
                term: "pagare",
                definition: "pay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>pago</td></tr><tr><td>tu</td><td class='regular'>paghi</td></tr><tr><td>lui/lei</td><td class='regular'>paga</td></tr><tr><td>noi</td><td class='regular'>paghiamo</td></tr><tr><td>voi</td><td class='regular'>pagate</td></tr><tr><td>loro</td><td class='regular'>pagano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>pagavo</td></tr><tr><td>tu</td><td class='regular'>pagavi</td></tr><tr><td>lui/lei</td><td class='regular'>pagava</td></tr><tr><td>noi</td><td class='regular'>pagavamo</td></tr><tr><td>voi</td><td class='regular'>pagavate</td></tr><tr><td>loro</td><td class='regular'>pagavano</td></tr></tbody></table></div>"
            },
            parere: {
                term: "parere",
                definition: "opinion",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>paio</td></tr><tr><td>tu</td><td class='regular'>pari</td></tr><tr><td>lui/lei</td><td class='regular'>pare</td></tr><tr><td>noi</td><td class='irregular'>paiamo</td></tr><tr><td>voi</td><td class='regular'>parete</td></tr><tr><td>loro</td><td class='irregular'>paiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>parevo</td></tr><tr><td>tu</td><td class='regular'>parevi</td></tr><tr><td>lui/lei</td><td class='regular'>pareva</td></tr><tr><td>noi</td><td class='regular'>parevamo</td></tr><tr><td>voi</td><td class='regular'>parevate</td></tr><tr><td>loro</td><td class='regular'>parevano</td></tr></tbody></table></div>"
            },
            parlare: {
                term: "parlare",
                definition: "speak",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>parlo</td></tr><tr><td>tu</td><td class='regular'>parli</td></tr><tr><td>lui/lei</td><td class='regular'>parla</td></tr><tr><td>noi</td><td class='regular'>parliamo</td></tr><tr><td>voi</td><td class='regular'>parlate</td></tr><tr><td>loro</td><td class='regular'>parlano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>parlavo</td></tr><tr><td>tu</td><td class='regular'>parlavi</td></tr><tr><td>lui/lei</td><td class='regular'>parlava</td></tr><tr><td>noi</td><td class='regular'>parlavamo</td></tr><tr><td>voi</td><td class='regular'>parlavate</td></tr><tr><td>loro</td><td class='regular'>parlavano</td></tr></tbody></table></div>"
            },
            partecipare: {
                term: "partecipare",
                definition: "take part",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>partecipo</td></tr><tr><td>tu</td><td class='regular'>partecipi</td></tr><tr><td>lui/lei</td><td class='regular'>partecipa</td></tr><tr><td>noi</td><td class='regular'>partecipiamo</td></tr><tr><td>voi</td><td class='regular'>partecipate</td></tr><tr><td>loro</td><td class='regular'>partecipano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>partecipavo</td></tr><tr><td>tu</td><td class='regular'>partecipavi</td></tr><tr><td>lui/lei</td><td class='regular'>partecipava</td></tr><tr><td>noi</td><td class='regular'>partecipavamo</td></tr><tr><td>voi</td><td class='regular'>partecipavate</td></tr><tr><td>loro</td><td class='regular'>partecipavano</td></tr></tbody></table></div>"
            },
            partire: {
                term: "partire",
                definition: "leave",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>parto</td></tr><tr><td>tu</td><td class='regular'>parti</td></tr><tr><td>lui/lei</td><td class='regular'>parte</td></tr><tr><td>noi</td><td class='regular'>partiamo</td></tr><tr><td>voi</td><td class='regular'>partite</td></tr><tr><td>loro</td><td class='regular'>partono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>partivo</td></tr><tr><td>tu</td><td class='regular'>partivi</td></tr><tr><td>lui/lei</td><td class='regular'>partiva</td></tr><tr><td>noi</td><td class='regular'>partivamo</td></tr><tr><td>voi</td><td class='regular'>partivate</td></tr><tr><td>loro</td><td class='regular'>partivano</td></tr></tbody></table></div>"
            },
            passare: {
                term: "passare",
                definition: "switch",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>passo</td></tr><tr><td>tu</td><td class='regular'>passi</td></tr><tr><td>lui/lei</td><td class='regular'>passa</td></tr><tr><td>noi</td><td class='regular'>passiamo</td></tr><tr><td>voi</td><td class='regular'>passate</td></tr><tr><td>loro</td><td class='regular'>passano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>passavo</td></tr><tr><td>tu</td><td class='regular'>passavi</td></tr><tr><td>lui/lei</td><td class='regular'>passava</td></tr><tr><td>noi</td><td class='regular'>passavamo</td></tr><tr><td>voi</td><td class='regular'>passavate</td></tr><tr><td>loro</td><td class='regular'>passavano</td></tr></tbody></table></div>"
            },
            pensare: {
                term: "pensare",
                definition: "think",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>penso</td></tr><tr><td>tu</td><td class='regular'>pensi</td></tr><tr><td>lui/lei</td><td class='regular'>pensa</td></tr><tr><td>noi</td><td class='regular'>pensiamo</td></tr><tr><td>voi</td><td class='regular'>pensate</td></tr><tr><td>loro</td><td class='regular'>pensano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>pensavo</td></tr><tr><td>tu</td><td class='regular'>pensavi</td></tr><tr><td>lui/lei</td><td class='regular'>pensava</td></tr><tr><td>noi</td><td class='regular'>pensavamo</td></tr><tr><td>voi</td><td class='regular'>pensavate</td></tr><tr><td>loro</td><td class='regular'>pensavano</td></tr></tbody></table></div>"
            },
            perdere: {
                term: "perdere",
                definition: "lose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>perdo</td></tr><tr><td>tu</td><td class='regular'>perdi</td></tr><tr><td>lui/lei</td><td class='regular'>perde</td></tr><tr><td>noi</td><td class='regular'>perdiamo</td></tr><tr><td>voi</td><td class='regular'>perdete</td></tr><tr><td>loro</td><td class='regular'>perdono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>perdevo</td></tr><tr><td>tu</td><td class='regular'>perdevi</td></tr><tr><td>lui/lei</td><td class='regular'>perdeva</td></tr><tr><td>noi</td><td class='regular'>perdevamo</td></tr><tr><td>voi</td><td class='regular'>perdevate</td></tr><tr><td>loro</td><td class='regular'>perdevano</td></tr></tbody></table></div>"
            },
            permettere: {
                term: "permettere",
                definition: "allow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>permetto</td></tr><tr><td>tu</td><td class='regular'>permetti</td></tr><tr><td>lui/lei</td><td class='regular'>permette</td></tr><tr><td>noi</td><td class='regular'>permettiamo</td></tr><tr><td>voi</td><td class='regular'>permettete</td></tr><tr><td>loro</td><td class='regular'>permettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>permettevo</td></tr><tr><td>tu</td><td class='regular'>permettevi</td></tr><tr><td>lui/lei</td><td class='regular'>permetteva</td></tr><tr><td>noi</td><td class='regular'>permettevamo</td></tr><tr><td>voi</td><td class='regular'>permettevate</td></tr><tr><td>loro</td><td class='regular'>permettevano</td></tr></tbody></table></div>"
            },
            pesare: {
                term: "pesare",
                definition: "weigh",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>peso</td></tr><tr><td>tu</td><td class='regular'>pesi</td></tr><tr><td>lui/lei</td><td class='regular'>pesa</td></tr><tr><td>noi</td><td class='regular'>pesiamo</td></tr><tr><td>voi</td><td class='regular'>pesate</td></tr><tr><td>loro</td><td class='regular'>pesano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>pesavo</td></tr><tr><td>tu</td><td class='regular'>pesavi</td></tr><tr><td>lui/lei</td><td class='regular'>pesava</td></tr><tr><td>noi</td><td class='regular'>pesavamo</td></tr><tr><td>voi</td><td class='regular'>pesavate</td></tr><tr><td>loro</td><td class='regular'>pesavano</td></tr></tbody></table></div>"
            },
            piacere: {
                term: "piacere",
                definition: "pleasure",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>piaccio</td></tr><tr><td>tu</td><td class='regular'>piaci</td></tr><tr><td>lui/lei</td><td class='regular'>piace</td></tr><tr><td>noi</td><td class='irregular'>piacciamo</td></tr><tr><td>voi</td><td class='regular'>piacete</td></tr><tr><td>loro</td><td class='irregular'>piacciono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>piacevo</td></tr><tr><td>tu</td><td class='regular'>piacevi</td></tr><tr><td>lui/lei</td><td class='regular'>piaceva</td></tr><tr><td>noi</td><td class='regular'>piacevamo</td></tr><tr><td>voi</td><td class='regular'>piacevate</td></tr><tr><td>loro</td><td class='regular'>piacevano</td></tr></tbody></table></div>"
            },
            piangere: {
                term: "piangere",
                definition: "cry",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>piango</td></tr><tr><td>tu</td><td class='regular'>piangi</td></tr><tr><td>lui/lei</td><td class='regular'>piange</td></tr><tr><td>noi</td><td class='regular'>piangiamo</td></tr><tr><td>voi</td><td class='regular'>piangete</td></tr><tr><td>loro</td><td class='regular'>piangono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>piangevo</td></tr><tr><td>tu</td><td class='regular'>piangevi</td></tr><tr><td>lui/lei</td><td class='regular'>piangeva</td></tr><tr><td>noi</td><td class='regular'>piangevamo</td></tr><tr><td>voi</td><td class='regular'>piangevate</td></tr><tr><td>loro</td><td class='regular'>piangevano</td></tr></tbody></table></div>"
            },
            piantare: {
                term: "piantare",
                definition: "plant",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>pianto</td></tr><tr><td>tu</td><td class='regular'>pianti</td></tr><tr><td>lui/lei</td><td class='regular'>pianta</td></tr><tr><td>noi</td><td class='regular'>piantiamo</td></tr><tr><td>voi</td><td class='regular'>piantate</td></tr><tr><td>loro</td><td class='regular'>piantano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>piantavo</td></tr><tr><td>tu</td><td class='regular'>piantavi</td></tr><tr><td>lui/lei</td><td class='regular'>piantava</td></tr><tr><td>noi</td><td class='regular'>piantavamo</td></tr><tr><td>voi</td><td class='regular'>piantavate</td></tr><tr><td>loro</td><td class='regular'>piantavano</td></tr></tbody></table></div>"
            },
            porre: {
                term: "porre",
                definition: "place",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>pongo</td></tr><tr><td>tu</td><td class='irregular'>poni</td></tr><tr><td>lui/lei</td><td class='irregular'>pone</td></tr><tr><td>noi</td><td class='irregular'>poniamo</td></tr><tr><td>voi</td><td class='irregular'>ponete</td></tr><tr><td>loro</td><td class='irregular'>pongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>ponevo</td></tr><tr><td>tu</td><td class='irregular'>ponevi</td></tr><tr><td>lui/lei</td><td class='irregular'>poneva</td></tr><tr><td>noi</td><td class='irregular'>ponevamo</td></tr><tr><td>voi</td><td class='irregular'>ponevate</td></tr><tr><td>loro</td><td class='irregular'>ponevano</td></tr></tbody></table></div>"
            },
            portare: {
                term: "portare",
                definition: "bring",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>porto</td></tr><tr><td>tu</td><td class='regular'>porti</td></tr><tr><td>lui/lei</td><td class='regular'>porta</td></tr><tr><td>noi</td><td class='regular'>portiamo</td></tr><tr><td>voi</td><td class='regular'>portate</td></tr><tr><td>loro</td><td class='regular'>portano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>portavo</td></tr><tr><td>tu</td><td class='regular'>portavi</td></tr><tr><td>lui/lei</td><td class='regular'>portava</td></tr><tr><td>noi</td><td class='regular'>portavamo</td></tr><tr><td>voi</td><td class='regular'>portavate</td></tr><tr><td>loro</td><td class='regular'>portavano</td></tr></tbody></table></div>"
            },
            possedere: {
                term: "possedere",
                definition: "own",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>possiedo</td></tr><tr><td>tu</td><td class='irregular'>possiedi</td></tr><tr><td>lui/lei</td><td class='irregular'>possiede</td></tr><tr><td>noi</td><td class='regular'>possediamo</td></tr><tr><td>voi</td><td class='regular'>possedete</td></tr><tr><td>loro</td><td class='irregular'>possiedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>possedevo</td></tr><tr><td>tu</td><td class='regular'>possedevi</td></tr><tr><td>lui/lei</td><td class='regular'>possedeva</td></tr><tr><td>noi</td><td class='regular'>possedevamo</td></tr><tr><td>voi</td><td class='regular'>possedevate</td></tr><tr><td>loro</td><td class='regular'>possedevano</td></tr></tbody></table></div>"
            },
            potere: {
                term: "potere",
                definition: "power",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>posso</td></tr><tr><td>tu</td><td class='irregular'>puoi</td></tr><tr><td>lui/lei</td><td class='irregular'>può</td></tr><tr><td>noi</td><td class='irregular'>possiamo</td></tr><tr><td>voi</td><td class='regular'>potete</td></tr><tr><td>loro</td><td class='irregular'>possono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>potevo</td></tr><tr><td>tu</td><td class='regular'>potevi</td></tr><tr><td>lui/lei</td><td class='regular'>poteva</td></tr><tr><td>noi</td><td class='regular'>potevamo</td></tr><tr><td>voi</td><td class='regular'>potevate</td></tr><tr><td>loro</td><td class='regular'>potevano</td></tr></tbody></table></div>"
            },
            preferire: {
                term: "preferire",
                definition: "prefer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>preferisco</td></tr><tr><td>tu</td><td class='irregular'>preferisci</td></tr><tr><td>lui/lei</td><td class='irregular'>preferisce</td></tr><tr><td>noi</td><td class='regular'>preferiamo</td></tr><tr><td>voi</td><td class='regular'>preferite</td></tr><tr><td>loro</td><td class='irregular'>preferiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>preferivo</td></tr><tr><td>tu</td><td class='regular'>preferivi</td></tr><tr><td>lui/lei</td><td class='regular'>preferiva</td></tr><tr><td>noi</td><td class='regular'>preferivamo</td></tr><tr><td>voi</td><td class='regular'>preferivate</td></tr><tr><td>loro</td><td class='regular'>preferivano</td></tr></tbody></table></div>"
            },
            pregare: {
                term: "pregare",
                definition: "pray",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>prego</td></tr><tr><td>tu</td><td class='regular'>preghi</td></tr><tr><td>lui/lei</td><td class='regular'>prega</td></tr><tr><td>noi</td><td class='regular'>preghiamo</td></tr><tr><td>voi</td><td class='regular'>pregate</td></tr><tr><td>loro</td><td class='regular'>pregano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>pregavo</td></tr><tr><td>tu</td><td class='regular'>pregavi</td></tr><tr><td>lui/lei</td><td class='regular'>pregava</td></tr><tr><td>noi</td><td class='regular'>pregavamo</td></tr><tr><td>voi</td><td class='regular'>pregavate</td></tr><tr><td>loro</td><td class='regular'>pregavano</td></tr></tbody></table></div>"
            },
            prendere: {
                term: "prendere",
                definition: "take",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>prendo</td></tr><tr><td>tu</td><td class='regular'>prendi</td></tr><tr><td>lui/lei</td><td class='regular'>prende</td></tr><tr><td>noi</td><td class='regular'>prendiamo</td></tr><tr><td>voi</td><td class='regular'>prendete</td></tr><tr><td>loro</td><td class='regular'>prendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>prendevo</td></tr><tr><td>tu</td><td class='regular'>prendevi</td></tr><tr><td>lui/lei</td><td class='regular'>prendeva</td></tr><tr><td>noi</td><td class='regular'>prendevamo</td></tr><tr><td>voi</td><td class='regular'>prendevate</td></tr><tr><td>loro</td><td class='regular'>prendevano</td></tr></tbody></table></div>"
            },
            preparare: {
                term: "preparare",
                definition: "prepare",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>preparo</td></tr><tr><td>tu</td><td class='regular'>prepari</td></tr><tr><td>lui/lei</td><td class='regular'>prepara</td></tr><tr><td>noi</td><td class='regular'>prepariamo</td></tr><tr><td>voi</td><td class='regular'>preparate</td></tr><tr><td>loro</td><td class='regular'>preparano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>preparavo</td></tr><tr><td>tu</td><td class='regular'>preparavi</td></tr><tr><td>lui/lei</td><td class='regular'>preparava</td></tr><tr><td>noi</td><td class='regular'>preparavamo</td></tr><tr><td>voi</td><td class='regular'>preparavate</td></tr><tr><td>loro</td><td class='regular'>preparavano</td></tr></tbody></table></div>"
            },
            presentare: {
                term: "presentare",
                definition: "present",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>presento</td></tr><tr><td>tu</td><td class='regular'>presenti</td></tr><tr><td>lui/lei</td><td class='regular'>presenta</td></tr><tr><td>noi</td><td class='regular'>presentiamo</td></tr><tr><td>voi</td><td class='regular'>presentate</td></tr><tr><td>loro</td><td class='regular'>presentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>presentavo</td></tr><tr><td>tu</td><td class='regular'>presentavi</td></tr><tr><td>lui/lei</td><td class='regular'>presentava</td></tr><tr><td>noi</td><td class='regular'>presentavamo</td></tr><tr><td>voi</td><td class='regular'>presentavate</td></tr><tr><td>loro</td><td class='regular'>presentavano</td></tr></tbody></table></div>"
            },
            procedere: {
                term: "procedere",
                definition: "continue",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>procedo</td></tr><tr><td>tu</td><td class='regular'>procedi</td></tr><tr><td>lui/lei</td><td class='regular'>procede</td></tr><tr><td>noi</td><td class='regular'>procediamo</td></tr><tr><td>voi</td><td class='regular'>procedete</td></tr><tr><td>loro</td><td class='regular'>procedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>procedevo</td></tr><tr><td>tu</td><td class='regular'>procedevi</td></tr><tr><td>lui/lei</td><td class='regular'>procedeva</td></tr><tr><td>noi</td><td class='regular'>procedevamo</td></tr><tr><td>voi</td><td class='regular'>procedevate</td></tr><tr><td>loro</td><td class='regular'>procedevano</td></tr></tbody></table></div>"
            },
            produrre: {
                term: "produrre",
                definition: "produce",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>produco</td></tr><tr><td>tu</td><td class='irregular'>produci</td></tr><tr><td>lui/lei</td><td class='irregular'>produce</td></tr><tr><td>noi</td><td class='irregular'>produciamo</td></tr><tr><td>voi</td><td class='irregular'>producete</td></tr><tr><td>loro</td><td class='irregular'>producono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>producevo</td></tr><tr><td>tu</td><td class='irregular'>producevi</td></tr><tr><td>lui/lei</td><td class='irregular'>produceva</td></tr><tr><td>noi</td><td class='irregular'>producevamo</td></tr><tr><td>voi</td><td class='irregular'>producevate</td></tr><tr><td>loro</td><td class='irregular'>producevano</td></tr></tbody></table></div>"
            },
            promettere: {
                term: "promettere",
                definition: "promise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>prometto</td></tr><tr><td>tu</td><td class='regular'>prometti</td></tr><tr><td>lui/lei</td><td class='regular'>promette</td></tr><tr><td>noi</td><td class='regular'>promettiamo</td></tr><tr><td>voi</td><td class='regular'>promettete</td></tr><tr><td>loro</td><td class='regular'>promettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>promettevo</td></tr><tr><td>tu</td><td class='regular'>promettevi</td></tr><tr><td>lui/lei</td><td class='regular'>prometteva</td></tr><tr><td>noi</td><td class='regular'>promettevamo</td></tr><tr><td>voi</td><td class='regular'>promettevate</td></tr><tr><td>loro</td><td class='regular'>promettevano</td></tr></tbody></table></div>"
            },
            proporre: {
                term: "proporre",
                definition: "propose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>propongo</td></tr><tr><td>tu</td><td class='irregular'>proponi</td></tr><tr><td>lui/lei</td><td class='irregular'>propone</td></tr><tr><td>noi</td><td class='irregular'>proponiamo</td></tr><tr><td>voi</td><td class='irregular'>proponete</td></tr><tr><td>loro</td><td class='irregular'>propongono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>proponevo</td></tr><tr><td>tu</td><td class='irregular'>proponevi</td></tr><tr><td>lui/lei</td><td class='irregular'>proponeva</td></tr><tr><td>noi</td><td class='irregular'>proponevamo</td></tr><tr><td>voi</td><td class='irregular'>proponevate</td></tr><tr><td>loro</td><td class='irregular'>proponevano</td></tr></tbody></table></div>"
            },
            provare: {
                term: "provare",
                definition: "try",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>provo</td></tr><tr><td>tu</td><td class='regular'>provi</td></tr><tr><td>lui/lei</td><td class='regular'>prova</td></tr><tr><td>noi</td><td class='regular'>proviamo</td></tr><tr><td>voi</td><td class='regular'>provate</td></tr><tr><td>loro</td><td class='regular'>provano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>provavo</td></tr><tr><td>tu</td><td class='regular'>provavi</td></tr><tr><td>lui/lei</td><td class='regular'>provava</td></tr><tr><td>noi</td><td class='regular'>provavamo</td></tr><tr><td>voi</td><td class='regular'>provavate</td></tr><tr><td>loro</td><td class='regular'>provavano</td></tr></tbody></table></div>"
            },
            provocare: {
                term: "provocare",
                definition: "cause",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>provoco</td></tr><tr><td>tu</td><td class='regular'>provochi</td></tr><tr><td>lui/lei</td><td class='regular'>provoca</td></tr><tr><td>noi</td><td class='regular'>provochiamo</td></tr><tr><td>voi</td><td class='regular'>provocate</td></tr><tr><td>loro</td><td class='regular'>provocano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>provocavo</td></tr><tr><td>tu</td><td class='regular'>provocavi</td></tr><tr><td>lui/lei</td><td class='regular'>provocava</td></tr><tr><td>noi</td><td class='regular'>provocavamo</td></tr><tr><td>voi</td><td class='regular'>provocavate</td></tr><tr><td>loro</td><td class='regular'>provocavano</td></tr></tbody></table></div>"
            },
            provvedere: {
                term: "provvedere",
                definition: "provide",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>provvedo</td></tr><tr><td>tu</td><td class='regular'>provvedi</td></tr><tr><td>lui/lei</td><td class='regular'>provvede</td></tr><tr><td>noi</td><td class='regular'>provvediamo</td></tr><tr><td>voi</td><td class='regular'>provvedete</td></tr><tr><td>loro</td><td class='regular'>provvedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>provvedevo</td></tr><tr><td>tu</td><td class='regular'>provvedevi</td></tr><tr><td>lui/lei</td><td class='regular'>provvedeva</td></tr><tr><td>noi</td><td class='regular'>provvedevamo</td></tr><tr><td>voi</td><td class='regular'>provvedevate</td></tr><tr><td>loro</td><td class='regular'>provvedevano</td></tr></tbody></table></div>"
            },
            pubblicare: {
                term: "pubblicare",
                definition: "publish",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>pubblico</td></tr><tr><td>tu</td><td class='regular'>pubblichi</td></tr><tr><td>lui/lei</td><td class='regular'>pubblica</td></tr><tr><td>noi</td><td class='regular'>pubblichiamo</td></tr><tr><td>voi</td><td class='regular'>pubblicate</td></tr><tr><td>loro</td><td class='regular'>pubblicano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>pubblicavo</td></tr><tr><td>tu</td><td class='regular'>pubblicavi</td></tr><tr><td>lui/lei</td><td class='regular'>pubblicava</td></tr><tr><td>noi</td><td class='regular'>pubblicavamo</td></tr><tr><td>voi</td><td class='regular'>pubblicavate</td></tr><tr><td>loro</td><td class='regular'>pubblicavano</td></tr></tbody></table></div>"
            },
            raccogliere: {
                term: "raccogliere",
                definition: "gather",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>raccolgo</td></tr><tr><td>tu</td><td class='irregular'>raccogli</td></tr><tr><td>lui/lei</td><td class='regular'>raccoglie</td></tr><tr><td>noi</td><td class='irregular'>raccogliamo</td></tr><tr><td>voi</td><td class='regular'>raccogliete</td></tr><tr><td>loro</td><td class='irregular'>raccolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>raccoglievo</td></tr><tr><td>tu</td><td class='regular'>raccoglievi</td></tr><tr><td>lui/lei</td><td class='regular'>raccoglieva</td></tr><tr><td>noi</td><td class='regular'>raccoglievamo</td></tr><tr><td>voi</td><td class='regular'>raccoglievate</td></tr><tr><td>loro</td><td class='regular'>raccoglievano</td></tr></tbody></table></div>"
            },
            raccontare: {
                term: "raccontare",
                definition: "tell",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>racconto</td></tr><tr><td>tu</td><td class='regular'>racconti</td></tr><tr><td>lui/lei</td><td class='regular'>racconta</td></tr><tr><td>noi</td><td class='regular'>raccontiamo</td></tr><tr><td>voi</td><td class='regular'>raccontate</td></tr><tr><td>loro</td><td class='regular'>raccontano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>raccontavo</td></tr><tr><td>tu</td><td class='regular'>raccontavi</td></tr><tr><td>lui/lei</td><td class='regular'>raccontava</td></tr><tr><td>noi</td><td class='regular'>raccontavamo</td></tr><tr><td>voi</td><td class='regular'>raccontavate</td></tr><tr><td>loro</td><td class='regular'>raccontavano</td></tr></tbody></table></div>"
            },
            raggiungere: {
                term: "raggiungere",
                definition: "reach",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>raggiungo</td></tr><tr><td>tu</td><td class='regular'>raggiungi</td></tr><tr><td>lui/lei</td><td class='regular'>raggiunge</td></tr><tr><td>noi</td><td class='regular'>raggiungiamo</td></tr><tr><td>voi</td><td class='regular'>raggiungete</td></tr><tr><td>loro</td><td class='regular'>raggiungono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>raggiungevo</td></tr><tr><td>tu</td><td class='regular'>raggiungevi</td></tr><tr><td>lui/lei</td><td class='regular'>raggiungeva</td></tr><tr><td>noi</td><td class='regular'>raggiungevamo</td></tr><tr><td>voi</td><td class='regular'>raggiungevate</td></tr><tr><td>loro</td><td class='regular'>raggiungevano</td></tr></tbody></table></div>"
            },
            rappresentare: {
                term: "rappresentare",
                definition: "represent",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rappresento</td></tr><tr><td>tu</td><td class='regular'>rappresenti</td></tr><tr><td>lui/lei</td><td class='regular'>rappresenta</td></tr><tr><td>noi</td><td class='regular'>rappresentiamo</td></tr><tr><td>voi</td><td class='regular'>rappresentate</td></tr><tr><td>loro</td><td class='regular'>rappresentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rappresentavo</td></tr><tr><td>tu</td><td class='regular'>rappresentavi</td></tr><tr><td>lui/lei</td><td class='regular'>rappresentava</td></tr><tr><td>noi</td><td class='regular'>rappresentavamo</td></tr><tr><td>voi</td><td class='regular'>rappresentavate</td></tr><tr><td>loro</td><td class='regular'>rappresentavano</td></tr></tbody></table></div>"
            },
            rendere: {
                term: "rendere",
                definition: "make",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rendo</td></tr><tr><td>tu</td><td class='regular'>rendi</td></tr><tr><td>lui/lei</td><td class='regular'>rende</td></tr><tr><td>noi</td><td class='regular'>rendiamo</td></tr><tr><td>voi</td><td class='regular'>rendete</td></tr><tr><td>loro</td><td class='regular'>rendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rendevo</td></tr><tr><td>tu</td><td class='regular'>rendevi</td></tr><tr><td>lui/lei</td><td class='regular'>rendeva</td></tr><tr><td>noi</td><td class='regular'>rendevamo</td></tr><tr><td>voi</td><td class='regular'>rendevate</td></tr><tr><td>loro</td><td class='regular'>rendevano</td></tr></tbody></table></div>"
            },
            resistere: {
                term: "resistere",
                definition: "resist",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>resisto</td></tr><tr><td>tu</td><td class='regular'>resisti</td></tr><tr><td>lui/lei</td><td class='regular'>resiste</td></tr><tr><td>noi</td><td class='regular'>resistiamo</td></tr><tr><td>voi</td><td class='regular'>resistete</td></tr><tr><td>loro</td><td class='regular'>resistono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>resistevo</td></tr><tr><td>tu</td><td class='regular'>resistevi</td></tr><tr><td>lui/lei</td><td class='regular'>resisteva</td></tr><tr><td>noi</td><td class='regular'>resistevamo</td></tr><tr><td>voi</td><td class='regular'>resistevate</td></tr><tr><td>loro</td><td class='regular'>resistevano</td></tr></tbody></table></div>"
            },
            restare: {
                term: "restare",
                definition: "stay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>resto</td></tr><tr><td>tu</td><td class='regular'>resti</td></tr><tr><td>lui/lei</td><td class='regular'>resta</td></tr><tr><td>noi</td><td class='regular'>restiamo</td></tr><tr><td>voi</td><td class='regular'>restate</td></tr><tr><td>loro</td><td class='regular'>restano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>restavo</td></tr><tr><td>tu</td><td class='regular'>restavi</td></tr><tr><td>lui/lei</td><td class='regular'>restava</td></tr><tr><td>noi</td><td class='regular'>restavamo</td></tr><tr><td>voi</td><td class='regular'>restavate</td></tr><tr><td>loro</td><td class='regular'>restavano</td></tr></tbody></table></div>"
            },
            ricevere: {
                term: "ricevere",
                definition: "receive",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ricevo</td></tr><tr><td>tu</td><td class='regular'>ricevi</td></tr><tr><td>lui/lei</td><td class='regular'>riceve</td></tr><tr><td>noi</td><td class='regular'>riceviamo</td></tr><tr><td>voi</td><td class='regular'>ricevete</td></tr><tr><td>loro</td><td class='regular'>ricevono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ricevevo</td></tr><tr><td>tu</td><td class='regular'>ricevevi</td></tr><tr><td>lui/lei</td><td class='regular'>riceveva</td></tr><tr><td>noi</td><td class='regular'>ricevevamo</td></tr><tr><td>voi</td><td class='regular'>ricevevate</td></tr><tr><td>loro</td><td class='regular'>ricevevano</td></tr></tbody></table></div>"
            },
            riconoscere: {
                term: "riconoscere",
                definition: "recognize",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>riconosco</td></tr><tr><td>tu</td><td class='regular'>riconosci</td></tr><tr><td>lui/lei</td><td class='regular'>riconosce</td></tr><tr><td>noi</td><td class='regular'>riconosciamo</td></tr><tr><td>voi</td><td class='regular'>riconoscete</td></tr><tr><td>loro</td><td class='regular'>riconoscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riconoscevo</td></tr><tr><td>tu</td><td class='regular'>riconoscevi</td></tr><tr><td>lui/lei</td><td class='regular'>riconosceva</td></tr><tr><td>noi</td><td class='regular'>riconoscevamo</td></tr><tr><td>voi</td><td class='regular'>riconoscevate</td></tr><tr><td>loro</td><td class='regular'>riconoscevano</td></tr></tbody></table></div>"
            },
            ricordare: {
                term: "ricordare",
                definition: "remember",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ricordo</td></tr><tr><td>tu</td><td class='regular'>ricordi</td></tr><tr><td>lui/lei</td><td class='regular'>ricorda</td></tr><tr><td>noi</td><td class='regular'>ricordiamo</td></tr><tr><td>voi</td><td class='regular'>ricordate</td></tr><tr><td>loro</td><td class='regular'>ricordano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ricordavo</td></tr><tr><td>tu</td><td class='regular'>ricordavi</td></tr><tr><td>lui/lei</td><td class='regular'>ricordava</td></tr><tr><td>noi</td><td class='regular'>ricordavamo</td></tr><tr><td>voi</td><td class='regular'>ricordavate</td></tr><tr><td>loro</td><td class='regular'>ricordavano</td></tr></tbody></table></div>"
            },
            ridere: {
                term: "ridere",
                definition: "laugh",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rido</td></tr><tr><td>tu</td><td class='regular'>ridi</td></tr><tr><td>lui/lei</td><td class='regular'>ride</td></tr><tr><td>noi</td><td class='regular'>ridiamo</td></tr><tr><td>voi</td><td class='regular'>ridete</td></tr><tr><td>loro</td><td class='regular'>ridono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ridevo</td></tr><tr><td>tu</td><td class='regular'>ridevi</td></tr><tr><td>lui/lei</td><td class='regular'>rideva</td></tr><tr><td>noi</td><td class='regular'>ridevamo</td></tr><tr><td>voi</td><td class='regular'>ridevate</td></tr><tr><td>loro</td><td class='regular'>ridevano</td></tr></tbody></table></div>"
            },
            ridurre: {
                term: "ridurre",
                definition: "reduce",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>riduco</td></tr><tr><td>tu</td><td class='irregular'>riduci</td></tr><tr><td>lui/lei</td><td class='irregular'>riduce</td></tr><tr><td>noi</td><td class='irregular'>riduciamo</td></tr><tr><td>voi</td><td class='irregular'>riducete</td></tr><tr><td>loro</td><td class='irregular'>riducono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='irregular'>riducevo</td></tr><tr><td>tu</td><td class='irregular'>riducevi</td></tr><tr><td>lui/lei</td><td class='irregular'>riduceva</td></tr><tr><td>noi</td><td class='irregular'>riducevamo</td></tr><tr><td>voi</td><td class='irregular'>riducevate</td></tr><tr><td>loro</td><td class='irregular'>riducevano</td></tr></tbody></table></div>"
            },
            riempire: {
                term: "riempire",
                definition: "fill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>riempio</td></tr><tr><td>tu</td><td class='regular'>riempi</td></tr><tr><td>lui/lei</td><td class='irregular'>riempie</td></tr><tr><td>noi</td><td class='regular'>riempiamo</td></tr><tr><td>voi</td><td class='regular'>riempite</td></tr><tr><td>loro</td><td class='irregular'>riempiono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riempivo</td></tr><tr><td>tu</td><td class='regular'>riempivi</td></tr><tr><td>lui/lei</td><td class='regular'>riempiva</td></tr><tr><td>noi</td><td class='regular'>riempivamo</td></tr><tr><td>voi</td><td class='regular'>riempivate</td></tr><tr><td>loro</td><td class='regular'>riempivano</td></tr></tbody></table></div>"
            },
            riferire: {
                term: "riferire",
                definition: "report",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>riferisco</td></tr><tr><td>tu</td><td class='irregular'>riferisci</td></tr><tr><td>lui/lei</td><td class='irregular'>riferisce</td></tr><tr><td>noi</td><td class='regular'>riferiamo</td></tr><tr><td>voi</td><td class='regular'>riferite</td></tr><tr><td>loro</td><td class='irregular'>riferiscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riferivo</td></tr><tr><td>tu</td><td class='regular'>riferivi</td></tr><tr><td>lui/lei</td><td class='regular'>riferiva</td></tr><tr><td>noi</td><td class='regular'>riferivamo</td></tr><tr><td>voi</td><td class='regular'>riferivate</td></tr><tr><td>loro</td><td class='regular'>riferivano</td></tr></tbody></table></div>"
            },
            riguardare: {
                term: "riguardare",
                definition: "concern",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>riguardo</td></tr><tr><td>tu</td><td class='regular'>riguardi</td></tr><tr><td>lui/lei</td><td class='regular'>riguarda</td></tr><tr><td>noi</td><td class='regular'>riguardiamo</td></tr><tr><td>voi</td><td class='regular'>riguardate</td></tr><tr><td>loro</td><td class='regular'>riguardano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riguardavo</td></tr><tr><td>tu</td><td class='regular'>riguardavi</td></tr><tr><td>lui/lei</td><td class='regular'>riguardava</td></tr><tr><td>noi</td><td class='regular'>riguardavamo</td></tr><tr><td>voi</td><td class='regular'>riguardavate</td></tr><tr><td>loro</td><td class='regular'>riguardavano</td></tr></tbody></table></div>"
            },
            rimanere: {
                term: "rimanere",
                definition: "stay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>rimango</td></tr><tr><td>tu</td><td class='regular'>rimani</td></tr><tr><td>lui/lei</td><td class='regular'>rimane</td></tr><tr><td>noi</td><td class='regular'>rimaniamo</td></tr><tr><td>voi</td><td class='regular'>rimanete</td></tr><tr><td>loro</td><td class='irregular'>rimangono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rimanevo</td></tr><tr><td>tu</td><td class='regular'>rimanevi</td></tr><tr><td>lui/lei</td><td class='regular'>rimaneva</td></tr><tr><td>noi</td><td class='regular'>rimanevamo</td></tr><tr><td>voi</td><td class='regular'>rimanevate</td></tr><tr><td>loro</td><td class='regular'>rimanevano</td></tr></tbody></table></div>"
            },
            rimettere: {
                term: "rimettere",
                definition: "return",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rimetto</td></tr><tr><td>tu</td><td class='regular'>rimetti</td></tr><tr><td>lui/lei</td><td class='regular'>rimette</td></tr><tr><td>noi</td><td class='regular'>rimettiamo</td></tr><tr><td>voi</td><td class='regular'>rimettete</td></tr><tr><td>loro</td><td class='regular'>rimettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rimettevo</td></tr><tr><td>tu</td><td class='regular'>rimettevi</td></tr><tr><td>lui/lei</td><td class='regular'>rimetteva</td></tr><tr><td>noi</td><td class='regular'>rimettevamo</td></tr><tr><td>voi</td><td class='regular'>rimettevate</td></tr><tr><td>loro</td><td class='regular'>rimettevano</td></tr></tbody></table></div>"
            },
            ringraziare: {
                term: "ringraziare",
                definition: "thank",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ringrazio</td></tr><tr><td>tu</td><td class='regular'>ringrazi</td></tr><tr><td>lui/lei</td><td class='regular'>ringrazia</td></tr><tr><td>noi</td><td class='regular'>ringraziamo</td></tr><tr><td>voi</td><td class='regular'>ringraziate</td></tr><tr><td>loro</td><td class='regular'>ringraziano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ringraziavo</td></tr><tr><td>tu</td><td class='regular'>ringraziavi</td></tr><tr><td>lui/lei</td><td class='regular'>ringraziava</td></tr><tr><td>noi</td><td class='regular'>ringraziavamo</td></tr><tr><td>voi</td><td class='regular'>ringraziavate</td></tr><tr><td>loro</td><td class='regular'>ringraziavano</td></tr></tbody></table></div>"
            },
            ripetere: {
                term: "ripetere",
                definition: "repeat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ripeto</td></tr><tr><td>tu</td><td class='regular'>ripeti</td></tr><tr><td>lui/lei</td><td class='regular'>ripete</td></tr><tr><td>noi</td><td class='regular'>ripetiamo</td></tr><tr><td>voi</td><td class='regular'>ripetete</td></tr><tr><td>loro</td><td class='regular'>ripetono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ripetevo</td></tr><tr><td>tu</td><td class='regular'>ripetevi</td></tr><tr><td>lui/lei</td><td class='regular'>ripeteva</td></tr><tr><td>noi</td><td class='regular'>ripetevamo</td></tr><tr><td>voi</td><td class='regular'>ripetevate</td></tr><tr><td>loro</td><td class='regular'>ripetevano</td></tr></tbody></table></div>"
            },
            riportare: {
                term: "riportare",
                definition: "report",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>riporto</td></tr><tr><td>tu</td><td class='regular'>riporti</td></tr><tr><td>lui/lei</td><td class='regular'>riporta</td></tr><tr><td>noi</td><td class='regular'>riportiamo</td></tr><tr><td>voi</td><td class='regular'>riportate</td></tr><tr><td>loro</td><td class='regular'>riportano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riportavo</td></tr><tr><td>tu</td><td class='regular'>riportavi</td></tr><tr><td>lui/lei</td><td class='regular'>riportava</td></tr><tr><td>noi</td><td class='regular'>riportavamo</td></tr><tr><td>voi</td><td class='regular'>riportavate</td></tr><tr><td>loro</td><td class='regular'>riportavano</td></tr></tbody></table></div>"
            },
            riprendere: {
                term: "riprendere",
                definition: "resume",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>riprendo</td></tr><tr><td>tu</td><td class='regular'>riprendi</td></tr><tr><td>lui/lei</td><td class='regular'>riprende</td></tr><tr><td>noi</td><td class='regular'>riprendiamo</td></tr><tr><td>voi</td><td class='regular'>riprendete</td></tr><tr><td>loro</td><td class='regular'>riprendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riprendevo</td></tr><tr><td>tu</td><td class='regular'>riprendevi</td></tr><tr><td>lui/lei</td><td class='regular'>riprendeva</td></tr><tr><td>noi</td><td class='regular'>riprendevamo</td></tr><tr><td>voi</td><td class='regular'>riprendevate</td></tr><tr><td>loro</td><td class='regular'>riprendevano</td></tr></tbody></table></div>"
            },
            risolvere: {
                term: "risolvere",
                definition: "solve",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>risolvo</td></tr><tr><td>tu</td><td class='regular'>risolvi</td></tr><tr><td>lui/lei</td><td class='regular'>risolve</td></tr><tr><td>noi</td><td class='regular'>risolviamo</td></tr><tr><td>voi</td><td class='regular'>risolvete</td></tr><tr><td>loro</td><td class='regular'>risolvono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>risolvevo</td></tr><tr><td>tu</td><td class='regular'>risolvevi</td></tr><tr><td>lui/lei</td><td class='regular'>risolveva</td></tr><tr><td>noi</td><td class='regular'>risolvevamo</td></tr><tr><td>voi</td><td class='regular'>risolvevate</td></tr><tr><td>loro</td><td class='regular'>risolvevano</td></tr></tbody></table></div>"
            },
            rispondere: {
                term: "rispondere",
                definition: "answer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rispondo</td></tr><tr><td>tu</td><td class='regular'>rispondi</td></tr><tr><td>lui/lei</td><td class='regular'>risponde</td></tr><tr><td>noi</td><td class='regular'>rispondiamo</td></tr><tr><td>voi</td><td class='regular'>rispondete</td></tr><tr><td>loro</td><td class='regular'>rispondono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rispondevo</td></tr><tr><td>tu</td><td class='regular'>rispondevi</td></tr><tr><td>lui/lei</td><td class='regular'>rispondeva</td></tr><tr><td>noi</td><td class='regular'>rispondevamo</td></tr><tr><td>voi</td><td class='regular'>rispondevate</td></tr><tr><td>loro</td><td class='regular'>rispondevano</td></tr></tbody></table></div>"
            },
            risultare: {
                term: "risultare",
                definition: "result",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>risulto</td></tr><tr><td>tu</td><td class='regular'>risulti</td></tr><tr><td>lui/lei</td><td class='regular'>risulta</td></tr><tr><td>noi</td><td class='regular'>risultiamo</td></tr><tr><td>voi</td><td class='regular'>risultate</td></tr><tr><td>loro</td><td class='regular'>risultano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>risultavo</td></tr><tr><td>tu</td><td class='regular'>risultavi</td></tr><tr><td>lui/lei</td><td class='regular'>risultava</td></tr><tr><td>noi</td><td class='regular'>risultavamo</td></tr><tr><td>voi</td><td class='regular'>risultavate</td></tr><tr><td>loro</td><td class='regular'>risultavano</td></tr></tbody></table></div>"
            },
            ritenere: {
                term: "ritenere",
                definition: "consider",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>ritengo</td></tr><tr><td>tu</td><td class='irregular'>ritieni</td></tr><tr><td>lui/lei</td><td class='irregular'>ritiene</td></tr><tr><td>noi</td><td class='regular'>riteniamo</td></tr><tr><td>voi</td><td class='regular'>ritenete</td></tr><tr><td>loro</td><td class='irregular'>ritengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ritenevo</td></tr><tr><td>tu</td><td class='regular'>ritenevi</td></tr><tr><td>lui/lei</td><td class='regular'>riteneva</td></tr><tr><td>noi</td><td class='regular'>ritenevamo</td></tr><tr><td>voi</td><td class='regular'>ritenevate</td></tr><tr><td>loro</td><td class='regular'>ritenevano</td></tr></tbody></table></div>"
            },
            ritornare: {
                term: "ritornare",
                definition: "return",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>ritorno</td></tr><tr><td>tu</td><td class='regular'>ritorni</td></tr><tr><td>lui/lei</td><td class='regular'>ritorna</td></tr><tr><td>noi</td><td class='regular'>ritorniamo</td></tr><tr><td>voi</td><td class='regular'>ritornate</td></tr><tr><td>loro</td><td class='regular'>ritornano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>ritornavo</td></tr><tr><td>tu</td><td class='regular'>ritornavi</td></tr><tr><td>lui/lei</td><td class='regular'>ritornava</td></tr><tr><td>noi</td><td class='regular'>ritornavamo</td></tr><tr><td>voi</td><td class='regular'>ritornavate</td></tr><tr><td>loro</td><td class='regular'>ritornavano</td></tr></tbody></table></div>"
            },
            riunire: {
                term: "riunire",
                definition: "gather",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>riunisco</td></tr><tr><td>tu</td><td class='irregular'>riunisci</td></tr><tr><td>lui/lei</td><td class='irregular'>riunisce</td></tr><tr><td>noi</td><td class='regular'>riuniamo</td></tr><tr><td>voi</td><td class='regular'>riunite</td></tr><tr><td>loro</td><td class='irregular'>riuniscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riunivo</td></tr><tr><td>tu</td><td class='regular'>riunivi</td></tr><tr><td>lui/lei</td><td class='regular'>riuniva</td></tr><tr><td>noi</td><td class='regular'>riunivamo</td></tr><tr><td>voi</td><td class='regular'>riunivate</td></tr><tr><td>loro</td><td class='regular'>riunivano</td></tr></tbody></table></div>"
            },
            riuscire: {
                term: "riuscire",
                definition: "succeed",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>riesco</td></tr><tr><td>tu</td><td class='irregular'>riesci</td></tr><tr><td>lui/lei</td><td class='irregular'>riesce</td></tr><tr><td>noi</td><td class='regular'>riusciamo</td></tr><tr><td>voi</td><td class='regular'>riuscite</td></tr><tr><td>loro</td><td class='irregular'>riescono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>riuscivo</td></tr><tr><td>tu</td><td class='regular'>riuscivi</td></tr><tr><td>lui/lei</td><td class='regular'>riusciva</td></tr><tr><td>noi</td><td class='regular'>riuscivamo</td></tr><tr><td>voi</td><td class='regular'>riuscivate</td></tr><tr><td>loro</td><td class='regular'>riuscivano</td></tr></tbody></table></div>"
            },
            rivedere: {
                term: "rivedere",
                definition: "review",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rivedo</td></tr><tr><td>tu</td><td class='regular'>rivedi</td></tr><tr><td>lui/lei</td><td class='regular'>rivede</td></tr><tr><td>noi</td><td class='regular'>rivediamo</td></tr><tr><td>voi</td><td class='regular'>rivedete</td></tr><tr><td>loro</td><td class='regular'>rivedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rivedevo</td></tr><tr><td>tu</td><td class='regular'>rivedevi</td></tr><tr><td>lui/lei</td><td class='regular'>rivedeva</td></tr><tr><td>noi</td><td class='regular'>rivedevamo</td></tr><tr><td>voi</td><td class='regular'>rivedevate</td></tr><tr><td>loro</td><td class='regular'>rivedevano</td></tr></tbody></table></div>"
            },
            rivelare: {
                term: "rivelare",
                definition: "reveal",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rivelo</td></tr><tr><td>tu</td><td class='regular'>riveli</td></tr><tr><td>lui/lei</td><td class='regular'>rivela</td></tr><tr><td>noi</td><td class='regular'>riveliamo</td></tr><tr><td>voi</td><td class='regular'>rivelate</td></tr><tr><td>loro</td><td class='regular'>rivelano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rivelavo</td></tr><tr><td>tu</td><td class='regular'>rivelavi</td></tr><tr><td>lui/lei</td><td class='regular'>rivelava</td></tr><tr><td>noi</td><td class='regular'>rivelavamo</td></tr><tr><td>voi</td><td class='regular'>rivelavate</td></tr><tr><td>loro</td><td class='regular'>rivelavano</td></tr></tbody></table></div>"
            },
            rompere: {
                term: "rompere",
                definition: "break",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>rompo</td></tr><tr><td>tu</td><td class='regular'>rompi</td></tr><tr><td>lui/lei</td><td class='regular'>rompe</td></tr><tr><td>noi</td><td class='regular'>rompiamo</td></tr><tr><td>voi</td><td class='regular'>rompete</td></tr><tr><td>loro</td><td class='regular'>rompono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>rompevo</td></tr><tr><td>tu</td><td class='regular'>rompevi</td></tr><tr><td>lui/lei</td><td class='regular'>rompeva</td></tr><tr><td>noi</td><td class='regular'>rompevamo</td></tr><tr><td>voi</td><td class='regular'>rompevate</td></tr><tr><td>loro</td><td class='regular'>rompevano</td></tr></tbody></table></div>"
            },
            salire: {
                term: "salire",
                definition: "go up",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>salgo</td></tr><tr><td>tu</td><td class='regular'>sali</td></tr><tr><td>lui/lei</td><td class='regular'>sale</td></tr><tr><td>noi</td><td class='regular'>saliamo</td></tr><tr><td>voi</td><td class='regular'>salite</td></tr><tr><td>loro</td><td class='irregular'>salgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>salivo</td></tr><tr><td>tu</td><td class='regular'>salivi</td></tr><tr><td>lui/lei</td><td class='regular'>saliva</td></tr><tr><td>noi</td><td class='regular'>salivamo</td></tr><tr><td>voi</td><td class='regular'>salivate</td></tr><tr><td>loro</td><td class='regular'>salivano</td></tr></tbody></table></div>"
            },
            saltare: {
                term: "saltare",
                definition: "skip",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>salto</td></tr><tr><td>tu</td><td class='regular'>salti</td></tr><tr><td>lui/lei</td><td class='regular'>salta</td></tr><tr><td>noi</td><td class='regular'>saltiamo</td></tr><tr><td>voi</td><td class='regular'>saltate</td></tr><tr><td>loro</td><td class='regular'>saltano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>saltavo</td></tr><tr><td>tu</td><td class='regular'>saltavi</td></tr><tr><td>lui/lei</td><td class='regular'>saltava</td></tr><tr><td>noi</td><td class='regular'>saltavamo</td></tr><tr><td>voi</td><td class='regular'>saltavate</td></tr><tr><td>loro</td><td class='regular'>saltavano</td></tr></tbody></table></div>"
            },
            salutare: {
                term: "salutare",
                definition: "healthy",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>saluto</td></tr><tr><td>tu</td><td class='regular'>saluti</td></tr><tr><td>lui/lei</td><td class='regular'>saluta</td></tr><tr><td>noi</td><td class='regular'>salutiamo</td></tr><tr><td>voi</td><td class='regular'>salutate</td></tr><tr><td>loro</td><td class='regular'>salutano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>salutavo</td></tr><tr><td>tu</td><td class='regular'>salutavi</td></tr><tr><td>lui/lei</td><td class='regular'>salutava</td></tr><tr><td>noi</td><td class='regular'>salutavamo</td></tr><tr><td>voi</td><td class='regular'>salutavate</td></tr><tr><td>loro</td><td class='regular'>salutavano</td></tr></tbody></table></div>"
            },
            salvare: {
                term: "salvare",
                definition: "save",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>salvo</td></tr><tr><td>tu</td><td class='regular'>salvi</td></tr><tr><td>lui/lei</td><td class='regular'>salva</td></tr><tr><td>noi</td><td class='regular'>salviamo</td></tr><tr><td>voi</td><td class='regular'>salvate</td></tr><tr><td>loro</td><td class='regular'>salvano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>salvavo</td></tr><tr><td>tu</td><td class='regular'>salvavi</td></tr><tr><td>lui/lei</td><td class='regular'>salvava</td></tr><tr><td>noi</td><td class='regular'>salvavamo</td></tr><tr><td>voi</td><td class='regular'>salvavate</td></tr><tr><td>loro</td><td class='regular'>salvavano</td></tr></tbody></table></div>"
            },
            sapere: {
                term: "sapere",
                definition: "know",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>so</td></tr><tr><td>tu</td><td class='irregular'>sai</td></tr><tr><td>lui/lei</td><td class='irregular'>sa</td></tr><tr><td>noi</td><td class='irregular'>sappiamo</td></tr><tr><td>voi</td><td class='regular'>sapete</td></tr><tr><td>loro</td><td class='irregular'>sanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sapevo</td></tr><tr><td>tu</td><td class='regular'>sapevi</td></tr><tr><td>lui/lei</td><td class='regular'>sapeva</td></tr><tr><td>noi</td><td class='regular'>sapevamo</td></tr><tr><td>voi</td><td class='regular'>sapevate</td></tr><tr><td>loro</td><td class='regular'>sapevano</td></tr></tbody></table></div>"
            },
            sbagliare: {
                term: "sbagliare",
                definition: "make a mistake",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sbaglio</td></tr><tr><td>tu</td><td class='regular'>sbagli</td></tr><tr><td>lui/lei</td><td class='regular'>sbaglia</td></tr><tr><td>noi</td><td class='regular'>sbagliamo</td></tr><tr><td>voi</td><td class='regular'>sbagliate</td></tr><tr><td>loro</td><td class='regular'>sbagliano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sbagliavo</td></tr><tr><td>tu</td><td class='regular'>sbagliavi</td></tr><tr><td>lui/lei</td><td class='regular'>sbagliava</td></tr><tr><td>noi</td><td class='regular'>sbagliavamo</td></tr><tr><td>voi</td><td class='regular'>sbagliavate</td></tr><tr><td>loro</td><td class='regular'>sbagliavano</td></tr></tbody></table></div>"
            },
            scappare: {
                term: "scappare",
                definition: "escape",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>scappo</td></tr><tr><td>tu</td><td class='regular'>scappi</td></tr><tr><td>lui/lei</td><td class='regular'>scappa</td></tr><tr><td>noi</td><td class='regular'>scappiamo</td></tr><tr><td>voi</td><td class='regular'>scappate</td></tr><tr><td>loro</td><td class='regular'>scappano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>scappavo</td></tr><tr><td>tu</td><td class='regular'>scappavi</td></tr><tr><td>lui/lei</td><td class='regular'>scappava</td></tr><tr><td>noi</td><td class='regular'>scappavamo</td></tr><tr><td>voi</td><td class='regular'>scappavate</td></tr><tr><td>loro</td><td class='regular'>scappavano</td></tr></tbody></table></div>"
            },
            scegliere: {
                term: "scegliere",
                definition: "choose",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>scelgo</td></tr><tr><td>tu</td><td class='irregular'>scegli</td></tr><tr><td>lui/lei</td><td class='regular'>sceglie</td></tr><tr><td>noi</td><td class='irregular'>scegliamo</td></tr><tr><td>voi</td><td class='regular'>scegliete</td></tr><tr><td>loro</td><td class='irregular'>scelgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sceglievo</td></tr><tr><td>tu</td><td class='regular'>sceglievi</td></tr><tr><td>lui/lei</td><td class='regular'>sceglieva</td></tr><tr><td>noi</td><td class='regular'>sceglievamo</td></tr><tr><td>voi</td><td class='regular'>sceglievate</td></tr><tr><td>loro</td><td class='regular'>sceglievano</td></tr></tbody></table></div>"
            },
            scendere: {
                term: "scendere",
                definition: "get off",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>scendo</td></tr><tr><td>tu</td><td class='regular'>scendi</td></tr><tr><td>lui/lei</td><td class='regular'>scende</td></tr><tr><td>noi</td><td class='regular'>scendiamo</td></tr><tr><td>voi</td><td class='regular'>scendete</td></tr><tr><td>loro</td><td class='regular'>scendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>scendevo</td></tr><tr><td>tu</td><td class='regular'>scendevi</td></tr><tr><td>lui/lei</td><td class='regular'>scendeva</td></tr><tr><td>noi</td><td class='regular'>scendevamo</td></tr><tr><td>voi</td><td class='regular'>scendevate</td></tr><tr><td>loro</td><td class='regular'>scendevano</td></tr></tbody></table></div>"
            },
            scherzare: {
                term: "scherzare",
                definition: "joke",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>scherzo</td></tr><tr><td>tu</td><td class='regular'>scherzi</td></tr><tr><td>lui/lei</td><td class='regular'>scherza</td></tr><tr><td>noi</td><td class='regular'>scherziamo</td></tr><tr><td>voi</td><td class='regular'>scherzate</td></tr><tr><td>loro</td><td class='regular'>scherzano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>scherzavo</td></tr><tr><td>tu</td><td class='regular'>scherzavi</td></tr><tr><td>lui/lei</td><td class='regular'>scherzava</td></tr><tr><td>noi</td><td class='regular'>scherzavamo</td></tr><tr><td>voi</td><td class='regular'>scherzavate</td></tr><tr><td>loro</td><td class='regular'>scherzavano</td></tr></tbody></table></div>"
            },
            scoprire: {
                term: "scoprire",
                definition: "discover",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>scopro</td></tr><tr><td>tu</td><td class='regular'>scopri</td></tr><tr><td>lui/lei</td><td class='regular'>scopre</td></tr><tr><td>noi</td><td class='regular'>scopriamo</td></tr><tr><td>voi</td><td class='regular'>scoprite</td></tr><tr><td>loro</td><td class='regular'>scoprono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>scoprivo</td></tr><tr><td>tu</td><td class='regular'>scoprivi</td></tr><tr><td>lui/lei</td><td class='regular'>scopriva</td></tr><tr><td>noi</td><td class='regular'>scoprivamo</td></tr><tr><td>voi</td><td class='regular'>scoprivate</td></tr><tr><td>loro</td><td class='regular'>scoprivano</td></tr></tbody></table></div>"
            },
            scrivere: {
                term: "scrivere",
                definition: "write",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>scrivo</td></tr><tr><td>tu</td><td class='regular'>scrivi</td></tr><tr><td>lui/lei</td><td class='regular'>scrive</td></tr><tr><td>noi</td><td class='regular'>scriviamo</td></tr><tr><td>voi</td><td class='regular'>scrivete</td></tr><tr><td>loro</td><td class='regular'>scrivono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>scrivevo</td></tr><tr><td>tu</td><td class='regular'>scrivevi</td></tr><tr><td>lui/lei</td><td class='regular'>scriveva</td></tr><tr><td>noi</td><td class='regular'>scrivevamo</td></tr><tr><td>voi</td><td class='regular'>scrivevate</td></tr><tr><td>loro</td><td class='regular'>scrivevano</td></tr></tbody></table></div>"
            },
            scusare: {
                term: "scusare",
                definition: "excuse",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>scuso</td></tr><tr><td>tu</td><td class='regular'>scusi</td></tr><tr><td>lui/lei</td><td class='regular'>scusa</td></tr><tr><td>noi</td><td class='regular'>scusiamo</td></tr><tr><td>voi</td><td class='regular'>scusate</td></tr><tr><td>loro</td><td class='regular'>scusano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>scusavo</td></tr><tr><td>tu</td><td class='regular'>scusavi</td></tr><tr><td>lui/lei</td><td class='regular'>scusava</td></tr><tr><td>noi</td><td class='regular'>scusavamo</td></tr><tr><td>voi</td><td class='regular'>scusavate</td></tr><tr><td>loro</td><td class='regular'>scusavano</td></tr></tbody></table></div>"
            },
            sedere: {
                term: "sedere",
                definition: "sit down",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>siedo</td></tr><tr><td>tu</td><td class='irregular'>siedi</td></tr><tr><td>lui/lei</td><td class='irregular'>siede</td></tr><tr><td>noi</td><td class='regular'>sediamo</td></tr><tr><td>voi</td><td class='regular'>sedete</td></tr><tr><td>loro</td><td class='irregular'>siedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sedevo</td></tr><tr><td>tu</td><td class='regular'>sedevi</td></tr><tr><td>lui/lei</td><td class='regular'>sedeva</td></tr><tr><td>noi</td><td class='regular'>sedevamo</td></tr><tr><td>voi</td><td class='regular'>sedevate</td></tr><tr><td>loro</td><td class='regular'>sedevano</td></tr></tbody></table></div>"
            },
            segnare: {
                term: "segnare",
                definition: "score",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>segno</td></tr><tr><td>tu</td><td class='regular'>segni</td></tr><tr><td>lui/lei</td><td class='regular'>segna</td></tr><tr><td>noi</td><td class='regular'>segniamo</td></tr><tr><td>voi</td><td class='regular'>segnate</td></tr><tr><td>loro</td><td class='regular'>segnano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>segnavo</td></tr><tr><td>tu</td><td class='regular'>segnavi</td></tr><tr><td>lui/lei</td><td class='regular'>segnava</td></tr><tr><td>noi</td><td class='regular'>segnavamo</td></tr><tr><td>voi</td><td class='regular'>segnavate</td></tr><tr><td>loro</td><td class='regular'>segnavano</td></tr></tbody></table></div>"
            },
            seguire: {
                term: "seguire",
                definition: "follow",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>seguo</td></tr><tr><td>tu</td><td class='regular'>segui</td></tr><tr><td>lui/lei</td><td class='regular'>segue</td></tr><tr><td>noi</td><td class='regular'>seguiamo</td></tr><tr><td>voi</td><td class='regular'>seguite</td></tr><tr><td>loro</td><td class='regular'>seguono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>seguivo</td></tr><tr><td>tu</td><td class='regular'>seguivi</td></tr><tr><td>lui/lei</td><td class='regular'>seguiva</td></tr><tr><td>noi</td><td class='regular'>seguivamo</td></tr><tr><td>voi</td><td class='regular'>seguivate</td></tr><tr><td>loro</td><td class='regular'>seguivano</td></tr></tbody></table></div>"
            },
            sembrare: {
                term: "sembrare",
                definition: "look",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sembro</td></tr><tr><td>tu</td><td class='regular'>sembri</td></tr><tr><td>lui/lei</td><td class='regular'>sembra</td></tr><tr><td>noi</td><td class='regular'>sembriamo</td></tr><tr><td>voi</td><td class='regular'>sembrate</td></tr><tr><td>loro</td><td class='regular'>sembrano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sembravo</td></tr><tr><td>tu</td><td class='regular'>sembravi</td></tr><tr><td>lui/lei</td><td class='regular'>sembrava</td></tr><tr><td>noi</td><td class='regular'>sembravamo</td></tr><tr><td>voi</td><td class='regular'>sembravate</td></tr><tr><td>loro</td><td class='regular'>sembravano</td></tr></tbody></table></div>"
            },
            sentire: {
                term: "sentire",
                definition: "feel",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sento</td></tr><tr><td>tu</td><td class='regular'>senti</td></tr><tr><td>lui/lei</td><td class='regular'>sente</td></tr><tr><td>noi</td><td class='regular'>sentiamo</td></tr><tr><td>voi</td><td class='regular'>sentite</td></tr><tr><td>loro</td><td class='regular'>sentono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sentivo</td></tr><tr><td>tu</td><td class='regular'>sentivi</td></tr><tr><td>lui/lei</td><td class='regular'>sentiva</td></tr><tr><td>noi</td><td class='regular'>sentivamo</td></tr><tr><td>voi</td><td class='regular'>sentivate</td></tr><tr><td>loro</td><td class='regular'>sentivano</td></tr></tbody></table></div>"
            },
            servire: {
                term: "servire",
                definition: "serve",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>servo</td></tr><tr><td>tu</td><td class='regular'>servi</td></tr><tr><td>lui/lei</td><td class='regular'>serve</td></tr><tr><td>noi</td><td class='regular'>serviamo</td></tr><tr><td>voi</td><td class='regular'>servite</td></tr><tr><td>loro</td><td class='regular'>servono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>servivo</td></tr><tr><td>tu</td><td class='regular'>servivi</td></tr><tr><td>lui/lei</td><td class='regular'>serviva</td></tr><tr><td>noi</td><td class='regular'>servivamo</td></tr><tr><td>voi</td><td class='regular'>servivate</td></tr><tr><td>loro</td><td class='regular'>servivano</td></tr></tbody></table></div>"
            },
            significare: {
                term: "significare",
                definition: "mean",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>significo</td></tr><tr><td>tu</td><td class='regular'>significhi</td></tr><tr><td>lui/lei</td><td class='regular'>significa</td></tr><tr><td>noi</td><td class='regular'>significhiamo</td></tr><tr><td>voi</td><td class='regular'>significate</td></tr><tr><td>loro</td><td class='regular'>significano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>significavo</td></tr><tr><td>tu</td><td class='regular'>significavi</td></tr><tr><td>lui/lei</td><td class='regular'>significava</td></tr><tr><td>noi</td><td class='regular'>significavamo</td></tr><tr><td>voi</td><td class='regular'>significavate</td></tr><tr><td>loro</td><td class='regular'>significavano</td></tr></tbody></table></div>"
            },
            smettere: {
                term: "smettere",
                definition: "stop",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>smetto</td></tr><tr><td>tu</td><td class='regular'>smetti</td></tr><tr><td>lui/lei</td><td class='regular'>smette</td></tr><tr><td>noi</td><td class='regular'>smettiamo</td></tr><tr><td>voi</td><td class='regular'>smettete</td></tr><tr><td>loro</td><td class='regular'>smettono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>smettevo</td></tr><tr><td>tu</td><td class='regular'>smettevi</td></tr><tr><td>lui/lei</td><td class='regular'>smetteva</td></tr><tr><td>noi</td><td class='regular'>smettevamo</td></tr><tr><td>voi</td><td class='regular'>smettevate</td></tr><tr><td>loro</td><td class='regular'>smettevano</td></tr></tbody></table></div>"
            },
            soffrire: {
                term: "soffrire",
                definition: "suffer",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>soffro</td></tr><tr><td>tu</td><td class='regular'>soffri</td></tr><tr><td>lui/lei</td><td class='regular'>soffre</td></tr><tr><td>noi</td><td class='regular'>soffriamo</td></tr><tr><td>voi</td><td class='regular'>soffrite</td></tr><tr><td>loro</td><td class='regular'>soffrono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>soffrivo</td></tr><tr><td>tu</td><td class='regular'>soffrivi</td></tr><tr><td>lui/lei</td><td class='regular'>soffriva</td></tr><tr><td>noi</td><td class='regular'>soffrivamo</td></tr><tr><td>voi</td><td class='regular'>soffrivate</td></tr><tr><td>loro</td><td class='regular'>soffrivano</td></tr></tbody></table></div>"
            },
            sognare: {
                term: "sognare",
                definition: "dream",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sogno</td></tr><tr><td>tu</td><td class='regular'>sogni</td></tr><tr><td>lui/lei</td><td class='regular'>sogna</td></tr><tr><td>noi</td><td class='regular'>sogniamo</td></tr><tr><td>voi</td><td class='regular'>sognate</td></tr><tr><td>loro</td><td class='regular'>sognano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sognavo</td></tr><tr><td>tu</td><td class='regular'>sognavi</td></tr><tr><td>lui/lei</td><td class='regular'>sognava</td></tr><tr><td>noi</td><td class='regular'>sognavamo</td></tr><tr><td>voi</td><td class='regular'>sognavate</td></tr><tr><td>loro</td><td class='regular'>sognavano</td></tr></tbody></table></div>"
            },
            sorgere: {
                term: "sorgere",
                definition: "rise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sorgo</td></tr><tr><td>tu</td><td class='regular'>sorgi</td></tr><tr><td>lui/lei</td><td class='regular'>sorge</td></tr><tr><td>noi</td><td class='regular'>sorgiamo</td></tr><tr><td>voi</td><td class='regular'>sorgete</td></tr><tr><td>loro</td><td class='regular'>sorgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sorgevo</td></tr><tr><td>tu</td><td class='regular'>sorgevi</td></tr><tr><td>lui/lei</td><td class='regular'>sorgeva</td></tr><tr><td>noi</td><td class='regular'>sorgevamo</td></tr><tr><td>voi</td><td class='regular'>sorgevate</td></tr><tr><td>loro</td><td class='regular'>sorgevano</td></tr></tbody></table></div>"
            },
            sorprendere: {
                term: "sorprendere",
                definition: "surprise",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sorprendo</td></tr><tr><td>tu</td><td class='regular'>sorprendi</td></tr><tr><td>lui/lei</td><td class='regular'>sorprende</td></tr><tr><td>noi</td><td class='regular'>sorprendiamo</td></tr><tr><td>voi</td><td class='regular'>sorprendete</td></tr><tr><td>loro</td><td class='regular'>sorprendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sorprendevo</td></tr><tr><td>tu</td><td class='regular'>sorprendevi</td></tr><tr><td>lui/lei</td><td class='regular'>sorprendeva</td></tr><tr><td>noi</td><td class='regular'>sorprendevamo</td></tr><tr><td>voi</td><td class='regular'>sorprendevate</td></tr><tr><td>loro</td><td class='regular'>sorprendevano</td></tr></tbody></table></div>"
            },
            sorridere: {
                term: "sorridere",
                definition: "smile",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sorrido</td></tr><tr><td>tu</td><td class='regular'>sorridi</td></tr><tr><td>lui/lei</td><td class='regular'>sorride</td></tr><tr><td>noi</td><td class='regular'>sorridiamo</td></tr><tr><td>voi</td><td class='regular'>sorridete</td></tr><tr><td>loro</td><td class='regular'>sorridono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sorridevo</td></tr><tr><td>tu</td><td class='regular'>sorridevi</td></tr><tr><td>lui/lei</td><td class='regular'>sorrideva</td></tr><tr><td>noi</td><td class='regular'>sorridevamo</td></tr><tr><td>voi</td><td class='regular'>sorridevate</td></tr><tr><td>loro</td><td class='regular'>sorridevano</td></tr></tbody></table></div>"
            },
            sostenere: {
                term: "sostenere",
                definition: "support",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>sostengo</td></tr><tr><td>tu</td><td class='irregular'>sostieni</td></tr><tr><td>lui/lei</td><td class='irregular'>sostiene</td></tr><tr><td>noi</td><td class='regular'>sosteniamo</td></tr><tr><td>voi</td><td class='regular'>sostenete</td></tr><tr><td>loro</td><td class='irregular'>sostengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sostenevo</td></tr><tr><td>tu</td><td class='regular'>sostenevi</td></tr><tr><td>lui/lei</td><td class='regular'>sosteneva</td></tr><tr><td>noi</td><td class='regular'>sostenevamo</td></tr><tr><td>voi</td><td class='regular'>sostenevate</td></tr><tr><td>loro</td><td class='regular'>sostenevano</td></tr></tbody></table></div>"
            },
            spegnere: {
                term: "spegnere",
                definition: "switch off",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>spengo</td></tr><tr><td>tu</td><td class='regular'>spegni</td></tr><tr><td>lui/lei</td><td class='regular'>spegne</td></tr><tr><td>noi</td><td class='regular'>spegniamo</td></tr><tr><td>voi</td><td class='regular'>spegnete</td></tr><tr><td>loro</td><td class='irregular'>spengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>spegnevo</td></tr><tr><td>tu</td><td class='regular'>spegnevi</td></tr><tr><td>lui/lei</td><td class='regular'>spegneva</td></tr><tr><td>noi</td><td class='regular'>spegnevamo</td></tr><tr><td>voi</td><td class='regular'>spegnevate</td></tr><tr><td>loro</td><td class='regular'>spegnevano</td></tr></tbody></table></div>"
            },
            sperare: {
                term: "sperare",
                definition: "hope",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>spero</td></tr><tr><td>tu</td><td class='regular'>speri</td></tr><tr><td>lui/lei</td><td class='regular'>spera</td></tr><tr><td>noi</td><td class='regular'>speriamo</td></tr><tr><td>voi</td><td class='regular'>sperate</td></tr><tr><td>loro</td><td class='regular'>sperano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>speravo</td></tr><tr><td>tu</td><td class='regular'>speravi</td></tr><tr><td>lui/lei</td><td class='regular'>sperava</td></tr><tr><td>noi</td><td class='regular'>speravamo</td></tr><tr><td>voi</td><td class='regular'>speravate</td></tr><tr><td>loro</td><td class='regular'>speravano</td></tr></tbody></table></div>"
            },
            spiegare: {
                term: "spiegare",
                definition: "explain",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>spiego</td></tr><tr><td>tu</td><td class='regular'>spieghi</td></tr><tr><td>lui/lei</td><td class='regular'>spiega</td></tr><tr><td>noi</td><td class='regular'>spieghiamo</td></tr><tr><td>voi</td><td class='regular'>spiegate</td></tr><tr><td>loro</td><td class='regular'>spiegano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>spiegavo</td></tr><tr><td>tu</td><td class='regular'>spiegavi</td></tr><tr><td>lui/lei</td><td class='regular'>spiegava</td></tr><tr><td>noi</td><td class='regular'>spiegavamo</td></tr><tr><td>voi</td><td class='regular'>spiegavate</td></tr><tr><td>loro</td><td class='regular'>spiegavano</td></tr></tbody></table></div>"
            },
            sposare: {
                term: "sposare",
                definition: "marry",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sposo</td></tr><tr><td>tu</td><td class='regular'>sposi</td></tr><tr><td>lui/lei</td><td class='regular'>sposa</td></tr><tr><td>noi</td><td class='regular'>sposiamo</td></tr><tr><td>voi</td><td class='regular'>sposate</td></tr><tr><td>loro</td><td class='regular'>sposano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>sposavo</td></tr><tr><td>tu</td><td class='regular'>sposavi</td></tr><tr><td>lui/lei</td><td class='regular'>sposava</td></tr><tr><td>noi</td><td class='regular'>sposavamo</td></tr><tr><td>voi</td><td class='regular'>sposavate</td></tr><tr><td>loro</td><td class='regular'>sposavano</td></tr></tbody></table></div>"
            },
            stare: {
                term: "stare",
                definition: "stay",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sto</td></tr><tr><td>tu</td><td class='irregular'>stai</td></tr><tr><td>lui/lei</td><td class='regular'>sta</td></tr><tr><td>noi</td><td class='regular'>stiamo</td></tr><tr><td>voi</td><td class='regular'>state</td></tr><tr><td>loro</td><td class='irregular'>stanno</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>stavo</td></tr><tr><td>tu</td><td class='regular'>stavi</td></tr><tr><td>lui/lei</td><td class='regular'>stava</td></tr><tr><td>noi</td><td class='regular'>stavamo</td></tr><tr><td>voi</td><td class='regular'>stavate</td></tr><tr><td>loro</td><td class='regular'>stavano</td></tr></tbody></table></div>"
            },
            studiare: {
                term: "studiare",
                definition: "study",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>studio</td></tr><tr><td>tu</td><td class='regular'>studi</td></tr><tr><td>lui/lei</td><td class='regular'>studia</td></tr><tr><td>noi</td><td class='regular'>studiamo</td></tr><tr><td>voi</td><td class='regular'>studiate</td></tr><tr><td>loro</td><td class='regular'>studiano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>studiavo</td></tr><tr><td>tu</td><td class='regular'>studiavi</td></tr><tr><td>lui/lei</td><td class='regular'>studiava</td></tr><tr><td>noi</td><td class='regular'>studiavamo</td></tr><tr><td>voi</td><td class='regular'>studiavate</td></tr><tr><td>loro</td><td class='regular'>studiavano</td></tr></tbody></table></div>"
            },
            succedere: {
                term: "succedere",
                definition: "happen",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>succedo</td></tr><tr><td>tu</td><td class='regular'>succedi</td></tr><tr><td>lui/lei</td><td class='regular'>succede</td></tr><tr><td>noi</td><td class='regular'>succediamo</td></tr><tr><td>voi</td><td class='regular'>succedete</td></tr><tr><td>loro</td><td class='regular'>succedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>succedevo</td></tr><tr><td>tu</td><td class='regular'>succedevi</td></tr><tr><td>lui/lei</td><td class='regular'>succedeva</td></tr><tr><td>noi</td><td class='regular'>succedevamo</td></tr><tr><td>voi</td><td class='regular'>succedevate</td></tr><tr><td>loro</td><td class='regular'>succedevano</td></tr></tbody></table></div>"
            },
            suonare: {
                term: "suonare",
                definition: "play",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>suono</td></tr><tr><td>tu</td><td class='regular'>suoni</td></tr><tr><td>lui/lei</td><td class='regular'>suona</td></tr><tr><td>noi</td><td class='regular'>suoniamo</td></tr><tr><td>voi</td><td class='regular'>suonate</td></tr><tr><td>loro</td><td class='regular'>suonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>suonavo</td></tr><tr><td>tu</td><td class='regular'>suonavi</td></tr><tr><td>lui/lei</td><td class='regular'>suonava</td></tr><tr><td>noi</td><td class='regular'>suonavamo</td></tr><tr><td>voi</td><td class='regular'>suonavate</td></tr><tr><td>loro</td><td class='regular'>suonavano</td></tr></tbody></table></div>"
            },
            superare: {
                term: "superare",
                definition: "exceed",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>supero</td></tr><tr><td>tu</td><td class='regular'>superi</td></tr><tr><td>lui/lei</td><td class='regular'>supera</td></tr><tr><td>noi</td><td class='regular'>superiamo</td></tr><tr><td>voi</td><td class='regular'>superate</td></tr><tr><td>loro</td><td class='regular'>superano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>superavo</td></tr><tr><td>tu</td><td class='regular'>superavi</td></tr><tr><td>lui/lei</td><td class='regular'>superava</td></tr><tr><td>noi</td><td class='regular'>superavamo</td></tr><tr><td>voi</td><td class='regular'>superavate</td></tr><tr><td>loro</td><td class='regular'>superavano</td></tr></tbody></table></div>"
            },
            svegliare: {
                term: "svegliare",
                definition: "wake",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>sveglio</td></tr><tr><td>tu</td><td class='regular'>svegli</td></tr><tr><td>lui/lei</td><td class='regular'>sveglia</td></tr><tr><td>noi</td><td class='regular'>svegliamo</td></tr><tr><td>voi</td><td class='regular'>svegliate</td></tr><tr><td>loro</td><td class='regular'>svegliano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>svegliavo</td></tr><tr><td>tu</td><td class='regular'>svegliavi</td></tr><tr><td>lui/lei</td><td class='regular'>svegliava</td></tr><tr><td>noi</td><td class='regular'>svegliavamo</td></tr><tr><td>voi</td><td class='regular'>svegliavate</td></tr><tr><td>loro</td><td class='regular'>svegliavano</td></tr></tbody></table></div>"
            },
            svolgere: {
                term: "svolgere",
                definition: "perform",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>svolgo</td></tr><tr><td>tu</td><td class='regular'>svolgi</td></tr><tr><td>lui/lei</td><td class='regular'>svolge</td></tr><tr><td>noi</td><td class='regular'>svolgiamo</td></tr><tr><td>voi</td><td class='regular'>svolgete</td></tr><tr><td>loro</td><td class='regular'>svolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>svolgevo</td></tr><tr><td>tu</td><td class='regular'>svolgevi</td></tr><tr><td>lui/lei</td><td class='regular'>svolgeva</td></tr><tr><td>noi</td><td class='regular'>svolgevamo</td></tr><tr><td>voi</td><td class='regular'>svolgevate</td></tr><tr><td>loro</td><td class='regular'>svolgevano</td></tr></tbody></table></div>"
            },
            tacere: {
                term: "tacere",
                definition: "be silent",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>taccio</td></tr><tr><td>tu</td><td class='regular'>taci</td></tr><tr><td>lui/lei</td><td class='regular'>tace</td></tr><tr><td>noi</td><td class='regular'>taciamo</td></tr><tr><td>voi</td><td class='regular'>tacete</td></tr><tr><td>loro</td><td class='irregular'>tacciono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>tacevo</td></tr><tr><td>tu</td><td class='regular'>tacevi</td></tr><tr><td>lui/lei</td><td class='regular'>taceva</td></tr><tr><td>noi</td><td class='regular'>tacevamo</td></tr><tr><td>voi</td><td class='regular'>tacevate</td></tr><tr><td>loro</td><td class='regular'>tacevano</td></tr></tbody></table></div>"
            },
            tagliare: {
                term: "tagliare",
                definition: "cut",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>taglio</td></tr><tr><td>tu</td><td class='regular'>tagli</td></tr><tr><td>lui/lei</td><td class='regular'>taglia</td></tr><tr><td>noi</td><td class='regular'>tagliamo</td></tr><tr><td>voi</td><td class='regular'>tagliate</td></tr><tr><td>loro</td><td class='regular'>tagliano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>tagliavo</td></tr><tr><td>tu</td><td class='regular'>tagliavi</td></tr><tr><td>lui/lei</td><td class='regular'>tagliava</td></tr><tr><td>noi</td><td class='regular'>tagliavamo</td></tr><tr><td>voi</td><td class='regular'>tagliavate</td></tr><tr><td>loro</td><td class='regular'>tagliavano</td></tr></tbody></table></div>"
            },
            temere: {
                term: "temere",
                definition: "fear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>temo</td></tr><tr><td>tu</td><td class='regular'>temi</td></tr><tr><td>lui/lei</td><td class='regular'>teme</td></tr><tr><td>noi</td><td class='regular'>temiamo</td></tr><tr><td>voi</td><td class='regular'>temete</td></tr><tr><td>loro</td><td class='regular'>temono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>temevo</td></tr><tr><td>tu</td><td class='regular'>temevi</td></tr><tr><td>lui/lei</td><td class='regular'>temeva</td></tr><tr><td>noi</td><td class='regular'>temevamo</td></tr><tr><td>voi</td><td class='regular'>temevate</td></tr><tr><td>loro</td><td class='regular'>temevano</td></tr></tbody></table></div>"
            },
            tenere: {
                term: "tenere",
                definition: "hold",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>tengo</td></tr><tr><td>tu</td><td class='irregular'>tieni</td></tr><tr><td>lui/lei</td><td class='irregular'>tiene</td></tr><tr><td>noi</td><td class='regular'>teniamo</td></tr><tr><td>voi</td><td class='regular'>tenete</td></tr><tr><td>loro</td><td class='irregular'>tengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>tenevo</td></tr><tr><td>tu</td><td class='regular'>tenevi</td></tr><tr><td>lui/lei</td><td class='regular'>teneva</td></tr><tr><td>noi</td><td class='regular'>tenevamo</td></tr><tr><td>voi</td><td class='regular'>tenevate</td></tr><tr><td>loro</td><td class='regular'>tenevano</td></tr></tbody></table></div>"
            },
            tentare: {
                term: "tentare",
                definition: "groped",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>tento</td></tr><tr><td>tu</td><td class='regular'>tenti</td></tr><tr><td>lui/lei</td><td class='regular'>tenta</td></tr><tr><td>noi</td><td class='regular'>tentiamo</td></tr><tr><td>voi</td><td class='regular'>tentate</td></tr><tr><td>loro</td><td class='regular'>tentano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>tentavo</td></tr><tr><td>tu</td><td class='regular'>tentavi</td></tr><tr><td>lui/lei</td><td class='regular'>tentava</td></tr><tr><td>noi</td><td class='regular'>tentavamo</td></tr><tr><td>voi</td><td class='regular'>tentavate</td></tr><tr><td>loro</td><td class='regular'>tentavano</td></tr></tbody></table></div>"
            },
            tirare: {
                term: "tirare",
                definition: "pull",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>tiro</td></tr><tr><td>tu</td><td class='regular'>tiri</td></tr><tr><td>lui/lei</td><td class='regular'>tira</td></tr><tr><td>noi</td><td class='regular'>tiriamo</td></tr><tr><td>voi</td><td class='regular'>tirate</td></tr><tr><td>loro</td><td class='regular'>tirano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>tiravo</td></tr><tr><td>tu</td><td class='regular'>tiravi</td></tr><tr><td>lui/lei</td><td class='regular'>tirava</td></tr><tr><td>noi</td><td class='regular'>tiravamo</td></tr><tr><td>voi</td><td class='regular'>tiravate</td></tr><tr><td>loro</td><td class='regular'>tiravano</td></tr></tbody></table></div>"
            },
            toccare: {
                term: "toccare",
                definition: "touch",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>tocco</td></tr><tr><td>tu</td><td class='regular'>tocchi</td></tr><tr><td>lui/lei</td><td class='regular'>tocca</td></tr><tr><td>noi</td><td class='regular'>tocchiamo</td></tr><tr><td>voi</td><td class='regular'>toccate</td></tr><tr><td>loro</td><td class='regular'>toccano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>toccavo</td></tr><tr><td>tu</td><td class='regular'>toccavi</td></tr><tr><td>lui/lei</td><td class='regular'>toccava</td></tr><tr><td>noi</td><td class='regular'>toccavamo</td></tr><tr><td>voi</td><td class='regular'>toccavate</td></tr><tr><td>loro</td><td class='regular'>toccavano</td></tr></tbody></table></div>"
            },
            togliere: {
                term: "togliere",
                definition: "remove",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>tolgo</td></tr><tr><td>tu</td><td class='irregular'>togli</td></tr><tr><td>lui/lei</td><td class='regular'>toglie</td></tr><tr><td>noi</td><td class='irregular'>togliamo</td></tr><tr><td>voi</td><td class='regular'>togliete</td></tr><tr><td>loro</td><td class='irregular'>tolgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>toglievo</td></tr><tr><td>tu</td><td class='regular'>toglievi</td></tr><tr><td>lui/lei</td><td class='regular'>toglieva</td></tr><tr><td>noi</td><td class='regular'>toglievamo</td></tr><tr><td>voi</td><td class='regular'>toglievate</td></tr><tr><td>loro</td><td class='regular'>toglievano</td></tr></tbody></table></div>"
            },
            tornare: {
                term: "tornare",
                definition: "return",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>torno</td></tr><tr><td>tu</td><td class='regular'>torni</td></tr><tr><td>lui/lei</td><td class='regular'>torna</td></tr><tr><td>noi</td><td class='regular'>torniamo</td></tr><tr><td>voi</td><td class='regular'>tornate</td></tr><tr><td>loro</td><td class='regular'>tornano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>tornavo</td></tr><tr><td>tu</td><td class='regular'>tornavi</td></tr><tr><td>lui/lei</td><td class='regular'>tornava</td></tr><tr><td>noi</td><td class='regular'>tornavamo</td></tr><tr><td>voi</td><td class='regular'>tornavate</td></tr><tr><td>loro</td><td class='regular'>tornavano</td></tr></tbody></table></div>"
            },
            trarre: {
                term: "trarre",
                definition: "draw",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>traggo</td></tr><tr><td>tu</td><td class='regular'>trai</td></tr><tr><td>lui/lei</td><td class='regular'>trae</td></tr><tr><td>noi</td><td class='regular'>traiamo</td></tr><tr><td>voi</td><td class='regular'>traete</td></tr><tr><td>loro</td><td class='irregular'>traggono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>traevo</td></tr><tr><td>tu</td><td class='regular'>traevi</td></tr><tr><td>lui/lei</td><td class='regular'>traeva</td></tr><tr><td>noi</td><td class='regular'>traevamo</td></tr><tr><td>voi</td><td class='regular'>traevate</td></tr><tr><td>loro</td><td class='regular'>traevano</td></tr></tbody></table></div>"
            },
            trascinare: {
                term: "trascinare",
                definition: "drag",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>trascino</td></tr><tr><td>tu</td><td class='regular'>trascini</td></tr><tr><td>lui/lei</td><td class='regular'>trascina</td></tr><tr><td>noi</td><td class='regular'>trasciniamo</td></tr><tr><td>voi</td><td class='regular'>trascinate</td></tr><tr><td>loro</td><td class='regular'>trascinano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>trascinavo</td></tr><tr><td>tu</td><td class='regular'>trascinavi</td></tr><tr><td>lui/lei</td><td class='regular'>trascinava</td></tr><tr><td>noi</td><td class='regular'>trascinavamo</td></tr><tr><td>voi</td><td class='regular'>trascinavate</td></tr><tr><td>loro</td><td class='regular'>trascinavano</td></tr></tbody></table></div>"
            },
            trasformare: {
                term: "trasformare",
                definition: "transform",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>trasformo</td></tr><tr><td>tu</td><td class='regular'>trasformi</td></tr><tr><td>lui/lei</td><td class='regular'>trasforma</td></tr><tr><td>noi</td><td class='regular'>trasformiamo</td></tr><tr><td>voi</td><td class='regular'>trasformate</td></tr><tr><td>loro</td><td class='regular'>trasformano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>trasformavo</td></tr><tr><td>tu</td><td class='regular'>trasformavi</td></tr><tr><td>lui/lei</td><td class='regular'>trasformava</td></tr><tr><td>noi</td><td class='regular'>trasformavamo</td></tr><tr><td>voi</td><td class='regular'>trasformavate</td></tr><tr><td>loro</td><td class='regular'>trasformavano</td></tr></tbody></table></div>"
            },
            trattare: {
                term: "trattare",
                definition: "treat",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>tratto</td></tr><tr><td>tu</td><td class='regular'>tratti</td></tr><tr><td>lui/lei</td><td class='regular'>tratta</td></tr><tr><td>noi</td><td class='regular'>trattiamo</td></tr><tr><td>voi</td><td class='regular'>trattate</td></tr><tr><td>loro</td><td class='regular'>trattano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>trattavo</td></tr><tr><td>tu</td><td class='regular'>trattavi</td></tr><tr><td>lui/lei</td><td class='regular'>trattava</td></tr><tr><td>noi</td><td class='regular'>trattavamo</td></tr><tr><td>voi</td><td class='regular'>trattavate</td></tr><tr><td>loro</td><td class='regular'>trattavano</td></tr></tbody></table></div>"
            },
            trovare: {
                term: "trovare",
                definition: "find",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>trovo</td></tr><tr><td>tu</td><td class='regular'>trovi</td></tr><tr><td>lui/lei</td><td class='regular'>trova</td></tr><tr><td>noi</td><td class='regular'>troviamo</td></tr><tr><td>voi</td><td class='regular'>trovate</td></tr><tr><td>loro</td><td class='regular'>trovano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>trovavo</td></tr><tr><td>tu</td><td class='regular'>trovavi</td></tr><tr><td>lui/lei</td><td class='regular'>trovava</td></tr><tr><td>noi</td><td class='regular'>trovavamo</td></tr><tr><td>voi</td><td class='regular'>trovavate</td></tr><tr><td>loro</td><td class='regular'>trovavano</td></tr></tbody></table></div>"
            },
            uccidere: {
                term: "uccidere",
                definition: "kill",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>uccido</td></tr><tr><td>tu</td><td class='regular'>uccidi</td></tr><tr><td>lui/lei</td><td class='regular'>uccide</td></tr><tr><td>noi</td><td class='regular'>uccidiamo</td></tr><tr><td>voi</td><td class='regular'>uccidete</td></tr><tr><td>loro</td><td class='regular'>uccidono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>uccidevo</td></tr><tr><td>tu</td><td class='regular'>uccidevi</td></tr><tr><td>lui/lei</td><td class='regular'>uccideva</td></tr><tr><td>noi</td><td class='regular'>uccidevamo</td></tr><tr><td>voi</td><td class='regular'>uccidevate</td></tr><tr><td>loro</td><td class='regular'>uccidevano</td></tr></tbody></table></div>"
            },
            udire: {
                term: "udire",
                definition: "hear",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>odo</td></tr><tr><td>tu</td><td class='irregular'>odi</td></tr><tr><td>lui/lei</td><td class='irregular'>ode</td></tr><tr><td>noi</td><td class='regular'>udiamo</td></tr><tr><td>voi</td><td class='regular'>udite</td></tr><tr><td>loro</td><td class='irregular'>odono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>udivo</td></tr><tr><td>tu</td><td class='regular'>udivi</td></tr><tr><td>lui/lei</td><td class='regular'>udiva</td></tr><tr><td>noi</td><td class='regular'>udivamo</td></tr><tr><td>voi</td><td class='regular'>udivate</td></tr><tr><td>loro</td><td class='regular'>udivano</td></tr></tbody></table></div>"
            },
            unire: {
                term: "unire",
                definition: "unite",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>unisco</td></tr><tr><td>tu</td><td class='irregular'>unisci</td></tr><tr><td>lui/lei</td><td class='irregular'>unisce</td></tr><tr><td>noi</td><td class='regular'>uniamo</td></tr><tr><td>voi</td><td class='regular'>unite</td></tr><tr><td>loro</td><td class='irregular'>uniscono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>univo</td></tr><tr><td>tu</td><td class='regular'>univi</td></tr><tr><td>lui/lei</td><td class='regular'>univa</td></tr><tr><td>noi</td><td class='regular'>univamo</td></tr><tr><td>voi</td><td class='regular'>univate</td></tr><tr><td>loro</td><td class='regular'>univano</td></tr></tbody></table></div>"
            },
            usare: {
                term: "usare",
                definition: "use",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>uso</td></tr><tr><td>tu</td><td class='regular'>usi</td></tr><tr><td>lui/lei</td><td class='regular'>usa</td></tr><tr><td>noi</td><td class='regular'>usiamo</td></tr><tr><td>voi</td><td class='regular'>usate</td></tr><tr><td>loro</td><td class='regular'>usano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>usavo</td></tr><tr><td>tu</td><td class='regular'>usavi</td></tr><tr><td>lui/lei</td><td class='regular'>usava</td></tr><tr><td>noi</td><td class='regular'>usavamo</td></tr><tr><td>voi</td><td class='regular'>usavate</td></tr><tr><td>loro</td><td class='regular'>usavano</td></tr></tbody></table></div>"
            },
            uscire: {
                term: "uscire",
                definition: "go out",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>esco</td></tr><tr><td>tu</td><td class='irregular'>esci</td></tr><tr><td>lui/lei</td><td class='irregular'>esce</td></tr><tr><td>noi</td><td class='regular'>usciamo</td></tr><tr><td>voi</td><td class='regular'>uscite</td></tr><tr><td>loro</td><td class='irregular'>escono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>uscivo</td></tr><tr><td>tu</td><td class='regular'>uscivi</td></tr><tr><td>lui/lei</td><td class='regular'>usciva</td></tr><tr><td>noi</td><td class='regular'>uscivamo</td></tr><tr><td>voi</td><td class='regular'>uscivate</td></tr><tr><td>loro</td><td class='regular'>uscivano</td></tr></tbody></table></div>"
            },
            valere: {
                term: "valere",
                definition: "be worth",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>valgo</td></tr><tr><td>tu</td><td class='regular'>vali</td></tr><tr><td>lui/lei</td><td class='regular'>vale</td></tr><tr><td>noi</td><td class='regular'>valiamo</td></tr><tr><td>voi</td><td class='regular'>valete</td></tr><tr><td>loro</td><td class='irregular'>valgono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>valevo</td></tr><tr><td>tu</td><td class='regular'>valevi</td></tr><tr><td>lui/lei</td><td class='regular'>valeva</td></tr><tr><td>noi</td><td class='regular'>valevamo</td></tr><tr><td>voi</td><td class='regular'>valevate</td></tr><tr><td>loro</td><td class='regular'>valevano</td></tr></tbody></table></div>"
            },
            vedere: {
                term: "vedere",
                definition: "see",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>vedo</td></tr><tr><td>tu</td><td class='regular'>vedi</td></tr><tr><td>lui/lei</td><td class='regular'>vede</td></tr><tr><td>noi</td><td class='regular'>vediamo</td></tr><tr><td>voi</td><td class='regular'>vedete</td></tr><tr><td>loro</td><td class='regular'>vedono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>vedevo</td></tr><tr><td>tu</td><td class='regular'>vedevi</td></tr><tr><td>lui/lei</td><td class='regular'>vedeva</td></tr><tr><td>noi</td><td class='regular'>vedevamo</td></tr><tr><td>voi</td><td class='regular'>vedevate</td></tr><tr><td>loro</td><td class='regular'>vedevano</td></tr></tbody></table></div>"
            },
            vendere: {
                term: "vendere",
                definition: "sell",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>vendo</td></tr><tr><td>tu</td><td class='regular'>vendi</td></tr><tr><td>lui/lei</td><td class='regular'>vende</td></tr><tr><td>noi</td><td class='regular'>vendiamo</td></tr><tr><td>voi</td><td class='regular'>vendete</td></tr><tr><td>loro</td><td class='regular'>vendono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>vendevo</td></tr><tr><td>tu</td><td class='regular'>vendevi</td></tr><tr><td>lui/lei</td><td class='regular'>vendeva</td></tr><tr><td>noi</td><td class='regular'>vendevamo</td></tr><tr><td>voi</td><td class='regular'>vendevate</td></tr><tr><td>loro</td><td class='regular'>vendevano</td></tr></tbody></table></div>"
            },
            venire: {
                term: "venire",
                definition: "come",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>vengo</td></tr><tr><td>tu</td><td class='irregular'>vieni</td></tr><tr><td>lui/lei</td><td class='irregular'>viene</td></tr><tr><td>noi</td><td class='regular'>veniamo</td></tr><tr><td>voi</td><td class='regular'>venite</td></tr><tr><td>loro</td><td class='irregular'>vengono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>venivo</td></tr><tr><td>tu</td><td class='regular'>venivi</td></tr><tr><td>lui/lei</td><td class='regular'>veniva</td></tr><tr><td>noi</td><td class='regular'>venivamo</td></tr><tr><td>voi</td><td class='regular'>venivate</td></tr><tr><td>loro</td><td class='regular'>venivano</td></tr></tbody></table></div>"
            },
            vestire: {
                term: "vestire",
                definition: "dress",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>vesto</td></tr><tr><td>tu</td><td class='regular'>vesti</td></tr><tr><td>lui/lei</td><td class='regular'>veste</td></tr><tr><td>noi</td><td class='regular'>vestiamo</td></tr><tr><td>voi</td><td class='regular'>vestite</td></tr><tr><td>loro</td><td class='regular'>vestono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>vestivo</td></tr><tr><td>tu</td><td class='regular'>vestivi</td></tr><tr><td>lui/lei</td><td class='regular'>vestiva</td></tr><tr><td>noi</td><td class='regular'>vestivamo</td></tr><tr><td>voi</td><td class='regular'>vestivate</td></tr><tr><td>loro</td><td class='regular'>vestivano</td></tr></tbody></table></div>"
            },
            vincere: {
                term: "vincere",
                definition: "win",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>vinco</td></tr><tr><td>tu</td><td class='regular'>vinci</td></tr><tr><td>lui/lei</td><td class='regular'>vince</td></tr><tr><td>noi</td><td class='regular'>vinciamo</td></tr><tr><td>voi</td><td class='regular'>vincete</td></tr><tr><td>loro</td><td class='regular'>vincono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>vincevo</td></tr><tr><td>tu</td><td class='regular'>vincevi</td></tr><tr><td>lui/lei</td><td class='regular'>vinceva</td></tr><tr><td>noi</td><td class='regular'>vincevamo</td></tr><tr><td>voi</td><td class='regular'>vincevate</td></tr><tr><td>loro</td><td class='regular'>vincevano</td></tr></tbody></table></div>"
            },
            vivere: {
                term: "vivere",
                definition: "live",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>vivo</td></tr><tr><td>tu</td><td class='regular'>vivi</td></tr><tr><td>lui/lei</td><td class='regular'>vive</td></tr><tr><td>noi</td><td class='regular'>viviamo</td></tr><tr><td>voi</td><td class='regular'>vivete</td></tr><tr><td>loro</td><td class='regular'>vivono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>vivevo</td></tr><tr><td>tu</td><td class='regular'>vivevi</td></tr><tr><td>lui/lei</td><td class='regular'>viveva</td></tr><tr><td>noi</td><td class='regular'>vivevamo</td></tr><tr><td>voi</td><td class='regular'>vivevate</td></tr><tr><td>loro</td><td class='regular'>vivevano</td></tr></tbody></table></div>"
            },
            volare: {
                term: "volare",
                definition: "fly",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>volo</td></tr><tr><td>tu</td><td class='regular'>voli</td></tr><tr><td>lui/lei</td><td class='regular'>vola</td></tr><tr><td>noi</td><td class='regular'>voliamo</td></tr><tr><td>voi</td><td class='regular'>volate</td></tr><tr><td>loro</td><td class='regular'>volano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>volavo</td></tr><tr><td>tu</td><td class='regular'>volavi</td></tr><tr><td>lui/lei</td><td class='regular'>volava</td></tr><tr><td>noi</td><td class='regular'>volavamo</td></tr><tr><td>voi</td><td class='regular'>volavate</td></tr><tr><td>loro</td><td class='regular'>volavano</td></tr></tbody></table></div>"
            },
            volere: {
                term: "volere",
                definition: "want",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='irregular'>voglio</td></tr><tr><td>tu</td><td class='irregular'>vuoi</td></tr><tr><td>lui/lei</td><td class='irregular'>vuole</td></tr><tr><td>noi</td><td class='irregular'>vogliamo</td></tr><tr><td>voi</td><td class='regular'>volete</td></tr><tr><td>loro</td><td class='irregular'>vogliono</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>volevo</td></tr><tr><td>tu</td><td class='regular'>volevi</td></tr><tr><td>lui/lei</td><td class='regular'>voleva</td></tr><tr><td>noi</td><td class='regular'>volevamo</td></tr><tr><td>voi</td><td class='regular'>volevate</td></tr><tr><td>loro</td><td class='regular'>volevano</td></tr></tbody></table></div>"
            },
            voltare: {
                term: "voltare",
                definition: "turn",
                support: "<div><p>Present</p><table><tbody><tr><td>io</td><td class='regular'>volto</td></tr><tr><td>tu</td><td class='regular'>volti</td></tr><tr><td>lui/lei</td><td class='regular'>volta</td></tr><tr><td>noi</td><td class='regular'>voltiamo</td></tr><tr><td>voi</td><td class='regular'>voltate</td></tr><tr><td>loro</td><td class='regular'>voltano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td class='regular'>voltavo</td></tr><tr><td>tu</td><td class='regular'>voltavi</td></tr><tr><td>lui/lei</td><td class='regular'>voltava</td></tr><tr><td>noi</td><td class='regular'>voltavamo</td></tr><tr><td>voi</td><td class='regular'>voltavate</td></tr><tr><td>loro</td><td class='regular'>voltavano</td></tr></tbody></table></div>"
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
                ops$1.storedData.incorrectTerms = ops$1.storedData.incorrectTerms || {};

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
                    ops$1.storedData.viewedTerms = ops$1.storedData.viewedTerms || {};
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

    // Imports
    // Create app view
    var viewCreate = function viewCreate(termsToCreate) {

        var viewHTML = "";

        // Create HTML for terms
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = termsToCreate[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;


                // Get terms and definitions from data
                var termValue = appData.terms[value].term;
                var definitionValue = appData.terms[value].definition;
                var supportValue = appData.terms[value].support;
                var revealCounter = void 0;
                var viewsCount = void 0;

                // Check storage for revealed count
                if (ops$1.storedData.revealDailyBonus === undefined) {
                    viewsCount = 0;
                } else {
                    viewsCount = ops$1.storedData.revealDailyBonus[value] || 0;
                }

                // Create terms HTML
                var newHolder = '<div class="m-term-wrapper ' + termValue + '">\n                <p class="term-holder">' + termValue + '</p>\n                <div class="theme-holder"><p class="symbol-holder"></p></div>\n                <div class="right">\n                    <p class="term-views"><span>Goal:</span> <span class="count">' + viewsCount + '</span> / ' + ops$1.revealDailyBonusTarget + '</p>\n                    <button class="reveal">Reveal</button>\n                </div>\n                <div class="definition-wrapper hidden">\n                    <p class="definition-holder">' + definitionValue + '</p>\n                    <div class="helpers">\n                        <a href="#" class="lookup"></a>\n                        <a href="#" class="colour"></a>\n                        <a href="#" class="symbol"></a>\n                    </div>\n                    <div class="support-wrapper">' + supportValue + '</div>\n                </div>\n            </div>';

                viewHTML += newHolder;
            }
            // Add to view
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

        ops$1.container.innerHTML = viewHTML;

        // Add theme to previously created terms
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = termsToCreate[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _value = _step2.value;

                var _termValue = appData.terms[_value].term;

                // Check storage for assigned colour
                ops$1.storedData.viewedTerms = ops$1.storedData.viewedTerms || {};

                if (ops$1.storedData.viewedTerms[_termValue] !== undefined && ops$1.storedData.viewedTerms[_termValue].colour !== undefined) {
                    var termWrapper = document.querySelector('.' + _termValue + '');
                    var pickedColour = ops$1.storedData.viewedTerms[_termValue].colour;
                    // Add colour to object
                    termWrapper.querySelector('.theme-holder').style.background = pickedColour;
                    termWrapper.querySelector('.theme-holder').classList.add('bg-active');
                    termWrapper.querySelector('.term-holder').style.color = "#fff";
                }
                // Check storage for assigned symbol
                if (ops$1.storedData.viewedTerms[_termValue] !== undefined && ops$1.storedData.viewedTerms[_termValue].symbol !== undefined) {
                    var _termWrapper = document.querySelector('.' + _termValue + '');
                    var pickedSymbol = ops$1.storedData.viewedTerms[_termValue].symbol;
                    // Add symbol to object
                    _termWrapper.querySelector('.symbol-holder').innerHTML = pickedSymbol;
                }
            }

            // Add countdown timers to term buttons
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

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = termsToCreate[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _value2 = _step3.value;


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

        // Pick a term for query
        var randomTerm = void 0;
        var i = 0;

        // If no stored data for reveal countdowns
        ops$1.storedData.queryTerms = ops$1.storedData.queryTerms || {};

        // Set correctTerms storage if not exists
        ops$1.storedData.correctTerms = ops$1.storedData.correctTerms || {};

        // Set incorrectTerms storage if not exists
        ops$1.storedData.incorrectTerms = ops$1.storedData.incorrectTerms || {};

        // Prevent choosing query already answered correct
        while (i < Object.keys(ops$1.storedData.viewedTerms).length) {

            if (ops$1.storedData.dailyQuery === undefined) {
                // Pick a random term
                randomTerm = pickRandom(ops$1.storedData.viewedTerms);
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
            if (i === Object.keys(ops$1.storedData.viewedTerms).length) {
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
                    winCase("mispelled", queryInput);
                } else if (queryInput === "") {
                    resultHolder.innerHTML = "Enter a definition.";
                    resultHolder.classList.remove('hidden');
                } else {
                    loseCase();
                }
            });

            // If definition is right
            function winCase(spelling, input) {
                // Hide the query input
                document.querySelector('.query-form').classList.add('hidden');
                heartHolder.classList.add('hidden');
                // If mispelled
                if (spelling === "mispelled") {
                    // Display win message
                    resultHolder.innerHTML = "Well done but check your spelling (" + input + "), the definition is <strong>\"" + definition + "\"</strong>";
                    resultHolder.classList.remove('hidden');
                } else {
                    // Display win message
                    resultHolder.innerHTML = "Well done, the definition is <strong>\"" + definition + "\"</strong>";
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
                    document.querySelector('.query-form').classList.add('hidden');
                    heartHolder.classList.add('hidden');
                    // Update DOM
                    queryInput.value = "";
                    queryInput.placeholder = "Enter the definition";
                    // Update view
                    resultHolder.innerHTML = "Sorry, you are out of attempts!";
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

            // Set storedData
            ops$1.storedData.viewedTerms = ops$1.storedData.viewedTerms || {};
            ops$1.storedData.viewedTerms[term] = ops$1.storedData.viewedTerms[term] || {};
            ops$1.storedData.viewedTerms[term].viewCount = ops$1.storedData.viewedTerms[term].viewCount || -1;
            ops$1.storedData.viewedTerms[term].viewCount += 1;

            // Daily reveal bonus
            var revealBonusCount = void 0;

            // If no existing term bonus
            if (ops$1.storedData.revealDailyBonus[term] === undefined) {
                revealBonusCount = 1;
            }
            // Add one to daily bonus
            else {
                    revealBonusCount = ops$1.storedData.revealDailyBonus[term];
                    revealBonusCount += 1;
                }
            // Update DOM
            countHolder.innerHTML = revealBonusCount;
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
        ops$1.storedData.revealCountdowns = ops$1.storedData.revealCountdowns || {};

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

    // Allows for text to speech
    var textToSpeech = function textToSpeech() {

        var termHolder = document.querySelectorAll('.term-holder');

        clickListener(termHolder, function (i) {
            var speech = new SpeechSynthesisUtterance(termHolder[i].innerHTML);
            speech.lang = "it";
            window.speechSynthesis.speak(speech);
        });
    };

    // Retrieves dictionary references
    var dictionaryLookup = function dictionaryLookup() {

        var dictionaryBtn = document.querySelectorAll('.lookup');
        var modal = document.querySelector('.m-modal');

        clickListener(dictionaryBtn, function (i) {
            var term = dictionaryBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

            // Bring up modal
            modal.classList.remove('hidden');
            document.querySelector('.container').classList.add('modal-active');

            var view = '<header>\n                        <h2 class="dictionary">Dictionary definitions</h2>\n                    </header>\n                    <p>' + term + ':</p>\n                    <ul class="definitions">\n                    </ul>';

            modal.querySelector('.content').innerHTML += view;
            var definitionHolder = modal.querySelector('.definitions');

            // Make request to Glosbe
            jsonp('https://glosbe.com/gapi/translate?from=ita&dest=eng&format=json&pretty=true&phrase=' + term.toLowerCase() + '').then(function (data) {
                var dictionaryResponses = "";

                try {
                    (function () {
                        var findProp = function findProp(obj, key, out) {
                            var i = void 0;
                            var proto = Object.prototype;
                            var ts = proto.toString;
                            var hasOwn = proto.hasOwnProperty.bind(obj);

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
                        };
                        // Add to DOM


                        // Search through data for "meanings"
                        findProp(data, "text");

                        definitionHolder.innerHTML = dictionaryResponses;
                    })();
                } catch (err) {
                    cl('error');
                }
            });
        });
    };

    // Adds colours to term holders
    var addColour = function addColour() {

        var modal = document.querySelector('.m-modal');
        var colourBtn = document.querySelectorAll('.colour');
        var picker = void 0;
        var colours = void 0;

        clickListener(colourBtn, function (i) {
            // Bring up modal
            modal.classList.remove('hidden');
            document.querySelector('.container').classList.add('modal-active');

            var termHolder = colourBtn[i].parentNode.parentNode.parentNode;
            var term = colourBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

            var view = '<header>\n                        <h2 class="colour">Colour picker</h2>\n                    </header>\n                    <p>Click below to add a colour for "<span class="colour-term">' + term + '</span>":</p>\n                    <ul class="colour-wrap">\n                        <li><a href="#" data-colour="#1abc9c"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#3498db"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#9b59b6"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#f1c40f"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#e67e22"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#e74c3c"></a></li>\n                    </ul>';

            // Add view
            modal.querySelector('.content').innerHTML += view;

            var coloursHolder = modal.querySelector('.colour-wrap');
            // Add colour vars
            colours = coloursHolder.getElementsByTagName('a');
            colourListener();
        });

        // Add colour function
        function colourListener() {
            var term = document.querySelector('.colour-term').innerHTML;
            var termWrapper = document.querySelector('.' + term + '');

            // Pick a colour
            clickListener(colours, function (i) {
                var pickedColour = colours[i].getAttribute('data-colour');
                // Add colour to object
                termWrapper.querySelector('.theme-holder').style.background = pickedColour;
                termWrapper.querySelector('.theme-holder').classList.add('bg-active');
                termWrapper.querySelector('.term-holder').style.color = "#fff";
                // Set storage
                ops$1.storedData.viewedTerms[term].colour = pickedColour;
                localforage.setItem('ops.storedData', ops$1.storedData);
                // Hide modal
                hideModal(true);
            });
        }
    };

    // Symbol picker
    var pickSymbol = function pickSymbol() {
        var modal = document.querySelector('.m-modal');
        var symbolBtn = document.querySelectorAll('.symbol');
        var symbolRanges = [[0x2600, 0x26FF], [0x1200, 0x135A], [0xA000, 0xA48C]];
        var symbolHTML = "<tr>";
        var k = 0;

        for (var j = 0; j < symbolRanges.length; j++) {

            for (var i = symbolRanges[j][0]; i < symbolRanges[j][1]; i++) {

                if (k % 5 === 0 && k != 0) {
                    symbolHTML += '</tr><tr>';
                }

                var symbol = String.fromCodePoint(i);
                symbolHTML += '<td><p>' + symbol + '</p></td>';
                k++;

                if (i === symbolRanges[j][1] - 1) {
                    symbolHTML += "</tr>";
                }
            }
        }

        clickListener(symbolBtn, function (i) {
            // Bring up modal
            modal.classList.remove('hidden');
            document.querySelector('.container').classList.add('modal-active');

            var termHolder = symbolBtn[i].parentNode.parentNode.parentNode;
            var term = symbolBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

            var view = '<header>\n                        <h2 class="symbol">Glyph picker</h2>\n                    </header>\n                    <p>Click below to add a glyph for "<span class="symbol-term">' + term + '</span>":</p>\n                    <div class="symbol-wrap">\n                        <table>' + symbolHTML + '</table>\n                    </div>';

            // Add view
            modal.querySelector('.content').innerHTML += view;

            symbolListener();
        });
        // Check for clicked symbol
        function symbolListener() {
            var term = document.querySelector('.symbol-term').innerHTML;
            var termWrapper = document.querySelector('.' + term + '');
            var pickedSymbol = "";

            modal.getElementsByTagName('table')[0].addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                pickedSymbol = target.innerHTML.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");

                // Add symbol to object
                termWrapper.querySelector('.symbol-holder').innerHTML = pickedSymbol;
                // Set storage
                ops$1.storedData.viewedTerms[term].symbol = pickedSymbol;
                localforage.setItem('ops.storedData', ops$1.storedData);
                // Hide modal
                hideModal(true);
            }, false);
        }
    };

    // Hide modal
    var hideModal = function hideModal(trigger) {
        var modal = document.querySelector('.m-modal');
        var modalClose = modal.querySelector('.close');

        modalClose.addEventListener("click", function (e) {
            e.preventDefault();
            closeModal();
        });
        // Programatically close modal
        if (trigger) {
            closeModal();
        }
        // Hide modal
        function closeModal() {
            document.querySelector('.container').classList.remove('modal-active');
            modal.classList.add('hidden');
            modal.querySelector('.content').innerHTML = "";
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
        addDay: false,
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

                // Clear daily goals
                delete ops$1.storedData.revealedTermCount;
                delete ops$1.storedData.revealDailyBonus;

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

        // Add to storage
        localforage.setItem('ops.storedData', ops$1.storedData);

        // Handles events for revealed terms
        revealedBtnHandler();
        dictionaryLookup();
        textToSpeech();
        addColour();
        pickSymbol();
        hideModal();

        // Keep query active each day
        ops$1.storedData.queryComplete = ops$1.storedData.queryComplete || {};

        if (ops$1.storedData.newDay === true) {
            // Reset daily counters
            delete ops$1.storedData.dailyQuery;
            delete ops$1.storedData.revealCountdowns;

            ops$1.storedData.queryComplete = false;
            ops$1.storedData.remindedTerms = ops$1.storedData.remindedTerms || {};

            // Delete daily reminder
            if (ops$1.storedData.remindedTerms.dailyReminder !== undefined) {
                delete ops$1.storedData.remindedTerms.dailyReminder;
            }
        }
        // Create query if revealed terms
        if (ops$1.storedData.viewedTerms !== undefined && ops$1.storedData.queryComplete === false) {
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
