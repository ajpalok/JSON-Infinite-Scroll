$(document).ready(function(){
	$.getJSON( "js/ajax/signatories.json", function(data) {
		console.log("json data: " + data.signatories.length);
		$.each(data.signatories, function(key, val) {
			// items.push( "<li id='" + key + "'>" + val + "</li>" );
			var signatory_name = val.name;
			var signatory_job = val.job;
			var signatory_quote = val.quote;
			var signatory_image = val.image_url;

			var signatory_card = '<div class="signatory_card"> <figure class="signatory_photo"> <img src="' + signatory_image + '" alt="' + signatory_name + '" > </figure> <div class="signatory_content"> <p class="quote">"' + signatory_quote + '" </p> <p class="author"> <span class="name">' + signatory_name + ',&nbsp;</span> <span class="job_title">' + signatory_job + '</span> </p> </div> </div>';

			$(".signatories_wrapper").append(signatory_card);
		});
	});

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

