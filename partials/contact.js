
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("contactCtrl",["$scope", "$state", "$uibModal", "Contact", function($scope, $state, $uibModal, Contact) {
    "user strict";

    var _model = {
        is_loading : false,
        submit: false,
        is_error: false,
        error_message: ""
    }
    //--------------------------------------------------------------------------
    // PROPERTIES (PROTECTED)
    //--------------------------------------------------------------------------
    $scope.model = _model;

    $scope.onSubmitClicked = function() {
        _model.submit = true;
        _model.is_loading = true;
        Contact.sendEmail($scope.model)
        .catch(function(error_msg){
            _model.is_error = true;
            _model.error_message = error_msg;
            _model.is_loading = false;
        })
        .then(function(){
            var dialog, promise;
            if (_model.is_error) { return; }

            dialog = $uibModal.open({
                windowClass: "confirmation-dialog-container",
                scope: $scope,
                templateUrl: "modals/confirmation.html",
                controller: "confirmationCtrl"
            });
            promise = dialog.result;

            promise.then(function(){
                $state.go("home");
            }, function(){
                $state.go("home");
            })
            .finally(function(){
                $scope.model = {};
                _model.is_loading = false;
                _model.is_error = false;
            });

        })
    };

}]);
