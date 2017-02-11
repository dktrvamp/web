/**
 * @ngdoc service
 * @name ArtistInvoice
 * @requires $state
 * @requires $timeout
 * @requires Utils
 * @description
 *
 *
 */
angular.module("Dktrvamp").service("RssRibbon", function($http, $q, FeedService){
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PPRIVATE)
    //--------------------------------------------------------------------------
    this.FEEDS = FeedService.RSS;

    this.getRssFeeds = function() {
        var RSS_FEEDS = FeedService.RSS_FEEDS;
        var dfd = $q.defer();
        var promise;
        var feeds = [];

        promise = FeedService.parseFeed(RSS_FEEDS[0].url)
            .then(function(response) {
                var data = response && response.data;
                if (data) {
                    feeds.push(data);
                }
                return FeedService.parseFeed(RSS_FEEDS[3].url)
                    .then(function(response) {
                        var data = response && response.data;
                        if (data) {
                            feeds.push(data);
                        }
                    })
                    .finally(function() {
                        dfd.resolve(feeds);
                    })
            });

        return dfd.promise;

    };
    this.filterFeeds = function() {
        console.log
    };

});
