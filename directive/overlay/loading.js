/*jshint smarttabs:true */

/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("loading", function(){
    "use strict";
    // Runs during compile
    return {
        replace: true,
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: "E", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/overlay/loading.html"
    };
});


