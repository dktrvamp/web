
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("rssTile", function() {
    "use strict";

    var linkFn = function(){};
    return {
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        replace: true,
        scope: {
            item: "=?"
        },
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        template: "<div id=\"RssTile\">" +
                   " <div class=\"date\" data-ng-bind=\"item.publishedDate\"></div><br>" +
                    "<img data-ng-if=\"image_thumbnail\" class=\"image-thumbnail\" width=\"360\" height=\"240\" data-ng-src=\"{{image_thumbnail}}\"/><br>" +
                    "<a class=\"title\" data-ng-href=\"{{item.link}}\" target=\"_blank\">{{item.title}}</a><br>" +
                   " <p class=\"contentSnippet fade-in fade-out\" data-ng-bind-html=\"item.content\"></p><br>" +
               " </div>",
        link: linkFn
    };
});
