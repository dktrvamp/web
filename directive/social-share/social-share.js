/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("socialShare", function($location, $timeout, Facebook){
    "user strict";
    // Runs during compile
    function link(scope) {
        var _model = {
                should_show: false
            },
            _timeout_promise = null;

        scope.model = _model;
        scope.parent_model = scope.$parent.$parent.model;
        scope.parent_model = {
            state : scope.parent_model.state || $location.absUrl(),
            feed  : scope.parent_model.feed ||
                {
                    title: "Drvaudio.com Home Page",
                    contentSnippet: "😡🎼🎧🎹🎤"
                }
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

        function getImageUrl() {
            var content = scope.parent_model.feed.content,
                url = "http://res.cloudinary.com/www-drvaudio-com/image/upload/v1472971318/drv-logo_odaevq.png",
                img;
            if (!content) {
                return url;
            }

            img = angular.element(content).find("img");
            return img && img[0] && img[0].src || url;
        }

        scope.onFbClick = function() {
            Facebook.share({
                url : scope.parent_model.state,
                img_url : getImageUrl(),
                caption : scope.parent_model.feed.title,
                description : scope.parent_model.feed.contentSnippet
            });
        };

        update();

    }

    return {
        link: link,
        scope: true,
        replace: true,
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: "E", // E = Element, A = Attribute, C = Class, M = Comment
        // template: "",
        templateUrl: "directive/social-share/social-share.html"
    };
});
