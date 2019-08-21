"use strict";

function qs(query, root = document) {
  return root.querySelector(query);
}

function qsAll(query, root = document) {
  return root.querySelectorAll(query);
}

function getParent(el, findParent) {
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.classList && el.classList.contains(findParent)) return el;
  }
  return false;
}

let videos, videosGalleryBig;
const pauseVideos = (activeSlide, allVideos, sliderSpeed) => {
  const speed = sliderSpeed ? sliderSpeed : 0;
  const arrVideos = allVideos;
  const activeVideo = activeSlide.querySelector('video');
  if (arrVideos && arrVideos.length) {
    arrVideos.forEach((video) => {
      video.onerror = function () {
        console.log("Error with media: " + video.error.code);
      }
      if (video.hasAttribute('data-stid')) {
        clearTimeout(video.getAttribute('data-stid'));
        video.removeAttribute('data-stid');
      }
      video.pause();
      if (video && activeVideo) {
        if (!activeVideo.isEqualNode(video)) {
          let id = setTimeout(() => {
            if (!isNaN(video.duration)) video.currentTime = 0;
            video.removeAttribute('data-stid');
          }, speed);
          video.setAttribute('data-stid', id);
        } else {
          //activeVideo.play();
        }
      } else {
        setTimeout(() => {
          if (!isNaN(video.duration)) video.currentTime = 0;
        }, sliderSpeed);
      }
    });
  }
};

const resetForm = (itemForm) => {
  ['error', 'no-empty'].forEach(item => qsAll(`.${item}`, itemForm).forEach(elem => elem.classList.remove(item)));
  itemForm.reset();
};

window.modal;

window.onload = () => qs('body').classList.add('page-loaded');

if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) qs('body').classList.add('ios');

