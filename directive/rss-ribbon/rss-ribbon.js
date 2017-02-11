
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("rssRibbon", function() {
    "use strict";

    var linkFn = function(scope){
        scope.feeds = [];
        //----------------------------------------------------------------------
        // METHODS (PRIVATE)
        //----------------------------------------------------------------------

        scope.$watch("ribbon", function update() {
            scope.feeds = scope.ribbon && scope.ribbon.items;
        });
    };
    return {
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        // replace: true,
        scope: {
            ribbon: "=?"
        },
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/rss-ribbon/rss-ribbon.html",
        link: linkFn
    };
});
