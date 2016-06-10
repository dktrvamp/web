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
angular.module("Dktrvamp").controller("MainCtrl",["$scope", "$state", "$window", "hotkeys", function($scope, $state, $window, hotkeys) {
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PRIVILEGED)
    //--------------------------------------------------------------------------

    $scope.context = null;
    $scope.enabled_nav = false;

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
    function onStateChangeSuccess(event, new_state) {
        new_state = new_state || $state.current;
        var data = new_state.data || {};

        // Update the context (CSS class) for content styling.
        $scope.context = data.context || "";
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

    /**
     * @doc method
     * @name addHotkeysForScope
     * @description
     *
     * Adds handler for navigating the menu tabs via keyboard (and deleted when it is not in an User state).
     */
    function addHotkeysForScope() {
        hotkeys.bindTo($scope)
        .add({
            combo: "w",
            callback: function(event) {
                event.preventDefault();
                $scope.enabled = !$scope.enabled;
            }
        });
    }

    //--------------------------------------------------------------------------
    // INITIALIZATION
    //--------------------------------------------------------------------------

    addHotkeysForScope();
    onStateChangeSuccess(null, $state.current);

    $scope.$on("$stateChangeSuccess", onStateChangeSuccess);
    $scope.$on("$destroy", onDestroy);

    // Prevent users from dropping files onto the application which can crash the app or load a new URL.
    $($window).on("dragover", onWindowDragDrop);
    $($window).on("drop", onWindowDragDrop);
}]);
