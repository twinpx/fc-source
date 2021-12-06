( function($) {

'use strict';

  $( function() {
  

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
(function() {
	$(document)
		.delegate(".b-admin-buttons", "mouseenter", mouseenterAdmin)
		.delegate(".b-admin-buttons", "mouseleave", mouseleaveAdmin)
		.delegate(".b-delete-icon", "click", deleteAdmin);
	
	function mouseenterAdmin() {
		var $block = $(this).find(".b-admin-buttons__block").addClass("i-hover");
		$block.stop().show().animate({opacity: 1}, 100);
	}
	
	function mouseleaveAdmin() {
		var $block = $(this).find(".b-admin-buttons__block").removeClass("i-hover");
		setTimeout(function() {
			if($block.hasClass("i-hover")) return;
			$block.stop().animate({opacity: 0}, 100, function() {$block.hide();});
		}, 100);
	}
	
	function deleteAdmin(e) {
		if(confirm($(this).attr("title") + "?")) return true;
		return false;
	}
}());

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
/*( function() {
	$(document)
		.delegate(".b-author-avatar", "mouseenter", mouseenterAvatar)
		.delegate(".b-author-avatar", "mouseleave", mouseleaveAvatar);
	
	function mouseenterAvatar() {
		var $avatar = $(this);
		$avatar.find(".b-author-avatar__link").stop().animate({width: "100px", height: "100px", top: "-35px", left: "-35px"}, 100);
	}
	
	function mouseleaveAvatar() {
		var $avatar = $(this);
		$avatar.find(".b-author-avatar__link").stop().animate({width: "30px", height: "30px", top: "0", left: "0"}, 100);
	}
}());*/


$( '#bx-panel-hider' ).bind( 'click', function() {
  var $header = $( '.b-header' );
  $header.data( 'topBorder', $header.offset().top );
});

$( '.b-content-banner' ).each( function() {
  var $banner = $( this );
  
  $.ajax({
    url: $banner.data( 'ajax-url' ),
    type: $banner.data( 'ajax-method' ),
    dataType: "html",
    success: function( data ) {
      $banner.html( data );
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
$( '.b-content-nav .b-mobile-menu-icon' ).click( function(e) {
  e.stopPropagation();
  $( this ).closest( '.b-content-nav' ).find( '.container' ).slideToggle( 500 )//.toggleClass( 'i-open' );
});

$( '.b-content-nav' ).click( function(e) {
  e.stopPropagation();
});
function DoYouKnowThat( id ) {
  var self = this;
	
	init();
	
	function init() {
		if(!document.getElementById(id)) return false;
		
		self.$elem = $("#" + id);
		handleEvents();
	}
	
	function handleEvents() {
		initMoreButton();
		
		function initMoreButton() {
			self.$elem.find(".b-facts__more__link").click(clickMoreLink);
			
			function clickMoreLink() {
				if(!self.factsArray) {
					getFactsArray();
					return false;
				}
					
				showNextFact();
				trackEvent();
				
				function getFactsArray() {
					$.getJSON(
						"/php/get_more_facts.php",
						success
					)
					
					function success(data, textStatus, jqXHR) {
						self.factsArray = data.facts;
						showNextFact();
					}
				}
				
				function trackEvent() {
					if(!window.ga) return;
					ga('send', 'event', '������ �� �� ���', '������ ������ ���', self.$elem.find(".b-facts__item").text());
				}
				
				return false;
			}
		}
	}
	
	function showNextFact() {
		if(!self.factsArray) {
			self.$elem.find(".b-facts__more__link").click();
			return false;
		}
		
		var factObject = getNextFactObject();
		replaceFactWithNew();
		
		function replaceFactWithNew() {
			self.$elem.find(".b-facts__item").fadeOut(500, function() {
				self.$elem.find(".b-facts__item")
					.attr({"data-id": factObject.id})
					.html(factObject.text)
					.fadeIn(500);
			});
		}
		
		function getNextFactObject() {
			var currentFactObject = {
					id: self.$elem.find(".b-facts__item").attr("data-id"),
					text: self.$elem.find(".b-facts__item").text()
				}
			
			while(self.factsArray[0].id == currentFactObject.id) {
				moveFactObjectToTheEnd();
			}
			
			var resultFactObject = self.factsArray[0];
			moveFactObjectToTheEnd();
			
			function moveFactObjectToTheEnd() {
				self.factsArray.push(self.factsArray.shift());
			}
			
			return resultFactObject;
		}
		
	}
}

new DoYouKnowThat( 'do-you-know-that' );
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
$( '.b-figure__img img' ).each( function() {
  var $this = $( this );
  var title = $this.attr( 'title' );
  $this.closest( 'figure' ).find( 'figcaption' ).text( title );
});



if ( window.jQuery && window.jQuery.fn.fotorama ) {
  $('.fotorama').fotorama();
}
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



$(".input_file").each(function() {
  new InputFile($(this));
});

function InputFile($elem, params) {
	var self = this;
	self.$elem = $elem;
	self.$input = self.$elem.find(":file");
	
	var options = {}, params = params || {};
	options.extentions = params.extentions || ["jpg", "jpeg"];
	options.messages = params.maessages ||
		{
			wrongExtention : "Загружайте изображения в jpeg формате"
		};
	init();
	
	function init() {
		
		createHTML();
		
		self.$name = self.$elem.find("div.new_file_name");
		
		self.$input.change(function() {
			handleChanges();
		});
		
	}
	
	function clearValue() {
		self.$elem.find(":file").remove();
		self.$elem.find(".browse_button").after(self.$input);
	}
	
	function createHTML() {
		self.$elem.html('<div class="browse_button" title="Выбрать файл"></div><div class="blocker"></div><div class="new_file_name"></div>');
		self.$elem.find(".browse_button").after(self.$input);
	}
	
	function handleChanges() {
		
		var fileTitle = getFileTitle();
		
		var fileExt = getFileExt(fileTitle);
		
		if(isValidFileExt(fileExt)) {
			self.$name.text(fileTitle);
			self.$name.removeClass("i-attention");
		}
		else {
			self.$name.text(options.messages.wrongExtention);
			self.$name.addClass("i-attention");
			//clearValue();
		}
		
		self.$name.css({display:"block"});
	}
	
	function filesize (url) {
		var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		if (!req) {
			throw new Error('XMLHttpRequest not supported');
		}
	 
		req.open('HEAD', url, false);
		req.send(null);
	 
		if (!req.getResponseHeader) {
			try {
				throw new Error('No getResponseHeader!');
			} catch (e) {
				return false;
			}
		} else if (!req.getResponseHeader('Content-Length')) {
			try {
				throw new Error('No Content-Length!');
			} catch (e2) {
				return false;
			}
		} else {
			return req.getResponseHeader('Content-Length');
		}
	}
	
	function isValidFileExt(fileExt) {
		
		var flag = false;
		
		for(var i = 0; i < options.extentions.length; i++) {
			if(fileExt.toLowerCase() == options.extentions[i]) flag = true;
		}
		
		return flag;
	}
	
	function getFileExt(fileTitle) {
		var RegExExt =/.*\.(.*)/;
		var fileExt = fileTitle.replace(RegExExt, "$1");
		
		return fileExt;
	}
	
	function getFileTitle() {
		var value = self.$input.val();
		
		var reWin = /.*\\(.*)/;
		var fileTitle = value.replace(reWin, "$1");
		
		var reUnix = /.*\/(.*)/;
		fileTitle = fileTitle.replace(reUnix, "$1");
		
		if (fileTitle.length > 18) {
			fileTitle = "..." + fileTitle.substr(fileTitle.length - 16, 16);
		}
		
		return fileTitle;
	}
}
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


$( '.b-placeholder-load' ).each( function() {
  
  var $placeholderLoad = $( this );
  var $placeholderBlock = $placeholderLoad.parent();
  
  $.ajax({
    url: $placeholderLoad.data( 'url' ),
    type: $placeholderLoad.data( 'method' ),
    dataType: "html",
    success: function ( html ) {
      $placeholderLoad.html( html );
      $placeholderBlock.children( 'style, .i-placeholder' ).remove();
    },
    error: function ( a, b, c ) {
      if ( window.console ) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }
  });
  
});

$( '.b-recipe-thumb__photo' ).lazyload();
if($.placeholder) $("#helper_smartsearch").placeholder();

//slide down, show helper
$("#search_helper_link").click(function() {
  showHideLayer("top_layer");
  $("#search_helper div.body div.menu div.item").removeClass("act");
  $("#search_helper div.body div.menu div.item:eq(0)").addClass("act");
  $("#search_helper div.body div.search_blocks").css({display:"none"});
  $("#h_helper").css({display:"block"});
  $("#i_have_list div.bg table").empty();
  $("#i_have_dash").css({display:"block"});
  $("#search_helper").css({top:"0"}).removeClass("stage_helper").slideDown("middle");
  return false;
});
//slide up helper
$("#search_helper div.body div.slide_up_button").click(function() {
  $("#search_helper").slideUp("middle", function() {
    showHideLayer("top_layer");
  });
});
//topmenu switch
$("#search_helper div.body div.menu div.item a").click(function() {
  $("#search_helper div.body div.search_blocks").css({display:"none"});
  $("#" + $(this).attr("rel")).css({display:"block"});
  $(this).parent().parent().children("div.item").removeClass("act");
  $(this).parent().addClass("act");
  if ($(this).attr("rel") == "h_ingredients") {
    $("#i_have_ingredients_list div.column ul").empty();
    $("#i_have_ingredients_list h2").empty();
    createGroupList();
  }
  return false;
});
$("#i_have_button").click(function() {
  var location = "/search/";
  $(this).parent().find("tr").each(function() {
    location += $(this).find("span").text().toLowerCase() + "/";
  });
  window.location.href = location;
});

$("#helper_smartsearch").focus(function() {
  if (this.value == "") {
    this.value = "";
  }
});
$("#helper_smartsearch").blur(function() {
  if (this.value == "") {
    this.value = "";
  }
});
var keyPress = 0;//ie&chrome 
$("#helper_smartsearch").keyup(function(event) {
  if (window.event) event = window.event;
  switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
    case 38:
      if(keyPress == 0) {smartsearchNavUp(this);
      }
      break;
    case 40:
      if(keyPress == 0) {smartsearchNavDown(this);
      }
      break;
    default:smartsearchFunction(this);
  }
});
$("#helper_smartsearch").keypress(function(event) {
  if (window.event) event = window.event;
  switch (event.keyCode ? event.keyCode : event.which ? event.which : null) {
    case 38:
      keyPress = 1;
      smartsearchNavUp(this);
    break;
    case 40:
      keyPress = 1;
      smartsearchNavDown(this);
    break;
    case 13:
      keyPress = 0;
      pressEnter();
    break;
  }
});


if (document.querySelector('.b-smm-ajax')) {
  setTimeout(function () {
    var $smmAjax = $('.b-smm-ajax');
    $.ajax({
      url: $smmAjax.data('ajax-url'),
      type: $smmAjax.data('ajax-method'), //GET
      dataType: 'html',
      success: function (html) {
        var $smm = $(html);
        $smm.appendTo('body');
        var $smmButton = $smm.find('.b-smm-button');
        $smmAjax.remove();
        setTimeout(function () {
          $smmButton.addClass('i-show');
        }, 0);
      },
      error: function (a, b, c) {
        if (window.console) {
          console.log(a);
          console.log(b);
          console.log(c);
        }
      },
    });
  }, 8000);
}

$(function(){function a(){$(".b-social-buttons__i__icon").unbind("click").bind("click",function(){var a=$(this),b=a.parent(),c=a.data("url"),d="get";return b.addClass("i-preload"),$.ajax({url:c,type:d,dataType:"json",success:function(a){try{$(".b-social-buttons__i__icon").each(function(){var b=$(this);b.data("url")===c&&b.parent().find(".b-social-buttons__i__num").text(a.num)})}catch(d){}b.removeClass("i-preload")},error:function(a){window.console&&console.log(a)}}),!1})}a()});

if( Cookies.get('SUBSCRIBED') === 'Y' ) {
  $( '.b-subscribe' ).height( '58px' ).html( '<div class="text-success">Спасибо за подписку!</div>' );
}

$( '.b-subscribe form' ).submit( function(e) {
  e.preventDefault();
  
  var $form = $( this ),
      mail = $form.find( '[type=email]' ).val(),
      mailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
	
  if ( !mail.match( mailRegex )) {
    return;
  }
  
  $form.addClass( 'i-preload' );
  
  
  $.ajax({
    url: $form.data( 'url' ),
    type: $form.attr( 'method' ),
    dataType: 'json',
    data: $form.serialize(),
    success: function( data ) {
      $form
        .removeClass( 'i-preload' )
        .find( 'p.text-warning' ).remove();
      try {
      
        if ( data.response === 'success' ) {
          $form.parent().height( $form.parent().height() );
          $form.before( '<div class="text-success">' + data.text + '</div>' );
          $form.remove();
          Cookies.set('SUBSCRIBED', 'Y', { expires: 7, path: window.location.hostname });
        } else {
          $form.prepend( '<p class="text-warning">' + data.text + '</p>' );
        }
      } catch ( err ) {
        throw err;
      }
    }
  });
});
document.querySelectorAll('.b-switcher').forEach(function (switcher) {
  var underline = switcher.querySelector('.b-switcher__underline');
  switcher.querySelectorAll('.b-switcher__item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      moveUnderline(item);
    });
  });

  switcher.querySelector('.b-switcher__item').click();

  function moveUnderline(item) {
    switcher.querySelectorAll('.b-switcher__item').forEach(function (item) {
      item.classList.remove('active');
    });
    item.classList.add('active');
    underline.style.width = item.offsetWidth + 'px';
    underline.style.left =
      item.getBoundingClientRect().left -
      switcher.getBoundingClientRect().left +
      'px';
  }
});

$(document).bind("click", function() {

  $("#top_panel .kitchen .submenu")
    .slideUp("middle")
      .siblings("a")
        .children("span")
          .addClass("up")
          .removeClass("down");
          
  $("#top_panel .add .body").slideUp( "middle" );
  
});

$( "#top_panel span.kitchen > a" ).click( function(e) {
  $( this )
    .siblings( ".submenu" )
      .slideToggle( "middle" ).end()
    .children( "span" )
      .toggleClass( "up" )
      .toggleClass( "down" );
      
  e.preventDefault();
  e.stopPropagation();
});

$("#top_panel .add .button").click( function(e) {
  $( this )
    .siblings( ".submenu" ).children( ".body" )
      .slideToggle( "middle" );
    
  e.preventDefault();
  e.stopPropagation();
});

if ( window.BX ) {
	BX.addCustomEvent( "onFrameDataReceived", function () {

    $( "#top_panel span.kitchen > a" ).click( function(e) {
      $( this )
        .siblings( ".submenu" )
          .slideToggle( "middle" ).end()
        .children( "span" )
          .toggleClass( "up" )
          .toggleClass( "down" );
          
      e.preventDefault();
      e.stopPropagation();
    });

    $("#top_panel .add .button").click( function(e) {
      $( this )
        .siblings( ".submenu" ).children( ".body" )
          .slideToggle( "middle" );
        
      e.preventDefault();
      e.stopPropagation();
    });

	});
}

if ( $( '.b-zen-ajax' ).length ) {
  setTimeout( function() {
    var $zenAjax = $( '.b-zen-ajax' );
    $.ajax({
      url: $zenAjax.data( 'ajax-url' ),
      type: $zenAjax.data( 'ajax-method' ),//GET
      dataType: "html",
      success: function( html ) {
        var $zenButton = $( html );
        $zenButton.appendTo( 'body' ).hover( hoverZen, houtZen );
        $zenAjax.remove();
        setTimeout( function() {
          $zenButton.addClass( 'i-show' );
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
  }, 7800);
}

function hoverZen() {
  var $zenButton = $(this);
  
  $zenButton.addClass( 'i-open' );
}

function houtZen() {
  var $zenButton = $(this);
  
  $zenButton.removeClass( 'i-open' );
}

  });

}( jQuery ));

// JavaScript micro-templating, from underscore.js
function tmpl(str) {
  var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
    'with(obj||{}){__p.push(\'' +
    str.replace(/\\/g, '\\\\')
       .replace(/'/g, "\\'")
       .replace(/<%-([\s\S]+?)%>/g, function(match, code) {
         return "',esc(" + code.replace(/\\'/g, "'") + "),'";
       })
       .replace(/<%=([\s\S]+?)%>/g, function(match, code) {
         return "'," + code.replace(/\\'/g, "'") + ",'";
       })
       .replace(/<%([\s\S]+?)%>/g, function(match, code) {
         return "');" + code.replace(/\\'/g, "'")
                            .replace(/[\r\n\t]/g, ' ') + ";__p.push('";
       })
       .replace(/\r/g, '\\r')
       .replace(/\n/g, '\\n')
       .replace(/\t/g, '\\t')
       + "');}return __p.join('');";
  var func = new Function('obj', tmpl);
  return function(data) {
    return func.call(this, data);
  };
};

//showHideLayer
function showHideLayer(layer_id) {
	var layer = document.getElementById(layer_id);
	if (layer.style.display == "none") {
		layer.style.display = "block";
		if (layer_id == "top_layer") {
			layer.style.height = getyScroll() + "px";
			for (var i = 0; i < layer.childNodes.length; i++) {
				if (layer.childNodes[i].tagName == "IFRAME") {
					layer.childNodes[i].style.height = getyScroll() + "px";
					layer.childNodes[i].style.width = "100%";
				}
			}
		}
		else {
			var layerHeight = $(layer).height();
			if ($(layer).find("div.padding").height() != "") {
				layerHeight = $(layer).find("div.padding").height();
			}
			if (document.documentElement.clientHeight > layerHeight) {
				var lTop = (document.documentElement.clientHeight)/2 + $(window).scrollTop() - layerHeight/2 - 20 + "px";
			}
			else {
				var lTop = $(window).scrollTop() + 20 + "px";
			}
			if (layer_id == "ingredients_list_layer" || layer_id == "stage_ingredients_list_layer") {
				var lTop = $(window).scrollTop() + 20 + "px";
			}
			$("#" + layer_id).animate({top:lTop}, 500, function() {
				$("#top_layer").height($(document).height() + 30);
				$("#top_layer iframe").height($(document).height() + 30);
			});
		}
	}
	else {layer.style.display = "none";
	}
}

function getyScroll() {
	var yScroll = 0;
	
	if (window.innerHeight && window.scrollMaxY) {
		yScroll = window.innerHeight + window.scrollMaxY;
		
		var deff = document.documentElement;
		var hff = (deff&&deff.clientHeight) || document.body.clientHeight || window.innerHeight || self.innerHeight;
	
		yScroll -= (window.innerHeight - hff);
	} 
	else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
		yScroll = document.body.scrollHeight;
	} 
	else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		yScroll = document.body.offsetHeight;
	}
	return yScroll;
}

//helper.js
function showList(listArray, chosenArray, header) {//list of ingredients
	var itemsNumbering = Math.ceil(listArray.length/3);
	var ul_1 = $("<ul>").appendTo($("#search_list_layer div.relative div.padding div.column:eq(0)"));
	for (var i = 0; i < itemsNumbering; i++ ) {
		if (listArray[i]) {
			var li = $('<li rel="' + i + '">').appendTo($(ul_1));
			var anc = $('<a href="#">' + listArray[i] + '</a>').appendTo($(li));
			
			for (var j = 0; j < chosenArray.length; j++) {
				if (chosenArray[j] == i) {
					$(li).addClass("selected");
				}
			}
			$(anc).click(function() {
				$(this).parent().toggleClass("selected");
				return false;
			});
		}
	}
	
	var ul_2 = $("<ul>").appendTo($("#search_list_layer div.relative div.padding div.column:eq(1)"));
	for (var i = itemsNumbering; i < itemsNumbering*2; i++ ) {
		if (listArray[i]) {
			var li = $('<li rel="' + i + '">').appendTo($(ul_2));
			var anc = $('<a href="#">' + listArray[i] + '</a>').appendTo($(li));
			
			for (var j = 0; j < chosenArray.length; j++) {
				if (chosenArray[j] == i) {
					$(li).addClass("selected");
				}
			}
			$(anc).click(function() {
				$(this).parent().toggleClass("selected");
				return false;
			});
		}
	}
	
	var ul_3 = $("<ul>").appendTo($("#search_list_layer div.relative div.padding div.column:eq(2)"));
	for (var i = itemsNumbering*2; i < listArray.length; i++ ) {
		if (listArray[i]) {
			var li = $('<li rel="' + i + '">').appendTo($(ul_3));
			var anc = $('<a href="#">' + listArray[i] + '</a>').appendTo($(li));
			
			for (var j = 0; j < chosenArray.length; j++) {
				if (chosenArray[j] == i) {
					$(li).addClass("selected");
				}
			}
			$(anc).click(function() {
				$(this).parent().toggleClass("selected");
				return false;
			});
		}
	}
	$("#search_list_layer div.relative div.padding h2").text(header);
}

//открытие формы выбора ингредиентов - формирование списка групп
function createGroupList(topIcon) {
	var groupUl = $("#i_have_ingredients_group ul").empty();
	//ul
	var liArray = new Array();//массив со всеми li групп ингредиентов
	for (var i = 0; i < ingredientArray[1].length; i++) {
		var groupLi = $('<li><a href="#" onClick="showIngredients(' + i + ', ' + topIcon + '); return false;">' + ingredientArray[1][i] + '</a><span>' + ingredientArray[1][i] + '</span></li>').appendTo($(groupUl));
		liArray.push(groupLi);
	}
	$("#i_have_ingredients_group ul li:eq(0)").addClass("act");
	showIngredients(0, topIcon);
	//если вызываем окно с ингредиентами повторно для данного этапа
	if (chosenSearchIngredient[0].length != 0) {
		for (var i = 0; i < chosenSearchIngredient[0].length; i++) {
			showSubList(liArray[chosenSearchIngredient[0][i]], true, chosenSearchIngredient[0][i], chosenSearchIngredient[1][i]);
		}
	}
}

//заполнение поля со списком ингредиентов (верхний слой)
function showIngredients(group_number, topIcon) {
	var groupNumber = group_number;
	$("#i_have_ingredients_list div.column ul").empty();
	
	$("#i_have_ingredients_group ul li").removeClass("act");
	$("#i_have_ingredients_group ul li:eq(" + groupNumber + ")").addClass("act");
		
	//h2
	$("#i_have_ingredients_list h2").text(ingredientArray[1][group_number]);
	
	//ul
	var iHaveArray = new Array();
	$("#i_have_list").find("tr").each(function() {
		iHaveArray.push($(this).attr("class"));
	});
	if (((ingredientArray[2][groupNumber][0].length*18) + 50) > $("#i_have_ingredients_group").height()) {
		if (((ingredientArray[2][groupNumber][0].length/2*18) + 50) >= $("#i_have_ingredients_group").height()) {
			var columnUl = $("#i_have_ingredients_list div.column ul:eq(0)");
			for (var i = 0; i < ingredientArray[2][groupNumber][0].length/2; i++) {
				var classId = ingredientArray[2][groupNumber][0][i];
				for (var j = 0; j < iHaveArray.length; j++) {
					if (iHaveArray[j] == classId) {
						classId += " selected";
					}
				}
				$(columnUl).append('<li class="' + classId + '"><a href="#" onClick="selectIngredient(this, ' +  groupNumber + ', ' + i + ', ' + topIcon + '); return false;">' + ingredientArray[2][groupNumber][1][i] + '</a></li>');
			}
			columnUl = $("#i_have_ingredients_list div.column ul:eq(1)");
			for (var i = Math.ceil(ingredientArray[2][groupNumber][0].length/2); i < ingredientArray[2][groupNumber][0].length; i++) {
				var classId = ingredientArray[2][groupNumber][0][i];
				for (var j = 0; j < iHaveArray.length; j++) {
					if (iHaveArray[j] == classId) {
						classId += " selected";
					}
				}
				$(columnUl).append('<li class="' + classId + '"><a href="#" onClick="selectIngredient(this, ' +  groupNumber + ', ' + i + ', ' + topIcon + '); return false;">' + ingredientArray[2][groupNumber][1][i] + '</a></li>');
			}
		}
		else {
			var columnUl = $("#i_have_ingredients_list div.column ul:eq(0)");
			for (var i = 0; i < ingredientArray[2][groupNumber][0].length; i++) {
				if ($("#i_have_ingredients_group").height() > $("#i_have_ingredients_list").height()) {
					var classId = ingredientArray[2][groupNumber][0][i];
					for (var j = 0; j < iHaveArray.length; j++) {
						if (iHaveArray[j] == classId) {
							classId += " selected";
						}
					}
					$(columnUl).append('<li class="' + classId + '"><a href="#" onClick="selectIngredient(this, ' +  groupNumber + ', ' + i + ', ' + topIcon + '); return false;">' + ingredientArray[2][groupNumber][1][i] + '</a></li>');
				}
				else {
					columnUl = $("#i_have_ingredients_list div.column ul:eq(1)");
					var classId = ingredientArray[2][groupNumber][0][i];
					for (var j = 0; j < iHaveArray.length; j++) {
						if (iHaveArray[j] == classId) {
							classId += " selected";
						}
					}
					$(columnUl).append('<li class="' + classId + '"><a href="#" onClick="selectIngredient(this, ' +  groupNumber + ', ' + i + ', ' + topIcon + '); return false;">' + ingredientArray[2][groupNumber][1][i] + '</a></li>');
				}
			}
		}
	}
	else {
		var columnUl = $("#i_have_ingredients_list div.column ul:eq(0)");
		for (var i = 0; i < ingredientArray[2][groupNumber][0].length; i++) {
			var classId = ingredientArray[2][groupNumber][0][i];
			for (var j = 0; j < iHaveArray.length; j++) {
				if (iHaveArray[j] == classId) {
					classId += " selected";
				}
			}
			$(columnUl).append('<li class="' + classId + '"><a href="#" onClick="selectIngredient(this, ' +  groupNumber + ', ' + i + ', ' + topIcon + '); return false;">' + ingredientArray[2][groupNumber][1][i] + '</a></li>');
		}
	}
	
	increaseTopLayer();
}

function selectIngredient(anchor_element, group_number, ingredient_number, topIcon) {
	if(topIcon == 10) {
		var anchorElement = anchor_element;
		$("#dish_description input.smartsearch").attr({value:$(anchorElement).text()}).closest("div.form_field").find(":hidden").attr({value:$(anchorElement).parent().attr("class")});
		hideStageIngredientsLayer();
	}
	else {
		var anchorElement = anchor_element;
		$(anchor_element).parent().toggleClass("selected");
		if (anchorElement.parentNode.className.search("selected") != -1) {
			var addInr = 1;
		}
		else {var addInr = 0;
		}
		fillIHaveTable(addInr, group_number, ingredient_number);
	}
}

//fill i-have table
function fillIHaveTable(addInr, group_number, ingredient_number) {
	if (addInr == 1) {
		var trObject = $('<tr class="' + ingredientArray[2][group_number][0][ingredient_number] + '"><td><span>' + ingredientArray[2][group_number][1][ingredient_number] + '</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');
		$(trObject).find("a.delete").hover(function() {
			$(this).addClass("hover");
		}, function() {
			$(this).removeClass("hover");
		}).click(function() {
			var id = this.parentNode.parentNode.className;
			$("#i_have_ingredients_list").find("li." + id).removeClass("selected");
			$(this).parent().parent().remove();
			if($("#i_have_list div.bg table tr").length == 0) {
				$("#i_have_dash").css({display:"block"});
			}
			return false;
		});
		$("#i_have_list div.bg table").append(trObject);
		$("#i_have_dash").css({display:"none"});
	}
	else {
		$("#i_have_list div.bg table").find("tr." + ingredientArray[2][group_number][0][ingredient_number]).remove();
		if($("#i_have_list div.bg table tr").length == 0) {
			$("#i_have_dash").css({display:"block"});
		}
	}
}

//формирование массива ингредиентов этапа для вывода в форме со списком ингредиентов
function addIngredients() {	
	//формирование массива ингредиентов, поступивших из формы
	var length1 = chosenSearchIngredient[0].length;
	for (var i = 0; i < length1; i++) {
		chosenSearchIngredient[0].pop();
	}
	var length2 = chosenSearchIngredient[1].length;
	for (var i = 0; i < length2; i++) {
		chosenSearchIngredient[1].pop();
	}
	var ingredientsGroupDiv = document.getElementById("ingredients_group");
	for (var i = 0; i < ingredientsGroupDiv.childNodes.length; i++) {
		if (ingredientsGroupDiv.childNodes[i].tagName == "UL") {
			var groupUl = ingredientsGroupDiv.childNodes[i];
			var groupLiArray = new Array();
			for (var j = 0; j < groupUl.childNodes.length; j++) {
				if (groupUl.childNodes[j].tagName == "LI") {
					groupLiArray.push(groupUl.childNodes[j]);
				}
			}
		}
	}
	for (var i = 0; i < groupLiArray.length; i++) {
		for (var j = 0; j < groupLiArray[i].childNodes.length; j++) {
			if (groupLiArray[i].childNodes[j].className == "items") {
				var itemsSpan = groupLiArray[i].childNodes[j];
				for (var k = 0; k < itemsSpan.childNodes.length; k++) {
					if (itemsSpan.childNodes[k].tagName == "UL") {
						for (var n = 0; n < itemsSpan.childNodes[k].childNodes.length; n++) {
							if (itemsSpan.childNodes[k].childNodes[n].tagName == "LI" && itemsSpan.childNodes[k].childNodes[n].className != "separator") {
								chosenSearchIngredient[0].push(i);
								chosenSearchIngredient[1].push(itemsSpan.childNodes[k].childNodes[n].className);
							}
						}
					}
				}
			}
		}
	}
	fillSearchField();
	hideIngredientsLayer();
}

function fillSearchField() {
	//записываем выбранные ингредиенты в поле
	var inputString = new String();
	var kitchenInput = new Array();
	var dishInput = new Array();
	var ingredientInput = new Array();
	for (var i = 0; i < chosenSearchKitchen.length; i++) {
		if (inputString == "") {
			inputString = kitchenArray[1][chosenSearchKitchen[i]];
		}
		else {
			inputString += ", ";
			inputString += kitchenArray[1][chosenSearchKitchen[i]].toLowerCase();
		}
	}
	for (var i = 0; i < chosenSearchDish.length; i++) {
		if (inputString == "") {
			inputString = dishArray[1][chosenSearchDish[i]];
		}
		else {
			inputString += ", ";
			inputString += dishArray[1][chosenSearchDish[i]].toLowerCase();
		}
	}
	for (var i = 0; i < chosenSearchIngredient[0].length; i++) {
		if (inputString == "") {
			inputString = ingredientArray[2][chosenSearchIngredient[0][i]][1][chosenSearchIngredient[1][i]];
		}
		else {
			inputString += ", ";
			inputString += ingredientArray[2][chosenSearchIngredient[0][i]][1][chosenSearchIngredient[1][i]].toLowerCase();
		}
//		ingredientInput.push($('<input type="hidden" name="ingredient_id[]" value="' + ingredientArray[2][chosenSearchIngredient[0][i]][0][chosenSearchIngredient[1][i]] + '">'));
	}
	$("#recipe_search_field").attr({value:""}).attr({value:inputString});
/*	$("#recipe_search div.search_field form input:hidden").remove();
	for (var i = 0; i < ingredientInput.length; i++) {
		$("#recipe_search div.search_field form").prepend(ingredientInput[i]);
	}
	for (var i = 0; i < dishInput.length; i++) {
		$("#recipe_search div.search_field form").prepend(dishInput[i]);
	}
	for (var i = 0; i < kitchenInput.length; i++) {
		$("#recipe_search div.search_field form").prepend(kitchenInput[i]);
	}*/
}

var smartsearchInputValue;
function smartsearchNavUp(inputObject) {
	var preLi = $(inputObject).siblings("div.search_list").children("ul").children("li.hover");
	if ($(preLi).text() == "") {
		smartsearchInputValue = $(inputObject).attr("value");
		var nowLi = $(inputObject).siblings("div.search_list").children("ul").children("li:last");
		$(nowLi).addClass("hover");
		$(inputObject).attr({value:$(nowLi).text()});
	}
	else {
		$(preLi).removeClass("hover");
		var nowLi = $(preLi).prev("li");
		if ($(nowLi).text() != "") {
			$(nowLi).addClass("hover");
			$(inputObject).attr({value:$(nowLi).text()});
		}
		else {
			$(inputObject).attr({value:smartsearchInputValue});
		}
	}
}

function smartsearchNavDown(inputObject) {
	var preLi = $(inputObject).siblings("div.search_list").children("ul").children("li.hover");
	if ($(preLi).text() == "") {
		smartsearchInputValue = $(inputObject).attr("value");
		var nowLi = $(inputObject).siblings("div.search_list").children("ul").children("li:first");
		$(nowLi).addClass("hover");
		$(inputObject).attr({value:$(nowLi).text()});
	}
	else {
		$(preLi).removeClass("hover");
		var nowLi = $(preLi).next("li");
		if ($(nowLi).text() != "") {
			$(nowLi).addClass("hover");
			$(inputObject).attr({value:$(nowLi).text()});
		}
		else {
			$(inputObject).attr({value:smartsearchInputValue});
		}
	}
}

function smartsearchFunction(inputObject) {
	$(inputObject).siblings("div.search_list").children("ul").empty();
	if($(inputObject).attr("value") != "") {
		var searchString = new String($(inputObject).attr("value")).toLowerCase().split(" ");
		
		var smartsearchArrayLower = new Array();
		for (var i = 0; i < smartsearchArray.length; i++) {
			smartsearchArrayLower.push(String(smartsearchArray[i]).toLowerCase());
		}
		var indexOfArray = new Array();
		for (var i = 0; i < smartsearchArrayLower.length; i++) {
			//perfect match //if ($(inputObject).attr("value").toLowerCase() != smartsearchArrayLower[i]) {
				var indexOfValue = 100;
				for (var e = 0; e < searchString.length; e++) {
					indexOfValue = Math.min(indexOfValue, smartsearchArrayLower[i].indexOf(searchString[e]));
				}
				if (indexOfValue != -1) {
					if(!indexOfArray[indexOfValue]) {
						indexOfArray[indexOfValue] = new Array();
					}
					indexOfArray[indexOfValue].push(smartsearchArray[i]);
				}
			//}
		}
		var sortedArray = new Array();
		for (var i = 0; i < indexOfArray.length; i++) {
			if (indexOfArray[i]) {
				indexOfArray[i].sort();
				for (var j = 0; j < indexOfArray[i].length; j++) {
					sortedArray.push(indexOfArray[i][j]);
				}
			}
		}
		if (sortedArray.length != 0) {
			$(inputObject).siblings("div.search_list").children("ul").css({display:"block"});
		}
		else {
			$(inputObject).siblings("div.search_list").children("ul").css({display:"none"});
		}
		for (var i = 0; i < sortedArray.length; i++) {
			if (i < 7) {
				$(inputObject).siblings("div.search_list").children("ul").append('<li>' + sortedArray[i] + '</li>');
			}
		}
		$(inputObject).siblings("div.search_list").children("ul").children("li").hover(function() {
			$(this).addClass("hover");
			$(inputObject).siblings("input.click_field").attr({value:$(this).text()});
		}, function() {
			$(this).removeClass("hover");
		}).click(function() {
			if (this.parentNode.parentNode.parentNode.className == "item") {
				$(this).parent().css({display:"none"}).empty();
				$(inputObject).attr({value:$(inputObject).siblings("input.click_field").attr("value")}).focus();
				showUnitField(inputObject);
			}
			else if (this.parentNode.parentNode.parentNode.parentNode.className == "dish_parents") {
				$(this).parent().css({display:"none"}).empty();
				$(inputObject).attr({value:$(this).text()}).focus();
				var liId;
				for (var r = 0; r < smartsearchArray.length; r++) {
					if ($(this).text() == smartsearchArray[r]) {
						liId = smartsearchIdArray[r];
					}
				}
				$(inputObject).siblings("input[name*='id']").attr({value:liId});
			}
			else {
				$(inputObject).attr({value:""}).focus();
				$(this).parent().css({display:"none"}).empty();
				
				var liId;
				for (var r = 0; r < smartsearchArray.length; r++) {
					if ($(this).text() == smartsearchArray[r]) {
						liId = smartsearchIdArray[r];
					}
				}
				
				if (!$("#i_have_list div.bg table").find("tr." + liId).html()) {
					var trObject = $('<tr class="' + liId + '"><td><span>' + $(this).text() + '</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');
					$(trObject).find("a.delete").hover(function() {
						$(this).addClass("hover");
					}, function() {
						$(this).removeClass("hover");
					}).click(function() {
						var id = this.parentNode.parentNode.className;
						$("#i_have_ingredients_list").find("li." + id).removeClass("selected");
						$(this).parent().parent().remove();
						if($("#i_have_list div.bg table tr").length == 0) {
							$("#i_have_dash").css({display:"block"});
						}
						return false;
					});
					$("#i_have_list div.bg table").append(trObject);
					$("#i_have_ingredients_list").find("li." + liId).addClass("selected");
					$("#i_have_dash").css({display:"none"});
				}
			}
		});
	}
	else {
		$(inputObject).siblings("div.search_list").children("ul").css({display:"none"});
	}
}

function pressEnter() {
	var liHover = $("#helper_smartsearch").parent().find("li.hover");
	
	if ($(liHover).text()) {
		$("#helper_smartsearch").attr({value:""}).focus();
		$(this).parent().css({display:"none"}).empty();
		
		var liId;
		for (var r = 0; r < smartsearchArray.length; r++) {
			if ($(liHover).text() == smartsearchArray[r]) {
				liId = smartsearchIdArray[r];
			}
		}
		
		if (!$("#i_have_list div.bg table").find("tr." + liId).html()) {
			var trObject = $('<tr class="' + liId + '"><td><span>' + $(liHover).text() + '</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');
			$(trObject).find("a.delete").hover(function() {
				$(this).addClass("hover");
			}, function() {
				$(this).removeClass("hover");
			}).click(function() {
				var id = this.parentNode.parentNode.className;
				$("#i_have_ingredients_list").find("li." + id).removeClass("selected");
				$(this).parent().parent().remove();
				if($("#i_have_list div.bg table tr").length == 0) {
					$("#i_have_dash").css({display:"block"});
				}
				return false;
			});
			$("#i_have_list div.bg table").append(trObject);
			$("#i_have_ingredients_list").find("li." + liId).addClass("selected");
			$("#i_have_dash").css({display:"none"});
		} 
	}
	else {
		for (var t = 0; t < smartsearchArray.length; t++) {
			if ($("#helper_smartsearch").attr("value").toLowerCase() == smartsearchArray[t].toLowerCase()) {
				var ingName = smartsearchArray[t];
				var ingId = smartsearchIdArray[t];
				if (!$("#i_have_list div.bg table").find("tr." + ingId).html()) {
					var trObject = $('<tr class="' + ingId + '"><td><span>' + ingName + '</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');
					$(trObject).find("a.delete").hover(function() {
						$(this).addClass("hover");
					}, function() {
						$(this).removeClass("hover");
					}).click(function() {
						var id = this.parentNode.parentNode.className;
						$("#i_have_ingredients_list").find("li." + id).removeClass("selected");
						$(this).parent().parent().remove();
						if($("#i_have_list div.bg table tr").length == 0) {
							$("#i_have_dash").css({display:"block"});
						}
					});
					$("#i_have_list div.bg table").append(trObject);
					$("#i_have_ingredients_list").find("li." + ingId).addClass("selected");
					$("#i_have_dash").css({display:"none"});
				} 
				$("#helper_smartsearch").attr({value:""}).focus();
				$(this).parent().css({display:"none"}).empty();
			}
		}
	}
}
function ajaxError(a, b, c) {
	if(window.console) {
		console.log(a);
		console.log(b);
		console.log(c);
	}
}
function alignImg($context) {
	var $context = $context || $("body");
	
	if(!$context.is("img")) {
		$context = $context.find(".i-align-img");
	}
	$context.each(align);
	
	function align() {
		var $img = $(this),
			$parent = $img.parent(),
			img = new Image();
			
		img.src = $img.attr("src");
		var size = $parent.height();
		if(img.width > 0) {
			align();
		} else {
			$img.load(function() {
				align();
			});
		}
		
		function align() {
			if(img.width > img.height) {
				var width = Math.floor(img.width * size / img.height);
				$img.height(size).width(width);
				$img.css({marginLeft: (size/2 - width/2) + "px"});
			} else {
				var height = Math.floor(img.height * size / img.width);
				$img.width(size).height(height);
				$img.css({marginTop: (size/2 - height/2) + "px"});
			}
			
			$img.attr({"data-size": size, "data-width": $img.width(), "data-height": $img.height(), "data-marginLeft": $img.css("marginLeft"), "data-marginTop": $img.css("marginTop") });
		}
	}
}
/**
* @author Falchenko Maxim aka be3
* @plugin_page http://tops.net.ua/jquery_addtocopy/
* @desc Adds a link to the copied text
* @version 1.2
* @example
* $("#content").addtocopy();
* @license free
**/
jQuery.fn.addtocopy = function(usercopytxt) {
    var options = {htmlcopytxt: '<br>More: <a href="'+window.location.href+'">'+window.location.href+'</a><br>', minlen: 25, addcopyfirst: false}
    $.extend(options, usercopytxt);
	var copy_sp = document.createElement('span');
	copy_sp.id = 'ctrlcopy';
	copy_sp.innerHTML = options.htmlcopytxt;
	return this.each(function(){
		$(this).mousedown(function(){$('#ctrlcopy').remove();});
		$(this).mouseup(function(){
			if(window.getSelection){	//good times 
				var slcted=window.getSelection();
				var seltxt=slcted.toString();
				if(!seltxt||seltxt.length<options.minlen) return;
				var nslct = slcted.getRangeAt(0);
				seltxt = nslct.cloneRange();
				seltxt.collapse(options.addcopyfirst);
				seltxt.insertNode(copy_sp);
				if (!options.addcopyfirst) nslct.setEndAfter(copy_sp);
				slcted.removeAllRanges();
				slcted.addRange(nslct);
			} else if(document.selection){	//bad times
				var slcted = document.selection;
				var nslct=slcted.createRange();
				var seltxt=nslct.text;
				if (!seltxt||seltxt.length<options.minlen) return;
				seltxt=nslct.duplicate();
				seltxt.collapse(options.addcopyfirst);
				seltxt.pasteHTML(copy_sp.outerHTML);
				if (!options.addcopyfirst) {nslct.setEndPoint("EndToEnd",seltxt); nslct.select();}
			}
		});
  });
}
/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

/* jquery.nicescroll 3.6.6 InuYaksa*2015 MIT http://nicescroll.areaaperta.com */(function(e){"function"===typeof define&&define.amd?define(["jquery"],e):"object"===typeof exports?module.exports=e(require("jquery")):e(jQuery)})(function(e){var A=!1,E=!1,O=0,P=2E3,z=0,I=["webkit","ms","moz","o"],u=window.requestAnimationFrame||!1,v=window.cancelAnimationFrame||!1;if(!u)for(var Q in I){var F=I[Q];u||(u=window[F+"RequestAnimationFrame"]);v||(v=window[F+"CancelAnimationFrame"]||window[F+"CancelRequestAnimationFrame"])}var x=window.MutationObserver||window.WebKitMutationObserver||
!1,J={zindex:"auto",cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"5px",cursorborder:"1px solid #fff",cursorborderradius:"5px",scrollspeed:60,mousescrollstep:24,touchbehavior:!1,hwacceleration:!0,usetransition:!0,boxzoom:!1,dblclickzoom:!0,gesturezoom:!0,grabcursorenabled:!0,autohidemode:!0,background:"",iframeautoresize:!0,cursorminheight:32,preservenativescrolling:!0,railoffset:!1,railhoffset:!1,bouncescroll:!0,spacebarenabled:!0,railpadding:{top:0,right:0,left:0,bottom:0},
disableoutline:!0,horizrailenabled:!0,railalign:"right",railvalign:"bottom",enabletranslate3d:!0,enablemousewheel:!0,enablekeyboard:!0,smoothscroll:!0,sensitiverail:!0,enablemouselockapi:!0,cursorfixedheight:!1,directionlockdeadzone:6,hidecursordelay:400,nativeparentscrolling:!0,enablescrollonselection:!0,overflowx:!0,overflowy:!0,cursordragspeed:.3,rtlmode:"auto",cursordragontouch:!1,oneaxismousemode:"auto",scriptpath:function(){var e=document.getElementsByTagName("script"),e=e.length?e[e.length-
1].src.split("?")[0]:"";return 0<e.split("/").length?e.split("/").slice(0,-1).join("/")+"/":""}(),preventmultitouchscrolling:!0},G=!1,R=function(){if(G)return G;var e=document.createElement("DIV"),c=e.style,h=navigator.userAgent,n=navigator.platform,d={haspointerlock:"pointerLockElement"in document||"webkitPointerLockElement"in document||"mozPointerLockElement"in document};d.isopera="opera"in window;d.isopera12=d.isopera&&"getUserMedia"in navigator;d.isoperamini="[object OperaMini]"===Object.prototype.toString.call(window.operamini);
d.isie="all"in document&&"attachEvent"in e&&!d.isopera;d.isieold=d.isie&&!("msInterpolationMode"in c);d.isie7=d.isie&&!d.isieold&&(!("documentMode"in document)||7==document.documentMode);d.isie8=d.isie&&"documentMode"in document&&8==document.documentMode;d.isie9=d.isie&&"performance"in window&&9<=document.documentMode;d.isie10=d.isie&&"performance"in window&&10==document.documentMode;d.isie11="msRequestFullscreen"in e&&11<=document.documentMode;d.isieedge=navigator.userAgent.match(/Edge\/12\./);d.isie9mobile=
/iemobile.9/i.test(h);d.isie9mobile&&(d.isie9=!1);d.isie7mobile=!d.isie9mobile&&d.isie7&&/iemobile/i.test(h);d.ismozilla="MozAppearance"in c;d.iswebkit="WebkitAppearance"in c;d.ischrome="chrome"in window;d.ischrome22=d.ischrome&&d.haspointerlock;d.ischrome26=d.ischrome&&"transition"in c;d.cantouch="ontouchstart"in document.documentElement||"ontouchstart"in window;d.hasmstouch=window.MSPointerEvent||!1;d.hasw3ctouch=(window.PointerEvent||!1)&&(0<navigator.MaxTouchPoints||0<navigator.msMaxTouchPoints);
d.ismac=/^mac$/i.test(n);d.isios=d.cantouch&&/iphone|ipad|ipod/i.test(n);d.isios4=d.isios&&!("seal"in Object);d.isios7=d.isios&&"webkitHidden"in document;d.isandroid=/android/i.test(h);d.haseventlistener="addEventListener"in e;d.trstyle=!1;d.hastransform=!1;d.hastranslate3d=!1;d.transitionstyle=!1;d.hastransition=!1;d.transitionend=!1;n=["transform","msTransform","webkitTransform","MozTransform","OTransform"];for(h=0;h<n.length;h++)if("undefined"!=typeof c[n[h]]){d.trstyle=n[h];break}d.hastransform=
!!d.trstyle;d.hastransform&&(c[d.trstyle]="translate3d(1px,2px,3px)",d.hastranslate3d=/translate3d/.test(c[d.trstyle]));d.transitionstyle=!1;d.prefixstyle="";d.transitionend=!1;for(var n="transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "),p=" -webkit- -ms- -moz- -o- -o -khtml-".split(" "),q="transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "),h=0;h<n.length;h++)if(n[h]in
c){d.transitionstyle=n[h];d.prefixstyle=p[h];d.transitionend=q[h];break}d.ischrome26&&(d.prefixstyle=p[1]);d.hastransition=d.transitionstyle;a:{h=["-webkit-grab","-moz-grab","grab"];if(d.ischrome&&!d.ischrome22||d.isie)h=[];for(n=0;n<h.length;n++)if(p=h[n],c.cursor=p,c.cursor==p){c=p;break a}c="url(//mail.google.com/mail/images/2/openhand.cur),n-resize"}d.cursorgrabvalue=c;d.hasmousecapture="setCapture"in e;d.hasMutationObserver=!1!==x;return G=d},S=function(k,c){function h(){var b=a.doc.css(f.trstyle);
return b&&"matrix"==b.substr(0,6)?b.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):!1}function n(){var b=a.win;if("zIndex"in b)return b.zIndex();for(;0<b.length&&9!=b[0].nodeType;){var g=b.css("zIndex");if(!isNaN(g)&&0!=g)return parseInt(g);b=b.parent()}return!1}function d(b,g,l){g=b.css(g);b=parseFloat(g);return isNaN(b)?(b=y[g]||0,l=3==b?l?a.win.outerHeight()-a.win.innerHeight():a.win.outerWidth()-a.win.innerWidth():1,a.isie8&&b&&(b+=1),l?b:0):b}function p(b,g,l,c){a._bind(b,g,function(a){a=
a?a:window.event;var c={original:a,target:a.target||a.srcElement,type:"wheel",deltaMode:"MozMousePixelScroll"==a.type?0:1,deltaX:0,deltaZ:0,preventDefault:function(){a.preventDefault?a.preventDefault():a.returnValue=!1;return!1},stopImmediatePropagation:function(){a.stopImmediatePropagation?a.stopImmediatePropagation():a.cancelBubble=!0}};"mousewheel"==g?(c.deltaY=-.025*a.wheelDelta,a.wheelDeltaX&&(c.deltaX=-.025*a.wheelDeltaX)):c.deltaY=a.detail;return l.call(b,c)},c)}function q(b,g,c){var d,f;0==
b.deltaMode?(d=-Math.floor(a.opt.mousescrollstep/54*b.deltaX),f=-Math.floor(a.opt.mousescrollstep/54*b.deltaY)):1==b.deltaMode&&(d=-Math.floor(b.deltaX*a.opt.mousescrollstep),f=-Math.floor(b.deltaY*a.opt.mousescrollstep));g&&a.opt.oneaxismousemode&&0==d&&f&&(d=f,f=0,c&&(0>d?a.getScrollLeft()>=a.page.maxw:0>=a.getScrollLeft())&&(f=d,d=0));d&&(a.scrollmom&&a.scrollmom.stop(),a.lastdeltax+=d,a.debounced("mousewheelx",function(){var b=a.lastdeltax;a.lastdeltax=0;a.rail.drag||a.doScrollLeftBy(b)},15));
if(f){if(a.opt.nativeparentscrolling&&c&&!a.ispage&&!a.zoomactive)if(0>f){if(a.getScrollTop()>=a.page.maxh)return!0}else if(0>=a.getScrollTop())return!0;a.scrollmom&&a.scrollmom.stop();a.lastdeltay+=f;a.debounced("mousewheely",function(){var b=a.lastdeltay;a.lastdeltay=0;a.rail.drag||a.doScrollBy(b)},15)}b.stopImmediatePropagation();return b.preventDefault()}var a=this;this.version="3.6.6";this.name="nicescroll";this.me=c;this.opt={doc:e("body"),win:!1};e.extend(this.opt,J);this.opt.snapbackspeed=
80;if(k)for(var H in a.opt)"undefined"!=typeof k[H]&&(a.opt[H]=k[H]);this.iddoc=(this.doc=a.opt.doc)&&this.doc[0]?this.doc[0].id||"":"";this.ispage=/^BODY|HTML/.test(a.opt.win?a.opt.win[0].nodeName:this.doc[0].nodeName);this.haswrapper=!1!==a.opt.win;this.win=a.opt.win||(this.ispage?e(window):this.doc);this.docscroll=this.ispage&&!this.haswrapper?e(window):this.win;this.body=e("body");this.iframe=this.isfixed=this.viewport=!1;this.isiframe="IFRAME"==this.doc[0].nodeName&&"IFRAME"==this.win[0].nodeName;
this.istextarea="TEXTAREA"==this.win[0].nodeName;this.forcescreen=!1;this.canshowonmouseevent="scroll"!=a.opt.autohidemode;this.page=this.view=this.onzoomout=this.onzoomin=this.onscrollcancel=this.onscrollend=this.onscrollstart=this.onclick=this.ongesturezoom=this.onkeypress=this.onmousewheel=this.onmousemove=this.onmouseup=this.onmousedown=!1;this.scroll={x:0,y:0};this.scrollratio={x:0,y:0};this.cursorheight=20;this.scrollvaluemax=0;this.isrtlmode="auto"==this.opt.rtlmode?"rtl"==(this.win[0]==window?
this.body:this.win).css("direction"):!0===this.opt.rtlmode;this.observerbody=this.observerremover=this.observer=this.scrollmom=this.scrollrunning=!1;do this.id="ascrail"+P++;while(document.getElementById(this.id));this.hasmousefocus=this.hasfocus=this.zoomactive=this.zoom=this.selectiondrag=this.cursorfreezed=this.cursor=this.rail=!1;this.visibility=!0;this.hidden=this.locked=this.railslocked=!1;this.cursoractive=!0;this.wheelprevented=!1;this.overflowx=a.opt.overflowx;this.overflowy=a.opt.overflowy;
this.nativescrollingarea=!1;this.checkarea=0;this.events=[];this.saved={};this.delaylist={};this.synclist={};this.lastdeltay=this.lastdeltax=0;this.detected=R();var f=e.extend({},this.detected);this.ishwscroll=(this.canhwscroll=f.hastransform&&a.opt.hwacceleration)&&a.haswrapper;this.hasreversehr=this.isrtlmode&&!f.iswebkit;this.istouchcapable=!1;!f.cantouch||f.isios||f.isandroid||!f.iswebkit&&!f.ismozilla||(this.istouchcapable=!0,f.cantouch=!1);a.opt.enablemouselockapi||(f.hasmousecapture=!1,f.haspointerlock=
!1);this.debounced=function(b,g,c){var d=a.delaylist[b];a.delaylist[b]=g;d||(a.debouncedelayed=setTimeout(function(){if(a){var g=a.delaylist[b];a.delaylist[b]=!1;g.call(a)}},c))};var t=!1;this.synched=function(b,g){a.synclist[b]=g;(function(){t||(u(function(){t=!1;for(var b in a.synclist){var g=a.synclist[b];g&&g.call(a);a.synclist[b]=!1}}),t=!0)})();return b};this.unsynched=function(b){a.synclist[b]&&(a.synclist[b]=!1)};this.css=function(b,g){for(var c in g)a.saved.css.push([b,c,b.css(c)]),b.css(c,
g[c])};this.scrollTop=function(b){return"undefined"==typeof b?a.getScrollTop():a.setScrollTop(b)};this.scrollLeft=function(b){return"undefined"==typeof b?a.getScrollLeft():a.setScrollLeft(b)};var B=function(a,g,c,d,f,e,h){this.st=a;this.ed=g;this.spd=c;this.p1=d||0;this.p2=f||1;this.p3=e||0;this.p4=h||1;this.ts=(new Date).getTime();this.df=this.ed-this.st};B.prototype={B2:function(a){return 3*a*a*(1-a)},B3:function(a){return 3*a*(1-a)*(1-a)},B4:function(a){return(1-a)*(1-a)*(1-a)},getNow:function(){var a=
1-((new Date).getTime()-this.ts)/this.spd,g=this.B2(a)+this.B3(a)+this.B4(a);return 0>a?this.ed:this.st+Math.round(this.df*g)},update:function(a,g){this.st=this.getNow();this.ed=a;this.spd=g;this.ts=(new Date).getTime();this.df=this.ed-this.st;return this}};if(this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"};f.hastranslate3d&&f.isios&&this.doc.css("-webkit-backface-visibility","hidden");this.getScrollTop=function(b){if(!b){if(b=h())return 16==b.length?-b[13]:-b[5];if(a.timerscroll&&
a.timerscroll.bz)return a.timerscroll.bz.getNow()}return a.doc.translate.y};this.getScrollLeft=function(b){if(!b){if(b=h())return 16==b.length?-b[12]:-b[4];if(a.timerscroll&&a.timerscroll.bh)return a.timerscroll.bh.getNow()}return a.doc.translate.x};this.notifyScrollEvent=function(a){var g=document.createEvent("UIEvents");g.initUIEvent("scroll",!1,!0,window,1);g.niceevent=!0;a.dispatchEvent(g)};var L=this.isrtlmode?1:-1;f.hastranslate3d&&a.opt.enabletranslate3d?(this.setScrollTop=function(b,g){a.doc.translate.y=
b;a.doc.translate.ty=-1*b+"px";a.doc.css(f.trstyle,"translate3d("+a.doc.translate.tx+","+a.doc.translate.ty+",0px)");g||a.notifyScrollEvent(a.win[0])},this.setScrollLeft=function(b,g){a.doc.translate.x=b;a.doc.translate.tx=b*L+"px";a.doc.css(f.trstyle,"translate3d("+a.doc.translate.tx+","+a.doc.translate.ty+",0px)");g||a.notifyScrollEvent(a.win[0])}):(this.setScrollTop=function(b,g){a.doc.translate.y=b;a.doc.translate.ty=-1*b+"px";a.doc.css(f.trstyle,"translate("+a.doc.translate.tx+","+a.doc.translate.ty+
")");g||a.notifyScrollEvent(a.win[0])},this.setScrollLeft=function(b,g){a.doc.translate.x=b;a.doc.translate.tx=b*L+"px";a.doc.css(f.trstyle,"translate("+a.doc.translate.tx+","+a.doc.translate.ty+")");g||a.notifyScrollEvent(a.win[0])})}else this.getScrollTop=function(){return a.docscroll.scrollTop()},this.setScrollTop=function(b){return setTimeout(function(){a.docscroll.scrollTop(b)},1)},this.getScrollLeft=function(){return a.detected.ismozilla&&a.isrtlmode?Math.abs(a.docscroll.scrollLeft()):a.docscroll.scrollLeft()},
this.setScrollLeft=function(b){return setTimeout(function(){a.docscroll.scrollLeft(a.detected.ismozilla&&a.isrtlmode?-b:b)},1)};this.getTarget=function(a){return a?a.target?a.target:a.srcElement?a.srcElement:!1:!1};this.hasParent=function(a,g){if(!a)return!1;for(var c=a.target||a.srcElement||a||!1;c&&c.id!=g;)c=c.parentNode||!1;return!1!==c};var y={thin:1,medium:3,thick:5};this.getDocumentScrollOffset=function(){return{top:window.pageYOffset||document.documentElement.scrollTop,left:window.pageXOffset||
document.documentElement.scrollLeft}};this.getOffset=function(){if(a.isfixed){var b=a.win.offset(),g=a.getDocumentScrollOffset();b.top-=g.top;b.left-=g.left;return b}b=a.win.offset();if(!a.viewport)return b;g=a.viewport.offset();return{top:b.top-g.top,left:b.left-g.left}};this.updateScrollBar=function(b){if(a.ishwscroll)a.rail.css({height:a.win.innerHeight()-(a.opt.railpadding.top+a.opt.railpadding.bottom)}),a.railh&&a.railh.css({width:a.win.innerWidth()-(a.opt.railpadding.left+a.opt.railpadding.right)});
else{var g=a.getOffset(),c=g.top,f=g.left-(a.opt.railpadding.left+a.opt.railpadding.right),c=c+d(a.win,"border-top-width",!0),f=f+(a.rail.align?a.win.outerWidth()-d(a.win,"border-right-width")-a.rail.width:d(a.win,"border-left-width")),e=a.opt.railoffset;e&&(e.top&&(c+=e.top),e.left&&(f+=e.left));a.railslocked||a.rail.css({top:c,left:f,height:(b?b.h:a.win.innerHeight())-(a.opt.railpadding.top+a.opt.railpadding.bottom)});a.zoom&&a.zoom.css({top:c+1,left:1==a.rail.align?f-20:f+a.rail.width+4});if(a.railh&&
!a.railslocked){c=g.top;f=g.left;if(e=a.opt.railhoffset)e.top&&(c+=e.top),e.left&&(f+=e.left);b=a.railh.align?c+d(a.win,"border-top-width",!0)+a.win.innerHeight()-a.railh.height:c+d(a.win,"border-top-width",!0);f+=d(a.win,"border-left-width");a.railh.css({top:b-(a.opt.railpadding.top+a.opt.railpadding.bottom),left:f,width:a.railh.width})}}};this.doRailClick=function(b,g,c){var f;a.railslocked||(a.cancelEvent(b),g?(g=c?a.doScrollLeft:a.doScrollTop,f=c?(b.pageX-a.railh.offset().left-a.cursorwidth/2)*
a.scrollratio.x:(b.pageY-a.rail.offset().top-a.cursorheight/2)*a.scrollratio.y,g(f)):(g=c?a.doScrollLeftBy:a.doScrollBy,f=c?a.scroll.x:a.scroll.y,b=c?b.pageX-a.railh.offset().left:b.pageY-a.rail.offset().top,c=c?a.view.w:a.view.h,g(f>=b?c:-c)))};a.hasanimationframe=u;a.hascancelanimationframe=v;a.hasanimationframe?a.hascancelanimationframe||(v=function(){a.cancelAnimationFrame=!0}):(u=function(a){return setTimeout(a,15-Math.floor(+new Date/1E3)%16)},v=clearInterval);this.init=function(){a.saved.css=
[];if(f.isie7mobile||f.isoperamini)return!0;f.hasmstouch&&a.css(a.ispage?e("html"):a.win,{"-ms-touch-action":"none"});a.zindex="auto";a.zindex=a.ispage||"auto"!=a.opt.zindex?a.opt.zindex:n()||"auto";!a.ispage&&"auto"!=a.zindex&&a.zindex>z&&(z=a.zindex);a.isie&&0==a.zindex&&"auto"==a.opt.zindex&&(a.zindex="auto");if(!a.ispage||!f.cantouch&&!f.isieold&&!f.isie9mobile){var b=a.docscroll;a.ispage&&(b=a.haswrapper?a.win:a.doc);f.isie9mobile||a.css(b,{"overflow-y":"hidden"});a.ispage&&f.isie7&&("BODY"==
a.doc[0].nodeName?a.css(e("html"),{"overflow-y":"hidden"}):"HTML"==a.doc[0].nodeName&&a.css(e("body"),{"overflow-y":"hidden"}));!f.isios||a.ispage||a.haswrapper||a.css(e("body"),{"-webkit-overflow-scrolling":"touch"});var c=e(document.createElement("div"));c.css({position:"relative",top:0,"float":"right",width:a.opt.cursorwidth,height:"0px","background-color":a.opt.cursorcolor,border:a.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":a.opt.cursorborderradius,"-moz-border-radius":a.opt.cursorborderradius,
"border-radius":a.opt.cursorborderradius});c.hborder=parseFloat(c.outerHeight()-c.innerHeight());c.addClass("nicescroll-cursors");a.cursor=c;var l=e(document.createElement("div"));l.attr("id",a.id);l.addClass("nicescroll-rails nicescroll-rails-vr");var d,h,k=["left","right","top","bottom"],K;for(K in k)h=k[K],(d=a.opt.railpadding[h])?l.css("padding-"+h,d+"px"):a.opt.railpadding[h]=0;l.append(c);l.width=Math.max(parseFloat(a.opt.cursorwidth),c.outerWidth());l.css({width:l.width+"px",zIndex:a.zindex,
background:a.opt.background,cursor:"default"});l.visibility=!0;l.scrollable=!0;l.align="left"==a.opt.railalign?0:1;a.rail=l;c=a.rail.drag=!1;!a.opt.boxzoom||a.ispage||f.isieold||(c=document.createElement("div"),a.bind(c,"click",a.doZoom),a.bind(c,"mouseenter",function(){a.zoom.css("opacity",a.opt.cursoropacitymax)}),a.bind(c,"mouseleave",function(){a.zoom.css("opacity",a.opt.cursoropacitymin)}),a.zoom=e(c),a.zoom.css({cursor:"pointer","z-index":a.zindex,backgroundImage:"url("+a.opt.scriptpath+"zoomico.png)",
height:18,width:18,backgroundPosition:"0px 0px"}),a.opt.dblclickzoom&&a.bind(a.win,"dblclick",a.doZoom),f.cantouch&&a.opt.gesturezoom&&(a.ongesturezoom=function(b){1.5<b.scale&&a.doZoomIn(b);.8>b.scale&&a.doZoomOut(b);return a.cancelEvent(b)},a.bind(a.win,"gestureend",a.ongesturezoom)));a.railh=!1;var m;a.opt.horizrailenabled&&(a.css(b,{"overflow-x":"hidden"}),c=e(document.createElement("div")),c.css({position:"absolute",top:0,height:a.opt.cursorwidth,width:"0px","background-color":a.opt.cursorcolor,
border:a.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":a.opt.cursorborderradius,"-moz-border-radius":a.opt.cursorborderradius,"border-radius":a.opt.cursorborderradius}),f.isieold&&c.css({overflow:"hidden"}),c.wborder=parseFloat(c.outerWidth()-c.innerWidth()),c.addClass("nicescroll-cursors"),a.cursorh=c,m=e(document.createElement("div")),m.attr("id",a.id+"-hr"),m.addClass("nicescroll-rails nicescroll-rails-hr"),m.height=Math.max(parseFloat(a.opt.cursorwidth),c.outerHeight()),
m.css({height:m.height+"px",zIndex:a.zindex,background:a.opt.background}),m.append(c),m.visibility=!0,m.scrollable=!0,m.align="top"==a.opt.railvalign?0:1,a.railh=m,a.railh.drag=!1);a.ispage?(l.css({position:"fixed",top:"0px",height:"100%"}),l.align?l.css({right:"0px"}):l.css({left:"0px"}),a.body.append(l),a.railh&&(m.css({position:"fixed",left:"0px",width:"100%"}),m.align?m.css({bottom:"0px"}):m.css({top:"0px"}),a.body.append(m))):(a.ishwscroll?("static"==a.win.css("position")&&a.css(a.win,{position:"relative"}),
b="HTML"==a.win[0].nodeName?a.body:a.win,e(b).scrollTop(0).scrollLeft(0),a.zoom&&(a.zoom.css({position:"absolute",top:1,right:0,"margin-right":l.width+4}),b.append(a.zoom)),l.css({position:"absolute",top:0}),l.align?l.css({right:0}):l.css({left:0}),b.append(l),m&&(m.css({position:"absolute",left:0,bottom:0}),m.align?m.css({bottom:0}):m.css({top:0}),b.append(m))):(a.isfixed="fixed"==a.win.css("position"),b=a.isfixed?"fixed":"absolute",a.isfixed||(a.viewport=a.getViewport(a.win[0])),a.viewport&&(a.body=
a.viewport,0==/fixed|absolute/.test(a.viewport.css("position"))&&a.css(a.viewport,{position:"relative"})),l.css({position:b}),a.zoom&&a.zoom.css({position:b}),a.updateScrollBar(),a.body.append(l),a.zoom&&a.body.append(a.zoom),a.railh&&(m.css({position:b}),a.body.append(m))),f.isios&&a.css(a.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),f.isie&&a.opt.disableoutline&&a.win.attr("hideFocus","true"),f.iswebkit&&a.opt.disableoutline&&a.win.css({outline:"none"}));!1===
a.opt.autohidemode?(a.autohidedom=!1,a.rail.css({opacity:a.opt.cursoropacitymax}),a.railh&&a.railh.css({opacity:a.opt.cursoropacitymax})):!0===a.opt.autohidemode||"leave"===a.opt.autohidemode?(a.autohidedom=e().add(a.rail),f.isie8&&(a.autohidedom=a.autohidedom.add(a.cursor)),a.railh&&(a.autohidedom=a.autohidedom.add(a.railh)),a.railh&&f.isie8&&(a.autohidedom=a.autohidedom.add(a.cursorh))):"scroll"==a.opt.autohidemode?(a.autohidedom=e().add(a.rail),a.railh&&(a.autohidedom=a.autohidedom.add(a.railh))):
"cursor"==a.opt.autohidemode?(a.autohidedom=e().add(a.cursor),a.railh&&(a.autohidedom=a.autohidedom.add(a.cursorh))):"hidden"==a.opt.autohidemode&&(a.autohidedom=!1,a.hide(),a.railslocked=!1);if(f.isie9mobile)a.scrollmom=new M(a),a.onmangotouch=function(){var b=a.getScrollTop(),c=a.getScrollLeft();if(b==a.scrollmom.lastscrolly&&c==a.scrollmom.lastscrollx)return!0;var g=b-a.mangotouch.sy,f=c-a.mangotouch.sx;if(0!=Math.round(Math.sqrt(Math.pow(f,2)+Math.pow(g,2)))){var d=0>g?-1:1,l=0>f?-1:1,e=+new Date;
a.mangotouch.lazy&&clearTimeout(a.mangotouch.lazy);80<e-a.mangotouch.tm||a.mangotouch.dry!=d||a.mangotouch.drx!=l?(a.scrollmom.stop(),a.scrollmom.reset(c,b),a.mangotouch.sy=b,a.mangotouch.ly=b,a.mangotouch.sx=c,a.mangotouch.lx=c,a.mangotouch.dry=d,a.mangotouch.drx=l,a.mangotouch.tm=e):(a.scrollmom.stop(),a.scrollmom.update(a.mangotouch.sx-f,a.mangotouch.sy-g),a.mangotouch.tm=e,g=Math.max(Math.abs(a.mangotouch.ly-b),Math.abs(a.mangotouch.lx-c)),a.mangotouch.ly=b,a.mangotouch.lx=c,2<g&&(a.mangotouch.lazy=
setTimeout(function(){a.mangotouch.lazy=!1;a.mangotouch.dry=0;a.mangotouch.drx=0;a.mangotouch.tm=0;a.scrollmom.doMomentum(30)},100)))}},l=a.getScrollTop(),m=a.getScrollLeft(),a.mangotouch={sy:l,ly:l,dry:0,sx:m,lx:m,drx:0,lazy:!1,tm:0},a.bind(a.docscroll,"scroll",a.onmangotouch);else{if(f.cantouch||a.istouchcapable||a.opt.touchbehavior||f.hasmstouch){a.scrollmom=new M(a);a.ontouchstart=function(b){if(b.pointerType&&2!=b.pointerType&&"touch"!=b.pointerType)return!1;a.hasmoving=!1;if(!a.railslocked){var c;
if(f.hasmstouch)for(c=b.target?b.target:!1;c;){var g=e(c).getNiceScroll();if(0<g.length&&g[0].me==a.me)break;if(0<g.length)return!1;if("DIV"==c.nodeName&&c.id==a.id)break;c=c.parentNode?c.parentNode:!1}a.cancelScroll();if((c=a.getTarget(b))&&/INPUT/i.test(c.nodeName)&&/range/i.test(c.type))return a.stopPropagation(b);!("clientX"in b)&&"changedTouches"in b&&(b.clientX=b.changedTouches[0].clientX,b.clientY=b.changedTouches[0].clientY);a.forcescreen&&(g=b,b={original:b.original?b.original:b},b.clientX=
g.screenX,b.clientY=g.screenY);a.rail.drag={x:b.clientX,y:b.clientY,sx:a.scroll.x,sy:a.scroll.y,st:a.getScrollTop(),sl:a.getScrollLeft(),pt:2,dl:!1};if(a.ispage||!a.opt.directionlockdeadzone)a.rail.drag.dl="f";else{var g=e(window).width(),d=e(window).height(),d=Math.max(0,Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)-d),g=Math.max(0,Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)-g);a.rail.drag.ck=!a.rail.scrollable&&a.railh.scrollable?0<d?"v":
!1:a.rail.scrollable&&!a.railh.scrollable?0<g?"h":!1:!1;a.rail.drag.ck||(a.rail.drag.dl="f")}a.opt.touchbehavior&&a.isiframe&&f.isie&&(g=a.win.position(),a.rail.drag.x+=g.left,a.rail.drag.y+=g.top);a.hasmoving=!1;a.lastmouseup=!1;a.scrollmom.reset(b.clientX,b.clientY);if(!f.cantouch&&!this.istouchcapable&&!b.pointerType){if(!c||!/INPUT|SELECT|TEXTAREA/i.test(c.nodeName))return!a.ispage&&f.hasmousecapture&&c.setCapture(),a.opt.touchbehavior?(c.onclick&&!c._onclick&&(c._onclick=c.onclick,c.onclick=
function(b){if(a.hasmoving)return!1;c._onclick.call(this,b)}),a.cancelEvent(b)):a.stopPropagation(b);/SUBMIT|CANCEL|BUTTON/i.test(e(c).attr("type"))&&(pc={tg:c,click:!1},a.preventclick=pc)}}};a.ontouchend=function(b){if(!a.rail.drag)return!0;if(2==a.rail.drag.pt){if(b.pointerType&&2!=b.pointerType&&"touch"!=b.pointerType)return!1;a.scrollmom.doMomentum();a.rail.drag=!1;if(a.hasmoving&&(a.lastmouseup=!0,a.hideCursor(),f.hasmousecapture&&document.releaseCapture(),!f.cantouch))return a.cancelEvent(b)}else if(1==
a.rail.drag.pt)return a.onmouseup(b)};var p=a.opt.touchbehavior&&a.isiframe&&!f.hasmousecapture;a.ontouchmove=function(b,c){if(!a.rail.drag||b.targetTouches&&a.opt.preventmultitouchscrolling&&1<b.targetTouches.length||b.pointerType&&2!=b.pointerType&&"touch"!=b.pointerType)return!1;if(2==a.rail.drag.pt){if(f.cantouch&&f.isios&&"undefined"==typeof b.original)return!0;a.hasmoving=!0;a.preventclick&&!a.preventclick.click&&(a.preventclick.click=a.preventclick.tg.onclick||!1,a.preventclick.tg.onclick=
a.onpreventclick);b=e.extend({original:b},b);"changedTouches"in b&&(b.clientX=b.changedTouches[0].clientX,b.clientY=b.changedTouches[0].clientY);if(a.forcescreen){var g=b;b={original:b.original?b.original:b};b.clientX=g.screenX;b.clientY=g.screenY}var d,g=d=0;p&&!c&&(d=a.win.position(),g=-d.left,d=-d.top);var l=b.clientY+d;d=l-a.rail.drag.y;var h=b.clientX+g,w=h-a.rail.drag.x,k=a.rail.drag.st-d;a.ishwscroll&&a.opt.bouncescroll?0>k?k=Math.round(k/2):k>a.page.maxh&&(k=a.page.maxh+Math.round((k-a.page.maxh)/
2)):(0>k&&(l=k=0),k>a.page.maxh&&(k=a.page.maxh,l=0));var r;a.railh&&a.railh.scrollable&&(r=a.isrtlmode?w-a.rail.drag.sl:a.rail.drag.sl-w,a.ishwscroll&&a.opt.bouncescroll?0>r?r=Math.round(r/2):r>a.page.maxw&&(r=a.page.maxw+Math.round((r-a.page.maxw)/2)):(0>r&&(h=r=0),r>a.page.maxw&&(r=a.page.maxw,h=0)));g=!1;if(a.rail.drag.dl)g=!0,"v"==a.rail.drag.dl?r=a.rail.drag.sl:"h"==a.rail.drag.dl&&(k=a.rail.drag.st);else{d=Math.abs(d);var w=Math.abs(w),m=a.opt.directionlockdeadzone;if("v"==a.rail.drag.ck){if(d>
m&&w<=.3*d)return a.rail.drag=!1,!0;w>m&&(a.rail.drag.dl="f",e("body").scrollTop(e("body").scrollTop()))}else if("h"==a.rail.drag.ck){if(w>m&&d<=.3*w)return a.rail.drag=!1,!0;d>m&&(a.rail.drag.dl="f",e("body").scrollLeft(e("body").scrollLeft()))}}a.synched("touchmove",function(){a.rail.drag&&2==a.rail.drag.pt&&(a.prepareTransition&&a.prepareTransition(0),a.rail.scrollable&&a.setScrollTop(k),a.scrollmom.update(h,l),a.railh&&a.railh.scrollable?(a.setScrollLeft(r),a.showCursor(k,r)):a.showCursor(k),
f.isie10&&document.selection.clear())});f.ischrome&&a.istouchcapable&&(g=!1);if(g)return a.cancelEvent(b)}else if(1==a.rail.drag.pt)return a.onmousemove(b)}}a.onmousedown=function(b,c){if(!a.rail.drag||1==a.rail.drag.pt){if(a.railslocked)return a.cancelEvent(b);a.cancelScroll();a.rail.drag={x:b.clientX,y:b.clientY,sx:a.scroll.x,sy:a.scroll.y,pt:1,hr:!!c};var g=a.getTarget(b);!a.ispage&&f.hasmousecapture&&g.setCapture();a.isiframe&&!f.hasmousecapture&&(a.saved.csspointerevents=a.doc.css("pointer-events"),
a.css(a.doc,{"pointer-events":"none"}));a.hasmoving=!1;return a.cancelEvent(b)}};a.onmouseup=function(b){if(a.rail.drag){if(1!=a.rail.drag.pt)return!0;f.hasmousecapture&&document.releaseCapture();a.isiframe&&!f.hasmousecapture&&a.doc.css("pointer-events",a.saved.csspointerevents);a.rail.drag=!1;a.hasmoving&&a.triggerScrollEnd();return a.cancelEvent(b)}};a.onmousemove=function(b){if(a.rail.drag){if(1==a.rail.drag.pt){if(f.ischrome&&0==b.which)return a.onmouseup(b);a.cursorfreezed=!0;a.hasmoving=!0;
if(a.rail.drag.hr){a.scroll.x=a.rail.drag.sx+(b.clientX-a.rail.drag.x);0>a.scroll.x&&(a.scroll.x=0);var c=a.scrollvaluemaxw;a.scroll.x>c&&(a.scroll.x=c)}else a.scroll.y=a.rail.drag.sy+(b.clientY-a.rail.drag.y),0>a.scroll.y&&(a.scroll.y=0),c=a.scrollvaluemax,a.scroll.y>c&&(a.scroll.y=c);a.synched("mousemove",function(){a.rail.drag&&1==a.rail.drag.pt&&(a.showCursor(),a.rail.drag.hr?a.hasreversehr?a.doScrollLeft(a.scrollvaluemaxw-Math.round(a.scroll.x*a.scrollratio.x),a.opt.cursordragspeed):a.doScrollLeft(Math.round(a.scroll.x*
a.scrollratio.x),a.opt.cursordragspeed):a.doScrollTop(Math.round(a.scroll.y*a.scrollratio.y),a.opt.cursordragspeed))});return a.cancelEvent(b)}}else a.checkarea=0};if(f.cantouch||a.opt.touchbehavior)a.onpreventclick=function(b){if(a.preventclick)return a.preventclick.tg.onclick=a.preventclick.click,a.preventclick=!1,a.cancelEvent(b)},a.bind(a.win,"mousedown",a.ontouchstart),a.onclick=f.isios?!1:function(b){return a.lastmouseup?(a.lastmouseup=!1,a.cancelEvent(b)):!0},a.opt.grabcursorenabled&&f.cursorgrabvalue&&
(a.css(a.ispage?a.doc:a.win,{cursor:f.cursorgrabvalue}),a.css(a.rail,{cursor:f.cursorgrabvalue}));else{var q=function(b){if(a.selectiondrag){if(b){var c=a.win.outerHeight();b=b.pageY-a.selectiondrag.top;0<b&&b<c&&(b=0);b>=c&&(b-=c);a.selectiondrag.df=b}0!=a.selectiondrag.df&&(a.doScrollBy(2*-Math.floor(a.selectiondrag.df/6)),a.debounced("doselectionscroll",function(){q()},50))}};a.hasTextSelected="getSelection"in document?function(){return 0<document.getSelection().rangeCount}:"selection"in document?
function(){return"None"!=document.selection.type}:function(){return!1};a.onselectionstart=function(b){a.ispage||(a.selectiondrag=a.win.offset())};a.onselectionend=function(b){a.selectiondrag=!1};a.onselectiondrag=function(b){a.selectiondrag&&a.hasTextSelected()&&a.debounced("selectionscroll",function(){q(b)},250)}}f.hasw3ctouch?(a.css(a.rail,{"touch-action":"none"}),a.css(a.cursor,{"touch-action":"none"}),a.bind(a.win,"pointerdown",a.ontouchstart),a.bind(document,"pointerup",a.ontouchend),a.bind(document,
"pointermove",a.ontouchmove)):f.hasmstouch?(a.css(a.rail,{"-ms-touch-action":"none"}),a.css(a.cursor,{"-ms-touch-action":"none"}),a.bind(a.win,"MSPointerDown",a.ontouchstart),a.bind(document,"MSPointerUp",a.ontouchend),a.bind(document,"MSPointerMove",a.ontouchmove),a.bind(a.cursor,"MSGestureHold",function(a){a.preventDefault()}),a.bind(a.cursor,"contextmenu",function(a){a.preventDefault()})):this.istouchcapable&&(a.bind(a.win,"touchstart",a.ontouchstart),a.bind(document,"touchend",a.ontouchend),a.bind(document,
"touchcancel",a.ontouchend),a.bind(document,"touchmove",a.ontouchmove));if(a.opt.cursordragontouch||!f.cantouch&&!a.opt.touchbehavior)a.rail.css({cursor:"default"}),a.railh&&a.railh.css({cursor:"default"}),a.jqbind(a.rail,"mouseenter",function(){if(!a.ispage&&!a.win.is(":visible"))return!1;a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.rail,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()}),a.opt.sensitiverail&&(a.bind(a.rail,"click",function(b){a.doRailClick(b,
!1,!1)}),a.bind(a.rail,"dblclick",function(b){a.doRailClick(b,!0,!1)}),a.bind(a.cursor,"click",function(b){a.cancelEvent(b)}),a.bind(a.cursor,"dblclick",function(b){a.cancelEvent(b)})),a.railh&&(a.jqbind(a.railh,"mouseenter",function(){if(!a.ispage&&!a.win.is(":visible"))return!1;a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.railh,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()}),a.opt.sensitiverail&&(a.bind(a.railh,"click",function(b){a.doRailClick(b,!1,
!0)}),a.bind(a.railh,"dblclick",function(b){a.doRailClick(b,!0,!0)}),a.bind(a.cursorh,"click",function(b){a.cancelEvent(b)}),a.bind(a.cursorh,"dblclick",function(b){a.cancelEvent(b)})));f.cantouch||a.opt.touchbehavior?(a.bind(f.hasmousecapture?a.win:document,"mouseup",a.ontouchend),a.bind(document,"mousemove",a.ontouchmove),a.onclick&&a.bind(document,"click",a.onclick),a.opt.cursordragontouch&&(a.bind(a.cursor,"mousedown",a.onmousedown),a.bind(a.cursor,"mouseup",a.onmouseup),a.cursorh&&a.bind(a.cursorh,
"mousedown",function(b){a.onmousedown(b,!0)}),a.cursorh&&a.bind(a.cursorh,"mouseup",a.onmouseup))):(a.bind(f.hasmousecapture?a.win:document,"mouseup",a.onmouseup),a.bind(document,"mousemove",a.onmousemove),a.onclick&&a.bind(document,"click",a.onclick),a.bind(a.cursor,"mousedown",a.onmousedown),a.bind(a.cursor,"mouseup",a.onmouseup),a.railh&&(a.bind(a.cursorh,"mousedown",function(b){a.onmousedown(b,!0)}),a.bind(a.cursorh,"mouseup",a.onmouseup)),!a.ispage&&a.opt.enablescrollonselection&&(a.bind(a.win[0],
"mousedown",a.onselectionstart),a.bind(document,"mouseup",a.onselectionend),a.bind(a.cursor,"mouseup",a.onselectionend),a.cursorh&&a.bind(a.cursorh,"mouseup",a.onselectionend),a.bind(document,"mousemove",a.onselectiondrag)),a.zoom&&(a.jqbind(a.zoom,"mouseenter",function(){a.canshowonmouseevent&&a.showCursor();a.rail.active=!0}),a.jqbind(a.zoom,"mouseleave",function(){a.rail.active=!1;a.rail.drag||a.hideCursor()})));a.opt.enablemousewheel&&(a.isiframe||a.bind(f.isie&&a.ispage?document:a.win,"mousewheel",
a.onmousewheel),a.bind(a.rail,"mousewheel",a.onmousewheel),a.railh&&a.bind(a.railh,"mousewheel",a.onmousewheelhr));a.ispage||f.cantouch||/HTML|^BODY/.test(a.win[0].nodeName)||(a.win.attr("tabindex")||a.win.attr({tabindex:O++}),a.jqbind(a.win,"focus",function(b){A=a.getTarget(b).id||!0;a.hasfocus=!0;a.canshowonmouseevent&&a.noticeCursor()}),a.jqbind(a.win,"blur",function(b){A=!1;a.hasfocus=!1}),a.jqbind(a.win,"mouseenter",function(b){E=a.getTarget(b).id||!0;a.hasmousefocus=!0;a.canshowonmouseevent&&
a.noticeCursor()}),a.jqbind(a.win,"mouseleave",function(){E=!1;a.hasmousefocus=!1;a.rail.drag||a.hideCursor()}))}a.onkeypress=function(b){if(a.railslocked&&0==a.page.maxh)return!0;b=b?b:window.e;var c=a.getTarget(b);if(c&&/INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName)&&(!c.getAttribute("type")&&!c.type||!/submit|button|cancel/i.tp)||e(c).attr("contenteditable"))return!0;if(a.hasfocus||a.hasmousefocus&&!A||a.ispage&&!A&&!E){c=b.keyCode;if(a.railslocked&&27!=c)return a.cancelEvent(b);var g=b.ctrlKey||
!1,d=b.shiftKey||!1,f=!1;switch(c){case 38:case 63233:a.doScrollBy(72);f=!0;break;case 40:case 63235:a.doScrollBy(-72);f=!0;break;case 37:case 63232:a.railh&&(g?a.doScrollLeft(0):a.doScrollLeftBy(72),f=!0);break;case 39:case 63234:a.railh&&(g?a.doScrollLeft(a.page.maxw):a.doScrollLeftBy(-72),f=!0);break;case 33:case 63276:a.doScrollBy(a.view.h);f=!0;break;case 34:case 63277:a.doScrollBy(-a.view.h);f=!0;break;case 36:case 63273:a.railh&&g?a.doScrollPos(0,0):a.doScrollTo(0);f=!0;break;case 35:case 63275:a.railh&&
g?a.doScrollPos(a.page.maxw,a.page.maxh):a.doScrollTo(a.page.maxh);f=!0;break;case 32:a.opt.spacebarenabled&&(d?a.doScrollBy(a.view.h):a.doScrollBy(-a.view.h),f=!0);break;case 27:a.zoomactive&&(a.doZoom(),f=!0)}if(f)return a.cancelEvent(b)}};a.opt.enablekeyboard&&a.bind(document,f.isopera&&!f.isopera12?"keypress":"keydown",a.onkeypress);a.bind(document,"keydown",function(b){b.ctrlKey&&(a.wheelprevented=!0)});a.bind(document,"keyup",function(b){b.ctrlKey||(a.wheelprevented=!1)});a.bind(window,"blur",
function(b){a.wheelprevented=!1});a.bind(window,"resize",a.lazyResize);a.bind(window,"orientationchange",a.lazyResize);a.bind(window,"load",a.lazyResize);if(f.ischrome&&!a.ispage&&!a.haswrapper){var t=a.win.attr("style"),l=parseFloat(a.win.css("width"))+1;a.win.css("width",l);a.synched("chromefix",function(){a.win.attr("style",t)})}a.onAttributeChange=function(b){a.lazyResize(a.isieold?250:30)};!1!==x&&(a.observerbody=new x(function(b){b.forEach(function(b){if("attributes"==b.type)return e("body").hasClass("modal-open")&&
!e.contains(e(".modal-dialog")[0],a.doc[0])?a.hide():a.show()});if(document.body.scrollHeight!=a.page.maxh)return a.lazyResize(30)}),a.observerbody.observe(document.body,{childList:!0,subtree:!0,characterData:!1,attributes:!0,attributeFilter:["class"]}));a.ispage||a.haswrapper||(!1!==x?(a.observer=new x(function(b){b.forEach(a.onAttributeChange)}),a.observer.observe(a.win[0],{childList:!0,characterData:!1,attributes:!0,subtree:!1}),a.observerremover=new x(function(b){b.forEach(function(b){if(0<b.removedNodes.length)for(var c in b.removedNodes)if(a&&
b.removedNodes[c]==a.win[0])return a.remove()})}),a.observerremover.observe(a.win[0].parentNode,{childList:!0,characterData:!1,attributes:!1,subtree:!1})):(a.bind(a.win,f.isie&&!f.isie9?"propertychange":"DOMAttrModified",a.onAttributeChange),f.isie9&&a.win[0].attachEvent("onpropertychange",a.onAttributeChange),a.bind(a.win,"DOMNodeRemoved",function(b){b.target==a.win[0]&&a.remove()})));!a.ispage&&a.opt.boxzoom&&a.bind(window,"resize",a.resizeZoom);a.istextarea&&(a.bind(a.win,"keydown",a.lazyResize),
a.bind(a.win,"mouseup",a.lazyResize));a.lazyResize(30)}if("IFRAME"==this.doc[0].nodeName){var N=function(){a.iframexd=!1;var b;try{b="contentDocument"in this?this.contentDocument:this.contentWindow.document}catch(c){a.iframexd=!0,b=!1}if(a.iframexd)return"console"in window&&console.log("NiceScroll error: policy restriced iframe"),!0;a.forcescreen=!0;a.isiframe&&(a.iframe={doc:e(b),html:a.doc.contents().find("html")[0],body:a.doc.contents().find("body")[0]},a.getContentSize=function(){return{w:Math.max(a.iframe.html.scrollWidth,
a.iframe.body.scrollWidth),h:Math.max(a.iframe.html.scrollHeight,a.iframe.body.scrollHeight)}},a.docscroll=e(a.iframe.body));if(!f.isios&&a.opt.iframeautoresize&&!a.isiframe){a.win.scrollTop(0);a.doc.height("");var g=Math.max(b.getElementsByTagName("html")[0].scrollHeight,b.body.scrollHeight);a.doc.height(g)}a.lazyResize(30);f.isie7&&a.css(e(a.iframe.html),{"overflow-y":"hidden"});a.css(e(a.iframe.body),{"overflow-y":"hidden"});f.isios&&a.haswrapper&&a.css(e(b.body),{"-webkit-transform":"translate3d(0,0,0)"});
"contentWindow"in this?a.bind(this.contentWindow,"scroll",a.onscroll):a.bind(b,"scroll",a.onscroll);a.opt.enablemousewheel&&a.bind(b,"mousewheel",a.onmousewheel);a.opt.enablekeyboard&&a.bind(b,f.isopera?"keypress":"keydown",a.onkeypress);if(f.cantouch||a.opt.touchbehavior)a.bind(b,"mousedown",a.ontouchstart),a.bind(b,"mousemove",function(b){return a.ontouchmove(b,!0)}),a.opt.grabcursorenabled&&f.cursorgrabvalue&&a.css(e(b.body),{cursor:f.cursorgrabvalue});a.bind(b,"mouseup",a.ontouchend);a.zoom&&
(a.opt.dblclickzoom&&a.bind(b,"dblclick",a.doZoom),a.ongesturezoom&&a.bind(b,"gestureend",a.ongesturezoom))};this.doc[0].readyState&&"complete"==this.doc[0].readyState&&setTimeout(function(){N.call(a.doc[0],!1)},500);a.bind(this.doc,"load",N)}};this.showCursor=function(b,c){a.cursortimeout&&(clearTimeout(a.cursortimeout),a.cursortimeout=0);if(a.rail){a.autohidedom&&(a.autohidedom.stop().css({opacity:a.opt.cursoropacitymax}),a.cursoractive=!0);a.rail.drag&&1==a.rail.drag.pt||("undefined"!=typeof b&&
!1!==b&&(a.scroll.y=Math.round(1*b/a.scrollratio.y)),"undefined"!=typeof c&&(a.scroll.x=Math.round(1*c/a.scrollratio.x)));a.cursor.css({height:a.cursorheight,top:a.scroll.y});if(a.cursorh){var d=a.hasreversehr?a.scrollvaluemaxw-a.scroll.x:a.scroll.x;!a.rail.align&&a.rail.visibility?a.cursorh.css({width:a.cursorwidth,left:d+a.rail.width}):a.cursorh.css({width:a.cursorwidth,left:d});a.cursoractive=!0}a.zoom&&a.zoom.stop().css({opacity:a.opt.cursoropacitymax})}};this.hideCursor=function(b){a.cursortimeout||
!a.rail||!a.autohidedom||a.hasmousefocus&&"leave"==a.opt.autohidemode||(a.cursortimeout=setTimeout(function(){a.rail.active&&a.showonmouseevent||(a.autohidedom.stop().animate({opacity:a.opt.cursoropacitymin}),a.zoom&&a.zoom.stop().animate({opacity:a.opt.cursoropacitymin}),a.cursoractive=!1);a.cursortimeout=0},b||a.opt.hidecursordelay))};this.noticeCursor=function(b,c,d){a.showCursor(c,d);a.rail.active||a.hideCursor(b)};this.getContentSize=a.ispage?function(){return{w:Math.max(document.body.scrollWidth,
document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}:a.haswrapper?function(){return{w:a.doc.outerWidth()+parseInt(a.win.css("paddingLeft"))+parseInt(a.win.css("paddingRight")),h:a.doc.outerHeight()+parseInt(a.win.css("paddingTop"))+parseInt(a.win.css("paddingBottom"))}}:function(){return{w:a.docscroll[0].scrollWidth,h:a.docscroll[0].scrollHeight}};this.onResize=function(b,c){if(!a||!a.win)return!1;if(!a.haswrapper&&!a.ispage){if("none"==
a.win.css("display"))return a.visibility&&a.hideRail().hideRailHr(),!1;a.hidden||a.visibility||a.showRail().showRailHr()}var d=a.page.maxh,f=a.page.maxw,e=a.view.h,h=a.view.w;a.view={w:a.ispage?a.win.width():parseInt(a.win[0].clientWidth),h:a.ispage?a.win.height():parseInt(a.win[0].clientHeight)};a.page=c?c:a.getContentSize();a.page.maxh=Math.max(0,a.page.h-a.view.h);a.page.maxw=Math.max(0,a.page.w-a.view.w);if(a.page.maxh==d&&a.page.maxw==f&&a.view.w==h&&a.view.h==e){if(a.ispage)return a;d=a.win.offset();
if(a.lastposition&&(f=a.lastposition,f.top==d.top&&f.left==d.left))return a;a.lastposition=d}0==a.page.maxh?(a.hideRail(),a.scrollvaluemax=0,a.scroll.y=0,a.scrollratio.y=0,a.cursorheight=0,a.setScrollTop(0),a.rail&&(a.rail.scrollable=!1)):(a.page.maxh-=a.opt.railpadding.top+a.opt.railpadding.bottom,a.rail.scrollable=!0);0==a.page.maxw?(a.hideRailHr(),a.scrollvaluemaxw=0,a.scroll.x=0,a.scrollratio.x=0,a.cursorwidth=0,a.setScrollLeft(0),a.railh&&(a.railh.scrollable=!1)):(a.page.maxw-=a.opt.railpadding.left+
a.opt.railpadding.right,a.railh&&(a.railh.scrollable=a.opt.horizrailenabled));a.railslocked=a.locked||0==a.page.maxh&&0==a.page.maxw;if(a.railslocked)return a.ispage||a.updateScrollBar(a.view),!1;a.hidden||a.visibility?!a.railh||a.hidden||a.railh.visibility||a.showRailHr():a.showRail().showRailHr();a.istextarea&&a.win.css("resize")&&"none"!=a.win.css("resize")&&(a.view.h-=20);a.cursorheight=Math.min(a.view.h,Math.round(a.view.h/a.page.h*a.view.h));a.cursorheight=a.opt.cursorfixedheight?a.opt.cursorfixedheight:
Math.max(a.opt.cursorminheight,a.cursorheight);a.cursorwidth=Math.min(a.view.w,Math.round(a.view.w/a.page.w*a.view.w));a.cursorwidth=a.opt.cursorfixedheight?a.opt.cursorfixedheight:Math.max(a.opt.cursorminheight,a.cursorwidth);a.scrollvaluemax=a.view.h-a.cursorheight-a.cursor.hborder-(a.opt.railpadding.top+a.opt.railpadding.bottom);a.railh&&(a.railh.width=0<a.page.maxh?a.view.w-a.rail.width:a.view.w,a.scrollvaluemaxw=a.railh.width-a.cursorwidth-a.cursorh.wborder-(a.opt.railpadding.left+a.opt.railpadding.right));
a.ispage||a.updateScrollBar(a.view);a.scrollratio={x:a.page.maxw/a.scrollvaluemaxw,y:a.page.maxh/a.scrollvaluemax};a.getScrollTop()>a.page.maxh?a.doScrollTop(a.page.maxh):(a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y)),a.scroll.x=Math.round(a.getScrollLeft()*(1/a.scrollratio.x)),a.cursoractive&&a.noticeCursor());a.scroll.y&&0==a.getScrollTop()&&a.doScrollTo(Math.floor(a.scroll.y*a.scrollratio.y));return a};this.resize=a.onResize;this.lazyResize=function(b){b=isNaN(b)?30:b;a.debounced("resize",
a.resize,b);return a};this.jqbind=function(b,c,d){a.events.push({e:b,n:c,f:d,q:!0});e(b).bind(c,d)};this.bind=function(b,c,d,e){var h="jquery"in b?b[0]:b;"mousewheel"==c?"onwheel"in a.win?a._bind(h,"wheel",d,e||!1):(b="undefined"!=typeof document.onmousewheel?"mousewheel":"DOMMouseScroll",p(h,b,d,e||!1),"DOMMouseScroll"==b&&p(h,"MozMousePixelScroll",d,e||!1)):h.addEventListener?(f.cantouch&&/mouseup|mousedown|mousemove/.test(c)&&a._bind(h,"mousedown"==c?"touchstart":"mouseup"==c?"touchend":"touchmove",
function(a){if(a.touches){if(2>a.touches.length){var b=a.touches.length?a.touches[0]:a;b.original=a;d.call(this,b)}}else a.changedTouches&&(b=a.changedTouches[0],b.original=a,d.call(this,b))},e||!1),a._bind(h,c,d,e||!1),f.cantouch&&"mouseup"==c&&a._bind(h,"touchcancel",d,e||!1)):a._bind(h,c,function(b){(b=b||window.event||!1)&&b.srcElement&&(b.target=b.srcElement);"pageY"in b||(b.pageX=b.clientX+document.documentElement.scrollLeft,b.pageY=b.clientY+document.documentElement.scrollTop);return!1===d.call(h,
b)||!1===e?a.cancelEvent(b):!0})};f.haseventlistener?(this._bind=function(b,c,d,f){a.events.push({e:b,n:c,f:d,b:f,q:!1});b.addEventListener(c,d,f||!1)},this.cancelEvent=function(a){if(!a)return!1;a=a.original?a.original:a;a.preventDefault();a.stopPropagation();a.preventManipulation&&a.preventManipulation();return!1},this.stopPropagation=function(a){if(!a)return!1;a=a.original?a.original:a;a.stopPropagation();return!1},this._unbind=function(a,c,d,f){a.removeEventListener(c,d,f)}):(this._bind=function(b,
c,d,f){a.events.push({e:b,n:c,f:d,b:f,q:!1});b.attachEvent?b.attachEvent("on"+c,d):b["on"+c]=d},this.cancelEvent=function(a){a=window.event||!1;if(!a)return!1;a.cancelBubble=!0;a.cancel=!0;return a.returnValue=!1},this.stopPropagation=function(a){a=window.event||!1;if(!a)return!1;a.cancelBubble=!0;return!1},this._unbind=function(a,c,d,f){a.detachEvent?a.detachEvent("on"+c,d):a["on"+c]=!1});this.unbindAll=function(){for(var b=0;b<a.events.length;b++){var c=a.events[b];c.q?c.e.unbind(c.n,c.f):a._unbind(c.e,
c.n,c.f,c.b)}};this.showRail=function(){0==a.page.maxh||!a.ispage&&"none"==a.win.css("display")||(a.visibility=!0,a.rail.visibility=!0,a.rail.css("display","block"));return a};this.showRailHr=function(){if(!a.railh)return a;0==a.page.maxw||!a.ispage&&"none"==a.win.css("display")||(a.railh.visibility=!0,a.railh.css("display","block"));return a};this.hideRail=function(){a.visibility=!1;a.rail.visibility=!1;a.rail.css("display","none");return a};this.hideRailHr=function(){if(!a.railh)return a;a.railh.visibility=
!1;a.railh.css("display","none");return a};this.show=function(){a.hidden=!1;a.railslocked=!1;return a.showRail().showRailHr()};this.hide=function(){a.hidden=!0;a.railslocked=!0;return a.hideRail().hideRailHr()};this.toggle=function(){return a.hidden?a.show():a.hide()};this.remove=function(){a.stop();a.cursortimeout&&clearTimeout(a.cursortimeout);a.debouncedelayed&&clearTimeout(a.debouncedelayed);a.doZoomOut();a.unbindAll();f.isie9&&a.win[0].detachEvent("onpropertychange",a.onAttributeChange);!1!==
a.observer&&a.observer.disconnect();!1!==a.observerremover&&a.observerremover.disconnect();!1!==a.observerbody&&a.observerbody.disconnect();a.events=null;a.cursor&&a.cursor.remove();a.cursorh&&a.cursorh.remove();a.rail&&a.rail.remove();a.railh&&a.railh.remove();a.zoom&&a.zoom.remove();for(var b=0;b<a.saved.css.length;b++){var c=a.saved.css[b];c[0].css(c[1],"undefined"==typeof c[2]?"":c[2])}a.saved=!1;a.me.data("__nicescroll","");var d=e.nicescroll;d.each(function(b){if(this&&this.id===a.id){delete d[b];
for(var c=++b;c<d.length;c++,b++)d[b]=d[c];d.length--;d.length&&delete d[d.length]}});for(var h in a)a[h]=null,delete a[h];a=null};this.scrollstart=function(b){this.onscrollstart=b;return a};this.scrollend=function(b){this.onscrollend=b;return a};this.scrollcancel=function(b){this.onscrollcancel=b;return a};this.zoomin=function(b){this.onzoomin=b;return a};this.zoomout=function(b){this.onzoomout=b;return a};this.isScrollable=function(a){a=a.target?a.target:a;if("OPTION"==a.nodeName)return!0;for(;a&&
1==a.nodeType&&!/^BODY|HTML/.test(a.nodeName);){var c=e(a),c=c.css("overflowY")||c.css("overflowX")||c.css("overflow")||"";if(/scroll|auto/.test(c))return a.clientHeight!=a.scrollHeight;a=a.parentNode?a.parentNode:!1}return!1};this.getViewport=function(a){for(a=a&&a.parentNode?a.parentNode:!1;a&&1==a.nodeType&&!/^BODY|HTML/.test(a.nodeName);){var c=e(a);if(/fixed|absolute/.test(c.css("position")))return c;var d=c.css("overflowY")||c.css("overflowX")||c.css("overflow")||"";if(/scroll|auto/.test(d)&&
a.clientHeight!=a.scrollHeight||0<c.getNiceScroll().length)return c;a=a.parentNode?a.parentNode:!1}return!1};this.triggerScrollEnd=function(){if(a.onscrollend){var b=a.getScrollLeft(),c=a.getScrollTop();a.onscrollend.call(a,{type:"scrollend",current:{x:b,y:c},end:{x:b,y:c}})}};this.onmousewheel=function(b){if(!a.wheelprevented){if(a.railslocked)return a.debounced("checkunlock",a.resize,250),!0;if(a.rail.drag)return a.cancelEvent(b);"auto"==a.opt.oneaxismousemode&&0!=b.deltaX&&(a.opt.oneaxismousemode=
!1);if(a.opt.oneaxismousemode&&0==b.deltaX&&!a.rail.scrollable)return a.railh&&a.railh.scrollable?a.onmousewheelhr(b):!0;var c=+new Date,d=!1;a.opt.preservenativescrolling&&a.checkarea+600<c&&(a.nativescrollingarea=a.isScrollable(b),d=!0);a.checkarea=c;if(a.nativescrollingarea)return!0;if(b=q(b,!1,d))a.checkarea=0;return b}};this.onmousewheelhr=function(b){if(!a.wheelprevented){if(a.railslocked||!a.railh.scrollable)return!0;if(a.rail.drag)return a.cancelEvent(b);var c=+new Date,d=!1;a.opt.preservenativescrolling&&
a.checkarea+600<c&&(a.nativescrollingarea=a.isScrollable(b),d=!0);a.checkarea=c;return a.nativescrollingarea?!0:a.railslocked?a.cancelEvent(b):q(b,!0,d)}};this.stop=function(){a.cancelScroll();a.scrollmon&&a.scrollmon.stop();a.cursorfreezed=!1;a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y));a.noticeCursor();return a};this.getTransitionSpeed=function(b){b=Math.min(Math.round(10*a.opt.scrollspeed),Math.round(b/20*a.opt.scrollspeed));return 20<b?b:0};a.opt.smoothscroll?a.ishwscroll&&f.hastransition&&
a.opt.usetransition&&a.opt.smoothscroll?(this.prepareTransition=function(b,c){var d=c?20<b?b:0:a.getTransitionSpeed(b),e=d?f.prefixstyle+"transform "+d+"ms ease-out":"";a.lasttransitionstyle&&a.lasttransitionstyle==e||(a.lasttransitionstyle=e,a.doc.css(f.transitionstyle,e));return d},this.doScrollLeft=function(b,c){var d=a.scrollrunning?a.newscrolly:a.getScrollTop();a.doScrollPos(b,d,c)},this.doScrollTop=function(b,c){var d=a.scrollrunning?a.newscrollx:a.getScrollLeft();a.doScrollPos(d,b,c)},this.doScrollPos=
function(b,c,d){var e=a.getScrollTop(),h=a.getScrollLeft();(0>(a.newscrolly-e)*(c-e)||0>(a.newscrollx-h)*(b-h))&&a.cancelScroll();0==a.opt.bouncescroll&&(0>c?c=0:c>a.page.maxh&&(c=a.page.maxh),0>b?b=0:b>a.page.maxw&&(b=a.page.maxw));if(a.scrollrunning&&b==a.newscrollx&&c==a.newscrolly)return!1;a.newscrolly=c;a.newscrollx=b;a.newscrollspeed=d||!1;if(a.timer)return!1;a.timer=setTimeout(function(){var d=a.getScrollTop(),e=a.getScrollLeft(),h=Math.round(Math.sqrt(Math.pow(b-e,2)+Math.pow(c-d,2))),h=a.newscrollspeed&&
1<a.newscrollspeed?a.newscrollspeed:a.getTransitionSpeed(h);a.newscrollspeed&&1>=a.newscrollspeed&&(h*=a.newscrollspeed);a.prepareTransition(h,!0);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);0<h&&(!a.scrollrunning&&a.onscrollstart&&a.onscrollstart.call(a,{type:"scrollstart",current:{x:e,y:d},request:{x:b,y:c},end:{x:a.newscrollx,y:a.newscrolly},speed:h}),f.transitionend?a.scrollendtrapped||(a.scrollendtrapped=!0,a.bind(a.doc,f.transitionend,a.onScrollTransitionEnd,!1)):(a.scrollendtrapped&&
clearTimeout(a.scrollendtrapped),a.scrollendtrapped=setTimeout(a.onScrollTransitionEnd,h)),a.timerscroll={bz:new B(d,a.newscrolly,h,0,0,.58,1),bh:new B(e,a.newscrollx,h,0,0,.58,1)},a.cursorfreezed||(a.timerscroll.tm=setInterval(function(){a.showCursor(a.getScrollTop(),a.getScrollLeft())},60)));a.synched("doScroll-set",function(){a.timer=0;a.scrollendtrapped&&(a.scrollrunning=!0);a.setScrollTop(a.newscrolly);a.setScrollLeft(a.newscrollx);if(!a.scrollendtrapped)a.onScrollTransitionEnd()})},50)},this.cancelScroll=
function(){if(!a.scrollendtrapped)return!0;var b=a.getScrollTop(),c=a.getScrollLeft();a.scrollrunning=!1;f.transitionend||clearTimeout(f.transitionend);a.scrollendtrapped=!1;a._unbind(a.doc[0],f.transitionend,a.onScrollTransitionEnd);a.prepareTransition(0);a.setScrollTop(b);a.railh&&a.setScrollLeft(c);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);a.timerscroll=!1;a.cursorfreezed=!1;a.showCursor(b,c);return a},this.onScrollTransitionEnd=function(){a.scrollendtrapped&&a._unbind(a.doc[0],
f.transitionend,a.onScrollTransitionEnd);a.scrollendtrapped=!1;a.prepareTransition(0);a.timerscroll&&a.timerscroll.tm&&clearInterval(a.timerscroll.tm);a.timerscroll=!1;var b=a.getScrollTop(),c=a.getScrollLeft();a.setScrollTop(b);a.railh&&a.setScrollLeft(c);a.noticeCursor(!1,b,c);a.cursorfreezed=!1;0>b?b=0:b>a.page.maxh&&(b=a.page.maxh);0>c?c=0:c>a.page.maxw&&(c=a.page.maxw);if(b!=a.newscrolly||c!=a.newscrollx)return a.doScrollPos(c,b,a.opt.snapbackspeed);a.onscrollend&&a.scrollrunning&&a.triggerScrollEnd();
a.scrollrunning=!1}):(this.doScrollLeft=function(b,c){var d=a.scrollrunning?a.newscrolly:a.getScrollTop();a.doScrollPos(b,d,c)},this.doScrollTop=function(b,c){var d=a.scrollrunning?a.newscrollx:a.getScrollLeft();a.doScrollPos(d,b,c)},this.doScrollPos=function(b,c,d){function f(){if(a.cancelAnimationFrame)return!0;a.scrollrunning=!0;if(q=1-q)return a.timer=u(f)||1;var b=0,c,d,e=d=a.getScrollTop();if(a.dst.ay){e=a.bzscroll?a.dst.py+a.bzscroll.getNow()*a.dst.ay:a.newscrolly;c=e-d;if(0>c&&e<a.newscrolly||
0<c&&e>a.newscrolly)e=a.newscrolly;a.setScrollTop(e);e==a.newscrolly&&(b=1)}else b=1;d=c=a.getScrollLeft();if(a.dst.ax){d=a.bzscroll?a.dst.px+a.bzscroll.getNow()*a.dst.ax:a.newscrollx;c=d-c;if(0>c&&d<a.newscrollx||0<c&&d>a.newscrollx)d=a.newscrollx;a.setScrollLeft(d);d==a.newscrollx&&(b+=1)}else b+=1;2==b?(a.timer=0,a.cursorfreezed=!1,a.bzscroll=!1,a.scrollrunning=!1,0>e?e=0:e>a.page.maxh&&(e=a.page.maxh),0>d?d=0:d>a.page.maxw&&(d=a.page.maxw),d!=a.newscrollx||e!=a.newscrolly?a.doScrollPos(d,e):a.onscrollend&&
a.triggerScrollEnd()):a.timer=u(f)||1}c="undefined"==typeof c||!1===c?a.getScrollTop(!0):c;if(a.timer&&a.newscrolly==c&&a.newscrollx==b)return!0;a.timer&&v(a.timer);a.timer=0;var e=a.getScrollTop(),h=a.getScrollLeft();(0>(a.newscrolly-e)*(c-e)||0>(a.newscrollx-h)*(b-h))&&a.cancelScroll();a.newscrolly=c;a.newscrollx=b;a.bouncescroll&&a.rail.visibility||(0>a.newscrolly?a.newscrolly=0:a.newscrolly>a.page.maxh&&(a.newscrolly=a.page.maxh));a.bouncescroll&&a.railh.visibility||(0>a.newscrollx?a.newscrollx=
0:a.newscrollx>a.page.maxw&&(a.newscrollx=a.page.maxw));a.dst={};a.dst.x=b-h;a.dst.y=c-e;a.dst.px=h;a.dst.py=e;var k=Math.round(Math.sqrt(Math.pow(a.dst.x,2)+Math.pow(a.dst.y,2)));a.dst.ax=a.dst.x/k;a.dst.ay=a.dst.y/k;var n=0,p=k;0==a.dst.x?(n=e,p=c,a.dst.ay=1,a.dst.py=0):0==a.dst.y&&(n=h,p=b,a.dst.ax=1,a.dst.px=0);k=a.getTransitionSpeed(k);d&&1>=d&&(k*=d);a.bzscroll=0<k?a.bzscroll?a.bzscroll.update(p,k):new B(n,p,k,0,1,0,1):!1;if(!a.timer){(e==a.page.maxh&&c>=a.page.maxh||h==a.page.maxw&&b>=a.page.maxw)&&
a.checkContentSize();var q=1;a.cancelAnimationFrame=!1;a.timer=1;a.onscrollstart&&!a.scrollrunning&&a.onscrollstart.call(a,{type:"scrollstart",current:{x:h,y:e},request:{x:b,y:c},end:{x:a.newscrollx,y:a.newscrolly},speed:k});f();(e==a.page.maxh&&c>=e||h==a.page.maxw&&b>=h)&&a.checkContentSize();a.noticeCursor()}},this.cancelScroll=function(){a.timer&&v(a.timer);a.timer=0;a.bzscroll=!1;a.scrollrunning=!1;return a}):(this.doScrollLeft=function(b,c){var d=a.getScrollTop();a.doScrollPos(b,d,c)},this.doScrollTop=
function(b,c){var d=a.getScrollLeft();a.doScrollPos(d,b,c)},this.doScrollPos=function(b,c,d){var f=b>a.page.maxw?a.page.maxw:b;0>f&&(f=0);var e=c>a.page.maxh?a.page.maxh:c;0>e&&(e=0);a.synched("scroll",function(){a.setScrollTop(e);a.setScrollLeft(f)})},this.cancelScroll=function(){});this.doScrollBy=function(b,c){var d=0,d=c?Math.floor((a.scroll.y-b)*a.scrollratio.y):(a.timer?a.newscrolly:a.getScrollTop(!0))-b;if(a.bouncescroll){var f=Math.round(a.view.h/2);d<-f?d=-f:d>a.page.maxh+f&&(d=a.page.maxh+
f)}a.cursorfreezed=!1;f=a.getScrollTop(!0);if(0>d&&0>=f)return a.noticeCursor();if(d>a.page.maxh&&f>=a.page.maxh)return a.checkContentSize(),a.noticeCursor();a.doScrollTop(d)};this.doScrollLeftBy=function(b,c){var d=0,d=c?Math.floor((a.scroll.x-b)*a.scrollratio.x):(a.timer?a.newscrollx:a.getScrollLeft(!0))-b;if(a.bouncescroll){var f=Math.round(a.view.w/2);d<-f?d=-f:d>a.page.maxw+f&&(d=a.page.maxw+f)}a.cursorfreezed=!1;f=a.getScrollLeft(!0);if(0>d&&0>=f||d>a.page.maxw&&f>=a.page.maxw)return a.noticeCursor();
a.doScrollLeft(d)};this.doScrollTo=function(b,c){a.cursorfreezed=!1;a.doScrollTop(b)};this.checkContentSize=function(){var b=a.getContentSize();b.h==a.page.h&&b.w==a.page.w||a.resize(!1,b)};a.onscroll=function(b){a.rail.drag||a.cursorfreezed||a.synched("scroll",function(){a.scroll.y=Math.round(a.getScrollTop()*(1/a.scrollratio.y));a.railh&&(a.scroll.x=Math.round(a.getScrollLeft()*(1/a.scrollratio.x)));a.noticeCursor()})};a.bind(a.docscroll,"scroll",a.onscroll);this.doZoomIn=function(b){if(!a.zoomactive){a.zoomactive=
!0;a.zoomrestore={style:{}};var c="position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),d=a.win[0].style,h;for(h in c){var k=c[h];a.zoomrestore.style[k]="undefined"!=typeof d[k]?d[k]:""}a.zoomrestore.style.width=a.win.css("width");a.zoomrestore.style.height=a.win.css("height");a.zoomrestore.padding={w:a.win.outerWidth()-a.win.width(),h:a.win.outerHeight()-a.win.height()};f.isios4&&(a.zoomrestore.scrollTop=e(window).scrollTop(),e(window).scrollTop(0));
a.win.css({position:f.isios4?"absolute":"fixed",top:0,left:0,"z-index":z+100,margin:"0px"});c=a.win.css("backgroundColor");(""==c||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c))&&a.win.css("backgroundColor","#fff");a.rail.css({"z-index":z+101});a.zoom.css({"z-index":z+102});a.zoom.css("backgroundPosition","0px -18px");a.resizeZoom();a.onzoomin&&a.onzoomin.call(a);return a.cancelEvent(b)}};this.doZoomOut=function(b){if(a.zoomactive)return a.zoomactive=!1,a.win.css("margin",""),a.win.css(a.zoomrestore.style),
f.isios4&&e(window).scrollTop(a.zoomrestore.scrollTop),a.rail.css({"z-index":a.zindex}),a.zoom.css({"z-index":a.zindex}),a.zoomrestore=!1,a.zoom.css("backgroundPosition","0px 0px"),a.onResize(),a.onzoomout&&a.onzoomout.call(a),a.cancelEvent(b)};this.doZoom=function(b){return a.zoomactive?a.doZoomOut(b):a.doZoomIn(b)};this.resizeZoom=function(){if(a.zoomactive){var b=a.getScrollTop();a.win.css({width:e(window).width()-a.zoomrestore.padding.w+"px",height:e(window).height()-a.zoomrestore.padding.h+"px"});
a.onResize();a.setScrollTop(Math.min(a.page.maxh,b))}};this.init();e.nicescroll.push(this)},M=function(e){var c=this;this.nc=e;this.steptime=this.lasttime=this.speedy=this.speedx=this.lasty=this.lastx=0;this.snapy=this.snapx=!1;this.demuly=this.demulx=0;this.lastscrolly=this.lastscrollx=-1;this.timer=this.chky=this.chkx=0;this.time=function(){return+new Date};this.reset=function(e,k){c.stop();var d=c.time();c.steptime=0;c.lasttime=d;c.speedx=0;c.speedy=0;c.lastx=e;c.lasty=k;c.lastscrollx=-1;c.lastscrolly=
-1};this.update=function(e,k){var d=c.time();c.steptime=d-c.lasttime;c.lasttime=d;var d=k-c.lasty,p=e-c.lastx,q=c.nc.getScrollTop(),a=c.nc.getScrollLeft(),q=q+d,a=a+p;c.snapx=0>a||a>c.nc.page.maxw;c.snapy=0>q||q>c.nc.page.maxh;c.speedx=p;c.speedy=d;c.lastx=e;c.lasty=k};this.stop=function(){c.nc.unsynched("domomentum2d");c.timer&&clearTimeout(c.timer);c.timer=0;c.lastscrollx=-1;c.lastscrolly=-1};this.doSnapy=function(e,k){var d=!1;0>k?(k=0,d=!0):k>c.nc.page.maxh&&(k=c.nc.page.maxh,d=!0);0>e?(e=0,d=
!0):e>c.nc.page.maxw&&(e=c.nc.page.maxw,d=!0);d?c.nc.doScrollPos(e,k,c.nc.opt.snapbackspeed):c.nc.triggerScrollEnd()};this.doMomentum=function(e){var k=c.time(),d=e?k+e:c.lasttime;e=c.nc.getScrollLeft();var p=c.nc.getScrollTop(),q=c.nc.page.maxh,a=c.nc.page.maxw;c.speedx=0<a?Math.min(60,c.speedx):0;c.speedy=0<q?Math.min(60,c.speedy):0;d=d&&60>=k-d;if(0>p||p>q||0>e||e>a)d=!1;e=c.speedx&&d?c.speedx:!1;if(c.speedy&&d&&c.speedy||e){var u=Math.max(16,c.steptime);50<u&&(e=u/50,c.speedx*=e,c.speedy*=e,u=
50);c.demulxy=0;c.lastscrollx=c.nc.getScrollLeft();c.chkx=c.lastscrollx;c.lastscrolly=c.nc.getScrollTop();c.chky=c.lastscrolly;var f=c.lastscrollx,t=c.lastscrolly,v=function(){var d=600<c.time()-k?.04:.02;c.speedx&&(f=Math.floor(c.lastscrollx-c.speedx*(1-c.demulxy)),c.lastscrollx=f,0>f||f>a)&&(d=.1);c.speedy&&(t=Math.floor(c.lastscrolly-c.speedy*(1-c.demulxy)),c.lastscrolly=t,0>t||t>q)&&(d=.1);c.demulxy=Math.min(1,c.demulxy+d);c.nc.synched("domomentum2d",function(){c.speedx&&(c.nc.getScrollLeft()!=
c.chkx&&c.stop(),c.chkx=f,c.nc.setScrollLeft(f));c.speedy&&(c.nc.getScrollTop()!=c.chky&&c.stop(),c.chky=t,c.nc.setScrollTop(t));c.timer||(c.nc.hideCursor(),c.doSnapy(f,t))});1>c.demulxy?c.timer=setTimeout(v,u):(c.stop(),c.nc.hideCursor(),c.doSnapy(f,t))};v()}else c.doSnapy(c.nc.getScrollLeft(),c.nc.getScrollTop())}},y=e.fn.scrollTop;e.cssHooks.pageYOffset={get:function(k,c,h){return(c=e.data(k,"__nicescroll")||!1)&&c.ishwscroll?c.getScrollTop():y.call(k)},set:function(k,c){var h=e.data(k,"__nicescroll")||
!1;h&&h.ishwscroll?h.setScrollTop(parseInt(c)):y.call(k,c);return this}};e.fn.scrollTop=function(k){if("undefined"==typeof k){var c=this[0]?e.data(this[0],"__nicescroll")||!1:!1;return c&&c.ishwscroll?c.getScrollTop():y.call(this)}return this.each(function(){var c=e.data(this,"__nicescroll")||!1;c&&c.ishwscroll?c.setScrollTop(parseInt(k)):y.call(e(this),k)})};var C=e.fn.scrollLeft;e.cssHooks.pageXOffset={get:function(k,c,h){return(c=e.data(k,"__nicescroll")||!1)&&c.ishwscroll?c.getScrollLeft():C.call(k)},
set:function(k,c){var h=e.data(k,"__nicescroll")||!1;h&&h.ishwscroll?h.setScrollLeft(parseInt(c)):C.call(k,c);return this}};e.fn.scrollLeft=function(k){if("undefined"==typeof k){var c=this[0]?e.data(this[0],"__nicescroll")||!1:!1;return c&&c.ishwscroll?c.getScrollLeft():C.call(this)}return this.each(function(){var c=e.data(this,"__nicescroll")||!1;c&&c.ishwscroll?c.setScrollLeft(parseInt(k)):C.call(e(this),k)})};var D=function(k){var c=this;this.length=0;this.name="nicescrollarray";this.each=function(d){for(var e=
0,h=0;e<c.length;e++)d.call(c[e],h++);return c};this.push=function(d){c[c.length]=d;c.length++};this.eq=function(d){return c[d]};if(k)for(var h=0;h<k.length;h++){var n=e.data(k[h],"__nicescroll")||!1;n&&(this[this.length]=n,this.length++)}return this};(function(e,c,h){for(var n=0;n<c.length;n++)h(e,c[n])})(D.prototype,"show hide toggle onResize resize remove stop doScrollPos".split(" "),function(e,c){e[c]=function(){var e=arguments;return this.each(function(){this[c].apply(this,e)})}});e.fn.getNiceScroll=
function(k){return"undefined"==typeof k?new D(this):this[k]&&e.data(this[k],"__nicescroll")||!1};e.extend(e.expr[":"],{nicescroll:function(k){return e.data(k,"__nicescroll")?!0:!1}});e.fn.niceScroll=function(k,c){"undefined"!=typeof c||"object"!=typeof k||"jquery"in k||(c=k,k=!1);c=e.extend({},c);var h=new D;"undefined"==typeof c&&(c={});k&&(c.doc=e(k),c.win=e(this));var n=!("doc"in c);n||"win"in c||(c.win=e(this));this.each(function(){var d=e(this).data("__nicescroll")||!1;d||(c.doc=n?e(this):c.doc,
d=new S(c,e(this)),e(this).data("__nicescroll",d));h.push(d)});return 1==h.length?h[0]:h};window.NiceScroll={getjQuery:function(){return e}};e.nicescroll||(e.nicescroll=new D,e.nicescroll.options=J)});
/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
(function($) {
	var defaults = {
		minHeight:50,
		maxHeight:300
	};
	$.fn.resizeTextarea = function(params) {
		var options = $.extend({}, params, defaults);
    
		$(this).each(function() {
			var $this = $(this),
				methods = {
					setHeight:function() {
						$this.height(options.minHeight);
						if ($this.height() != getScrollHeight($this)) {
							if (getScrollHeight($this) > options.maxHeight) {$this.height(options.maxHeight);}
							else {$this.height(getScrollHeight($this) || options.minHeight);}
						}
					}
				};
			methods.setHeight();
			$this.attr({rows:options.minHeight});
			
			$this.keyup(function(){methods.setHeight();});
		});
    
    function getScrollHeight($elem) {
      $elem.scrollTop($elem.get(0).scrollHeight);
      var result = $elem.scrollTop() + $elem.height();
      $elem.scrollTop(0);
      
      return result;
    }
    
		return $(this);
	};
})(jQuery);
/**
 * Copyright (c) 2007 Ariel Flesler - aflesler ? gmail � com | https://github.com/flesler
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.2
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});
