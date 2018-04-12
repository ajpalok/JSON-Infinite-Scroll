$(document).ready(function(){
	// $.getJSON( "js/ajax/signatories.json", function( data ) {
	// 	var items = [];
	// 	$.each( data, function( key, val ) {
	// 		items.push( "<li id='" + key + "'>" + val + "</li>" );
	// 	});

	// 	$( "<ul/>", {
	// 		"class": "my-new-list",
	// 		html: items.join( "" )
	// 	}).appendTo( "body" );
	// });

	var throttle = function throttle(func, limit) {
		var lastFunc = void 0;
		var lastRan = void 0;
		return function () {
			var context = this;
			var args = arguments;
			if (!lastRan) {
				func.apply(context, args);
				lastRan = Date.now();
			} else {
				clearTimeout(lastFunc);
				lastFunc = setTimeout(function () {
					if (Date.now() - lastRan >= limit) {
						func.apply(context, args);
						lastRan = Date.now();
					}
				}, limit - (Date.now() - lastRan));
			}
		};
	};


	var scrollTolerance = 50; // Define range of pixels between scroll position and bottom page as a tolerance to trigger the function

	function infiniteScrollAppend(){
		// console.log("Executing: infiniteScrollAppend");
		var scrollPosition = $(window).scrollTop();
		var scrollTrigger = $(document).height() - $(window).height() - scrollTolerance;

		// Detect if user is at the bottom of the site
		if (scrollPosition > scrollTrigger) {
	        // $("#infinite-scroll-wrapper").append("<p class='p-to-scroll'> I'm more content! </p>");
	        // Do something
	    }
	}

	$(window).on('scroll', throttle(function (event) {
		infiniteScrollAppend();
	}, 500));
});





