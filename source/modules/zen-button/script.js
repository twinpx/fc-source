if ( $( '.b-zen-ajax' ).length ) {
  setTimeout( function() {
    var $zenAjax = $( '.b-zen-ajax' );
    $.ajax({
      url: $zenAjax.data( 'ajax-url' ),
      type: $zenAjax.data( 'ajax-method' ),//GET
      dataType: "html",
      success: function( html ) {
        var $zenButton = $( html );
        $zenButton.appendTo( 'body' ).hover( hoverZen, houtZen );
        $zenAjax.remove();
        setTimeout( function() {
          $zenButton.addClass( 'i-show' );
        }, 0);
      },
      error: function( a, b, c ) {
        if ( window.console ) {
          console.log(a);
          console.log(b);
          console.log(c);
        }
      }
    });
  }, 7800);
}

function hoverZen() {
  var $zenButton = $(this);
  
  $zenButton.addClass( 'i-open' );
}

function houtZen() {
  var $zenButton = $(this);
  
  $zenButton.removeClass( 'i-open' );
}