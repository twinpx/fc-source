$( '.b-placeholder-load' ).each( function() {
  
  var $placeholderLoad = $( this );
  var $placeholderBlock = $placeholderLoad.parent();
  
  $.ajax({
    url: $placeholderLoad.data( 'url' ),
    type: $placeholderLoad.data( 'method' ),
    dataType: "html",
    success: function ( html ) {
      $placeholderLoad.html( html );
      $placeholderBlock.children( 'style, .i-placeholder' ).remove();
    },
    error: function ( a, b, c ) {
      if ( window.console ) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }
  });
  
});