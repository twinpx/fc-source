(function ($) {
  'use strict';

  $(function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1.2,
        spaceBetween: 0,
        freeMode: true,
      });
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 2.8,
        spaceBetween: 0,
        freeMode: true,
      });
    }

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
