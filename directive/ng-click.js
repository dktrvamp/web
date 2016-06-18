/**
 * @ngdoc directive
 * @name ngClick
 * @requires
 * @description
 *
 *
 */
angular.module("Dktrvamp").directive("ngClick", function ($state, Analytics) {
    "use strict";

    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            function onClick(event) {
                var tag_name = event && event.target.tagName.toLowerCase();
                Analytics.trackClick(tag_name, $state.current.name);
                console.log(tag_name, $state.current.name);
            }

            scope.$on("$destroy", function () { element.off("click", onClick); });
            element.on("click", onClick);
        }
    };
});
