!function(a){"use strict";a(function(){function b(){a("#bx-panel").length&&(a("div.title-search-result:not(.b-recipe-search__ul1 )").css({top:a("#bx-panel").height()+120+"px"}),c(),a("#bx-panel-expander, #bx-panel-hider").bind("click",function(){setTimeout(function(){c()},0)}))}function c(){var b="div#titleSearchHeaderResult.title-search-result:not(.b-recipe-search__ul1 ) { top: "+(parseInt(a("#bx-panel").height(),10)+120)+"px !important; } ",c=document.head||document.getElementsByTagName("head")[0];a(window.titleSearchStyleTag).empty(),window.titleSearchStyleTag.styleSheet?window.titleSearchStyleTag.styleSheet.cssText=b:window.titleSearchStyleTag.appendChild(document.createTextNode(b)),c.appendChild(window.titleSearchStyleTag)}window.titleSearchStyleTag=document.createElement("style"),window.titleSearchStyleTag.type="text/css",b(),a(".b-recipe-search div.title-search-result").appendTo("body"),a(".b-recipe-search__icon").click(function(b){window.matchMedia("(min-width: 992px)").matches?(b.preventDefault(),a(".b-recipe-search-field").slideToggle(300),a(".b-recipe-search-field__input input").focus()):window.location=a(this).attr("href")}),a(".b-recipe-search-field__input input").keyup(function(){""!==a(this).val()?a(".b-recipe-search-field__clear").show():a(".b-recipe-search-field__clear").hide()}),a(".b-recipe-search-field__clear").click(function(b){b.preventDefault(),a(".b-recipe-search-field__input input").val("").focus(),a(".b-recipe-search-field__clear").hide()}),window.matchMedia("(min-width: 992px)").matches&&a("body #titleSearchHeaderResult .title-search-result__wrapper").niceScroll(),setTimeout(function(){a("#title-search-input").focus()},1e3)})}(jQuery);