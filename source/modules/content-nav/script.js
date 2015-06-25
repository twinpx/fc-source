$( '.b-content-nav .b-mobile-menu-icon' ).click( function(e) {
  e.stopPropagation();
  $( this ).closest( '.b-content-nav' ).find( '.container' ).slideToggle( 500 )//.toggleClass( 'i-open' );
});

$( '.b-content-nav' ).click( function(e) {
  e.stopPropagation();
});