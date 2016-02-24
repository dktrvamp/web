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
angular.module("Dktrvamp").service("ArtistInvoice", function($q, $timeout, $http, Utils) {
    "use strict";

    // var _self = this;

    //--------------------------------------------------------------------------
    // PROPERTIES (PUBLIC)
    //--------------------------------------------------------------------------
    this.artist_results = {};

    //--------------------------------------------------------------------------
    // METHODS (PUBLIC)
    //--------------------------------------------------------------------------
    this.fetchResults = function(artist, search_engine) {
        search_engine = search_engine.toLowerCase() || "";
        if (!search_engine) { return; }

        var engine = {
                spotify : "https://api.spotify.com/v1/search?q={{artist}}&type=album",
                soundcloud : "http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&api_key=95f77e98ba4b1144bcf1b6399c3f05d7",
                lastfm: "http://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist={{artist}}&api_key=b41174ec667c51018919b2c7924594b8&format=json" //a1d8cd40b504e64f7a4d41d23ba8483a shared
            },
            url;

        switch(search_engine) {
            case "spotify":
                url = engine.spotify;
                break;
            case "lastfm":
                url = engine.lastfm;
                break;
            case "soundcloud":
                url = engine.soundcloud;
                break;
            default:
                url = engine.spotify;

        }

        if (!_.isString(url)) {
            return $q.reject();
        }

        url = Utils.replaceTokens(url, { artist: artist }, true);
        return $http.get(url).then($q.resolve);
    };
});


// 95f77e98ba4b1144bcf1b6399c3f05d7