document.addEventListener("DOMContentLoaded", function (event) {

  window.arhmedstroy = {};

  window.arhmedstroy.form = ({

    init: function () {

      const _th = this,
        inputs = qsAll('.form__field-input, .form__field-textarea'),
        forms = qsAll('form'),
        digitsInput = qsAll('.js-digits');

      function emptyCheck(event) {
        event.target.value.trim() === '' ?
          event.target.classList.remove('not-empty') :
          event.target.classList.add('not-empty')
      }

      for (let item of inputs) {
        item.addEventListener('keyup', emptyCheck)
        item.addEventListener('blur', emptyCheck)
      }

      for (let form of forms) {
        form.addEventListener('submit', (e) => {
          return !_th.checkForm(form) && e.preventDefault()
        })
      }

      for (let digitInput of digitsInput) {
        digitInput.addEventListener('keydown', (e) => {
          let validArr = [46, 8, 9, 27, 13, 110, 190]
          if (validArr.indexOf(e.keyCode) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
          }
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault()
          }
        });
      }

      return this
    },

    checkForm: function (form) {
      let checkResult = true;
      const warningElems = form.querySelectorAll('.error');

      if (warningElems.length) {
        for (let warningElem of warningElems) {
          warningElem.classList.remove('error')
        }
      }

      for (let elem of form.querySelectorAll('input, textarea, select')) {
        if (elem.getAttribute('data-req')) {
          switch (elem.getAttribute('data-type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test(elem.value)) {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test(elem.value)) {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            case 'file':
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            default:
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
          }
        }
      }

      for (let item of form.querySelectorAll('input[data-req^=agreement]')) {
        if (!item.checked) {
          item.classList.add('error')
          checkResult = false
        }
      }

      return checkResult
    }

  }).init()

  window.dataMap = [
    {
      id: 11, //г. Москва, ул. Арбат, 10
      coords: "55.751381, 37.596669",
    },
    {
      id: 15, //г. Москва, 3-я улица Ямского Поля, 9
      coords: "55.781792, 37.580362",
    },
    {
      id: 35, //г. Москва, улица Казакова, 15с4
      coords: "55.763532, 37.663780",
    }
  ]

  window.arhmedstroy.map = ({

    map: function () {

      const pin = 'static/img/pin.png',
        pinHover = 'static/img/pin-hover.png';

      const centerMap = qs('.js-map-projects').dataset.center ? qs('.js-map-projects').dataset.center.split(',') : ["55.755814", " 37.617635"];

      ymaps.ready(function () {

        function yaMapInit() {
          var myMap = new ymaps.Map("yaMapPrj", {
            center: [centerMap[0], centerMap[1]],
            zoom: 13,
            controls: ["zoomControl"],
            behaviors: ["drag"]
          });

          if (typeof window.dataMap !== 'undefined') {
            window.dataMap.forEach((item) => {
              myMap.geoObjects.add(new ymaps.Placemark(item.coords.split(', '), {
                myid: item.id
              }, {
                iconLayout: 'default#image',
                iconImageHref: pin,
                iconImageSize: [29, 49]
              }));
            });
          }

          myMap.geoObjects.events.add('click', function (e) {
            const object = e.get('target'),
              objectId = object.properties._data.myid;

            let htmlPopup;

            console.log(objectId);

            ymaps.geoQuery(myMap.geoObjects).searchIntersect(myMap).each(function (e) {
              e.options.set({
                iconImageHref: pin
              });
            });

            htmlPopup = '<div class="prj-popup">' +
              ' <div class="prj-popup__overimg">' +
              '   <img class="prj-popup__img" src="static/img/prj-popup-img.jpg" alt="" role="presentation">' +
              ' </div>' +
              ' <div class="prj-popup__info">' +
              '   <a class="prj-popup__title" href="#">ТЦ Галерея 76</a>' +
              '   <address class="prj-popup__address">г. Москва, ул. Арбат, 10</address>' +
              '   <p class="prj-popup__descr">Торгово-офисный комплекс «Галерея 76» расположен на первой линии Профсоюзной улицы, в 5 минутах ходьбы от метро  «Калужская» и в 14 минутах – от метро «Новые Черемушки».</p>' +
              '   <div class="prj-popup__right-bottom">' +
              '     <ul class="prj-popup__list">' +
              '       <li class="prj-popup__list-item">' +
              '         <p class="prj-popup__list-item-title">Стоимость</p>' +
              '         <p class="prj-popup__list-item-data">от <span>170 000</span> руб за м<sup>2</sup></p>' +
              '       </li>' +
              '       <li class="prj-popup__list-item">' +
              '         <p class="prj-popup__list-item-title">Площадь</p>' +
              '         <p class="prj-popup__list-item-data"> <span>22 183</span> м<sup>2</sup></p>' +
              '       </li>' +
              '     </ul>' +
              '   </div>' +
              ' </div>' +
              '</div>';

            let MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
              htmlPopup
            );

            e.get('target').options.set({
              iconImageHref: pinHover,
              balloonContentLayout: MyBalloonContentLayoutClass
            });

          }).add('mouseenter', function (e) {
            e.get('target').options.set({
              iconImageHref: pinHover
            });
          }).add('mouseleave', function (e) {
            e.get('target').options.set({
              iconImageHref: pin
            });
          });

          myMap.geoObjects.events.add('balloonclose', function (e) {
            myMap.balloon.close();
          });

        }

        yaMapInit();

      });

    },

    init: function () {

      var _th = this;

      if (qs('.js-map-projects')) _th.map();

      return this;

    }

  }).init();

  window.arhmedstroy.preloader = ({

    showPreloader: function showPreloader(selector) {
      qs(selector).classList.add('preloader');
    },

    hidePreloader: function hidePreloader(selector) {
      qs(selector).classList.remove('preloader');
    },

    init: function init() {

      const _self = this;

      if (qs('.js-example-preloader')) {
        qs('.js-example-preloader').addEventListener('click', (e) => {
          _self.showPreloader('body');
          e.preventDefault();
        });
      }

    }

  }).init();

  window.arhmedstroy.obj = {

    slideUp: function slideUp(selector, duration, cb = null) {
      if (!selector)
        return;
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      element.style.height = element.offsetHeight + 'px';
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = duration + 'ms';
      element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
      }, duration);
    },

    slideDown: function slideDown(selector, duration, cb = null) {
      if (!selector)
        return;
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let display = getComputedStyle(element).display;
      element.style.removeProperty('display');
      if (display === 'none') display = 'block';
      element.style.display = display;
      let height = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      element.offsetHeight;
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = duration + 'ms';
      element.style.height = height + 'px';
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
      }, duration);
    },

    slideToogle: function slideToogle(selector, duration, cb = null) {
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let display = getComputedStyle(element).display;
      if (display === 'none') this.slideDown(element, duration, cb)
      else this.slideUp(element, duration, cb)
    },

    fadeOut: function fadeOut(selector, duration, cb = null) {
      if (!selector) return;
      let element,
        op = 1;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          element.style.display = 'none';
          if (cb) cb();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      }, duration / 50 || 20);
    },

    fadeIn: function fadeIn(selector, duration, cb = null) {
      if (!selector)
        return;
      let element,
        op = 0.1,
        typeBlock = 'block';
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      element.style.opacity = 0;
      element.style.display = typeBlock;
      let timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
          if (cb) cb();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, duration / 50 || 20);
    },

    anim: function () {

      let elemsAnimArr = ['.js-scroll-anim'];

      function visChecker(el) {
        const rect = el.getBoundingClientRect();
        const wHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= (wHeight * 0.75);
      }

      function elemVisCheck(elArray) {
        window.addEventListener('scroll', () => {
          if (elArray.length) {
            elArray.forEach((item) => {
              if (qsAll(item).length) {
                qsAll(item).forEach((elem) => {
                  if (visChecker(elem)) elem.classList.add('start-animate');
                });
              }
            });
          }
        });
      }

      if (elemsAnimArr.length) elemVisCheck(elemsAnimArr);

    },

    newsPreviewSwiper: function newsPreviewSwiper() {

      const newsPreviewSwiper = new Swiper('.js-news-preview-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 3,
        spaceBetween: 19,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.news-preview .swiper-button-next',
          prevEl: '.news-preview .swiper-button-prev',
        },
        pagination: {
          el: '.news-preview .swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          992: {
            slidesPerView: 1
          },
          1800: {
            slidesPerView: 2
          },
        }
      });

    },

    galleryMixed: function galleryMixed() {

      const galleryMixedSwiper = new Swiper('.js-media-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 3,
        spaceBetween: 30,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.gallery--mixed .swiper-button-next',
          prevEl: '.gallery--mixed .swiper-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: 1
          },
          1900: {
            slidesPerView: 2
          },
        }
      });

    },

    galleryBig: function galleryBig(parent) {

      let swiperSpeed = 700;

      let spaceSlides = 16,
        countStart = 7,
        countMax1900 = 5,
        countMax1366 = 4,
        countMax767 = 3;

      if (getParent(qs('.js-gallery-thumbs'), 'gallery-big--popup')) {
        spaceSlides = 12;
        countStart = 8;
        countMax1900 = 7;
        countMax1366 = 6;
        countMax767 = 4;
      }

      let galleryThumbs = new Swiper(parent + ' .js-gallery-thumbs', {
        spaceBetween: spaceSlides,
        slidesPerView: countStart,
        speed: swiperSpeed,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
          480: {
            slidesPerView: 2
          },
          767: {
            slidesPerView: countMax767
          },
          1366: {
            slidesPerView: countMax1366
          },
          1900: {
            slidesPerView: countMax1900
          },
        }
      });

      let galleryTop = new Swiper(parent + ' .js-gallery-top', {
        spaceBetween: 10,
        speed: swiperSpeed,
        navigation: {
          nextEl: parent + ' .gallery-big__top .swiper-button-next',
          prevEl: parent + ' .gallery-big__top .swiper-button-prev',
        },
        fadeEffect: {
          crossFade: true
        },
        effect: 'fade',
        thumbs: {
          swiper: galleryThumbs
        },
        on: {
          init: function () {
            if (!getParent(this, 'hidden-block')) {
              videosGalleryBig = [...qsAll(parent + ' .gallery-big__slide video')];
              let activeSlide = this.slides[this.activeIndex];
              pauseVideos(activeSlide, videosGalleryBig, swiperSpeed);
              if (qsAll(parent + ' .gallery-big__slide.control-hidden').length) {
                qsAll(parent + ' .gallery-big__slide.control-hidden').forEach(item => item.classList.remove('control-hidden'));
              }
            }
          },
          slideChange: function () {
            if (!getParent(this, 'hidden-block')) {
              let activeSlide = this.slides[this.activeIndex];
              pauseVideos(activeSlide, videosGalleryBig, swiperSpeed);
              if (qsAll(parent + ' .gallery-big__slide.control-hidden').length) {
                qsAll(parent + ' .gallery-big__slide.control-hidden').forEach(item => item.classList.remove('control-hidden'));
              }
            }
          },
          transitionEnd: function () {
            const iframes = qsAll(parent + ' .swiper-slide-prev iframe, ' + parent + ' .swiper-slide-next iframe', this.$el[0]);
            if (iframes.length) iframes.forEach(item => item.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'));
          },
        }
      });

    },

    projectsSwiper: function projectsSwiper() {

      let countStart = 4,
        countMax1640 = 3,
        countMax1366 = 3;

      if (getParent(qs('.js-projects-swiper'), 'main__left')) {
        countStart = 3;
        countMax1640 = 3;
        countMax1366 = 2;
      }

      const projectsSwiper = new Swiper('.js-projects-swiper', {
        loop: false,
        speed: 700,
        slidesPerView: countStart,
        spaceBetween: 30,
        navigation: {
          nextEl: '.projects .swiper-button-next',
          prevEl: '.projects .swiper-button-prev',
        },
        breakpoints: {
          667: {
            slidesPerView: 1
          },
          992: {
            slidesPerView: 2
          },
          1366: {
            slidesPerView: countMax1366
          },
          1640: {
            slidesPerView: countMax1640
          },
        }
      });

    },

    cardProjectsSwiper: function cardProjectsSwiper() {

      const cardProjectsSwiper = new Swiper('.js-card-projects-swiper', {
        loop: false,
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.card-projects .swiper-button-next',
          prevEl: '.card-projects .swiper-button-prev',
        }
      });

    },

    projectsPhotosSwiper: function projectsPhotosSwiper() {

      const photosSwiper = new Swiper('.js-projects-photos-swiper', {
        loop: false,
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });

    },

    partnersSwiper: function partnersSwiper() {

      let countStart = 6,
        countMax1640 = 4,
        countMax1366 = 4;

      if (getParent(qs('.js-swiper-partners'), 'main__left')) {
        countStart = 4;
        countMax1640 = 4;
        countMax1366 = 3;
      }

      const partnersSwiper = new Swiper('.js-swiper-partners', {
        loop: false,
        speed: 700,
        slidesPerView: countStart,
        spaceBetween: 0,
        autoplay: {
          delay: 2000,
        },
        pagination: {
          el: '.partners .swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          480: {
            slidesPerView: 1
          },
          667: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 3
          },
          1366: {
            slidesPerView: countMax1366
          },
          1640: {
            slidesPerView: countMax1640
          },
        }
      });

    },

    partnGalleryCarousel: function partnGalleryCarousel() {

      const partnersSwiper = new Swiper('.js-gallery-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.gallery-carousel .swiper-button-next',
          prevEl: '.gallery-carousel .swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
      });

    },

    topBannerSwiper: function topBannerSwiper() {

      const topBannerSwiper = new Swiper('.js-top-banner-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 0,
        // autoplay: {
        //   delay: 2000,
        // },
        navigation: {
          nextEl: '.top-banner .swiper-button-next',
          prevEl: '.top-banner .swiper-button-prev',
        }
      });

    },

    bannerCarousel: function bannerCarousel() {

      const bannerSwiper = new Swiper('.js-banner-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.banner-carousel .swiper-button-next',
          prevEl: '.banner-carousel .swiper-button-prev',
        }
      });

    },

    mediaGallery: function mediaGallery() {

      const swiperSpeed = 700;
      const mediaGallerySwiper = new Swiper('.js-media-gallery', {
        loop: true,
        speed: swiperSpeed,
        slidesPerView: 1,
        spaceBetween: 0,
        // autoplay: {
        //   delay: 2000,
        // },
        navigation: {
          nextEl: '.media-gallery .swiper-button-next',
          prevEl: '.media-gallery .swiper-button-prev',
        },
        on: {
          init: function () {
            videos = [...qsAll('.media-gallery video')];
            let activeSlide = this.slides[this.activeIndex];
            pauseVideos(activeSlide, videos, swiperSpeed);
            if (qsAll('.media-gallery__video.control-hidden').length) {
              qsAll('.media-gallery__video.control-hidden').forEach(item => item.classList.remove('control-hidden'));
            }
          },
          slideChange: function () {
            let activeSlide = this.slides[this.activeIndex];
            pauseVideos(activeSlide, videos, swiperSpeed);
            if (qsAll('.media-gallery__video.control-hidden').length) {
              qsAll('.media-gallery__video.control-hidden').forEach(item => item.classList.remove('control-hidden'));
            }
          },
        }
      });

    },

    clientsSwiper: function clientsSwiper() {

      const clientsSwiper = new Swiper('.js-clients-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 5,
        spaceBetween: 0,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.clients .swiper-button-next',
          prevEl: '.clients .swiper-button-prev',
        },
        breakpoints: {
          400: {
            slidesPerView: 1
          },
          580: {
            slidesPerView: 2
          },
          767: {
            slidesPerView: 3
          },
          1365: {
            slidesPerView: 4
          },
        }
      });

    },

    newsSwiper: function newsSwiper() {

      let countStart = 3,
        countMax1366 = 2,
        countMax992 = 2,
        countMax667 = 1;

      if (getParent(qs('.js-news-swiper'), 'publications--head')) {
        countStart = 4,
          countMax1366 = 3,
          countMax992 = 3,
          countMax667 = 2;
      }

      const newsSwiper = new Swiper('.js-news-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: countStart,
        spaceBetween: 30,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.publications--carousel .swiper-button-next',
          prevEl: '.publications--carousel .swiper-button-prev',
        },
        breakpoints: {
          480: {
            slidesPerView: 1
          },
          667: {
            slidesPerView: countMax667
          },
          992: {
            slidesPerView: countMax992
          },
          1366: {
            slidesPerView: countMax1366
          }
        }
      });

    },

    spheresSwiper: function spheresSwiper() {

      const spheresSwiper = new Swiper('.js-spheres-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 3,
        spaceBetween: 30,
        // autoplay: {
        //   delay: 2000,
        // },
        navigation: {
          nextEl: '.spheres .swiper-button-next',
          prevEl: '.spheres .swiper-button-prev',
        },
        breakpoints: {
          667: {
            slidesPerView: 1
          },
          1366: {
            slidesPerView: 2
          }
        }
      });

    },

    reviewsSwiper: function reviewsSwiper() {

      const reviewsSwiper = new Swiper('.js-reviews-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 2,
        spaceBetween: 30,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.reviews .swiper-button-next',
          prevEl: '.reviews .swiper-button-prev',
        },
        pagination: {
          el: '.reviews .swiper-pagination',
          type: 'fraction',
        },
        breakpoints: {
          1366: {
            slidesPerView: 1
          }
        }
      });

    },

    awardsSwiper: function awardsSwiper() {

      const awardsSwiper = new Swiper('.js-swiper-awards', {
        loop: true,
        speed: 700,
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: '.awards .swiper-button-next',
          prevEl: '.awards .swiper-button-prev',
        },
        pagination: {
          el: '.awards .swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 2000,
        },
        breakpoints: {
          480: {
            slidesPerView: 1
          },
          767: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 3
          }
        }
      });

    },

    aboutSwiper: function aboutSwiper() {

      const aboutSwiper = new Swiper('.js-about-swiper', {
        loop: false,
        speed: 700,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: '.about-popup .swiper-button-next',
          prevEl: '.about-popup .swiper-button-prev',
        },
      });

    },

    historySuccessSwiper: function historySuccessSwiper() {

      const historySuccessSwiper = new Swiper('.js-swiper-history-success', {
        loop: false,
        speed: 700,
        slidesPerView: 'auto',
        spaceBetween: 0,
        navigation: {
          nextEl: '.history-success .swiper-button-next',
          prevEl: '.history-success .swiper-button-prev',
        },
      });

    },

    teamsSwiper: function teamsSwiper() {

      let space = 70,
        countStart = 4,
        countMax992 = 3,
        countMax767 = 2;

      if (getParent(qs('.js-teams-swiper'), 'main__left')) {
        space = 57,
          countStart = 3,
          countMax992 = 3;
        countMax767 = 2;
      }

      const teamsSwiper = new Swiper('.js-teams-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: countStart,
        spaceBetween: space,
        autoplay: {
          delay: 2000,
        },
        navigation: {
          nextEl: '.team-carousel .swiper-button-next',
          prevEl: '.team-carousel .swiper-button-prev',
        },
        breakpoints: {
          479: {
            spaceBetween: 30,
            slidesPerView: 1
          },
          767: {
            spaceBetween: 30,
            slidesPerView: countMax767
          },
          992: {
            spaceBetween: 30,
            slidesPerView: countMax992
          },
          1366: {
            spaceBetween: 30,
          },
          1440: {
            spaceBetween: 30,
          }
        }
      });

    },

    headerPaint: function headerPaint() {

      const header = qs('.header'),
        headerHeight = header.offsetHeight;

      window.addEventListener('scroll', () => {
        if (window.pageYOffset > headerHeight) header.classList.add('header--white');
        else header.classList.remove('header--white');
      });

    },

    choicesSelect: function choicesSelect() {

      qsAll('.js-select').forEach((item) => {
        new Choices(item, {
          placeholder: true,
          searchEnabled: false,
          itemSelectText: '',
          classNames: {
            containerOuter: 'choices choices--custom',
          }
        });
      });

      // let selectsArr = qsAll('.js-select');

      // selectsArr = new Choices('.js-select', {
      //   placeholder: true,
      //   searchEnabled: false,
      //   itemSelectText: '',
      //   classNames: {
      //     containerOuter: 'choices choices--custom',
      //   }
      // });

    },

    sticky: function sticky() {

      const stickyNav = new StickySidebar('.main__right', {
        containerSelector: '.main__row',
        innerWrapperSelector: '.js-sticky',
        topSpacing: 100,
        bottomSpacing: 20
      });

      window.addEventListener('resize', () => {
        setTimeout(() => {
          window.innerWidth < 1023 ? stickyNav.destroy() : stickyNav.updateSticky();
        }, 1);
      });

    },

    toogleArchive: function toogleArchive() {
      let _self = this;

      qs('.js-toogle-archive').addEventListener('click', function (e) {
        if (this.previousElementSibling && this.previousElementSibling.classList.contains('archive__hidden')) {
          _self.slideToogle(this.previousElementSibling, 350);
          if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.innerText = 'Показать все года';
          } else {
            this.classList.add('active');
            this.innerText = 'Свернуть';
          }
        }
        e.preventDefault();
      });

    },

    toogleVacancy: function toogleVacancy() {

      const _self = this;

      qsAll('.js-toogle-vacancy').forEach((item) => {

        item.addEventListener('click', function (e) {
          let textBtn = qs('.vacancy__item-btn-text', this),
            parents = getParent(this, 'vacancy__item'),
            hiddenContent = qs('.vacancy__item-content', parents);

          if (this.classList.contains('active')) {
            textBtn.innerText = 'Подробности';
            this.classList.remove('active');
            parents.classList.remove('open');
            _self.slideUp(hiddenContent, 350);
          } else {
            textBtn.innerText = 'Свернуть';
            this.classList.add('active');
            parents.classList.add('open');
            _self.slideDown(hiddenContent, 350);
          }

          e.preventDefault();
        });

      });

    },

    jsFile: function jsFile() {
      let inputFile = qs('.js-file'),
        fileItems;
      inputFile.addEventListener('change', function () {
        let _t = this,
          over = getParent(_t, 'uploaded-file'),
          error = qs('.uploaded-file__error', over),
          fileItems = over.querySelector('.uploaded-file__items'),
          fileItemDiv = document.createElement('div');

        if (_t.files[0].size < 50000000) {
          error.style.display = "none";
          if (_t.files.length && fileItems) {
            fileItemDiv.classList.add('uploaded-file__item');
            fileItemDiv.innerHTML = '<p class="uploaded-file__item-name">' + _t.files[0].name + '</p><button class="uploaded-file__item-del-btn js-del-file" type="button"></button>';
            fileItems.appendChild(fileItemDiv);
            if (!over.classList.contains('uploaded-file--no-empty')) {
              over.classList.add('uploaded-file--no-empty');
            }
          }
        } else {
          error.style.display = "block";
        }

      });

      document.onclick = function (e) {
        if (e.target.classList.contains('js-del-file')) {
          let _t = e.target,
            over = getParent(_t, 'uploaded-file'),
            input = over.querySelector('.uploaded-file__input');
          _t.parentNode.remove();
          if (input && !qsAll('.uploaded-file__item', over).length) {
            over.classList.remove('uploaded-file--no-empty');
            input.value = '';
          }
          e.preventDefault();
        }
      }

    },

    objects: function objects() {

      const elems = qsAll('.js-objects .objects__item'),
        projects = qs('.projects');

      if (elems.length && projects) {
        elems.forEach((item) => {
          item.addEventListener('click', function (e) {
            const _th = this,
              _thDataId = _th.dataset.objects;
            window.scroll({
              left: 0,
              top: projects.offsetTop - qs('.header').offsetHeight - 28,
              behavior: 'smooth'
            });
            e.preventDefault();
          });
        });
      }

      window.addEventListener('scroll', function (event) {});

    },

    selectFile: function selectFile() {

      const hrefs = qsAll('.js-select-file .action__download-list-href');

      hrefs.forEach((item) => {
        item.addEventListener('click', function (e) {
          let attrHref = this.getAttribute('href'),
            over = getParent(this, 'action__download'),
            btn = qs('.action__download-btn', over),
            title = qs('.action__download-type-title', over);
          if (!this.classList.contains('active')) {
            hrefs.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            btn.href = attrHref;
            title.innerText = attrHref.split('.')[1];
          }
          e.preventDefault();
        });
      });

    },

    tabsLocation: function tabsLocation() {

      const _self = this,
        tabsBtn = qsAll('.js-tabs-location .contacts__location-list-btn');

      tabsBtn.forEach((item) => {
        item.addEventListener('click', function (e) {
          let _t = this;
          if (!_t.classList.contains('contacts__location-list-btn--active')) {
            qs('.contacts__location-list-btn--active').classList.remove('contacts__location-list-btn--active');
            _t.classList.add('contacts__location-list-btn--active');
            _self.fadeOut('.contacts__location-tabs-item--active', 300, function () {
              qs('.contacts__location-tabs-item--active').classList.remove('contacts__location-tabs-item--active');
              if (qs('.contacts__location-tabs-item[data-tabs-item="' + _t.dataset.tabsNav + '"]')) {
                _self.fadeIn('.contacts__location-tabs-item[data-tabs-item="' + _t.dataset.tabsNav + '"]', 300, function () {
                  qs('.contacts__location-tabs-item[data-tabs-item="' + _t.dataset.tabsNav + '"]').classList.add('contacts__location-tabs-item--active');
                });
              }
            });
          }
          e.preventDefault();
        });
      });

    },

    burger: function burger() {
      qs('.js-burger').addEventListener('click', function (e) {
        this.classList.toggle('active');
        qs('.main__aside').classList.toggle('show');
        qs('body').classList.toggle('open-menu');
        e.preventDefault();
      });
    },

    mainTippy: function mainTippy() {

      new Tippy('.js-tippy', {
        position: 'top',
        arrow: true,
        offset: [64, 0]
      });

    },

    playMP4video: function playMP4video(parent) {

      const parentOver = parent ? parent : '';

      qsAll(parentOver + ' .js-play-video').forEach((item)=> {

        item.addEventListener('click', function (e) {
          this.nextElementSibling.play();
          if (getParent(this, 'media-gallery__video')) getParent(this, 'media-gallery__video').classList.add('control-hidden');
          if (getParent(this, 'gallery-big__slide')) getParent(this, 'gallery-big__slide').classList.add('control-hidden');
          e.preventDefault();
        });

      });

    },

    tingleModal: function tingleModal() {

      const _self = this;

      window.modal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'escape'],
        closeLabel: "Закрыть",
        cssClass: ['modal--overflow'],
        beforeOpen: function (event) {
          if (qs('.tingle-modal .js-about-swiper')) {
            setTimeout(() => {
              _self.aboutSwiper();
            }, 5);
          }
          setTimeout(() => {
            _self.galleryBig('.tingle-modal');
            _self.playMP4video('.tingle-modal');
          }, 10);
          if (qs('.tingle-modal .gallery-big--popup')) qs('.tingle-modal').classList.add('tingle-modal--dark-overlay');
        },
        onOpen: function () {
          if (qs('.tingle-modal form')) window.arhmedstroy.form.init();
          if (qs('.tingle-modal .js-close-popup')) qs('.tingle-modal .js-close-popup').addEventListener('click', () => window.modal.close());
        },
        onClose: function () {
          if (qsAll('.js-about-swiper.swiper-container-initialized').length) {
            qsAll('.js-about-swiper.swiper-container-initialized').forEach((item) => item.swiper.destroy(true, true));
          }
          if (qsAll('.popup .js-gallery-top.swiper-container-initialized').length) {
            qsAll('.popup .js-gallery-top.swiper-container-initialized').forEach((item) => item.swiper.destroy(true, true));
          }
          if (qsAll('.popup .js-gallery-thumbs.swiper-container-initialized').length) {
            qsAll('.popup .js-gallery-thumbs.swiper-container-initialized').forEach((item) => item.swiper.destroy(true, true));
          }
          if (qs('body .tingle-modal-box__content')) qs('body .tingle-modal-box__content').innerHTML = '';
        }
      });

      if (qsAll('.js-popup').length) {
        qsAll('.js-popup').forEach((item) => {
          item.addEventListener('click', function (e) {
            let dataDate, dataTitle;
            if (this.classList.contains('gallery__item-overimg')) {
              dataDate = this.dataset.date && this.dataset.date != '' ? this.dataset.date : '';
              dataTitle = this.dataset.title && this.dataset.title != '' ? this.dataset.title : '';
            }
            if (qs('.popup[id="' + this.getAttribute('href').substring(1) + '"]')) {
              let popupItem = qs('.popup[id="' + this.getAttribute('href').substring(1) + '"]');
              if (qs('.gallery-info__title', popupItem) && dataTitle != undefined) qs('.gallery-info__title', popupItem).innerText = dataTitle;
              if (qs('.gallery-info__date', popupItem) && dataDate != undefined) qs('.gallery-info__date', popupItem).innerText = dataDate;
              window.modal.setContent(qs('.popup[id="' + this.getAttribute('href').substring(1) + '"]').outerHTML);
              window.modal.open();
            }
            e.preventDefault();
          });
        });
      }

    },

    init: function init() {

      const _self = this;

      if (qs('.js-burger')) this.burger();

      if (qs('.js-news-preview-swiper')) this.newsPreviewSwiper();

      if (qs('.js-projects-swiper')) this.projectsSwiper();

      if (qs('.js-projects-photos-swiper')) this.projectsPhotosSwiper();

      if (qs('.js-swiper-partners')) this.partnersSwiper();

      if (qs('.js-gallery-swiper')) this.partnGalleryCarousel();

      if (qs('.js-banner-swiper')) this.bannerCarousel();

      if (qs('.js-top-banner-swiper')) this.topBannerSwiper();

      if (qs('.js-media-swiper')) this.galleryMixed();

      if (qs('.js-clients-swiper')) this.clientsSwiper();

      if (qs('.js-news-swiper')) this.newsSwiper();

      if (qs('.js-spheres-swiper')) this.spheresSwiper();

      if (qs('.js-reviews-swiper')) this.reviewsSwiper();

      if (qs('.js-teams-swiper')) this.teamsSwiper();

      if (qs('.main .js-gallery-top') && qs('.main .js-gallery-thumbs')) this.galleryBig('.main');

      if (qs('.js-swiper-awards')) this.awardsSwiper();

      if (qs('.js-media-gallery')) this.mediaGallery();

      if (qs('.js-swiper-history-success')) this.historySuccessSwiper();

      if (qs('.js-card-projects-swiper')) this.cardProjectsSwiper();

      if (qs('body.index')) this.headerPaint();

      if (qs('.js-sticky')) this.sticky();

      if (qsAll('.js-select')) this.choicesSelect();

      if (qs('.js-toogle-archive')) this.toogleArchive();

      if (qsAll('.js-toogle-vacancy').length) this.toogleVacancy();

      if (qs('.js-objects')) this.objects();

      if (qs('.js-file')) this.jsFile();

      if (qs('.js-select-file')) this.selectFile();

      if (qs('.js-tabs-location')) this.tabsLocation();

      if (qs('.js-tippy')) this.mainTippy();

      if (qsAll('.js-play-video').length) this.playMP4video();

      if (qsAll('.js-popup').length) this.tingleModal();

      if (qs('.ihead__scroll-next')) {
        qs('.ihead__scroll-next').addEventListener('click', function () {
          const height = getParent(this, 'ihead').offsetHeight;
          window.scrollTo({
            top: height,
            behavior: "smooth"
          });
        });
      }

      let wrap = (query) => {
        if (qsAll(query).length) {
          qsAll(query).forEach(elem => {
            const div = document.createElement('div');
            div.classList.add('table-wrap');
            elem.parentElement.insertBefore(div, elem);
            div.appendChild(elem);
          });
        }
      };

      wrap('.text table');

      let eventResize
      try {
        eventResize = new Event('resize')
      } catch (e) {
        eventResize = document.createEvent('Event');
        eventResize.initEvent('resize', false, false);
      }
      window.dispatchEvent(eventResize)

      let eventScroll
      try {
        eventScroll = new Event('scroll')
      } catch (e) {
        eventScroll = document.createEvent('Event');
        eventScroll.initEvent('scroll', false, false);
      }
      window.dispatchEvent(eventScroll)

      return this;
    }

  }.init();

});

