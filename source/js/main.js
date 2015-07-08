//header mobile menu icon
$( '.b-header .b-mobile-menu-icon' ).click( function(e) {
  e.stopPropagation();
  $( this ).closest( '.b-header' ).find( '.b-header__nav' ).slideToggle( 500 );//toggleClass( 'i-menu-open' );
});

$( '.b-header__nav' ).click( function(e) {
  e.stopPropagation();
});

$( document ).bind( 'click', function() {
  if ( window.matchMedia( "(max-width: 767px)" ).matches ) {
    $( '.b-header__nav' ).slideUp( 500 );//.removeClass( 'i-menu-open' );
    $( '.b-content-nav .container' ).slideUp( 500 );//.removeClass( 'i-open' );
  }/* else {}*/
});

// vertical align for recipe preview photo
$( ".recipe_list_item .photo a, .b-recipe-preview__photo__link" ).each( function() {
  var $this = $( this ),
    $img = $this.children( "img" ),
    img = new Image(),
    marginTop;
    
  img.src = $img.attr("src");
  var hei = Math.floor( img.height * $img.attr("width") / img.width );
  
  if ( hei > 0 ) {
    marginTop = (parseInt($this.css("height"))/2-hei/2);
    $img.css({ marginTop: marginTop + "px" });
  }
  else {
    $img.load( function() {
      var hei = Math.floor( img.height * $img.attr( "width" ) / img.width );
      if ( hei > 0 ) {
        marginTop = (parseInt($this.css("height"))/2-hei/2);
        $img.css({ marginTop: marginTop + "px" });
      }
    });
  }
});