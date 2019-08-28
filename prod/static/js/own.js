"use strict";function qs(e){return(1<arguments.length&&void 0!==arguments[1]?arguments[1]:document).querySelector(e)}function qsAll(e){return(1<arguments.length&&void 0!==arguments[1]?arguments[1]:document).querySelectorAll(e)}function getParent(e,t){for(;e&&e.parentNode;)if((e=e.parentNode).classList&&e.classList.contains(t))return e;return!1}var resetForm=function(e){["error","no-empty"].forEach(function(t){return qsAll(".".concat(t),e).forEach(function(e){return e.classList.remove(t)})}),e.reset()};window.onload=function(){return qs("body").classList.add("page-loaded")},navigator.userAgent.match(/(iPod|iPhone|iPad)/)&&qs("body").classList.add("ios"),document.addEventListener("DOMContentLoaded",function(e){window.ir={},window.ir.form={init:function(){var i=this,e=qsAll(".form__field-input, .form__field-textarea"),t=qsAll("form"),n=qsAll(".js-digits");function r(e){""===e.target.value.trim()?e.target.classList.remove("not-empty"):e.target.classList.add("not-empty")}var a=!0,s=!1,o=void 0;try{for(var l,d=e[Symbol.iterator]();!(a=(l=d.next()).done);a=!0){var c=l.value;c.addEventListener("keyup",r),c.addEventListener("blur",r)}}catch(e){s=!0,o=e}finally{try{a||null==d.return||d.return()}finally{if(s)throw o}}var v=!0,y=!1,f=void 0;try{for(var u,p=function(){var t=u.value;t.addEventListener("submit",function(e){return!i.checkForm(t)&&e.preventDefault()})},m=t[Symbol.iterator]();!(v=(u=m.next()).done);v=!0)p()}catch(e){y=!0,f=e}finally{try{v||null==m.return||m.return()}finally{if(y)throw f}}var g=!0,h=!1,w=void 0;try{for(var b,L=n[Symbol.iterator]();!(g=(b=L.next()).done);g=!0){b.value.addEventListener("keydown",function(e){-1!==[46,8,9,27,13,110,190].indexOf(e.keyCode)||65==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||67==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||88==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&e.keyCode<=39||(e.shiftKey||e.keyCode<48||57<e.keyCode)&&(e.keyCode<96||105<e.keyCode)&&e.preventDefault()})}}catch(e){h=!0,w=e}finally{try{g||null==L.return||L.return()}finally{if(h)throw w}}return this},checkForm:function(e){var t=!0,i=e.querySelectorAll(".error");if(i.length){var n=!0,r=!1,a=void 0;try{for(var s,o=i[Symbol.iterator]();!(n=(s=o.next()).done);n=!0){s.value.classList.remove("error")}}catch(e){r=!0,a=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw a}}}var l=!0,d=!1,c=void 0;try{for(var v,y=e.querySelectorAll("input, textarea, select")[Symbol.iterator]();!(l=(v=y.next()).done);l=!0){var f=v.value;if(f.getAttribute("data-req"))switch(f.getAttribute("data-type")){case"tel":/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(f.value)||(f.classList.add("error"),t=!1);break;case"email":/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(f.value)||(f.classList.add("error"),t=!1);break;case"file":default:""===f.value.trim()&&(f.classList.add("error"),t=!1)}}}catch(e){d=!0,c=e}finally{try{l||null==y.return||y.return()}finally{if(d)throw c}}var u=!0,p=!1,m=void 0;try{for(var g,h=e.querySelectorAll("input[data-req^=agreement]")[Symbol.iterator]();!(u=(g=h.next()).done);u=!0){var w=g.value;w.checked||(w.classList.add("error"),t=!1)}}catch(e){p=!0,m=e}finally{try{u||null==h.return||h.return()}finally{if(p)throw m}}return t}}.init(),window.ir.obj={slideUp:function(e,t,i){var n;e&&((n="string"==typeof e||e instanceof String?qs(e):e).style.height=n.offsetHeight+"px",n.style.transitionProperty="height, margin, padding",n.style.transitionDuration=t+"ms",n.offsetHeight,n.style.overflow="hidden",n.style.height=0,n.style.paddingTop=0,n.style.paddingBottom=0,n.style.marginTop=0,n.style.marginBottom=0,setTimeout(function(){n.style.display="none",n.style.removeProperty("height"),n.style.removeProperty("padding-top"),n.style.removeProperty("padding-bottom"),n.style.removeProperty("margin-top"),n.style.removeProperty("margin-bottom"),n.style.removeProperty("overflow"),n.style.removeProperty("transition-property"),n.style.removeProperty("transition-duration")},t))},slideDown:function(e,t,i){if(e){var n;n="string"==typeof e||e instanceof String?qs(e):e;var r=getComputedStyle(n).display;n.style.removeProperty("display"),"none"===r&&(r="block"),n.style.display=r;var a=n.offsetHeight;n.style.overflow="hidden",n.style.height=0,n.style.paddingTop=0,n.style.paddingBottom=0,n.style.marginTop=0,n.style.marginBottom=0,n.offsetHeight,n.style.transitionProperty="height, margin, padding",n.style.transitionDuration=t+"ms",n.style.height=a+"px",n.style.removeProperty("padding-top"),n.style.removeProperty("padding-bottom"),n.style.removeProperty("margin-top"),n.style.removeProperty("margin-bottom"),setTimeout(function(){n.style.removeProperty("height"),n.style.removeProperty("overflow"),n.style.removeProperty("transition-property"),n.style.removeProperty("transition-duration")},t)}},slideToogle:function(e,t,i){var n,r=2<arguments.length&&void 0!==i?i:null;n="string"==typeof e||e instanceof String?qs(e):e,"none"===getComputedStyle(n).display?this.slideDown(n,t,r):this.slideUp(n,t,r)},fadeOut:function(e,t,i){var n=2<arguments.length&&void 0!==i?i:null;if(e){var r,a=1;r="string"==typeof e||e instanceof String?qs(e):e;var s=setInterval(function(){a<=.1&&(clearInterval(s),r.style.display="none",n&&n()),r.style.opacity=a,r.style.filter="alpha(opacity="+100*a+")",a-=.1*a},t/50||20)}},fadeIn:function(e,t,i){var n=2<arguments.length&&void 0!==i?i:null;if(e){var r,a=.1;(r="string"==typeof e||e instanceof String?qs(e):e).style.opacity=0,r.style.display="block";var s=setInterval(function(){1<=a&&(clearInterval(s),n&&n()),r.style.opacity=a,r.style.filter="alpha(opacity="+100*a+")",a+=.1*a},t/50||20)}},fadeToggle:function(e,t,i){var n,r=2<arguments.length&&void 0!==i?i:null;n="string"==typeof e||e instanceof String?qs(e):e,"none"===getComputedStyle(n).display?this.fadeIn(n,t,r):this.fadeOut(n,t,r)},anim:function(){var e,t=[".js-scroll-anim"];t.length&&(e=t,window.addEventListener("scroll",function(){e.length&&e.forEach(function(e){qsAll(e).length&&qsAll(e).forEach(function(e){!function(e){var t=e.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight;return t.top<=.75*i}(e)||e.classList.add("start-animate")})})}))},inavFixed:function(){var e=qs(".inav"),t=(e.offsetHeight,e.offsetTop);window.addEventListener("resize",function(){window.addEventListener("scroll",function(){1239<window.innerWidth?(qs(".header").classList.contains("fixed")&&qs(".header").classList.remove("fixed"),window.pageYOffset>t?e.classList.contains("inav--fixed")||e.classList.add("inav--fixed"):e.classList.contains("inav--fixed")&&e.classList.remove("inav--fixed")):(e.classList.contains("inav--fixed")&&e.classList.remove("inav--fixed"),qs(".header").offsetHeight<window.pageYOffset?qs(".header").classList.contains("fixed")||qs(".header").classList.add("fixed"):qs(".header").classList.contains("fixed")&&qs(".header").classList.remove("fixed"))})})},burger:function(){qs(".js-burger").addEventListener("click",function(e){this.classList.toggle("active"),qs(".nav").classList.toggle("open"),qs("body").classList.toggle("open-menu"),e.preventDefault()})},tabsLocation:function(){var i=this;qsAll(".js-tabs .iserv__tabs-nav-btn").forEach(function(e){e.addEventListener("click",function(e){var t=this;t.classList.contains("iserv__tabs-nav-btn--active")||(qs(".iserv__tabs-nav-btn--active").classList.remove("iserv__tabs-nav-btn--active"),t.classList.add("iserv__tabs-nav-btn--active"),i.fadeOut(".iserv__tabs-item--active",300,function(){qs(".iserv__tabs-item--active").classList.remove("iserv__tabs-item--active"),qs('.iserv__tabs-item[data-tabs-item="'+t.dataset.tabsNav+'"]')&&i.fadeIn('.iserv__tabs-item[data-tabs-item="'+t.dataset.tabsNav+'"]',300,function(){qs('.iserv__tabs-item[data-tabs-item="'+t.dataset.tabsNav+'"]').classList.add("iserv__tabs-item--active")})})),e.preventDefault()})})},ireviewSwiper:function(){new Swiper(".js-ireview-swiper",{loop:!0,speed:700,slidesPerView:"auto",spaceBetween:36,centeredSlides:!0,navigation:{nextEl:".ireview .swiper-button-next",prevEl:".ireview .swiper-button-prev"},breakpoints:{767:{autoHeight:!0}}})},map:function(){var t=qs(".js-map").dataset.coords.split(",");ymaps.ready(function(){var e;(e=new ymaps.Map("yaMap",{center:[t[0],t[1]],zoom:17,controls:[],behaviors:["drag"]})).controls.add("zoomControl",{size:"small"}),e.geoObjects.add(new ymaps.Placemark([t[0],t[1]],{},{iconLayout:"default#image",iconImageHref:"/static/img/pin.png",iconImageSize:[46,58],iconImageOffset:[-15,-65]}))})},init:function(){var t,i;qs(".inav")&&this.inavFixed(),qsAll(".js-scroll-anim").length&&this.anim(),qs(".js-tabs")&&this.tabsLocation(),qs(".js-ireview-swiper")&&this.ireviewSwiper(),qs(".js-map")&&this.map(),qs(".js-burger")&&this.burger(),$(".js-mfp").length&&$(".js-mfp").magnificPopup({type:"inline",midClick:!0});try{t=new Event("resize")}catch(e){(t=document.createEvent("Event")).initEvent("resize",!1,!1)}window.dispatchEvent(t);try{i=new Event("scroll")}catch(e){(i=document.createEvent("Event")).initEvent("scroll",!1,!1)}return window.dispatchEvent(i),this}}.init()});
//# sourceMappingURL=own.js.map
