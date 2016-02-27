/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("artistContent", function($log, ArtistInvoice){

    function linkFn(scope) {

        //--------------------------------------------------------------------------
        // PROPERTIES (PRIVATE)
        //--------------------------------------------------------------------------

        var _model = {};

        //--------------------------------------------------------------------------
        // PROPERTIES (PUBLIC)
        //--------------------------------------------------------------------------

        scope.model = _model;

        //----------------------------------------------------------------------
        // METHODS (PRIVILEGED)
        //----------------------------------------------------------------------

        /**
         * @doc method
         * @name searchArtist
         * @description
         *
         * Handle when the button is activated (via a click or enter key press).
         */
        scope.searchArtist = function() {

            var promise = ArtistInvoice.fetchResults(_model.artist, scope.type);

            promise.then(load)
            .catch(function(){
                $log.info("Dir.ArtistContent - failed to fetch data from the content directive");
            });
        };

        /**
         * @doc method
         * @name load
         * @param {Object} response
         * @description
         *
         * Loads the response data for the Artist Search Results.
         */
        function load(response) {
            var data = response.data,
                result = data && data.toptracks || data.albums,
                top_tracks;

            _model.items = result && result.items || {};

            top_tracks = _model.type === "LastFm" ? result.track : null || [];
            if (top_tracks.length) {
                _.each(top_tracks, function(item){
                    _.each(item.image, function(image) {
                        var value = image && image[Object.keys(image)[0]];
                        image.url = value;
                    });
                });
            }

            _model.toptracks = top_tracks;
        }


        /**
         * @doc method
         * @name onSearchEngineChanged
         * @param {Object} new_val
         * @description
         *
         * Executes the search.
         */
        function onSearchEngineChanged(new_val) {
            if(new_val) {
                _model.items = [];
            }
            console.log("Search Enigne changed to: ", new_val);
            _model.type = new_val;
        }

        //----------------------------------------------------------------------
        // INITIALIZATION
        //----------------------------------------------------------------------

        scope.$watch("type", onSearchEngineChanged);

    }
    // Runs during compile
    return {
        // name: "",
        // priority: 1,
        // terminal: true,
        scope: {  type: "=?"}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        replace: true,
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        // template: "",
        link: linkFn,
        templateUrl: "directive/artist-content/artist-content.html"
    };
});
