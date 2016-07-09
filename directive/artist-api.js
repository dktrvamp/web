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

	return {
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		replace: true,
		controller: function($http, $log, $scope) {
			$scope.model = {
				artist : null
			};
		    $scope.engine = [
	            { id: 1, search: "Spotify" },
	            { id: 2, search: "SoundCloud" },
	            { id: 3, search: "LastFm" },
	        ];

		    $scope.selected = $scope.engine[0];
			$scope.artists = [];
		},
		replace: true,
		restrict: "A",
		templateUrl: "directive/artist-api.html"
	};
});


