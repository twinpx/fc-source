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