/**
 * @ngdoc directive
 * @name ngClick
 * @requires
 * @description
 *
 * Track every ng-click.
 */
angular.module("Dktrvamp").directive("ngClick", function ($location, Analytics) {
    "use strict";

    return {
        restrict: "A",
        link: function (scope, element) {
            function onClick(event) {
                var tag_name = event && $(event.target).text();
                Analytics.trackClick(tag_name, $location.url());
            }

            scope.$on("$destroy", function () { element.off("click", onClick); });
            element.on("click", onClick);
        }
    };
});
