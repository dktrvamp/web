
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("rssFeed", function($interval, $http, FeedService, hotkeys, Utils) {
    "use strict";

    var linkFn = function(scope){
        var _model = {
            feed: {},
            image_thumbnail: null,
            should_display: false
        },
        _items = [],
        _index = 0,
        _slide_interval_promise = null;

        scope.model = _model;

        //----------------------------------------------------------------------
        // METHODS (PRIVATE)
        //----------------------------------------------------------------------

        function getRssFeed() {
            //http://feeds.feedburner.com/TechCrunch
            FeedService.parseFeed("http://www.youredm.com/feed/")
            .then(function(response) {
                _items = response && response.data.responseData.feed.entries;

                _model.feed = _items[_index];
                _model.should_display = true;
            })
            .then(scrapeDomainData);

            _slide_interval_promise = $interval(getItemAtIndex,30000);
        }
        function scrapeDomainData() {
            FeedService.get(_model.feed.link)
            .then(parseResponse)
            .catch(function(er) {

            });
        }
        function parseResponse(response) {
            // if (!_.isEmpty(_failed_requests) || !response) { return; }
            _model.image_thumbnail = _.isString(response) && response || "";
            // console.log(response);
            // var tmp = document.implementation.createHTMLDocument();
            // tmp.body.innerHTML = response.data;

            // var images = $(tmp.body.children).find("img.attachment-cb-full-full.size-cb-full-full.wp-post-image"),
            //     image = _.first(images);
            // console.log(image);
            // _model.image_thumbnail = $(image).attr("src");
            // console.log(_model.image_thumbnail);
        }

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

            _model.should_display = false;

            Utils.createTimer(300)
                .then(function(){
                    _model.should_display = true;

                });
            scrapeDomainData();
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

        //----------------------------------------------------------------------
        // INITIALIZATION
        //----------------------------------------------------------------------

        getRssFeed();
        addHotkeysForScope();
        scope.$on("$destroy", reset);

    };

    return {
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        replace: true,
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/rss-feed/rss-feed.html",
        link: linkFn
    };
});
