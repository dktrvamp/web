/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("homeFooter", function(){
	"use strict";

	var linkFn = function(scope) {
		scope.items = [
			{
				"title" : "Engineering",
				"to_state": "engineering"
			},
			{
				"title" :"Contact",
				"to_state": "contact"
			},
			{
				"title" : "Privacy Policy",
				"to_state": "policy"
			}
		];

		$(".popover").mouseover(function(){
			$(this).hide();
		});
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
		templateUrl: "directive/footer/home-footer.html",
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: linkFn
	};
});
