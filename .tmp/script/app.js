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

    // Gets data from Google Sheets
    var buildData = function buildData(data) {
        tinyTerms$1[tinyTerms$1.pickedList].speechLang = data.Sheet1.elements[0][tinyTerms$1.pickedList];
        tinyTerms$1[tinyTerms$1.pickedList].dictFrom = data.Sheet1.elements[1][tinyTerms$1.pickedList];
        tinyTerms$1[tinyTerms$1.pickedList].dictTo = data.Sheet1.elements[2][tinyTerms$1.pickedList];
        tinyTerms$1[tinyTerms$1.pickedList].action = data.Sheet1.elements[3][tinyTerms$1.pickedList];
        tinyTerms$1[tinyTerms$1.pickedList].terms = tinyTerms$1[tinyTerms$1.pickedList].terms || {};

        for (var i = 1; i < data.Sheet1.elements.length; i++) {
            var termContent = data.Sheet1.elements[i].Term;
            var definitionContent = data.Sheet1.elements[i].Definition;
            var supportContent = data.Sheet1.elements[i].Support;

            tinyTerms$1[tinyTerms$1.pickedList].terms[termContent] = {};
            tinyTerms$1[tinyTerms$1.pickedList].terms[termContent].term = termContent;
            tinyTerms$1[tinyTerms$1.pickedList].terms[termContent].definition = definitionContent;
            tinyTerms$1[tinyTerms$1.pickedList].terms[termContent].support = supportContent;
        }
        tinyTerms$1.postBuildCallback();
    };

    // Checks if the same or new day
    function checkSameDay() {

        var todaysDate = getTodaysDate();
        var storedDate = [];

        // Get date last stored
        storedDate = Array.from(tinyTerms$1[tinyTerms$1.pickedList].storedData.dateOpened);

        // Check if same day
        if (arrayCheck(todaysDate, storedDate) === true) {
            if (tinyTerms$1[tinyTerms$1.pickedList].ops.addDay === true) {
                tinyTerms$1[tinyTerms$1.pickedList].storedData.newDay = true;
            } else {
                tinyTerms$1[tinyTerms$1.pickedList].storedData.newDay = false;
            }
        }
        // Otherwise a new day
        else {
                tinyTerms$1[tinyTerms$1.pickedList].storedData.newDay = true;
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
        if (relevance > tinyTerms$1[tinyTerms$1.pickedList].ops.wordAccuracy) return "mispelled";

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
            if (evt.type in evtMap) {
                //cl(evtMap[evt.type]);
            } else {
                location.reload();
            }
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

    // Imports
    // Creates a list of terms
    var getListOfTerms = function getListOfTerms() {

        var i = 0;
        var j = 0;
        var listOfTerms = [];
        var scannedTerms = [];
        var dataLength = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].terms).length;

        // Prevent overflow
        if (tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms > dataLength) {
            tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms = dataLength;
        }

        // First time app opened
        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.firstTime === undefined) {

            while (i < tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms) {
                var pickedTerm = pickRandom(tinyTerms$1[tinyTerms$1.pickedList].terms);

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
                tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms || {};

                if (Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms).length > 0) {

                    var reminderTerm = void 0;

                    // Add reminded terms list
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.remindedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.remindedTerms || {};

                    // Keep reminded term the same
                    if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder === undefined) {
                        tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder = {};
                        reminderTerm = pickRandom(tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms);
                        tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder[reminderTerm] = tinyTerms$1[tinyTerms$1.pickedList].terms[reminderTerm].definition;
                    } else {
                        reminderTerm = tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder;
                        reminderTerm = Object.getOwnPropertyNames(reminderTerm);
                    }
                    // Add to terms
                    listOfTerms.push(reminderTerm);
                    // Remove from incorrect terms
                    delete tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms[reminderTerm];
                    // Add to list of reminded terms
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.remindedTerms[reminderTerm] = tinyTerms$1[tinyTerms$1.pickedList].terms[reminderTerm].definition;
                    i++;
                }
                // Choose terms to  display
                while (i < tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms) {
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms || {};
                    var viewedLength = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms).length;

                    // If all terms viewed
                    if (viewedLength === dataLength) {

                        var viewedSorted = [];

                        // Convert viewed terms to array
                        for (var term in tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms) {
                            viewedSorted.push([term, tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term]]);
                        }
                        // If reminder term picked remove from selection
                        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder !== undefined) {
                            for (var m = viewedSorted.length - 1; m >= 0; m--) {
                                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder.hasOwnProperty(viewedSorted[m][0])) {
                                    viewedSorted.splice(m, 1);
                                }
                            }
                        }
                        // Sort array by view count
                        viewedSorted.sort(function (a, b) {
                            return a[1] - b[1];
                        });
                        // Finish off iterator with lowest viewed terms
                        while (i < tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms) {
                            listOfTerms.push(viewedSorted[i][0]);
                            i++;
                        }
                        // Overflow protection
                        i++;
                    }
                    // Still unviewed terms in data
                    else {
                            var _pickedTerm = pickRandom(tinyTerms$1[tinyTerms$1.pickedList].terms);

                            // Ensure term hasn't been already scanned
                            if (!scannedTerms.includes(_pickedTerm)) {
                                scannedTerms.push(_pickedTerm);

                                // Ensure term not viewed before
                                if (!tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms.hasOwnProperty(_pickedTerm)) {
                                    listOfTerms.push(_pickedTerm);
                                    i++;
                                }
                            }
                        }
                    // Overflow protection
                    if (j > 10000) {
                        i = tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms;
                    }
                    j++;
                }
            }
        // Return final list of terms
        return listOfTerms;
    };

    // App data

    var appData = {
        fonts: {
            feather: ["icon-lines-and-angles_accommodate", "icon-lines-and-angles_adapt", "icon-lines-and-angles_add", "icon-lines-and-angles_adjust", "icon-lines-and-angles_agitate", "icon-lines-and-angles_agree", "icon-lines-and-angles_aid", "icon-lines-and-angles_alarm", "icon-lines-and-angles_alert", "icon-lines-and-angles_amaze", "icon-lines-and-angles_amplify", "icon-lines-and-angles_analyze", "icon-lines-and-angles_announce", "icon-lines-and-angles_arrest", "icon-lines-and-angles_ascend", "icon-lines-and-angles_ask", "icon-lines-and-angles_assist", "icon-lines-and-angles_attract", "icon-lines-and-angles_augment", "icon-lines-and-angles_bake", "icon-lines-and-angles_balance", "icon-lines-and-angles_battle", "icon-lines-and-angles_be", "icon-lines-and-angles_believe", "icon-lines-and-angles_birth", "icon-lines-and-angles_blaze", "icon-lines-and-angles_blend", "icon-lines-and-angles_bloom", "icon-lines-and-angles_blow", "icon-lines-and-angles_bookmark", "icon-lines-and-angles_bootleg", "icon-lines-and-angles_bounce", "icon-lines-and-angles_break", "icon-lines-and-angles_brew", "icon-lines-and-angles_broadcast", "icon-lines-and-angles_browse", "icon-lines-and-angles_build", "icon-lines-and-angles_burn", "icon-lines-and-angles_bury", "icon-lines-and-angles_buy", "icon-lines-and-angles_caffeinate", "icon-lines-and-angles_calculate", "icon-lines-and-angles_calibrate", "icon-lines-and-angles_carry", "icon-lines-and-angles_carve", "icon-lines-and-angles_cast", "icon-lines-and-angles_catch", "icon-lines-and-angles_cease", "icon-lines-and-angles_celebrate", "icon-lines-and-angles_challenge", "icon-lines-and-angles_charge", "icon-lines-and-angles_charm", "icon-lines-and-angles_chart", "icon-lines-and-angles_chat", "icon-lines-and-angles_choose", "icon-lines-and-angles_chop", "icon-lines-and-angles_clean", "icon-lines-and-angles_cleanse", "icon-lines-and-angles_climb", "icon-lines-and-angles_drum", "icon-lines-and-angles_eat", "icon-lines-and-angles_edit", "icon-lines-and-angles_enhance", "icon-lines-and-angles_enlarge", "icon-lines-and-angles_enter", "icon-lines-and-angles_equal", "icon-lines-and-angles_erase", "icon-lines-and-angles_examine", "icon-lines-and-angles_experiment", "icon-lines-and-angles_explore", "icon-lines-and-angles_extrude", "icon-lines-and-angles_feed", "icon-lines-and-angles_fight", "icon-lines-and-angles_fill", "icon-lines-and-angles_film", "icon-lines-and-angles_filter", "icon-lines-and-angles_find", "icon-lines-and-angles_finish", "icon-lines-and-angles_fix", "icon-lines-and-angles_flag", "icon-lines-and-angles_float", "icon-lines-and-angles_flow", "icon-lines-and-angles_fly", "icon-lines-and-angles_focus", "icon-lines-and-angles_fold", "icon-lines-and-angles_forbid", "icon-lines-and-angles_forebode", "icon-lines-and-angles_fork", "icon-lines-and-angles_format", "icon-lines-and-angles_game", "icon-lines-and-angles_give", "icon-lines-and-angles_glance", "icon-lines-and-angles_grill", "icon-lines-and-angles_grow", "icon-lines-and-angles_guide", "icon-lines-and-angles_hang", "icon-lines-and-angles_harvest", "icon-lines-and-angles_haunt", "icon-lines-and-angles_heal", "icon-lines-and-angles_hear", "icon-lines-and-angles_hide", "icon-lines-and-angles_hold", "icon-lines-and-angles_home", "icon-lines-and-angles_identify", "icon-lines-and-angles_imagine", "icon-lines-and-angles_influence", "icon-lines-and-angles_inject", "icon-lines-and-angles_invade", "icon-lines-and-angles_iron", "icon-lines-and-angles_jam", "icon-lines-and-angles_join", "icon-lines-and-angles_judge", "icon-lines-and-angles_keep", "icon-lines-and-angles_kick", "icon-lines-and-angles_pitch", "icon-lines-and-angles_plan", "icon-lines-and-angles_plant", "icon-lines-and-angles_play", "icon-lines-and-angles_push", "icon-lines-and-angles_rain", "icon-lines-and-angles_read", "icon-lines-and-angles_record", "icon-lines-and-angles_redo", "icon-lines-and-angles_reheat", "icon-lines-and-angles_remind", "icon-lines-and-angles_repeat", "icon-lines-and-angles_report", "icon-lines-and-angles_resurrect", "icon-lines-and-angles_rewind", "icon-lines-and-angles_ride", "icon-lines-and-angles_ring", "icon-lines-and-angles_rise", "icon-lines-and-angles_rock", "icon-lines-and-angles_roll", "icon-lines-and-angles_rule", "icon-lines-and-angles_run", "icon-lines-and-angles_save", "icon-lines-and-angles_schedule", "icon-lines-and-angles_screw", "icon-lines-and-angles_scroll", "icon-lines-and-angles_search", "icon-lines-and-angles_see", "icon-lines-and-angles_select", "icon-lines-and-angles_sell", "icon-lines-and-angles_send", "icon-lines-and-angles_sew", "icon-lines-and-angles_shade", "icon-lines-and-angles_shake", "icon-lines-and-angles_share", "icon-lines-and-angles_shine", "icon-lines-and-angles_shop", "icon-lines-and-angles_shower", "icon-lines-and-angles_shuffle", "icon-lines-and-angles_sing", "icon-lines-and-angles_sit", "icon-lines-and-angles_skip", "icon-lines-and-angles_sleep", "icon-lines-and-angles_slice", "icon-lines-and-angles_slide", "icon-lines-and-angles_smell", "icon-lines-and-angles_smuggle", "icon-lines-and-angles_snow", "icon-lines-and-angles_solve", "icon-lines-and-angles_sound", "icon-lines-and-angles_sparkle", "icon-lines-and-angles_speak", "icon-lines-and-angles_spin", "icon-lines-and-angles_spy", "icon-lines-and-angles_stack", "icon-lines-and-angles_stamp", "icon-lines-and-angles_steam", "icon-lines-and-angles_stomp", "icon-lines-and-angles_stop", "icon-lines-and-angles_strum", "icon-lines-and-angles_study", "icon-lines-and-angles_submerge", "icon-lines-and-angles_succeed", "icon-lines-and-angles_sweep", "icon-lines-and-angles_swim", "icon-lines-and-angles_sync", "icon-lines-and-angles_tag", "icon-lines-and-angles_target", "icon-lines-and-angles_teach", "icon-lines-and-angles_think", "icon-lines-and-angles_thunder", "icon-lines-and-angles_tie", "icon-lines-and-angles_tower", "icon-lines-and-angles_transport", "icon-lines-and-angles_trash", "icon-lines-and-angles_travel", "icon-lines-and-angles_trend", "icon-lines-and-angles_turn", "icon-lines-and-angles_type", "icon-lines-and-angles_undo", "icon-lines-and-angles_unlock", "icon-lines-and-angles_upload", "icon-lines-and-angles_use", "icon-lines-and-angles_wait", "icon-lines-and-angles_wash", "icon-lines-and-angles_watch", "icon-lines-and-angles_wear", "icon-lines-and-angles_weigh", "icon-lines-and-angles_win", "icon-lines-and-angles_work", "icon-lines-and-angles_worship", "icon-lines-and-angles_write", "icon-lines-and-angles_yell", "icon-lines-and-angles_clip", "icon-lines-and-angles_close", "icon-lines-and-angles_code", "icon-lines-and-angles_collect", "icon-lines-and-angles_commit", "icon-lines-and-angles_connect", "icon-lines-and-angles_contact", "icon-lines-and-angles_contain", "icon-lines-and-angles_control", "icon-lines-and-angles_cook", "icon-lines-and-angles_cool", "icon-lines-and-angles_copy", "icon-lines-and-angles_crave", "icon-lines-and-angles_create", "icon-lines-and-angles_creep", "icon-lines-and-angles_crop", "icon-lines-and-angles_cry", "icon-lines-and-angles_curdle", "icon-lines-and-angles_cut", "icon-lines-and-angles_dance", "icon-lines-and-angles_dazzle", "icon-lines-and-angles_decide", "icon-lines-and-angles_defend", "icon-lines-and-angles_deliver", "icon-lines-and-angles_design", "icon-lines-and-angles_destroy", "icon-lines-and-angles_develop", "icon-lines-and-angles_die", "icon-lines-and-angles_disappear", "icon-lines-and-angles_discard", "icon-lines-and-angles_discover", "icon-lines-and-angles_disguise", "icon-lines-and-angles_divide", "icon-lines-and-angles_download", "icon-lines-and-angles_draw", "icon-lines-and-angles_drill", "icon-lines-and-angles_drink", "icon-lines-and-angles_drive", "icon-lines-and-angles_drop", "icon-lines-and-angles_kiss", "icon-lines-and-angles_launch", "icon-lines-and-angles_lick", "icon-lines-and-angles_lift", "icon-lines-and-angles_light", "icon-lines-and-angles_like", "icon-lines-and-angles_link", "icon-lines-and-angles_live", "icon-lines-and-angles_load", "icon-lines-and-angles_locate", "icon-lines-and-angles_lock", "icon-lines-and-angles_madho", "icon-lines-and-angles_manufacture", "icon-lines-and-angles_mark", "icon-lines-and-angles_measure", "icon-lines-and-angles_medicate", "icon-lines-and-angles_melt", "icon-lines-and-angles_merge", "icon-lines-and-angles_mill", "icon-lines-and-angles_move", "icon-lines-and-angles_multiply", "icon-lines-and-angles_mute", "icon-lines-and-angles_navigate", "icon-lines-and-angles_open", "icon-lines-and-angles_pack", "icon-lines-and-angles_paint", "icon-lines-and-angles_park", "icon-lines-and-angles_paste", "icon-lines-and-angles_pause", "icon-lines-and-angles_pay", "icon-lines-and-angles_perform", "icon-lines-and-angles_photograph", "icon-lines-and-angles_pick", "icon-lines-and-angles_pin", "icon-lines-and-angles_plot", "icon-lines-and-angles_point", "icon-lines-and-angles_poison", "icon-lines-and-angles_present", "icon-lines-and-angles_press", "icon-lines-and-angles_primp", "icon-lines-and-angles_print", "icon-lines-and-angles_pucker"]
        }
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
                var termValue = tinyTerms$1[tinyTerms$1.pickedList].terms[value].term;
                var definitionValue = tinyTerms$1[tinyTerms$1.pickedList].terms[value].definition;
                var supportValue = tinyTerms$1[tinyTerms$1.pickedList].terms[value].support;
                var revealCounter = void 0;
                var viewsCount = void 0;

                // Check storage for revealed count
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus === undefined) {
                    viewsCount = 0;
                } else {
                    viewsCount = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus[value] || 0;
                }

                document.querySelector('h1').innerHTML = tinyTerms$1.pickedList;
                document.querySelector('.list-action').innerHTML = tinyTerms$1[tinyTerms$1.pickedList].action + '<span class="query-holder"></span>';

                // Create terms HTML
                var newHolder = '<div class="m-term-wrapper ' + termValue + '">\n                <p class="term-holder">' + termValue + '</p>\n                <div class="theme-holder"><p class="symbol-holder"></p></div>\n                <div class="right">\n                    <p class="term-views"><span>Goal:</span> <span class="count">' + viewsCount + '</span> / ' + tinyTerms$1[tinyTerms$1.pickedList].ops.revealDailyBonusTarget + '</p>\n                    <button class="reveal">Reveal</button>\n                </div>\n                <div class="definition-wrapper hidden">\n                    <p class="definition-holder">' + definitionValue + '</p>\n                    <div class="helpers">\n                        <a href="#" class="lookup"></a>\n                        <a href="#" class="colour"></a>\n                        <a href="#" class="symbol"></a>\n                    </div>\n                    <div class="support-wrapper">' + supportValue + '</div>\n                </div>\n            </div>';

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

        document.querySelector('.terms-wrapper').innerHTML = viewHTML;

        // Add theme to previously created terms
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = termsToCreate[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _value = _step2.value;

                var _termValue = tinyTerms$1[tinyTerms$1.pickedList].terms[_value].term;

                // Check storage for assigned colour
                tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms || {};

                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue] !== undefined && tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue].colour !== undefined) {
                    var termWrapper = document.querySelector('.' + _termValue + '');
                    var pickedColour = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue].colour;
                    // Add colour to object
                    termWrapper.querySelector('.theme-holder').style.background = pickedColour;
                    termWrapper.querySelector('.theme-holder').classList.add('bg-active');
                    termWrapper.querySelector('.term-holder').style.color = "#fff";
                    termWrapper.querySelector('.right').style.border = "0";
                }
                // Check storage for assigned symbol
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue] !== undefined && tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue].symbol !== undefined) {
                    var _termWrapper = document.querySelector('.' + _termValue + '');
                    var pickedSymbol = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue].symbol;
                    // Add symbol to object
                    _termWrapper.querySelector('.symbol-holder').classList = 'symbol-holder';
                    _termWrapper.querySelector('.symbol-holder').classList.add(pickedSymbol);
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
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns !== undefined) {

                    // Add countdown timers to buttons
                    if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[_value2] !== undefined) {

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
        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts === undefined) {
            tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts = tinyTerms$1[tinyTerms$1.pickedList].ops.points.hearts;
        }
        for (var i = 0; i < tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts; i++) {
            heartsHTML += '<p></p>';
        }
        // Add to view
        heartHolder.innerHTML = heartsHTML;

        // Add to storage
        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
    };

    // Sets the score
    var setScore = function setScore() {

        var scoreHolder = document.querySelector('.score-holder');

        // Set score if it doesn't exist
        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.score === undefined) {
            tinyTerms$1[tinyTerms$1.pickedList].storedData.score = 0;
        }

        var score = tinyTerms$1[tinyTerms$1.pickedList].storedData.score;

        // Add to view
        scoreHolder.innerHTML = score;
    };

    // Add progress bar
    var progressBar = function progressBar() {
        // Create correct terms default
        tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms || {};
        var completed = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms).length;
        var remaining = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].terms).length;

        // Add to DOM
        document.querySelector('.m-footer').querySelector('.completed').innerHTML = completed;
        document.querySelector('.m-footer').querySelector('.remaining').innerHTML = ' / ' + remaining;
        document.querySelector('.m-footer').querySelector('.progress-bar').style.width = completed / remaining * 100 + "%";
    };

    // Imports
    // Sets up query
    var createNewQuery = function createNewQuery(bonus) {

        // Pick a term for query
        var randomTerm = void 0;
        var i = 0;

        // If no stored data for reveal countdowns
        tinyTerms$1[tinyTerms$1.pickedList].storedData.queryTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.queryTerms || {};

        // Set correctTerms storage if not exists
        tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms || {};

        // Set incorrectTerms storage if not exists
        tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms || {};

        var cycledTerms = [];
        // Choose term from viewed terms
        while (i < Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms).length) {

            // If no daily term
            if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery === undefined) {
                // Pick a random term
                randomTerm = pickRandom(tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms);
            } else {
                randomTerm = tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery;
            }
            // Make sure not answered correctly before
            if (!tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms.hasOwnProperty(randomTerm)) {

                // If query not from daily reminder term
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder !== undefined) {
                    if (!tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder.hasOwnProperty(randomTerm)) {
                        queryHandler();
                        break;
                    }
                }
                // If query not from daily terms
                else if (!tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyTerms.hasOwnProperty(randomTerm)) {
                        queryHandler();
                        break;
                    }
            }
            if (!cycledTerms.indexOf(randomTerm)) {
                i++;
            }
            // Else look for another
            if (i === Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms).length) {
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
            var definition = tinyTerms$1[tinyTerms$1.pickedList].terms[randomTerm].definition;
            var count = 0;

            // Save to storage
            tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery = randomTerm;
            tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = false;

            localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);

            // Hide daily term definition if same
            if (document.querySelector('.' + randomTerm + '') !== null) {
                document.querySelector('.' + randomTerm + '').querySelector('.definition-wrapper').classList.add('hidden');
            }

            // Add hearts
            delete tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts;
            addHearts();

            // Show the query wrapper
            queryWrapper.classList.remove('hidden');

            // Change title if bonus
            if (bonus === true) {
                queryWrapper.getElementsByTagName('h2')[0].innerHTML = "Bonus Test";
            }

            // Set value of query
            queryHolder.innerHTML = randomTerm;

            window.addEventListener("keypress", function (e) {
                if (e.keyCode === 13) {
                    querySubmit.click();
                }
            });

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
                score += tinyTerms$1[tinyTerms$1.pickedList].ops.points.correct;
                // Update view
                scoreHolder.innerHTML = score;
                // Add to stored data
                tinyTerms$1[tinyTerms$1.pickedList].storedData.score = score;
                tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms[randomTerm] = definition;
                tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = true;
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery;
                // Check if whole term list answered correctly
                if (Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms).length === Object.keys(tinyTerms$1[tinyTerms$1.pickedList].terms).length) {
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.gameWon = true;
                    gameWon();
                }
                // Save to storage
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
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
                tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts -= 1;
                // If all hearts lost
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts === 0) {
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
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms[randomTerm] = definition;
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = true;
                    delete tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts;
                }
                // Save to storage
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
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

            // Animations
            definitionWrapper.classList.add('slideInUp', 'animated');
            revealBtn[i].parentNode.classList.add('rubberBand', 'animated');

            // Set storedData
            tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms || {};
            tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term] = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term] || {};
            tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].viewCount = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].viewCount || -1;
            tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].viewCount += 1;

            // Daily reveal bonus
            var revealBonusCount = void 0;

            // If no existing term bonus
            if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus[term] === undefined) {
                revealBonusCount = 1;
            }
            // Add one to daily bonus
            else {
                    revealBonusCount = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus[term];
                    revealBonusCount += 1;
                }
            // Update DOM
            countHolder.innerHTML = revealBonusCount;
            // If bonus is met
            if (revealBonusCount === tinyTerms$1[tinyTerms$1.pickedList].ops.revealDailyBonusTarget) {
                // Add term to learned terms list
                tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms || {};
                tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms[term] = true;
                // Update progress bar
                progressBar();
                // If daily bonus not already triggered
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus.complete === false) {
                    // Keep query active 
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = false;
                    // Create a new query
                    createNewQuery(true);
                }
                // Set only once a day
                tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus.complete = true;
                tinyTerms$1[tinyTerms$1.pickedList].storedData.score += tinyTerms$1[tinyTerms$1.pickedList].ops.points.dailyBonus;
                setScore();
            }
            tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus[term] = revealBonusCount;

            // Save to storage
            localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);

            // Starts a timer 
            createRevealTimer(revealBtn[i]);
        });
    };

    // Adds a timer to the reveal button
    var createRevealTimer = function createRevealTimer(revealBtn) {

        // If no stored data for reveal countdowns
        tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns || {};

        var term = [revealBtn.parentNode.parentNode.querySelector('.term-holder').innerHTML];
        var minutes = tinyTerms$1[tinyTerms$1.pickedList].ops.counterMins;
        var seconds = tinyTerms$1[tinyTerms$1.pickedList].ops.counterSecs;
        var remainingMinutes = void 0;
        var remainingSeconds = void 0;
        var startTime = void 0;
        var timerEnded = void 0;

        // New timer
        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[term] === undefined) {

            // Get a new time
            startTime = new Date().getTime();

            // Set storedData
            tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[term] = {
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
            startTime = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[term].startTime;
            timerEnded = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[term].timerEnded;

            // Get difference in seconds
            var diffSecs = Math.floor((nowTime - startTime) / 1000);
            // Get total in seconds
            var totalSecs = tinyTerms$1[tinyTerms$1.pickedList].ops.counterMins * 60 + seconds;

            // NowTime overtaken startTime
            if (diffSecs >= totalSecs) {
                timerEnded = true;
                // Stop interval
                clearInterval(tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[term].timerUpdate);
                // Clear storage for term timer
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[term];
            }
            // Timer stopped, return to normal
            if (timerEnded === true) {
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
                return false;
            }
            // Set remaining time 
            remainingSeconds = totalSecs - diffSecs;
        }

        // Set start time to storage
        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);

        var timeout = void 0;
        var checkCount = 0;

        // If timer is active   
        if (timerEnded === false) {

            // Start timer interval
            tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns[term].timerUpdate = setInterval(function () {
                // Resync timer in some devices when off screen
                checkCount += 1;
                if (checkCount % 5 === 0) {
                    startTimer();
                }
                // Call UI timer build
                buttonTimer();
            }, 1000);
        } else {
            revealBtn.innerHTML = "Reveal";
            revealBtn.classList.remove('disabled');
            revealBtn.disabled = false;
        }

        // Builds the timer
        function buttonTimer() {
            var displayedMinutes = Math.floor(remainingSeconds / 60);
            var displayedSeconds = remainingSeconds % 60;
            var hiddenZero = '';

            // Timer end
            if (remainingSeconds <= 0) {
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
            speech.lang = tinyTerms$1[tinyTerms$1.pickedList].speechLang;
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
            document.getElementsByTagName('body')[0].classList.add('modal-active');

            var view = '<header>\n                        <h2 class="dictionary">Dictionary definitions</h2>\n                    </header>\n                    <p>' + term + ':</p>\n                    <ul class="definitions">\n                    </ul>';

            modal.querySelector('.content').innerHTML += view;
            var definitionHolder = modal.querySelector('.definitions');

            // Make request to Glosbe
            jsonp('https://glosbe.com/gapi/translate?from=' + tinyTerms$1[tinyTerms$1.pickedList].dictFrom + 'a&dest=' + tinyTerms$1[tinyTerms$1.pickedList].dictTo + 'g&format=json&pretty=true&phrase=' + term.toLowerCase() + '').then(function (data) {
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
                    console.log('error');
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
            document.getElementsByTagName('body')[0].classList.add('modal-active');

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
                termWrapper.querySelector('.right').style.border = "0";
                // Set storage
                tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].colour = pickedColour;
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
                // Hide modal
                hideModal(true);
            });
        }
    };

    // Symbol picker
    var pickSymbol = function pickSymbol() {
        var modal = document.querySelector('.m-modal');
        var symbolBtn = document.querySelectorAll('.symbol');
        var symbolHTML = "<tr>";
        var symbols = appData.fonts;
        var k = 0;

        for (var i = 0; i < appData.fonts.feather.length; i++) {

            if (k % 5 === 0 && k != 0) {
                symbolHTML += '</tr><tr>';
            }
            symbolHTML += '<td><p class=' + appData.fonts.feather[i] + '></p></td>';
            k++;

            if (i === appData.fonts.feather.length - 1) {
                symbolHTML += "</tr>";
            }
        }

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

        clickListener(symbolBtn, function (i) {
            // Bring up modal
            modal.classList.remove('hidden');
            document.getElementsByTagName('body')[0].classList.add('modal-active');

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
                pickedSymbol = target.getAttribute("class");
                // Add symbol to object
                termWrapper.querySelector('.symbol-holder').classList = 'symbol-holder';
                termWrapper.querySelector('.symbol-holder').classList.add(pickedSymbol);
                // Set storage
                tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].symbol = pickedSymbol;
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
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
            document.getElementsByTagName('body')[0].classList.remove('modal-active');
            modal.classList.add('hidden');
            modal.querySelector('.content').innerHTML = "";
        }
    };

    // Imports
    // Show home screen
    var showHome = function showHome() {

        // Once loaded
        setTimeout(function () {
            document.getElementsByTagName('body')[0].classList = "";
            document.querySelector('.m-query-wrapper').classList.add('animated', 'slideInDown');
        }, 1000);

        // Show home screen
        var homeWrapper = document.querySelector('.m-menu');
        homeWrapper.classList.remove('hidden');

        // Add listener to nav
        var listItem = document.querySelector('.choose-list').querySelectorAll('a');

        for (var i = 0; i < listItem.length; i++) {
            listItem[i].addEventListener('click', function (event) {
                tinyTerms$1.pickedList = this.innerHTML;
                localforage.setItem('tinyTermsDefault', tinyTerms$1.pickedList);
                location.reload();
            });
        }
    };

    // Imports
    // App namespace
    var tinyTerms$1 = tinyTerms$1 || {};

    // Global options
    var ops = {
        displayedTerms: 5,
        counterMins: 60,
        counterSecs: 0,
        revealDailyBonusTarget: 5,
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

    // Default list choices
    tinyTerms$1.listChoices = {
        "Italian Verbs (ENG)": {
            name: "Italian Verbs (ENG)",
            sheetURL: "https://docs.google.com/spreadsheets/d/1Q1pmDXybg_GDB6bSXknuBET2Nm8L-Roi2Kj01SHm_WI/pubhtml"
        },
        "Computer Components": {
            name: "Computer Components",
            sheetURL: "https://docs.google.com/spreadsheets/d/1Ho5Viqg71mIBlbyAIjLIqHEWRr4znDCLZSBtwVTtZk0/edit"
        }
    };

    // Initialise modules on load
    ready(function () {
        'use strict';

        pickList();
    });

    // Pick a list
    var pickList = function pickList(skipDefaultCheck) {
        var tinyTermsDefault = void 0;

        // Check for default list, used on very first load
        localforage.getItem('tinyTermsDefault', function (err, value) {
            tinyTermsDefault = value;

            if (tinyTermsDefault === null) {
                showHome();
            } else {
                checkDefault();
            }
        });
        function checkDefault() {
            // Check for existing data of newly picked list
            localforage.getItem('tinyTerms' + tinyTermsDefault, function (err, value) {

                if (value !== null) {
                    tinyTerms$1.pickedList = tinyTermsDefault;
                    normalLoad(tinyTerms$1.pickedList);
                } else {
                    firstLoad();
                }
            });
        }
        function normalLoad(defaultlist) {

            tinyTerms$1.storedName = "tinyTerms" + defaultlist;

            localforage.getItem('tinyTerms' + defaultlist, function (err, value) {
                // Set session storage to stored
                tinyTerms$1[tinyTerms$1.pickedList] = value;
                // Update stored ops
                tinyTerms$1[tinyTerms$1.pickedList].ops = ops;
                initialise();
            });
        }
    };

    // Sets up new list, gets data
    var firstLoad = function firstLoad() {
        localforage.getItem('tinyTermsDefault', function (err, value) {
            // Set session storage to stored
            tinyTerms$1.pickedList = value;
            // Set picked list and create data object for it
            tinyTerms$1[tinyTerms$1.pickedList] = {};
            tinyTerms$1[tinyTerms$1.pickedList].storedData = {};
            tinyTerms$1[tinyTerms$1.pickedList].ops = ops;
            tinyTerms$1.storedName = "tinyTerms" + tinyTerms$1.pickedList;
            // Set new list to storage, add as default
            localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
            // Fetch data for list
            fetchData(tinyTerms$1.listChoices[tinyTerms$1.pickedList].sheetURL, firstTime);
        });
    };

    // Fetches list data
    var fetchData = function fetchData(sheetURL, postBuildCallback) {
        // Add a callback method
        tinyTerms$1.postBuildCallback = postBuildCallback;

        // Get data from sheets
        Tabletop.init({
            key: sheetURL,
            callback: buildData,
            simpleSheet: false
        });
    };

    // Runs if first time app has run
    var firstTime = function firstTime() {
        // Create terms
        appBuildHandler();
        // Then set first time to false
        tinyTerms$1[tinyTerms$1.pickedList].storedData.firstTime = false;
        // Add to storage
        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
    };

    // Initialises data and app
    var initialise = function initialise() {
        // Check if a new day
        checkSameDay();
        // Start build
        appBuildHandler();
    };

    // Calls functions to handle app creation and running
    var appBuildHandler = function appBuildHandler() {

        // Get initial terms
        var pickedTerms = void 0;

        // If same day, used daily terms
        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.newDay === false) {
            pickedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyTerms;
        }
        // Else get new  
        else {
                pickedTerms = getListOfTerms();

                // Clear daily goals
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.revealedTermCount;
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus;
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns;
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery;
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder;

                // Set daily limit
                tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus = {};
                // Reset daily reveal bonus
                tinyTerms$1[tinyTerms$1.pickedList].storedData.revealDailyBonus.complete = false;

                // Create query if revealed terms
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms !== undefined) {
                    createNewQuery();
                }

                // Create reminded terms default
                tinyTerms$1[tinyTerms$1.pickedList].storedData.remindedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.remindedTerms || {};
            }

        // Create initial view
        viewCreate(pickedTerms);
        setScore();

        // Create opened date, daily terms, viewed terms
        tinyTerms$1[tinyTerms$1.pickedList].storedData.dateOpened = getTodaysDate();
        tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyTerms = pickedTerms;

        // Add to storage
        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);

        // Keep query active each day
        tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete || {};

        // Load query if it exists already
        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery !== undefined && tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete !== true) {
            createNewQuery();
        }

        // Handles events for revealed terms
        revealedBtnHandler();
        dictionaryLookup();
        textToSpeech();
        addColour();
        pickSymbol();
        hideModal();
        progressBar();

        resetData();

        // Refresh window on blur
        appBlur();

        // Once loaded
        setTimeout(function () {
            document.getElementsByTagName('body')[0].classList = "";
            document.querySelector('.m-query-wrapper').classList.add('animated', 'slideInDown');
        }, tinyTerms$1[tinyTerms$1.pickedList].ops.loadDelay);

        // Set menu button listener
        var menuTrigger = document.getElementsByTagName('h1');

        menuTrigger[0].addEventListener('click', function () {
            showHome();
        });

        // Debug code
        if (tinyTerms$1[tinyTerms$1.pickedList].ops.debug === true) {
            cl(tinyTerms$1);
            //cl('Revealed terms count:');
            //cl(tinyTerms[tinyTerms.pickedList].storedData.revealedTermCount);
            //cl('Viewed terms count:');
            //cl(tinyTerms[tinyTerms.pickedList].storedData.viewedTerms);
            //cl('Revealed terms timer:');
            //cl(tinyTerms[tinyTerms.pickedList].storedData.revealCountdowns);
        }
    };

    return tinyTerms$1;
}();
//# sourceMappingURL=app.js.map
