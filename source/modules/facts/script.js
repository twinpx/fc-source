function DoYouKnowThat( id ) {
  var self = this;
	
	init();
	
	function init() {
		if(!document.getElementById(id)) return false;
		
		self.$elem = $("#" + id);
		handleEvents();
	}
	
	function handleEvents() {
		initMoreButton();
		
		function initMoreButton() {
			self.$elem.find(".b-facts__more__link").click(clickMoreLink);
			
			function clickMoreLink() {
				if(!self.factsArray) {
					getFactsArray();
					return false;
				}
					
				showNextFact();
				trackEvent();
				
				function getFactsArray() {
					$.getJSON(
						"/php/get_more_facts.php",
						success
					)
					
					function success(data, textStatus, jqXHR) {
						self.factsArray = data.facts;
						showNextFact();
					}
				}
				
				function trackEvent() {
					if(!window.ga) return;
					ga('send', 'event', 'Знаете ли вы что', 'Нажали кнопку Еще', self.$elem.find(".b-facts__item").text());
				}
				
				return false;
			}
		}
	}
	
	function showNextFact() {
		if(!self.factsArray) {
			self.$elem.find(".b-facts__more__link").click();
			return false;
		}
		
		var factObject = getNextFactObject();
		replaceFactWithNew();
		
		function replaceFactWithNew() {
			self.$elem.find(".b-facts__item").fadeOut(500, function() {
				self.$elem.find(".b-facts__item")
					.attr({"data-id": factObject.id})
					.html(factObject.text)
					.fadeIn(500);
			});
		}
		
		function getNextFactObject() {
			var currentFactObject = {
					id: self.$elem.find(".b-facts__item").attr("data-id"),
					text: self.$elem.find(".b-facts__item").text()
				}
			
			while(self.factsArray[0].id == currentFactObject.id) {
				moveFactObjectToTheEnd();
			}
			
			var resultFactObject = self.factsArray[0];
			moveFactObjectToTheEnd();
			
			function moveFactObjectToTheEnd() {
				self.factsArray.push(self.factsArray.shift());
			}
			
			return resultFactObject;
		}
		
	}
}

new DoYouKnowThat( 'do-you-know-that' );