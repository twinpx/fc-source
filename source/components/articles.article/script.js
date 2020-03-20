( function($) {

  'use strict';
  
  $( function() {
  
    $( '.b-article' ).addtocopy({ htmlcopytxt: '<br>Подробнее: <a href="' + window.location.href + '">' + window.location.href + "</a>", minlen: 50, addcopyfirst: false });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));