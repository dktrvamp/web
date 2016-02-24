/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("sideBar", function($uibModal) {
    "use strict";
    function linkFn(scope) {
        //--------------------------------------------------------------------------
        // Private Properties
        //--------------------------------------------------------------------------
        scope.tabs = [
            { title: "DAW" },
            { title: "VST" },
            { title: "TOOLS" },
            { title: "OS" }
        ];
        scope.selected_tab = "";
        //--------------------------------------------------------------------------
        // Private Functions
        //--------------------------------------------------------------------------

        //--------------------------------------------------------------------------
        // Private Event
        //--------------------------------------------------------------------------
        scope.onTopArtistClick = function(event, title) {
            scope.selected_tab = title;
            $uibModal.open({
                windowClass: "special-features-dialog-container",
                scope: scope,
                templateUrl: "modals/gear.html",
                controller: "gearCtrl"
            });
        };
        //--------------------------------------------------------------------------
        // INITIALIZATION
        //--------------------------------------------------------------------------

    }

    return {
        replace: true,
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: "E", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/side-bar/side-bar.html",
        link: linkFn
    };
})
.animation(".slide-side", function() {
    return {
        enter: function (element, doneFn) {
            element.css("opacity", 0.5).animate({ opacity : 1 }, 1250, "ease-in", doneFn);
        }
    };
});
