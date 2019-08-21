"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}function qs(e){return(1<arguments.length&&void 0!==arguments[1]?arguments[1]:document).querySelector(e)}function qsAll(e){return(1<arguments.length&&void 0!==arguments[1]?arguments[1]:document).querySelectorAll(e)}function getParent(e,t){for(;e&&e.parentNode;)if((e=e.parentNode).classList&&e.classList.contains(t))return e;return!1}var videos,videosGalleryBig,pauseVideos=function(e,t,i){var s=i||0,n=t,r=e.querySelector("video");n&&n.length&&n.forEach(function(e){if(e.onerror=function(){console.log("Error with media: "+e.error.code)},e.hasAttribute("data-stid")&&(clearTimeout(e.getAttribute("data-stid")),e.removeAttribute("data-stid")),e.pause(),e&&r){if(!r.isEqualNode(e)){var t=setTimeout(function(){isNaN(e.duration)||(e.currentTime=0),e.removeAttribute("data-stid")},s);e.setAttribute("data-stid",t)}}else setTimeout(function(){isNaN(e.duration)||(e.currentTime=0)},i)})},resetForm=function(e){["error","no-empty"].forEach(function(t){return qsAll(".".concat(t),e).forEach(function(e){return e.classList.remove(t)})}),e.reset()};window.modal,window.onload=function(){return qs("body").classList.add("page-loaded")},navigator.userAgent.match(/(iPod|iPhone|iPad)/)&&qs("body").classList.add("ios"),document.addEventListener("DOMContentLoaded",function(e){window.arhmedstroy={},window.arhmedstroy.form={init:function(){var i=this,e=qsAll(".form__field-input, .form__field-textarea"),t=qsAll("form"),s=qsAll(".js-digits");function n(e){""===e.target.value.trim()?e.target.classList.remove("not-empty"):e.target.classList.add("not-empty")}var r=!0,o=!1,a=void 0;try{for(var l,p=e[Symbol.iterator]();!(r=(l=p.next()).done);r=!0){var c=l.value;c.addEventListener("keyup",n),c.addEventListener("blur",n)}}catch(e){o=!0,a=e}finally{try{r||null==p.return||p.return()}finally{if(o)throw a}}var d=!0,u=!1,w=void 0;try{for(var v,f=function(){var t=v.value;t.addEventListener("submit",function(e){return!i.checkForm(t)&&e.preventDefault()})},y=t[Symbol.iterator]();!(d=(v=y.next()).done);d=!0)f()}catch(e){u=!0,w=e}finally{try{d||null==y.return||y.return()}finally{if(u)throw w}}var h=!0,g=!1,m=void 0;try{for(var b,_=s[Symbol.iterator]();!(h=(b=_.next()).done);h=!0){b.value.addEventListener("keydown",function(e){-1!==[46,8,9,27,13,110,190].indexOf(e.keyCode)||65==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||67==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||88==e.keyCode&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&e.keyCode<=39||(e.shiftKey||e.keyCode<48||57<e.keyCode)&&(e.keyCode<96||105<e.keyCode)&&e.preventDefault()})}}catch(e){g=!0,m=e}finally{try{h||null==_.return||_.return()}finally{if(g)throw m}}return this},checkForm:function(e){var t=!0,i=e.querySelectorAll(".error");if(i.length){var s=!0,n=!1,r=void 0;try{for(var o,a=i[Symbol.iterator]();!(s=(o=a.next()).done);s=!0){o.value.classList.remove("error")}}catch(e){n=!0,r=e}finally{try{s||null==a.return||a.return()}finally{if(n)throw r}}}var l=!0,p=!1,c=void 0;try{for(var d,u=e.querySelectorAll("input, textarea, select")[Symbol.iterator]();!(l=(d=u.next()).done);l=!0){var w=d.value;if(w.getAttribute("data-req"))switch(w.getAttribute("data-type")){case"tel":/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(w.value)||(w.parentNode.classList.add("error"),t=!1);break;case"email":/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(w.value)||(w.parentNode.classList.add("error"),t=!1);break;case"file":default:""===w.value.trim()&&(w.parentNode.classList.add("error"),t=!1)}}}catch(e){p=!0,c=e}finally{try{l||null==u.return||u.return()}finally{if(p)throw c}}var v=!0,f=!1,y=void 0;try{for(var h,g=e.querySelectorAll("input[data-req^=agreement]")[Symbol.iterator]();!(v=(h=g.next()).done);v=!0){var m=h.value;m.checked||(m.classList.add("error"),t=!1)}}catch(e){f=!0,y=e}finally{try{v||null==g.return||g.return()}finally{if(f)throw y}}return t}}.init(),window.dataMap=[{id:11,coords:"55.751381, 37.596669"},{id:15,coords:"55.781792, 37.580362"},{id:35,coords:"55.763532, 37.663780"}],window.arhmedstroy.map={map:function(){var n="static/img/pin.png",r="static/img/pin-hover.png",e=qs(".js-map-projects").dataset.center?qs(".js-map-projects").dataset.center.split(","):["55.755814"," 37.617635"];ymaps.ready(function(){var s;s=new ymaps.Map("yaMapPrj",{center:[e[0],e[1]],zoom:13,controls:["zoomControl"],behaviors:["drag"]}),void 0!==window.dataMap&&window.dataMap.forEach(function(e){s.geoObjects.add(new ymaps.Placemark(e.coords.split(", "),{myid:e.id},{iconLayout:"default#image",iconImageHref:n,iconImageSize:[29,49]}))}),s.geoObjects.events.add("click",function(e){var t=e.get("target").properties._data.myid;console.log(t),ymaps.geoQuery(s.geoObjects).searchIntersect(s).each(function(e){e.options.set({iconImageHref:n})});var i=ymaps.templateLayoutFactory.createClass('<div class="prj-popup"> <div class="prj-popup__overimg">   <img class="prj-popup__img" src="static/img/prj-popup-img.jpg" alt="" role="presentation"> </div> <div class="prj-popup__info">   <a class="prj-popup__title" href="#">ТЦ Галерея 76</a>   <address class="prj-popup__address">г. Москва, ул. Арбат, 10</address>   <p class="prj-popup__descr">Торгово-офисный комплекс «Галерея 76» расположен на первой линии Профсоюзной улицы, в 5 минутах ходьбы от метро  «Калужская» и в 14 минутах – от метро «Новые Черемушки».</p>   <div class="prj-popup__right-bottom">     <ul class="prj-popup__list">       <li class="prj-popup__list-item">         <p class="prj-popup__list-item-title">Стоимость</p>         <p class="prj-popup__list-item-data">от <span>170 000</span> руб за м<sup>2</sup></p>       </li>       <li class="prj-popup__list-item">         <p class="prj-popup__list-item-title">Площадь</p>         <p class="prj-popup__list-item-data"> <span>22 183</span> м<sup>2</sup></p>       </li>     </ul>   </div> </div></div>');e.get("target").options.set({iconImageHref:r,balloonContentLayout:i})}).add("mouseenter",function(e){e.get("target").options.set({iconImageHref:r})}).add("mouseleave",function(e){e.get("target").options.set({iconImageHref:n})}),s.geoObjects.events.add("balloonclose",function(e){s.balloon.close()})})},init:function(){return qs(".js-map-projects")&&this.map(),this}}.init(),window.arhmedstroy.preloader={showPreloader:function(e){qs(e).classList.add("preloader")},hidePreloader:function(e){qs(e).classList.remove("preloader")},init:function(){var t=this;qs(".js-example-preloader")&&qs(".js-example-preloader").addEventListener("click",function(e){t.showPreloader("body"),e.preventDefault()})}}.init(),window.arhmedstroy.obj={slideUp:function(e,t,i){var s;e&&((s="string"==typeof e||e instanceof String?qs(e):e).style.height=s.offsetHeight+"px",s.style.transitionProperty="height, margin, padding",s.style.transitionDuration=t+"ms",s.offsetHeight,s.style.overflow="hidden",s.style.height=0,s.style.paddingTop=0,s.style.paddingBottom=0,s.style.marginTop=0,s.style.marginBottom=0,setTimeout(function(){s.style.display="none",s.style.removeProperty("height"),s.style.removeProperty("padding-top"),s.style.removeProperty("padding-bottom"),s.style.removeProperty("margin-top"),s.style.removeProperty("margin-bottom"),s.style.removeProperty("overflow"),s.style.removeProperty("transition-property"),s.style.removeProperty("transition-duration")},t))},slideDown:function(e,t,i){if(e){var s;s="string"==typeof e||e instanceof String?qs(e):e;var n=getComputedStyle(s).display;s.style.removeProperty("display"),"none"===n&&(n="block"),s.style.display=n;var r=s.offsetHeight;s.style.overflow="hidden",s.style.height=0,s.style.paddingTop=0,s.style.paddingBottom=0,s.style.marginTop=0,s.style.marginBottom=0,s.offsetHeight,s.style.transitionProperty="height, margin, padding",s.style.transitionDuration=t+"ms",s.style.height=r+"px",s.style.removeProperty("padding-top"),s.style.removeProperty("padding-bottom"),s.style.removeProperty("margin-top"),s.style.removeProperty("margin-bottom"),setTimeout(function(){s.style.removeProperty("height"),s.style.removeProperty("overflow"),s.style.removeProperty("transition-property"),s.style.removeProperty("transition-duration")},t)}},slideToogle:function(e,t,i){var s,n=2<arguments.length&&void 0!==i?i:null;s="string"==typeof e||e instanceof String?qs(e):e,"none"===getComputedStyle(s).display?this.slideDown(s,t,n):this.slideUp(s,t,n)},fadeOut:function(e,t,i){var s=2<arguments.length&&void 0!==i?i:null;if(e){var n,r=1;n="string"==typeof e||e instanceof String?qs(e):e;var o=setInterval(function(){r<=.1&&(clearInterval(o),n.style.display="none",s&&s()),n.style.opacity=r,n.style.filter="alpha(opacity="+100*r+")",r-=.1*r},t/50||20)}},fadeIn:function(e,t,i){var s=2<arguments.length&&void 0!==i?i:null;if(e){var n,r=.1;(n="string"==typeof e||e instanceof String?qs(e):e).style.opacity=0,n.style.display="block";var o=setInterval(function(){1<=r&&(clearInterval(o),s&&s()),n.style.opacity=r,n.style.filter="alpha(opacity="+100*r+")",r+=.1*r},t/50||20)}},anim:function(){var e,t=[".js-scroll-anim"];t.length&&(e=t,window.addEventListener("scroll",function(){e.length&&e.forEach(function(e){qsAll(e).length&&qsAll(e).forEach(function(e){!function(e){var t=e.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight;return t.top<=.75*i}(e)||e.classList.add("start-animate")})})}))},newsPreviewSwiper:function(){new Swiper(".js-news-preview-swiper",{loop:!0,speed:700,slidesPerView:3,spaceBetween:19,autoplay:{delay:2e3},navigation:{nextEl:".news-preview .swiper-button-next",prevEl:".news-preview .swiper-button-prev"},pagination:{el:".news-preview .swiper-pagination",clickable:!0},breakpoints:{992:{slidesPerView:1},1800:{slidesPerView:2}}})},galleryMixed:function(){new Swiper(".js-media-swiper",{loop:!0,speed:700,slidesPerView:3,spaceBetween:30,autoplay:{delay:2e3},navigation:{nextEl:".gallery--mixed .swiper-button-next",prevEl:".gallery--mixed .swiper-button-prev"},breakpoints:{992:{slidesPerView:1},1900:{slidesPerView:2}}})},galleryBig:function(t){var e=16,i=7,s=5,n=4,r=3;getParent(qs(".js-gallery-thumbs"),"gallery-big--popup")&&(e=12,i=8,s=7,n=6,r=4);var o=new Swiper(t+" .js-gallery-thumbs",{spaceBetween:e,slidesPerView:i,speed:700,freeMode:!0,watchSlidesVisibility:!0,watchSlidesProgress:!0,breakpoints:{480:{slidesPerView:2},767:{slidesPerView:r},1366:{slidesPerView:n},1900:{slidesPerView:s}}});new Swiper(t+" .js-gallery-top",{spaceBetween:10,speed:700,navigation:{nextEl:t+" .gallery-big__top .swiper-button-next",prevEl:t+" .gallery-big__top .swiper-button-prev"},fadeEffect:{crossFade:!0},effect:"fade",thumbs:{swiper:o},on:{init:function(){if(!getParent(this,"hidden-block")){videosGalleryBig=_toConsumableArray(qsAll(t+" .gallery-big__slide video"));var e=this.slides[this.activeIndex];pauseVideos(e,videosGalleryBig,700),qsAll(t+" .gallery-big__slide.control-hidden").length&&qsAll(t+" .gallery-big__slide.control-hidden").forEach(function(e){return e.classList.remove("control-hidden")})}},slideChange:function(){if(!getParent(this,"hidden-block")){var e=this.slides[this.activeIndex];pauseVideos(e,videosGalleryBig,700),qsAll(t+" .gallery-big__slide.control-hidden").length&&qsAll(t+" .gallery-big__slide.control-hidden").forEach(function(e){return e.classList.remove("control-hidden")})}},transitionEnd:function(){var e=qsAll(t+" .swiper-slide-prev iframe, "+t+" .swiper-slide-next iframe",this.$el[0]);e.length&&e.forEach(function(e){return e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")})}}})},projectsSwiper:function(){var e=4,t=3,i=3;getParent(qs(".js-projects-swiper"),"main__left")&&(t=e=3,i=2);new Swiper(".js-projects-swiper",{loop:!1,speed:700,slidesPerView:e,spaceBetween:30,navigation:{nextEl:".projects .swiper-button-next",prevEl:".projects .swiper-button-prev"},breakpoints:{667:{slidesPerView:1},992:{slidesPerView:2},1366:{slidesPerView:i},1640:{slidesPerView:t}}})},cardProjectsSwiper:function(){new Swiper(".js-card-projects-swiper",{loop:!1,speed:700,slidesPerView:1,spaceBetween:0,navigation:{nextEl:".card-projects .swiper-button-next",prevEl:".card-projects .swiper-button-prev"}})},projectsPhotosSwiper:function(){new Swiper(".js-projects-photos-swiper",{loop:!1,speed:700,slidesPerView:1,spaceBetween:0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})},partnersSwiper:function(){var e=6,t=4,i=4;getParent(qs(".js-swiper-partners"),"main__left")&&(t=e=4,i=3);new Swiper(".js-swiper-partners",{loop:!1,speed:700,slidesPerView:e,spaceBetween:0,autoplay:{delay:2e3},pagination:{el:".partners .swiper-pagination",clickable:!0},breakpoints:{480:{slidesPerView:1},667:{slidesPerView:2},992:{slidesPerView:3},1366:{slidesPerView:i},1640:{slidesPerView:t}}})},partnGalleryCarousel:function(){new Swiper(".js-gallery-swiper",{loop:!0,speed:700,slidesPerView:1,spaceBetween:0,autoplay:{delay:2e3},navigation:{nextEl:".gallery-carousel .swiper-button-next",prevEl:".gallery-carousel .swiper-button-prev"},pagination:{el:".swiper-pagination",type:"fraction"}})},topBannerSwiper:function(){new Swiper(".js-top-banner-swiper",{loop:!0,speed:700,slidesPerView:1,spaceBetween:0,navigation:{nextEl:".top-banner .swiper-button-next",prevEl:".top-banner .swiper-button-prev"}})},bannerCarousel:function(){new Swiper(".js-banner-swiper",{loop:!0,speed:700,slidesPerView:1,spaceBetween:0,autoplay:{delay:2e3},navigation:{nextEl:".banner-carousel .swiper-button-next",prevEl:".banner-carousel .swiper-button-prev"}})},mediaGallery:function(){new Swiper(".js-media-gallery",{loop:!0,speed:700,slidesPerView:1,spaceBetween:0,navigation:{nextEl:".media-gallery .swiper-button-next",prevEl:".media-gallery .swiper-button-prev"},on:{init:function(){videos=_toConsumableArray(qsAll(".media-gallery video"));var e=this.slides[this.activeIndex];pauseVideos(e,videos,700),qsAll(".media-gallery__video.control-hidden").length&&qsAll(".media-gallery__video.control-hidden").forEach(function(e){return e.classList.remove("control-hidden")})},slideChange:function(){var e=this.slides[this.activeIndex];pauseVideos(e,videos,700),qsAll(".media-gallery__video.control-hidden").length&&qsAll(".media-gallery__video.control-hidden").forEach(function(e){return e.classList.remove("control-hidden")})}}})},clientsSwiper:function(){new Swiper(".js-clients-swiper",{loop:!0,speed:700,slidesPerView:5,spaceBetween:0,autoplay:{delay:2e3},navigation:{nextEl:".clients .swiper-button-next",prevEl:".clients .swiper-button-prev"},breakpoints:{400:{slidesPerView:1},580:{slidesPerView:2},767:{slidesPerView:3},1365:{slidesPerView:4}}})},newsSwiper:function(){var e=3,t=2,i=2,s=1;getParent(qs(".js-news-swiper"),"publications--head")&&(e=4,i=t=3,s=2);new Swiper(".js-news-swiper",{loop:!0,speed:700,slidesPerView:e,spaceBetween:30,autoplay:{delay:2e3},navigation:{nextEl:".publications--carousel .swiper-button-next",prevEl:".publications--carousel .swiper-button-prev"},breakpoints:{480:{slidesPerView:1},667:{slidesPerView:s},992:{slidesPerView:i},1366:{slidesPerView:t}}})},spheresSwiper:function(){new Swiper(".js-spheres-swiper",{loop:!0,speed:700,slidesPerView:3,spaceBetween:30,navigation:{nextEl:".spheres .swiper-button-next",prevEl:".spheres .swiper-button-prev"},breakpoints:{667:{slidesPerView:1},1366:{slidesPerView:2}}})},reviewsSwiper:function(){new Swiper(".js-reviews-swiper",{loop:!0,speed:700,slidesPerView:2,spaceBetween:30,autoplay:{delay:2e3},navigation:{nextEl:".reviews .swiper-button-next",prevEl:".reviews .swiper-button-prev"},pagination:{el:".reviews .swiper-pagination",type:"fraction"},breakpoints:{1366:{slidesPerView:1}}})},awardsSwiper:function(){new Swiper(".js-swiper-awards",{loop:!0,speed:700,slidesPerView:4,spaceBetween:30,navigation:{nextEl:".awards .swiper-button-next",prevEl:".awards .swiper-button-prev"},pagination:{el:".awards .swiper-pagination",clickable:!0},autoplay:{delay:2e3},breakpoints:{480:{slidesPerView:1},767:{slidesPerView:2},992:{slidesPerView:3}}})},aboutSwiper:function(){new Swiper(".js-about-swiper",{loop:!1,speed:700,slidesPerView:1,spaceBetween:30,navigation:{nextEl:".about-popup .swiper-button-next",prevEl:".about-popup .swiper-button-prev"}})},historySuccessSwiper:function(){new Swiper(".js-swiper-history-success",{loop:!1,speed:700,slidesPerView:"auto",spaceBetween:0,navigation:{nextEl:".history-success .swiper-button-next",prevEl:".history-success .swiper-button-prev"}})},teamsSwiper:function(){var e=70,t=4,i=3,s=2;getParent(qs(".js-teams-swiper"),"main__left")&&(e=57,i=t=3,s=2);new Swiper(".js-teams-swiper",{loop:!0,speed:700,slidesPerView:t,spaceBetween:e,autoplay:{delay:2e3},navigation:{nextEl:".team-carousel .swiper-button-next",prevEl:".team-carousel .swiper-button-prev"},breakpoints:{479:{spaceBetween:30,slidesPerView:1},767:{spaceBetween:30,slidesPerView:s},992:{spaceBetween:30,slidesPerView:i},1366:{spaceBetween:30},1440:{spaceBetween:30}}})},headerPaint:function(){var e=qs(".header"),t=e.offsetHeight;window.addEventListener("scroll",function(){window.pageYOffset>t?e.classList.add("header--white"):e.classList.remove("header--white")})},choicesSelect:function(){qsAll(".js-select").forEach(function(e){new Choices(e,{placeholder:!0,searchEnabled:!1,itemSelectText:"",classNames:{containerOuter:"choices choices--custom"}})})},sticky:function(){var e=new StickySidebar(".main__right",{containerSelector:".main__row",innerWrapperSelector:".js-sticky",topSpacing:100,bottomSpacing:20});window.addEventListener("resize",function(){setTimeout(function(){window.innerWidth<1023?e.destroy():e.updateSticky()},1)})},toogleArchive:function(){var t=this;qs(".js-toogle-archive").addEventListener("click",function(e){this.previousElementSibling&&this.previousElementSibling.classList.contains("archive__hidden")&&(t.slideToogle(this.previousElementSibling,350),this.classList.contains("active")?(this.classList.remove("active"),this.innerText="Показать все года"):(this.classList.add("active"),this.innerText="Свернуть")),e.preventDefault()})},toogleVacancy:function(){var n=this;qsAll(".js-toogle-vacancy").forEach(function(e){e.addEventListener("click",function(e){var t=qs(".vacancy__item-btn-text",this),i=getParent(this,"vacancy__item"),s=qs(".vacancy__item-content",i);this.classList.contains("active")?(t.innerText="Подробности",this.classList.remove("active"),i.classList.remove("open"),n.slideUp(s,350)):(t.innerText="Свернуть",this.classList.add("active"),i.classList.add("open"),n.slideDown(s,350)),e.preventDefault()})})},jsFile:function(){qs(".js-file").addEventListener("change",function(){var e=getParent(this,"uploaded-file"),t=qs(".uploaded-file__error",e),i=e.querySelector(".uploaded-file__items"),s=document.createElement("div");this.files[0].size<5e7?(t.style.display="none",this.files.length&&i&&(s.classList.add("uploaded-file__item"),s.innerHTML='<p class="uploaded-file__item-name">'+this.files[0].name+'</p><button class="uploaded-file__item-del-btn js-del-file" type="button"></button>',i.appendChild(s),e.classList.contains("uploaded-file--no-empty")||e.classList.add("uploaded-file--no-empty"))):t.style.display="block"}),document.onclick=function(e){if(e.target.classList.contains("js-del-file")){var t=e.target,i=getParent(t,"uploaded-file"),s=i.querySelector(".uploaded-file__input");t.parentNode.remove(),s&&!qsAll(".uploaded-file__item",i).length&&(i.classList.remove("uploaded-file--no-empty"),s.value=""),e.preventDefault()}}},objects:function(){var e=qsAll(".js-objects .objects__item"),t=qs(".projects");e.length&&t&&e.forEach(function(e){e.addEventListener("click",function(e){this.dataset.objects;window.scroll({left:0,top:t.offsetTop-qs(".header").offsetHeight-28,behavior:"smooth"}),e.preventDefault()})}),window.addEventListener("scroll",function(e){})},selectFile:function(){var r=qsAll(".js-select-file .action__download-list-href");r.forEach(function(e){e.addEventListener("click",function(e){var t=this.getAttribute("href"),i=getParent(this,"action__download"),s=qs(".action__download-btn",i),n=qs(".action__download-type-title",i);this.classList.contains("active")||(r.forEach(function(e){return e.classList.remove("active")}),this.classList.add("active"),s.href=t,n.innerText=t.split(".")[1]),e.preventDefault()})})},tabsLocation:function(){var i=this;qsAll(".js-tabs-location .contacts__location-list-btn").forEach(function(e){e.addEventListener("click",function(e){var t=this;t.classList.contains("contacts__location-list-btn--active")||(qs(".contacts__location-list-btn--active").classList.remove("contacts__location-list-btn--active"),t.classList.add("contacts__location-list-btn--active"),i.fadeOut(".contacts__location-tabs-item--active",300,function(){qs(".contacts__location-tabs-item--active").classList.remove("contacts__location-tabs-item--active"),qs('.contacts__location-tabs-item[data-tabs-item="'+t.dataset.tabsNav+'"]')&&i.fadeIn('.contacts__location-tabs-item[data-tabs-item="'+t.dataset.tabsNav+'"]',300,function(){qs('.contacts__location-tabs-item[data-tabs-item="'+t.dataset.tabsNav+'"]').classList.add("contacts__location-tabs-item--active")})})),e.preventDefault()})})},burger:function(){qs(".js-burger").addEventListener("click",function(e){this.classList.toggle("active"),qs(".main__aside").classList.toggle("show"),qs("body").classList.toggle("open-menu"),e.preventDefault()})},mainTippy:function(){new Tippy(".js-tippy",{position:"top",arrow:!0,offset:[64,0]})},playMP4video:function(e){qsAll((e||"")+" .js-play-video").forEach(function(e){e.addEventListener("click",function(e){this.nextElementSibling.play(),getParent(this,"media-gallery__video")&&getParent(this,"media-gallery__video").classList.add("control-hidden"),getParent(this,"gallery-big__slide")&&getParent(this,"gallery-big__slide").classList.add("control-hidden"),e.preventDefault()})})},tingleModal:function(){var t=this;window.modal=new tingle.modal({footer:!1,stickyFooter:!1,closeMethods:["overlay","escape"],closeLabel:"Закрыть",cssClass:["modal--overflow"],beforeOpen:function(e){qs(".tingle-modal .js-about-swiper")&&setTimeout(function(){t.aboutSwiper()},5),setTimeout(function(){t.galleryBig(".tingle-modal"),t.playMP4video(".tingle-modal")},10),qs(".tingle-modal .gallery-big--popup")&&qs(".tingle-modal").classList.add("tingle-modal--dark-overlay")},onOpen:function(){qs(".tingle-modal form")&&window.arhmedstroy.form.init(),qs(".tingle-modal .js-close-popup")&&qs(".tingle-modal .js-close-popup").addEventListener("click",function(){return window.modal.close()})},onClose:function(){qsAll(".js-about-swiper.swiper-container-initialized").length&&qsAll(".js-about-swiper.swiper-container-initialized").forEach(function(e){return e.swiper.destroy(!0,!0)}),qsAll(".popup .js-gallery-top.swiper-container-initialized").length&&qsAll(".popup .js-gallery-top.swiper-container-initialized").forEach(function(e){return e.swiper.destroy(!0,!0)}),qsAll(".popup .js-gallery-thumbs.swiper-container-initialized").length&&qsAll(".popup .js-gallery-thumbs.swiper-container-initialized").forEach(function(e){return e.swiper.destroy(!0,!0)}),qs("body .tingle-modal-box__content")&&(qs("body .tingle-modal-box__content").innerHTML="")}}),qsAll(".js-popup").length&&qsAll(".js-popup").forEach(function(e){e.addEventListener("click",function(e){var t,i;if(this.classList.contains("gallery__item-overimg")&&(t=this.dataset.date&&""!=this.dataset.date?this.dataset.date:"",i=this.dataset.title&&""!=this.dataset.title?this.dataset.title:""),qs('.popup[id="'+this.getAttribute("href").substring(1)+'"]')){var s=qs('.popup[id="'+this.getAttribute("href").substring(1)+'"]');qs(".gallery-info__title",s)&&null!=i&&(qs(".gallery-info__title",s).innerText=i),qs(".gallery-info__date",s)&&null!=t&&(qs(".gallery-info__date",s).innerText=t),window.modal.setContent(qs('.popup[id="'+this.getAttribute("href").substring(1)+'"]').outerHTML),window.modal.open()}e.preventDefault()})})},init:function(){qs(".js-burger")&&this.burger(),qs(".js-news-preview-swiper")&&this.newsPreviewSwiper(),qs(".js-projects-swiper")&&this.projectsSwiper(),qs(".js-projects-photos-swiper")&&this.projectsPhotosSwiper(),qs(".js-swiper-partners")&&this.partnersSwiper(),qs(".js-gallery-swiper")&&this.partnGalleryCarousel(),qs(".js-banner-swiper")&&this.bannerCarousel(),qs(".js-top-banner-swiper")&&this.topBannerSwiper(),qs(".js-media-swiper")&&this.galleryMixed(),qs(".js-clients-swiper")&&this.clientsSwiper(),qs(".js-news-swiper")&&this.newsSwiper(),qs(".js-spheres-swiper")&&this.spheresSwiper(),qs(".js-reviews-swiper")&&this.reviewsSwiper(),qs(".js-teams-swiper")&&this.teamsSwiper(),qs(".main .js-gallery-top")&&qs(".main .js-gallery-thumbs")&&this.galleryBig(".main"),qs(".js-swiper-awards")&&this.awardsSwiper(),qs(".js-media-gallery")&&this.mediaGallery(),qs(".js-swiper-history-success")&&this.historySuccessSwiper(),qs(".js-card-projects-swiper")&&this.cardProjectsSwiper(),qs("body.index")&&this.headerPaint(),qs(".js-sticky")&&this.sticky(),qsAll(".js-select")&&this.choicesSelect(),qs(".js-toogle-archive")&&this.toogleArchive(),qsAll(".js-toogle-vacancy").length&&this.toogleVacancy(),qs(".js-objects")&&this.objects(),qs(".js-file")&&this.jsFile(),qs(".js-select-file")&&this.selectFile(),qs(".js-tabs-location")&&this.tabsLocation(),qs(".js-tippy")&&this.mainTippy(),qsAll(".js-play-video").length&&this.playMP4video(),qsAll(".js-popup").length&&this.tingleModal(),qs(".ihead__scroll-next")&&qs(".ihead__scroll-next").addEventListener("click",function(){var e=getParent(this,"ihead").offsetHeight;window.scrollTo({top:e,behavior:"smooth"})});var e,t,i;qsAll(e=".text table").length&&qsAll(e).forEach(function(e){var t=document.createElement("div");t.classList.add("table-wrap"),e.parentElement.insertBefore(t,e),t.appendChild(e)});try{t=new Event("resize")}catch(e){(t=document.createEvent("Event")).initEvent("resize",!1,!1)}window.dispatchEvent(t);try{i=new Event("scroll")}catch(e){(i=document.createEvent("Event")).initEvent("scroll",!1,!1)}return window.dispatchEvent(i),this}}.init()});
//# sourceMappingURL=own.js.map