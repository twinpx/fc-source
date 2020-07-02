( function($) {

  'use strict';
  
  $( function() {
  
    //header mobile menu icon
    $( '.b-header .b-mobile-menu-icon' ).click( function(e) {
      e.stopPropagation();
      $( this ).closest( '.b-header' ).find( '.b-header__nav' ).slideToggle( 500 );
    });

    $( document ).bind( 'click', function() {
      if ( window.matchMedia( "(max-width: 767px)" ).matches ) {
        $( '.b-header__nav' ).slideUp( 500 );
        $( '.b-content-nav .container' ).slideUp( 500 );
      }
    });
    
    //user dropdown
    if ( window.matchMedia( "(min-width: 992px)" ).matches ) {
      $( '.b-header-panel__user' ).click( function(e) {
        e.preventDefault();
        $( '.b-header-panel__user-dropdown-body' ).slideToggle( 300 );
      });
    } else {
      $( '.b-header-panel__user' ).click( function(e) {
        e.preventDefault();
        $( '.b-header-panel__mobile-user-menu-body' ).slideToggle( 300 );
        $( '.b-header-panel__mobile-menu-body' ).slideUp( 300 );
      });
    }
    
    //mobile dropdown
    $( '.b-header-panel__icon.i-menu' ).click( function(e) {
      e.preventDefault();
      $( '.b-header-panel__mobile-menu-body' ).slideToggle( 300 );
      $( '.b-header-panel__mobile-user-menu-body' ).slideUp( 300 );
    });
    
    //swipe the menu
    var mobileMenuCoords = {
          start: 0,
          end: 0
        };
        
    $( '.b-header-panel__mobile-menu-body, .b-header-panel__mobile-user-menu-body' )
      .on( "touchstart", function(e) {
          e.stopPropagation();
          mobileMenuCoords = { start: 0, end: 0 };
          mobileMenuCoords.start = e.originalEvent.changedTouches[0].pageY;
      })
      .on( "touchend", function(e) {
        e.stopPropagation();
        mobileMenuCoords.end = e.originalEvent.changedTouches[0].pageY;
        if ( ( mobileMenuCoords.start - mobileMenuCoords.end ) > 35 ) {
          $( this ).slideUp();
        }
        mobileMenuCoords = { start: 0, end: 0 };
      });

  });

}( jQuery ));