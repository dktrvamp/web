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
    this.RSS_FEEDS = [
        { title: "Music News", id: "feedburner", url: "http://feeds.feedburner.com/thr/music" },
        { title: "Electronic Music News", id: "edm", url: "http://www.youredm.com/feed/" },
        { title: "Hip-Hop News", id: "hiphop", url: "http://hiphopwired.com/feed/" },
        { title: "Moog News", id: "moog", url: "https://www.moogmusic.com/blog/feed" },
        { title: "Hardware / Software", id: "hard_soft", url: "http://www.tuerkmusic.co.za/index.php/blog/rss" },
        { title: "New Products", id: "gear", url: "http://feeds.webservice.techradar.com/us/rss/news/audio" },
        { title: "Other News", id: "other", url: "http://www.sickfacemusic.com/feed.xml" },
        { title: "Tech Crunch", id: "tech_crunch", url: "http://feeds.feedburner.com/TechCrunch/Google" },
        { title: "Tech", id: "tech", url: "http://feeds.feedburner.com/TheHollywoodReporter-Technology"},
        { title: "Music Instruments", id: "musical_instruments", url: "http://www.chucklevins.com/rss.php?type=rss" },
        { title: "Musicians Information", id: "musicians_information", url: "http://www.musicthinktank.com/blog/rss.xml" },
        { title: "Producers Tips", id: "producer_tips", url: "http://feeds.feedburner.com/weallmakemusic" },
        { title: "Musicians Perspective", id: "musicians_perspective", url: "http://www.newrockstarphilosophy.com/feed/" },
        { title: "Hollywood", id: "hollywood", url:"http://feeds.feedburner.com/thr/news"},
        { title: "Music Feed", id: "music_1", url: "http://www.synthtopia.com/phpbb2/feed.php"},
        { title: "Vst News", id: "vst_1", url:"http://feeds.feedburner.com/getthatprosound"},
        { title: "Vst News II", id: "vst_2", url:"http://feeds.feedburner.com/ProducerSpot?format=xml" },
        { title: "Roland", id: "vst_3", url:"http://www.rolandus.com/blog/feed/" },
        { title: "Vintage Gear", id: "vintage_gear",url:"http://feeds.feedburner.com/vintagesynth" },
    ];
    this.RSS = this.RSS_FEEDS;

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
