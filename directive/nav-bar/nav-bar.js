/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("navBar", function($state){
	var linkFn = function(scope) {
		// var _model = {};
		scope.$state = $state;
	};
	// Runs during compile
	return {
		// name: "",
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
		// replace: true,
		restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
		// template: "",
		templateUrl: "directive/nav-bar/nav-bar.html",
		link: linkFn
	};
});
