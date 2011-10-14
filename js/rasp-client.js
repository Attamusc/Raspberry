//This is javascript
(function() { 
	// Form modification checks...
	var forms_on_page = $("form");
	$.each(forms_on_page, function(index, value) {
		// Handle Requests that should be recognized as PUT and DELETE by the server
		if($(value).data("method") === ("put" || "PUT")) {
			$(value).append("<input type='hidden' name='_method' value='PUT'>");
		}
	});
})();