//install PWA counter event
window.addEventListener('appinstalled', () => {
  if ( window.ym ) { ym(7715218,'reachGoal','INSTALL-PWA') }
});

//placeholders
setTimeout( function() {
  $( '.b-ph-block, h1, .b-heading-linethrough h2' ).addClass( 'i-ph-animated' );
}, 500 );
  
//defer  
$( '.b-deferred-content' ).each( function() {
  var $block = $( this );
  var id = $block.attr( 'id' );
  $block.appendTo( '#' + id + '__deferred' );
});

//yandex metrika
$( 'body' ).delegate( '.title-search-result__item', 'click', function() {
  if ( window.yaCounter7715218 ) {
    yaCounter7715218.reachGoal( "titleSearch", { request_string: $( '#title-search-input' ).val(), chosen_recipe: $( this ).find( '.title-search-result__header' ).text() });
  }
});

            //header mobile menu icon
            $( '.b-header .b-mobile-menu-icon' ).click( function(e) {
              e.stopPropagation();
              $( this ).closest( '.b-header' ).find( '.b-header__nav' ).slideToggle( 500 );
            });

            $( '.b-header__nav' ).click( function(e) {
              if ( $( e.target ).data( 'toggle' ) === 'modal' ) {
                return;
              }
              e.stopPropagation();
            });

            $( document ).bind( 'click', function() {
              if ( window.matchMedia( "(max-width: 767px)" ).matches ) {
                $( '.b-header__nav' ).slideUp( 500 );//.removeClass( 'i-menu-open' );
                $( '.b-content-nav .container' ).slideUp( 500 );//.removeClass( 'i-open' );
              }
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

//input field from materialize
/*$( '.input-field input' ).focus( function() {
  $( this ).siblings( 'label' ).addClass( 'active' );
}).blur( function() {
  if ( $.trim($( this ).val()) === '' ) {
    $( this ).siblings( 'label' ).removeClass( 'active' );
  }
});*/