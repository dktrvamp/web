/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("navBar", function(){
	var linkFn = function(scope) {
		scope.menu_bar = [
			{
				"title" : "Home",
				"state" : "home",
				"index" : 1
			},
			{
				"title" : "Audio",
				"state" : "audio",
				"index" : 2
			},
			{
				"title" : "Social",
				"state" : "social",
				"index" : 3
			},
			{
				"title" : "About",
				"state" : "about",
				"index" : 4
			}

		];
	};
	return {
		// name: "",
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
		replace: true,
		restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
		// template: "",
		templateUrl: "directive/nav-bar/nav-bar.html",
		link: linkFn
	};
});
