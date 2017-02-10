
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("rssRibbon", function($state, $location, $interval, $http, $timeout, $window, FeedService, hotkeys, Utils) {
    "use strict";

    var linkFn = function(scope){
        var _params = $state.params,
            _items = [],
            _index = parseInt(_params.index, 10) || 0,
            _slide_interval_promise = null,
            _model = {
                feed: {},
                image_thumbnail: null,
                should_display: false,
                active_slide_index: 0,
                is_mobile: $window.is_mobile,
                slides: [],
                state: ""
            };

        scope.model = _model;
        scope.feeds = [];
        //----------------------------------------------------------------------
        // METHODS (PRIVATE)
        //----------------------------------------------------------------------

        function getRssFeed() {
            $window.is_loading = true;
            var feed = scope.news || FeedService.RSS_FEEDS[0];
            var url = feed && feed.url || null;
            FeedService.parseFeed(url)
            .then(function(response) {
                _items = response && response.data.items;
                scope.feeds = _items[_index];
                _model.should_display = true;
                _model.active_slide_index = _index;
                _model.slides = _items;
                $state.go($state.current.name,{ id: feed.id, index: _index })
                    .then(function(){
                        _model.state = $location.absUrl();
                    });
            })
            .finally(function() {
                $window.is_loading = false;
            });
            // .then(scrapeDomainData);

            _slide_interval_promise = $interval(getItemAtIndex,60000);
        }
        // function scrapeDomainData() {
        //     var link = _model.feed && _model.feed.link;
        //     if (!link) { return; }
        //     FeedService.get(_model.feed.link)
        //     .then(parseResponse);
        // }
        // function parseResponse(response) {
        //     var tmp = document.implementation.createHTMLDocument();

        //     tmp.body.innerHTML = response;

        //     // var images = $(tmp.body.children).find("img"),
        //     var images = $(tmp.body.children).find("img.attachment-cb-full-full.size-cb-full-full.wp-post-image"),
        //         image = _.first(images);

        //     _model.image_thumbnail = $(image).attr("src");

        // }

        /**
         * @doc method
         * @name getItemAtIndex
         * @description
         *
         * Gets the index item.
         */
        function getItemAtIndex(direction) {
            var items_length = _items.length - 1;

            if (direction === "left") {
                _index = _index <= 0 ? items_length : _index -1 ;
            } else {
                _index = _index >= items_length ? 0 : _index +1;
            }

            _model.feed = _items[_index];
            _model.active_slide_index = _index;
            _model.should_display = false;
            // var feed = scope.news || FeedService.RSS_FEEDS[0];
            // $state.go($state.current.name,{ id : feed.idx, index: _index })
            //     .then(function(){
            //         _model.state = $location.absUrl();
            //     });

            Utils.createTimer(100)
                .then(function(){
                    _model.should_display = true;

                });
            // scrapeDomainData();
        }

        /**
         * @doc method
         * @name addHotkeysForScope
         * @description
         *
         * Adds handlers for various key events that apply to this scope (and deleted when it is destroyed).
         */
        function addHotkeysForScope() {

            var createCallback = function(direction) {
                return function(event) {
                    event.preventDefault();
                    getItemAtIndex(direction);
                    reset();
                };
            };

            hotkeys.bindTo(scope)
                .add({
                    // Go to the (full) Guide section
                    combo: "left",
                    allowIn: ["INPUT"], // i.e. search input
                    callback: createCallback("left")
                })
                .add({
                    // Go to the (full) Guide section
                    combo: "right",
                    allowIn: ["INPUT"], // i.e. search input
                    callback: createCallback("right")
                });
        }

        /**
         * @doc method
         * @name reset
         * @description
         *
         *
         */
        function reset() {
            if (_slide_interval_promise) {
                $interval.cancel(_slide_interval_promise);
                _slide_interval_promise = null;
            }
        }

        /**
         * @doc method
         * @name scroll
         * @description
         *
         *
         */
        function scroll(int) {
            if (_.isFinite(int) && int <= 6) {
                return;
            }

            var delay = 500,
                id = "#" + _index,
                ind = $(id),
                position = ind.hasClass("ng-scope") && ind.position(),
                left = position && position.left;

            if (!left) {
                $timeout(scroll, delay);
                return;
            }

            $timeout(function() {
                $(".indicators").animate({scrollLeft: left}, delay);
            });
        }

        //----------------------------------------------------------------------
        // METHODS (PRIVILEGED)
        //----------------------------------------------------------------------

        /**
         * @doc method
         * @name onButtonClicked
         * @description
         *
         * Left Right Item.
         */
        scope.onButtonClicked = function(direction) {
            reset();

            getItemAtIndex(direction);
        };

        /**
         * @doc method
         * @name onIndicatorClicked
         * @description
         *
         * Left Right Item.
         */
        scope.onIndicatorClicked = function(index) {
            reset();
            _model.feed = _items[index];
            _model.active_slide_index = _index = index;
            $state.go($state.current.name,{ index: _index })
                .then(function(){
                    _model.state = $location.absUrl();
                });
        };
        function onDestroy() {
            reset();
            $state.go($state.current.name,{ id: null, index: null });
        }
        //----------------------------------------------------------------------
        // INITIALIZATION
        //----------------------------------------------------------------------

        getRssFeed();
        addHotkeysForScope();
        scope.$on("$destroy", onDestroy);
        scope.$watch("model.active_slide_index", scroll);
    };
    return {
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        // replace: true,
        scope: {
            news: "=?"
        },
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/rss-ribbon/rss-ribbon.html",
        link: linkFn
    };
});
