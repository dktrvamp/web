// https://freemusicarchive.org/api/docs/
// I3BCD2KQCWZ44ZY2
// http://freemusicarchive.org/api/get/{dataset}.{format}?api_key={yourkey}
// http://freemusicarchive.org/api/get/curators.xml?api_key=I3BCD2KQCWZ44ZY2
// http://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("soundcloudNewTrack", function() {
    "use strict";

    return {
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        replace: true,
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/soundcloud/soundcloud-new-track.html",
        link: function(){}

    };
});
