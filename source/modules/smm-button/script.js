if (document.querySelector('.b-smm-ajax')) {
  setTimeout(function () {
    var $smmAjax = $('.b-smm-ajax');
    $.ajax({
      url: $smmAjax.data('ajax-url'),
      type: $smmAjax.data('ajax-method'), //GET
      dataType: 'html',
      success: function (html) {
        var $smm = $(html);
        $smm.appendTo('body');
        var $smmButton = $smm.find('.b-smm-button');
        $smmAjax.remove();
        setTimeout(function () {
          $smmButton.addClass('i-show');
        }, 0);
      },
      error: function (a, b, c) {
        if (window.console) {
          console.log(a);
          console.log(b);
          console.log(c);
        }
      },
    });
  }, 8000);
}
