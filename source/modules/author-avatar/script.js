/*( function() {
	$(document)
		.delegate(".b-author-avatar", "mouseenter", mouseenterAvatar)
		.delegate(".b-author-avatar", "mouseleave", mouseleaveAvatar);
	
	function mouseenterAvatar() {
		var $avatar = $(this);
		$avatar.find(".b-author-avatar__link").stop().animate({width: "100px", height: "100px", top: "-35px", left: "-35px"}, 100);
	}
	
	function mouseleaveAvatar() {
		var $avatar = $(this);
		$avatar.find(".b-author-avatar__link").stop().animate({width: "30px", height: "30px", top: "0", left: "0"}, 100);
	}
}());*/