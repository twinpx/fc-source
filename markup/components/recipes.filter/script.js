(function ($) {
  'use strict';

  $(function () {
    function getGetParam(key) {
      var s = window.location.search;
      s = s.match(new RegExp(key + '=([^&=]+)'));
      return s ? s[1] : false;
    }

    $(document).bind('click', function () {
      $('#filter_list:visible').slideUp('fast');
    });

    $(function () {
      new FilterRecipes();
      new FilterList();
    });

    function FilterRecipes() {
      var self = this;

      init();

      function init() {
        initFilter();
      }

      function initFilter() {
        $('#filter_recipes').delegate(
          '.b-filter__item__button',
          'click',
          clickItem
        );

        function clickItem() {
          var $this = $(this),
            //col = 4,
            type = $this
              .parent()
              .data('type'); /*,
            array = getArray(type);*/

          //slide up
          if ($('#filter_list').hasClass(type)) {
            $('#filter_list').slideUp('middle', function () {
              //$( "#filter_list" ).empty();
              document.getElementById('filter_list').className = '';
            });
            return;
          }

          makeHtml();

          /*function getArray(type) {
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
          }*/

          function makeHtml() {
            /*var html = "",
              num = Math.ceil(array[1].length/col);
            
            html += '<div class="pad"><table>';
                    
            for(var i = 0; i < num; i++) {
              html += '<tr>';
                      
              for(var j = 0; j < col; j++) {
                var x = num * j + i;
                
                if(array[0][x]) {
                  html += '<td><a href="#" data-id="' + array[0][x] + '">' + array[1][x] + '</a></td>';
                }
                else {
                  html += '<td><span></span></td>';
                }
              }
              
              html += '</tr>';
            }
            
            html += '</table></div>';*/

            document.getElementById('filter_list').className = type;
            $('#filter_list') /*.html(html)*/
              .slideDown('middle');
          }
          return false;
        }
      }
    }

    function FilterList() {
      var self = this;
      self.recipesPerPage = 6;
      self.makeRequest = true;

      init();

      function init() {
        if (document.getElementById('filter_lists')) {
          initList();
        }

        $('#get_more_recipes a').click(clickMoreRecipes);

        //on load
        var page = parseQuery(window.location.search).page;
        if (page) {
          clickMoreRecipes(page * 1 - 2);
        }
      }

      function initList() {
        //load dropdowns
        (async function () {
          try {
            var response = await fetch(
              document
                .getElementById('filter_lists')
                .getAttribute('data-load-url')
            );
            var result = await response.text();
            var filterList = document.createElement('div');
            filterList.setAttribute('id', 'filter_list');
            filterList.innerHTML = result;
            document.getElementById('filter_lists').append(filterList);
          } catch (err) {
            throw err;
          }
        })();

        $('#filter_lists')
          .click(function (e) {
            e.stopPropagation();
          })
          .delegate('a', 'click', clickListLink);
      }

      function clickListLink() {
        if ($('#filter_recipes').hasClass('i-link')) {
          return true;
        }

        var type = document.getElementById('filter_list').className,
          typeId = $(this).data('id');

        $.ajax({
          url: $('#filter_recipes').data('ajax-url'),
          dataType: 'html',
          data: 'type=' + type + '&data=' + typeId,
          beforeSend: function () {
            //show preloader
            $('#recipe_feed_block')
              .empty()
              .html(
                '<div class="preloader"><img src="/images/preloader.gif" width="281" height="52" alt="" /></div>'
              );
          },
          success: function (html) {
            $('#recipe_feed_block').append(html).find('.preloader').remove();
            $('#recipe_feed_block .b-recipe-thumb__photo').lazyload();
          },
          error: ajaxError,
        });

        $('#filter_list').hide().empty();

        return false;
      }

      function clickMoreRecipes(counter) {
        var id = $('#get_more_recipes a').data('id'),
          searchURL = {};

        $.ajax({
          url: $('#get_more_recipes').data('more-url'),
          dataType: 'html',
          data: 'id=' + id + '&p=' + ($('.b-recipe-feed__wrapper').length + 1), //getGetParam('page'),
          beforeSend: function () {
            $('#get_more_recipes').addClass('preload');
          },
          success: function (html) {
            $('#get_more_recipes').removeClass('preload');
            var $div = $('<div class="b-recipe-feed__wrapper"></div>');

            $div.html(html);

            $('#recipe_feed_block')
              .append($div)
              .find('.b-recipe-feed__wrapper:last')
              .addClass('i-animate');
            $div.find('.b-recipe-thumb__photo').lazyload();

            $.scrollTo(
              $(
                '#recipe_feed_block .b-recipe-feed__wrapper:last .b-recipe-thumb:first'
              ).offset().top -
                200 +
                'px',
              1000
            );

            showHideGetMoreButton();

            //set URL
            if (window.history) {
              if (window.location.search) {
                searchURL = parseQuery(window.location.search);
              }
              searchURL.page = $('.b-recipe-feed__wrapper').length + 1;
              history.replaceState({}, '', getQuery(searchURL));
            }

            if (counter && counter > 0) {
              clickMoreRecipes(--counter);
            }
          },
        });

        return false;
      }

      function showHideGetMoreButton() {
        /*if ( difference == 0 ) {
          $( "#get_more_recipes" ).hide();
        } else {
          $( "#get_more_recipes" ).show();
        }*/
      }

      function getQuery(queryObject) {
        var result = [];
        for (var k in queryObject) {
          result.push(k + '=' + queryObject[k]);
        }
        return '?' + result.join('&');
      }

      function parseQuery(queryString) {
        var query = {};
        var pairs = (queryString[0] === '?'
          ? queryString.substr(1)
          : queryString
        ).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          query[decodeURIComponent(pair[0])] = decodeURIComponent(
            pair[1] || ''
          );
        }
        return query;
      }
    }

    function ajaxError(a, b, c) {
      if (window.console) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }

    /*if ( window.BX ) {
      BX.addCustomEvent( "onFrameDataReceived", function () {});
    }*/
  });
})(jQuery);
