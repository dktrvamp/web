// https://freemusicarchive.org/api/docs/
// I3BCD2KQCWZ44ZY2
// http://freemusicarchive.org/api/get/{dataset}.{format}?api_key={yourkey}
// http://freemusicarchive.org/api/get/curators.xml?api_key=I3BCD2KQCWZ44ZY2
// http://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("wave", function() {
    "use strict";


    return {
        replace: true,
        // require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: "directive/visual-animation/wave.html",
        controller : function($scope, $element) {
            var _window_width = parseInt($($element).css("width"),10),
                _max_width = _window_width,
                _delay =  0,
                _height = 30;
            $scope.bars = [];

            function load() {
                for(var i = 0; i < _max_width; i++) {
                    var color = "#"+Math.floor(Math.random()*16777215).toString(16);
                    _delay = _delay - 5;
                    $scope.bars.push({id: i, color: color, height: _height, delay : _delay });
                }
            }
            load();

            $scope.$on("$destroy", function(){
                $scope.bars = [];
            });

        }

    };
});
