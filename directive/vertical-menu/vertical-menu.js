/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("verticalMenu", function($uibModal, Utils) {
    "use strict";
    function linkFn(scope) {
        //--------------------------------------------------------------------------
        // Private Properties
        //--------------------------------------------------------------------------
        var _tabs = [
                { title: "Electronic Music News", id: "edm", },
                { title: "Hip-Hop News", id: "hiphop", },
                { title: "Loop Masters", id: "loop_masters", },
                { title: "Moog News", id: "moog", },
                { title: "Hardware / Software", id: "hard_soft", },
                { title: "New Products", id: "gear", },
                { title: "Other News", id: "other", },
                { title: "Tech Crunch", id: "tech_crunch", },
            ],
            _model = {
                title : "Top News",
                tabs : _tabs,
                is_open: true,
                is_closing: false,
                show_indicator: true
            },
            _modal_promise = null;

        scope.model = _model;

        //--------------------------------------------------------------------------
        // Private Functions
        //--------------------------------------------------------------------------

        //--------------------------------------------------------------------------
        // Private Event
        //--------------------------------------------------------------------------
        scope.onClicked = function(event, title) {
            event.stopPropagation();
            var item = _.findWhere(_tabs, { title: title }),
                artist_search_template = [
                    "<button class=\"submit-button nav-button active\" ",
                        "data-ng-click=\"onDismiss()\">Close</button>",
                    "<div data-artist-api></div>"
                ].join(""),

                rss_feed_template = [
                    "<button class=\"submit-button nav-button active\" ",
                        "data-ng-click=\"onOpenClose();onDismiss()\">Close</button>",
                    "<div data-rss-feed data-news=\"model.news\"></div>"
                ].join(""),
                template = "";

            _model.news = item && item.id;
            _model.is_open = false;

            template = item ? rss_feed_template : artist_search_template;

            _modal_promise = $uibModal.open({
                windowClass: "special-features-dialog-container",
                scope: scope,
                template: template,
                controller: function($scope, $uibModalInstance) {
                    $uibModalInstance.opened
                    .then(function() {
                        _model.show_indicator = false;
                    });
                    $uibModalInstance.result
                    .catch(function() {
                        _model.show_indicator = true;
                    })
                    .finally(function() {
                        _modal_promise = null;
                    });

                    $scope.onDismiss = $uibModalInstance.dismiss;
                }
            });
        };

        scope.onMouseEvent = function(mouse_event) {
            _model.is_open = mouse_event === "in";
            if (_model.is_open) {
                _model.is_closing = true;
                    // Allow the nav to close before a mouseover triggers
                    Utils.createTimer(1000)
                    .finally(function() {
                        _model.is_closing = false;
                    });
            }
        };

        scope.onOpenClose = function() {
            _model.is_open = !_model.is_open;
        };

        //--------------------------------------------------------------------------
        // INITIALIZATION
        //--------------------------------------------------------------------------
        scope.$on("$stateChangeSuccess", function() {
            if (_model.is_open) { _model.is_open = false; }
        });
    }

    return {
        replace: true,
        restrict: "E",
        templateUrl: "directive/vertical-menu/vertical-menu.html",
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
