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

