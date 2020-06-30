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
    $( '.b-header-panel__user' ).click( function(e) {
      e.preventDefault();
      $( '.b-header-panel__user-dropdown-body' ).slideToggle( 300 );
    });

  });

}( jQuery ));