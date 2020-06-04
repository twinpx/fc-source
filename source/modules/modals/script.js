$( '#authModal form' ).submit( function(e) {
  //e.preventDefault();
  
  //highlite empty fields
  if ( $.trim( $( '#auth-form-login' ).val()) === '' ) {
    $( '#auth-form-login' ).focus().closest( '.input-field' ).addClass( 'i-empty' );
    return false;
  } else {
    $( '#auth-form-login' ).removeClass( 'i-empty' );
  }
  
  if ( $.trim( $( '#auth-form-password' ).val()) === '' ) {
    $( '#auth-form-password' ).focus().closest( '.input-field' ).addClass( 'i-empty' );
    return false;
  } else {
    $( '#auth-form-password' ).removeClass( 'i-empty' );
  }
  
  //send ajax
  /*var $form = $( this );
  $.ajax({
    url: $form.attr( 'action' ),
    type: $form.attr( 'method' ),
    dataType: "json",
    data: $form.serialize(),
    success: function( data ) {
      if ( data && data.STATUS === 'Y' && data.URL ) {//success
        window.location.href = data.URL;
      }
      if ( data && data.STATUS === 'N' && data.ERROR ) {//error
        $( '.b-auth-modal__error' ).remove();
        $( '.b-auth-modal__form' ).before( '<div class="b-auth-modal__error">' + data.ERROR + '</div>' );
      }
    },
    error: function( a, b, c ) {
      if ( window.console ) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }
  });*/
});

//show email form

//check the cookie
/*Cookies.set("GET_EMAIL", "2000", {
    expires: 7,
    path: window.location.hostname
});*/
if ( document.getElementById( 'emailModal' )) {
  if ( Cookies.get( "GET_EMAIL" )) {//code from Alex needed
    setTimeout( function() {
      $( '.modal.in' ).modal( 'hide' );
      setTimeout( function() {//to prevent body scrolling
        $( '#emailModal' ).modal( 'show' );
      }, 500 );
    }, 1*Cookies.get( "GET_EMAIL" ));
  }

  $( '#emailModal form' ).submit( function(e) {
    e.preventDefault();
    
    //highlite empty fields
    if ( $.trim( $( '#email-form' ).val()) === '' ) {
      $( '#email-form' ).focus().closest( '.input-field' ).addClass( 'i-empty' );
      return false;
    } else {
      $( '#email-form' ).removeClass( 'i-empty' );
    }
    
    //send ajax
    var $form = $( this );
    $.ajax({
      url: $form.attr( 'action' ),
      type: $form.attr( 'method' ),
      dataType: "json",
      data: $form.serialize(),
      success: function( data ) {
        if ( data && data.STATUS === 'Y' ) {//success
          //close the window
          $( '#emailModal' ).modal( 'hide' );
          //remove the cookie
          Cookies.remove( "GET_EMAIL", { path: window.location.hostname });
        }
        if ( data && data.STATUS === 'N' && data.ERROR ) {//error
          $( '.b-email-modal__error' ).remove();
          $( '.b-email-modal__form' ).before( '<div class="b-auth-modal__error">' + data.ERROR + '</div>' );
        }
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
}