( function($) {

  'use strict';
  
  $( function() {
    
    var $elem = $( '#doYouKnow' );
    
    $elem.find( '.b-do-you-know__text' );
    
    $( document ).delegate( '.b-do-you-know__button', 'click', function(e) {
      e.preventDefault();
      
      var $elem = $( this ).closest( '#doYouKnow' );
      var $text = $elem.find( '.b-do-you-know__text' )
      
      $.ajax({
        url: $( '#doYouKnow' ).data( 'update-url' ),
        type: $( '#doYouKnow' ).data( 'ajax-method' ),
        dataType: "html",
        success: function( html ) {
          $text
            .height( $text.height())
            .addClass( 'i-hide' );
            
          setTimeout( function() {
            $text.html( html )
              .css({ height: 'auto' })
              .removeClass( 'i-hide' );
          }, 300);
            
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
      
      //yandex metrika
      if ( window.ym ) {
        ym( 7715218, 'reachGoal', 'CLICK-DO-YOU-KNOW' );
      }
    });
    
    if ( window.IntersectionObserver ) {
    
      var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }
      
      var callback = function( entries, observer ) {
        entries.forEach( function( entry ) {
          
          if ( entry.intersectionRect.top !== entry.boundingClientRect.top || !!$.trim($( '#doYouKnow' ).html())) {
            return;
          }
          
          $.ajax({
            url: $( '#doYouKnow' ).data( 'load-url' ),
            type: $( '#doYouKnow' ).data( 'ajax-method' ),
            dataType: "html",
            success: function( html ) {
              $( '#doYouKnow' ).html( html );
              setTimeout( function() {
                $( '#doYouKnow' ).addClass( 'i-show' );
              }, 300);
            },
            error: function( a, b, c ) {
              if ( window.console ) {
                console.log(a);
                console.log(b);
                console.log(c);
              }
            }
          });
          
        });
      };
      
      var observer = new IntersectionObserver( callback, options );
      
      var target = document.querySelectorAll( '.b-recipe__step' )[1];
      
      observer.observe( target );
      
      
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));