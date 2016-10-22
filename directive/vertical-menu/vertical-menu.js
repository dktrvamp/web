/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("verticalMenu", function($state, $uibModal, Utils) {
    "use strict";
    function linkFn(scope) {
        //--------------------------------------------------------------------------
        // Private Properties
        //--------------------------------------------------------------------------
        var _tabs = [
                { title: "Music News", id: "feedburner", },
                { title: "Electronic Music News", id: "edm", },
                { title: "Hip-Hop News", id: "hiphop", },
                { title: "Moog News", id: "moog", },
                { title: "Hardware / Software", id: "hard_soft", },
                { title: "New Products", id: "gear", },
                { title: "Other News", id: "other", },
                { title: "Tech Crunch", id: "tech_crunch", },
                { title: "Tech", id: "tech", },
                { title: "Music Instruments", id: "musical_instruments", },
                { title: "Musicians Information", id: "musicians_information", },
                { title: "Producers Tips", id: "producer_tips", },
                { title: "Musicians Perspective", id: "musicians_perspective", },
                { title: "Hollywood", id: "hollywood", },
                { title: "Music Feed", id: "music_1", },
                { title: "Vst News", id: "vst_1", },
                { title: "Vst News II", id: "vst_2", },
                { title: "Roland", id: "vst_3", },
                { title: "Vintage Gear", id: "vintage_gear", },
            ],

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

            _model = {
                news: null,
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
        scope.onClicked = function(event, tab) {
            if (event) {
                event.stopPropagation();
            }

            var template = "";

            _model.news = tab && tab.id;
            _model.is_open = false;

            template = tab && _.findWhere(_tabs, { id: tab.id }) ? rss_feed_template : artist_search_template;

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
        (function() {
            var params = $state.params,
                id = params && params.id;
            if (id) {
                scope.onClicked(null, { id : params.id});
            }
        })();

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
