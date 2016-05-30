$( '.b-aside-banner.i-float' ).each( function() {
  var $banner = $( this );
  
  setTimeout( checkAviasales, 1000 );
  
  var topBorder, $bottomElement, bottomBorder, topElemBorder, leftElemBorder, elemHeight, $spacer, $spacer, scroll, $aside;
    
  function init() {
    topBorder = getTopBorder() + 10 || undefined;
    $bottomElement = getBottomElement();
    topElemBorder = $banner.offset().top;
    leftElemBorder = $banner.offset().left;
    elemHeight = $banner.height();
    $spacer = $('<div></div>');
    $spacer.width( $banner.outerWidth()).height( $banner.outerHeight());
    $aside = $( 'aside.col-md-4' );
    
    $( window )
      .bind( "scroll", scrollWindow )
      .bind( "resize", resizeWindow )
      .scroll();
  }
    
  function checkAviasales() {
		var intId,
				script = document.getElementById( "aviasales-app" );
		
		if ( script ) {
			intId = setInterval( function() {
				if ( document.getElementById( "ng-app" )) {
					clearInterval( intId );
					init();
					return;
				}
			}, 500);
		} else {
			init();
		}
	}
  
  function getTopBorder() {
		return $( '#header' ).height();
	}
  
  function getBottomElement() {
    var footerTopBorders = [];

    $( '.b-store-block:not(.b-store-block__type_aside), #bottom, .collection_block, #ng-app:not(#banner_space #ng-app)' ).each( function() {
      footerTopBorders.push({
        "elem": this,
        "topBorder": $( this ).offset().top
      });
    });

    footerTopBorders.sort( sortTopBorders );
    
    return $( footerTopBorders[0].elem );
    
    function sortTopBorders(a, b) {
			if ( a.topBorder < b.topBorder ) {
        return -1;
      } if ( a.topBorder > b.topBorder ) {
        return 1;
      }
			return 0;
		}
  }

	function getBottomBorder( action ) {
    var footerTopBorders = [];

    $( '.b-store-block:not(.b-store-block__type_aside), #bottom, .collection_block, #ng-app:not(#banner_space #ng-app)' ).each( function() {
      footerTopBorders.push({
        "elem": this,
        "topBorder": $( this ).offset().top
      });
    });

    footerTopBorders.sort( sortTopBorders );

		return footerTopBorders[0].topBorder;

		function sortTopBorders(a, b) {
			if ( a.topBorder < b.topBorder ) {
        return -1;
      } if ( a.topBorder > b.topBorder ) {
        return 1;
      }
			return 0;
		}
	}
  
  function scrollWindow() {
		scroll = getScroll();
    bottomBorder = $bottomElement.offset().top - 10;
		
		if ( !$banner.hasClass( 'i-top-fixed' ) &&
				 ( scroll >= topElemBorder - topBorder &&
				 scroll < bottomBorder - $banner.outerHeight() - topBorder)) {
				 
			doTopFixed();
			
		} else if ( !$banner.hasClass( 'i-bottom-fixed' ) &&
								( scroll >= bottomBorder - $banner.outerHeight() - topBorder)) {
								
			doBottomFixed();
			
		} else if ( ( $banner.hasClass( 'i-top-fixed' ) ||
								 $banner.hasClass( 'i-bottom-fixed' )) &&
								 scroll < topElemBorder - topBorder) {
								 
			undoTopFixed();
			undoBottomFixed();
		}
	}
  
  function resizeWindow() {
		leftElemBorder = $banner.parent().offset().left;
		$banner.css({left: leftElemBorder + 'px'});
	}

	function getScroll() {
		return $( window ).scrollTop();
	}
	
	function doBottomFixed() {
		$banner
			.removeClass( 'i-top-fixed' )
			.addClass( 'i-bottom-fixed' )
			.css({ top: bottomBorder - $aside.offset().top - $banner.outerHeight() + 'px', left: leftElemBorder - $aside.offset().left + 'px' });
	}
	
	function undoBottomFixed() {
		$banner.removeClass( 'i-bottom-fixed' );
	}
	
	function doTopFixed() {
		$banner
			.removeClass( 'i-bottom-fixed' )
			.addClass( 'i-top-fixed' )
			.css({ top: topBorder + 'px', left: leftElemBorder + 'px'})
			.after( $spacer );
	}
	
	function undoTopFixed() {
		$banner.removeClass( 'i-top-fixed' );
		$spacer.remove();
	}
});