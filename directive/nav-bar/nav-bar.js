/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp")
	.directive('navBar', ['$state', function($state, $window){
		var linkFn = function(scope, element) {
			var _model = {};
			scope.$state = $state;
			scope.model = _model;

	        $(window).resize(function () {
	            _model.left =  ($(window).width() / 4) + 'px';  
	        });
		}
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// replace: true,
			restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'directive/nav-bar/nav-bar.html',
			link: linkFn
		};
	}]);