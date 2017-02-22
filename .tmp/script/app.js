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

    // App data

    var appData = {

        terms: {
            accogliere: { term: "accogliere", definition: "receive", support: "" },
            accompagnare: { term: "accompagnare", definition: "accompany", support: "" },
            accorgere: { term: "accorgere", definition: "become aware", support: "" },
            affermare: { term: "affermare", definition: "affirm", support: "" },
            affrontare: { term: "affrontare", definition: "face", support: "" },
            aggiungere: { term: "aggiungere", definition: "add", support: "" },
            aiutare: { term: "aiutare", definition: "help", support: "" },
            allontanare: { term: "allontanare", definition: "remove", support: "" },
            alzare: { term: "alzare", definition: "raise", support: "" },
            amare: { term: "amare", definition: "love", support: "" },
            ammazzare: { term: "ammazzare", definition: "kill", support: "" },
            ammettere: { term: "ammettere", definition: "admit", support: "" },
            andare: { term: "andare", definition: "go", support: "" },
            annunciare: { term: "annunciare", definition: "announce", support: "" },
            apparire: { term: "apparire", definition: "appear", support: "" },
            appartenere: { term: "appartenere", definition: "belong", support: "" },
            appoggiare: { term: "appoggiare", definition: "support", support: "" },
            aprire: { term: "aprire", definition: "open", support: "" },
            armare: { term: "armare", definition: "arm", support: "" },
            arrestare: { term: "arrestare", definition: "stop", support: "" },
            arrivare: { term: "arrivare", definition: "arrive", support: "" },
            ascoltare: { term: "ascoltare", definition: "listen", support: "" },
            aspettare: { term: "aspettare", definition: "wait", support: "" },
            assicurare: { term: "assicurare", definition: "ensure", support: "" },
            assistere: { term: "assistere", definition: "assist", support: "" },
            assumere: { term: "assumere", definition: "take", support: "" },
            attaccare: { term: "attaccare", definition: "attack", support: "" },
            attendere: { term: "attendere", definition: "wait for", support: "" },
            attraversare: { term: "attraversare", definition: "cross", support: "" },
            aumentare: { term: "aumentare", definition: "increase", support: "" },
            avanzare: { term: "avanzare", definition: "advance", support: "" },
            avere: { term: "avere", definition: "have", support: "" },
            avvenire: { term: "avvenire", definition: "occur", support: "" },
            avvertire: { term: "avvertire", definition: "warn", support: "" },
            avvicinare: { term: "avvicinare", definition: "approach", support: "" },
            baciare: { term: "baciare", definition: "kiss", support: "" },
            badare: { term: "badare", definition: "look after", support: "" },
            bastare: { term: "bastare", definition: "suffice", support: "" },
            battere: { term: "battere", definition: "beat", support: "" },
            bere: { term: "bere", definition: "drinking", support: "" },
            bisognare: { term: "bisognare", definition: "bisognare", support: "" },
            bruciare: { term: "bruciare", definition: "burn", support: "" },
            buttare: { term: "buttare", definition: "throw", support: "" },
            cadere: { term: "cadere", definition: "fall", support: "" },
            cambiare: { term: "cambiare", definition: "change", support: "" },
            camminare: { term: "camminare", definition: "walk", support: "" },
            cantare: { term: "cantare", definition: "sing", support: "" },
            capire: { term: "capire", definition: "understand", support: "" },
            capitare: { term: "capitare", definition: "happen", support: "" },
            celebrare: { term: "celebrare", definition: "celebrate", support: "" },
            cercare: { term: "cercare", definition: "search", support: "" },
            chiamare: { term: "chiamare", definition: "call", support: "" },
            chiedere: { term: "chiedere", definition: "ask", support: "" },
            chiudere: { term: "chiudere", definition: "close", support: "" },
            colpire: { term: "colpire", definition: "hit", support: "" },
            cominciare: { term: "cominciare", definition: "begin", support: "" },
            compiere: { term: "compiere", definition: "fulfill", support: "" },
            comporre: { term: "comporre", definition: "compose", support: "" },
            comprendere: { term: "comprendere", definition: "understand", support: "" },
            comprare: { term: "comprare", definition: "buy", support: "" },
            concedere: { term: "concedere", definition: "grant", support: "" },
            concludere: { term: "concludere", definition: "conclude", support: "" },
            condurre: { term: "condurre", definition: "lead", support: "" },
            confessare: { term: "confessare", definition: "confess", support: "" },
            conoscere: { term: "conoscere", definition: "know", support: "" },
            consentire: { term: "consentire", definition: "allow", support: "" },
            conservare: { term: "conservare", definition: "save", support: "" },
            considerare: { term: "considerare", definition: "consider", support: "" },
            contare: { term: "contare", definition: "count", support: "" },
            contenere: { term: "contenere", definition: "contain", support: "" },
            continuare: { term: "continuare", definition: "continue", support: "" },
            convincere: { term: "convincere", definition: "convince", support: "" },
            coprire: { term: "coprire", definition: "cover", support: "" },
            correre: { term: "correre", definition: "run", support: "" },
            costituire: { term: "costituire", definition: "constitute", support: "" },
            costringere: { term: "costringere", definition: "force", support: "" },
            costruire: { term: "costruire", definition: "build", support: "" },
            creare: { term: "creare", definition: "create", support: "" },
            credere: { term: "credere", definition: "believe", support: "" },
            crescere: { term: "crescere", definition: "grow", support: "" },
            dare: { term: "dare", definition: "give", support: "" },
            decidere: { term: "decidere", definition: "decide", support: "" },
            dedicare: { term: "dedicare", definition: "devote", support: "" },
            descrivere: { term: "descrivere", definition: "describe", support: "" },
            desiderare: { term: "desiderare", definition: "wish", support: "" },
            determinare: { term: "determinare", definition: "determine", support: "" },
            dichiarare: { term: "dichiarare", definition: "declare", support: "" },
            difendere: { term: "difendere", definition: "defend", support: "" },
            diffondere: { term: "diffondere", definition: "spread", support: "" },
            dimenticare: { term: "dimenticare", definition: "forget", support: "" },
            dimostrare: { term: "dimostrare", definition: "show", support: "" },
            dipendere: { term: "dipendere", definition: "depend", support: "" },
            dire: { term: "dire", definition: "say", support: "" },
            dirigere: { term: "dirigere", definition: "direct", support: "" },
            discutere: { term: "discutere", definition: "discuss", support: "" },
            disporre: { term: "disporre", definition: "have", support: "" },
            distinguere: { term: "distinguere", definition: "distinguish", support: "" },
            distruggere: { term: "distruggere", definition: "destroy", support: "" },
            diventare: { term: "diventare", definition: "become", support: "" },
            divenire: { term: "divenire", definition: "become", support: "" },
            divertire: { term: "divertire", definition: "entertain", support: "" },
            dividere: { term: "dividere", definition: "divide", support: "" },
            domandare: { term: "domandare", definition: "ask", support: "" },
            dormire: { term: "dormire", definition: "sleep", support: "" },
            dovere: { term: "dovere", definition: "duty", support: "" },
            durare: { term: "durare", definition: "last", support: "" },
            elevare: { term: "elevare", definition: "elevate", support: "" },
            entrare: { term: "entrare", definition: "enter", support: "" },
            escludere: { term: "escludere", definition: "exclude", support: "" },
            esistere: { term: "esistere", definition: "exist", support: "" },
            esporre: { term: "esporre", definition: "expose", support: "" },
            esprimere: { term: "esprimere", definition: "express", support: "" },
            essere: { term: "essere", definition: "be", support: "" },
            estendere: { term: "estendere", definition: "extend", support: "" },
            evitare: { term: "evitare", definition: "avoid", support: "" },
            ferire: { term: "ferire", definition: "hurt", support: "" },
            fermare: { term: "fermare", definition: "stop", support: "" },
            figurare: { term: "figurare", definition: "appear", support: "" },
            finire: { term: "finire", definition: "end", support: "" },
            fissare: { term: "fissare", definition: "fix", support: "" },
            fondare: { term: "fondare", definition: "found", support: "" },
            formare: { term: "formare", definition: "form", support: "" },
            fornire: { term: "fornire", definition: "provide", support: "" },
            fuggire: { term: "fuggire", definition: "flee", support: "" },
            fumare: { term: "fumare", definition: "smoke", support: "" },
            gettare: { term: "gettare", definition: "throw", support: "" },
            giocare: { term: "giocare", definition: "play", support: "" },
            girare: { term: "girare", definition: "turn", support: "" },
            giudicare: { term: "giudicare", definition: "judge", support: "" },
            giungere: { term: "giungere", definition: "reach", support: "" },
            godere: { term: "godere", definition: "be happy", support: "" },
            gridare: { term: "gridare", definition: "shout", support: "" },
            guardare: { term: "guardare", definition: "look", support: "" },
            guidare: { term: "guidare", definition: "lead", support: "" },
            immaginare: { term: "immaginare", definition: "imagine", support: "" },
            imparare: { term: "imparare", definition: "learn", support: "" },
            impedire: { term: "impedire", definition: "prevent", support: "" },
            importare: { term: "importare", definition: "import", support: "" },
            imporre: { term: "imporre", definition: "impose", support: "" },
            incontrare: { term: "incontrare", definition: "meet", support: "" },
            indicare: { term: "indicare", definition: "indicate", support: "" },
            iniziare: { term: "iniziare", definition: "start", support: "" },
            innamorare: { term: "innamorare", definition: "fall in love", support: "" },
            insegnare: { term: "insegnare", definition: "teach", support: "" },
            insistere: { term: "insistere", definition: "insist", support: "" },
            intendere: { term: "intendere", definition: "hear", support: "" },
            interessare: { term: "interessare", definition: "affect", support: "" },
            invitare: { term: "invitare", definition: "invite", support: "" },
            lanciare: { term: "lanciare", definition: "launch", support: "" },
            lasciare: { term: "lasciare", definition: "leave", support: "" },
            lavorare: { term: "lavorare", definition: "work", support: "" },
            legare: { term: "legare", definition: "tie", support: "" },
            leggere: { term: "leggere", definition: "read", support: "" },
            levare: { term: "levare", definition: "upbeat", support: "" },
            liberare: { term: "liberare", definition: "release", support: "" },
            limitare: { term: "limitare", definition: "limit", support: "" },
            mancare: { term: "mancare", definition: "miss", support: "" },
            mandare: { term: "mandare", definition: "send", support: "" },
            mangiare: { term: "mangiare", definition: "eat", support: "" },
            mantenere: { term: "mantenere", definition: "keep", support: "" },
            meritare: { term: "meritare", definition: "deserve", support: "" },
            mettere: { term: "mettere", definition: "put", support: "" },
            morire: { term: "morire", definition: "die", support: "" },
            mostrare: { term: "mostrare", definition: "show", support: "" },
            muovere: { term: "muovere", definition: "move", support: "" },
            nascere: { term: "nascere", definition: "be born", support: "" },
            nascondere: { term: "nascondere", definition: "hide", support: "" },
            notare: { term: "notare", definition: "note", support: "" },
            occorrere: { term: "occorrere", definition: "take", support: "" },
            offendere: { term: "offendere", definition: "offend", support: "" },
            offrire: { term: "offrire", definition: "offer", support: "" },
            opporre: { term: "opporre", definition: "offer", support: "" },
            ordinare: { term: "ordinare", definition: "order", support: "" },
            organizzare: { term: "organizzare", definition: "organize", support: "" },
            osservare: { term: "osservare", definition: "observe", support: "" },
            ottenere: { term: "ottenere", definition: "get", support: "" },
            pagare: { term: "pagare", definition: "pay", support: "" },
            parere: { term: "parere", definition: "opinion", support: "" },
            parlare: { term: "parlare", definition: "speak", support: "" },
            partecipare: { term: "partecipare", definition: "take part", support: "" },
            partire: { term: "partire", definition: "leave", support: "" },
            passare: { term: "passare", definition: "switch", support: "" },
            pensare: { term: "pensare", definition: "think", support: "" },
            perdere: { term: "perdere", definition: "lose", support: "" },
            permettere: { term: "permettere", definition: "allow", support: "" },
            pesare: { term: "pesare", definition: "weigh", support: "" },
            piacere: { term: "piacere", definition: "pleasure", support: "" },
            piangere: { term: "piangere", definition: "cry", support: "" },
            piantare: { term: "piantare", definition: "plant", support: "" },
            porre: { term: "porre", definition: "place", support: "" },
            portare: { term: "portare", definition: "bring", support: "" },
            posare: { term: "posare", definition: "place", support: "" },
            possedere: { term: "possedere", definition: "own", support: "" },
            potere: { term: "potere", definition: "power", support: "" },
            preferire: { term: "preferire", definition: "prefer", support: "" },
            pregare: { term: "pregare", definition: "pray", support: "" },
            prendere: { term: "prendere", definition: "take", support: "" },
            preoccupare: { term: "preoccupare", definition: "worry", support: "" },
            preparare: { term: "preparare", definition: "prepare", support: "" },
            presentare: { term: "presentare", definition: "present", support: "" },
            prevedere: { term: "prevedere", definition: "foresee", support: "" },
            procedere: { term: "procedere", definition: "continue", support: "" },
            produrre: { term: "produrre", definition: "produce", support: "" },
            promettere: { term: "promettere", definition: "promise", support: "" },
            proporre: { term: "proporre", definition: "propose", support: "" },
            provare: { term: "provare", definition: "try", support: "" },
            provocare: { term: "provocare", definition: "cause", support: "" },
            provvedere: { term: "provvedere", definition: "provide", support: "" },
            pubblicare: { term: "pubblicare", definition: "publish", support: "" },
            raccogliere: { term: "raccogliere", definition: "gather", support: "" },
            raccontare: { term: "raccontare", definition: "tell", support: "" },
            raggiungere: { term: "raggiungere", definition: "reach", support: "" },
            rappresentare: { term: "rappresentare", definition: "represent", support: "" },
            recare: { term: "recare", definition: "cause", support: "" },
            rendere: { term: "rendere", definition: "make", support: "" },
            resistere: { term: "resistere", definition: "resist", support: "" },
            restare: { term: "restare", definition: "stay", support: "" },
            ricevere: { term: "ricevere", definition: "receive", support: "" },
            richiedere: { term: "richiedere", definition: "request", support: "" },
            riconoscere: { term: "riconoscere", definition: "recognize", support: "" },
            ricordare: { term: "ricordare", definition: "remember", support: "" },
            ridere: { term: "ridere", definition: "laugh", support: "" },
            ridurre: { term: "ridurre", definition: "reduce", support: "" },
            riempire: { term: "riempire", definition: "fill", support: "" },
            rientrare: { term: "rientrare", definition: "re-enter", support: "" },
            riferire: { term: "riferire", definition: "report", support: "" },
            rifiutare: { term: "rifiutare", definition: "refuse", support: "" },
            riguardare: { term: "riguardare", definition: "concern", support: "" },
            rimanere: { term: "rimanere", definition: "stay", support: "" },
            rimettere: { term: "rimettere", definition: "return", support: "" },
            ringraziare: { term: "ringraziare", definition: "thank", support: "" },
            ripetere: { term: "ripetere", definition: "repeat", support: "" },
            riportare: { term: "riportare", definition: "report", support: "" },
            riprendere: { term: "riprendere", definition: "resume", support: "" },
            risolvere: { term: "risolvere", definition: "solve", support: "" },
            rispondere: { term: "rispondere", definition: "answer", support: "" },
            risultare: { term: "risultare", definition: "result", support: "" },
            ritenere: { term: "ritenere", definition: "consider", support: "" },
            ritornare: { term: "ritornare", definition: "return", support: "" },
            ritrovare: { term: "ritrovare", definition: "find", support: "" },
            riunire: { term: "riunire", definition: "gather", support: "" },
            riuscire: { term: "riuscire", definition: "succeed", support: "" },
            rivedere: { term: "rivedere", definition: "review", support: "" },
            rivelare: { term: "rivelare", definition: "reveal", support: "" },
            rivolgere: { term: "rivolgere", definition: "turn", support: "" },
            rompere: { term: "rompere", definition: "break", support: "" },
            salire: { term: "salire", definition: "go up", support: "" },
            saltare: { term: "saltare", definition: "skip", support: "" },
            salutare: { term: "salutare", definition: "healthy", support: "" },
            salvare: { term: "salvare", definition: "save", support: "" },
            sapere: { term: "sapere", definition: "know", support: "" },
            sbagliare: { term: "sbagliare", definition: "make a mistake", support: "" },
            scappare: { term: "scappare", definition: "escape", support: "" },
            scegliere: { term: "scegliere", definition: "choose", support: "" },
            scendere: { term: "scendere", definition: "get off", support: "" },
            scherzare: { term: "scherzare", definition: "joke", support: "" },
            scomparire: { term: "scomparire", definition: "disappear", support: "" },
            scoppiare: { term: "scoppiare", definition: "burst", support: "" },
            scoprire: { term: "scoprire", definition: "discover", support: "" },
            scorrere: { term: "scorrere", definition: "slide", support: "" },
            scrivere: { term: "scrivere", definition: "write", support: "" },
            scusare: { term: "scusare", definition: "excuse", support: "" },
            sedere: { term: "sedere", definition: "sit down", support: "" },
            segnare: { term: "segnare", definition: "score", support: "" },
            seguire: { term: "seguire", definition: "follow", support: "" },
            sembrare: { term: "sembrare", definition: "look", support: "" },
            sentire: { term: "sentire", definition: "feel", support: "" },
            servire: { term: "servire", definition: "serve", support: "" },
            significare: { term: "significare", definition: "mean", support: "" },
            smettere: { term: "smettere", definition: "stop", support: "" },
            soffrire: { term: "soffrire", definition: "suffer", support: "" },
            sognare: { term: "sognare", definition: "dream", support: "" },
            sorgere: { term: "sorgere", definition: "rise", support: "" },
            sorprendere: { term: "sorprendere", definition: "surprise", support: "" },
            sorridere: { term: "sorridere", definition: "smile", support: "" },
            sostenere: { term: "sostenere", definition: "support", support: "" },
            spegnere: { term: "spegnere", definition: "switch off", support: "" },
            sperare: { term: "sperare", definition: "hope", support: "" },
            spiegare: { term: "spiegare", definition: "explain", support: "" },
            spingere: { term: "spingere", definition: "push", support: "" },
            sposare: { term: "sposare", definition: "marry", support: "" },
            stabilire: { term: "stabilire", definition: "establish", support: "" },
            staccare: { term: "staccare", definition: "remove", support: "" },
            stare: { term: "stare", definition: "stay", support: "" },
            stringere: { term: "stringere", definition: "tighten", support: "" },
            studiare: { term: "studiare", definition: "study", support: "" },
            succedere: { term: "succedere", definition: "happen", support: "" },
            suonare: { term: "suonare", definition: "play", support: "" },
            superare: { term: "superare", definition: "exceed", support: "" },
            svegliare: { term: "svegliare", definition: "wake", support: "" },
            svolgere: { term: "svolgere", definition: "perform", support: "" },
            tacere: { term: "tacere", definition: "be silent", support: "" },
            tagliare: { term: "tagliare", definition: "cut", support: "" },
            temere: { term: "temere", definition: "fear", support: "" },
            tendere: { term: "tendere", definition: "stretch", support: "" },
            tenere: { term: "tenere", definition: "hold", support: "" },
            tentare: { term: "tentare", definition: "groped", support: "" },
            tirare: { term: "tirare", definition: "pull", support: "" },
            toccare: { term: "toccare", definition: "touch", support: "" },
            togliere: { term: "togliere", definition: "remove", support: "" },
            tornare: { term: "tornare", definition: "return", support: "" },
            trarre: { term: "trarre", definition: "draw", support: "" },
            trascinare: { term: "trascinare", definition: "drag", support: "" },
            trasformare: { term: "trasformare", definition: "transform", support: "" },
            trattare: { term: "trattare", definition: "treat", support: "" },
            trovare: { term: "trovare", definition: "find", support: "" },
            uccidere: { term: "uccidere", definition: "kill", support: "" },
            udire: { term: "udire", definition: "hear", support: "" },
            unire: { term: "unire", definition: "unite", support: "" },
            usare: { term: "usare", definition: "use", support: "" },
            uscire: { term: "uscire", definition: "go out", support: "" },
            valere: { term: "valere", definition: "be worth", support: "" },
            vedere: { term: "vedere", definition: "see", support: "" },
            vendere: { term: "vendere", definition: "sell", support: "" },
            venire: { term: "venire", definition: "come", support: "" },
            vestire: { term: "vestire", definition: "dress", support: "" },
            vincere: { term: "vincere", definition: "win", support: "" },
            vivere: { term: "vivere", definition: "live", support: "" },
            volare: { term: "volare", definition: "fly", support: "" },
            volere: { term: "volere", definition: "want", support: "" },
            volgere: { term: "volgere", definition: "turn", support: "" },
            voltare: { term: "voltare", definition: "turn", support: "" }
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
                if (ops$1.storedData.incorrectTerms !== undefined) {

                    var reminderTerm = void 0;

                    // Add reminded terms list
                    ops$1.storedData.remindedTerms = ops$1.storedData.remindedTerms || {};

                    // Keep reminded term the same
                    if (ops$1.storedData.dailyReminder === undefined) {
                        ops$1.storedData.dailyReminder = {};
                        reminderTerm = pickRandom(ops$1.storedData.incorrectTerms);
                        reminderTerm = Object.getOwnPropertyNames(reminderTerm);
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
                var newHolder = '<div class="term-wrapper">\n                <p class="term-holder">' + termValue + '</p>\n                <div class="definition-wrapper hidden">\n                    <p class="definition-holder">' + definitionValue + '</p>\n                    <div class="support-wrapper">' + supportValue + '</div>\n                </div>\n                <p class="term-views">' + viewsCount + '</p>\n                <button class="reveal">Reveal definition</button>\n            </div>';

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
                            var revealTerm = revealBtn[i].parentNode.querySelector('.term-holder').innerHTML;

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
            heartsHTML += '<p>❤</p>';
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
            }
        }

        // Build the query
        function queryHandler() {
            var queryWrapper = document.querySelector('.query-wrapper');
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
                } else {
                    // Display win message
                    resultHolder.innerHTML = "Well done, the definition for <strong>\"" + randomTerm + "\"</strong> is <strong>\"" + definition + "\"</strong>";
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

            var term = [revealBtn[i].parentNode.querySelector('.term-holder').innerHTML];

            // Updates the revealed view counter
            var countHolder = revealBtn[i].parentNode.querySelector('.term-views');
            var definitionWrapper = revealBtn[i].parentNode.querySelector('.definition-wrapper');
            var definitionHolder = revealBtn[i].parentNode.querySelector('.definition-holder');
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

        var term = [revealBtn.parentNode.querySelector('.term-holder').innerHTML];

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
        revealDailyBonusTarget: 2,
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
