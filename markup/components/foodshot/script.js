( function($) {

  'use strict';
  
  $( function() {
  
    if ( $.fn.lazyload ) {
      $( '.b-foodshot__grid [ data-original ]' ).lazyload();
    }
  
    $( '.b-foodshot__grid' ).masonry({
      // options
      itemSelector: '.b-foodshot__item',
      columnWidth: '.b-foodshot__sizer',
      percentPosition: true
    });
    
    var maxPage = $( '#get_more_foodshots a' ).data( 'max-page' ); 
    var page = $( '#get_more_foodshots a' ).data( 'this-page' );
    
    $( '#get_more_foodshots a' ).click( function() {
        
      var searchURL = {};
      page++;
          
      $( '#get_more_foodshots a' ).data({ 'this-page': page });
      
      $.ajax({
        url: $( '#get_more_foodshots' ).data( 'more-url' ),
        dataType: "html",
        data: 'p=' + page,
        beforeSend: function() {
          $( '#get_more_foodshots' ).addClass( 'preload' );
        },
        success: function( html ) {
          var gridTop = $( '.b-foodshot__grid' ).height();
          var $items = $( html );
          
          $( '#get_more_foodshots' ).removeClass( 'preload' );
          
          $( '.b-foodshot__grid' ).append( $items );
         $items.find( '[ data-original ]' ).lazyload();
         $( '.b-foodshot__grid' ).masonry( 'appended', $items );
          
          //animate
          //$div.find( '.b-recipe-thumb__photo' ).lazyload();
          
          //$.scrollTo( ($( "#recipe_feed_block .b-recipe-feed__wrapper:last .b-recipe-thumb:first" ).offset().top-200) + 'px', 1000 );
          
          showHideGetMoreButton();
          
          //set URL
          if ( window.history ) {
            if ( window.location.search ) {
              searchURL = parseQuery( window.location.search );
            }
            searchURL.page = page;
            history.replaceState( {}, '', getQuery( searchURL ));
          }
        }
      });
      
      return false;
    });
    
    function showHideGetMoreButton() {
      if ( (maxPage-page) <= 0 ) {
        $( '#get_more_foodshots' ).hide();
      } else {
        $( '#get_more_foodshots' ).show();
      }
    }
    
    function getQuery( queryObject ) {
      var result = [];
      for ( var k in queryObject ) {
        result.push( k + '=' + queryObject[k]);
      }
      return '?' + result.join( '&' );
    }
    
    function parseQuery( queryString ) {
      var query = {};
      var pairs = ( queryString[0] === '?' ? queryString.substr(1) : queryString ).split('&');
      for ( var i = 0; i < pairs.length; i++ ) {
        var pair = pairs[i].split( '=' );
        query[ decodeURIComponent( pair[0]) ] = decodeURIComponent( pair[1] || '' );
      }
      return query;
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));