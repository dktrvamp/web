/**
 * @ngdoc controller
 * @name MainCtrl
 * @requires $scope
 * @requires $state
 * @requires $window
 * @description
 *
 * Controller for the main element.
 */
angular.module("Dktrvamp").controller("MainCtrl",["$scope", "$state", "$window", "Utils", function($scope, $state, $window, Utils) {
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PRIVILEGED)
    //--------------------------------------------------------------------------
    $scope.model = {};
    $scope.context = null;
    $scope.model.is_loading = true;
    // $scope.enabled_nav = true;

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
        var data = new_state.data || {};

        // Update the context (CSS class) for content styling.
        $scope.context = data.context || "";
        if (new_state && !old_state) {
            $scope.model.is_loading = true;
            Utils.createTimer(1500).finally(function(){
                $scope.model.is_loading = false;
            });

        }
        if ($window.ga) {
            $window.ga("send", "pageview", $state.current.name);
        }
    }

    /**
     * @doc method
     * @name onWindowDragDrop
     * @param {Object} event The event object.
     * @description
     *
     * Handles when something is dragged and dropped onto the app. We want to disallow this behavior.
     */
    function onWindowDragDrop(event) {
        event.preventDefault();
    }

    /**
     * @doc method
     * @name onDestroy
     * @description
     *
     *
     * Cleans up memory, event handlers
     */
    function onDestroy() {
        $($window).off("dragover", onWindowDragDrop);
        $($window).off("drop", onWindowDragDrop);
    }

    //--------------------------------------------------------------------------
    // INITIALIZATION
    //--------------------------------------------------------------------------
    (function() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $scope.model.is_mobile = true;
        }
    })();
    onStateChangeSuccess(null, $state.current);

    $scope.$on("$stateChangeSuccess", onStateChangeSuccess);
    $scope.$on("$destroy", onDestroy);

    // Prevent users from dropping files onto the application which can crash the app or load a new URL.
    $($window).on("dragover", onWindowDragDrop);
    $($window).on("drop", onWindowDragDrop);
}]);
