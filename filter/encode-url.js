/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").filter("escape", function() {
    return window.encodeURIComponent;
});
