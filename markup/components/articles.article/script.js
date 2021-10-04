(function ($) {
  'use strict';

  $(function () {
    $('.b-article').addtocopy({
      htmlcopytxt:
        '<br>Подробнее: <a href="' +
        window.location.href +
        '">' +
        window.location.href +
        '</a>',
      minlen: 50,
      addcopyfirst: false,
    });

    document.querySelectorAll('[data-reslist]').forEach(function (elem) {
      const reslistNumber = elem.getAttribute('data-reslist');
      const placeholder = document.createElement('div');
      placeholder.innerHTML = '<span>Placeholder</span>';
      elem.after(placeholder);
      elem.remove();
    });

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
