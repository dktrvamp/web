/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp")
    .directive("artistContent", function(ArtistInvoice){

        function linkFn(scope) {
            var _model = {};
            scope.model = _model;

            scope.searchArtist = function() {

                var promise = ArtistInvoice.fetchResults(_model.artist);
                promise.then(load)
                .catch(function(){
                    alert("failed");
                });
            };

            function load(response) {
                var data = response.data,
                    artists = data && data.artists;
                _model.artists = artists;
                console.log(_model.artists);
            }
        }
        // Runs during compile
        return {
            // name: "",
            // priority: 1,
            // terminal: true,
            scope: true, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
            // replace: true,
            restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
            // template: "",
            link: linkFn,
            templateUrl: "directive/content/content.html"
        };
    });