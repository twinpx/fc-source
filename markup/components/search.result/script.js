!function(a){"use strict";a(function(){function b(a){for(var b={},c=("?"===a[0]?a.substr(1):a).split("&"),d=0;d<c.length;d++){var e=c[d].split("=");b[decodeURIComponent(e[0])]=decodeURIComponent(e[1]||"")}return b}var c;window.location.search&&(c=b(window.location.search).PAGEN_1,a(".b-search-result__result-block[ data-page="+c+" ]").length&&a.scrollTo(a(".b-search-result__result-block[ data-page="+c+" ]").offset().top-100,500));var d=a(".b-search-result").data("ajax-method");a(".b-search-result").delegate(".b-search-result__more","click",function(b){b.preventDefault(),a(this).parent().addClass("i-preload"),a.ajax({url:a(this).attr("href"),type:d,dataType:"html",success:function(b){a(".b-search-result__button.i-preload").remove(),a(".b-search-result__results").append(b).find("a[ data-original ]").lazyload(),a(".b-search-result__result-block:last").slideDown();var c=a(".b-search-result__result-block:last").data("page"),d=window.location.search,e={};if(d){d=String(d).substring(1).split("&"),d.forEach(function(a){a=String(a).split("="),e[a[0]]=a[1]}),e.PAGEN_1=c,d="?";for(var f in e)d+=f+"="+e[f]+"&";d=String(d).substring(0,d.length-1)}else d="?PAGEN_1="+c;history.replaceState({},"",d)},error:function(){}})})})}(jQuery);