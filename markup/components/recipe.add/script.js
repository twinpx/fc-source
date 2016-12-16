function appendNewIngredientField(a){{var b=$("#dish_stages div.stage").index($(a).closest("div.stage"));stageIngredient(b)}$(a).closest("div.ingredient").find("div.stage_ing_list").append(stageIngredient(b)).find("input.smartsearch:last").focus()}function smartsearchKeyUp(a,b){switch(window.evt&&(b=window.evt),b.keyCode?b.keyCode:b.which?b.which:null){case 38:smartsearchNavUp(a);break;case 40:smartsearchNavDown(a);break;default:smartsearchFunction(a),showUnitField(a)}}function smartsearchKeyPress(a,b){switch(window.evt&&(b=window.evt),b.keyCode?b.keyCode:b.which?b.which:null){case 13:return $(this).siblings("div.search_list").children("ul").css({display:"none"}).empty(),showUnitField(this),!1;case 9:$(a).siblings("div.search_list").children("ul").css({display:"none"}).empty()}}function checkUniqueness(){$(this).parent().find("input[name*=id]").attr("value")}function showUnitField(a){if(0==$(a).prev("div.search_list").children("ul.search_list").children("li").size()){for(var b=0,c=0;c<smartsearchArray.length;c++)smartsearchArray[c].toLowerCase()==$(a).attr("value").toLowerCase()&&($(a).siblings("input[type='hidden']").attr({value:smartsearchIdArray[c]}).end().attr({value:smartsearchArray[c]}),$(a).siblings("input.unit").css({display:"inline"}).focus(),$(a).siblings("span.unit").text(smartsearchUnitArray[c]).css({display:"inline"}),b=1);0==b&&($(a).siblings("input.unit").attr({value:""}).end().siblings("input.click_field").attr({value:""}).end().siblings("input[name*='id']").attr({value:""}),$(a).siblings("span.unit").css({display:"none"}))}}function chooseDishType(a){if(!a)var a="";for(var b=$("select[name='cooking']"),c=b.find(":selected").attr("value"),d=0;d<cookingArray[0].length;d++)if(cookingArray[0][d]==c)var e=d;fillDishTypeSelect(e,a)}function fillDishTypeSelect(a,b){var c=$("select[name='dish_type']");if(c.empty(),!a)var a=0;for(var d=0;d<cookingArray[1][a][0].length;d++)c.append(""!=b&&cookingArray[1][a][0][d]==b?'<option value="'+cookingArray[1][a][0][d]+'" selected="selected">'+cookingArray[1][a][1][d]+"</option>":'<option value="'+cookingArray[1][a][0][d]+'">'+cookingArray[1][a][1][d]+"</option>")}function clearElement(a){for(var b=a.childNodes.length,c=0;b>c;c++)a.removeChild(a.childNodes[0])}function numberingStage(a){if(1==String(a+1).length)var b=numberingArray1[a];else{var c=(a+1)%10;if(0==c)var b=numberingArray3[Math.floor((a+1)/10)-1];else if(1==Math.floor((a+1)/10))var b=numberingArray2[a%10];else var b=numberingArray4[Math.floor(a/10)-1]+" "+numberingArray1[a%10]}return b}function numberingStageHeader(a){if(1==String(a+1).length)var b=numberingHeaderArray1[a];else{var c=(a+1)%10;if(0==c)var b=numberingHeaderArray3[Math.floor((a+1)/10)-1];else if(1==Math.floor((a+1)/10))var b=numberingHeaderArray2[a%10];else var b=numberingHeaderArray4[Math.floor(a/10)-1]+" "+numberingHeaderArray5[a%10]}return b}function addStage(){var a=$("#dish_stages div.stage").size(),b=$('<div class="stage"><div class="delete_icon"><a href="#" title="Удалить этап"></a></div><h2>'+numberingStageHeader(a)+' этап</h2><div class="row"><div class="col-sm-6 description"><div class="form-group"><h5>Описание '+numberingStage(a)+' этапа<span class="no_text">?</span></h5><textarea name="stage_description[]" cols="10" rows="10" class="form-control"></textarea></div><div class="form-group"><h5>Фото этапа (600х400 px)</h5><div class="input_file"><div class="blocker"></div><input type="file" name="photo[]" class="text customFile"><div class="browse_button" title="Выбрать файл"><input type="button" value="Обзор"></div><div class="new_file_name"></div></div></div></div><div class="col-sm-6 ingredient"><h5>Ингредиенты '+numberingStage(a)+' этапа<span class="scales"><span class="hint"><span>Таблица мер</span></span></span></h5><div class="stage_ing_list"></div><div class="add_ingredient"><span class="icon"></span><a href="#">Добавить ингредиент</a></div></div></div><div class="clear"></div></div>');$(b).find("div.stage_ing_list").append(stageIngredient(a)).append(stageIngredient(a)).append(stageIngredient(a)),$("#dish_stages > div.body > div.button").before(b),b.find(".input_file").each(function(){new InputFile($(this))})}function deleteStage(){if($("#dish_stages div.stage:eq("+stage_number+") div.delete_icon").addClass("confirm"),confirm("Удалить этап?"))if($("#dish_stages div.stage:eq("+stage_number+")").remove(),stagesIngredientsArray.splice(stage_number,1),0==$("#dish_stages div.stage").size())stage_number=0,addStage();else for(var a=stage_number;a<$("#dish_stages div.stage").size();a++){var b=$("#dish_stages div.stage:eq("+a+")");b.find("h2").text(numberingStageHeader(a)+" этап").end().find("div.description").find("h5:eq(0)").html("Описание "+numberingStage(a)+' этапа<span class="no_text">?</span>').end().end().find("div.ingredient").find("h5").html("Ингредиенты "+numberingStage(a)+' этапа<span class="scales"><img src="/images/icons/scales.gif" width="12" height="12" alt="Таблица мер"><span class="hint"><span>Таблица мер</span></span></span>').closest("div.ingredient").find("input[name*='id']").attr({name:"ingredients_"+a+"_id[]"}).siblings("input[name*='number']").attr({name:"ingredients_"+a+"_number[]"})}else $("#dish_stages div.stage:eq("+stage_number+") div.delete_icon").removeClass("confirm")}function findStageGroupLi(a){for(var b=document.getElementById("stage_ingredients_group"),c=0;c<b.childNodes.length;c++)if("UL"==b.childNodes[c].tagName)for(var d=b.childNodes[c],e=new Array,f=0;f<d.childNodes.length;f++)"LI"==d.childNodes[f].tagName&&e.push(d.childNodes[f]);var g=e[a];return g}function selectStageIngredient(a,b,c){var d=a,e=b,f=c;if(addRemoveClass(d.parentNode,"selected"),ingredientsGroupLi=findStageGroupLi(e),-1!=d.parentNode.className.search("selected"))var g=!0;else var g=!1;showStageSubList(ingredientsGroupLi,g,e,f)}function addStageIngredients(){var a=stage_number,b=new Array;b[0]=new Array,b[1]=new Array;var c=new Array;$("#i_have_list").find("tr").each(function(){c.push($(this).attr("class"))});for(var d=0;d<c.length;d++)for(var e=0;e<ingredientArray[0].length;e++)for(var f=0;f<ingredientArray[2][e][0].length;f++)c[d]==ingredientArray[2][e][0][f]&&(b[0].push(e),b[1].push(f));var g=$("#dish_stages div.stage:eq("+stage_number+") div.ingredient"),h=$(g).children("div.stage_ing_list"),i=($(g).children("div.add_ingredient"),$(g).find("span.scales"),$(h).find("div.item"));if($(h).empty(),0!=c.length){for(var j,e=0;e<c.length;e++){j=0;for(var f=0;f<i.length;f++)c[e]==$(i[f]).find("input[name*='id']").attr("value")&&($(h).append(i[f]),j=1);0==j&&$(h).append(stageIngredient(a,ingredientArray[2][b[0][e]][1][b[1][e]],c[e],ingredientArray[2][b[0][e]][2][b[1][e]]))}1==c.length?$(h).append(stageIngredient(a)).append(stageIngredient(a)):2==c.length&&$(h).append(stageIngredient(a))}else $(h).append(stageIngredient(a)).append(stageIngredient(a)).append(stageIngredient(a));hideStageIngredientsLayer()}function stageIngredient(a,b,c,d){if(b&&c&&d)var e=$('<div class="item"><div class="search_list"><ul class="search_list"></ul></div><input type="text" value="'+b+'" class="text smartsearch"><span class="search_list_icon"><span title="Весь список ингредиентов"></span></span><input type="hidden" value="" class="click_field"><input type="hidden" name="ingredients_'+a+'_id[]" value="'+c+'"><input type="text" name="ingredients_'+a+'_number[]" value="" class="text unit" style="display:inline;"><span class="unit" style="display:inline;">'+d+'</span><span class="no_text">?</span><a href="#" class="delete_icon" title="Удалить ингредиент"></a>');else var e=$('<div class="item"><div class="search_list"><ul class="search_list"></ul></div><input type="text" value="" class="text smartsearch"><span class="search_list_icon"><span title="Весь список ингредиентов"></span></span><input type="hidden" value="" class="click_field"><input type="hidden" name="ingredients_'+a+'_id[]" value=""><input type="text" name="ingredients_'+a+'_number[]" value="" class="text unit"><span class="unit"></span><span class="no_text">?</span><a href="#" class="delete_icon" title="Удалить ингредиент"></a>');return $(e).find("input.text").keypress(function(a){return 13==a.which?($(this).hasClass("unit")?""!=$(this).attr("value")&&(0!=$(this).closest("div.item").next("div.item").size()?$(this).closest("div.item").next("div.item").find("input.smartsearch").focus():$(this).closest("div.ingredient").find("div.add_ingredient").children("a").click()):($(this).siblings("div.search_list").children("ul").css({display:"none"}).empty(),showUnitField(this)),!1):void 0}),e}function deleteIngredient(a){$(a).parent().remove()}function showStageIngredientsLayer(a){showHideLayer("top_layer"),$("#search_helper").addClass("stage_helper").css({top:$(window).scrollTop()}).slideDown("middle"),$("#search_helper div.body div.search_blocks").css({display:"none"}),$("#h_ingredients").css({display:"block"}),$("#i_have_ingredients_list div.column ul").empty(),$("#i_have_ingredients_list h2").empty();var b=$("#i_have_list div.bg table");$(b).empty(),10!=a&&($("#dish_stages div.stage:eq("+stage_number+") div.ingredient div.item").each(function(){""!=$(this).find("input[name*='id']").attr("value")&&$(b).append('<tr class="'+$(this).find("input[name*='id']").attr("value")+'"><td><span>'+$(this).find("input.text").attr("value")+'</span></td><td class="icon"><a href="#" class="delete" title="Удалить ингредиент"></td></tr>')}),$(b).find("a.delete").hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")}).click(function(){var a=this.parentNode.parentNode.className;return $("#i_have_ingredients_list").find("li."+a).removeClass("selected"),$(this).parent().parent().remove(),0==$("#i_have_list div.bg table tr").length&&$("#i_have_dash").css({display:"block"}),!1})),$("#i_have_dash").css(0==$(b).find("tr").length?{display:"block"}:{display:"none"}),createGroupList(a)}function hideStageIngredientsLayer(){showHideLayer("top_layer"),$("#search_helper").slideUp("middle")}function checkStageForm(){var a=$("#add_recipe_form");return sendStageFormFlag=0,elementStageNumber=0,firstStageElement="",$("#add_recipe_form span.no_text").each(function(){$(this).closest(".form-group").find("input.form-control:visible").each(function(){""==this.value?"file"==$(this).attr("type")?0==$(this).closest("div.form-group").children("div.file_name").size()?(sendStageFormFlag=1,$(this).closest("div.form-group").addClass("attention"),""==firstStageElement&&(firstStageElement=this)):$(this).closest("div.item").removeClass("attention"):(sendStageFormFlag=1,$(this).closest("div.form-group").addClass("attention"),""==firstStageElement&&(firstStageElement=this)):$(this).closest("div.form-group").removeClass("attention")}),$(this).closest("div.item").find("input.unit:visible").each(function(){""==this.value?""!=$(this).siblings("input.smartsearch").attr("value")&&(sendStageFormFlag=1,$(this).closest("div.item").addClass("attention"),""==firstStageElement&&(firstStageElement=this)):$(this).closest("div.item").removeClass("attention")}),$(this).closest("div.form-group").find("select").each(function(){""==$(this).find(":selected").attr("value")?(sendStageFormFlag=1,$(this).closest("div.form-group").addClass("attention"),""==firstStageElement&&(firstStageElement=this)):$(this).closest("div.form-group").removeClass("attention")}),$(this).closest("div.form-group").find("textarea").each(function(){""==$(this).attr("value")&&""==$(this).text()&&""==$(this).html()?(sendStageFormFlag=1,$(this).closest("div.form-group").addClass("attention"),""==firstStageElement&&(firstStageElement=this)):$(this).closest("div.form-group").removeClass("attention")})}),0==sendStageFormFlag?a.submit():$(window).scrollTop($(firstStageElement).offset().top-100),!1}function imgDisplay(a,b,c){var d=a,e=b,f="attention";if("DIV"==e.parentNode.tagName)for(var g=e.parentNode,h=0;h<g.childNodes.length;h++)if("H5"==g.childNodes[h].tagName)for(var i=0;i<g.childNodes[h].childNodes.length;i++)"no_text"==g.childNodes[h].childNodes[i].className&&("visible"==d&&-1==g.childNodes[h].className.search(f)&&(g.childNodes[h].className=f),"hidden"==d&&-1!=g.childNodes[h].className.search(f)&&(g.childNodes[h].className=""),c&&(sendStageFormFlag=c));if("LI"==e.parentNode.parentNode.tagName)for(var j=e.parentNode.parentNode,i=0;i<j.childNodes.length;i++)if("SPAN"==j.childNodes[i].tagName&&-1!=j.childNodes[i].className.search("input_block"))for(var k=j.childNodes[i],l=0;l<k.childNodes.length;l++)"no_text"==k.childNodes[l].className&&("visible"==d&&-1==j.className.search(f)&&$(j).addClass(f),"hidden"==d&&-1!=j.className.search(f)&&$(j).removeClass(f),c&&(sendStageFormFlag=c))}function deleteStageImage(a,b){-1==a.className.search("fir")?($(a).addClass("confirm"),confirm("Удалить изображение?")?window.location.href=window.location+"?id="+b:$(a).removeClass("confirm")):(deleteConfirm=1,$(a).addClass("confirm"),confirm("Удалить изображение?")?window.location.href=window.location+"?id="+b:($(a).removeClass("confirm"),deleteConfirm=0))}!function(a){"use strict";a(function(){})}(jQuery),$(document).ready(function(){$("#save_recipe").click(function(){return checkStageForm(),!1}),$("div.dish_parents").find("span.search_list_icon").click(function(){showStageIngredientsLayer(10),$(this).siblings("div.search_list").children("ul").css({display:"none"}).empty()}).end().find("input.smartsearch").keypress(function(a){smartsearchKeyPress(this,a)}).end().find("input.smartsearch").keyup(function(a){smartsearchKeyUp(this,a)}),$("#dish_stages").find("img.delete").click(function(){$(this).parentNode().remove()}),$("#dish_stages").delegate("div.ingredient a.delete_icon","click",function(){return $(this).addClass("confirm"),confirm("Удалить ингредиент?")?(deleteIngredient(this),!1):($(this).removeClass("confirm").removeClass("attention"),!1)}).delegate("span.search_list_icon","click",function(){stage_number=$("#dish_stages div.stage").index($(this).closest("div.stage")),showStageIngredientsLayer(0),$(this).siblings("div.search_list").children("ul").css({display:"none"}).empty()}).delegate("span.scales","mouseenter",function(){$(this).children(".hint").css({visibility:"visible"})}).delegate("span.scales","mouseleave",function(){$(this).children(".hint").css({visibility:"hidden"})}).delegate("span.scales","click",function(){window.open("/table/","scalesWin","width=800, height=800,toolbar=0,scrollbars=yes,status=0,directories=0,location=0,menubar=0,resizable=0")}).delegate("input.smartsearch","keypress",function(a){smartsearchKeyPress(this,a)}).delegate("input.unit","keypress",function(a){switch(window.event&&(a=window.event),a.keyCode?a.keyCode:a.which?a.which:null){case 13:""!=$(this).attr("value")&&(0!=$(this).closest("div.item").next("div.item").size()?$(this).closest("div.item").next("div.item").find("input.smartsearch").focus():$(this).closest("div.ingredient").find("div.add_ingredient").children("a").click())}}).delegate("input.unit","keyup",function(){checkNumberField(this)}).delegate("input.smartsearch","keyup",function(a){smartsearchKeyUp(this,a)}).delegate("div.add_ingredient a","click",function(){return appendNewIngredientField(this),!1}).delegate("div.delete_icon a","click",function(){return stage_number=$("#dish_stages div.stage").index($(this).closest("div.stage")),deleteStage(),!1}).delegate("div.file_name a.delete_icon","click",function(){return deleteStageImage(this,this.getAttribute("id")),!1}),$("#stage_button").click(function(){addStageIngredients()}),$("div.file_name a.delete_icon").click(function(){return deleteStageImage(this,this.getAttribute("id")),!1}),$("input[name='kkal'], input[name='yield']").keyup(function(){checkNumberField(this)})});var deleteConfirm=0,numberingArray1=new Array("первого","второго","третьего","четвёртого","пятого","шестого","седьмого","восьмого","девятого"),numberingArray2=new Array("одиннадцатого","двенадцатого","тринадцатого","четырнадцатого","пятнадцатого","шестнадцатого","семнадцатого","восемнадцатого","девятнадцатого"),numberingArray3=new Array("десятого","двадцатого","тридцатого","сорокового","пятидесятого","шестидесятого","семидесятого","восьмидесятого","девяностого"),numberingArray4=new Array("","двадцать","тридцать","сорок","пятьдесят","шестьдесят","семьдесят","восемьдесят","девяносто"),numberingHeaderArray1=new Array("Первый","Второй","Третий","Четвёртый","Пятый","Шестой","Седьмой","Восьмой","Девятый"),numberingHeaderArray2=new Array("Одиннадцатый","Двенадцатый","Тринадцатый","Четырнадцатый","Пятнадцатый","Шестнадцатый","Семнадцатый","Восемнадцатый","Девятнадцатый"),numberingHeaderArray3=new Array("Десятый","Двадцатый","Тридцатый","Сороковой","Пятидесятый","Шестидесятый","Семидесятый","Восьмидесятый","Девяностый"),numberingHeaderArray4=new Array("","Двадцать","Тридцать","Сорок","Пятьдесят","Шестьдесят","Семьдесят","Восемьдесят","Девяносто"),numberingHeaderArray5=new Array("первый","второй","третий","четвёртый","пятый","шестой","седьмой","восьмой","девятый"),sendStageFormFlag=0,elementStageNumber=0,firstStageElement="";