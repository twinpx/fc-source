$(function(){function a(){$(".b-social-buttons__i__icon").unbind("click").bind("click",function(){var a=$(this),b=a.parent(),c=a.data("url"),d="get";return b.addClass("i-preload"),$.ajax({url:c,type:d,dataType:"json",success:function(a){try{$(".b-social-buttons__i__icon").each(function(){var b=$(this);b.data("url")===c&&b.parent().find(".b-social-buttons__i__num").text(a.num)})}catch(d){}b.removeClass("i-preload")},error:function(a){window.console&&console.log(a)}}),!1})}a()});