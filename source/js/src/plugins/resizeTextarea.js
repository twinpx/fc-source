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