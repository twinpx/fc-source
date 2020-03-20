( function($) {

  'use strict';
  
  $( function() {
    $( '.b-recipe__ill img, .b-recipe__step-ill img' ).lazyload();
    
    $( '.b-recipe' ).addtocopy({ htmlcopytxt: '<br>Подробнее: <a href="' + window.location.href + '">' + window.location.href + "</a>", minlen: 50, addcopyfirst: false });
    
    //load icons block
    $( '.b-recipe-icons' ).each( function() {
      var $iconsBlock = $( this );
      
      $.ajax({
        url: $iconsBlock.data( 'ajax-url' ),
        type: $iconsBlock.data( 'ajax-method' ),//GET
        dataType: "html",
        success: function( data ) {
          $iconsBlock.html( data );
        },
        error: function( a, b, c ) {
          if( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    
    });
    

  });  

}( jQuery ));