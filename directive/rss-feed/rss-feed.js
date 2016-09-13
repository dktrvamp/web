
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("rssFeed", function($state, $location, $interval, $http, $window, FeedService, hotkeys, Utils) {
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
                active_slide_index: _index,
                is_mobile: $window.is_mobile,
                slides: [],
                state: $location.absUrl()
            },
            _NEWS = {
                "edm" : "http://www.youredm.com/feed/",
                "hiphop": "http://hiphopwired.com/feed/",
                "other" : "http://www.sickfacemusic.com/feed.xml",
                "gear" : "http://feeds.webservice.techradar.com/us/rss/news/audio",
                "loop_masters" : "http://loopmasters.vbfpmedia.com/feed",
                "moog" : "https://www.moogmusic.com/blog/feed",
                "hard_soft" : "http://www.tuerkmusic.co.za/index.php/blog/rss",
                "tech_crunch" : "http://feeds.feedburner.com/TechCrunch/Google",
                "musical_instruments" : "http://www.amazon.com/gp/rss/bestsellers/musical-instruments/11970041/ref=zg_bs_11970041_rsslink",
                "musicians_information" : "http://www.musicthinktank.com/blog/rss.xml",
                "producer_tips" : "http://feeds.feedburner.com/weallmakemusic",
                "musicians_perspective" : "http://www.newrockstarphilosophy.com/feed/",
            };
        console.log(_model.state, $location);
        scope.model = _model;

        //----------------------------------------------------------------------
        // METHODS (PRIVATE)
        //----------------------------------------------------------------------

        function getRssFeed() {
            var feed_url = _NEWS[scope.news] || scope.news;

            FeedService.parseFeed(feed_url)
            .then(function(response) {
                _items = response && response.data.responseData.feed.entries;

                _model.feed = _items[_index];
                _model.should_display = true;
                _model.slides = _items;
                $state.go($state.current.name,{ id: scope.news, index: _index });
            })
            .then(scrapeDomainData);

            _slide_interval_promise = $interval(getItemAtIndex,60000);
        }
        function scrapeDomainData() {
            var link = _model.feed && _model.feed.link;
            if (!link) { return; }
            FeedService.get(_model.feed.link)
            .then(parseResponse);
        }
        function parseResponse(response) {
            var tmp = document.implementation.createHTMLDocument();

            tmp.body.innerHTML = response;

            // var images = $(tmp.body.children).find("img"),
            var images = $(tmp.body.children).find("img.attachment-cb-full-full.size-cb-full-full.wp-post-image"),
                image = _.first(images);

            _model.image_thumbnail = $(image).attr("src");

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
            removeDouplicateImages();
            _model.feed = _items[_index];
            _model.active_slide_index = _index;
            _model.should_display = false;

            $state.go($state.current.name,{ id : scope.news, index: _index });
            Utils.createTimer(100)
                .then(function(){
                    _model.should_display = true;

                });
            scrapeDomainData();
        }

        function removeDouplicateImages() {
            // TODO FIX THIS
            // var tmp = document.implementation.createHTMLDocument(),
            //     seen = {},
            //     images;

            // tmp.body.innerHTML =  _items[_index].content;


            // images = $(tmp.body).find("img");

            // // console.log(images);

            // _.each(images, function(img) {
            //     var src = $(img).attr("src");

            //     if (seen[src]) {
            //         var element = angular.element($(img))[0];
            //         element[0].remove();
            //         element.addClass(".is-dup");
            //         console.log("----- should remove", img, angular.element($(img)));
            //     }
            //     else{
            //         seen[src] = true;
            //     }
            // });

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
            $state.go($state.current.name,{ index: _index });
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
        // replace: true,
        scope: {
            news: "=?"
        },
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/rss-feed/rss-feed.html",
        link: linkFn
    };
});
