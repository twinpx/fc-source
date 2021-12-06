(function ($) {
  'use strict';

  $(function () {
    document
      .querySelectorAll('.b-search-result__results')
      .forEach(function (results) {
        var page;
        var tab = results.getAttribute('data-tab');

        if (
          window.location.search &&
          parseQuery(window.location.search).tab === tab
        ) {
          page = parseQuery(window.location.search).PAGEN_1;
          if (
            $(results).find(
              '.b-search-result__result-block[ data-page=' + page + ' ]'
            ).length
          ) {
            $.scrollTo(
              $(results)
                .find(
                  '.b-search-result__result-block[ data-page=' + page + ' ]'
                )
                .offset().top - 100,
              500
            );
          }
        }

        var ajaxMethod = $('.b-search-result').data('ajax-method');

        $('.b-search-result').delegate(
          '.b-search-result__more',
          'click',
          function (e) {
            e.preventDefault();
            $(this).parent().addClass('i-preload');

            $.ajax({
              url: $(this).attr('href'),
              type: ajaxMethod,
              dataType: 'html',
              success: function (data) {
                $('.b-search-result__button.i-preload').remove();
                $('.b-search-result__results')
                  .append(data)
                  .find('a[ data-original ]')
                  .lazyload();
                $('.b-search-result__result-block:last').slideDown();
                var page = $('.b-search-result__result-block:last').data(
                  'page'
                );

                //set address parameter PAGEN
                var search = window.location.search;
                var searchObj = {};

                if (search) {
                  search = String(search).substring(1).split('&');

                  search.forEach(function (item) {
                    item = String(item).split('=');
                    searchObj[item[0]] = item[1];
                  });

                  searchObj.PAGEN_1 = page;
                  search = '?';

                  for (var key in searchObj) {
                    search += key + '=' + searchObj[key] + '&';
                  }

                  search = String(search).substring(0, search.length - 1);
                } else {
                  search = '?PAGEN_1=' + page;
                }

                history.replaceState({}, '', search);
              },
              error: function () {},
            });
          }
        );
      });

    function parseQuery(queryString) {
      var query = {};
      var pairs = (queryString[0] === '?'
        ? queryString.substr(1)
        : queryString
      ).split('&');
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }
      return query;
    }
  });
})(jQuery);
