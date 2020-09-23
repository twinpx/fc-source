if ( $( '.b-favorite-ajax' ).length ) {
  setTimeout( function() {
    var $favAjax = $( '.b-favorite-ajax' );
    $.ajax({
      url: $favAjax.data( 'ajax-url' ),
      type: $favAjax.data( 'ajax-method' ),//GET
      dataType: "html",
      success: function( html ) {
        var $favButton = $( html );
        $favButton.appendTo( 'body' ).click( clickFavorite );
        $favAjax.remove();
        setTimeout( function() {
          $favButton.addClass( 'i-show' );
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
  }, 8000);
}

function clickFavorite() {
  var $favButton = $(this);

  if ( $favButton.hasClass( 'i-added' )) {//we see green fav button
    $.ajax({
      url: $favButton.data( 'remove-ajax-url' ),
      type: $favButton.data( 'method' ),//GET
      dataType: "json",
      success: function( data ) {
        $favButton.removeClass( 'i-added' );
        //events
        if ( window._gaq ) {
          _gaq.push(['_trackEvent', 'Избранное', 'Удалили из избранного']);
        }
        if ( window.ga ) {
          ga('send', 'event', 'Избранное', 'Удалили из избранного');
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
    
  } else if ( $favButton.data( 'add-ajax-url' )) {//we see red fav button and the user is authorized
    $.ajax({
      url: $favButton.data( 'add-ajax-url' ),
      type: $favButton.data( 'method' ),//GET
      dataType: "json",
      success: function( data ) {
        $favButton.addClass( 'i-added' );
        //events
        if ( window._gaq ) {
          _gaq.push(['_trackEvent', 'Избранное', 'Добавили в избранное']);
        }
        if ( window.ga ) {
          ga('send', 'event', 'Избранное', 'Добавили в избранное');
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
    
  } else {//we see red button and the user is not authorized
    if ( document.getElementById( 'authModal' )) {
      $( '#authModal form' ).each( function() {
        $( this ).find( 'div:first' ).append( '<input type="hidden" name="addToFavoriteFlag" value="Y">' );
        Cookies.set( 'favorite', $( '.b-recipe' ).data( 'id' ));
      });
      $( '.btn.b-header-panel__login' ).click();
      //$('#authModal').modal( 'open' );//Doesn't work due to materialize method modal
    }
  }
}