//fixed header
( function() {
  var $header = $( '.b-header' );
  
  if ( !$header.length ) {
    return;
  }
  
  if ( $( 'body' ).hasClass( 'i-mobile-search' )) {
    $header.addClass( "i-fixed" );
    $header.after( '<div id="b-header-fixed" style="height:' + $header.height() + 'px;"></div>' );
  } else {
    $header.data( 'topBorder', $header.offset().top );
    $( window ).bind( "scroll", scrollWindow ).scroll();
  }
  
  bxCss();
  
  function scrollWindow() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var top = 0;
    
    /*if ( $( '#bx-panel' ).length && !$( '#bx-panel' ).hasClass( 'bx-panel-fixed' )) {
      $header.removeClass( "i-fixed" );
    }*/
    
    if ( $( '#bx-panel' ).length && $( '#bx-panel' ).hasClass( 'bx-panel-fixed' )) {
      scrolled += $( '#bx-panel' ).height();
      top = $( '#bx-panel' ).height();
    }
    
    if ( !$( '#bx-panel-pin' ).hasClass( 'bx-panel-pin-fixed' )) {
      $header.data( 'topBorder' )
    }
    
    if ( scrolled > $header.data( 'topBorder' ) && !$header.hasClass( "i-fixed" )) {
      $header.css({ top: top + 'px' }).addClass( "i-fixed" );
      $header.after( '<div id="b-header-fixed" style="height:' + $header.height() + 'px;"></div>' );
    } else if ( scrolled <= $header.data( 'topBorder' ) && $header.hasClass( "i-fixed" )) {
      $( "#b-header-fixed" ).remove();
      $header.removeClass( "i-fixed" ).css({ top: 0 });
    }
    
  }
  
  function bxCss() {
    if ( !$( '#bx-panel' ).length ) {
      return;
    }
    
    $header.data( 'topBorder', $header.offset().top );
    scrollWindow();
    
    $( '#bx-panel-expander, #bx-panel-hider' ).bind( 'click', function () {
      setTimeout( function() {
        $header.data( 'topBorder', $header.offset().top );
        scrollWindow();
      }, 0);
    });
    
    $( '#bx-panel-pin' ).bind( 'click', function() {
      if ( $( this ).hasClass( 'bx-panel-pin-fixed' )) {
        
      }
    });
  }
  
}());