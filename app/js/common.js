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

const resetForm = (itemForm) => {
  ['error', 'no-empty'].forEach(item => qsAll(`.${item}`, itemForm).forEach(elem => elem.classList.remove(item)));
  itemForm.reset();
};

window.onload = () => qs('body').classList.add('page-loaded');

if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) qs('body').classList.add('ios');

document.addEventListener("DOMContentLoaded", function (event) {

  window.ir = {};

  window.ir.form = ({

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
                elem.classList.add('error')
                checkResult = false
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test(elem.value)) {
                elem.classList.add('error')
                checkResult = false
              }
              break;
            case 'file':
              if (elem.value.trim() === '') {
                elem.classList.add('error')
                checkResult = false
              }
              break;
            default:
              if (elem.value.trim() === '') {
                elem.classList.add('error')
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

  window.ir.obj = {

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

    fadeToggle: function fadeToggle(selector, duration, cb = null) {
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let display = getComputedStyle(element).display;
      if (display === 'none') {
        this.fadeIn(element, duration, cb);
      } else {
        this.fadeOut(element, duration, cb);
      }
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

    inavFixed: function inavFixed() {
      const inav = qs('.inav'),
        inavHeight = inav.offsetHeight,
        offsetTop = inav.offsetTop;
      window.addEventListener('resize', () => {
        window.addEventListener('scroll', () => {
          if (window.innerWidth > 1239) {
            qs('.header').classList.contains('fixed') ? qs('.header').classList.remove('fixed') : ''
            if (window.pageYOffset > offsetTop) {
              if (!inav.classList.contains('inav--fixed')) inav.classList.add('inav--fixed')
            } else if (inav.classList.contains('inav--fixed')) {
              inav.classList.remove('inav--fixed');
            }
          } else {
            inav.classList.contains('inav--fixed') ? inav.classList.remove('inav--fixed') : '';
            if (qs('.header').offsetHeight < window.pageYOffset) {
              !qs('.header').classList.contains('fixed') ? qs('.header').classList.add('fixed') : ''
            } else if (qs('.header').classList.contains('fixed')) {
              qs('.header').classList.remove('fixed')
            }
          }
        });
      });
    },

    burger: function burger() {
      qs('.js-burger').addEventListener('click', function (e) {
        this.classList.toggle('active');
        qs('.nav').classList.toggle('open');
        qs('body').classList.toggle('open-menu');
        e.preventDefault();
      });
    },

    tabsLocation: function tabsLocation() {

      const _self = this,
        tabsBtn = qsAll('.js-tabs .iserv__tabs-nav-btn');

      tabsBtn.forEach((item) => {
        item.addEventListener('click', function (e) {
          let _t = this;
          if (!_t.classList.contains('iserv__tabs-nav-btn--active')) {
            qs('.iserv__tabs-nav-btn--active').classList.remove('iserv__tabs-nav-btn--active');
            _t.classList.add('iserv__tabs-nav-btn--active');
            _self.fadeOut('.iserv__tabs-item--active', 300, function () {
              qs('.iserv__tabs-item--active').classList.remove('iserv__tabs-item--active');
              if (qs('.iserv__tabs-item[data-tabs-item="' + _t.dataset.tabsNav + '"]')) {
                _self.fadeIn('.iserv__tabs-item[data-tabs-item="' + _t.dataset.tabsNav + '"]', 300, function () {
                  qs('.iserv__tabs-item[data-tabs-item="' + _t.dataset.tabsNav + '"]').classList.add('iserv__tabs-item--active');
                });
              }
            });
          }
          e.preventDefault();
        });
      });

    },

    ireviewSwiper: function ireviewSwiper() {

      const ireview = new Swiper('.js-ireview-swiper', {
        loop: true,
        speed: 700,
        slidesPerView: 'auto',
        spaceBetween: 36,
        centeredSlides: true,
        navigation: {
          nextEl: '.ireview .swiper-button-next',
          prevEl: '.ireview .swiper-button-prev',
        },
        breakpoints: {
          767: {
            autoHeight: true
          },
        }
      });

    },

    map: function map() {

      const pin = '/static/img/pin.png',
        coordsCenter = qs('.js-map').dataset.coords.split(',');

      ymaps.ready(function () {

        function yaMapInit() {
          const myMap = new ymaps.Map("yaMap", {
            center: [coordsCenter[0], coordsCenter[1]],
            zoom: 17,
            controls: [],
            behaviors: ["drag"]
          });

          myMap.controls.add('zoomControl', { size: 'small' });

          myMap.geoObjects.add(new ymaps.Placemark([coordsCenter[0], coordsCenter[1]] , {}, {
            iconLayout: 'default#image',
            iconImageHref: pin,
            iconImageSize: [46, 58],
            iconImageOffset: [-15, -65]
          }));

        }

        yaMapInit();

      });

    },

    init: function init() {

      const _self = this;

      if (qs('.inav')) this.inavFixed();

      if (qsAll('.js-scroll-anim').length) this.anim();

      if (qs('.js-tabs')) this.tabsLocation();

      if (qs('.js-ireview-swiper')) this.ireviewSwiper();

      if (qs('.js-map')) this.map();

      if (qs('.js-burger')) this.burger();

      if ($('.js-mfp').length) {
        $('.js-mfp').magnificPopup({
            type: 'inline',
            midClick: true
        });
      }

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

