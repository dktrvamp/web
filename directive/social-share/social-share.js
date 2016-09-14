/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("socialShare", function($location, $timeout){
    "user strict";
    // Runs during compile
    return {
        // name: "",
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        link: function(scope) {
            var _model = {
                    should_show: false
                },
                _timeout_promise = null;

            scope.model = _model;
            scope.parent_model = scope.$parent.$parent.model;
            scope.parent_model = {
                state : scope.parent_model.state || $location.absUrl(),
                feed  : scope.parent_model.feed || { title: "Drvaudio.com Home Page 😡🎼🎧🎹🎤" }
            };

            function update() {
                _model.should_show = false;
                _timeout_promise = $timeout(angular.noop, 500);
                _timeout_promise.finally(function(){
                    _model.should_show = true;
                    $timeout.cancel(_timeout_promise);
                     _timeout_promise = null;
                 });
            }
            update();

            scope.onFbClick = function() {
                var FB = window.FB;
                FB.ui({
                    method: "share",
                    display: "popup",
                    mobile_iframe: true,
                    href: scope.parent_model.state,
                },function(response){
                    console.log(response);
                });
            };




    // <div class="fb-share-button" data-layout="standard" data-mobile-iframe="true" data-action="like" data-show-faces="true" data-share="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u&amp;src=sdkpreparse">Share</a></div>
        // end
        },
        scope: true,
        replace: true,
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: "E", // E = Element, A = Attribute, C = Class, M = Comment
        // template: "",
        templateUrl: "directive/social-share/social-share.html"
    };
});
