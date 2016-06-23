
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("contactCtrl",["$scope", "$state", "$uibModal", "Contact", function($scope, $state, $uibModal, Contact) {
    "user strict";
    //--------------------------------------------------------------------------
    // PROPERTIES (PROTECTED)
    //--------------------------------------------------------------------------
    $scope.model = {};

    $scope.onSubmitClicked = function() {
        $scope.model.submit = true;
        Contact.sendEmail($scope.model)
        .then(function(){
            var dialog, promise;

            dialog = $uibModal.open({
                windowClass: "confirmation-dialog-container",
                scope: $scope,
                templateUrl: "modals/confirmation.html",
                controller: "confirmationCtrl"
            });
            promise = dialog.result;

            promise.then(function(){
                $state.go("home");
            });

        })
    };

}]);
