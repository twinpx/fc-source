( function($) {

  'use strict';
  
  $( function() {
  
    $(document).bind( "click", function() {
      $( "#filter_list:visible" ).slideUp( "fast", function() {
        $( "#filter_recipes .open" ).removeClass( "open" );
      });
    });

    var allRecipesResult = window.allRecipesResult || [];

    $( function() {
      new FilterRecipes();
      
      /*$(".b-filter").each(function() {
        new Filter($(this));
      });*/
      
      new FilterList();
      
      new SearchRecipeFeed();
    });

    function FilterRecipes() {
      var self = this;
      
      init();
      
      function init() {
        initFilter();
      }
      
      function initFilter() {
        $("#filter_recipes").delegate(".b-filter__item", "click", clickItem);
        
        function clickItem() {
          var $this = $(this),
            col = 4,
            type = getType(),
            array = getArray(type);
          
          makeHtml();
          
          function getType() {
            var result = $this.parent()[0].className.split(/\s*item\s*/);
            for(var i = 0; i < result.length; i++) {
              if(result[i] != "") {
                result = result[i];
                break;
              }
            }
            
            return result;
          }
          
          function getArray(type) {
            switch(type) {
              case "cuisine":
                return cuisineArray;
              
              case "dish":
                return dishTypeArray;
              
              case "ingredient":
                return mainIngredientArray;
              
              case "tag":
                return tagArray;
            }
            
            return cuisineArray;
          }
          
          function makeHtml() {
            
            if ( $this.hasClass("open")) {
              $( "#filter_list" ).slideUp( "middle" ).empty();
              $this.removeClass( "open" );
              document.getElementById( "filter_list" ).className = "";
              return;
            }
            
            var html = "",
              num = Math.ceil(array[1].length/col);
            
            html += '<div class="pad"><table>';
                    
            for(var i = 0; i < num; i++) {
              html += '<tr>';
                      
              for(var j = 0; j < col; j++) {
                var x = num * j + i;
                
                if(array[0][x]) {
                  html += '<td><a href="#" rel="' + array[0][x] + '">' + array[1][x] + '</a></td>';
                }
                else {
                  html += '<td><span></span></td>';
                }
              }
              
              html += '</tr>';
            }
            
            html += '</table></div>';
            $("#filter_list").html(html).slideDown("middle");
            $("#filter_recipes .item a").removeClass("open");
            $this.addClass("open");
            document.getElementById("filter_list").className = type;
          }
          return false;
        }
      }
    }

    /*function Filter($elem) {
      var self = this;
      
      init();
      
      function init() {
        self.$elem = $elem;
        self.$lists = self.$elem.find(".b-filter__lists");
        self.$list = self.$elem.find(".b-filter__list");
        initFilter();
      }
      
      function initFilter() {
        $elem.delegate(".b-filter__item__button", "click", clickItem);
        
        function clickItem() {
          var $button = $(this),
            col = parseInt(self.$elem.attr("data-col"), 10),
            array = window[$button.closest(".b-filter__item").attr("data-array")];
          
          if($button.hasClass("open")) {
            self.$list.slideUp("middle").empty();
            $button.removeClass("open");
          } else {
            makeHtml();
          }
          
          function makeHtml() {
            
            var html = "",
              num = Math.ceil(array.length/col);
            
            html += '<div class="pad"><table>';
                    
            for(var i = 0; i < num; i++) {
              html += '<tr>';
                      
              for(var j = 0; j < col; j++) {
                var x = num * j + i;
                
                if(array[x]) {
                  html += '<td><a href="#" rel="' + array[x].id + '">' + array[x].name + '</a></td>';
                }
                else {
                  html += '<td><span></span></td>';
                }
              }
              
              html += '</tr>';
            }
            
            html += '</table></div>';
            self.$list.html(html).slideDown("middle");
            self.$elem.find(".b-filter__item__button").removeClass("open");
            $button.addClass("open");
          }
          return false;
        }
      }
    }*/

    function FilterList() {
      var self = this;
      self.recipesPerPage = 6;
      self.makeRequest = true;
      
      init();
      
      function init() {
        if(!document.getElementById("filter_list")) return false;
        
        pageLoad();
        initList();
      }
      
      function pageLoad() {
        var urlParams = analyzePageUrl();
        pushHistory(urlParams);
        makeRequest(urlParams);
        
        function analyzePageUrl() {
          var object = getDataFromUrl();
          var result = {};
          
          for(var key in object) {
            if(key == "cuisine" || key == "dish" || key == "ingredient" || key == "tag") {
              result.type = key;
              result.data = object[key];
            }
          }
          
          result.num = object.num;
          
          return result;
          
          function getDataFromUrl() {
            var search = window.location.search;
            var regExp = /([a-z0-9]+)=([a-z0-9]+)/gi;
            var array;
            var object = {};
            while((array = regExp.exec(search)) != null) {
              object[array[1]] = array[2];
            }
            
            return object;
          }
        }
        
        function pushHistory(urlParams) {
          var params = {};
          
          for(var key in urlParams) {
            params[key] = urlParams[key];
          }
          
          if ( !params.num ) {//loaded page with no params at all
            params.num = $( "#recipe_feed_block .b-recipe-thumb" ).length;
          }
          
          params.allRecipesNum = parseInt( $( "#fc_statistics span.num" ).text(), 10 );
          params.recipes = getRecipesObjectFromHtml();
          
          var History = window.History;
          if (!History.enabled) return;
        
          History.pushState(params);
          //History.log(History.getState().data, "pushHistory");
        }
        
        function makeRequest(params) {
          if(params.type && params.data) {//show chosen group of recipes
            firstRecipesRequest(params.type, params.data, params.num, true);
          } else if(params.num) {//show last recipes
            lastRecipesRequest(params.num, true)
          }
        }
      }
        
      function initList() {
        $("#filter_list")
          .click(function(e) {
            e.stopPropagation();
          })
          .delegate("a", "click", clickListLink);
        
        setHistoryAdapter();
        $("#get_more_recipes a").click(clickMoreRecipes);
      }
        
      function clickListLink() {
        
        if ( $( '#filter_recipes' ).hasClass( 'i-link' ) ) {
          return true;
        }
        
        var type = document.getElementById("filter_list").className,
          typeId = this.getAttribute('rel');
        
        firstRecipesRequest(type, typeId);
        $("#filter_list").hide().empty();
        
        return false;
      }
      
      function firstRecipesRequest(type, typeId, num, replaceFlag) {
        var requestRecipesNum = self.recipesPerPage;
        var url = $( '#filter_recipes' ).data( 'all-url' ) || '/php/all_recipes_result.php';
        if(num) requestRecipesNum = num;
        
        $.ajax({
          url: url,
          dataType: "json",
          data: "num=" + requestRecipesNum + "&type=" + type + "&data=" + typeId,
          beforeSend: beforeAjax,
          success: successAjax,
          error: function(a,b,c) {
            if ( window.console ) {
              console.log(a);
              console.log(b);
              console.log(c);
            }
          }
        });
        
        function beforeAjax() {
          showPreloader();
        }
        
        function successAjax(data) {
          allRecipesResult = data.id;
          var recipesNum = parseInt(allRecipesResult.length, 10) + parseInt(data.recipes.length, 10);
          
          self.makeRequest = false;
          
          setWindowHistory({
            type: type,
            data: typeId,
            num: data.recipes.length,
            recipes: data.recipes,
            allRecipesNum: recipesNum
          }, replaceFlag);
          
          setTimeout(function() {showRecipesFromState(window.History.getState())}, 0);//setTimeout for IE
        }
      }
      
      function lastRecipesRequest(num, replaceFlag) {
        var requestRecipesNum = self.recipesPerPage;
        var url = $( '#filter_recipes' ).data( 'last-url' ) || '/php/last_recipes_result.php';
        if(num) requestRecipesNum = num;
        
        $.ajax({
          url: url,
          dataType: "json",
          data: "num=" + requestRecipesNum,
          beforeSend: beforeAjax,
          success: successAjax
        });
        
        function beforeAjax() {
          showPreloader();
        }
        
        function successAjax(data) {
          var recipesNum = parseInt(data.id.length, 10) + parseInt(data.recipes.length, 10);
          
          self.makeRequest = false;
          
          setWindowHistory({
            num: data.recipes.length,
            recipes: data.recipes,
            allRecipesNum: recipesNum
          }, replaceFlag);
          
          setTimeout(function() {showRecipesFromState(window.History.getState())}, 0);//setTimeout for IE
        }
      }
      
      function showPreloader() {
        $("#recipe_feed_block").empty().html('<div class="preloader"><img src="/images/preloader.gif" width="281" height="52" alt="" /></div>');
      }
      
      function clickMoreRecipes() {
        var idPortion = [];
        var url = $( '#get_more_recipes' ).data( 'more-url' ) || '/php/get_more_recipes.php';
        
        for(var i = 0; i < self.recipesPerPage; i++) {
          if(allRecipesResult[0]) {
            idPortion[i] = allRecipesResult.shift();
          }
        }
        
        $.ajax({
          url: url,
          dataType: "json",
          data: "id=" + idPortion,
          beforeSend: function() {
            $("#get_more_recipes").addClass("preload");
          },
          success: function(data){
            $("#get_more_recipes").removeClass("preload");
            var div = $('<div class="block" style="display:none;"></div>');
            
            var i,html = '';
            
            for ( var j = 0; j < Math.ceil( data.recipes.length / 3 ); j++ ) {
            
              html += '<div class="row">';
              
              for( var k = 0; k < 3; k++ ) {
                i = j*3 + k;
                if ( i >= data.recipes.length ) {
                  break;
                }
                html += '<div class="col-sm-4"><div class="b-recipe-thumb"><a href="' + data.recipes[i].href + '" style="background-image: url(' + data.recipes[i].src + ');" class="b-recipe-thumb__photo"><img src="data:image/gif;base64,R0lGODlhBgAEAIAAAP///wAAACH5BAEAAAAALAAAAAAGAAQAAAIEhI+pVwA7"></a><hr class="i-size-S"><a href="' + data.recipes[i].href + '" class="col-sm-10 center-block"><b>' + data.recipes[i].name + '</b></a><hr class="i-size-S"><div class="b-recipe-thumb__author author">От: ' + data.recipes[i].author + '</div><div class="b-recipe-thumb__info"><span class="comments_icon" title="Оставить отзыв"><noindex><a href="' + data.recipes[i].href + '#comments">' + data.recipes[i].comments + '</a></noindex></span></div></div></div>';
            
                if ( k !== 2 && i < data.recipes.length - 1 ) {
                  html += '<hr class="visible-xs-block">';
                }
              }
              
              html += '</div><hr class="i-size-L hidden-xs"><hr class="visible-xs-block">';
              
            }
            
            div.html(html);
            $("#recipe_feed_block").append(div).find(".block:last .photo a").each(function() {
              var $this = $(this),
                $img = $this.children("img"),
                img = new Image();
                
              img.src = $img.attr("src");
              var hei = Math.floor(img.height*$img.attr("width")/img.width);
              if(hei > 0) {
                $img.css({marginTop:(parseInt($this.css("height"))/2-hei/2)+"px"});
              }
              else {
                $img.load(function() {
                  var hei = Math.floor(img.height*$img.attr("width")/img.width);
                  if(hei>0) {$img.css({marginTop:(parseInt($this.css("height"))/2-hei/2)+"px"});}
                });
              }
            }).end()
            .find("div.block:last").css({opacity:0}).show().animate({opacity:1}, 500);
            
            $.scrollTo($("#recipe_feed_block .block:last .col-sm-4:first"), 1000);
            
            updateHistory(data);
            
            showHideGetMoreButton();
            
            //window.upButton.styleElements();
          }
        });
        
        return false;
        
        function updateHistory(moreData) {
          var History = window.History;
          if (!History.enabled) return;
          
          self.makeRequest = false;
          var State = History.getState();
          State.data.num = $("#recipe_feed_block .b-recipe-thumb").length;
          
          if(State.data.recipes && moreData.recipes) {
            State.data.recipes = State.data.recipes.concat(moreData.recipes);
          }
          
          setWindowHistory(State.data, false);
        }
      }
      
      function setWindowHistory(stateObj, replaceFlag) {
        var History = window.History; // Note: We are using a capital H instead of a lower h
        if (!History.enabled) return;
        
        var stateUrl = formStateUrl();
        
        if(replaceFlag) {
          History.replaceState(stateObj, "Рецепты", stateUrl);
          //History.log(History.getState().data, "setWindowHistory replace");
          return;
        }
        
        History.pushState(stateObj, "Рецепты", stateUrl);
        //History.log(History.getState().data, "setWindowHistory");
        
        function formStateUrl() {
          var url = [];
          if(stateObj.type && stateObj.data) {
            url.push(stateObj.type + "=" + stateObj.data);
          }
          url.push("num=" + stateObj.num);
          
          url = url.join("&");
          if(url != "") {
            url = "?" + url;
          }
          
          return url;
        }
      }
        
      function setHistoryAdapter() {
        var History = window.History;
        if (!History.enabled) return;
        
        History.Adapter.bind(window, 'statechange', function() {
          if(self.makeRequest) {//for- and back- browser navigation
            var State = History.getState();
            
            if(State.data.recipes) {
              showRecipesFromState(State);
            } else {
              firstRecipesRequest(null, null);
            }
            //History.log(History.getState().data);
          }
          
          self.makeRequest = true;
        });
      }
      
      function showRecipesFromState(State) {//request for recipes of new type (dish, ingredient, etc)
        if(State.data.type && State.data.data) {
          var array = getTypeArray(State.data.type);
          var text = getTextFromData(array, State.data.data);
          highlightButton($("." + State.data.type + " a"), text);
        } else {
          highlightButton($(), "");
        }
        
        renderRecipes(State.data.recipes);
        showRecipesNum(State.data.allRecipesNum);
        highlightTopbarButton();
        showHideGetMoreButton();
      }
      
      function showHideGetMoreButton() {
        var History = window.History;
        if (History.enabled) {
          var State = History.getState();
          var difference = State.data.allRecipesNum - State.data.recipes.length;
        } else {
          var difference = allRecipesResult.length;
        }
        if(difference == 0) {
          $("#get_more_recipes").hide();
        } else {
          $("#get_more_recipes").show();
        }
      }
      
      function highlightTopbarButton() {
        $("#topbar div.item").each(function() {
          if($(this).text() == "Рецепты") {
            if(window.search && window.search != "") {
              $(this).html('<a href="' + window.pathname + '"><span>Рецепты</span></a>');
            } else {
              $(this).html('<span><span>Рецепты</span></span>');
            }
          }
        });
      }
      
      function getTypeArray(type) {
        switch(type) {
          case "cuisine":
            return cuisineArray;
          
          case "dish":
            return dishTypeArray;
          
          case "ingredient":
            return mainIngredientArray;
          
          case "tag":
            return tagArray;
        }
      }
      
      function getTextFromData(array, data) {
        for(var i = 0; i < array[0].length; i++) {
          if(array[0][i] == data) {
            return array[1][i];
          }
        }
      }
      
      function renderRecipes(recipesArray) {
        var i,html = "";
            
        for ( var j = 0; j < Math.ceil( recipesArray.length / 3 ); j++ ) {
          html += '<div class="row">';
      
          for( var k = 0; k < 3; k++ ) {
            i = j*3 + k;
            
            if ( i >= recipesArray.length ) {
              break;
            }
            
            html += '<div class="col-sm-4"><div class="b-recipe-thumb"><a href="' + recipesArray[i].href + '" style="background-image: url(' + recipesArray[i].src + ');" class="b-recipe-thumb__photo"><img src="data:image/gif;base64,R0lGODlhBgAEAIAAAP///wAAACH5BAEAAAAALAAAAAAGAAQAAAIEhI+pVwA7"></a><hr class="i-size-S"><a href="' + recipesArray[i].href + '" class="col-sm-10 center-block"><b>' + recipesArray[i].name + '</b></a><hr class="i-size-S"><div class="b-recipe-thumb__author author">От: ' + recipesArray[i].author + '</div><div class="b-recipe-thumb__info"><span class="comments_icon" title="Оставить отзыв"><noindex><a href="' + recipesArray[i].href + '#comments">' + recipesArray[i].comments + '</a></noindex></span></div></div></div>';
            
            if ( k !== 2 && i < recipesArray.length - 1 ) {
              html += '<hr class="visible-xs-block">';
            }
          }
          
          html += '</div><hr class="i-size-L hidden-xs"><hr class="visible-xs-block">';
        }
        
        $("#recipe_feed_block").html(html);
      }
      
      function highlightButton($link, text) {
        $("#filter_recipes a.active").removeClass("active").find("span.bg span").text("Выберите");
        $link.removeClass("open").addClass("active").find("span.bg span").text(text);
      }
      
      function getRecipesObjectFromHtml() {
        var result = [];
        
        $("#recipe_feed_block .b-recipe-thumb").each(function() {
          var $item = $(this);
          
          result.push({
            name: $item.find("b").text(),
            href: $item.find("a:first").attr("href"),
            src: /url\(['"]?([^'"]*)['"]?\)/.exec( $item.find("a:first").css("backgroundImage"))[1],
            author: $item.find(".author").text().substring(4),
            comments: $item.find(".comments_icon a").text()
          });
        });
        
        return result;
      }
      
      function showRecipesNum(recipesNum) {
        $("#fc_statistics").find("span.num").text(recipesNum).end().find("span.word").text(recipeWord(recipesNum));
          
        function recipeWord(num) {
          if (/(10|11|12|13|14|15|16|17|18|19)$/.test(num)) {
            return 'рецептов';
          } else if (/.*1$/.test(num)) {
            return 'рецепт';
          } else if (/[2-4]$/.test(num)) {
            return 'рецепта';
          } else {
            return 'рецептов';
          }
        }
      }
    }

    function SearchRecipeFeed() {
      var self = this;
      
      init();
      
      function init() {
        setElements();
        handleEvents();
      }
      
      function setElements() {
        self.$statistics = $("#fc_statistics");
        self.$getMoreButton = $("#get_more_recipes");
        self.recipesPerPage = 27;
      }
      
      function handleEvents() {
        self.$getMoreButton.click(clickMoreRecipes);
      }
      
      function clickMoreRecipes() {
        var idPortion = [];
        var url = $( '#filter_recipes' ).data( 'all-url' ) || '/php/all_recipes_result.php';
        
        for(var i = 0; i < self.recipesPerPage; i++) {
          if(allRecipesResult[0]) {
            idPortion[i] = allRecipesResult.shift();
          }
        }
        
        $.ajax({
          url: url,
          dataType: "json",
          data: "id=" + idPortion,
          beforeSend: function() {
            $("#get_more_recipes").addClass("preload");
          },
          success: function(data){
            $("#get_more_recipes").removeClass("preload");
            var div = $('<div class="block" style="display:none;"></div>');
            
            var i,html = '';
            
            for ( var j = 0; j < Math.ceil( data.recipes.length / 3 ); j++ ) {
            
              html += '<div class="row">';
              
              for( var k = 0; k < 3; k++ ) {
                i = j*3 + k;
                if ( i >= data.recipes.length ) {
                  break;
                }
                html += '<div class="col-sm-4"><div class="b-recipe-thumb"><a href="' + data.recipes[i].href + '" style="background-image: url(' + data.recipes[i].src + ');" class="b-recipe-thumb__photo"><img src="data:image/gif;base64,R0lGODlhBgAEAIAAAP///wAAACH5BAEAAAAALAAAAAAGAAQAAAIEhI+pVwA7"></a><hr class="i-size-S"><a href="' + data.recipes[i].href + '" class="col-sm-10 center-block"><b>' + data.recipes[i].name + '</b></a><hr class="i-size-S"><div class="b-recipe-thumb__author author">От: ' + data.recipes[i].author + '</div><div class="b-recipe-thumb__info"><span class="comments_icon" title="Оставить отзыв"><noindex><a href="' + data.recipes[i].href + '#comments">' + data.recipes[i].comments + '</a></noindex></span></div></div></div>';
            
                if ( k !== 2 && i < data.recipes.length - 1 ) {
                  html += '<hr class="visible-xs-block">';
                }
              }
              
              html += '</div><hr class="i-size-L hidden-xs"><hr class="visible-xs-block">';
            }
            
            div.html( html );
            
            $("#recipe_feed_block")
              .append( div )
              .find("div.block:last")
              .css({opacity:0})
              .show().animate({opacity:1}, 500);
            
            $.scrollTo($("#recipe_feed_block div.block:last div.b-recipe-thumb:first"), 1000);
            
            showHideGetMoreButton();
            
            //window.upButton.styleElements();
            
            function showHideGetMoreButton() {
              var difference = allRecipesResult.length;
              
              if(difference == 0) {
                $("#get_more_recipes").hide();
              } else {
                $("#get_more_recipes").show();
              }
            }

          }
        });
        
        return false;
        
      }
      
      function showRecipesNum(recipesNum) {
        self.$statistics.find("span.num").text(recipesNum).end().find("span.word").text(recipeWord(recipesNum));
          
        function recipeWord(num) {
          if (/(10|11|12|13|14|15|16|17|18|19)$/.test(num)) {
            return 'рецептов';
          } else if (/.*1$/.test(num)) {
            return 'рецепт';
          } else if (/[2-4]$/.test(num)) {
            return 'рецепта';
          } else {
            return 'рецептов';
          }
        }
      }
    }
  
    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });

}( jQuery ));