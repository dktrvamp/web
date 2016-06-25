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
// https://api.instagram.com/v1/users/self/media/liked?access_token=ACCESS-TOKEN

// CLIENT INFO
// CLIENT ID	956b500ec10745f395e4eddc267bf291
// CLIENT SECRET	79d2d22e293a41218cf3274ce151bb6a
// https://instagram.com/oauth/authorize/?client_id=956b500ec10745f395e4eddc267bf291&amp;redirect_uri=http://localhost&amp;response_type=token
// https://instagram.com/oauth/authorize/?client_id=956b500ec10745f395e4eddc267bf291&amp;redirect_uri=http://localhost&amp;redirect_uri=www.drvaudio.com&amp;response_type=token
// https://instagram.com/oauth/authorize/?client_id=956b500ec10745f395e4eddc267bf291&amp;redirect_uri=http://localhost&amp;redirect_uri=www.drvaudio.com&amp;response_type=token
// https://instagram.com/oauth/authorize/?client_id=956b500ec10745f395e4eddc267bf291&amp;redirect_uri=HTTP://YOURREDIRECTURLHERE.COM&amp;response_type=token

// http://localhost/#access_token=202159144.956b500.f1c1ca50f73d44aa8dc252406b8bb94e


// https://api.instagram.com/v1/media/client_id=e745c44dec174f73ae0a7964001dacae/likes?access_token=202159144.956b500.f1c1ca50f73d44aa8dc252406b8bb94e
// https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=202159144.956b500.f1c1ca50f73d44aa8dc252406b8bb94e


// https://instagram.com/oauth/authorize/?client_id=956b500ec10745f395e4eddc267bf291&redirect_uri=http://www.drvaudio.com/#/home&response_type=token
// https://www.instagram.com/oauth/authorize/?client_id=956b500ec10745f395e4eddc267bf291&redirect_uri=http://www.drvaudio.com/#/home&response_type=token

			function instaArtist() {
				// var url = "";
				//  // $http.get(url)
				 $http({
	                url: "https://api.instagram.com/v1/media/client_id=956b500ec10745f395e4eddc267bf291/likes?access_token=202159144.956b500.f1c1ca50f73d44aa8dc252406b8bb94e",
	                method: "get"
	            })
				.then(function(response){
	                console.log("instaArtist()", response , response && response.data);
	                scope.artists = response.data;
	            })
				.catch(function(){
					console.log("failed---",arguments);
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
