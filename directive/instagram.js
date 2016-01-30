// https://freemusicarchive.org/api/docs/
// I3BCD2KQCWZ44ZY2
// http://freemusicarchive.org/api/get/{dataset}.{format}?api_key={yourkey}
// http://freemusicarchive.org/api/get/curators.xml?api_key=I3BCD2KQCWZ44ZY2
// http://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("instagram", function($timeout, $http) {
	"use strict";
	// Runs during compile
	function linkFn(scope) {
		    //--------------------------------------------------------------------------
		    // Private Properties
		    //--------------------------------------------------------------------------
			scope.model = {
				artist : null,
				should_slide : false,
				show_caption: false,
				artist_caption_text : null
			};
			scope.insta_artists = null;
			scope.artists = [];

			//--------------------------------------------------------------------------
		    // Private Functions
		    //--------------------------------------------------------------------------

			function instaArtist() {
				var url = "https://api.instagram.com/v1/media/popular?client_id=e745c44dec174f73ae0a7964001dacae&callback=JSON_CALLBACK";
				 $http.jsonp(url)
					.success(function(response){
		                console.log("instaArtist()", response.data);
		                scope.artists = response.data;
		            });
            }

            //--------------------------------------------------------------------------
		    // Private Event
		    //--------------------------------------------------------------------------
			scope.onClick = function() {
				$timeout(function(){ scope.model.should_slide = true; },4000);
			};
			scope.showCaption = function(index) {
				scope.model.show_caption = true;
				scope.model.should_slide = true;
				scope.model.artist_caption_text = scope.artists[index];
			};




	    //--------------------------------------------------------------------------
	    // INITIALIZATION
	    //--------------------------------------------------------------------------
        instaArtist();
	}

	return {
		// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: "directive/instagram.html",
		link: linkFn
	};
})
.animation(".slide-side", function() {
    return {
        enter: function (element, doneFn) {
            element.css("opacity", 0.5).animate({ opacity : 1 }, 1250, "ease-in", doneFn);
        }
    };
});