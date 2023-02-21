/*! For license information please see main.5d1e625460c874ca8a93.js.LICENSE.txt */
!function(){var t={606:function(){document.addEventListener("mouseover",(function(t){var e=document.querySelector('.selected[data-difficult="nightmare"]'),r=t.target;if(window.matchMedia("(any-hover: hover)").matches&&!window.matchMedia("(max-width: 480px)").matches&&r.getAttribute("data-tooltip")){var n=document.createElement("div"),o=r.getAttribute("data-tooltip");n.className="tooltip",n.setAttribute("data-color","recolor"),e&&n.classList.add("nightmare"),n.innerHTML=o,document.body.append(n);var i=r.getBoundingClientRect(),a=i.left+(r.offsetWidth-n.offsetWidth)/2;a<0&&(a=0);var c=i.top-n.offsetHeight-5;c<0&&(c=i.top+r.offsetHeight+5),n.style.left=a+"px",n.style.top=c+"px",r.addEventListener("mouseout",(function(){n.remove()}))}}))}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}!function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){e=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof d?e:d,i=Object.create(o.prototype),a=new O(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=l;var h={};function d(){}function p(){}function y(){}var v={};s(v,a,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(k([])));g&&g!==n&&o.call(g,a)&&(v=g);var w=y.prototype=d.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function x(e,r){function n(i,a,c,u){var s=f(e[i],e,a);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"==t(h)&&o.call(h,"__await")?r.resolve(h.__await).then((function(t){n("next",t,c,u)}),(function(t){n("throw",t,c,u)})):r.resolve(h).then((function(t){l.value=t,c(l)}),(function(t){return n("throw",t,c,u)}))}u(s.arg)}var i;this._invoke=function(t,e){function o(){return new r((function(r,o){n(t,e,r,o)}))}return i=i?i.then(o,o):o()}}function L(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function k(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:j}}function j(){return{value:void 0,done:!0}}return p.prototype=y,s(w,"constructor",y),s(y,"constructor",p),p.displayName=s(y,u,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,u,"GeneratorFunction")),t.prototype=Object.create(w),t},r.awrap=function(t){return{__await:t}},b(x.prototype),s(x.prototype,c,(function(){return this})),r.AsyncIterator=x,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new x(l(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(w),s(w,u,"Generator"),s(w,a,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},r.values=k,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},r}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function c(t){o(a,n,i,c,u,"next",t)}function u(t){o(a,n,i,c,u,"throw",t)}c(void 0)}))}}var a,c=document.querySelector(".overlay");function u(){return(u=i(e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p("getAimSettings",null,"GET");case 2:a=t.sent;case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function s(t){return new Date(t).toLocaleString("ru-RU").split(",")[0]}function l(t,e){t.innerHTML="";var r,o=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){u=!0,a=t},f:function(){try{c||null==r.return||r.return()}finally{if(u)throw a}}}}(e);try{for(o.s();!(r=o.n()).done;){var i=r.value,a=document.createElement("tr");if(null!=i&&i.player&&i.player.length){var c=document.createElement("td");c.innerHTML=i.player,a.append(c)}var u=document.createElement("td");u.innerHTML="".concat(i.score),a.append(u);var l=document.createElement("td");l.innerHTML=s(i.date),a.append(l),t.append(a)}}catch(t){o.e(t)}finally{o.f()}}function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{date:Date.now(),score:t,player:e}}function h(t,e){return Math.round(Math.random()*(e-t)+t)}function d(){var t=h(0,255),e=h(0,255),r=h(0,255);return"rgb(".concat(t,", ").concat(e,", ").concat(r,")")}function p(t,e){return y.apply(this,arguments)}function y(){return y=i(e().mark((function t(r,n){var o,i,a,c=arguments;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o=c.length>2&&void 0!==c[2]?c[2]:"POST",""===n&&(n={}),i="POST"===o?JSON.stringify(n):null,t.next=5,fetch("https://englishspace-1-g1233964.deta.app/".concat(r),{headers:{"Content-Type":"application/json"},method:o,body:i});case 5:if(!(a=t.sent).ok){t.next=12;break}return t.next=9,a.json();case 9:return t.abrupt("return",t.sent);case 12:return t.abrupt("return",!1);case 13:case"end":return t.stop()}}),t)}))),y.apply(this,arguments)}function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(t,e){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},m(t,e)}function g(t,e){if(e&&("object"===v(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function w(t){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},w(t)}function b(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function x(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function L(t,e,r){return e&&x(t.prototype,e),r&&x(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}var S,E,O=function(){function t(e,r){var n,o;b(this,t),o=[],(n="colors")in this?Object.defineProperty(this,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[n]=o,this.radius=function(t){var e=a.findIndex((function(e){return e.difficult===t}));return h(a[e].min,a[e].max)}(e),this.context=r.getContext("2d");var i=r.getBoundingClientRect(),c=i.width,u=i.height;if(this.x=h(this.radius,c-this.radius),this.y=h(this.radius,u-this.radius),"nightmare"!==e){var s=this.createGradient();this.offset=s.offset,this.colors=s.array}this.draw=this.draw.bind(this)}return L(t,[{key:"createGradient",value:function(){for(var t=h(2,Math.round(this.radius/5))+2,e=[],r=1/(t-1),n=0,o=0;o<t;o++)e.push({color:d(),position:Math.round(100*n)/100}),n+=r;return{array:e,offset:r}}},{key:"draw",value:function(){var t,e;if(null!==(t=this.colors)&&void 0!==t&&t.length){var r=this.context.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);this.colors.forEach((function(t){var e=t.color,n=t.position;return r.addColorStop(n,e)})),this.context.fillStyle=r}else this.context.fillStyle="rgb(111,0,0)";this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI),this.context.fill(),this.context.closePath(),null!==(e=this.colors)&&void 0!==e&&e.length&&this.update()}},{key:"update",value:function(){for(var t=this.colors.length,e=0;e<t;e++)0===e&&this.colors[e+1].position-this.colors[e].position<this.offset||(this.colors[e].position=Math.round(100*(this.colors[e].position+.01))/100);this.colors[t-1].position>=1&&(this.colors[t-1].position=1),this.colors[t-2].position>=1&&this.colors.length--,this.colors[0].position>0&&this.colors.unshift({color:d(),position:0})}},{key:"getInfo",value:function(){return{x:this.x,y:this.y,radius:this.radius,class:"Circle"}}}]),t}(),k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&m(t,e)}(o,t);var e,r,n=(e=o,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,n=w(e);if(r){var o=w(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return g(this,t)});function o(t,e,r,i,a){var c;b(this,o),c=n.call(this,a,t);var u=h(0,360)*(Math.PI/180);return c.radius=i/4,c.color=d(),c.x=i/2*Math.cos(u)+e,c.y=-i/2*Math.sin(u)+r,c.deltaX=1.5*i*Math.cos(u)/100,c.deltaY=-1.5*i*Math.sin(u)/100,c.deltaRadius=-c.radius/100,c}return L(o,[{key:"draw",value:function(){this.context.beginPath(),this.context.fillStyle=this.color,this.context.arc(this.x,this.y,this.radius,0,2*Math.PI),this.context.fill(),this.context.closePath(),this.update()}},{key:"update",value:function(){this.x+=this.deltaX,this.y+=this.deltaY,this.radius+=this.deltaRadius}},{key:"getInfo",value:function(){return{x:this.x,y:this.y,radius:this.radius,class:"Mini-Circle"}}}]),o}(O),j=document.querySelector(".top-record"),_=document.querySelector(".local-games").querySelector("tbody");function q(){var t,e,r;P(),r=window.localStorage.getItem("topRecord"),E=JSON.parse(r),document.querySelector(".local-games-full").classList.toggle("hide",!(null!==(t=E)&&void 0!==t&&t.date)),document.querySelector(".local-games-empty").classList.toggle("hide",Boolean(null===(e=E)||void 0===e?void 0:e.date)),E&&(j.querySelector(".top-score").innerHTML="".concat(E.score),j.querySelector(".top-date").innerHTML=s(E.date),l(_,S))}function P(){var t=window.localStorage.getItem("lastGames");S=JSON.parse(t)||[]}function T(t){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(t)}function A(){A=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=b(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var l={};function f(){}function h(){}function d(){}var p={};c(p,o,(function(){return this}));var y=Object.getPrototypeOf,v=y&&y(y(E([])));v&&v!==e&&r.call(v,o)&&(p=v);var m=d.prototype=f.prototype=Object.create(p);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(o,i,a,c){var u=s(t[o],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==T(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:O}}function O(){return{value:void 0,done:!0}}return h.prototype=d,c(m,"constructor",d),c(d,"constructor",h),h.displayName=c(d,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(w.prototype),c(w.prototype,i,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),c(m,a,"Generator"),c(m,o,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function M(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function N(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){M(i,n,o,a,c,"next",t)}function c(t){M(i,n,o,a,c,"throw",t)}a(void 0)}))}}q();var I,G,F,R,C=document.querySelector(".global-games.statistic-board").querySelector("tbody"),H=document.querySelector(".congratulation.screen-popup"),B=H.querySelector(".top-name"),Y=H.querySelector(".info"),D=H.querySelector(".refusal"),J=H.querySelector(".waiting"),W=H.querySelector(".done"),X=H.querySelector(".place"),K=document.querySelector(".bucket");function U(t){return $.apply(this,arguments)}function $(){return($=N(A().mark((function t(e){var r;return A().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=f(F,e),t.next=3,p("setAimPlace",{record:r});case 3:return t.next=5,Q();case 5:W.style.display="block",J.style.display="none",setTimeout(z,1e3);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function z(){c.classList.remove("open"),H.classList.remove("open"),H.addEventListener("transitionend",(function(){D.style.display="none",W.style.display="none",Y.style.display="block"}))}function Q(){return V.apply(this,arguments)}function V(){return(V=N(A().mark((function t(){return A().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p("getAimStatistic",null,"GET");case 2:R=t.sent,l(C,R);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Z(){return(Z=N(A().mark((function t(e){var r,n,o;return A().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=K.value,n=e.target,!(r.length>0)){t.next=4;break}return t.abrupt("return");case 4:if(n.classList.contains("agree-btn")){t.next=6;break}return t.abrupt("return");case 6:if(I="true"===n.getAttribute("data-agree"),o=B.value.trim(),!(I&&o.length>0)){t.next=15;break}return Y.style.display="none",J.style.display="block",t.next=13,U(o);case 13:t.next=18;break;case 15:setTimeout(z,1e3),Y.style.display="none",D.style.display="block";case 18:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function tt(t){return tt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},tt(t)}function et(){et=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=b(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var l={};function f(){}function h(){}function d(){}var p={};c(p,o,(function(){return this}));var y=Object.getPrototypeOf,v=y&&y(y(E([])));v&&v!==e&&r.call(v,o)&&(p=v);var m=d.prototype=f.prototype=Object.create(p);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(o,i,a,c){var u=s(t[o],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==tt(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:O}}function O(){return{value:void 0,done:!0}}return h.prototype=d,c(m,"constructor",d),c(d,"constructor",h),h.displayName=c(d,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(w.prototype),c(w.prototype,i,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(u(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),c(m,a,"Generator"),c(m,o,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function rt(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function nt(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}B.addEventListener("input",(function(){var t=B.value.trim();H.querySelector('.agree-btn[data-agree="true"]').classList.toggle("disabled",0===t.length)})),H.addEventListener("click",(function(t){return Z.apply(this,arguments)})),document.addEventListener("DOMContentLoaded",Q);var ot,it,at,ct,ut=function(){function t(e){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),(r="duration")in this?Object.defineProperty(this,r,{value:1e3,enumerable:!0,configurable:!0,writable:!0}):this[r]=1e3,this.board=e,this.context=this.board.getContext("2d"),this.draw=this.draw.bind(this)}var e,r,n,o;return e=t,r=[{key:"start",value:(n=et().mark((function t(){var e,r;return et().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=0,r=["3","2","1","GO!"];case 2:if(!(e<r.length)){t.next=10;break}return this.text=r[e],this.startTimestamp=performance.now(),t.next=7,this.animate();case 7:e++,t.next=2;break;case 10:case"end":return t.stop()}}),t,this)})),o=function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function a(t){rt(i,r,o,a,c,"next",t)}function c(t){rt(i,r,o,a,c,"throw",t)}a(void 0)}))},function(){return o.apply(this,arguments)})},{key:"animate",value:function(){return this.opacity=1,this.scale=0,this.process=0,this.id=window.requestAnimationFrame(this.draw),new Promise((function(t){return setTimeout((function(){return t(1)}),1e3)}))}},{key:"draw",value:function(){this.context.textBaseline="middle",this.context.textAlign="center",this.context.clearRect(0,0,this.board.width,this.board.height),this.context.font="".concat(5*this.scale,"rem Khula sans-serif"),this.context.fillStyle="rgba(255,255,255,".concat(this.opacity,")"),this.context.fillText(this.text,this.board.width/2,this.board.height/2),this.process=100*(performance.now()-this.startTimestamp)/this.duration,this.process<100/3&&(this.scale=this.process/11),this.process>=100/3&&this.process<=200/3&&(this.opacity=33/this.process),this.process>200/3&&(this.scale=50-47/34*(100-this.process),this.opacity=1-this.process/100),this.process<100?window.requestAnimationFrame(this.draw):(this.context.clearRect(0,0,this.board.width,this.board.height),window.cancelAnimationFrame(this.id))}}],r&&nt(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),st=document.querySelector(".start"),lt=document.querySelectorAll(".screen"),ft=document.querySelector(".settings"),ht=document.querySelector("#time"),dt=document.querySelector("#board"),pt=document.querySelector(".screen-popup.warning"),yt=dt.getContext("2d"),vt=0,mt=[];function gt(t,e){lt[e].classList.toggle("current"),lt[e].classList.toggle("down"),lt[e].addEventListener("transitionend",(function(){lt[e].classList.toggle("down")})),lt[t].classList.toggle("current")}function wt(){var t=new O(it,dt);mt.push(t),"nightmare"===it&&(window.clearTimeout(ct),ct=window.setTimeout((function(){mt=mt.filter((function(t){return"MiniCircles"===t.constructor.name})),wt()}),1500))}function bt(){var t,e;mt=[],yt.clearRect(0,0,dt.width,dt.height);var r=dt.getBoundingClientRect();dt.width=r.width,dt.height=r.height,it=null===(t=document.querySelector(".difficult-btn.selected"))||void 0===t?void 0:t.getAttribute("data-difficult"),ot=+(null===(e=document.querySelector(".time-btn.selected"))||void 0===e?void 0:e.getAttribute("data-time")),ht.parentNode.classList.remove("hide"),new ut(dt).start().then((function(){St(ot),wt(),requestAnimationFrame(xt),at=window.setInterval(Lt,1e3)}))}function xt(){mt.length&&requestAnimationFrame(xt),yt.clearRect(0,0,dt.width,dt.height),mt=mt.filter((function(t){return t.draw(),t.getInfo().radius>0}))}function Lt(){ot?St(--ot):function(){var t;clearInterval(at),mt=null,yt.clearRect(0,0,dt.width,dt.height),ht.parentNode.classList.add("hide"),setTimeout(Et,0);var e=+(null===(t=document.querySelector(".time-btn.selected"))||void 0===t?void 0:t.getAttribute("data-time")),r=function(t,e,r){var n=+(t/(r=Math.floor(r/10))).toFixed(4),o=a.findIndex((function(t){return t.difficult===e}));return+(n*a[o].coefficient).toFixed(2)}(vt,it,e);(function(t){var e=f(t);!function(t){for(P(),S.push(t);S.length>10;)S.shift();window.localStorage.setItem("lastGames",JSON.stringify(S))}(e),function(t){var e;(null===(e=E)||void 0===e||!e.score||E.score<t.score)&&(E=t,window.localStorage.setItem("topRecord",JSON.stringify(E)))}(e)})(r),function(t){var e;0!==R.length&&(F=t,(G=R.findIndex((function(t){return t.score<F})))>-1&&(e=G+1,X.innerHTML="".concat(e),c.classList.add("open"),H.classList.add("open")))}(r),setTimeout((function(){gt(1,2)}),1500)}()}function St(t){var e="".concat(Math.floor(t/60)).padStart(2,"0"),r="".concat(Math.floor(t%60)).padStart(2,"0");ht.innerHTML="".concat(e,":").concat(r)}function Et(){yt.clearRect(0,0,dt.width,dt.height),yt.textBaseline="middle",yt.textAlign="center";var t=7;window.matchMedia("screen and (max-width: 768px)").matches&&(t=4),yt.font="".concat(t,"rem Khula sans-serif"),yt.fillStyle="#16D9E3";var e="Счет: ".concat(vt);yt.fillText(e,dt.width/2,dt.height/2)}function Ot(){var t=document.querySelector(".bg-default"),e=document.querySelector(".bg-nightmare");t.classList.add("hide"),e.classList.remove("hide"),document.querySelectorAll('[data-color="recolor"]').forEach((function(t){t.classList.toggle("nightmare")}))}window.onload=function(){return u.apply(this,arguments)},st.addEventListener("click",(function(t){t.preventDefault(),gt(1,0)})),ft.addEventListener("click",(function(t){var e,r,n=t.target;n.classList.contains("difficult-btn")&&(ft.querySelectorAll(".difficult-btn").forEach((function(t){return t.classList.remove("selected")})),n.classList.add("selected"),"nightmare"===n.getAttribute("data-difficult")&&("true"!==window.localStorage.getItem("agreementWithNightmare")?(c.classList.add("open"),pt.classList.add("open")):Ot()),"nightmare"!==n.getAttribute("data-difficult")&&(e=document.querySelector(".bg-default"),r=document.querySelector(".bg-nightmare"),e.classList.remove("hide"),r.classList.add("hide"),document.querySelectorAll('.nightmare[data-color="recolor"]').forEach((function(t){t.classList.toggle("nightmare")})))),n.classList.contains("time-btn")&&(ft.querySelectorAll(".time-btn").forEach((function(t){return t.classList.remove("selected")})),n.classList.add("selected")),n.classList.contains("start-btn")&&(vt=0,gt(2,1),setTimeout(bt,1e3))})),dt.addEventListener("pointerdown",(function(t){if(mt.length){var e=mt.findIndex((function(t){return"Circle"===t.getInfo().class})),r=mt[e],n=dt.getBoundingClientRect(),o=n.left,i=n.top;if(function(t,e){var r=e.getInfo(),n=r.x,o=r.y,i=r.radius;return Math.pow(t.x-n,2)+Math.pow(t.y-o,2)<=Math.pow(i,2)}({x:t.clientX-o,y:t.clientY-i},r)){vt++,mt.splice(e,1);var c=r.getInfo(),u=c.x,s=c.y,l=c.radius;if("nightmare"!==it){var f=a.find((function(t){return t.difficult===it})),d=f.min,p=f.max;p=Math.round(p/3);for(var y=h(d=Math.round(d/3),p),v=0;v<=y;v++){var m=new k(dt,u,s,l,it);mt.push(m)}}wt()}}})),document.querySelector(".warning-btn").addEventListener("click",(function(){c.classList.remove("open"),pt.classList.remove("open"),window.localStorage.setItem("agreementWithNightmare","true"),Ot()})),document.addEventListener("click",(function(t){var e=t.target;if(e.classList.contains("screen-popup")&&e.classList.contains("open")){e.classList.remove("open");var r=e.querySelector(".ledge")||null;c.classList.remove("open"),r&&r.classList.remove("hide")}}));var kt=document.querySelector(".tabs"),jt=document.querySelectorAll(".statistic-info "),_t=document.querySelector(".close-statistic"),qt=document.querySelector(".ledge"),Pt=document.querySelector(".screen-popup.statistic");kt.addEventListener("click",(function(t){t.target.closest(".tab-item")&&(Array.from(kt.children).forEach((function(t){return t.classList.toggle("open")})),jt.forEach((function(t){return t.classList.toggle("open")})))})),_t.addEventListener("click",(function(){qt.classList.remove("hide"),Pt.classList.remove("open"),c.classList.remove("open")})),qt.addEventListener("click",(function(){qt.classList.add("hide"),Pt.classList.add("open"),c.classList.add("open"),q()})),r(606)}()}();