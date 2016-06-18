/**
 * @ngdoc directive
 * @name ngClick
 * @requires
 * @description
 *
 *
 */
angular.module("Dktrvamp").directive("ngClick", function ($location, Analytics) {
    "use strict";

    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            function onClick(event) {
                var tag_name = event && $(event.target).text();
                Analytics.trackClick(tag_name, $location.absUrl());
            }

            scope.$on("$destroy", function () { element.off("click", onClick); });
            element.on("click", onClick);
        }
    };
});
