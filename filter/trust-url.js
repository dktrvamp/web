/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").filter("trusted", ["$sce", function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
