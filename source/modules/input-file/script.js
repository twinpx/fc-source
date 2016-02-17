$(".input_file").each(function() {
  new InputFile($(this));
});

function InputFile($elem, params) {
	var self = this;
	self.$elem = $elem;
	self.$input = self.$elem.find(":file");
	
	var options = {}, params = params || {};
	options.extentions = params.extentions || ["jpg", "jpeg"];
	options.messages = params.maessages ||
		{
			wrongExtention : "Загружайте изображения в jpeg формате"
		};
	init();
	
	function init() {
		
		createHTML();
		
		self.$name = self.$elem.find("div.new_file_name");
		
		self.$input.change(function() {
			handleChanges();
		});
		
	}
	
	function clearValue() {
		self.$elem.find(":file").remove();
		self.$elem.find(".browse_button").after(self.$input);
	}
	
	function createHTML() {
		self.$elem.html('<div class="browse_button" title="Выбрать файл"></div><div class="blocker"></div><div class="new_file_name"></div>');
		self.$elem.find(".browse_button").after(self.$input);
	}
	
	function handleChanges() {
		
		var fileTitle = getFileTitle();
		
		var fileExt = getFileExt(fileTitle);
		
		if(isValidFileExt(fileExt)) {
			self.$name.text(fileTitle);
			self.$name.removeClass("i-attention");
		}
		else {
			self.$name.text(options.messages.wrongExtention);
			self.$name.addClass("i-attention");
			//clearValue();
		}
		
		self.$name.css({display:"block"});
	}
	
	function filesize (url) {
		var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		if (!req) {
			throw new Error('XMLHttpRequest not supported');
		}
	 
		req.open('HEAD', url, false);
		req.send(null);
	 
		if (!req.getResponseHeader) {
			try {
				throw new Error('No getResponseHeader!');
			} catch (e) {
				return false;
			}
		} else if (!req.getResponseHeader('Content-Length')) {
			try {
				throw new Error('No Content-Length!');
			} catch (e2) {
				return false;
			}
		} else {
			return req.getResponseHeader('Content-Length');
		}
	}
	
	function isValidFileExt(fileExt) {
		
		var flag = false;
		
		for(var i = 0; i < options.extentions.length; i++) {
			if(fileExt.toLowerCase() == options.extentions[i]) flag = true;
		}
		
		return flag;
	}
	
	function getFileExt(fileTitle) {
		var RegExExt =/.*\.(.*)/;
		var fileExt = fileTitle.replace(RegExExt, "$1");
		
		return fileExt;
	}
	
	function getFileTitle() {
		var value = self.$input.val();
		
		var reWin = /.*\\(.*)/;
		var fileTitle = value.replace(reWin, "$1");
		
		var reUnix = /.*\/(.*)/;
		fileTitle = fileTitle.replace(reUnix, "$1");
		
		if (fileTitle.length > 18) {
			fileTitle = "..." + fileTitle.substr(fileTitle.length - 16, 16);
		}
		
		return fileTitle;
	}
}