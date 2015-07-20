/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive('playlist', ['$state', function($state){

	function linkFn() {
	
	}
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($http, $log, $scope, $modal, $timeout, $transclude, $q) {

		    var _model = {
		        	length : null,
		        	title  : null,
		        	source : null
		        },
		        _tracks = [];

		    $scope.model = _model;  

		    function getLocaleString(){
				var promise = $http.get('locale/locale.json'),
					items;
			    promise
			    	.then(function(response){
			    		items = response.data;
			    		// _tracks.push(response.data);
		    			// console.log("items", _tracks);
			    	})
			    	.catch(function(){
			    		$log.warn("Playlist.getLocaleString - ");
			    	})
			    	.finally(function(){
			    		// $scope.tracks = _tracks[0];
			    	});
			    $q.when(promise)
			    	.then(function(){
			    		$scope.tracks = _tracks = items.concat();
			    	});	
		    }

		    $scope.onPlayClicked = function(index){
		    	var audio = $('audio'),
		    		track = _tracks[index],
		    		source = track && track.src;

		    	// audio[index].load();
		    	_model.source = source;
		    	audio[index].play();
			};
			$scope.onPauseClicked = function(index) {
				var audio = $('audio');
				audio[index].pause();
			}
			

				// $modal.open({
		  //          templateUrl: "modals/purchase-modal.html",
		  //          controller: "purchaseCtrl"
		  //      });
		
			getLocaleString();
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'directive/playlist/playlist.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: linkFn
	};
}]);