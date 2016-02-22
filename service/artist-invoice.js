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

    this.fetchResults = function(artist) {
        var url = "http://musicbrainz.org/ws/2/artist/?query=artist:{{artist}}&fmt=json";//"http://musicbrainz.org/ws/2/artist/{{aliases}}?inc={{aliases}}&fmt=json"
        url = Utils.replaceTokens(url, {
            artist: artist

        }, true);
        return $http.get(url)
            .then($q.resolve);
// encodeURIComponent()
    };
});