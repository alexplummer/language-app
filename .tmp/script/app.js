'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var tinyTermsApp = function () {
    'use strict';

    // App data

    var appData = {
        fonts: {
            solid: ['icon-puchi-puchi_adapt', 'icon-puchi-puchi_affect', 'icon-puchi-puchi_alarm', 'icon-puchi-puchi_blaze', 'icon-puchi-puchi_call', 'icon-puchi-puchi_cry', 'icon-puchi-puchi_drink', 'icon-puchi-puchi_eat', 'icon-puchi-puchi_game', 'icon-puchi-puchi_judge', 'icon-puchi-puchi_like', 'icon-puchi-puchi_listen', 'icon-puchi-puchi_lock', 'icon-puchi-puchi_ring', 'icon-puchi-puchi_select', 'icon-puchi-puchi_speak', 'icon-puchi-puchi_think', 'icon-puchi-puchi_treat'],
            light: ['icon-feather_add', 'icon-feather_analyze', 'icon-feather_bloom', 'icon-feather_brew', 'icon-feather_climb', 'icon-feather_copy', 'icon-feather_crave', 'icon-feather_encourage', 'icon-feather_fall', 'icon-feather_fly', 'icon-feather_glow', 'icon-feather_grow', 'icon-feather_heat', 'icon-feather_laugh', 'icon-feather_manufacture', 'icon-feather_mine', 'icon-feather_plot', 'icon-feather_prick'],
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
                var termEncode = makeSafeClass(termValue);
                var revealCounter = void 0;
                var viewsCount = void 0;

                // Check storage for revealed count
                tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal || {};

                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal[termValue] === undefined) {
                    viewsCount = 0;
                } else {
                    viewsCount = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal[termValue] || 0;
                }

                // Star background
                if (tinyTerms$1.globalUnlocks.bgStars.active === 'unlocked') {
                    document.querySelector('body').classList.add('stars');
                }

                // Star background
                if (tinyTerms$1.globalUnlocks.bgLetters.active === 'unlocked') {
                    document.querySelector('body').classList.add('letters');
                }

                document.querySelector('h1').innerHTML = tinyTerms$1.pickedList;
                document.querySelector('.list-action').innerHTML = tinyTerms$1[tinyTerms$1.pickedList].action + '<span class="query-holder">' + tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery + '</span>';

                var particles = "";

                for (var j = 0; j < 50; j++) {
                    particles += '<div class="particle">&#9733;</div>';
                }

                // Create terms HTML
                var newHolder = '<div class="m-term-wrapper ' + termEncode + '">\n                <p class="term-holder">' + termValue + '</p>\n                <div class="theme-holder"><p class="symbol-holder"></p></div>\n                <div class="explosion">\n                    ' + particles + '\n                </div>\n                <div class="right">\n                    <p class="term-views"><span>Goal:</span> <span class="count">' + viewsCount + '</span> / ' + tinyTerms$1[tinyTerms$1.pickedList].ops.revealGoalTarget + '</p>\n                    <button class="reveal">Reveal</button>\n                </div>\n                <div class="definition-wrapper hidden">\n                    <p class="definition-holder">' + definitionValue + '</p>\n                    <div class="helpers">\n                        <a href="#" class="lookup"></a>\n                        <a href="#" class="colour"></a>\n                        <a href="#" class="symbol"></a>\n                    </div>\n                    <div class="support-wrapper">' + supportValue + '</div>\n                </div>\n            </div>';

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

        // Style terms based on number of lines
        var termHolders = document.querySelectorAll('.term-holder');

        for (var i = 0; i < termHolders.length; i++) {
            termHolders[i].style.minHeight = '0px';
            termHolders[i].classList.add('lines-' + countLines(termHolders[i]));
            termHolders[i].style.minHeight = '86px';
        }

        // Add theme to previously created terms
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = termsToCreate[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _value = _step2.value;

                var _termValue = tinyTerms$1[tinyTerms$1.pickedList].terms[_value].term;
                var _termEncode = makeSafeClass(_termValue);

                // Check storage for assigned colour
                tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms || {};

                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue] !== undefined && tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue].colour !== undefined) {
                    var termWrapper = document.querySelector('.' + _termEncode + '');
                    var pickedColour = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue].colour;
                    // Add colour to object
                    termWrapper.querySelector('.theme-holder').style.background = pickedColour;
                    termWrapper.querySelector('.theme-holder').classList.add('bg-active');
                    termWrapper.querySelector('.term-holder').style.color = "#fff";
                }
                // Check storage for assigned symbol
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue] !== undefined && tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[_termValue].symbol !== undefined) {
                    var _termWrapper = document.querySelector('.' + _termEncode + '');
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
                        for (var _i = 0; _i < revealBtn.length; _i++) {
                            var revealTerm = revealBtn[_i].parentNode.parentNode.querySelector('.term-holder').innerHTML;

                            if (revealTerm === _value2) {
                                createRevealTimer(revealBtn[_i]);
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

        // Add to storage
        localforage.getItem('tinyTerms.score', function (err, savedScore) {

            // Set score if it doesn't exist
            if (savedScore === null) {
                tinyTerms$1.score = 0;

                // Add to storage
                localforage.setItem('tinyTerms.score', score);
            } else {
                tinyTerms$1.score = savedScore;
            }

            var score = tinyTerms$1.score;

            // Add to view
            document.querySelector('.score-holder').innerHTML = score;
        });
    };

    // Add progress bar
    var progressBar = function progressBar() {
        // Create correct terms default
        tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms || {};
        var completed = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms).length;
        var remaining = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].terms).length;

        // Add to DOM
        document.querySelector('.m-progress-bar').querySelector('.completed').innerHTML = completed;
        document.querySelector('.m-progress-bar').querySelector('.remaining').innerHTML = ' / ' + remaining;
        document.querySelector('.m-progress-bar').querySelector('.progress-bg').style.width = completed / remaining * 100 + "%";
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
            var queryWrapper = document.querySelector('.query-wrapper');
            var querySubmit = document.querySelector('.query-submit');
            var resultHolder = document.querySelector('.result-holder');
            var scoreHolder = document.querySelector('.score-holder');
            var heartHolder = document.querySelector('.hearts');
            var definition = tinyTerms$1[tinyTerms$1.pickedList].terms[randomTerm].definition;
            var count = 0;

            // Save to storage
            tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery = randomTerm;
            tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = false;

            localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);

            var termEncode = makeSafeClass(randomTerm);

            // Hide daily term definition if same
            if (document.querySelector('.' + termEncode + '') !== null) {
                document.querySelector('.' + termEncode + '').querySelector('.definition-wrapper').classList.add('hidden');
            }

            // Add to view
            document.querySelector('.query-holder').innerHTML = randomTerm;

            // Add hearts
            delete tinyTerms$1[tinyTerms$1.pickedList].storedData.hearts;
            addHearts();

            // Show the query wrapper
            queryWrapper.classList.remove('hidden');

            // Change title if bonus
            if (bonus) {
                queryWrapper.getElementsByTagName('h2')[0].innerHTML = "Bonus Test";
            }

            window.addEventListener("keypress", function (e) {
                if (e.keyCode === 13) {
                    querySubmit.click();
                }
            });

            // Query outcomes
            querySubmit.addEventListener("click", function (e) {
                e.preventDefault();
                var queryInput = document.querySelector('.query-input').value;

                if (checkQuery(queryInput, definition) === true) {
                    winCase();
                } else if (checkQuery(queryInput, definition) === "mispelled") {
                    winCase("mispelled", queryInput);
                } else if (queryInput === "") {
                    document.querySelector('.query-input').style.border = "1px solid #ff0000";
                    resultHolder.innerHTML = "Please enter a definition.";
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
                var score = tinyTerms$1.score;
                score += tinyTerms$1[tinyTerms$1.pickedList].ops.points.correct;
                // Update view
                scoreHolder.innerHTML = score;
                // Add to stored data
                tinyTerms$1.score = score;
                // Save to storage
                localforage.setItem('tinyTerms.score', score, function () {
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms[randomTerm] = definition;
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = true;
                    delete tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery;
                    // Save to storage
                    localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
                });
            }
            // If definition is wrong
            function loseCase() {
                var queryInput = document.querySelector('.query-input');
                queryInput.style.border = "1px solid #ccc";

                // Add placeholder
                queryInput.placeholder = queryInput.value;
                // Remove guess
                queryInput.value = "";
                // Update view
                resultHolder.innerHTML = "Try again.";
                resultHolder.classList.remove('hidden');
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

            // Explode!!
            var explode = revealBtn[i].parentNode.parentNode.querySelector('.explosion');

            explode.classList.add('explode');

            setTimeout(function () {
                return explode.classList.remove('explode');
            }, 1000);

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
            tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].viewCount = tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].viewCount || 0;
            tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].viewCount += 1;

            // Daily reveal bonus
            var revealGoalCount = void 0;

            // If no existing term bonus
            if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal[term] === undefined) {
                revealGoalCount = 1;
            }

            // Add one to daily bonus
            else {
                    revealGoalCount = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal[term];
                    revealGoalCount += 1;
                }

            // Update DOM
            countHolder.innerHTML = revealGoalCount;

            // If bonus is met
            if (revealGoalCount === tinyTerms$1[tinyTerms$1.pickedList].ops.revealGoalTarget) {

                // If game won
                var gameWon = function gameWon() {
                    var modal = document.querySelector('.m-modal');

                    // Bring up modal
                    modal.classList.remove('hidden');
                    document.getElementsByTagName('body')[0].classList.add('modal-active');

                    var view = '<header>\n                                <h2 class="">Whoop whoop!!</h2>\n                            </header>\n                            <p>Well done you completed the whole list! You get a bonus 10 points for each term learned.</p>\n                            <p>You can keep learning this list, reset it in the options to start from scratch or move on to\n                            learn something new entirely.</p>\n                            <p><strong>Great job!</strong></p>';

                    // Add view
                    modal.querySelector('.content').innerHTML += view;

                    // Award bonus points
                    var completeBonus = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].terms).length * tinyTerms$1[tinyTerms$1.pickedList].ops.points.winBonus;

                    // Add to score
                    var score = tinyTerms$1.score;
                    score += completeBonus;
                    // Update view
                    scoreHolder.innerHTML = score;
                    // Add to stored data
                    tinyTerms$1.score = score;
                    // Save to storage
                    localforage.setItem('tinyTerms.score', score);
                };

                // Update progress bar


                // Add term to learned terms list
                tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms || {};
                tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms[term] = tinyTerms$1[tinyTerms$1.pickedList].terms[term].definition;

                // Check if whole term list answered correctly
                if (Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms).length === Object.keys(tinyTerms$1[tinyTerms$1.pickedList].terms).length) {
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.gameWon = true;
                    gameWon();
                }progressBar();

                // If daily bonus not already triggered
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal.complete === false) {

                    // Keep query active 
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete = false;

                    // Create a new query
                    createNewQuery(true);
                }
                // Set only once a day
                tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal.complete = true;

                // Add to score
                var score = tinyTerms$1.score;
                score += tinyTerms$1[tinyTerms$1.pickedList].ops.points.dailyBonus;
                // Update view
                document.querySelector('.score-holder').innerHTML = score;
                // Add to stored data
                tinyTerms$1.score = score;
                // Save to storage
                localforage.setItem('tinyTerms.score', score);
            }
            tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal[term] = revealGoalCount;

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

            var languages = {
                'German': 'de-DE',
                'English': 'en-GB',
                'Spanish': 'es-ES',
                'French': 'fr-FR',
                'Italian': 'it-IT',
                'Portuguese': 'pt-BR'
            };

            if (typeof TTS === "undefined") {
                var speech = new SpeechSynthesisUtterance(termHolder[i].innerHTML);
                speech.lang = languages[tinyTerms$1[tinyTerms$1.pickedList].speechLang];

                window.speechSynthesis.speak(speech);
            } else {
                TTS.speak({
                    text: termHolder[i].innerHTML,
                    locale: languages[tinyTerms$1[tinyTerms$1.pickedList].speechLang],
                    rate: 1
                }, function () {}, function (reason) {
                    alertMsg(reason);
                });
            }
        });
        if (tinyTerms$1[tinyTerms$1.pickedList].speechLang === "None") {
            for (var k = 0; k < termHolder.length; k++) {
                termHolder[k].classList.add('no-speak');
            }
        }
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

            var view = '<header>\n                        <h2 class="dictionary">Further study</h2>\n                    </header>\n                    <h3>Practice writing</h3>\n                    <textarea class="writing-practice" placeholder="Write the definition here, alone or as part of a sentance."></textarea>\n                    <button class="writing-check">Check</button>\n                    <h3 class="dotted">Dictionary definitions</h3>\n                    <p>' + term + ':</p>\n                    <ul class="definitions"></ul>\n                    <h3 class="dotted">Wiki info</h3>\n                    <ul class="wiki-link-wrapper"></ul>\n                    <div class="wiki-result"></div>\n                    ';

            modal.querySelector('.content').innerHTML += view;

            // Check practice writing
            document.querySelector('.writing-check').addEventListener('click', function (e) {
                e.preventDefault();
                var practiceContent = document.querySelector('.writing-practice').value.toUpperCase();
                var definition = tinyTerms$1[tinyTerms$1.pickedList].terms[term].definition.toUpperCase();

                if (practiceContent.indexOf(definition) > -1) {
                    document.querySelector('.writing-practice').value = "";
                    document.querySelector('.writing-practice').placeholder = "Well done, that's correct!";
                } else {
                    document.querySelector('.writing-practice').value = "";
                    document.querySelector('.writing-practice').placeholder = "That's incorrect, try again.";
                }
            });

            // Make JSONP call to Glosbe API
            var definitionHolder = modal.querySelector('.definitions');
            var dictionaryLookup = encodeURI('https://glosbe.com/gapi/translate?from=' + tinyTerms$1[tinyTerms$1.pickedList].dictFrom + '&dest=' + tinyTerms$1[tinyTerms$1.pickedList].dictTo + '&format=json&pretty=true&phrase=' + term.toLowerCase() + '');

            // Make request to Glosbe
            jsonp(dictionaryLookup).then(function (data) {
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

                        // Search through data for "meanings"
                        findProp(data, "text");

                        if (data.tuc === undefined || data.tuc.length === 0) {
                            dictionaryResponses = "(Sorry, no dictionary results found)";
                        }
                        // Add to DOM
                        definitionHolder.innerHTML = dictionaryResponses;
                    })();
                } catch (err) {
                    console.log(err);
                }
            });

            // Wiki lookup
            jsonp('https://' + tinyTerms$1[tinyTerms$1.pickedList].dictFrom + '.wikipedia.org/w/api.php?action=opensearch&limit=3&namespace=0&format=json&search=' + term).then(function (data) {

                // List out wiki results
                for (var _i2 = 0; _i2 < 3; _i2++) {

                    if (data[1][_i2] !== undefined) {
                        document.querySelector('.wiki-link-wrapper').innerHTML += '<li><a href="#" class="wiki-link">' + data[1][_i2] + '</a></li>';
                    }
                }

                // List out wiki results
                var wikiLink = document.querySelectorAll('.wiki-link');

                wikiLink[0].classList.add('active');

                // Write out the first result
                var firstTerm = wikiLink[0].innerHTML;

                jsonp('https://' + tinyTerms$1[tinyTerms$1.pickedList].dictFrom + '.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&redirects=true&titles=' + firstTerm).then(function (data) {

                    var result = Object.keys(data.query.pages)[0];
                    result = data.query.pages[result].extract;

                    if (result === undefined) {
                        jsonp('https://' + tinyTerms$1[tinyTerms$1.pickedList].dictFrom + '.wikipedia.org/w/api.php?action=parse&prop=text&page=' + firstTerm).then(function (data) {
                            result = JSON.parse(data.parse.text["*"]);
                        });
                    }
                    if (result === undefined) {
                        result = "Sorry, no info found.";
                    }
                    document.querySelector('.wiki-result').innerHTML = result;
                });

                // Add event listeners for other results

                var _loop = function _loop(j) {

                    wikiLink[j].addEventListener('click', function (e) {
                        e.preventDefault();
                        var term = wikiLink[j].innerHTML;

                        document.querySelector('.active').classList.remove('active');
                        wikiLink[j].classList.add('active');

                        jsonp('https://' + tinyTerms$1[tinyTerms$1.pickedList].dictFrom + '.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&redirects=true&titles=' + term).then(function (data) {

                            var result = Object.keys(data.query.pages)[0];
                            result = data.query.pages[result].extract;

                            if (result === undefined) {
                                jsonp('https://' + tinyTerms$1[tinyTerms$1.pickedList].dictFrom + '.wikipedia.org/w/api.php?action=parse&prop=text&page=' + term).then(function (data) {
                                    result = JSON.parse(data.parse.text["*"]);
                                });
                            }
                            if (result === undefined) {
                                result = "Sorry, no info found.";
                            }
                            document.querySelector('.wiki-result').innerHTML = result;
                        });
                    });
                };

                for (var j = 0; j < wikiLink.length; j++) {
                    _loop(j);
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

            var view = '<header>\n                        <h2 class="colour">Colour picker</h2>\n                    </header>\n                    <p>Click below to add a colour for <br>"<span class="colour-term">' + term + '</span>":</p>\n                    <ul class="colour-wrap">\n                        <li><a href="#" data-colour="#F44336"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#E91E63"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#9C27B0"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#3F51B5"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#2196F3"></a></li>\n\t\t\t\t\t\t<li><a href="#" data-colour="#009688"></a></li>\n                        <br>\n                        <li><a href="#" data-colour="#4CAF50"></a></li>\n                        <li><a href="#" data-colour="#CDDC39"></a></li>\n                        <li><a href="#" data-colour="#FFC107"></a></li>\n                        <li><a href="#" data-colour="#FF5722"></a></li>\n                        <li><a href="#" data-colour="#212121"></a></li>\n                        <li><a href="#" class="no-colour" data-colour="#fff"></a></li>\n                    </ul>';

            var neonColours = '\n                           <li><a href="#" data-colour="#FF0099"></a></li>\n                           <li><a href="#" data-colour="#83F52C"></a></li>\n                           <li><a href="#" data-colour="#FD1C03"></a></li>\n                           <li><a href="#" data-colour="#00FFFF"></a></li>\n                           <li><a href="#" data-colour="#9D00FF"></a></li>\n                           <li><a href="#" data-colour="#E6FB04"></a></li>\n                            ';

            var metalColours = '\n                           <li><a href="#" data-colour="#CC9900"></a></li>\n                           <li><a href="#" data-colour="#C0C0C0"></a></li>\n                           <li><a href="#" data-colour="#CD7f32"></a></li>\n                            ';

            // Add view
            modal.querySelector('.content').innerHTML += view;

            // Unlocks
            if (tinyTerms$1.globalUnlocks !== undefined) {

                // Neon colours
                if (tinyTerms$1.globalUnlocks.coloursNeon.active === 'unlocked') {
                    modal.querySelector('.colour-wrap').innerHTML += neonColours;
                }
                // Metal colours
                if (tinyTerms$1.globalUnlocks.coloursMetal.active === 'unlocked') {
                    modal.querySelector('.colour-wrap').innerHTML += metalColours;
                }
            }

            var coloursHolder = modal.querySelector('.colour-wrap');
            // Add colour vars
            colours = coloursHolder.getElementsByTagName('a');

            for (var j = 0; j < colours.length; j++) {
                colours[j].style.backgroundColor = colours[j].getAttribute('data-colour');
            }
            colourListener();
        });

        // Add colour function
        function colourListener() {
            var term = document.querySelector('.colour-term').innerHTML;
            var termEncode = makeSafeClass(term);
            var termWrapper = document.querySelector('.' + termEncode + '');

            // Pick a colour
            clickListener(colours, function (i) {
                var pickedColour = colours[i].getAttribute('data-colour');
                // Add colour to object
                termWrapper.querySelector('.theme-holder').style.background = pickedColour;
                termWrapper.querySelector('.theme-holder').classList.add('bg-active');
                termWrapper.querySelector('.term-holder').style.color = "#fff";
                // Set storage
                tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].colour = pickedColour;
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
                // Hide modal
                hideModal(true);
            });
            document.querySelector('.no-colour').addEventListener('click', function (e) {
                termWrapper.querySelector('.term-holder').style.color = "#3F4747";
                // Set storage
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].colour;
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
            });
        }
    };

    // Symbol picker
    var pickSymbol = function pickSymbol() {
        var modal = document.querySelector('.m-modal');
        var symbolBtn = document.querySelectorAll('.symbol');
        var symbolHTML = "<tr>";
        var symbols = appData.fonts;

        // Solid symbols
        if (tinyTerms$1.globalUnlocks.symbolsSolid.active === 'unlocked') {

            symbolHTML += '<table>';
            var _k = 0;

            for (var i = 0; i < appData.fonts.solid.length; i++) {

                if (_k % 5 === 0 && _k != 0) {
                    symbolHTML += '</tr><tr>';
                }
                symbolHTML += '<td><p class=' + appData.fonts.solid[i] + '></p></td>';
                _k++;

                if (i === appData.fonts.solid.length - 1) {
                    symbolHTML += "</tr>";
                }
            }
            symbolHTML += '</table>';
        }

        // Feather symbols
        if (tinyTerms$1.globalUnlocks.symbolsFeather.active === 'unlocked') {

            symbolHTML += '<table>';
            var _k2 = 0;

            for (var _i3 = 0; _i3 < appData.fonts.light.length; _i3++) {

                if (_k2 % 5 === 0 && _k2 != 0) {
                    symbolHTML += '</tr><tr>';
                }
                symbolHTML += '<td><p class=' + appData.fonts.light[_i3] + '></p></td>';
                _k2++;

                if (_i3 === appData.fonts.light.length - 1) {
                    symbolHTML += "</tr>";
                }
            }

            symbolHTML += '</table>';
        }

        symbolHTML += '<table>';
        var k = 0;

        // Default symbols
        for (var _i4 = 0; _i4 < appData.fonts.feather.length; _i4++) {

            if (k % 5 === 0 && k != 0) {
                symbolHTML += '</tr><tr>';
            }
            symbolHTML += '<td><p class=' + appData.fonts.feather[_i4] + '></p></td>';
            k++;

            if (_i4 === appData.fonts.feather.length - 1) {
                symbolHTML += "</tr>";
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

        clickListener(symbolBtn, function (i) {
            // Bring up modal
            modal.classList.remove('hidden');
            document.getElementsByTagName('body')[0].classList.add('modal-active');

            var termHolder = symbolBtn[i].parentNode.parentNode.parentNode;
            var term = symbolBtn[i].parentNode.parentNode.parentNode.querySelector('.term-holder').innerHTML;

            var view = '<header>\n                        <h2 class="symbol">Glyph picker</h2>\n                    </header>\n                    <p>Click below to add a glyph for <br>"<span class="symbol-term">' + term + '</span>":</p>\n                    <div class="symbol-wrap">\n                        <a href="#" class="symbol-clear icon-right-open">Clear selected symbol</a>\n                        ' + symbolHTML + '\n                    </div>';

            // Add view
            modal.querySelector('.content').innerHTML += view;

            symbolListener();
        });
        // Check for clicked symbol
        function symbolListener() {
            var term = document.querySelector('.symbol-term').innerHTML;
            var termEncode = makeSafeClass(term);
            var termWrapper = document.querySelector('.' + termEncode + '');
            var pickedSymbol = "";

            for (var _i5 = 0; _i5 < modal.getElementsByTagName('table').length; _i5++) {
                symbolClickListener(modal.getElementsByTagName('table')[_i5]);
            }

            function symbolClickListener(eachTable) {

                eachTable.addEventListener('click', function (e) {
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

            document.querySelector('.symbol-clear').addEventListener('click', function (e) {
                // Set storage
                termWrapper.querySelector('.symbol-holder').classList = 'symbol-holder';
                delete tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].symbol;
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
                hideModal(true);
            });
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
            document.getElementsByTagName("body")[0].classList.remove("loading");
            document.querySelector(".m-query").classList.add("animated", "slideInDown");
        }, 2500);

        tinyTerms$1.uploadedLists = tinyTerms$1.uploadedLists || {};

        localforage.getItem('tinyTerms.uploadedLists', function (err, uploadedLists) {
            tinyTerms$1.customListChoices = tinyTerms$1.customListChoices || {};

            // Get uploaded lists
            for (var val in uploadedLists) {
                var listName = uploadedLists[val].name;
                var listCategory = uploadedLists[val].category;
                var listURL = uploadedLists[val].sheetURL;

                tinyTerms$1.customListChoices[listName] = {
                    name: listName,
                    category: listCategory,
                    sheetURL: listURL
                };
            }
            categoryHandler();
        });

        // Show home screen
        var homeWrapper = document.querySelector('.m-menu');
        homeWrapper.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');
        document.getElementsByTagName('body')[0].classList.add('home');

        var homeHeader = document.querySelector('.home-bg').getElementsByTagName('h2')[0];
        var chooseList = homeWrapper.querySelector('.choose-list');
        var categories = chooseList.getElementsByTagName('nav')[0].innerHTML;
        var navBack = document.querySelector('.nav-back');
        var scrollArrow = document.querySelector('.scroll-arrow');
        var scrollCheck = void 0;
        var lists = void 0;

        // Sets initial listeners on categories
        function categoryHandler() {
            var categoryBtn = document.querySelectorAll('.category');

            // Show custom list category if user uploaded
            if (Object.keys(tinyTerms$1.customListChoices).length > 0) {
                document.querySelector('.custom').style.display = "inline-block";
            }

            var _loop2 = function _loop2(i) {
                categoryBtn[i].addEventListener('click', function (e) {
                    e.preventDefault();

                    // Build coresponding list
                    buildList(categoryBtn[i].innerHTML);

                    setTimeout(function () {
                        // Show the list
                        showList();
                        // Listener to go back to categories
                        navBack.addEventListener('click', function (e) {
                            e.preventDefault();
                            showCategoriesAgain();
                        });
                        // Set listeners for nav
                        navListeners();
                    }, 500);
                });
            };

            for (var i = 0; i < categoryBtn.length; i++) {
                _loop2(i);
            }
        }

        function buildList(category) {
            chooseList.classList.add('animated', 'slideOutLeft');
            homeHeader.classList.add('animated', 'fadeOutUp');
            lists = "";
            for (var val in tinyTerms$1.listChoices) {

                if (tinyTerms$1.listChoices[val].category === category) {
                    lists += '<a href="#">' + tinyTerms$1.listChoices[val].name + '</a>';
                }
            }
            for (var _val in tinyTerms$1.customListChoices) {

                if (tinyTerms$1.customListChoices[_val].category === category) {
                    lists += '<div class="' + makeSafeClass(tinyTerms$1.customListChoices[_val].name) + '"><span class="custom-list"></span><a href="#">' + tinyTerms$1.customListChoices[_val].name + '</a></div>';
                }
            }
        }

        function showList() {
            homeHeader.innerHTML = "Choose a list:";
            homeHeader.classList.remove('fadeOutUp');
            homeHeader.classList.add('fadeInDown');
            navBack.classList.remove('hidden');
            chooseList.getElementsByTagName('nav')[0].innerHTML = lists;
            chooseList.classList.remove('slideOutLeft');
            chooseList.classList.add('slideInRight');

            if (chooseList.getElementsByTagName('a').length > 3) {
                chooseList.classList.add('slideInRight', 'scroll');

                scrollCheck = setInterval(function () {
                    if (chooseList.clientHeight === chooseList.scrollHeight - chooseList.scrollTop) {
                        scrollArrow.classList.add('hidden');
                    } else {
                        scrollArrow.classList.remove('hidden');
                    }
                }, 500);
            }
        }

        function showCategoriesAgain() {
            homeHeader.classList.add('fadeOutUp');
            homeHeader.classList.remove('fadeInDown');
            chooseList.classList.remove('slideInRight');
            chooseList.classList.add('slideOutRight');

            setTimeout(function () {
                homeHeader.innerHTML = "Choose a category:";
                homeHeader.classList.remove('fadeOutUp');
                homeHeader.classList.add('fadeInDown');
                navBack.classList.add('hidden');
                chooseList.getElementsByTagName('nav')[0].innerHTML = categories;
                chooseList.classList.add('slideInLeft');
                chooseList.classList.remove('slideOutRight', 'scroll');
                categoryHandler();
            }, 500);
        }

        function navListeners() {
            // Add listener to nav
            var listItem = document.querySelector('.choose-list').querySelectorAll('a');

            for (var i = 0; i < listItem.length; i++) {
                listItem[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    tinyTerms$1.pickedList = this.innerHTML;
                    localforage.getItem('tinyTermsAllPicked', function (err, value) {
                        tinyTerms$1.AllPicked = value || [];

                        if (tinyTerms$1.AllPicked.includes(tinyTerms$1.pickedList) === false) {
                            tinyTerms$1.AllPicked.push(tinyTerms$1.pickedList);
                        }
                        localforage.setItem('tinyTermsAllPicked', tinyTerms$1.AllPicked, function () {
                            localforage.setItem('tinyTermsDefault', tinyTerms$1.pickedList, function () {
                                location.reload();
                            });
                        });
                    });
                });
            }

            // Add listener to remove list
            var removeList = document.querySelectorAll('.custom-list');

            var _loop3 = function _loop3(_i6) {

                removeList[_i6].addEventListener('click', function (e) {
                    e.preventDefault();
                    var insertPoint = removeList[_i6].nextSibling;
                    document.querySelector('.create-list').classList.add('hidden');
                    removeList[_i6].classList.add('hidden');
                    removeList[_i6].parentNode.insertBefore(document.createElement("div"), insertPoint.nextSibling);
                    insertPoint.nextSibling.innerHTML = '<p>Are you sure you want to delete your list? (Can\'t undo)</p><button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

                    document.querySelector('.delete-confirm').addEventListener('click', function () {
                        var listName = removeList[_i6].parentNode.childNodes[1].innerHTML;

                        localforage.getItem('tinyTerms.uploadedLists', function (err, uploadedLists) {
                            tinyTerms$1.uploadedLists = uploadedLists || {};
                            delete tinyTerms$1.uploadedLists[listName];
                            localforage.setItem('tinyTerms.uploadedLists', tinyTerms$1.uploadedLists, function () {
                                location.reload();
                            });
                        });

                        // Delete list from nav
                        localforage.setItem('tinyTerms.uploadedLists', tinyTerms$1.uploadedLists, function () {
                            removeList[_i6].parentNode.removeChild(insertPoint.nextSibling);
                            removeList[_i6].parentNode.parentNode.removeChild(document.querySelector('.' + makeSafeClass(listName)));

                            // Delete list references
                            localforage.removeItem(tinyTerms$1.storedName).then(function () {
                                localforage.removeItem(tinyTerms$1[tinyTerms$1.pickedList]).then(function () {
                                    localforage.removeItem("tinyTermsDefault");
                                    location.reload();
                                });
                            });
                        });
                    });
                    document.querySelector('.delete-cancel').addEventListener('click', function () {
                        removeList[_i6].parentNode.removeChild(insertPoint.nextSibling);
                        removeList[_i6].classList.remove('hidden');
                        document.querySelector('.create-list').classList.remove('hidden');
                    });
                });
            };

            for (var _i6 = 0; _i6 < removeList.length; _i6++) {
                _loop3(_i6);
            }
        }

        // Upload list button
        document.querySelector('.upload-info').addEventListener('click', function (e) {
            e.preventDefault();

            var modal = document.querySelector('.m-modal');

            // Bring up modal
            modal.classList.remove('hidden');
            modal.style.zIndex = "101";
            modal.querySelector('.close').addEventListener('click', function (e) {
                e.preventDefault();
                hideModal(true);
            });

            var unlockedView = '<header>\n\t\t\t\t\t\t\t\t<h2 class="">Upload a list</h2>\n\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t<p>Create your very own list of Tiny Terms! For more info please visit:</p>\n\t\t\t\t\t\t\t<a target="_blank" href="http://www.tiny-terms.com">http://www.tiny-terms.com</a>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="list-uploader">\n\t\t\t\t\t\t\t\t<label>List Name (max 25 characters)</label>\n\t\t\t\t\t\t\t\t<input class="upload-name" type="text" placeholder="Enter list name">\n\t\t\t\t\t\t\t\t<label>List URL</label>\n\t\t\t\t\t\t\t\t<input class="upload-sheet" type="text" placeholder="Paste list URL">\n\t\t\t\t\t\t\t\t<button class="upload-list">Upload</button>\n\t\t\t\t\t\t\t</div>';

            var lockedView = '<header>\n                        \t<h2 class="">Upload a list</h2>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>Create your very own list of Tiny Terms! For more info please visit:</p>\n\t\t\t\t\t\t<a target="_blank" href="http://www.tiny-terms.com">http://www.tiny-terms.com</a>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="list-uploader">\n\t\t\t\t\t\t\t<p>Unlock this feature for just 59p</p>\n\t\t\t\t\t\t\t<button class="unlock-uploadlist">Unlock</button>\n\t\t\t\t\t\t</div>';

            var webView = '<header>\n                        \t<h2 class="">Upload a list</h2>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<p>Create your very own list of Tiny Terms! For more info please visit:</p>\n\t\t\t\t\t\t<a target="_blank" href="http://www.tiny-terms.com">http://www.tiny-terms.com</a>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="list-uploader">\n\t\t\t\t\t\t\t<p>This feature is only available in the App version.</p>\n\t\t\t\t\t\t</div>';

            if (typeof store !== 'undefined') {
                store.refresh();
                var product = store.get("custom list");

                if (product.owned) {
                    modal.querySelector('.content').innerHTML += unlockedView;
                    unlockedListeners();
                } else {
                    modal.querySelector('.content').innerHTML += lockedView;

                    document.querySelector('.unlock-uploadlist').addEventListener('click', function (e) {
                        e.preventDefault();
                        store.order('custom list');
                    });
                }
            } else {
                modal.querySelector('.content').innerHTML += webView;
            }

            function unlockedListeners() {
                window.addEventListener("keypress", function (e) {
                    var inputName = document.querySelector('.upload-name').value;
                    var inputSheet = document.querySelector('.upload-sheet').value;

                    if (e.keyCode === 13) {
                        uploadList(inputName, inputSheet);
                    }
                });

                document.querySelector('.upload-list').addEventListener('click', function (e) {
                    e.preventDefault();
                    var inputName = document.querySelector('.upload-name').value;
                    var inputSheet = document.querySelector('.upload-sheet').value;

                    uploadList(inputName, inputSheet);
                });
            }
        });

        function uploadList(inputName, inputSheet) {
            inputName = inputName.substring(0, 25);

            if (inputName.length === 0) {
                document.querySelector('.upload-name').style.border = "1px solid #ff0000";
                document.querySelector('.upload-name').placeholder = "Please enter a name";
            }
            if (inputName.length > 0 && inputSheet.length > 0) {

                // Check valid URL
                if (checkURL(inputSheet) === true) {
                    localforage.getItem('tinyTerms.uploadedLists', function (err, uploadedLists) {
                        tinyTerms$1.uploadedLists = uploadedLists || {};
                        tinyTerms$1.uploadedLists[inputName] = {
                            name: inputName,
                            category: 'Your lists',
                            sheetURL: inputSheet
                        };
                        localforage.setItem('tinyTerms.uploadedLists', tinyTerms$1.uploadedLists, function () {
                            tinyTerms$1.customListChoices = tinyTerms$1.customListChoices || {};
                            tinyTerms$1.customListChoices[inputName] = {
                                name: inputName,
                                category: 'Your lists',
                                sheetURL: inputSheet
                            };
                            document.querySelector('.custom').style.display = "inline-block";
                            buildList('Your lists');
                            setTimeout(function () {
                                // Show the list
                                showList();
                                // Listener to go back to categories
                                navBack.addEventListener('click', function (e) {
                                    e.preventDefault();
                                    showCategoriesAgain();
                                });
                                // Set listeners for nav
                                navListeners();
                            }, 500);
                            hideModal(true);
                        });
                    });
                } else {
                    document.querySelector('.upload-sheet').style.border = "1px solid #ff0000";
                    document.querySelector('.upload-sheet').value = "";
                    document.querySelector('.upload-sheet').placeholder = "Please enter a valid Sheets URL";
                }
            }
        }
    };

    // Imports
    // JS ready
    function ready(fn) {
        if (document.readyState != "loading") {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    // Send crash report
    var errorReport = function errorReport() {

        if (typeof cordova !== "undefined") {
            cordova.plugins.instabug.invoke();
        } else {
            var _ret5 = function () {
                var modal = document.querySelector('.m-modal');
                modal.classList.remove("hidden");
                document.getElementsByTagName("body")[0].classList.add("modal-active");

                var view = '<header>\n\t\t\t\t\t\t<h2 class="">Get in touch</h2>\n\t\t\t\t\t</header>\n\t\t\t\t\t<p>We always welcome feedback especially if something isn\'t working as expected.\n\t\t\t\t\t<br><br>\n\t\t\t\t\tPlease email us at <a href="mailto:info@tiny-terms.com">info@tiny-terms.com</a> with your thoughts.</p>\n\n\t\t\t\t\t<button class="close-feedback">Close</button>\n\t\t\t\t\t';

                // Add view
                modal.querySelector(".content").innerHTML = view;
                modal.classList.add('onboard');

                document.querySelector('.close-feedback').addEventListener("click", function (e) {
                    e.preventDefault();
                    hideModal(true);
                    tinyTerms$1.tutComplete = true;
                    localforage.setItem("tinyTerms.tutComplete", tinyTerms$1.tutComplete);
                    modal.classList.remove('onboard');
                });
                return {
                    v: false
                };
            }();

            if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
        }
    };

    // Alert errors
    var errorAlert = function errorAlert(message, cb) {

        window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
            var modal = document.querySelector('.m-modal');
            modal.classList.remove("hidden");
            document.getElementsByTagName("body")[0].classList.add("modal-active");

            var view = '<header>\n                        <h2 class="">Uh oh!</h2>\n                    </header>\n                    <br>\n                    <h3>' + message + '</h3>\n                    <p><strong>Here\'s the exact problem:</strong></p>\n                    <p>\'Error: ' + errorMsg + '</p> \n                    <p>Script: ' + url + '</p> \n                    <p>Line: ' + lineNumber + '</p>\n                    <p>Column: ' + column + '</p> \n                    <p>StackTrace: ' + errorObj + '</p>\n\n                    <button class="crash-report">Report issue</button><button class="home-btn">Close</button>\n                    ';

            // Add view
            modal.querySelector(".content").innerHTML = view;
            modal.classList.add('onboard');
            cb();

            document.querySelector('.crash-report').addEventListener("click", function (e) {
                e.preventDefault();
                errorReport();
            });

            document.querySelector(".home-btn").addEventListener("click", function (e) {
                e.preventDefault();
                showHome();
            });
            return false;
        };
    };

    // Alert errors
    var alertMsg = function alertMsg(message, cb) {

        var modal = document.querySelector('.m-modal');
        modal.classList.remove("hidden");
        document.getElementsByTagName("body")[0].classList.add("modal-active");

        var view = '<header>\n\t\t\t\t\t<h2 class="">Something\'s not right</h2>\n\t\t\t\t</header>\n\t\t\t\t<p>' + message + '</p>\n\n\t\t\t\t<button class="home-btn">Close</button>\n\t\t\t\t';

        // Add view
        modal.querySelector(".content").innerHTML = view;
        modal.classList.add('onboard');
        document.querySelector(".home-btn").addEventListener("click", function (e) {
            e.preventDefault();
            showHome();
        });
        cb();
        return false;
    };

    // Gets data from Google Sheets
    var buildData = function buildData(data) {

        if (data === undefined) {
            var modal = document.querySelector('.m-modal');
            modal.classList.remove("hidden");
            document.getElementsByTagName("body")[0].classList.add("modal-active");

            var view = '<header>\n\t\t\t\t\t\t<h2 class="">The list didn\'t load</h2>\n\t\t\t\t\t</header>\n\t\t\t\t\t<p>Please check you have internet connection.</p> \n\t\t\t\t\t<p>If you are using a custom list please check the URL you added is correct.</p>\n\n\t\t\t\t\t<button class="home-btn">Close</button>\n\t\t\t\t\t';

            // Add view
            modal.querySelector(".content").innerHTML = view;
            modal.classList.add('onboard');
            document.querySelector(".home-btn").addEventListener("click", function (e) {
                e.preventDefault();
                showHome();
            });
        } else {
            var columnName = data.Sheet1.columnNames[1];

            tinyTerms$1[tinyTerms$1.pickedList].speechLang = columnName;
            tinyTerms$1[tinyTerms$1.pickedList].dictFrom = data.Sheet1.elements[0][columnName];
            tinyTerms$1[tinyTerms$1.pickedList].dictTo = data.Sheet1.elements[1][columnName];
            tinyTerms$1[tinyTerms$1.pickedList].action = data.Sheet1.elements[2][columnName];
            tinyTerms$1[tinyTerms$1.pickedList].terms = tinyTerms$1[tinyTerms$1.pickedList].terms || {};

            for (var i = 0; i < data.Sheet1.elements.length; i++) {
                var termContent = data.Sheet1.elements[i].Term;
                var definitionContent = data.Sheet1.elements[i].Definition;
                var supportContent = data.Sheet1.elements[i].Support;

                termContent = termContent.replace(/[!@#$%^&*]/g, "");
                definitionContent = definitionContent.replace(/[!@#$%^&*]/g, "");

                tinyTerms$1[tinyTerms$1.pickedList].terms[termContent] = {};
                tinyTerms$1[tinyTerms$1.pickedList].terms[termContent].term = termContent;
                tinyTerms$1[tinyTerms$1.pickedList].terms[termContent].definition = definitionContent;
                tinyTerms$1[tinyTerms$1.pickedList].terms[termContent].support = supportContent;
            }

            tinyTerms$1.postBuildCallback();
        }
    };

    // Check for network connection
    var checkConnection = function checkConnection(offline, online) {
        var image = new Image();

        image.src = 'http://www.tiny-terms.com/img/brand/logo_white.svg?d=' + escape(Date());

        image.onload = function () {
            return online();
        };
        image.onerror = function () {
            return offline();
        };

        /*
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
        */
    };

    // Count number of lines of text
    var countLines = function countLines(target) {
        var style = window.getComputedStyle(target, null);
        var height = parseInt(style.getPropertyValue("height"));
        var font_size = parseInt(style.getPropertyValue("font-size"));
        var line_height = parseInt(style.getPropertyValue("line-height"));
        var box_sizing = style.getPropertyValue("box-sizing");

        if (isNaN(line_height)) line_height = font_size * 1.2;

        if (box_sizing == 'border-box') {
            var padding_top = parseInt(style.getPropertyValue("padding-top"));
            var padding_bottom = parseInt(style.getPropertyValue("padding-bottom"));
            var border_top = parseInt(style.getPropertyValue("border-top-width"));
            var border_bottom = parseInt(style.getPropertyValue("border-bottom-width"));
            height = height - padding_top - padding_bottom - border_top - border_bottom;
        }
        var lines = Math.ceil(height / line_height);
        return lines;
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
        } else {
            // Otherwise a new day
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

    // Validate URL
    var checkURL = function checkURL(str) {
        var a = document.createElement("a");
        a.href = str;
        return a.host && a.host != window.location.host;
    };

    // Makes a safe class name
    var makeSafeClass = function makeSafeClass(name) {
        return name.replace(/[^a-z0-9]/g, function (s) {
            var c = s.charCodeAt(0);
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
        var _loop4 = function _loop4(i) {
            elements[i].addEventListener("click", function (e) {
                e.preventDefault();
                clickFunction(i);
            });
        };

        for (var i = 0; i < elements.length; i++) {
            _loop4(i);
        }
    }

    // Get a random term
    function pickRandom(objectList) {
        var keys = Object.keys(objectList);
        var pickedTerm = keys[keys.length * Math.random() << 0];
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
        if (hidden in document) document.addEventListener("visibilitychange", onchange);else if ((hidden = "mozHidden") in document) document.addEventListener("mozvisibilitychange", onchange);else if ((hidden = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", onchange);else if ((hidden = "msHidden") in document) document.addEventListener("msvisibilitychange", onchange);else if ("onfocusin" in document)
            // IE 9 and lower:
            document.onfocusin = document.onfocusout = onchange;else
            // All others:
            window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

        function onchange(evt) {
            var v = "visible",
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
            } else {
                location.reload();
            }
        }

        // set the initial state (but only if browser supports the Page Visibility API)
        if (document[hidden] !== undefined) onchange({
            type: document[hidden] ? "blur" : "focus"
        });
    };

    // Order array based on nested key
    var sortArrayByKey = function sortArrayByKey(arr, key, reverse) {
        var sortOrder = 1;
        if (reverse) {
            sortOrder = -1;
        }
        return arr.sort(function (a, b) {
            var x = a[1][key];
            var y = b[1][key];
            return sortOrder * (x < y ? -1 : x > y ? 1 : 0);
        });
    };

    // Creates JSONP requests
    var jsonp = function jsonp(uri) {
        return new Promise(function (resolve, reject) {
            var id = "_" + Math.round(10000 * Math.random());
            var callbackName = "jsonp_callback_" + id;
            window[callbackName] = function (data) {
                delete window[callbackName];
                var ele = document.getElementById(id);
                ele.parentNode.removeChild(ele);
                resolve(data);
            };

            var src = uri + "&callback=" + callbackName;
            var script = document.createElement("script");
            script.src = src;
            script.id = id;
            script.addEventListener("error", reject);
            (document.getElementsByTagName("head")[0] || document.body || document.documentElement).appendChild(script);
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
                    if (viewedLength + i === dataLength) {
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
                        viewedSorted = sortArrayByKey(viewedSorted, 'viewCount');

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

    // Imports
    // Show home screen
    var onboardShow = function onboardShow() {
        var modal = document.querySelector('.m-modal');
        var onBoardText = document.querySelector('.m-onboarding');
        var topTerm = document.querySelectorAll('.m-term-wrapper')[0];
        var definitionHolder = topTerm.querySelector('.definition-holder');
        var topBtn = topTerm.getElementsByTagName('button')[0];

        tinyTerms$1.tutComplete = false;
        localforage.setItem("tinyTerms.tutComplete", tinyTerms$1.tutComplete);

        // Onboard - Stage 1
        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        var view = '<header>\n                    <h2 class="icon-child">Welcome</h2>\n                </header>\n                <p>Looks like this is your first time here, so let\'s go over some basics before you get started.</p>\n                <button class="onboard-1">Let\'s go!</button>\n                <a href="#" class="close-tut">Skip the tutorial</a>\n                ';
        modal.querySelector('.content').innerHTML = view;
        modal.classList.add('onboard');
        document.querySelector('.close-tut').addEventListener('click', function (e) {
            e.preventDefault();
            hideModal(true);
            modal.classList.remove('onboard');
            tinyTerms$1.tutComplete = true;
            localforage.setItem("tinyTerms.tutComplete", tinyTerms$1.tutComplete);
        });

        document.querySelector('.onboard-1').addEventListener('click', function (e) {
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

            var view = '<p>This is one of the terms you will be learning, you get 5 each day.</p>\n                    <button class="onboard-2">Next</button>';
            onBoardText.innerHTML = view;
            var termOffset = topTerm.offsetTop + topTerm.offsetHeight;
            onBoardText.style.top = termOffset + "px";

            document.querySelector('.onboard-2').addEventListener('click', function (e) {
                e.preventDefault();
                onboardStage3();
            });
        }
        function onboardStage3() {
            topTerm.querySelector('.term-holder').classList.remove('animated', 'pulse', 'infinite');
            topTerm.querySelector('.term-views').classList.add('animated', 'pulse', 'infinite');
            var view = '<p>On the right is the goal meter, fill this and the term is marked as complete.</p>\n                    <button class="onboard-3">Next</button>';
            onBoardText.innerHTML = view;

            onBoardText.classList.add('onboard-right');

            document.querySelector('.onboard-3').addEventListener('click', function (e) {
                e.preventDefault();
                onboardStage4();
            });
        }
        function onboardStage4() {
            topTerm.querySelector('.term-views').classList.remove('animated', 'pulse', 'infinite');
            topBtn.classList.add('animated', 'pulse', 'infinite');

            var timerOveride = setInterval(function () {
                topBtn.classList.remove('disabled');
                topBtn.removeAttribute('disabled');
            }, 100);

            var view = '<p style="border:0; margin: 10px 0; padding: 0">Press the reveal button to continue!</p>\n                    ';
            onBoardText.innerHTML = view;

            topBtn.addEventListener('click', function (e) {
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
            var goal = topTerm.querySelector('.count');
            var goalCount = parseInt(goal.innerHTML);

            if (goalCount > 1) {
                goalCount -= 1;
                goal.innerHTML = goalCount;
                var term = topTerm.querySelector('.term-holder').innerHTML;
                tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms[term].viewCount = goalCount;
                tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal[term] = goal.innerHTML = goalCount;
                // Save to storage
                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
            }

            var termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
            onBoardText.style.top = termOffset + "px";

            var view = '<p>This is the definition you need to learn, helpful information is displayed underneath.</p>\n                    <button class="onboard-5">Next</button>';
            onBoardText.innerHTML = view;
            onBoardText.classList.remove('onboard-right');

            document.querySelector('.onboard-5').addEventListener('click', function (e) {
                e.preventDefault();
                onboardStage6();
            });
        }
        function onboardStage6() {
            topTerm.querySelector('.definition-holder').classList.remove('animated', 'pulse', 'infinite');

            var termOffset = topTerm.offsetTop + definitionHolder.offsetTop + 95;
            onBoardText.style.top = termOffset + "px";

            var view = '<p>Tiny Terms uses spaced repetition, check back in an hour to add to the goal.</p>\n                    <button class="onboard-6">Next</button>';
            onBoardText.innerHTML = view;
            onBoardText.classList.add('onboard-right');

            document.querySelector('.onboard-6').addEventListener('click', function (e) {
                e.preventDefault();
                onboardStage7();
            });
        }
        function onboardStage7() {
            topTerm.querySelector('.lookup').classList.add('animated', 'pulse', 'infinite');
            document.querySelector('.query-holder').setAttribute('disabled', 'true');

            var termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
            onBoardText.style.top = termOffset + "px";

            var view = '<p>Clicking the Further Study button will give you detailed info on the term and the ability to practice writing it.</p>\n                    <button class="onboard-7">Next</button>';
            onBoardText.innerHTML = view;

            document.querySelector('.onboard-7').addEventListener('click', function (e) {
                e.preventDefault();
                onboardStage7b();
            });
        }
        function onboardStage7b() {
            topTerm.querySelector('.lookup').classList.remove('animated', 'pulse', 'infinite');
            topTerm.querySelector('.colour').classList.add('animated', 'pulse', 'infinite');
            topTerm.querySelector('.symbol').classList.add('animated', 'pulse', 'infinite');

            var termOffset = topTerm.offsetTop + definitionHolder.offsetTop + definitionHolder.offsetHeight + 95;
            onBoardText.style.top = termOffset + "px";

            var view = '<p>You can add a colour and symbol to the term, the visual association will help you rememeber.</p>\n                    <button class="onboard-7">Next</button>';
            onBoardText.innerHTML = view;

            document.querySelector('.onboard-7').addEventListener('click', function (e) {
                e.preventDefault();
                onboardStage8();
            });
        }
        function onboardStage8() {
            topTerm.querySelector('.colour').classList.remove('animated', 'pulse', 'infinite');
            topTerm.querySelector('.symbol').classList.remove('animated', 'pulse', 'infinite');
            topTerm.style.zIndex = "50";
            var queryWrap = document.querySelector('.m-query');
            document.querySelector('.query-submit').setAttribute('disabled', 'true');
            document.querySelector('.query-input').setAttribute('disabled', 'true');
            document.querySelector('.m-modal').style.cssText = "";
            hideModal(true);

            createNewQuery(true);
            delete tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery;
            localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);

            var termOffset = queryWrap.offsetTop + queryWrap.offsetHeight;
            onBoardText.style.top = termOffset + "px";
            queryWrap.style.zIndex = "100";

            var view = '<p>Each day you get a mini test to see how well you have rememebered, you can also unlock an extra test by completing at least one goal meter in a day.</p>\n                    <button class="onboard-8">Next</button>';
            onBoardText.innerHTML = view;

            document.querySelector('.onboard-8').addEventListener('click', function (e) {
                e.preventDefault();
                onboardStage9();
            });
        }
        function onboardStage9() {
            modal.classList.remove('hidden');
            onBoardText.innerHTML = "";
            onBoardText.classList.add('hidden');
            document.getElementsByTagName('body')[0].classList.add('modal-active');
            var queryWrap = document.querySelector('.m-query');
            document.querySelector('.query-holder').removeAttribute('disabled');
            document.querySelector('.query-submit').removeAttribute('disabled');
            document.querySelector('.query-input').removeAttribute('disabled');

            queryWrap.style.zIndex = "50";
            queryWrap.classList.add('hidden');
            topTerm.querySelector('.definition-wrapper').classList.remove('hidden');

            var view = '<header>\n                        <h2 class="">That\'s about it</h2>\n                    </header>\n                    <p>Fill the progress bar by completing the goal meters to finish the list! You get points for answering tests correctly and completing goal meters, use them to unlock cool stuff. <br><br>Good luck!</p>\n                    <button class="close-tut">Close the tutorial</button>\n                    ';
            modal.querySelector('.content').innerHTML = view;
            modal.classList.add('onboard');
            document.querySelector('.close-tut').addEventListener("click", function (e) {
                e.preventDefault();
                hideModal(true);
                tinyTerms$1.tutComplete = true;
                localforage.setItem("tinyTerms.tutComplete", tinyTerms$1.tutComplete);
                modal.classList.remove('onboard');
            });
        }
    };

    // Imports
    // Nav menu functions
    var navMenu = function navMenu() {
        var nav = document.querySelector('.m-nav').querySelectorAll('nav')[0];

        showNav();

        function showNav() {
            document.getElementsByTagName('h1')[0].addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector('.m-nav').classList.remove('hidden', 'slideOutLeft');
                document.querySelector('.m-nav').classList.add('animated', 'slideInLeft');

                document.querySelector('.nav-bg').classList.add('animated', 'fadeIn');
                document.querySelector('.nav-bg').classList.remove('fadeOut');
                document.getElementsByTagName('body')[0].classList.add('nav-on');

                setTimeout(function () {
                    hideNav();
                }, 100);
            });
        }

        function hideNav() {
            document.querySelector('.nav-bg').addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector('.m-nav').classList.remove('slideInLeft');
                document.querySelector('.m-nav').classList.add('slideOutLeft');
                document.getElementsByTagName('body')[0].classList.remove('nav-on');

                document.querySelector('.nav-bg').classList.add('fadeOut');
                document.querySelector('.nav-bg').classList.remove('fadeIn');

                setTimeout(function () {
                    showNav();
                }, 100);
            });
        }

        document.querySelector('.nav-close').addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector('.m-nav').classList.remove('slideInLeft');
            document.querySelector('.m-nav').classList.add('slideOutLeft');
            document.getElementsByTagName('body')[0].classList.remove('nav-on');

            document.querySelector('.nav-bg').classList.add('fadeOut');
            document.querySelector('.nav-bg').classList.remove('fadeIn');

            setTimeout(function () {
                showNav();
            }, 100);
        });

        localforage.getItem("tinyTermsAllPicked", function (err, tinyTermsAllPicked) {
            tinyTerms$1.AllPicked = tinyTermsAllPicked || [];
            var navHTML = nav.innerHTML;

            for (var _i7 = 0; _i7 < tinyTerms$1.AllPicked.length; _i7++) {
                navHTML += '<a href="#">' + tinyTerms$1.AllPicked[_i7] + '</a>';
            }
            nav.innerHTML = navHTML;

            var navItems = nav.querySelectorAll('a');
            var i = 1;

            do {
                navItems[i].addEventListener('click', function (e) {

                    e.preventDefault();
                    tinyTerms$1.pickedList = this.innerHTML;

                    localforage.setItem('tinyTermsDefault', tinyTerms$1.pickedList, function () {
                        location.reload();
                    });
                });
                i++;
            } while (i < navItems.length);

            document.querySelector('.view-all').addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector('.m-nav').classList.add('hidden');
                document.getElementsByTagName('body')[0].classList.remove('nav-on');
                document.getElementsByTagName("body")[0].classList.add("loading");
                showHome();
            });
        });
    };

    // Footer menu functions
    var footerMenu = function footerMenu() {
        var modal = document.querySelector('.m-modal');

        document.querySelector('.refresh').addEventListener('click', function (e) {
            e.preventDefault();
            location.reload();
        });

        document.querySelector('.store').addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('hidden');
            document.getElementsByTagName('body')[0].classList.add('modal-active');

            var view = '<header>\n                        <h2 class="icon-gift">Store</h2>\n                    </header>\n                    <div class="options store">\n                        <p>Paid unlocks:</p>\n                        <a href="#" class="points-10-terms"><strong>59p</strong> Get 10 terms a day</a>\n                        <p>Points rewards - this list:</p>\n                        <a href="#" class="points-refresh-terms"><strong>250</strong> Refresh terms</a>\n                        <a href="#" class="points-half-timer"><strong>300</strong> Half timer (1 day)</a>\n                        <p>Points rewards - all lists:</p>\n                        <a href="#" class="points-neon-colours"><strong>500</strong> Neon colours</a>\n                        <a href="#" class="points-solid-symbols"><strong>1000</strong> Solid symbols</a>\n                        <a href="#" class="points-star-bg"><strong>3000</strong> Star background</a>\n                        <a href="#" class="points-feather-symbols"><strong>5000</strong> Feather symbols</a>\n                        <a href="#" class="points-letters-bg"><strong>10,000</strong> Letters background</a>\n                        <a href="#" class="points-metal-colours"><strong>50,000</strong> Metal colours</a>\n                        <p>Apply code:</p>\n                        <input class="" type="text" placeholder="Add code here">\n                        <button class="submit">Submit</button>\n                    </div>\n                    ';
            // Add view
            modal.querySelector('.content').innerHTML += view;

            // Values must match paid unlocks object order in app.js
            var paidItems = ['.points-10-terms'];

            // Values must match list unlocks object order in app.js
            var listItems = ['.points-refresh-terms', '.points-half-timer'];

            // Values must match global unlocks object order in app.js
            var globalItems = ['.points-neon-colours', '.points-solid-symbols', '.points-star-bg', '.points-feather-symbols', '.points-letters-bg', '.points-metal-colours'];

            // God mode..... FEEL THE POWEEERR!!!
            if (tinyTerms$1[tinyTerms$1.pickedList].ops.godMode === true) {
                tinyTerms$1.score = 1000000;
                document.querySelector('.score-holder').innerHTML = tinyTerms$1.score;
            }

            // Click listener for list store items
            clickListenerFromVar(listItems, function (i) {
                var unlockItem = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks)[i];
                var currentScore = tinyTerms$1.score;
                var itemCost = tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks[unlockItem].points;

                if (currentScore - itemCost > 0) {
                    var score = currentScore - itemCost;

                    tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks[unlockItem].active = 'unlocked';

                    // Refresh terms
                    if (tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks.termsRefresh.active === 'unlocked') {
                        var pickedTerms = getListOfTerms();
                        tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyTerms = pickedTerms;
                    }
                    localforage.setItem('tinyTerms.score', score, function () {
                        // Save to storage
                        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList], function () {
                            // Refresh
                            location.reload();
                        });
                    });
                } else {
                    var _modal = document.querySelector('.m-modal');
                    var _view = '<header>\n                                <h2 class="">Sorry, not enough points</h2>\n                            </header>\n                            <p>You can earn more points by completing goal meters, passing tests and finishing lists.</p>\n\n                            <button class="home-btn">Close</button>\n                            ';

                    // Add view
                    _modal.querySelector(".content").innerHTML = _view;
                    document.querySelector(".home-btn").addEventListener("click", function (e) {
                        e.preventDefault();
                        hideModal(true);
                    });
                }
            });

            // Paid unlocks click listeners
            clickListenerFromVar(paidItems, function (i) {
                var unlockItem = Object.keys(tinyTerms$1.paidUnlocks)[i];

                if (tinyTerms$1.paidUnlocks[unlockItem].active === 'unlocked' || tinyTerms$1.paidUnlocks[unlockItem].active === 'inactive') {
                    return false;
                } else {

                    var webView = '<header>\n                                    <h2 class="">Available in the app</h2>\n                                </header>\n                                <p>Download the Android app today to unlock this feature.</p>';

                    if (typeof store !== 'undefined') {
                        store.refresh();
                        var product = store.get("custom list");

                        if (product.owned) {
                            tinyTerms$1.paidUnlocks[unlockItem].active = 'unlocked';
                        } else {
                            document.querySelector('.unlock-uploadlist').addEventListener('click', function (e) {
                                e.preventDefault();
                                store.order('extra items');

                                store.when("extra items").approved(function (order) {
                                    tinyTerms$1.paidUnlocks[unlockItem].active = 'unlocked';
                                    order.finish();
                                });
                            });
                        }
                    } else {
                        modal.querySelector('.content').innerHTML = webView;
                    }

                    // 10 terms
                    if (tinyTerms$1.paidUnlocks.terms10.active === 'unlocked') {
                        var pickedTerms = getListOfTerms();
                        var existingTerms = tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyTerms;
                        var joinedTerms = existingTerms.concat(pickedTerms);

                        tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyTerms = joinedTerms;

                        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList], function () {
                            // Save to storage
                            localforage.setItem('tinyTerms.paidUnlocks', tinyTerms$1.paidUnlocks, function () {
                                // Refresh
                                location.reload();
                            });
                        });
                    }
                }
            });

            // Hide 10 terms
            if (tinyTerms$1.paidUnlocks.terms10.active === 'unlocked') {
                document.querySelector('.points-10-terms').innerHTML = "(Unlocked)";
            }

            // Click listener for global store items
            clickListenerFromVar(globalItems, function (i) {
                var unlockItem = Object.keys(tinyTerms$1.globalUnlocks)[i];
                var currentScore = tinyTerms$1.score;
                var itemCost = tinyTerms$1.globalUnlocks[unlockItem].points;

                if (tinyTerms$1.globalUnlocks[unlockItem].active === 'unlocked' || tinyTerms$1.globalUnlocks[unlockItem].active === 'inactive') {
                    return false;
                } else if (currentScore - itemCost > 0) {
                    var score = currentScore - itemCost;

                    tinyTerms$1.globalUnlocks[unlockItem].active = 'unlocked';

                    localforage.setItem('tinyTerms.score', score, function () {
                        // Like a christmas tree all up in here
                        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList], function () {
                            // Save to storage
                            localforage.setItem('tinyTerms.globalUnlocks', tinyTerms$1.globalUnlocks, function () {
                                // Refresh
                                location.reload();
                            });
                        });
                    });
                } else {
                    var _modal2 = document.querySelector('.m-modal');
                    var _view2 = '<header>\n                                <h2 class="">Sorry, not enough points</h2>\n                            </header>\n                            <p>You can earn more points by completing goal meters, passing tests and finishing lists.</p>\n\n                            <button class="home-btn">Close</button>\n                            ';

                    // Add view
                    _modal2.querySelector(".content").innerHTML = _view2;
                    document.querySelector(".home-btn").addEventListener("click", function (e) {
                        e.preventDefault();
                        hideModal(true);
                    });
                }
            });

            // Adds click functionality to selectors
            function clickListenerFromVar(elements, clickFunction) {
                var _loop5 = function _loop5(i) {

                    document.querySelector(elements[i]).addEventListener("click", function (e) {
                        e.preventDefault();
                        clickFunction(i);
                    });
                };

                for (var i = 0; i < elements.length; i++) {
                    _loop5(i);
                }
            }

            // Menu mod for list unlocked items
            for (var i = 0; i < listItems.length; i++) {
                var unlockItem = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks)[i];

                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks[unlockItem].active === 'unlocked') {
                    document.querySelector(listItems[i]).parentNode.removeChild(document.querySelector(listItems[i]));
                }
            }

            var buttonOnHTML = '<button class="store-on">Turn on</button>';
            var buttonOffHTML = '<button class="store-off">Turn off</button>';

            // Menu mod for global unlocked items
            for (var _i8 = 0; _i8 < globalItems.length; _i8++) {
                var thisItem = globalItems[_i8];
                var _unlockItem = Object.keys(tinyTerms$1.globalUnlocks)[_i8];
                var storedValue = tinyTerms$1.globalUnlocks[_unlockItem].active;

                if (storedValue === 'unlocked') {
                    document.querySelector(thisItem).innerHTML = buttonOffHTML;
                }
                if (storedValue === 'inactive') {
                    document.querySelector(thisItem).innerHTML = buttonOnHTML;
                }
            }
            // Click listener store off buttons

            var _loop6 = function _loop6(_i9) {

                document.querySelectorAll('.store-off')[_i9].addEventListener('click', function (e) {
                    e.preventDefault();

                    var clickedItem = document.querySelectorAll('.store-off')[_i9].parentNode.className;
                    var thisItem = '.' + clickedItem;
                    var itemIndex = globalItems.indexOf('.' + clickedItem);
                    var unlockItem = Object.keys(tinyTerms$1.globalUnlocks)[itemIndex];
                    var storedValue = tinyTerms$1.globalUnlocks[unlockItem].active;

                    document.querySelector(thisItem).querySelector('.store-off').outerHTML = buttonOnHTML;

                    tinyTerms$1.globalUnlocks[unlockItem].active = 'inactive';

                    // Save to storage
                    localforage.setItem('tinyTerms.globalUnlocks', tinyTerms$1.globalUnlocks, function () {
                        // Refresh
                        location.reload();
                    });
                });
            };

            for (var _i9 = 0; _i9 < document.querySelectorAll('.store-off').length; _i9++) {
                _loop6(_i9);
            }
            // Click listener store on buttons

            var _loop7 = function _loop7(_i10) {

                document.querySelectorAll('.store-on')[_i10].addEventListener('click', function (e) {
                    e.preventDefault();

                    var clickedItem = document.querySelectorAll('.store-on')[_i10].parentNode.className;
                    var thisItem = '.' + clickedItem;
                    var itemIndex = globalItems.indexOf('.' + clickedItem);
                    var unlockItem = Object.keys(tinyTerms$1.globalUnlocks)[itemIndex];
                    var storedValue = tinyTerms$1.globalUnlocks[unlockItem].active;

                    document.querySelector(thisItem).querySelector('.store-on').outerHTML = buttonOffHTML;

                    tinyTerms$1.globalUnlocks[unlockItem].active = 'unlocked';

                    // Save to storage
                    localforage.setItem('tinyTerms.globalUnlocks', tinyTerms$1.globalUnlocks, function () {
                        // Refresh
                        location.reload();
                    });
                });
            };

            for (var _i10 = 0; _i10 < document.querySelectorAll('.store-on').length; _i10++) {
                _loop7(_i10);
            }
        });

        document.querySelector('.stats').addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('hidden');
            document.getElementsByTagName('body')[0].classList.add('modal-active');

            var name = tinyTerms$1.pickedList;
            var completed = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms).length;
            var remaining = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].terms).length;
            var viewed = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.viewedTerms).length;
            var correct = 0;
            var incorrect = 0;

            if (tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms !== undefined) {
                correct = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.correctTerms).length;
            }
            if (tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms !== undefined) {
                incorrect = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.incorrectTerms).length;
            }

            var learned = [];

            for (var i = 0; i < completed; i++) {
                var learnedTerm = Object.keys(tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms)[i];
                var learnedDefinition = tinyTerms$1[tinyTerms$1.pickedList].storedData.learnedTerms[learnedTerm];
                learned += '<p class="small">' + learnedTerm + ' - ' + learnedDefinition + '</p>';
            }
            if (completed === 0) {
                learned = '<p class="small">No completed terms, fill some goals!</p>';
            }

            var view = '<header>\n                        <h2 class="icon-chart-bar">Progress</h2>\n                    </header>\n                    <div class="options stats">\n                        <p><strong>' + name + '</strong></p>\n                        <p><strong>Total completed terms:</strong> <span class="right">' + completed + ' <span class="small">/ ' + remaining + '</span></span></p>\n                        <br>\n                        <p><strong>Total viewed terms:</strong> <span class="right">' + viewed + ' <span class="small">/ ' + remaining + '</span></span></p>\n                        <p><strong>Total correct tests:</strong> <span class="right">' + correct + '</span></p>\n                        <p><strong>Total incorrect tests:</strong> <span class="right">' + incorrect + '</span></p>\n                        <h3>Completed terms:</h3>\n                        ' + learned + '\n                    </div>\n                    ';
            // Add view
            modal.querySelector('.content').innerHTML += view;
        });
    };

    // Options menu
    var optionsDisplay = function optionsDisplay() {
        var modal = document.querySelector('.m-modal');
        var settingsBtn = document.querySelector('.settings');

        settingsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('hidden');
            document.getElementsByTagName('body')[0].classList.add('modal-active');

            var view = '<header>\n                        <h2 class="icon-cog-outline">Options</h2>\n                    </header>\n                    <div class="options">\n                        <p>Help</p>\n                        <a href="#" class="icon-right-open show-tut">Show the tutorial again</a>\n                        <a href="mailto:info@tiny-terms.com" class="icon-right-open">Email a question</a>\n                        <a href="#" class="icon-right-open feedback">Report a bug/leave feedback</a>\n                        <p>More Options</p>\n                        <a href="#" class="icon-right-open reminders">Reminders</a>\n                        <a href="#" class="icon-right-open reset-list">Reset list progress</a>\n                        <a href="#" class="icon-right-open reset">Reset the app</a>\n                        <p class="low-header">Credits</p>\n                        <p><small>All design and development by Alex Plummer.</small><br>\n                        <small>Icons courtesy of <a href="http://www.toicon.com/authors/1">Shannon E Thomas</a> at <a href="http://www.toicon.com">toicon.com</a></small></p>\n                    </div>\n                    ';

            // Add view
            modal.querySelector('.content').innerHTML += view;

            var resetList = document.querySelector('.reset-list');
            var resetApp = document.querySelector('.reset');

            if (typeof cordova === 'undefined') {
                document.querySelector('.options').removeChild(document.querySelector('.options').querySelector('.reminders'));
            } else {
                document.querySelector('.reminders').addEventListener('click', function (e) {
                    e.preventDefault();notifyAsk();
                });
            }

            document.querySelector('.show-tut').addEventListener('click', function (e) {
                e.preventDefault();onboardShow();
            });

            document.querySelector('.feedback').addEventListener('click', function (e) {
                e.preventDefault();errorReport();
            });

            function resetMenu() {
                if (document.querySelector('.delete-confirm') !== null) {
                    resetList.innerHTML = "Reset list progress";
                    resetApp.innerHTML = "Reset the app";
                    document.querySelector('.delete-confirm').parentNode.removeChild(document.querySelector('.delete-cancel'));
                    document.querySelector('.delete-confirm').parentNode.removeChild(document.querySelector('.delete-confirm'));
                }
            }
            resetList.addEventListener('click', function (e) {
                e.preventDefault();
                resetMenu();
                resetList.innerHTML = "Are you sure you want to delete progress for this list? (Can't undo)";
                resetList.parentNode.insertBefore(document.createElement("div"), resetList.nextSibling);
                resetList.nextSibling.innerHTML = '<button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

                document.querySelector('.delete-confirm').addEventListener('click', function () {
                    delete tinyTerms$1[tinyTerms$1.pickedList];
                    localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]).then(function (value) {
                        localforage.removeItem('tinyTermsDefault').then(function () {
                            location.reload();
                        });
                    });
                });
                document.querySelector('.delete-cancel').addEventListener('click', function () {
                    hideModal(true);
                });
            });
            document.querySelector('.reset').addEventListener('click', function (e) {
                e.preventDefault();
                resetMenu();
                resetApp.innerHTML = "Are you sure you want to delete all progress for the app? (Can't undo)";
                resetApp.parentNode.insertBefore(document.createElement("div"), resetApp.nextSibling);
                resetApp.nextSibling.innerHTML = '<button class="delete-cancel">Cancel</button><button class="delete-confirm">Confim</button>';

                document.querySelector('.delete-confirm').addEventListener('click', function () {
                    localforage.clear().then(function () {
                        location.reload();
                    });
                });
                document.querySelector('.delete-cancel').addEventListener('click', function () {
                    hideModal(true);
                });
            });
        });
    };

    // Ask for reminders
    var notifyAsk = function notifyAsk() {
        var modal = document.querySelector('.m-modal');

        modal.classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.add('modal-active');

        var view = '<header>\n                    <h2 class="icon-cog-outline">Reminders</h2>\n                </header>\n                <div class="m-reminders options">\n                    <p>You can configure reminders here, they are really helpful if you keep forgetting to learn terms!</p>\n                    <button class="save-times">Save reminders</button>\n                    <button class="add-time">New reminder</button>\n                    <div class="time-holders">\n                    </div>\n                </div>\n                ';

        // Add view
        modal.querySelector('.content').innerHTML = view;

        var defaultTimes = [[8, 15], [12, 15], [17, 50]];

        tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes = tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes || defaultTimes;

        // Get stored times, then add to DOM
        getTimes();

        function getTimes() {
            var reminderTimesLength = tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes.length;

            document.querySelector('.time-holders').innerHTML = "";

            // Build times based off stored data
            for (var i = 0; i < reminderTimesLength; i++) {
                var hours = tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes[i][0];
                var mins = tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes[i][1];
                if (mins === 0) {
                    mins = '00';
                }
                var time = hours + ':' + mins;

                addTime(i, time);
            }
        }

        // Add to DOM
        function addTime(i, time) {
            var timeClass = 'time-' + i;
            var timeTemplate = '<div class="time-wrap ' + timeClass + '">\n                                <input type="text" class="time-input" disabled value="' + time + '">\n                                <button class="change-time">Change</button>\n                                <button class="remove-time">Remove</button>\n                            </div>';

            document.querySelector('.time-holders').innerHTML += timeTemplate;
            updateListeners();
        }

        // Add a new time 
        document.querySelector('.add-time').addEventListener('click', function (e) {
            tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes.push([12, 0]);
            getTimes();
        });

        // Save reminders
        document.querySelector('.save-times').addEventListener('click', function (e) {
            e.preventDefault();
            saveReminders();

            // Save to storage
            localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]).then(function (value) {
                hideModal(true);
            });
        });

        function saveReminders() {
            var reminderTimesLength = tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes.length;

            // Reset stored
            tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes = [];

            // Build times based off edited times
            var timeButtons = document.querySelectorAll('.time-wrap');
            var timeCount = timeButtons.length;

            for (var i = 0; i < timeCount; i++) {
                var editedTime = document.querySelectorAll('.time-wrap')[i].querySelector('.time-input').value;

                var hours = editedTime.split(":")[0];
                var mins = editedTime.split(":")[1];

                // Add to stored
                tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes.push([hours, mins]);

                var theDate = new Date();

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
            var timeButtons = document.querySelectorAll('.time-wrap');
            var timeCount = timeButtons.length;

            // Edit time

            var _loop8 = function _loop8(i) {
                document.querySelectorAll('.time-wrap')[i].querySelector('.change-time').addEventListener('click', function (e) {
                    e.preventDefault();
                    var thisToggle = 'x' + i;
                    var thisWrap = '.time-' + i;
                    var thisInput = document.querySelector(thisWrap).getElementsByTagName('input')[0];

                    thisToggle = new mdDateTimePicker.default({
                        type: 'time',
                        mode: true
                    });

                    thisToggle.time = moment().hours(12).minutes(0);
                    thisToggle.toggle();
                    thisToggle.trigger = thisInput;

                    thisInput.addEventListener('onOk', function () {
                        var hours = thisToggle.time.hours().toString();
                        var mins = thisToggle.time.minutes().toString();

                        if (mins < 10) {
                            mins = '0' + mins;
                        }
                        this.value = hours + ':' + mins;
                    });
                });

                // Remove time
                document.querySelectorAll('.time-wrap')[i].querySelector('.remove-time').addEventListener('click', function (e) {
                    tinyTerms$1[tinyTerms$1.pickedList].storedData.reminderTimes.splice(i, 1).pop();
                    cordova.plugins.notification.local.cancel(i, function () {});
                    getTimes();
                });
            };

            for (var i = 0; i < timeCount; i++) {
                _loop8(i);
            }
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
        revealGoalTarget: 3,
        wordAccuracy: 0.7,
        addDay: false,
        debug: true,
        godMode: false,
        loadDelay: 2500,
        points: {
            correct: 50,
            dailyBonus: 10,
            hearts: 3,
            winBonus: 10
        }
    };

    // Matches with array of menu items in menuInteraction.js
    var paidUnlocks = {
        terms10: { points: 0, active: 'locked' }
    };
    var listUnlocks = {
        termsRefresh: { points: 250, active: 'locked' },
        timerHalf: { points: 300, active: 'locked' }
    };
    var globalUnlocks = {
        coloursNeon: { points: 500, active: 'locked' },
        symbolsSolid: { points: 1000, active: 'locked' },
        bgStars: { points: 3000, active: 'locked' },
        symbolsFeather: { points: 5000, active: 'locked' },
        bgLetters: { points: 10000, active: 'locked' },
        coloursMetal: { points: 50000, active: 'locked' }
    };

    // Crash protection
    var notLoaded = true;

    setTimeout(function () {
        document.getElementsByTagName("body")[0].classList.remove("loading");

        if (notLoaded === true) {
            var modal = document.querySelector('.m-modal');
            modal.classList.remove("hidden");
            document.getElementsByTagName("body")[0].classList.add("modal-active");

            var view = '<header>\n\t\t\t\t\t\t<h2 class="">Uh oh!</h2>\n\t\t\t\t\t</header>\n\t\t\t\t\t<br>\n\t\t\t\t\t<p>Sorry something went wrong.</p>\n\t\t\t\t\t<p>If this keeps happening you can reset the list by <a href="#" class="reset-list">clicking here</a> (wipes list progress).</p>\n\t\t\t\t\t<br>\n\t\t\t\t\t<button class="crash-report">Report issue</button><button class="home-btn">Close</button>\n\t\t\t\t\t';

            // Add view
            modal.querySelector(".content").innerHTML = view;
            modal.classList.add('onboard');

            document.querySelector('.crash-report').addEventListener("click", function (e) {
                e.preventDefault();
                errorReport();
            });

            document.querySelector(".reset-list").addEventListener("click", function (e) {
                e.preventDefault();

                delete tinyTerms$1[tinyTerms$1.pickedList];

                localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]).then(function (value) {
                    localforage.removeItem('tinyTermsDefault').then(function () {
                        location.reload();
                    });
                });
            });

            document.querySelector(".home-btn").addEventListener("click", function (e) {
                e.preventDefault();
                showHome();
            });
        }
    }, 20000);

    // Initialise modules on load
    ready(function () {
        "use strict";

        localforage.getItem("tinyTerms.lists", function (err, lists) {

            // Check for internet, pull list references if connection
            checkConnection(noConnection, isConnection);

            function noConnection() {
                if (lists === null) {
                    alertMsg("Please connect to the internet to download the lists, after they will be available offline.", function () {
                        document.querySelector(".home-btn").addEventListener("click", function (e) {
                            e.preventDefault();
                            showHome();
                        });
                    });
                } else {
                    tinyTerms$1.listChoices = lists;
                    getLists();
                }
            }

            function isConnection() {
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
                tinyTerms$1.listChoices = {};

                for (var i = 0; i < data.Sheet1.elements.length; i++) {

                    tinyTerms$1.listChoices[data.Sheet1.elements[i].Name] = {
                        name: data.Sheet1.elements[i].Name,
                        category: data.Sheet1.elements[i].Category,
                        sheetURL: data.Sheet1.elements[i].sheetURL,
                        version: data.Sheet1.elements[i].Version
                    };
                }
                localforage.setItem("tinyTerms.lists", tinyTerms$1.listChoices, function () {
                    getLists();
                });
            }
        }
    });

    // Pick a list
    function getLists(skipDefaultCheck) {
        var tinyTermsDefault = void 0;

        localforage.getItem("tinyTerms.tutComplete", function (err, tutStatus) {
            tinyTerms$1.tutComplete = tutStatus;

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

        // Check to see if default list already has data
        function checkDefault() {
            // Check for existing data of newly picked list
            localforage.getItem("tinyTerms" + tinyTermsDefault, function (err, value) {

                // If data exists in storage, load normally
                if (value !== null) {
                    tinyTerms$1.pickedList = tinyTermsDefault;
                    normalLoad(tinyTerms$1.pickedList);
                }
                // Fetch data if connection
                else {
                        var noConnection = function noConnection() {
                            alertMsg("Please connect to the internet to download the list, after it will be available offline.", function () {
                                document.querySelector(".home-btn").addEventListener("click", function (e) {
                                    e.preventDefault();
                                    showHome();
                                });
                            });
                        };

                        var isConnection = function isConnection() {
                            firstLoad();
                        };

                        checkConnection(noConnection, isConnection);
                        notLoaded = false;
                    }
            });
        }

        function normalLoad(defaultlist) {
            tinyTerms$1.storedName = "tinyTerms" + defaultlist;

            localforage.getItem("tinyTerms" + defaultlist, function (err, value) {

                // Set session storage to stored
                tinyTerms$1[tinyTerms$1.pickedList] = value;

                // Update stored ops
                tinyTerms$1[tinyTerms$1.pickedList].ops = ops;

                localforage.getItem("tinyTerms.globalUnlocks", function (err, globalUnlocks) {

                    // Set global unlocks ops attributes
                    if (globalUnlocks !== null) {
                        tinyTerms$1.globalUnlocks = globalUnlocks;

                        // Ten terms
                        if (tinyTerms$1.globalUnlocks.terms10.active === 'unlocked') {
                            tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms = 10;
                        }
                    }

                    // Set list unlocks ops attributes
                    if (tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks !== undefined) {

                        // Half timer
                        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks.timerHalf.active === 'unlocked') {
                            tinyTerms$1[tinyTerms$1.pickedList].ops.counterMins = 30;
                        }
                    }

                    setUnlocks(initialise);
                });
            });
        }
    }

    // Set unlocks
    var setUnlocks = function setUnlocks(callback) {

        // Set paid list unlocks
        localforage.getItem("tinyTerms.paidUnlocks", function (err, storedPaidUnlocks) {

            tinyTerms$1.paidUnlocks = storedPaidUnlocks || paidUnlocks;

            // Ten terms
            if (tinyTerms$1.paidUnlocks.terms10.active === 'unlocked') {
                tinyTerms$1[tinyTerms$1.pickedList].ops.displayedTerms = 10;
            }

            // Set global unlocks
            localforage.getItem("tinyTerms.globalUnlocks", function (err, storedGlobalUnlocks) {

                // Set default list unlocks
                tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks = tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks || listUnlocks;

                // Set default global unlocks
                tinyTerms$1.globalUnlocks = storedGlobalUnlocks || globalUnlocks;

                // Reset terms refresh 
                tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks.termsRefresh.active = 'locked';

                // Set list unlocks ops attributes
                if (tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks !== undefined) {

                    // Half timer
                    if (tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks.timerHalf.active === 'unlocked') {
                        tinyTerms$1[tinyTerms$1.pickedList].ops.counterMins = 30;
                    }
                }
                callback();
            });
        });
    };

    // Sets up new list, gets data
    var firstLoad = function firstLoad() {

        localforage.getItem("tinyTermsDefault", function (err, value) {
            // Set session storage to stored
            tinyTerms$1.pickedList = value;

            // Set picked list and create data object for it
            tinyTerms$1[tinyTerms$1.pickedList] = {};
            tinyTerms$1[tinyTerms$1.pickedList].storedData = {};
            tinyTerms$1[tinyTerms$1.pickedList].ops = ops;
            tinyTerms$1.storedName = "tinyTerms" + tinyTerms$1.pickedList;

            // Add to storage
            localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList], function () {
                // Add default lists to uploadedLists, same place as user upload
                localforage.getItem("tinyTerms.uploadedLists", function (err, uploadedLists) {
                    var sheetURL = void 0;

                    uploadedLists = uploadedLists || {};
                    // If list from uploaded lists
                    if (uploadedLists.hasOwnProperty(tinyTerms$1.pickedList)) {
                        sheetURL = uploadedLists[tinyTerms$1.pickedList].sheetURL;
                    }
                    // Else from default lists
                    else {
                            sheetURL = tinyTerms$1.listChoices[tinyTerms$1.pickedList].sheetURL;
                        }

                    // Error handling for Tabletop
                    errorAlert('Couldn\'t load the list URL, did you copy it correctly?', function () {

                        // Clear list references callback
                        localforage.removeItem(tinyTerms$1.storedName).then(function () {
                            localforage.removeItem(tinyTerms$1.pickedList);
                        });
                        notLoaded = false;
                    });

                    // Fetch data for list
                    fetchData(sheetURL, firstTime);
                });
            });
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

    // Runs if first time list has run
    var firstTime = function firstTime() {

        // Create terms
        setUnlocks(appBuildHandler);

        // Then set first time to false
        tinyTerms$1[tinyTerms$1.pickedList].storedData.firstTime = false;

        // Add to storage
        localforage.setItem(tinyTerms$1.storedName, tinyTerms$1[tinyTerms$1.pickedList]);
    };

    // Initialises data and app
    var initialise = function initialise() {

        // Check if list data got downloaded
        if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dateOpened === undefined) {
            // Clear list references if badly downloaded
            localforage.removeItem(tinyTerms$1.storedName).then(function () {
                localforage.removeItem('tinyTermsDefault').then(function () {
                    localforage.removeItem(tinyTerms$1.pickedList);
                });
            });
            notLoaded = false;
        }
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

            // Load query if it exists already
            if (tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery !== undefined && tinyTerms$1[tinyTerms$1.pickedList].storedData.queryComplete !== true) {
                createNewQuery();
            }
        } else {
            // Else get new
            pickedTerms = getListOfTerms();

            // Clear daily goals
            delete tinyTerms$1[tinyTerms$1.pickedList].storedData.revealedTermCount;
            delete tinyTerms$1[tinyTerms$1.pickedList].storedData.revealCountdowns;
            delete tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyQuery;
            delete tinyTerms$1[tinyTerms$1.pickedList].storedData.dailyReminder;

            // Reset store unlocks
            if (tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks !== undefined) {
                tinyTerms$1[tinyTerms$1.pickedList].storedData.listUnlocks.timerHalf.active = 'locked';
            }

            // Reset daily reveal bonus
            tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal = tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal || {};
            tinyTerms$1[tinyTerms$1.pickedList].storedData.revealGoal.complete = false;

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

        if (tinyTerms$1.tutComplete === true && typeof cordova !== 'undefined') {

            // Ask for reminders
            localforage.getItem("tinyTerms.askNotify", function (err, value) {

                if (value === null) {
                    var modal = document.querySelector('.m-modal');
                    modal.classList.remove("hidden");
                    document.getElementsByTagName("body")[0].classList.add("modal-active");

                    var view = '<header>\n\t\t\t\t\t\t\t\t<h2 class="">Setup reminders</h2>\n\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t<p>Tiny Terms allows you to add reminders, these notifications are helpful if you want to really commit to learning those terms.</p>\n\t\t\t\t\t\t\t<p><strong>(You can change reminder settings from the menu)</strong></p>\n\t\t\t\t\t\t\t<button class="remind-yes width">Setup reminders</button>\n\t\t\t\t\t\t\t';

                    // Add view
                    modal.querySelector(".content").innerHTML = view;

                    document.querySelector('.remind-yes').addEventListener('click', function (e) {
                        e.preventDefault();
                        notifyAsk();
                    });

                    // Set storage
                    value = true;
                    localforage.setItem('tinyTerms.askNotify', value);
                }
            });
        }

        // Once loaded
        setTimeout(function () {
            document.getElementsByTagName("body")[0].classList.remove("loading");
            document.querySelector(".m-query").classList.add("animated", "slideInDown");

            // Show onboard if incomplete
            if (tinyTerms$1.tutComplete === null || tinyTerms$1.tutComplete === false) {
                onboardShow();
            }
        }, tinyTerms$1[tinyTerms$1.pickedList].ops.loadDelay);

        // Debug code
        if (tinyTerms$1[tinyTerms$1.pickedList].ops.debug === true) {
            console.log(tinyTerms$1);
        }
    };

    return tinyTerms$1;
}();
//# sourceMappingURL=app.js.map
