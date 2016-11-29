if( Cookies.get('SUBSCRIBED') === 'Y' ) {
  $( '.b-subscribe' ).height( '58px' ).html( '<div class="text-success">Спасибо за подписку!</div>' );
}

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
          $form.parent().height( $form.parent().height() );
          $form.before( '<div class="text-success">' + data.text + '</div>' );
          $form.remove();
          Cookies.set('SUBSCRIBED', 'Y', { expires: 7, path: window.location.hostname });
        } else {
          $form.prepend( '<p class="text-warning">' + data.text + '</p>' );
        }
      } catch ( err ) {
        throw err;
      }
    }
  });
});