$(document).ready(function(){

	// Json management data variables
	var all_signatories = [];
	var signatories_mold = [];
	var signatories_in_array_count = 0;
	var signatories_molds_in_html_count = 0;
	var signatories_in_json = 0;
	var signatories_processed = 0;

	// Infinite scroll throttle and functions variables
	var scrollTolerance = 600; // Define range of pixels between scroll position and bottom page as a tolerance to trigger the function
	var elementsToAppendPerScroll = 4; // Define the elements to index when user reach bottom of the site

	$.getJSON( "js/ajax/signatories.json", function(data) {
		console.log("json data: " + data.signatories.length);
		signatories_in_json = data.signatories.length;

		$.each(data.signatories, function(key, val) {
			signatories_processed += 1;

			var signatory_name = val.name;
			var signatory_job = val.job;
			var signatory_quote = val.quote;
			var signatory_image = val.image_url;

			var signatory_card = '<div class="signatory_card"> <div class="inner_flex_wrapper"> <figure class="signatory_photo"> <img src="' + signatory_image + '" alt="' + signatory_name + '" > </figure> <div class="signatory_content"> <p class="quote">"' + signatory_quote + '" </p> <p class="author"> <span class="name">' + signatory_name + ',&nbsp;</span> <span class="job_title">' + signatory_job + '</span> </p> </div> </div> </div>';

			signatories_mold.push(signatory_card);
			signatories_in_array_count += 1;


			if((signatories_in_array_count % elementsToAppendPerScroll) == 0 || signatories_processed == signatories_in_json){
				var signs_left = signatories_processed % elementsToAppendPerScroll;
				var signs_to_index = (signs_left == 0) ? elementsToAppendPerScroll : signs_left;
				
				var last_signs_to_index = signatories_mold.slice(-1 * signs_to_index);
				all_signatories.push(last_signs_to_index);
			}
		});

		// console.log(all_signatories);
		console.log("Pack of cards to insert in html: " + all_signatories.length);
		infiniteScrollAppend();
	});


	

	function infiniteScrollAppend(){
		// console.log("Executing: infiniteScrollAppend");
		var scrollPosition = $(window).scrollTop();
		var scrollTrigger = $(document).height() - $(window).height() - scrollTolerance;

		// Detect if user is at the bottom of the site
		if (scrollPosition > scrollTrigger) {
	        if (signatories_molds_in_html_count < all_signatories.length) {
	        	$(".signatories_wrapper").append(all_signatories[signatories_molds_in_html_count]);
	        	signatories_molds_in_html_count += 1;

	        	if (signatories_molds_in_html_count == all_signatories.length){
	        		$('.signatories_wrapper').removeClass("missing__signatories");
	        	}
	        };
	    }
	}

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
	$(window).on('scroll', throttle(function (event) {
		infiniteScrollAppend();
	}, 300));
});

