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
angular.module("Dktrvamp").service("FeedService", function($http, $q){
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PPRIVATE)
    //--------------------------------------------------------------------------

    this.parseFeed = function(url){
        var dfd = $q.defer(),
            google_apis = "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=";
        $http.jsonp( google_apis+ encodeURIComponent(url))
        .then(dfd.resolve)
        .catch(function(er) {
            dfd.reject(er);
        });

        return dfd.promise;

    };
    this.get = function(url) {
        var dfd = $q.defer();

        $http.get(url)
        .then(dfd.resolve)
        .catch(function(er) {
            dfd.reject(er);
        });

        return dfd.promise;
    };
});
