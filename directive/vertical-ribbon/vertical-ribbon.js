
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("verticalRibbon", function( RssRibbon) {
    "use strict";

    var linkFn = function(scope){
        var model = {};
        scope.model = model;
        //----------------------------------------------------------------------
        // METHODS (PRIVATE)
        //----------------------------------------------------------------------

        function getRssFeed() {
            RssRibbon.getRssFeeds()
            .then(function(data) {
                if (!data || !data.length) {
                    return;
                }
                model.ribbons = data;
            });
        }

        //----------------------------------------------------------------------
        // INITIALIZATION
        //----------------------------------------------------------------------

        getRssFeed();
    };
    return {
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        // replace: true,
        scope: {},
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        template: "<div id=\"VerticalRibbon\">" +
                "<div ng-repeat=\"ribbon in model.ribbons\">" +
                "    <div data-rss-ribbon ribbon=\"ribbon\"></div>" +
                "</div>" +
           " </div>",
        link: linkFn
    };
});
