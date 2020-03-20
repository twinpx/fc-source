( function($) {
  
  $(function() {
  
    var sendFlag = false;
    
    $( window ).bind( 'scroll', function() {
      //load
      
      if ( $.trim($( ".b-recipe-menu.i-bottom" ).text()) == '' ) {
        var top = $( document ).scrollTop() + parseInt( window.screen.height ) - 50;
      
        $( ".b-recipe-menu.i-bottom" ).each( function() {
          var $menuBlock = $( this );
          if ( $menuBlock.offset().top < top ) {
            if ( !sendFlag ) {
              sendFlag = true;
              $.ajax({
                url: $menuBlock.data( 'load-action' ),
                type: $menuBlock.data( 'load-method' ),//GET
                dataType: "html",
                success: function( html) {
                  $menuBlock.html( html );
                  init();
                },
                error: function( a, b, c ) {
                  sendFlag = false;
                  if ( window.console ) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                  }
                }
              });
            }
          }
        });
        
      }
    });
    
    function init() {
      // the menu
      $( '.b-recipe-menu' ).each( function( index, menu ) {
        var $menu = $( menu );
        if ( !$menu.hasClass( 'i-ready' )) {
          $menu.addClass( 'i-ready' );
          recipeMenu( $menu );
        }
      });

      if ( window.BX ) {
        BX.addCustomEvent( "onFrameDataReceived", function () {
        
          $( '.b-recipe-menu' ).each( function( index, menu ) {
            var $menu = $( menu );
            if ( !$menu.hasClass( 'i-ready' )) {
              $menu.addClass( 'i-ready' );
              recipeMenu( $menu );
            }
          });
          
        });
      }
    }
    
  });
  
  function recipeMenu( $menu ) {
    
    $menu
      .on( 'action:like', function( e, total ) {
        $menu.find( '.b-recipe-menu__i .b-like-button__num' ).text( total );
      })
      .on( 'action:cooked', function( e, total ) {
        $menu.find( '.b-recipe-menu__i .b-cooked-button__num' ).text( total );
      });

    $menu.find( '.b-print-button' ).click( function() {
      openPrintWindow();
      return false;
    });
    
    //Cooked/like action
    $menu.find( '.b-info-block__icon.i-cooked' ).click( clickCooked );
    $menu.find( '.b-info-block__icon.i-like' ).click( clickLike );
  
  }
  
  function clickCooked(e) {
    var action = 'cooked';
    click( e, action );
  }
  
  function clickLike(e) {
    var action = 'like';
    click( e, action );
  }
  
  function click( e, action ) {
    
    var $this = $( e.target ),
        url = $this.data( 'href' ),
        method = 'POST';
    
    if ( !url ) return true;
    
    e.preventDefault();
    
    $.ajax({
      url: url,
      type: method,
      dataType: 'json',
      success: function( data ) {
        if ( data.success !== 'Y' ) return;
        successFunc( $this, data, action );
      },
      error: ajaxError
    });
  }
    
  function successFunc( $this, data, action ) {
    var activeFlag,
        $text,
        users,
        href;
        
    //change href
    href = $this.data( 'href' );
    
    if ( href.search( 'dislike' ) !== -1 ) {
      href = href.replace( 'dislike', 'like' );
    } else if ( href.search( 'like' ) !== -1 ) {
      href = href.replace( 'like', 'dislike' );
    } else if ( href.search( 'uncooked' ) !== -1 ) {
      href = href.replace( 'uncooked', 'cooked' );
    } else if ( href.search( 'cooked' ) !== -1 ) {
      href = href.replace( 'cooked', 'uncooked' );
    }
    
    $this.data( 'href', href );
    
    //set nums
    data.total = data.total || ( data.users ? data.users.length : 0 );
    $( '.b-recipe-menu' ).trigger( 'action:' + action, [ data.total ]);
    
    //toggle class
    $this.toggleClass( 'i-active' );
    activeFlag = $this.hasClass( 'i-active' );
    
    //render 4- avatars
    $text = $this.siblings( '.b-info-block__text' );
    
    if ( !$text.length ) {
      createTextBlock( $this );
      $text = $this.siblings( '.b-info-block__text' );
    }
    
    users = renderUsers( data.users );
    if ( !users ) {
      $text.after( '<div class="b-info-block__title"><b>' + $text.find( 'b' ).text() + '</b></div>' ).remove();
    }
    $text.find( '.b-info-block__users' ).html( users );
    
    //change others
    $text.find( '.b-info-block__others' ).text( data.others || '' );
  }
    
  function createTextBlock( $this ) {
    var $title = $this.siblings( '.b-info-block__title' ).remove();
    $this.after( '<div class="b-info-block__text">' + $title.html() + '<div class="b-info-block__users"></div><div class="b-info-block__others"></div></div>' );
  }
  
  function renderUsers( users ) {
    var html = '';
    
    if ( !(users instanceof Array) ) return html;
    
    users.forEach( function( user ) {
      html += '<a href="' + user.href + '" title="' + user.name + '" class="b-info-block__user"><img src="' + user.src + '" width="20" height="20" alt=""></a> ';
    });
    
    return html;
  }

	//Open window to print a recipe
	function openPrintWindow() {
		var $recipe = $(".recipe");
		var $title = $recipe.find(".title");
		var $instructions = $recipe.find(".instructions");
		var $stages = [];
		
		/*var heading = [
			["Первый", "Второй", "Третий", "Четвёртый", "Пятый", "Шестой", "Седьмой", "Восьмой", "Девятый"],
			["Одиннадцатый", "Двенадцатый", "Тринадцатый", "Четырнадцатый", "Пятнадцатый", "Шестнадцатый", "Семнадцатый", "Восемнадцатый", "Девятнадцатый"],
			["Десятый", "Двадцатый", "Тридцатый", "Сороковой", "Пятидесятый", "Шестидесятый", "Семидесятый", "Восьмидесятый", "Девяностый"],
			["", "Двадцать", "Тридцать", "Сорок", "Пятьдесят", "Шестьдесят", "Семьдесят", "Восемьдесят", "Девяносто"],
			["первый", "второй", "третий", "четвёртый", "пятый", "шестой", "седьмой", "восьмой", "девятый"]
		];*/
		
		$instructions.find(".stage").each(function() {
			var $div = $('<div></div>').html($(this).html());
			$div.find(".body").append('<div class="i-clearfix"></div>');
			var $image = $div.find(".image");
			$image.html(resizeImage($image.html()));
			
			$stages.push($div.html());
		});
		
		var printWindow = window.open("", "", "width=800, height=800,toolbar=0,scrollbars=yes,status=0,directories=0,location=0,menubar=0,resizable=0");
		printWindow.document.write(compileBody());
		
		function resizeImage(html) {
			var $block = $('<div></div>').html(html);
			var $image = $block.find("img");
			var $screen = $block.find(".screen");
			var $div = $screen.children("div");
			
			var width = parseInt($div.css("width"));
			var height = parseInt($div.css("height"));
			
			var ratio = 200/width;
			
			//var newWidth = width * ratio;
			//var newHeight = height * ratio;
			
			$div.css({width: width * ratio + "px", height: height * ratio + "px"});
			$image.attr({width: width * ratio, height: height * ratio});
			
			return $block.html();
		}
		
		function compileBody() {
			
			var bodyObj = {
				browser: $.browser,
				title: $("title").text(),
				h1: $("h1").text(),
				recipeInfo: $recipe.find(".recipe_info").html(),
				needed: $title.find(".needed").find("table").html(),
				titleImage: resizeImage($title.find(".image").html()),
				description: $recipe.find(".description").html(),
				stages: $stages			
			};
			
			var template = document.getElementById('print-recipe').innerHTML;
			var compiled = tmpl(template);
			return compiled(bodyObj);
		}
	}


}( jQuery ));