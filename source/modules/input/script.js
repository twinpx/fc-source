$( '.i-float .form-control' )
  .focus( function() {
    $( this ).parent( '.i-float' ).addClass( 'i-focus' );
  })
  .blur( function() {
    var $this = $( this );
    if ( $this.val() === '' ) {
      $this.parent( '.i-float' ).removeClass( 'i-focus' );
    }
  })
  .each( function() {
    if ( $( this ).val() !== '' ) {
      $( this ).parent( '.i-float' ).addClass( 'i-focus' );
    }
  });

$( '.i-float .b-label' ).click( function() {
  var $float = $( this ).parent( '.i-float' );
  
  if ( !$float.hasClass( 'i-focus' )) {
    $float.find( '.form-control' ).focus();
  }
});