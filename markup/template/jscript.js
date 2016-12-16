function tmpl(a){var b="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%-([\s\S]+?)%>/g,function(a,b){return"',esc("+b.replace(/\\'/g,"'")+"),'"}).replace(/<%=([\s\S]+?)%>/g,function(a,b){return"',"+b.replace(/\\'/g,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(a,b){return"');"+b.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+";__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",c=new Function("obj",b);return function(a){return c.call(this,a)}}function showHideLayer(a){var b=document.getElementById(a);if("none"==b.style.display)if(b.style.display="block","top_layer"==a){b.style.height=getyScroll()+"px";for(var c=0;c<b.childNodes.length;c++)"IFRAME"==b.childNodes[c].tagName&&(b.childNodes[c].style.height=getyScroll()+"px",b.childNodes[c].style.width="100%")}else{var d=$(b).height();if(""!=$(b).find("div.padding").height()&&(d=$(b).find("div.padding").height()),document.documentElement.clientHeight>d)var e=document.documentElement.clientHeight/2+$(window).scrollTop()-d/2-20+"px";else var e=$(window).scrollTop()+20+"px";if("ingredients_list_layer"==a||"stage_ingredients_list_layer"==a)var e=$(window).scrollTop()+20+"px";$("#"+a).animate({top:e},500,function(){$("#top_layer").height($(document).height()+30),$("#top_layer iframe").height($(document).height()+30)})}else b.style.display="none"}function getyScroll(){var a=0;if(window.innerHeight&&window.scrollMaxY){a=window.innerHeight+window.scrollMaxY;var b=document.documentElement,c=b&&b.clientHeight||document.body.clientHeight||window.innerHeight||self.innerHeight;a-=window.innerHeight-c}else a=document.body.scrollHeight>document.body.offsetHeight?document.body.scrollHeight:document.body.offsetHeight;return a}function showList(a,b,c){for(var d=Math.ceil(a.length/3),e=$("<ul>").appendTo($("#search_list_layer div.relative div.padding div.column:eq(0)")),f=0;d>f;f++)if(a[f]){for(var g=$('<li rel="'+f+'">').appendTo($(e)),h=$('<a href="#">'+a[f]+"</a>").appendTo($(g)),i=0;i<b.length;i++)b[i]==f&&$(g).addClass("selected");$(h).click(function(){return $(this).parent().toggleClass("selected"),!1})}for(var j=$("<ul>").appendTo($("#search_list_layer div.relative div.padding div.column:eq(1)")),f=d;2*d>f;f++)if(a[f]){for(var g=$('<li rel="'+f+'">').appendTo($(j)),h=$('<a href="#">'+a[f]+"</a>").appendTo($(g)),i=0;i<b.length;i++)b[i]==f&&$(g).addClass("selected");$(h).click(function(){return $(this).parent().toggleClass("selected"),!1})}for(var k=$("<ul>").appendTo($("#search_list_layer div.relative div.padding div.column:eq(2)")),f=2*d;f<a.length;f++)if(a[f]){for(var g=$('<li rel="'+f+'">').appendTo($(k)),h=$('<a href="#">'+a[f]+"</a>").appendTo($(g)),i=0;i<b.length;i++)b[i]==f&&$(g).addClass("selected");$(h).click(function(){return $(this).parent().toggleClass("selected"),!1})}$("#search_list_layer div.relative div.padding h2").text(c)}function createGroupList(a){for(var b=$("#i_have_ingredients_group ul").empty(),c=new Array,d=0;d<ingredientArray[1].length;d++){var e=$('<li><a href="#" onClick="showIngredients('+d+", "+a+'); return false;">'+ingredientArray[1][d]+"</a><span>"+ingredientArray[1][d]+"</span></li>").appendTo($(b));c.push(e)}if($("#i_have_ingredients_group ul li:eq(0)").addClass("act"),showIngredients(0,a),0!=chosenSearchIngredient[0].length)for(var d=0;d<chosenSearchIngredient[0].length;d++)showSubList(c[chosenSearchIngredient[0][d]],!0,chosenSearchIngredient[0][d],chosenSearchIngredient[1][d])}function showIngredients(a,b){var c=a;$("#i_have_ingredients_list div.column ul").empty(),$("#i_have_ingredients_group ul li").removeClass("act"),$("#i_have_ingredients_group ul li:eq("+c+")").addClass("act"),$("#i_have_ingredients_list h2").text(ingredientArray[1][a]);var d=new Array;if($("#i_have_list").find("tr").each(function(){d.push($(this).attr("class"))}),18*ingredientArray[2][c][0].length+50>$("#i_have_ingredients_group").height())if(ingredientArray[2][c][0].length/2*18+50>=$("#i_have_ingredients_group").height()){for(var e=$("#i_have_ingredients_list div.column ul:eq(0)"),f=0;f<ingredientArray[2][c][0].length/2;f++){for(var g=ingredientArray[2][c][0][f],h=0;h<d.length;h++)d[h]==g&&(g+=" selected");$(e).append('<li class="'+g+'"><a href="#" onClick="selectIngredient(this, '+c+", "+f+", "+b+'); return false;">'+ingredientArray[2][c][1][f]+"</a></li>")}e=$("#i_have_ingredients_list div.column ul:eq(1)");for(var f=Math.ceil(ingredientArray[2][c][0].length/2);f<ingredientArray[2][c][0].length;f++){for(var g=ingredientArray[2][c][0][f],h=0;h<d.length;h++)d[h]==g&&(g+=" selected");$(e).append('<li class="'+g+'"><a href="#" onClick="selectIngredient(this, '+c+", "+f+", "+b+'); return false;">'+ingredientArray[2][c][1][f]+"</a></li>")}}else for(var e=$("#i_have_ingredients_list div.column ul:eq(0)"),f=0;f<ingredientArray[2][c][0].length;f++)if($("#i_have_ingredients_group").height()>$("#i_have_ingredients_list").height()){for(var g=ingredientArray[2][c][0][f],h=0;h<d.length;h++)d[h]==g&&(g+=" selected");$(e).append('<li class="'+g+'"><a href="#" onClick="selectIngredient(this, '+c+", "+f+", "+b+'); return false;">'+ingredientArray[2][c][1][f]+"</a></li>")}else{e=$("#i_have_ingredients_list div.column ul:eq(1)");for(var g=ingredientArray[2][c][0][f],h=0;h<d.length;h++)d[h]==g&&(g+=" selected");$(e).append('<li class="'+g+'"><a href="#" onClick="selectIngredient(this, '+c+", "+f+", "+b+'); return false;">'+ingredientArray[2][c][1][f]+"</a></li>")}else for(var e=$("#i_have_ingredients_list div.column ul:eq(0)"),f=0;f<ingredientArray[2][c][0].length;f++){for(var g=ingredientArray[2][c][0][f],h=0;h<d.length;h++)d[h]==g&&(g+=" selected");$(e).append('<li class="'+g+'"><a href="#" onClick="selectIngredient(this, '+c+", "+f+", "+b+'); return false;">'+ingredientArray[2][c][1][f]+"</a></li>")}increaseTopLayer()}function selectIngredient(a,b,c,d){if(10==d){var e=a;$("#dish_description input.smartsearch").attr({value:$(e).text()}).closest("div.form_field").find(":hidden").attr({value:$(e).parent().attr("class")}),hideStageIngredientsLayer()}else{var e=a;if($(a).parent().toggleClass("selected"),-1!=e.parentNode.className.search("selected"))var f=1;else var f=0;fillIHaveTable(f,b,c)}}function fillIHaveTable(a,b,c){if(1==a){var d=$('<tr class="'+ingredientArray[2][b][0][c]+'"><td><span>'+ingredientArray[2][b][1][c]+'</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');$(d).find("a.delete").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).click(function(){var a=this.parentNode.parentNode.className;return $("#i_have_ingredients_list").find("li."+a).removeClass("selected"),$(this).parent().parent().remove(),0==$("#i_have_list div.bg table tr").length&&$("#i_have_dash").css({display:"block"}),!1}),$("#i_have_list div.bg table").append(d),$("#i_have_dash").css({display:"none"})}else $("#i_have_list div.bg table").find("tr."+ingredientArray[2][b][0][c]).remove(),0==$("#i_have_list div.bg table tr").length&&$("#i_have_dash").css({display:"block"})}function addIngredients(){for(var a=chosenSearchIngredient[0].length,b=0;a>b;b++)chosenSearchIngredient[0].pop();for(var c=chosenSearchIngredient[1].length,b=0;c>b;b++)chosenSearchIngredient[1].pop();for(var d=document.getElementById("ingredients_group"),b=0;b<d.childNodes.length;b++)if("UL"==d.childNodes[b].tagName)for(var e=d.childNodes[b],f=new Array,g=0;g<e.childNodes.length;g++)"LI"==e.childNodes[g].tagName&&f.push(e.childNodes[g]);for(var b=0;b<f.length;b++)for(var g=0;g<f[b].childNodes.length;g++)if("items"==f[b].childNodes[g].className)for(var h=f[b].childNodes[g],i=0;i<h.childNodes.length;i++)if("UL"==h.childNodes[i].tagName)for(var j=0;j<h.childNodes[i].childNodes.length;j++)"LI"==h.childNodes[i].childNodes[j].tagName&&"separator"!=h.childNodes[i].childNodes[j].className&&(chosenSearchIngredient[0].push(b),chosenSearchIngredient[1].push(h.childNodes[i].childNodes[j].className));fillSearchField(),hideIngredientsLayer()}function fillSearchField(){for(var a=new String,b=(new Array,new Array,new Array,0);b<chosenSearchKitchen.length;b++)""==a?a=kitchenArray[1][chosenSearchKitchen[b]]:(a+=", ",a+=kitchenArray[1][chosenSearchKitchen[b]].toLowerCase());for(var b=0;b<chosenSearchDish.length;b++)""==a?a=dishArray[1][chosenSearchDish[b]]:(a+=", ",a+=dishArray[1][chosenSearchDish[b]].toLowerCase());for(var b=0;b<chosenSearchIngredient[0].length;b++)""==a?a=ingredientArray[2][chosenSearchIngredient[0][b]][1][chosenSearchIngredient[1][b]]:(a+=", ",a+=ingredientArray[2][chosenSearchIngredient[0][b]][1][chosenSearchIngredient[1][b]].toLowerCase());$("#recipe_search_field").attr({value:""}).attr({value:a})}function smartsearchNavUp(a){var b=$(a).siblings("div.search_list").children("ul").children("li.hover");if(""==$(b).text()){smartsearchInputValue=$(a).attr("value");var c=$(a).siblings("div.search_list").children("ul").children("li:last");$(c).addClass("hover"),$(a).attr({value:$(c).text()})}else{$(b).removeClass("hover");var c=$(b).prev("li");""!=$(c).text()?($(c).addClass("hover"),$(a).attr({value:$(c).text()})):$(a).attr({value:smartsearchInputValue})}}function smartsearchNavDown(a){var b=$(a).siblings("div.search_list").children("ul").children("li.hover");if(""==$(b).text()){smartsearchInputValue=$(a).attr("value");var c=$(a).siblings("div.search_list").children("ul").children("li:first");$(c).addClass("hover"),$(a).attr({value:$(c).text()})}else{$(b).removeClass("hover");var c=$(b).next("li");""!=$(c).text()?($(c).addClass("hover"),$(a).attr({value:$(c).text()})):$(a).attr({value:smartsearchInputValue})}}function smartsearchFunction(a){if($(a).siblings("div.search_list").children("ul").empty(),""!=$(a).attr("value")){for(var b=new String($(a).attr("value")).toLowerCase().split(" "),c=new Array,d=0;d<smartsearchArray.length;d++)c.push(String(smartsearchArray[d]).toLowerCase());for(var e=new Array,d=0;d<c.length;d++){for(var f=100,g=0;g<b.length;g++)f=Math.min(f,c[d].indexOf(b[g]));-1!=f&&(e[f]||(e[f]=new Array),e[f].push(smartsearchArray[d]))}for(var h=new Array,d=0;d<e.length;d++)if(e[d]){e[d].sort();for(var i=0;i<e[d].length;i++)h.push(e[d][i])}$(a).siblings("div.search_list").children("ul").css(0!=h.length?{display:"block"}:{display:"none"});for(var d=0;d<h.length;d++)7>d&&$(a).siblings("div.search_list").children("ul").append("<li>"+h[d]+"</li>");$(a).siblings("div.search_list").children("ul").children("li").hover(function(){$(this).addClass("hover"),$(a).siblings("input.click_field").attr({value:$(this).text()})},function(){$(this).removeClass("hover")}).click(function(){if("item"==this.parentNode.parentNode.parentNode.className)$(this).parent().css({display:"none"}).empty(),$(a).attr({value:$(a).siblings("input.click_field").attr("value")}).focus(),showUnitField(a);else if("dish_parents"==this.parentNode.parentNode.parentNode.parentNode.className){$(this).parent().css({display:"none"}).empty(),$(a).attr({value:$(this).text()}).focus();for(var b,c=0;c<smartsearchArray.length;c++)$(this).text()==smartsearchArray[c]&&(b=smartsearchIdArray[c]);$(a).siblings("input[name*='id']").attr({value:b})}else{$(a).attr({value:""}).focus(),$(this).parent().css({display:"none"}).empty();for(var b,c=0;c<smartsearchArray.length;c++)$(this).text()==smartsearchArray[c]&&(b=smartsearchIdArray[c]);if(!$("#i_have_list div.bg table").find("tr."+b).html()){var d=$('<tr class="'+b+'"><td><span>'+$(this).text()+'</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');$(d).find("a.delete").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).click(function(){var a=this.parentNode.parentNode.className;return $("#i_have_ingredients_list").find("li."+a).removeClass("selected"),$(this).parent().parent().remove(),0==$("#i_have_list div.bg table tr").length&&$("#i_have_dash").css({display:"block"}),!1}),$("#i_have_list div.bg table").append(d),$("#i_have_ingredients_list").find("li."+b).addClass("selected"),$("#i_have_dash").css({display:"none"})}}})}else $(a).siblings("div.search_list").children("ul").css({display:"none"})}function pressEnter(){var a=$("#helper_smartsearch").parent().find("li.hover");if($(a).text()){$("#helper_smartsearch").attr({value:""}).focus(),$(this).parent().css({display:"none"}).empty();for(var b,c=0;c<smartsearchArray.length;c++)$(a).text()==smartsearchArray[c]&&(b=smartsearchIdArray[c]);if(!$("#i_have_list div.bg table").find("tr."+b).html()){var d=$('<tr class="'+b+'"><td><span>'+$(a).text()+'</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');$(d).find("a.delete").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).click(function(){var a=this.parentNode.parentNode.className;return $("#i_have_ingredients_list").find("li."+a).removeClass("selected"),$(this).parent().parent().remove(),0==$("#i_have_list div.bg table tr").length&&$("#i_have_dash").css({display:"block"}),!1}),$("#i_have_list div.bg table").append(d),$("#i_have_ingredients_list").find("li."+b).addClass("selected"),$("#i_have_dash").css({display:"none"})}}else for(var e=0;e<smartsearchArray.length;e++)if($("#helper_smartsearch").attr("value").toLowerCase()==smartsearchArray[e].toLowerCase()){var f=smartsearchArray[e],g=smartsearchIdArray[e];if(!$("#i_have_list div.bg table").find("tr."+g).html()){var d=$('<tr class="'+g+'"><td><span>'+f+'</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></a></td></tr>');$(d).find("a.delete").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).click(function(){var a=this.parentNode.parentNode.className;$("#i_have_ingredients_list").find("li."+a).removeClass("selected"),$(this).parent().parent().remove(),0==$("#i_have_list div.bg table tr").length&&$("#i_have_dash").css({display:"block"})}),$("#i_have_list div.bg table").append(d),$("#i_have_ingredients_list").find("li."+g).addClass("selected"),$("#i_have_dash").css({display:"none"})}$("#helper_smartsearch").attr({value:""}).focus(),$(this).parent().css({display:"none"}).empty()}}!function(a){"use strict";a(function(){function b(b){function c(){return document.getElementById(b)?(f.$elem=a("#"+b),void d()):!1}function d(){function b(){function b(){function b(){function b(a){f.factsArray=a.facts,e()}a.getJSON("/php/get_more_facts.php",b)}function c(){window.ga&&ga("send","event","������ �� �� ���","������ ������ ���",f.$elem.find(".b-facts__item").text())}return f.factsArray?(e(),c(),!1):(b(),!1)}f.$elem.find(".b-facts__more__link").click(b)}b()}function e(){function a(){f.$elem.find(".b-facts__item").fadeOut(500,function(){f.$elem.find(".b-facts__item").attr({"data-id":c.id}).html(c.text).fadeIn(500)})}function b(){function a(){f.factsArray.push(f.factsArray.shift())}for(var b={id:f.$elem.find(".b-facts__item").attr("data-id"),text:f.$elem.find(".b-facts__item").text()};f.factsArray[0].id==b.id;)a();var c=f.factsArray[0];return a(),c}if(!f.factsArray)return f.$elem.find(".b-facts__more__link").click(),!1;var c=b();a()}var f=this;c()}function c(){function b(){if(window.ga){var b=a(this);b.hasClass("i-remove-favorite")?(_gaq.push(["_trackEvent","Избранное","Удалили из избранного"]),ga("send","event","Избранное","Удалили из избранного")):(_gaq.push(["_trackEvent","Избранное","Добавили в избранное"]),ga("send","event","Избранное","Добавили в избранное"))}}a(".b-favorite-button").hover(function(){a(this).addClass("i-hover").stop().animate({width:"79px"},function(){a(this).find(".b-favorite-button__text").css({display:"inline-block"})})},function(){a(this).find(".b-favorite-button__text").hide(),a(this).stop().animate({width:"35px"},function(){a(this).removeClass("i-hover")})}).click(b)}function d(){function b(){c()}function c(){function b(){function b(){for(var a=e.parent()[0].className.split(/\s*item\s*/),b=0;b<a.length;b++)if(""!=a[b]){a=a[b];break}return a}function c(a){switch(a){case"cuisine":return cuisineArray;case"dish":return dishTypeArray;case"ingredient":return mainIngredientArray;case"tag":return tagArray}return cuisineArray}function d(){if(e.hasClass("open"))return a("#filter_list").slideUp("middle").empty(),e.removeClass("open"),void(document.getElementById("filter_list").className="");var b="",c=Math.ceil(h[1].length/f);b+='<div class="pad"><table>';for(var d=0;c>d;d++){b+="<tr>";for(var i=0;f>i;i++){var j=c*i+d;b+=h[0][j]?'<td><a href="#" rel="'+h[0][j]+'">'+h[1][j]+"</a></td>":"<td><span></span></td>"}b+="</tr>"}b+="</table></div>",a("#filter_list").html(b).slideDown("middle"),a("#filter_recipes .item a").removeClass("open"),e.addClass("open"),document.getElementById("filter_list").className=g}var e=a(this),f=4,g=b(),h=c(g);return d(),!1}a("#filter_recipes").delegate(".item a","click",b)}b()}function e(b){function c(){e.$elem=b,e.$lists=e.$elem.find(".b-filter__lists"),e.$list=e.$elem.find(".b-filter__list"),d()}function d(){function c(){function b(){var a="",b=Math.ceil(f.length/d);a+='<div class="pad"><table>';for(var g=0;b>g;g++){a+="<tr>";for(var h=0;d>h;h++){var i=b*h+g;a+=f[i]?'<td><a href="#" rel="'+f[i].id+'">'+f[i].name+"</a></td>":"<td><span></span></td>"}a+="</tr>"}a+="</table></div>",e.$list.html(a).slideDown("middle"),e.$elem.find(".b-filter__item__button").removeClass("open"),c.addClass("open")}var c=a(this),d=parseInt(e.$elem.attr("data-col"),10),f=window[c.closest(".b-filter__item").attr("data-array")];return c.hasClass("open")?(e.$list.slideUp("middle").empty(),c.removeClass("open")):b(),!1}b.delegate(".b-filter__item__button","click",c)}var e=this;c()}function f(){function b(){return document.getElementById("filter_list")?(c(),void d()):!1}function c(){function b(){function a(){for(var a,b=window.location.search,c=/([a-z0-9]+)=([a-z0-9]+)/gi,d={};null!=(a=c.exec(b));)d[a[1]]=a[2];return d}var b=a(),c={};for(var d in b)("cuisine"==d||"dish"==d||"ingredient"==d||"tag"==d)&&(c.type=d,c.data=b[d]);return c.num=b.num,c}function c(b){var c={};for(var d in b)c[d]=b[d];c.num||(c.num=a("#recipe_feed_block .b-recipe-thumb").length),c.allRecipesNum=parseInt(a("#fc_statistics span.num").text(),10),c.recipes=t();var e=window.History;e.enabled&&e.pushState(c)}function d(a){a.type&&a.data?f(a.type,a.data,a.num,!0):a.num&&g(a.num,!0)}var e=b();c(e),d(e)}function d(){a("#filter_list").click(function(a){a.stopPropagation()}).delegate("a","click",e),l(),a("#get_more_recipes a").click(j)}function e(){if(a("#filter_recipes").hasClass("i-link"))return!0;var b=document.getElementById("filter_list").className,c=this.getAttribute("rel");return f(b,c),a("#filter_list").hide().empty(),!1}function f(b,c,d,e){function f(){h()}function g(a){i=a.id;var d=parseInt(i.length,10)+parseInt(a.recipes.length,10);v.makeRequest=!1,k({type:b,data:c,num:a.recipes.length,recipes:a.recipes,allRecipesNum:d},e),setTimeout(function(){m(window.History.getState())},0)}var j=v.recipesPerPage,l=a("#filter_recipes").data("all-url")||"/php/all_recipes_result.php";d&&(j=d),a.ajax({url:l,dataType:"json",data:"num="+j+"&type="+b+"&data="+c,beforeSend:f,success:g,error:function(a,b,c){window.console&&(console.log(a),console.log(b),console.log(c))}})}function g(b,c){function d(){h()}function e(a){var b=parseInt(a.id.length,10)+parseInt(a.recipes.length,10);v.makeRequest=!1,k({num:a.recipes.length,recipes:a.recipes,allRecipesNum:b},c),setTimeout(function(){m(window.History.getState())},0)}var f=v.recipesPerPage,g=a("#filter_recipes").data("last-url")||"/php/last_recipes_result.php";b&&(f=b),a.ajax({url:g,dataType:"json",data:"num="+f,beforeSend:d,success:e})}function h(){a("#recipe_feed_block").empty().html('<div class="preloader"><img src="/images/preloader.gif" width="281" height="52" alt="" /></div>')}function j(){function b(b){var c=window.History;if(c.enabled){v.makeRequest=!1;var d=c.getState();d.data.num=a("#recipe_feed_block .b-recipe-thumb").length,d.data.recipes&&b.recipes&&(d.data.recipes=d.data.recipes.concat(b.recipes)),k(d.data,!1)}}for(var c=[],d=a("#get_more_recipes").data("more-url")||"/php/get_more_recipes.php",e=0;e<v.recipesPerPage;e++)i[0]&&(c[e]=i.shift());return a.ajax({url:d,dataType:"json",data:"id="+c,beforeSend:function(){a("#get_more_recipes").addClass("preload")},success:function(c){a("#get_more_recipes").removeClass("preload");for(var d,e=a('<div class="block" style="display:none;"></div>'),f="",g=0;g<Math.ceil(c.recipes.length/3);g++){f+='<div class="row">';for(var h=0;3>h&&(d=3*g+h,!(d>=c.recipes.length));h++)f+='<div class="col-sm-4"><div class="b-recipe-thumb"><a href="'+c.recipes[d].href+'" style="background-image: url('+c.recipes[d].src+');" class="b-recipe-thumb__photo"><img src="data:image/gif;base64,R0lGODlhBgAEAIAAAP///wAAACH5BAEAAAAALAAAAAAGAAQAAAIEhI+pVwA7"></a><hr class="i-size-S"><a href="'+c.recipes[d].href+'" class="col-sm-10 center-block"><b>'+c.recipes[d].name+'</b></a><hr class="i-size-S"><div class="b-recipe-thumb__author author">От: '+c.recipes[d].author+'</div><div class="b-recipe-thumb__info"><span class="comments_icon" title="Оставить отзыв"><noindex><a href="'+c.recipes[d].href+'#comments">'+c.recipes[d].comments+"</a></noindex></span></div></div></div>",2!==h&&d<c.recipes.length-1&&(f+='<hr class="visible-xs-block">');f+='</div><hr class="i-size-L hidden-xs"><hr class="visible-xs-block">'}e.html(f),a("#recipe_feed_block").append(e).find(".block:last .photo a").each(function(){var b=a(this),c=b.children("img"),d=new Image;d.src=c.attr("src");var e=Math.floor(d.height*c.attr("width")/d.width);e>0?c.css({marginTop:parseInt(b.css("height"))/2-e/2+"px"}):c.load(function(){var a=Math.floor(d.height*c.attr("width")/d.width);a>0&&c.css({marginTop:parseInt(b.css("height"))/2-a/2+"px"})})}).end().find("div.block:last").css({opacity:0}).show().animate({opacity:1},500),a.scrollTo(a("#recipe_feed_block .block:last .col-sm-4:first"),1e3),b(c),n()}}),!1}function k(a,b){function c(){var b=[];return a.type&&a.data&&b.push(a.type+"="+a.data),b.push("num="+a.num),b=b.join("&"),""!=b&&(b="?"+b),b}var d=window.History;if(d.enabled){var e=c();return b?void d.replaceState(a,"Рецепты",e):void d.pushState(a,"Рецепты",e)}}function l(){var a=window.History;a.enabled&&a.Adapter.bind(window,"statechange",function(){if(v.makeRequest){var b=a.getState();b.data.recipes?m(b):f(null,null)}v.makeRequest=!0})}function m(b){if(b.data.type&&b.data.data){var c=p(b.data.type),d=q(c,b.data.data);s(a("."+b.data.type+" a"),d)}else s(a(),"");r(b.data.recipes),u(b.data.allRecipesNum),o(),n()}function n(){var b=window.History;if(b.enabled)var c=b.getState(),d=c.data.allRecipesNum-c.data.recipes.length;else var d=i.length;0==d?a("#get_more_recipes").hide():a("#get_more_recipes").show()}function o(){a("#topbar div.item").each(function(){"Рецепты"==a(this).text()&&a(this).html(window.search&&""!=window.search?'<a href="'+window.pathname+'"><span>Рецепты</span></a>':"<span><span>Рецепты</span></span>")})}function p(a){switch(a){case"cuisine":return cuisineArray;case"dish":return dishTypeArray;case"ingredient":return mainIngredientArray;case"tag":return tagArray}}function q(a,b){for(var c=0;c<a[0].length;c++)if(a[0][c]==b)return a[1][c]}function r(b){for(var c,d="",e=0;e<Math.ceil(b.length/3);e++){d+='<div class="row">';for(var f=0;3>f&&(c=3*e+f,!(c>=b.length));f++)d+='<div class="col-sm-4"><div class="b-recipe-thumb"><a href="'+b[c].href+'" style="background-image: url('+b[c].src+');" class="b-recipe-thumb__photo"><img src="data:image/gif;base64,R0lGODlhBgAEAIAAAP///wAAACH5BAEAAAAALAAAAAAGAAQAAAIEhI+pVwA7"></a><hr class="i-size-S"><a href="'+b[c].href+'" class="col-sm-10 center-block"><b>'+b[c].name+'</b></a><hr class="i-size-S"><div class="b-recipe-thumb__author author">От: '+b[c].author+'</div><div class="b-recipe-thumb__info"><span class="comments_icon" title="Оставить отзыв"><noindex><a href="'+b[c].href+'#comments">'+b[c].comments+"</a></noindex></span></div></div></div>",2!==f&&c<b.length-1&&(d+='<hr class="visible-xs-block">');d+='</div><hr class="i-size-L hidden-xs"><hr class="visible-xs-block">'}a("#recipe_feed_block").html(d)}function s(b,c){a("#filter_recipes a.active").removeClass("active").find("span.bg span").text("Выберите"),b.removeClass("open").addClass("active").find("span.bg span").text(c)}function t(){var b=[];return a("#recipe_feed_block .b-recipe-thumb").each(function(){var c=a(this);b.push({name:c.find("b").text(),href:c.find("a:first").attr("href"),src:/url\(['"]?([^'"]*)['"]?\)/.exec(c.find("a:first").css("backgroundImage"))[1],author:c.find(".author").text().substring(4),comments:c.find(".comments_icon a").text()})}),b}function u(b){function c(a){return/(10|11|12|13|14|15|16|17|18|19)$/.test(a)?"рецептов":/.*1$/.test(a)?"рецепт":/[2-4]$/.test(a)?"рецепта":"рецептов"}a("#fc_statistics").find("span.num").text(b).end().find("span.word").text(c(b))}var v=this;v.recipesPerPage=27,v.makeRequest=!0,b()}function g(){function b(){c(),d()}function c(){f.$statistics=a("#fc_statistics"),f.$getMoreButton=a("#get_more_recipes"),f.recipesPerPage=27}function d(){f.$getMoreButton.click(e)}function e(){for(var b=[],c=a("#filter_recipes").data("all-url")||"/php/all_recipes_result.php",d=0;d<f.recipesPerPage;d++)i[0]&&(b[d]=i.shift());return a.ajax({url:c,dataType:"json",data:"id="+b,beforeSend:function(){a("#get_more_recipes").addClass("preload")},success:function(b){function c(){var b=i.length;0==b?a("#get_more_recipes").hide():a("#get_more_recipes").show()}a("#get_more_recipes").removeClass("preload");for(var d,e=a('<div class="block" style="display:none;"></div>'),f="",g=0;g<Math.ceil(b.recipes.length/3);g++){f+='<div class="row">';for(var h=0;3>h&&(d=3*g+h,!(d>=b.recipes.length));h++)f+='<div class="col-sm-4"><div class="b-recipe-thumb"><a href="'+b.recipes[d].href+'" style="background-image: url('+b.recipes[d].src+');" class="b-recipe-thumb__photo"><img src="data:image/gif;base64,R0lGODlhBgAEAIAAAP///wAAACH5BAEAAAAALAAAAAAGAAQAAAIEhI+pVwA7"></a><hr class="i-size-S"><a href="'+b.recipes[d].href+'" class="col-sm-10 center-block"><b>'+b.recipes[d].name+'</b></a><hr class="i-size-S"><div class="b-recipe-thumb__author author">От: '+b.recipes[d].author+'</div><div class="b-recipe-thumb__info"><span class="comments_icon" title="Оставить отзыв"><noindex><a href="'+b.recipes[d].href+'#comments">'+b.recipes[d].comments+"</a></noindex></span></div></div></div>",2!==h&&d<b.recipes.length-1&&(f+='<hr class="visible-xs-block">');f+='</div><hr class="i-size-L hidden-xs"><hr class="visible-xs-block">'}e.html(f),a("#recipe_feed_block").append(e).find("div.block:last").css({opacity:0}).show().animate({opacity:1},500),a.scrollTo(a("#recipe_feed_block div.block:last div.b-recipe-thumb:first"),1e3),c()}}),!1}var f=this;b()}function h(a,b){function c(){d(),i.$name=i.$elem.find("div.new_file_name"),i.$input.change(function(){e()})}function d(){i.$elem.html('<div class="browse_button" title="Выбрать файл"></div><div class="blocker"></div><div class="new_file_name"></div>'),i.$elem.find(".browse_button").after(i.$input)}function e(){var a=h(),b=g(a);f(b)?(i.$name.text(a),i.$name.removeClass("i-attention")):(i.$name.text(j.messages.wrongExtention),i.$name.addClass("i-attention")),i.$name.css({display:"block"})}function f(a){for(var b=!1,c=0;c<j.extentions.length;c++)a.toLowerCase()==j.extentions[c]&&(b=!0);return b}function g(a){var b=/.*\.(.*)/,c=a.replace(b,"$1");return c}function h(){var a=i.$input.val(),b=/.*\\(.*)/,c=a.replace(b,"$1"),d=/.*\/(.*)/;return c=c.replace(d,"$1"),c.length>18&&(c="..."+c.substr(c.length-16,16)),c}var i=this;i.$elem=a,i.$input=i.$elem.find(":file");var j={},b=b||{};j.extentions=b.extentions||["jpg","jpeg"],j.messages=b.maessages||{wrongExtention:"Загружайте изображения в jpeg формате"},c()}a(".b-header .b-mobile-menu-icon").click(function(b){b.stopPropagation(),a(this).closest(".b-header").find(".b-header__nav").slideToggle(500)}),a(".b-header__nav").click(function(a){a.stopPropagation()}),a(document).bind("click",function(){window.matchMedia("(max-width: 767px)").matches&&(a(".b-header__nav").slideUp(500),a(".b-content-nav .container").slideUp(500))}),a(".recipe_list_item .photo a, .b-recipe-preview__photo__link").each(function(){var b,c=a(this),d=c.children("img"),e=new Image;e.src=d.attr("src");var f=Math.floor(e.height*d.attr("width")/e.width);f>0?(b=parseInt(c.css("height"))/2-f/2,d.css({marginTop:b+"px"})):d.load(function(){var a=Math.floor(e.height*d.attr("width")/e.width);a>0&&(b=parseInt(c.css("height"))/2-a/2,d.css({marginTop:b+"px"}))})}),function(){function b(){var b=a(this).find(".b-admin-buttons__block").addClass("i-hover");b.stop().show().animate({opacity:1},100)}function c(){var b=a(this).find(".b-admin-buttons__block").removeClass("i-hover");setTimeout(function(){b.hasClass("i-hover")||b.stop().animate({opacity:0},100,function(){b.hide()})},100)}function d(){return confirm(a(this).attr("title")+"?")?!0:!1}a(document).delegate(".b-admin-buttons","mouseenter",b).delegate(".b-admin-buttons","mouseleave",c).delegate(".b-delete-icon","click",d)}(),a(".b-aside-banner.i-float").each(function(){function b(){n=d()+10||void 0,o=e(),q=m.offset().top,r=m.offset().left,s=m.height(),t=a("<div></div>"),t.width(m.outerWidth()).height(m.outerHeight()),v=a("aside.col-md-4"),a(window).bind("scroll",f).bind("resize",g).scroll()}function c(){var a,c=document.getElementById("aviasales-app");c?a=setInterval(function(){return document.getElementById("ng-app")?(clearInterval(a),void b()):void 0},500):b()}function d(){return a("#header").height()}function e(){function b(a,b){return a.topBorder<b.topBorder?-1:a.topBorder>b.topBorder?1:0}var c=[];return a(".b-store-block:not(.b-store-block__type_aside), #bottom, .collection_block, #ng-app:not(#banner_space #ng-app)").each(function(){c.push({elem:this,topBorder:a(this).offset().top})}),c.sort(b),a(c[0].elem)}function f(){u=h(),p=o.offset().top-10,!m.hasClass("i-top-fixed")&&u>=q-n&&u<p-m.outerHeight()-n?k():!m.hasClass("i-bottom-fixed")&&u>=p-m.outerHeight()-n?i():(m.hasClass("i-top-fixed")||m.hasClass("i-bottom-fixed"))&&q-n>u&&(l(),j())}function g(){r=m.parent().offset().left,m.css({left:r+"px"})}function h(){return a(window).scrollTop()}function i(){m.removeClass("i-top-fixed").addClass("i-bottom-fixed").css({top:p-v.offset().top-m.outerHeight()+"px",left:r-v.offset().left+"px"})}function j(){m.removeClass("i-bottom-fixed")}function k(){m.removeClass("i-bottom-fixed").addClass("i-top-fixed").css({top:n+"px",left:r+"px"}).after(t)}function l(){m.removeClass("i-top-fixed"),t.remove()}var m=a(this);setTimeout(c,1e3);var n,o,p,q,r,s,t,t,u,v}),a("#bx-panel-hider").bind("click",function(){var b=a(".b-header");b.data("topBorder",b.offset().top)}),a(".b-content-nav .b-mobile-menu-icon").click(function(b){b.stopPropagation(),a(this).closest(".b-content-nav").find(".container").slideToggle(500)}),a(".b-content-nav").click(function(a){a.stopPropagation()}),new b("do-you-know-that"),c(),window.BX&&BX.addCustomEvent("onFrameDataReceived",function(){c()}),a(".b-figure__img img").each(function(){var b=a(this),c=b.attr("title");b.closest("figure").find("figcaption").text(c)}),a(document).bind("click",function(){a("#filter_list:visible").slideUp("fast",function(){a("#filter_recipes .open").removeClass("open")})});var i=window.allRecipesResult||[];a(function(){new d,a(".b-filter").each(function(){new e(a(this))}),new f,new g}),function(){function b(){var b=window.pageYOffset||document.documentElement.scrollTop;b>c.data("topBorder")&&!c.hasClass("i-fixed")?(c.addClass("i-fixed"),c.after('<div id="b-header-fixed" style="height:'+c.height()+'px;"></div>')):b<=c.data("topBorder")&&c.hasClass("i-fixed")&&(a("#b-header-fixed").remove(),c.removeClass("i-fixed"))}var c=c=a(".b-header");c.length&&(a("body").hasClass("i-mobile-search")?(c.addClass("i-fixed"),c.after('<div id="b-header-fixed" style="height:'+c.height()+'px;"></div>')):(c.data("topBorder",c.offset().top),a(window).bind("scroll",b).scroll()))}(),window.jQuery&&window.jQuery.fn.fotorama&&a(".fotorama").fotorama(),a(".input_file").each(function(){new h(a(this))
}),a(".i-float .form-control").focus(function(){a(this).parent(".i-float").addClass("i-focus")}).blur(function(){var b=a(this);""===b.val()&&b.parent(".i-float").removeClass("i-focus")}).each(function(){""!==a(this).val()&&a(this).parent(".i-float").addClass("i-focus")}),a(".i-float .b-label").click(function(){var b=a(this).parent(".i-float");b.hasClass("i-focus")||b.find(".form-control").focus()}),a.placeholder&&a("#helper_smartsearch").placeholder(),a("#search_helper_link").click(function(){return showHideLayer("top_layer"),a("#search_helper div.body div.menu div.item").removeClass("act"),a("#search_helper div.body div.menu div.item:eq(0)").addClass("act"),a("#search_helper div.body div.search_blocks").css({display:"none"}),a("#h_helper").css({display:"block"}),a("#i_have_list div.bg table").empty(),a("#i_have_dash").css({display:"block"}),a("#search_helper").css({top:"0"}).removeClass("stage_helper").slideDown("middle"),!1}),a("#search_helper div.body div.slide_up_button").click(function(){a("#search_helper").slideUp("middle",function(){showHideLayer("top_layer")})}),a("#search_helper div.body div.menu div.item a").click(function(){return a("#search_helper div.body div.search_blocks").css({display:"none"}),a("#"+a(this).attr("rel")).css({display:"block"}),a(this).parent().parent().children("div.item").removeClass("act"),a(this).parent().addClass("act"),"h_ingredients"==a(this).attr("rel")&&(a("#i_have_ingredients_list div.column ul").empty(),a("#i_have_ingredients_list h2").empty(),createGroupList()),!1}),a("#i_have_button").click(function(){var b="/search/";a(this).parent().find("tr").each(function(){b+=a(this).find("span").text().toLowerCase()+"/"}),window.location.href=b}),a("#helper_smartsearch").focus(function(){""==this.value&&(this.value="")}),a("#helper_smartsearch").blur(function(){""==this.value&&(this.value="")});var j=0;a("#helper_smartsearch").keyup(function(a){switch(window.event&&(a=window.event),a.keyCode?a.keyCode:a.which?a.which:null){case 38:0==j&&smartsearchNavUp(this);break;case 40:0==j&&smartsearchNavDown(this);break;default:smartsearchFunction(this)}}),a("#helper_smartsearch").keypress(function(a){switch(window.event&&(a=window.event),a.keyCode?a.keyCode:a.which?a.which:null){case 38:j=1,smartsearchNavUp(this);break;case 40:j=1,smartsearchNavDown(this);break;case 13:j=0,pressEnter()}}),a(function(){function b(){a(".b-social-buttons__i__icon").unbind("click").bind("click",function(){var b=a(this),c=b.parent(),d=b.data("url"),e="get";return c.addClass("i-preload"),a.ajax({url:d,type:e,dataType:"json",success:function(b){try{a(".b-social-buttons__i__icon").each(function(){var c=a(this);c.data("url")===d&&c.parent().find(".b-social-buttons__i__num").text(b.num)})}catch(e){}c.removeClass("i-preload")},error:function(a){window.console&&console.log(a)}}),!1})}b()}),"Y"===Cookies.get("SUBSCRIBED")&&a(".b-subscribe").height("58px").html('<div class="text-success">Спасибо за подписку!</div>'),a(".b-subscribe form").submit(function(b){b.preventDefault();var c=a(this),d=c.find("[type=email]").val(),e=/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;d.match(e)&&(c.addClass("i-preload"),a.ajax({url:c.data("url"),type:c.attr("method"),dataType:"json",data:c.serialize(),success:function(a){c.removeClass("i-preload").find("p.text-warning").remove();try{"success"===a.response?(c.parent().height(c.parent().height()),c.before('<div class="text-success">'+a.text+"</div>"),c.remove(),Cookies.set("SUBSCRIBED","Y",{expires:7,path:window.location.hostname})):c.prepend('<p class="text-warning">'+a.text+"</p>")}catch(b){throw b}}}))}),a(document).bind("click",function(){a("#top_panel .kitchen .submenu").slideUp("middle").siblings("a").children("span").addClass("up").removeClass("down"),a("#top_panel .add .body").slideUp("middle")}),a("#top_panel span.kitchen > a").click(function(b){a(this).siblings(".submenu").slideToggle("middle").end().children("span").toggleClass("up").toggleClass("down"),b.preventDefault(),b.stopPropagation()}),a("#top_panel .add .button").click(function(b){a(this).siblings(".submenu").children(".body").slideToggle("middle"),b.preventDefault(),b.stopPropagation()}),window.BX&&BX.addCustomEvent("onFrameDataReceived",function(){a("#top_panel span.kitchen > a").click(function(b){a(this).siblings(".submenu").slideToggle("middle").end().children("span").toggleClass("up").toggleClass("down"),b.preventDefault(),b.stopPropagation()}),a("#top_panel .add .button").click(function(b){a(this).siblings(".submenu").children(".body").slideToggle("middle"),b.preventDefault(),b.stopPropagation()})})})}(jQuery);var smartsearchInputValue;
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
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
