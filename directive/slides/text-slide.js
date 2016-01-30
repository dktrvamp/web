/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp")
	.directive("textSlide", ["$timeout", function($timeout){
		var linkFn = function(scope) {
			var INTERVAL = 5000,
				attributes = [
					{ type: "HQ", "src" : "" },
					{ type: "FX", "src" : "" },
					{ type: "EX", "src" : "" }
				];

		    function setCurrentSlideIndex(index) {
		        scope.currentIndex = index;
		    }

		    function isCurrentSlideIndex() {
		        // return $scope.currentIndex === index;
		        return true;
		    }

		    function nextSlide() {
		        scope.currentIndex = ( scope.currentIndex < scope.attributes.length - 1) ? ++ scope.currentIndex : 0;
		        $timeout(nextSlide, INTERVAL);
		    }

		    function loadSlides() {
		        $timeout(nextSlide, INTERVAL);
		    }

		    scope.attributes = attributes;
		    scope.currentIndex = 0;
		    scope.setCurrentSlideIndex = setCurrentSlideIndex;
		    scope.isCurrentSlideIndex = isCurrentSlideIndex;

		    loadSlides();

		};
		// Runs during compile
		return {
			// name: "",
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
			// restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
			// template: "",
			templateUrl: "directive/slides/text-slide.html",
			replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: linkFn
		};
	}]);