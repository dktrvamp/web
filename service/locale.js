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
angular.module("Dktrvamp").service("Locale", function($http) {
    "use strict";

    // var _self = this;

    //--------------------------------------------------------------------------
    // PROPERTIES (PUBLIC)
    //--------------------------------------------------------------------------
    // this.locale = {};

    //--------------------------------------------------------------------------
    // METHODS (PUBLIC)
    //--------------------------------------------------------------------------
    this.getLocale = function() {
        return $http.get("locale/gear.json").then(function(response){
            return response.data;
        });
    };
});
