$( '.b-subscribe form' ).submit( function(e) {
  e.preventDefault();
  
  var $form = $( this ),
      mail = $form.find( '[type=email]' ).val(),
      mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
	
  if ( !mail.match( mailRegex )) {
    return;
  }
  
  $form.addClass( 'i-preload' );
  
  
  $.ajax({
    url: $form.data( 'url' ),
    type: $form.attr( 'method' ),
    dataType: 'json',
    data: $form.serialize(),
    success: function( data ) {
      $form
        .removeClass( 'i-preload' )
        .find( 'p.text-warning' ).remove();
      try {
      
        if ( data.response === 'success' ) {
          if ( $form.find( '.form-group' ).hasClass( 'i-float' )) {
            $form.find( '.form-group' ).removeClass( 'i-focus' );
            $form.find( '.form-control' ).val( '' );
            $form.find( '.b-label' ).text( data.text );
          } else {
            $form.find( '.form-control' ).val( data.text );
          }
          
        } else {
          $form.prepend( '<p class="text-warning">' + data.text + '</p>' );
        }
      } catch ( err ) {
        throw err;
      }
    }
  });
});