!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.localforage=t()}}(function(){return function t(e,r,n){function o(i,d){if(!r[i]){if(!e[i]){var s="function"==typeof require&&require;if(!d&&s)return s(i,!0);if(a)return a(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=r[i]={exports:{}};e[i][0].call(c.exports,function(t){var r=e[i][1][t];return o(r?r:t)},c,c.exports,t,e,r,n)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(t,e,r){(function(t){"use strict";function r(){c=!0;for(var t,e,r=f.length;r;){for(e=f,f=[],t=-1;++t<r;)e[t]();r=f.length}c=!1}function n(t){1!==f.push(t)||c||o()}var o,a=t.MutationObserver||t.WebKitMutationObserver;if(a){var i=0,d=new a(r),s=t.document.createTextNode("");d.observe(s,{characterData:!0}),o=function(){s.data=i=++i%2}}else if(t.setImmediate||"undefined"==typeof t.MessageChannel)o="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){r(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(r,0)};else{var u=new t.MessageChannel;u.port1.onmessage=r,o=function(){u.port2.postMessage(0)}}var c,f=[];e.exports=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(t,e,r){"use strict";function n(){}function o(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=m,this.queue=[],this.outcome=void 0,t!==n&&s(this,t)}function a(t,e,r){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function i(t,e,r){b(function(){var n;try{n=e(r)}catch(e){return y.reject(t,e)}n===t?y.reject(t,new TypeError("Cannot resolve promise with itself")):y.resolve(t,n)})}function d(t){var e=t&&t.then;if(t&&"object"==typeof t&&"function"==typeof e)return function(){e.apply(t,arguments)}}function s(t,e){function r(e){a||(a=!0,y.reject(t,e))}function n(e){a||(a=!0,y.resolve(t,e))}function o(){e(n,r)}var a=!1,i=u(o);"error"===i.status&&r(i.value)}function u(t,e){var r={};try{r.value=t(e),r.status="success"}catch(t){r.status="error",r.value=t}return r}function c(t){return t instanceof this?t:y.resolve(new this(n),t)}function f(t){var e=new this(n);return y.reject(e,t)}function l(t){function e(t,e){function n(t){i[e]=t,++d!==o||a||(a=!0,y.resolve(u,i))}r.resolve(t).then(n,function(t){a||(a=!0,y.reject(u,t))})}var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var o=t.length,a=!1;if(!o)return this.resolve([]);for(var i=new Array(o),d=0,s=-1,u=new this(n);++s<o;)e(t[s],s);return u}function v(t){function e(t){r.resolve(t).then(function(t){a||(a=!0,y.resolve(d,t))},function(t){a||(a=!0,y.reject(d,t))})}var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var o=t.length,a=!1;if(!o)return this.resolve([]);for(var i=-1,d=new this(n);++i<o;)e(t[i]);return d}var b=t(1),y={},h=["REJECTED"],p=["FULFILLED"],m=["PENDING"];e.exports=r=o,o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){if("function"!=typeof t&&this.state===p||"function"!=typeof e&&this.state===h)return this;var r=new this.constructor(n);if(this.state!==m){var o=this.state===p?t:e;i(r,o,this.outcome)}else this.queue.push(new a(r,t,e));return r},a.prototype.callFulfilled=function(t){y.resolve(this.promise,t)},a.prototype.otherCallFulfilled=function(t){i(this.promise,this.onFulfilled,t)},a.prototype.callRejected=function(t){y.reject(this.promise,t)},a.prototype.otherCallRejected=function(t){i(this.promise,this.onRejected,t)},y.resolve=function(t,e){var r=u(d,e);if("error"===r.status)return y.reject(t,r.value);var n=r.value;if(n)s(t,n);else{t.state=p,t.outcome=e;for(var o=-1,a=t.queue.length;++o<a;)t.queue[o].callFulfilled(e)}return t},y.reject=function(t,e){t.state=h,t.outcome=e;for(var r=-1,n=t.queue.length;++r<n;)t.queue[r].callRejected(e);return t},r.resolve=c,r.reject=f,r.all=l,r.race=v},{1:1}],3:[function(t,e,r){(function(e){"use strict";"function"!=typeof e.Promise&&(e.Promise=t(2))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(t,e,r){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(t){}}function a(){try{return!!at&&(!("undefined"!=typeof openDatabase&&"undefined"!=typeof navigator&&navigator.userAgent&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))&&(at&&"function"==typeof at.open&&"undefined"!=typeof IDBKeyRange))}catch(t){return!1}}function i(){return"function"==typeof openDatabase}function d(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&localStorage.setItem}catch(t){return!1}}function s(t,e){t=t||[],e=e||{};try{return new Blob(t,e)}catch(a){if("TypeError"!==a.name)throw a;for(var r="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,n=new r,o=0;o<t.length;o+=1)n.append(t[o]);return n.getBlob(e.type)}}function u(t,e){e&&t.then(function(t){e(null,t)},function(t){e(t)})}function c(t,e,r){"function"==typeof e&&t.then(e),"function"==typeof r&&t.catch(r)}function f(t){for(var e=t.length,r=new ArrayBuffer(e),n=new Uint8Array(r),o=0;o<e;o++)n[o]=t.charCodeAt(o);return r}function l(t){return new st(function(e){var r=s([""]);t.objectStore(ut).put(r,"key"),t.onabort=function(t){t.preventDefault(),t.stopPropagation(),e(!1)},t.oncomplete=function(){var t=navigator.userAgent.match(/Chrome\/(\d+)/),r=navigator.userAgent.match(/Edge\//);e(r||!t||parseInt(t[1],10)>=43)}}).catch(function(){return!1})}function v(t){return"boolean"==typeof it?st.resolve(it):l(t).then(function(t){return it=t})}function b(t){var e=dt[t.name],r={};r.promise=new st(function(t){r.resolve=t}),e.deferredOperations.push(r),e.dbReady?e.dbReady=e.dbReady.then(function(){return r.promise}):e.dbReady=r.promise}function y(t){var e=dt[t.name],r=e.deferredOperations.pop();r&&r.resolve()}function h(t,e){return new st(function(r,n){if(t.db){if(!e)return r(t.db);b(t),t.db.close()}var o=[t.name];e&&o.push(t.version);var a=at.open.apply(at,o);e&&(a.onupgradeneeded=function(e){var r=a.result;try{r.createObjectStore(t.storeName),e.oldVersion<=1&&r.createObjectStore(ut)}catch(r){if("ConstraintError"!==r.name)throw r;console.warn('The database "'+t.name+'" has been upgraded from version '+e.oldVersion+" to version "+e.newVersion+', but the storage "'+t.storeName+'" already exists.')}}),a.onerror=function(){n(a.error)},a.onsuccess=function(){r(a.result),y(t)}})}function p(t){return h(t,!1)}function m(t){return h(t,!0)}function g(t,e){if(!t.db)return!0;var r=!t.db.objectStoreNames.contains(t.storeName),n=t.version<t.db.version,o=t.version>t.db.version;if(n&&(t.version!==e&&console.warn('The database "'+t.name+"\" can't be downgraded from version "+t.db.version+" to version "+t.version+"."),t.version=t.db.version),o||r){if(r){var a=t.db.version+1;a>t.version&&(t.version=a)}return!0}return!1}function w(t){return new st(function(e,r){var n=new FileReader;n.onerror=r,n.onloadend=function(r){var n=btoa(r.target.result||"");e({__local_forage_encoded_blob:!0,data:n,type:t.type})},n.readAsBinaryString(t)})}function D(t){var e=f(atob(t.data));return s([e],{type:t.type})}function S(t){return t&&t.__local_forage_encoded_blob}function _(t){var e=this,r=e._initReady().then(function(){var t=dt[e._dbInfo.name];if(t&&t.dbReady)return t.dbReady});return c(r,t,t),r}function I(t){function e(){return st.resolve()}var r=this,n={db:null};if(t)for(var o in t)n[o]=t[o];dt||(dt={});var a=dt[n.name];a||(a={forages:[],db:null,dbReady:null,deferredOperations:[]},dt[n.name]=a),a.forages.push(r),r._initReady||(r._initReady=r.ready,r.ready=_);for(var i=[],d=0;d<a.forages.length;d++){var s=a.forages[d];s!==r&&i.push(s._initReady().catch(e))}var u=a.forages.slice(0);return st.all(i).then(function(){return n.db=a.db,p(n)}).then(function(t){return n.db=t,g(n,r._defaultConfig.version)?m(n):t}).then(function(t){n.db=a.db=t,r._dbInfo=n;for(var e=0;e<u.length;e++){var o=u[e];o!==r&&(o._dbInfo.db=n.db,o._dbInfo.version=n.version)}})}function T(t,e){var r=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var n=new st(function(e,n){r.ready().then(function(){var o=r._dbInfo,a=o.db.transaction(o.storeName,"readonly").objectStore(o.storeName),i=a.get(t);i.onsuccess=function(){var t=i.result;void 0===t&&(t=null),S(t)&&(t=D(t)),e(t)},i.onerror=function(){n(i.error)}}).catch(n)});return u(n,e),n}function E(t,e){var r=this,n=new st(function(e,n){r.ready().then(function(){var o=r._dbInfo,a=o.db.transaction(o.storeName,"readonly").objectStore(o.storeName),i=a.openCursor(),d=1;i.onsuccess=function(){var r=i.result;if(r){var n=r.value;S(n)&&(n=D(n));var o=t(n,r.key,d++);void 0!==o?e(o):r.continue()}else e()},i.onerror=function(){n(i.error)}}).catch(n)});return u(n,e),n}function O(t,e,r){var n=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var o=new st(function(r,o){var a;n.ready().then(function(){return a=n._dbInfo,"[object Blob]"===ct.call(e)?v(a.db).then(function(t){return t?e:w(e)}):e}).then(function(e){var n=a.db.transaction(a.storeName,"readwrite"),i=n.objectStore(a.storeName);null===e&&(e=void 0),n.oncomplete=function(){void 0===e&&(e=null),r(e)},n.onabort=n.onerror=function(){var t=d.error?d.error:d.transaction.error;o(t)};var d=i.put(e,t)}).catch(o)});return u(o,r),o}function L(t,e){var r=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var n=new st(function(e,n){r.ready().then(function(){var o=r._dbInfo,a=o.db.transaction(o.storeName,"readwrite"),i=a.objectStore(o.storeName),d=i.delete(t);a.oncomplete=function(){e()},a.onerror=function(){n(d.error)},a.onabort=function(){var t=d.error?d.error:d.transaction.error;n(t)}}).catch(n)});return u(n,e),n}function C(t){var e=this,r=new st(function(t,r){e.ready().then(function(){var n=e._dbInfo,o=n.db.transaction(n.storeName,"readwrite"),a=o.objectStore(n.storeName),i=a.clear();o.oncomplete=function(){t()},o.onabort=o.onerror=function(){var t=i.error?i.error:i.transaction.error;r(t)}}).catch(r)});return u(r,t),r}function A(t){var e=this,r=new st(function(t,r){e.ready().then(function(){var n=e._dbInfo,o=n.db.transaction(n.storeName,"readonly").objectStore(n.storeName),a=o.count();a.onsuccess=function(){t(a.result)},a.onerror=function(){r(a.error)}}).catch(r)});return u(r,t),r}function N(t,e){var r=this,n=new st(function(e,n){return t<0?void e(null):void r.ready().then(function(){var o=r._dbInfo,a=o.db.transaction(o.storeName,"readonly").objectStore(o.storeName),i=!1,d=a.openCursor();d.onsuccess=function(){var r=d.result;return r?void(0===t?e(r.key):i?e(r.key):(i=!0,r.advance(t))):void e(null)},d.onerror=function(){n(d.error)}}).catch(n)});return u(n,e),n}function j(t){var e=this,r=new st(function(t,r){e.ready().then(function(){var n=e._dbInfo,o=n.db.transaction(n.storeName,"readonly").objectStore(n.storeName),a=o.openCursor(),i=[];a.onsuccess=function(){var e=a.result;return e?(i.push(e.key),void e.continue()):void t(i)},a.onerror=function(){r(a.error)}}).catch(r)});return u(r,t),r}function k(t){var e,r,n,o,a,i=.75*t.length,d=t.length,s=0;"="===t[t.length-1]&&(i--,"="===t[t.length-2]&&i--);var u=new ArrayBuffer(i),c=new Uint8Array(u);for(e=0;e<d;e+=4)r=lt.indexOf(t[e]),n=lt.indexOf(t[e+1]),o=lt.indexOf(t[e+2]),a=lt.indexOf(t[e+3]),c[s++]=r<<2|n>>4,c[s++]=(15&n)<<4|o>>2,c[s++]=(3&o)<<6|63&a;return u}function R(t){var e,r=new Uint8Array(t),n="";for(e=0;e<r.length;e+=3)n+=lt[r[e]>>2],n+=lt[(3&r[e])<<4|r[e+1]>>4],n+=lt[(15&r[e+1])<<2|r[e+2]>>6],n+=lt[63&r[e+2]];return r.length%3===2?n=n.substring(0,n.length-1)+"=":r.length%3===1&&(n=n.substring(0,n.length-2)+"=="),n}function x(t,e){var r="";if(t&&(r=Ct.call(t)),t&&("[object ArrayBuffer]"===r||t.buffer&&"[object ArrayBuffer]"===Ct.call(t.buffer))){var n,o=yt;t instanceof ArrayBuffer?(n=t,o+=pt):(n=t.buffer,"[object Int8Array]"===r?o+=gt:"[object Uint8Array]"===r?o+=wt:"[object Uint8ClampedArray]"===r?o+=Dt:"[object Int16Array]"===r?o+=St:"[object Uint16Array]"===r?o+=It:"[object Int32Array]"===r?o+=_t:"[object Uint32Array]"===r?o+=Tt:"[object Float32Array]"===r?o+=Et:"[object Float64Array]"===r?o+=Ot:e(new Error("Failed to get type for BinaryArray"))),e(o+R(n))}else if("[object Blob]"===r){var a=new FileReader;a.onload=function(){var r=vt+t.type+"~"+R(this.result);e(yt+mt+r)},a.readAsArrayBuffer(t)}else try{e(JSON.stringify(t))}catch(r){console.error("Couldn't convert value into a JSON string: ",t),e(null,r)}}function B(t){if(t.substring(0,ht)!==yt)return JSON.parse(t);var e,r=t.substring(Lt),n=t.substring(ht,Lt);if(n===mt&&bt.test(r)){var o=r.match(bt);e=o[1],r=r.substring(o[0].length)}var a=k(r);switch(n){case pt:return a;case mt:return s([a],{type:e});case gt:return new Int8Array(a);case wt:return new Uint8Array(a);case Dt:return new Uint8ClampedArray(a);case St:return new Int16Array(a);case It:return new Uint16Array(a);case _t:return new Int32Array(a);case Tt:return new Uint32Array(a);case Et:return new Float32Array(a);case Ot:return new Float64Array(a);default:throw new Error("Unkown type: "+n)}}function M(t){var e=this,r={db:null};if(t)for(var n in t)r[n]="string"!=typeof t[n]?t[n].toString():t[n];var o=new st(function(t,n){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(t){return n(t)}r.db.transaction(function(o){o.executeSql("CREATE TABLE IF NOT EXISTS "+r.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){e._dbInfo=r,t()},function(t,e){n(e)})})});return r.serializer=At,o}function q(t,e){var r=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var n=new st(function(e,n){r.ready().then(function(){var o=r._dbInfo;o.db.transaction(function(r){r.executeSql("SELECT * FROM "+o.storeName+" WHERE key = ? LIMIT 1",[t],function(t,r){var n=r.rows.length?r.rows.item(0).value:null;n&&(n=o.serializer.deserialize(n)),e(n)},function(t,e){n(e)})})}).catch(n)});return u(n,e),n}function P(t,e){var r=this,n=new st(function(e,n){r.ready().then(function(){var o=r._dbInfo;o.db.transaction(function(r){r.executeSql("SELECT * FROM "+o.storeName,[],function(r,n){for(var a=n.rows,i=a.length,d=0;d<i;d++){var s=a.item(d),u=s.value;if(u&&(u=o.serializer.deserialize(u)),u=t(u,s.key,d+1),void 0!==u)return void e(u)}e()},function(t,e){n(e)})})}).catch(n)});return u(n,e),n}function F(t,e,r){var n=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var o=new st(function(r,o){n.ready().then(function(){void 0===e&&(e=null);var a=e,i=n._dbInfo;i.serializer.serialize(e,function(e,n){n?o(n):i.db.transaction(function(n){n.executeSql("INSERT OR REPLACE INTO "+i.storeName+" (key, value) VALUES (?, ?)",[t,e],function(){r(a)},function(t,e){o(e)})},function(t){t.code===t.QUOTA_ERR&&o(t)})})}).catch(o)});return u(o,r),o}function z(t,e){var r=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var n=new st(function(e,n){r.ready().then(function(){var o=r._dbInfo;o.db.transaction(function(r){r.executeSql("DELETE FROM "+o.storeName+" WHERE key = ?",[t],function(){e()},function(t,e){n(e)})})}).catch(n)});return u(n,e),n}function U(t){var e=this,r=new st(function(t,r){e.ready().then(function(){var n=e._dbInfo;n.db.transaction(function(e){e.executeSql("DELETE FROM "+n.storeName,[],function(){t()},function(t,e){r(e)})})}).catch(r)});return u(r,t),r}function H(t){var e=this,r=new st(function(t,r){e.ready().then(function(){var n=e._dbInfo;n.db.transaction(function(e){e.executeSql("SELECT COUNT(key) as c FROM "+n.storeName,[],function(e,r){var n=r.rows.item(0).c;t(n)},function(t,e){r(e)})})}).catch(r)});return u(r,t),r}function W(t,e){var r=this,n=new st(function(e,n){r.ready().then(function(){var o=r._dbInfo;o.db.transaction(function(r){r.executeSql("SELECT key FROM "+o.storeName+" WHERE id = ? LIMIT 1",[t+1],function(t,r){var n=r.rows.length?r.rows.item(0).key:null;e(n)},function(t,e){n(e)})})}).catch(n)});return u(n,e),n}function Q(t){var e=this,r=new st(function(t,r){e.ready().then(function(){var n=e._dbInfo;n.db.transaction(function(e){e.executeSql("SELECT key FROM "+n.storeName,[],function(e,r){for(var n=[],o=0;o<r.rows.length;o++)n.push(r.rows.item(o).key);t(n)},function(t,e){r(e)})})}).catch(r)});return u(r,t),r}function G(t){var e=this,r={};if(t)for(var n in t)r[n]=t[n];return r.keyPrefix=r.name+"/",r.storeName!==e._defaultConfig.storeName&&(r.keyPrefix+=r.storeName+"/"),e._dbInfo=r,r.serializer=At,st.resolve()}function X(t){var e=this,r=e.ready().then(function(){for(var t=e._dbInfo.keyPrefix,r=localStorage.length-1;r>=0;r--){var n=localStorage.key(r);0===n.indexOf(t)&&localStorage.removeItem(n)}});return u(r,t),r}function J(t,e){var r=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var n=r.ready().then(function(){var e=r._dbInfo,n=localStorage.getItem(e.keyPrefix+t);return n&&(n=e.serializer.deserialize(n)),n});return u(n,e),n}function V(t,e){var r=this,n=r.ready().then(function(){for(var e=r._dbInfo,n=e.keyPrefix,o=n.length,a=localStorage.length,i=1,d=0;d<a;d++){var s=localStorage.key(d);if(0===s.indexOf(n)){var u=localStorage.getItem(s);if(u&&(u=e.serializer.deserialize(u)),u=t(u,s.substring(o),i++),void 0!==u)return u}}});return u(n,e),n}function K(t,e){var r=this,n=r.ready().then(function(){var e,n=r._dbInfo;try{e=localStorage.key(t)}catch(t){e=null}return e&&(e=e.substring(n.keyPrefix.length)),e});return u(n,e),n}function Y(t){var e=this,r=e.ready().then(function(){for(var t=e._dbInfo,r=localStorage.length,n=[],o=0;o<r;o++)0===localStorage.key(o).indexOf(t.keyPrefix)&&n.push(localStorage.key(o).substring(t.keyPrefix.length));return n});return u(r,t),r}function Z(t){var e=this,r=e.keys().then(function(t){return t.length});return u(r,t),r}function $(t,e){var r=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var n=r.ready().then(function(){var e=r._dbInfo;localStorage.removeItem(e.keyPrefix+t)});return u(n,e),n}function tt(t,e,r){var n=this;"string"!=typeof t&&(console.warn(t+" used as a key, but it is not a string."),t=String(t));var o=n.ready().then(function(){void 0===e&&(e=null);var r=e;return new st(function(o,a){var i=n._dbInfo;i.serializer.serialize(e,function(e,n){if(n)a(n);else try{localStorage.setItem(i.keyPrefix+t,e),o(r)}catch(t){"QuotaExceededError"!==t.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==t.name||a(t),a(t)}})})});return u(o,r),o}function et(t,e){t[e]=function(){var r=arguments;return t.ready().then(function(){return t[e].apply(t,r)})}}function rt(){for(var t=1;t<arguments.length;t++){var e=arguments[t];if(e)for(var r in e)e.hasOwnProperty(r)&&(Pt(e[r])?arguments[0][r]=e[r].slice():arguments[0][r]=e[r])}return arguments[0]}function nt(t){for(var e in Rt)if(Rt.hasOwnProperty(e)&&Rt[e]===t)return!0;return!1}var ot="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},at=o();"undefined"==typeof Promise&&"undefined"!=typeof t&&t(3);var it,dt,st=Promise,ut="local-forage-detect-blob-support",ct=Object.prototype.toString,ft={_driver:"asyncStorage",_initStorage:I,iterate:E,getItem:T,setItem:O,removeItem:L,clear:C,length:A,key:N,keys:j},lt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",vt="~~local_forage_type~",bt=/^~~local_forage_type~([^~]+)~/,yt="__lfsc__:",ht=yt.length,pt="arbf",mt="blob",gt="si08",wt="ui08",Dt="uic8",St="si16",_t="si32",It="ur16",Tt="ui32",Et="fl32",Ot="fl64",Lt=ht+pt.length,Ct=Object.prototype.toString,At={serialize:x,deserialize:B,stringToBuffer:k,bufferToString:R},Nt={_driver:"webSQLStorage",_initStorage:M,iterate:P,getItem:q,setItem:F,removeItem:z,clear:U,length:H,key:W,keys:Q},jt={_driver:"localStorageWrapper",_initStorage:G,iterate:V,getItem:J,setItem:tt,removeItem:$,clear:X,length:Z,key:K,keys:Y},kt={},Rt={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},xt=[Rt.INDEXEDDB,Rt.WEBSQL,Rt.LOCALSTORAGE],Bt=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],Mt={description:"",driver:xt.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},qt={};qt[Rt.INDEXEDDB]=a(),qt[Rt.WEBSQL]=i(),qt[Rt.LOCALSTORAGE]=d();var Pt=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},Ft=function(){function t(e){n(this,t),this.INDEXEDDB=Rt.INDEXEDDB,this.LOCALSTORAGE=Rt.LOCALSTORAGE,this.WEBSQL=Rt.WEBSQL,this._defaultConfig=rt({},Mt),this._config=rt({},this._defaultConfig,e),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return t.prototype.config=function(t){if("object"===("undefined"==typeof t?"undefined":ot(t))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var e in t)"storeName"===e&&(t[e]=t[e].replace(/\W/g,"_")),this._config[e]=t[e];return"driver"in t&&t.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof t?this._config[t]:this._config},t.prototype.defineDriver=function(t,e,r){var n=new st(function(e,r){try{var n=t._driver,o=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),a=new Error("Custom driver name already in use: "+t._driver);if(!t._driver)return void r(o);if(nt(t._driver))return void r(a);for(var i=Bt.concat("_initStorage"),d=0;d<i.length;d++){var s=i[d];if(!s||!t[s]||"function"!=typeof t[s])return void r(o)}var u=st.resolve(!0);"_support"in t&&(u=t._support&&"function"==typeof t._support?t._support():st.resolve(!!t._support)),u.then(function(r){qt[n]=r,kt[n]=t,e()},r)}catch(t){r(t)}});return c(n,e,r),n},t.prototype.driver=function(){return this._driver||null},t.prototype.getDriver=function(t,e,r){var n=this,o=st.resolve().then(function(){if(!nt(t)){if(kt[t])return kt[t];throw new Error("Driver not found.")}switch(t){case n.INDEXEDDB:return ft;case n.LOCALSTORAGE:return jt;case n.WEBSQL:return Nt}});return c(o,e,r),o},t.prototype.getSerializer=function(t){var e=st.resolve(At);return c(e,t),e},t.prototype.ready=function(t){var e=this,r=e._driverSet.then(function(){return null===e._ready&&(e._ready=e._initDriver()),e._ready});return c(r,t,t),r},t.prototype.setDriver=function(t,e,r){function n(){a._config.driver=a.driver()}function o(t){return function(){function e(){for(;r<t.length;){var o=t[r];return r++,a._dbInfo=null,a._ready=null,a.getDriver(o).then(function(t){return a._extend(t),n(),a._ready=a._initStorage(a._config),a._ready}).catch(e)}n();var i=new Error("No available storage method found.");return a._driverSet=st.reject(i),a._driverSet}var r=0;return e()}}var a=this;Pt(t)||(t=[t]);var i=this._getSupportedDrivers(t),d=null!==this._driverSet?this._driverSet.catch(function(){return st.resolve()}):st.resolve();return this._driverSet=d.then(function(){var t=i[0];return a._dbInfo=null,a._ready=null,a.getDriver(t).then(function(t){a._driver=t._driver,n(),a._wrapLibraryMethodsWithReady(),a._initDriver=o(i)})}).catch(function(){n();var t=new Error("No available storage method found.");return a._driverSet=st.reject(t),a._driverSet}),c(this._driverSet,e,r),this._driverSet},t.prototype.supports=function(t){return!!qt[t]},t.prototype._extend=function(t){rt(this,t)},t.prototype._getSupportedDrivers=function(t){for(var e=[],r=0,n=t.length;r<n;r++){var o=t[r];this.supports(o)&&e.push(o)}return e},t.prototype._wrapLibraryMethodsWithReady=function(){for(var t=0;t<Bt.length;t++)et(this,Bt[t])},t.prototype.createInstance=function(e){return new t(e)},t}(),zt=new Ft;e.exports=zt},{3:3}]},{},[4])(4)});var app=function(){"use strict";function t(t){"loading"!=document.readyState?t():document.addEventListener("DOMContentLoaded",t)}function e(t){console.log(t)}function r(){var t=n(),e=[];e=Array.from(p.storedData.dateOpened),o(t,e)===!0?p.addDay===!0?p.storedData.newDay=!0:p.storedData.newDay=!1:p.storedData.newDay=!0}function n(){var t=[],e=(new Date).getDate(),r=(new Date).getMonth();return t.push([e,r]),t}function o(t,e){return JSON.stringify(t)==JSON.stringify(e)}function a(){document.querySelector(".reset").addEventListener("click",function(t){t.preventDefault,localforage.clear(),e("APP RESET")})}function i(t,e){for(var r=function(r){t[r].addEventListener("click",function(){e(r)})},n=0;n<t.length;n++)r(n)}function d(t){var e=Object.keys(t),r=e[e.length*Math.random()<<0];return r}var s={terms:{verb_1:{term:"verb_1",definition:"ans_1",support:"<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>"},verb_2:{term:"verb_2",definition:"ans_2",support:"<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>"},verb_3:{term:"verb_3",definition:"ans_3",support:"<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>"},verb_4:{term:"verb_4",definition:"ans_4",support:"<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>"},verb_5:{term:"verb_5",definition:"ans_5",support:"<div><p>Present</p><table><tbody><tr><td>io</td><td>abbandono</td></tr><tr><td>tu</td><td>abbandoni</td></tr><tr><td>lui/lei</td><td>abbandona</td></tr><tr><td>noi</td><td>abbandoniamo</td></tr><tr><td>voi</td><td>abbandonate</td></tr><tr><td>loro</td><td>abbandonano</td></tr></tbody></table></div><div><p>Imperfect</p><table><tbody><tr><td>io</td><td>abbandonavo</td></tr><tr><td>tu</td><td>abbandonavi</td></tr><tr><td>lui/lei</td><td>abbandonava</td></tr><tr><td>noi</td><td>abbandonavamo</td></tr><tr><td>voi</td><td>abbandonavate</td></tr><tr><td>loro</td><td>abbandonavano</td></tr></tbody></table></div>"}}},u=function(){var t=0,e=0,r=[],n=[],o=Object.keys(s.terms).length;if(p.displayedTerms>o&&(p.displayedTerms=o),void 0===p.storedData.firstTime)for(;t<p.displayedTerms;){var a=d(s.terms);r.includes(a)||(r.push(a),t++)}else for(;t<p.displayedTerms;){var i=Object.keys(p.storedData.viewedTerms).length;if(i===o){var u=[];for(var c in p.storedData.viewedTerms)u.push([c,p.storedData.viewedTerms[c]]);for(u.sort(function(t,e){return t[1]-e[1]});t<p.displayedTerms;)r.push(u[t][0]),t++;t++}else{var f=d(s.terms);n.includes(f)||(n.push(f),p.storedData.viewedTerms.hasOwnProperty(f)||(r.push(f),p.storedData.viewedTerms[f]=0,localforage.setItem("ops.storedData",p.storedData),t++))}e>1e4&&(t=p.displayedTerms),e++}return r},c=function(t,e,r){var n=p.storedData[t]||{};if(p.storedData.hasOwnProperty(t)){var o=!0,a=!1,i=void 0;try{for(var d,s=e[Symbol.iterator]();!(o=(d=s.next()).done);o=!0){var u=d.value;if(p.storedData[t].hasOwnProperty(u)){var c=p.storedData[t][u];c+=1,n[u]=c}else n[e]=r}}catch(t){a=!0,i=t}finally{try{!o&&s.return&&s.return()}finally{if(a)throw i}}}else{var f=!0,l=!1,v=void 0;try{for(var b,y=e[Symbol.iterator]();!(f=(b=y.next()).done);f=!0){var h=b.value;n[h]=r}}catch(t){l=!0,v=t}finally{try{!f&&y.return&&y.return()}finally{if(l)throw v}}}return n},f=function(){var t=document.querySelectorAll(".reveal");i(t,function(e){if(t[e].classList.contains("disabled"))return!1;var r=[t[e].parentNode.querySelector(".term-holder").innerHTML],n=t[e].parentNode.querySelector(".term-views"),o=t[e].parentNode.querySelector(".definition-wrapper"),a=(t[e].parentNode.querySelector(".definition-holder"),parseInt(n.innerHTML));o.classList.remove("hidden"),n.innerHTML=a+1;var i=c("revealedTermCount",r,1);p.storedData.revealedTermCount=i,l(t[e]),localforage.setItem("ops.storedData",p.storedData)})},l=function(t){function e(){var t=(new Date).getTime();i=p.storedData.revealCountdowns[n].startTime,d=p.storedData.revealCountdowns[n].timerEnded;var e=Math.floor((t-i)/1e3),r=60*p.counterMins+o;return e>=r&&(d=!0),d===!0?(localforage.setItem("ops.storedData",p.storedData),!1):void(a=r-e)}function r(){var e=Math.floor(a/60),r=a%60,o="";return 0===a?(t.innerHTML="Reveal",t.classList.remove("disabled"),t.disabled=!1,clearInterval(p.storedData.revealCountdowns[n].timerUpdate),delete p.storedData.revealCountdowns[n],!1):(r<10&&r>=0&&(o="0"),60===a&&(r="00"),t.innerHTML=e+":"+o+r,t.classList.add("disabled"),t.setAttribute("disabled",!0),void(a-=1))}void 0===p.storedData.revealCountdowns&&(p.storedData.revealCountdowns={});var n=[t.parentNode.querySelector(".term-holder").innerHTML],o=(p.counterMins,p.counterSecs),a=void 0,i=void 0,d=void 0;void 0===p.storedData.revealCountdowns[n]?(i=(new Date).getTime(),p.storedData.revealCountdowns[n]={startTime:i,timerEnded:!1},e()):e(),localforage.setItem("ops.storedData",p.storedData);var s=0;d===!1&&(p.storedData.revealCountdowns[n].timerUpdate=setInterval(function(){s+=1,s%5===0&&e(),r()},1e3))},v=function(t){var e="",r=!0,n=!1,o=void 0;try{for(var a,i=t[Symbol.iterator]();!(r=(a=i.next()).done);r=!0){var d=a.value,u=s.terms[d].term,c=s.terms[d].definition,f=s.terms[d].support,v=void 0;
v=void 0===p.storedData.revealedTermCount?0:p.storedData.revealedTermCount[d]||0;var b='<div class="term-wrapper">\n                <p class="term-holder">'+u+'</p>\n                <div class="definition-wrapper hidden">\n                    <p class="definition-holder">'+c+'</p>\n                    <div class="support-wrapper">'+f+'</div>\n                </div>\n                <p class="term-views">'+v+'</p>\n                <button class="reveal">Reveal definition</button>\n            </div>';e+=b}}catch(t){n=!0,o=t}finally{try{!r&&i.return&&i.return()}finally{if(n)throw o}}p.container.innerHTML=e;var y=!0,h=!1,m=void 0;try{for(var g,w=t[Symbol.iterator]();!(y=(g=w.next()).done);y=!0){var D=g.value;if(void 0!==p.storedData.revealCountdowns&&void 0!==p.storedData.revealCountdowns[D])for(var S=document.querySelectorAll(".reveal"),_=0;_<S.length;_++){var I=S[_].parentNode.querySelector(".term-holder").innerHTML;I===D&&l(S[_])}}}catch(t){h=!0,m=t}finally{try{!y&&w.return&&w.return()}finally{if(h)throw m}}},b=function(){if(p.storedData.newDay===!0){var t=document.querySelector(".hearts"),e="";void 0===p.storedData.hearts&&(p.storedData.hearts=p.points.hearts);for(var r=p.storedData.hearts,n=0;n<r;n++)e+="<p>❤</p>";t.innerHTML=e,localforage.setItem("ops.storedData",p.storedData)}},y=function(){var t=document.querySelector(".score-holder");void 0===p.storedData.score&&(p.storedData.score=0);var e=p.storedData.score;t.innerHTML=e},h=function(){function t(){function t(){a.classList.add("hidden"),u.innerHTML='Well done, the definition for <strong>"'+r+'"</strong> is <strong>"'+v+'"</strong>',l+=p.points.correct,c.innerHTML=l,p.storedData.score=l,p.storedData.correctTerms[r]=v,Object.keys(p.storedData.correctTerms).length===Object.keys(s.terms).length&&(p.storedData.gameWon=!0,o()),localforage.setItem("ops.storedData",p.storedData)}function n(){var t=document.querySelector(".query-input");u.innerHTML="Try again.",t.placeholder=t.value,t.value="",f.removeChild(f.getElementsByTagName("p")[0]),y+=1,y===b&&(a.classList.add("hidden"),f.classList.add("hidden"),u.innerHTML="Sorry you lose.",p.storedData.incorrectTerms[r]=v,localforage.setItem("ops.storedData",p.storedData))}function o(){e("game won")}var a=document.querySelector(".query-wrapper"),i=document.querySelector(".query-holder"),d=document.querySelector(".query-submit"),u=document.querySelector(".result-holder"),c=document.querySelector(".score-holder"),f=document.querySelector(".hearts"),l=parseInt(c.innerHTML),v=s.terms[r].definition,b=p.storedData.hearts,y=0;a.classList.remove("hidden"),i.innerHTML=r,d.addEventListener("click",function(){var e=document.querySelector(".query-input").value;e===v||e.toUpperCase()===v.toUpperCase()?t():""===e?u.innerHTML="Enter a definition.":n()})}void 0===p.storedData.queryTerms&&(p.storedData.queryTerms={});var r=void 0,n=0;for(void 0===p.storedData.correctTerms&&(p.storedData.correctTerms={}),void 0===p.storedData.incorrectTerms&&(p.storedData.incorrectTerms={});n<Object.keys(p.storedData.revealedTermCount).length;){if(r=d(p.storedData.revealedTermCount),!p.storedData.correctTerms.hasOwnProperty(r)){t();break}n++}},p={displayedTerms:3,counterMins:60,counterSecs:0,container:document.querySelector(".terms-wrapper"),addDay:!0,debug:!0,points:{correct:50,hearts:3},storedData:{}};t(function(){m(),a()});var m=function(){localforage.length().then(function(t){0===t?g():(p.storedData.firstTime=!1,w())}).catch(function(t){console.log(t)})},g=function(){D(),p.storedData.firstTime=!1,localforage.setItem("ops.storedData",p.storedData)},w=function(){function t(t){p.storedData=t,r(),D()}localforage.getItem("ops.storedData").then(function(e){t(e)}).catch(function(t){console.log(t)})},D=function(){var t=void 0;t=p.storedData.newDay===!1?p.storedData.dailyTerms:u(),v(t),b(),y(),p.storedData.dateOpened=n(),p.storedData.dailyTerms=t,p.storedData.viewedTerms=c("viewedTerms",t,0),localforage.setItem("ops.storedData",p.storedData),f(),void 0!==p.storedData.revealedTermCount&&p.storedData.newDay===!0&&h(),p.debug===!0&&(e(p.storedData),e("Revealed terms count:"),e(p.storedData.revealedTermCount),e("Viewed terms count:"),e(p.storedData.viewedTerms),e("Revealed terms timer:"),e(p.storedData.revealCountdowns))};return p}();
//# sourceMappingURL=script-f39b165ec7.js.map
