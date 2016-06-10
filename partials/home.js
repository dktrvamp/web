
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("homeCtrl",["$scope", "$uibModal", function ($scope, $uibModal) {

    $scope.context = "";

    //--------------------------------------------------------------------------
    // METHODS (PRIVATE)
    //--------------------------------------------------------------------------

    /**
     * @doc method
     * @name onStateChangeSuccess
     * @param {Object} event The event
     * @param {Object} new_state The new state
     * @description
     *
     * Handles when a request to change the state has been made.
     */
    function onStateChangeSuccess(event, new_state, new_params, old_state) {
        new_state = new_state || $state.current;
        if (new_state && new_state === old_state) { return; }
        $scope.context = "";
        var data = new_state.data || {};

        // Update the context (CSS class) for content styling.
        $scope.context = data.context || "";
    }

    //--------------------------------------------------------------------------
    // INITIALIZATION
    //--------------------------------------------------------------------------

    $scope.$on("$stateChangeSuccess", onStateChangeSuccess);

}]);
