(function() {
	$(document)
		.delegate(".b-admin-buttons", "mouseenter", mouseenterAdmin)
		.delegate(".b-admin-buttons", "mouseleave", mouseleaveAdmin)
		.delegate(".b-delete-icon", "click", deleteAdmin);
	
	function mouseenterAdmin() {
		var $block = $(this).find(".b-admin-buttons__block").addClass("i-hover");
		$block.stop().show().animate({opacity: 1}, 100);
	}
	
	function mouseleaveAdmin() {
		var $block = $(this).find(".b-admin-buttons__block").removeClass("i-hover");
		setTimeout(function() {
			if($block.hasClass("i-hover")) return;
			$block.stop().animate({opacity: 0}, 100, function() {$block.hide();});
		}, 100);
	}
	
	function deleteAdmin(e) {
		if(confirm($(this).attr("title") + "?")) return true;
		return false;
	}
}());