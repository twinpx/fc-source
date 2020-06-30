( function($) {

  'use strict';
  
  $( function() {
    
    window.titleSearchStyleTag = document.createElement('style');
    window.titleSearchStyleTag.type = 'text/css';
    bxCss();
    
    $( '.b-recipe-search div.title-search-result' ).appendTo( 'body' );
    
    $( '.b-recipe-search__icon' ).click( function(e) {
      e.preventDefault();
      $( '.b-recipe-search-field' ).slideToggle( 300 );
      $( '.b-recipe-search-field__input input' ).focus();
    });
    
    $( '.b-recipe-search-field__input input' ).keyup( function() {
      if ( $( this).val() !== '' ) {
        $( '.b-recipe-search-field__clear' ).show();
      } else {
        $( '.b-recipe-search-field__clear' ).hide();
      }
    });
    
    $( '.b-recipe-search-field__clear' ).click( function(e) {
      e.preventDefault();
      $( '.b-recipe-search-field__input input' ).val( '' ).focus();
      $( '.b-recipe-search-field__clear' ).hide();
    });
    
    $( 'body:not( .i-mobile-search ) #titleSearchHeaderResult .title-search-result__wrapper' ).niceScroll();
    
    setTimeout( function() {
      $( '#title-search-input' ).focus();//doesn't work because the page needs user's activity - click or focus
    }, 1000 );
    
    function bxCss() {
      if ( !$( '#bx-panel' ).length ) {
        return;
      }
      
      $( 'div.title-search-result:not(.b-recipe-search__ul1 )' ).css({ top: $( '#bx-panel' ).height() + 120 + 'px' });
      
      titleSearchCSS();
      
      $( '#bx-panel-expander, #bx-panel-hider' ).bind( 'click', function () {
        setTimeout( function() {
          titleSearchCSS();
        }, 0);
        
      });
      
    }

    function titleSearchCSS() {
      var css = 'div#titleSearchHeaderResult.title-search-result:not(.b-recipe-search__ul1 ) { top: ' + (parseInt( $( '#bx-panel' ).height(), 10 ) + 120) + 'px !important; }',
          head = document.head || document.getElementsByTagName('head')[0];
      
      $( window.titleSearchStyleTag ).empty();
      
      if ( window.titleSearchStyleTag.styleSheet ){
        window.titleSearchStyleTag.styleSheet.cssText = css;
      } else {
        window.titleSearchStyleTag.appendChild( document.createTextNode( css ));
      }

      head.appendChild( window.titleSearchStyleTag );
    }
    
  });

}( jQuery ));