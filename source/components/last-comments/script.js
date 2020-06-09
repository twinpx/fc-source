( function($) {

  'use strict';
  
  $( function() {
    
    $( '.b-last-comments' ).each( function() {
      
      var $lastComments = $( this );
      var $lastCommentsWrapper = $lastComments.find( '.b-last-comments__item' ).parent();
      var $activeItem;
      var lineHeight = parseInt( $lastComments.find( '.b-last-comments__text' ).css( 'lineHeight' ), 10);
      var lines = 3;
      
      slideComments();
      
      var intervalID = setInterval( function() {
        $lastCommentsWrapper.find( '.b-last-comments__item:first' ).appendTo( $lastCommentsWrapper );
        slideComments();
      }, 4000);
      
      function slideComments() {
        $activeItem = $lastCommentsWrapper.find( '.b-last-comments__item:first' );
        typingText( '.b-last-comments__text', 10 );
      }
      
      function typingText( elem, time ) {
        var $activeItemElem = $activeItem.find( elem ),
            text = $activeItemElem.text(),
            index = 0;
            
        var typingIntervalId = setInterval( function() {
          
          if ( index < text.length ) {
            $activeItemElem.html( text.substring(0, ++index) );
          } else {
            clearTimeout( typingIntervalId );
          }
          
          if ( $activeItemElem.height() > lineHeight*(lines-1) && text.substring(index-1, index) === ' ' ) {
            clearTimeout( typingIntervalId );
            $activeItemElem.html( text.substring(0, index-1) + '...' );
            return;
          }
          
        }, time );
      }
      
    });
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));