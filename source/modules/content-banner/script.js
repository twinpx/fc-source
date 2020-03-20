$( '.b-content-banner' ).each( function() {
  var $banner = $( this );
  
  $.ajax({
    url: $banner.data( 'ajax-url' ),
    type: $banner.data( 'ajax-method' ),
    dataType: "html",
    success: function( data ) {
      $banner.html( data );
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