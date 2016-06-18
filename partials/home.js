
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("homeCtrl",["$scope", "$uibModal", "hotkeys", "Analytics", function ($scope, $uibModal, hotkeys, Analytics) {

    // console.log(navigator.appName, window);

    $scope.model = {};

    Analytics.init();
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $scope.model.is_mobile = true;
    }


}]);
