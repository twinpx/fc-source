favoriteButtons();

if ( window.BX ) {
	BX.addCustomEvent( "onFrameDataReceived", function () {
		favoriteButtons();
	});
}

function favoriteButtons() {
	$(".b-favorite-button").hover(
		function() {
			$(this).addClass("i-hover").stop().animate({width: "79px"}, function() {
				$(this).find(".b-favorite-button__text").css({display: "inline-block"});
			});
		},
		function() {
			$(this).find(".b-favorite-button__text").hide();
			$(this).stop().animate({width: "35px"}, function() {
				$(this).removeClass("i-hover")
			});
		}
	).click(clickFavorite);

	function clickFavorite() {
		if(!window.ga) return;
		var $button = $(this);

		if($button.hasClass("i-remove-favorite")) {
			_gaq.push(['_trackEvent', 'Избранное', 'Удалили из избранного']);
			ga('send', 'event', 'Избранное', 'Удалили из избранного');
		} else {
			_gaq.push(['_trackEvent', 'Избранное', 'Добавили в избранное']);
			ga('send', 'event', 'Избранное', 'Добавили в избранное');
		}
	}
}