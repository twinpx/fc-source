//fixed header
( function() {
  var $header = $header = $( '.b-header' );
  
  if ( $( 'body' ).hasClass( 'i-mobile-search' )) {
    $header.addClass( "i-fixed" );
    $header.after( '<div id="b-header-fixed" style="height:' + $header.height() + 'px;"></div>' );
  } else {
    $header.data( 'topBorder', $header.offset().top );
    $( window ).bind( "scroll", scrollWindow ).scroll();
  }
  
  function scrollWindow(e) {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    
    if ( scrolled > $header.data( 'topBorder' ) && !$header.hasClass( "i-fixed" )) {
      $header.addClass( "i-fixed" );
      $header.after( '<div id="b-header-fixed" style="height:' + $header.height() + 'px;"></div>' );
    } else if ( scrolled <= $header.data( 'topBorder' ) && $header.hasClass( "i-fixed" )) {
      $( "#b-header-fixed" ).remove();
      $header.removeClass( "i-fixed" );
    }
    
  }
}());