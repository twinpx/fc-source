( function($) {

  'use strict';
  
  $( function() {
    
    //youtube player
    
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    var player;
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player( 'player', {
        videoId: '1In7igJUxV8',
        events: {
          onReady: function() {
            console.log( 'ready' );
          }
        }
      });
    };
    
    //plyr
    
    //var player = new Plyr('#player');
    
    $( '.b-recipe__yt-button' ).click( function(e) {
      e.preventDefault();
      $( 'html' ).addClass( 'i-noscroll' );
      $( '.b-recipe__yt-overlay' ).show();
      //player.play();
    });
    
    $( '.b-recipe__yt-overlay, .b-recipe__yt-close' ).click( function() {
      $( 'html' ).removeClass( 'i-noscroll' );
      $( '.b-recipe__yt-overlay' ).hide();
      try { player.pauseVideo()}
      catch(e) {
        console.log(e);
      };
      //player.pause();
    });
    
    $( '.b-recipe__yt-wrapper' ).click( function(e) {
      e.stopPropagation();
    });
      
    //copy
    if ( document.queryCommandSupported( 'copy' )) {
      
      //copy ingredients
      $( '.b-copy-ingredients-icon' ).click( function(e) {
        e.preventDefault();
      
        var $textarea = $( '.b-recipe__ingredients-to-be-copied:eq(0)' );
        
        var text = 'Ингредиенты &laquo;' + $( 'h1:eq(0)' ).text()   + '&raquo;:\n';
        
        $( '.b-recipe__ingredients:eq(0) tr' ).each( function() {
          var $tr = $( this );
          text += $tr.find( 'td:eq(0)' ).text() + ' ' + $tr.find( 'td:eq(1)' ).text() + '\n';
        });
        
        //disable scroll
        var oldScroll = $(window).scrollTop();
        $( window ).one('scroll', function() {
            $(window).scrollTop( oldScroll ); //disable scroll just once
        });
        
        $textarea.html( text ).select();
        document.execCommand( 'copy' );
        $textarea.html( text ).blur();
        
        //show the message
        $( '.b-copy-ingredients-message' ).addClass( 'i-show' );
        setTimeout( function() {
          $( '.b-copy-ingredients-message' ).removeClass( 'i-show' );
        }, 2000);
        
        //yandex metrika
        if ( window.ym ) {
          ym( 7715218,'reachGoal','COPY-INGREDIENTS' );
        }
        
      });
      
    } else {
      $( '.b-copy-ingredients-icon' ).hide();
    }
    
    $( '.b-recipe__ill img, .b-recipe__step-ill img' ).lazyload();
    
    $( '.b-recipe' ).addtocopy({ htmlcopytxt: '<br>Подробнее: <a href="' + window.location.href + '">' + window.location.href + "</a>", minlen: 50, addcopyfirst: false });
    
    //load icons block
    $( '.b-recipe-icons' ).each( function() {
      var $iconsBlock = $( this );
      
      if ( $iconsBlock.data( 'ajax-url' ) && $iconsBlock.data( 'ajax-method' )) {
        try {
      
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
          
        } catch(e) {}
      }
    
    });
    

  });  

}( jQuery ));