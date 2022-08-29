/*! For license information please see main.be6574868e0480bb4ed5.js.LICENSE.txt */
!function(){var t,e={606:function(){document.addEventListener("mouseover",(function(t){var e=t.target;if(window.matchMedia("(any-hover: hover)").matches&&!window.matchMedia("(max-width: 480px)").matches&&e.getAttribute("data-tooltip")){var r=document.createElement("div"),n=e.getAttribute("data-tooltip");r.className="tooltip",r.innerHTML=n,document.body.append(r);var o=e.getBoundingClientRect(),i=o.left+(e.offsetWidth-r.offsetWidth)/2;i<0&&(i=0);var a=o.top-r.offsetHeight-5;a<0&&(a=o.top+e.offsetHeight+5),r.style.left=i+"px",r.style.top=a+"px",e.addEventListener("mouseout",(function(){r.remove()}))}}))},258:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var o=document.querySelector(".overlay"),i=(document.querySelector("footer"),[{difficult:"easy",min:30,max:40,coefficient:1},{difficult:"medium",min:20,max:30,coefficient:3},{difficult:"hard",min:10,max:20,coefficient:6},{difficult:"nightmare",min:5,max:8,coefficient:10}]);function a(t){return new Date(t).toLocaleString("ru-RU").split(",")[0]}function c(t,e){t.innerHTML="";var r,o=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,s=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){s=!0,a=t},f:function(){try{c||null==r.return||r.return()}finally{if(s)throw a}}}}(e);try{for(o.s();!(r=o.n()).done;){var i=r.value,c=document.createElement("tr");if(null!=i&&i.player&&i.player.length){var s=document.createElement("td");s.innerHTML=i.player,c.append(s)}var u=document.createElement("td");u.innerHTML="".concat(i.score),c.append(u);var l=document.createElement("td");l.innerHTML=a(i.date),c.append(l),t.append(c)}}catch(t){o.e(t)}finally{o.f()}}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return{date:Date.now(),score:t,player:e}}function u(t,e){return Math.round(Math.random()*(e-t)+t)}function l(){var t=u(0,255),e=u(0,255),r=u(0,255);return"rgb(".concat(t,", ").concat(e,", ").concat(r,")")}function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function d(t,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function p(t){return p=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},p(t)}function y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function m(t,e,r){return e&&v(t.prototype,e),r&&v(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}var g,w,b=function(){function t(e,r){var n,o;y(this,t),o=[],(n="colors")in this?Object.defineProperty(this,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[n]=o,this.radius=function(t){var e=i.findIndex((function(e){return e.difficult===t}));return u(i[e].min,i[e].max)}(e),this.context=r.getContext("2d");var a=r.getBoundingClientRect(),c=a.width,s=a.height;if(this.x=u(this.radius,c-this.radius),this.y=u(this.radius,s-this.radius),"nightmare"!==e){var l=this.createGradient();this.offset=l.offset,this.colors=l.array}this.draw=this.draw.bind(this)}return m(t,[{key:"createGradient",value:function(){for(var t=u(2,Math.round(this.radius/5))+2,e=[],r=1/(t-1),n=0,o=0;o<t;o++)e.push({color:l(),position:Math.round(100*n)/100}),n+=r;return{array:e,offset:r}}},{key:"draw",value:function(){var t;if(null!==(t=this.colors)&&void 0!==t&&t.length){var e=this.context.createRadialGradient(this.x,this.y,0,this.x,this.y,this.radius);this.colors.forEach((function(t){var r=t.color,n=t.position;return e.addColorStop(n,r)})),this.context.fillStyle=e,this.moveGradient(),window.requestAnimationFrame(this.draw)}else this.context.fillStyle=this.colors?"rgb(54 66 78)":"rgba(0,0,0,0)";this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI),this.context.fill(),this.context.closePath()}},{key:"animate",value:function(){var t;null!==(t=this.colors)&&void 0!==t&&t.length?this.id=window.requestAnimationFrame(this.draw):this.draw()}},{key:"clearArc",value:function(){this.context.save(),this.context.globalCompositeOperation="destination-out",this.context.beginPath(),this.context.arc(this.x,this.y,this.radius+2,0,2*Math.PI),this.context.fill(),this.context.restore()}},{key:"moveGradient",value:function(){for(var t=this.colors.length,e=0;e<t;e++)0===e&&this.colors[e+1].position-this.colors[e].position<this.offset||(this.colors[e].position=Math.round(100*(this.colors[e].position+.01))/100);this.colors[t-1].position>=1&&(this.colors[t-1].position=1),this.colors[t-2].position>=1&&this.colors.length--,this.colors[0].position>0&&this.colors.unshift({color:l(),position:0})}},{key:"getInfo",value:function(){return{x:this.x,y:this.y,radius:this.radius}}},{key:"clear",value:function(){window.cancelAnimationFrame(this.id),this.colors=null,this.clearArc()}}]),t}(),x=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(o,t);var e,r,n=(e=o,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,n=p(e);if(r){var o=p(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return d(this,t)});function o(t,e,r,i,a){var c;y(this,o),c=n.call(this,a,t);var s=u(0,360)*(Math.PI/180);return c.radius=i/4,c.color=l(),c.start=performance.now(),c.x=i/2*Math.cos(s)+e,c.y=-i/2*Math.sin(s)+r,c.deltaX=1.5*i*Math.cos(s)/100,c.deltaY=-1.5*i*Math.sin(s)/100,c.deltaRadius=-c.radius/100,c}return m(o,[{key:"draw",value:function(){if(this.radius+this.deltaRadius<=0)return this.clear();this.clearArc(),this.context.beginPath(),this.context.fillStyle=this.color,this.context.arc(this.x,this.y,this.radius,0,2*Math.PI),this.context.fill(),this.context.closePath(),this.move(),window.requestAnimationFrame(this.draw)}},{key:"animate",value:function(){this.id=window.requestAnimationFrame(this.draw)}},{key:"move",value:function(){this.x+=this.deltaX,this.y+=this.deltaY,this.radius+=this.deltaRadius}},{key:"clear",value:function(){window.cancelAnimationFrame(this.id),this.color="rgba(0,0,0,0)",this.clearArc()}}]),o}(b),L=document.querySelector(".top-record"),S=document.querySelector(".local-games").querySelector("tbody");function E(){var t,e,r;k(),r=window.localStorage.getItem("topRecord"),w=JSON.parse(r),document.querySelector(".local-games-full").classList.toggle("hide",!(null!==(t=w)&&void 0!==t&&t.date)),document.querySelector(".local-games-empty").classList.toggle("hide",Boolean(null===(e=w)||void 0===e?void 0:e.date)),w&&(L.querySelector(".top-score").innerHTML="".concat(w.score),L.querySelector(".top-date").innerHTML=a(w.date),c(S,g))}function k(){var t=window.localStorage.getItem("lastGames");g=JSON.parse(t)||[]}E();var O=r(503),j=r(956);function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function _(){_=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=b(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=u(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l={};function f(){}function h(){}function d(){}var p={};c(p,o,(function(){return this}));var y=Object.getPrototypeOf,v=y&&y(y(E([])));v&&v!==e&&r.call(v,o)&&(p=v);var m=d.prototype=f.prototype=Object.create(p);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==q(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return h.prototype=d,c(m,"constructor",d),c(d,"constructor",h),h.displayName=c(d,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(w.prototype),c(w.prototype,i,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),c(m,a,"Generator"),c(m,o,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function P(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}function A(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){P(i,n,o,a,c,"next",t)}function c(t){P(i,n,o,a,c,"throw",t)}a(void 0)}))}}var T,M,I,G,N=(0,O.ZF)({apiKey:"AIzaSyCukmuh4VplvLpM3XQzlkGCuyGgX7x2y18",authDomain:"grastor-messagestorage.firebaseapp.com",databaseURL:"https://grastor-messagestorage-default-rtdb.firebaseio.com",projectId:"grastor-messagestorage",storageBucket:"grastor-messagestorage.appspot.com",messagingSenderId:"189811633204",appId:"1:189811633204:web:cddbbdee2964375bd86e61",measurementId:"G-G4SXGQZLE1"}),F=(0,j.N8)(N),R=(0,j.iH)(F,"aim-statistic"),C=document.querySelector(".global-games.statistic-board").querySelector("tbody"),H=document.querySelector(".congratulation.screen-popup"),B=H.querySelector(".top-name"),D=H.querySelector(".info"),Y=H.querySelector(".refusal"),X=H.querySelector(".waiting"),J=H.querySelector(".done"),W=H.querySelector(".place"),K=document.querySelector(".bucket");function U(t){return z.apply(this,arguments)}function z(){return(z=A(_().mark((function t(e){return _().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:G.splice(M,0,s(I,e)),G.length>10&&--G.length,(0,j.t8)(R,G).then((function(){X.style.display="none",J.style.display="block",setTimeout(Q,1e3),c(C,G)}));case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Q(){o.classList.remove("open"),H.classList.remove("open"),H.addEventListener("transitionend",(function(){Y.style.display="none",J.style.display="none",D.style.display="block"}))}function Z(){return(Z=A(_().mark((function t(e){var r,n,o;return _().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=K.value,n=e.target,!(r.length>0)){t.next=4;break}return t.abrupt("return");case 4:if(n.classList.contains("agree-btn")){t.next=6;break}return t.abrupt("return");case 6:if(T="true"===n.getAttribute("data-agree"),o=B.value.trim(),!(T&&o.length>0)){t.next=15;break}return t.next=11,U(o);case 11:D.style.display="none",X.style.display="block ",t.next=18;break;case 15:setTimeout(Q,1e3),D.style.display="none",Y.style.display="block";case 18:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function V(t){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(t)}function $(){$=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof f?e:f,i=Object.create(o.prototype),a=new S(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=b(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=u(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l={};function f(){}function h(){}function d(){}var p={};c(p,o,(function(){return this}));var y=Object.getPrototypeOf,v=y&&y(y(E([])));v&&v!==e&&r.call(v,o)&&(p=v);var m=d.prototype=f.prototype=Object.create(p);function g(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function n(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==V(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function b(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function E(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:k}}function k(){return{value:void 0,done:!0}}return h.prototype=d,c(m,"constructor",d),c(d,"constructor",h),h.displayName=c(d,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,c(t,a,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(w.prototype),c(w.prototype,i,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(m),c(m,a,"Generator"),c(m,o,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),s=r.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}function tt(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void r(t)}c.done?e(s):Promise.resolve(s).then(n,o)}function et(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}B.addEventListener("input",(function(){var t=B.value.trim();H.querySelector('.agree-btn[data-agree="true"]').classList.toggle("disabled",0===t.length)})),H.addEventListener("click",(function(t){return Z.apply(this,arguments)})),document.addEventListener("DOMContentLoaded",(function(){(0,j.jM)(R,(function(t){(G=t.val()).length&&c(C,G)}))}));var rt,nt,ot,it,at,ct=function(){function t(e){var r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),(r="duration")in this?Object.defineProperty(this,r,{value:1e3,enumerable:!0,configurable:!0,writable:!0}):this[r]=1e3,this.board=e,this.context=this.board.getContext("2d"),this.draw=this.draw.bind(this)}var e,r,n,o;return e=t,r=[{key:"start",value:(n=$().mark((function t(){var e,r;return $().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=0,r=["3","2","1","GO!"];case 2:if(!(e<r.length)){t.next=10;break}return this.text=r[e],this.startTimestamp=performance.now(),t.next=7,this.animate();case 7:e++,t.next=2;break;case 10:case"end":return t.stop()}}),t,this)})),o=function(){var t=this,e=arguments;return new Promise((function(r,o){var i=n.apply(t,e);function a(t){tt(i,r,o,a,c,"next",t)}function c(t){tt(i,r,o,a,c,"throw",t)}a(void 0)}))},function(){return o.apply(this,arguments)})},{key:"animate",value:function(){return this.opacity=1,this.scale=0,this.process=0,this.id=window.requestAnimationFrame(this.draw),new Promise((function(t){return setTimeout((function(){return t(1)}),1e3)}))}},{key:"draw",value:function(){this.context.textBaseline="middle",this.context.textAlign="center",this.context.clearRect(0,0,this.board.width,this.board.height),this.context.font="".concat(5*this.scale,"rem Khula sans-serif"),this.context.fillStyle="rgba(255,255,255,".concat(this.opacity,")"),this.context.fillText(this.text,this.board.width/2,this.board.height/2),this.process=100*(performance.now()-this.startTimestamp)/this.duration,this.process<100/3&&(this.scale=this.process/11),this.process>=100/3&&this.process<=200/3&&(this.opacity=33/this.process),this.process>200/3&&(this.scale=50-47/34*(100-this.process),this.opacity=1-this.process/100),this.process<100?window.requestAnimationFrame(this.draw):(this.context.clearRect(0,0,this.board.width,this.board.height),window.cancelAnimationFrame(this.id))}}],r&&et(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),st=document.querySelector(".start"),ut=document.querySelectorAll(".screen"),lt=document.querySelector(".settings"),ft=document.querySelector("#time"),ht=document.querySelector("#board"),dt=document.querySelector(".screen-popup.warning"),pt=ht.getContext("2d"),yt=0,vt=[];function mt(){(it=new b(nt,ht)).animate(),"nightmare"===nt&&(window.clearTimeout(at),at=window.setTimeout((function(){it.clear(),mt()}),1500))}function gt(){var t,e;pt.clearRect(0,0,ht.width,ht.height);var r=ht.getBoundingClientRect();ht.width=r.width,ht.height=r.height,nt=null===(t=document.querySelector(".difficult-btn.selected"))||void 0===t?void 0:t.getAttribute("data-difficult"),rt=+(null===(e=document.querySelector(".time-btn.selected"))||void 0===e?void 0:e.getAttribute("data-time")),ft.parentNode.classList.remove("hide"),new ct(ht).start().then((function(){bt(rt),mt(),ot=window.setInterval(wt,1e3)}))}function wt(){rt?bt(--rt):function(){var t;clearInterval(ot),it.clear(),it=null,(vt=vt.map((function(t){return t.clear(),null}))).length=0,pt.clearRect(0,0,ht.width,ht.height),ft.parentNode.classList.add("hide"),setTimeout(xt,0);var e=+(null===(t=document.querySelector(".time-btn.selected"))||void 0===t?void 0:t.getAttribute("data-time")),r=function(t,e,r){var n=+(t/(r=Math.floor(r/10))).toFixed(4),o=i.findIndex((function(t){return t.difficult===e}));return+(n*i[o].coefficient).toFixed(2)}(yt,nt,e);(function(t){var e=s(t);!function(t){for(k(),g.push(t);g.length>10;)g.shift();window.localStorage.setItem("lastGames",JSON.stringify(g))}(e),function(t){var e;(null===(e=w)||void 0===e||!e.score||w.score<t.score)&&(w=t,window.localStorage.setItem("topRecord",JSON.stringify(w)))}(e)})(r),function(t){var e;0!==G.length&&(I=t,(M=G.findIndex((function(t){return t.score<I})))>-1&&(e=M+1,W.innerHTML="".concat(e),o.classList.add("open"),H.classList.add("open")))}(r),setTimeout((function(){ut[1].classList.remove("up")}),1500)}()}function bt(t){var e="".concat(Math.floor(t/60)).padStart(2,"0"),r="".concat(Math.floor(t%60)).padStart(2,"0");ft.innerHTML="".concat(e,":").concat(r)}function xt(){pt.clearRect(0,0,ht.width,ht.height),pt.textBaseline="middle",pt.textAlign="center";var t=7;window.matchMedia("screen and (max-width: 768px)").matches&&(t=4),pt.font="".concat(t,"rem Khula sans-serif"),pt.fillStyle="#16D9E3";var e="Счет: ".concat(yt);pt.fillText(e,ht.width/2,ht.height/2)}st.addEventListener("click",(function(t){t.preventDefault(),ut[0].classList.add("up")})),lt.addEventListener("click",(function(t){var e=t.target;e.classList.contains("difficult-btn")&&(lt.querySelectorAll(".difficult-btn").forEach((function(t){return t.classList.remove("selected")})),e.classList.add("selected"),"nightmare"===e.getAttribute("data-difficult")&&"true"!==window.localStorage.getItem("agreementWithNightmare")&&(o.classList.add("open"),dt.classList.add("open"))),e.classList.contains("time-btn")&&(lt.querySelectorAll(".time-btn").forEach((function(t){return t.classList.remove("selected")})),e.classList.add("selected")),e.classList.contains("start-btn")&&(yt=0,ut[1].classList.add("up"),setTimeout(gt,1e3))})),ht.addEventListener("click",(function(t){if(it){var e=ht.getBoundingClientRect(),r=e.left,n=e.top;if(function(t){var e=it.getInfo(),r=e.x,n=e.y,o=e.radius;return Math.pow(t.x-r,2)+Math.pow(t.y-n,2)<=Math.pow(o,2)}({x:t.x-r,y:t.y-n})){yt++;var o=it.getInfo(),a=o.x,c=o.y,s=o.radius;if(it.clear(),"nightmare"!==nt){var l=i.find((function(t){return t.difficult===nt})),f=l.min,h=l.max;h=Math.round(h/3);for(var d=u(f=Math.round(f/3),h),p=0;p<=d;p++){var y=new x(ht,a,c,s,nt);vt.push(y),y.animate()}}mt()}}})),document.querySelector(".warning-btn").addEventListener("click",(function(){o.classList.remove("open"),dt.classList.remove("open"),window.localStorage.setItem("agreementWithNightmare","true")})),document.addEventListener("click",(function(t){var e=t.target;if(e.classList.contains("screen-popup")&&e.classList.contains("open")){e.classList.remove("open");var r=e.querySelector(".ledge")||null;o.classList.remove("open"),r&&r.classList.remove("hide")}}));var Lt=document.querySelector(".tabs"),St=document.querySelectorAll(".statistic-info "),Et=document.querySelector(".close-statistic"),kt=document.querySelector(".ledge"),Ot=document.querySelector(".screen-popup.statistic");Lt.addEventListener("click",(function(t){t.target.closest(".tab-item")&&(Array.from(Lt.children).forEach((function(t){return t.classList.toggle("open")})),St.forEach((function(t){return t.classList.toggle("open")})))})),Et.addEventListener("click",(function(){kt.classList.remove("hide"),Ot.classList.remove("open"),o.classList.remove("open")})),kt.addEventListener("click",(function(){kt.classList.add("hide"),Ot.classList.add("open"),o.classList.add("open"),E()})),r(606)}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,n),i.exports}n.m=e,t=[],n.O=function(e,r,o,i){if(!r){var a=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],i=t[l][2];for(var c=!0,s=0;s<r.length;s++)(!1&i||a>=i)&&Object.keys(n.O).every((function(t){return n.O[t](r[s])}))?r.splice(s--,1):(c=!1,i<a&&(a=i));if(c){t.splice(l--,1);var u=o();void 0!==u&&(e=u)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[r,o,i]},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={179:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,i,a=r[0],c=r[1],s=r[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(s)var l=s(n)}for(e&&e(r);u<a.length;u++)i=a[u],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},r=self.webpackChunkaim_game_grastor=self.webpackChunkaim_game_grastor||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var o=n.O(void 0,[736],(function(){return n(258)}));o=n.O(o)}();