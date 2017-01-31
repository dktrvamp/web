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
        var dfd = $q.defer();
            // yahoo_apis = "//query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(url) + "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
            // google_apis = "//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=";
            // https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.youredm.com%2Ffeed%2F
        // url = encodeURIComponent(url);
        $http.get("https://api.rss2json.com/v1/api.json",{
            params: {
                rss_url: url,
                api_key: "u0dir3grn8zpbsz1ljwduwtxo1sqn9cw1cpo4uhd"

            }
        })
        .then(dfd.resolve)
        .catch(function(er) {
            dfd.reject(er);
        });

        return dfd.promise;

    };
    this.get = function(url) {
        var dfd = $q.defer();

        $http({
            url: "http://www.drvaudio.com/php/getImage.php",
            method: "post",
            data: {url: url}
        })
        .then(function(res){
            if (_.isString(res.data)) {
                dfd.resolve(res.data);
            }
        })
        .catch(function(er) {
            if (_.isString(er.data)) {
                dfd.resolve(er.data);
            } else {
                dfd.reject(er);
            }

        });

        return dfd.promise;
    };
});
