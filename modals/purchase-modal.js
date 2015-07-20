/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("purchaseCtrl", ["$modalInstance", "$scope", "$state", function($modalInstance, $scope, $state) {
    "use strict";
    if($state){
        console.log($state);
    }
    /**
     * @doc method
     * @name onDismiss
     * @description
     *
     * Handle when the user dismisses the dialog either by clicking the
     * dismiss button or clicking off the dialog.
     */
    $scope.onDismiss = function() {
        $modalInstance.dismiss();
        $modalInstance.close();
    };

}]);