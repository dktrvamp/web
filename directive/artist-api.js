/*jshint smarttabs:true */

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
angular.module("Dktrvamp").directive("artistApi", function(){
	"use strict";
	// Runs during compile
	return {
		// name: "",
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function( $http, $log, $scope) {
			$scope.model = {
				artist : null
			};

			$scope.artists = [];
			$scope.browseSpotifyArtist = function(){
				var artist = $scope.model.artist;
				$http.get("http://ws.spotify.com/search/1/artist.json?q=artist:"+artist)
				.success(function(data){
					var artists = data && data.artists,
						artist_array = [];
					_.each(artists, function(art) {
						artist_array.push(art.name);
						$scope.artist.name = artist.name;
					});
					$scope.artists = artist_array;

				})
				.catch(function(){
					$log.warn("Social.Unable to retrieve tweets");
				})
				.finally(function(){
				});
			};
		},
		// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: "directive/artist-api.html"
	};
});