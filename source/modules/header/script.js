( function($) {

  'use strict';
  
  $( function() {
  
    //header mobile menu icon
    $( '.b-header .b-mobile-menu-icon' ).click( function(e) {
      e.stopPropagation();
      $( this ).closest( '.b-header' ).find( '.b-header__nav' ).slideToggle( 500 );
    });

    $( document ).bind( 'click', function(e) {
      
      if ( !$( e.target ).closest( '.b-header-panel__user-dropdown-body' ).length && !$( e.target ).hasClass( 'b-header-panel__user' )) {
        $( '.b-header-panel__user-dropdown-body' ).slideUp( 500 );
      }
      if ( !$( e.target ).closest( '.b-header-panel__mobile-menu-body' ).length && !$( e.target ).is( '.b-header-panel__icon.i-menu' )) {
        $( '.b-header-panel__mobile-menu-body' ).slideUp( 500 );
      }
        
    });
    
    //user dropdown
    if ( window.matchMedia( "(min-width: 992px)" ).matches ) {
      $( '.b-header-panel__user' ).click( function(e) {
        e.preventDefault();
        $( '.b-header-panel__user-dropdown-body' ).slideToggle( 300 );
      });
    } else {
      $( '.b-header-panel__user' ).click( function(e) {
        e.preventDefault();
        $( '.b-header-panel__mobile-user-menu-body' ).slideToggle( 300 );
        $( '.b-header-panel__mobile-menu-body' ).slideUp( 300 );
      });
    }
    
    //mobile dropdown
    $( '.b-header-panel__icon.i-menu' ).click( function(e) {
      e.preventDefault();
      $( '.b-header-panel__mobile-menu-body' ).slideToggle( 300 );
      $( '.b-header-panel__mobile-user-menu-body' ).slideUp( 300 );
    });
    
    //swipe the menu
    var mobileMenuCoords = {
          start: 0,
          end: 0
        };
        
    $( '.b-header-panel__mobile-menu-body, .b-header-panel__mobile-user-menu-body' )
      .on( "touchstart", function(e) {
          e.stopPropagation();
          mobileMenuCoords = { start: 0, end: 0 };
          mobileMenuCoords.start = e.originalEvent.changedTouches[0].pageY;
      })
      .on( "touchend", function(e) {
        e.stopPropagation();
        mobileMenuCoords.end = e.originalEvent.changedTouches[0].pageY;
        if ( ( mobileMenuCoords.start - mobileMenuCoords.end ) > 35 ) {
          $( this ).slideUp();
        }
        mobileMenuCoords = { start: 0, end: 0 };
      });
      
    //fixed header
    ( function() {
      var $header = $( '.b-header-panel' );
      
      if ( !$header.length ) {
        return;
      }
      
      /*if ( $( '#recipeSearch' ).hasClass( 'i-mobile-search' )) {
        $header.addClass( "i-fixed" );
        $header.after( '<div id="headerPanelFixed" style="height:' + $header.height() + 'px;"></div>' );
      } else {*/
        $header.data( 'topBorder', $header.offset().top );
        $( window ).bind( "scroll", scrollWindow );
      /*}*/
      
      bxCss();
      
      function scrollWindow() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        var top = 0;
        
        /*if ( $( '#bx-panel' ).length && !$( '#bx-panel' ).hasClass( 'bx-panel-fixed' )) {
          $header.removeClass( "i-fixed" );
        }*/
        
        if ( $( '#bx-panel' ).length && $( '#bx-panel' ).hasClass( 'bx-panel-fixed' )) {
          scrolled += $( '#bx-panel' ).height();
          top = $( '#bx-panel' ).height();
        }
        
        if ( !$( '#bx-panel-pin' ).hasClass( 'bx-panel-pin-fixed' )) {
          $header.data( 'topBorder' );
        }
        
        if ( scrolled > $header.data( 'topBorder' ) && !$header.hasClass( "i-fixed" )) {
          $header.css({ top: top + 'px' }).addClass( "i-fixed" );
          $header.after( '<div id="headerPanelFixed" style="height:' + $header.height() + 'px;"></div>' );
        } else if ( scrolled <= $header.data( 'topBorder' ) && $header.hasClass( "i-fixed" )) {
          $( "#headerPanelFixed" ).remove();
          $header.removeClass( "i-fixed" ).css({ top: 0 });
        }
        
      }
      
      function bxCss() {
        if ( !$( '#bx-panel' ).length ) {
          return;
        }
        
        $header.data( 'topBorder', $header.offset().top );
        scrollWindow();
        
        $( '#bx-panel-expander, #bx-panel-hider' ).bind( 'click', function () {
          setTimeout( function() {
            $header.data( 'topBorder', $header.offset().top );
            scrollWindow();
          }, 0);
        });
        
        $( '#bx-panel-pin' ).bind( 'click', function() {
          if ( $( this ).hasClass( 'bx-panel-pin-fixed' )) {
            
          }
        });
      }
      
    }());
  });

}( jQuery ));