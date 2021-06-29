( function($) {

  'use strict';
  
  $( function() {
    
    if ( window.Cookies && (Cookies.get( 'close-instagram-banner' ) || Cookies.get( 'click-instagram-banner' ))) {
      $( '.b-instagram-banner' ).remove();
      return;
    }
    
    setTimeout( function() {
      
      $( '.b-instagram-banner' ).addClass( 'i-animate' );
      
      setTimeout( function() {
        $( '.b-instagram-banner__close' ).css({ marginRight: 0 });
        setTimeout( function() {
          $( '.b-instagram-banner__close' ).addClass( 'i-animate' );
        }, 500 );
      }, 2000 );
      
    }, 500 );
    
    //close the banner
    $( '.b-instagram-banner__close' ).click( function(e) {
      e.preventDefault();
      
      //close
      $( '.b-instagram-banner' ).removeClass( 'i-animate' );
      $( '.b-instagram-banner__close' ).removeClass( 'i-animate' );
      
      setTimeout( function() {
        $( '.b-instagram-banner' ).remove();
      }, 500);
      
      //Yandex Metrika
      if ( window.yaCounter7715218 ) {
        yaCounter7715218.reachGoal( 'CLOSE-INSTAGRAM-BANNER' );
      }
      
      //cookie
      Cookies.set( 'close-instagram-banner', 'Y', { expires: 3, domain: window.location.hostname });
    });
    
    //click instagram
    $( '.b-instagram-banner__button' ).click( function() {
      Cookies.set( 'click-instagram-banner', 'Y', { expires: 365, domain: window.location.hostname });
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));