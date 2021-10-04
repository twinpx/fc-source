( function($) {

  'use strict';
  
  $( function() {
  
    $( '#title-search-input_2' )
    .focus( function() {
      if ( $( '.b-mobile-search-icon' ).is( ':visible' )) {
        window.location =  $( '.b-mobile-search-icon' ).attr( 'href' );
        return;
      }
    })
    .keyup( function() {
      if ( $( this).val() !== '' ) {
        $( '#title-search_2__clear' ).show();
      } else {
        $( '#title-search_2__clear' ).hide();
      }
    });
    
    $( '#title-search_2__clear' ).click( function(e) {
      e.preventDefault();
      $( '#title-search-input_2' ).val( '' ).focus();
      $( '#title-search_2__clear' ).hide();
    });
    
    $( 'body:not( .i-mobile-search ) #titleSearchIndexResult .title-search-result__wrapper' ).niceScroll();
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));