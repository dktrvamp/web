/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("gearSlide", function($http, $interval, Utils){
    var linkFn = function(scope, element) {
        var _model = {
            should_display: false,
            item: {},
            image: ""
        },
        _items = [],
        _index = 0,
        _slide_interval_promise = null;

        scope.model = _model;

        //----------------------------------------------------------------------
        // METHODS (PRIVATE)
        //----------------------------------------------------------------------

        /**
         * @doc method
         * @name update
         * @description
         *
         * Handles when item changes
         */
        function update() {
            console.log(arguments);
            var promise = $http.get("locale/studio-gear.json"),
                items;
            promise
                .then(function(response){
                    _items = response.data;
                    _model.item = _items[_index];
                })
                .then(getItemAtIndex)
                .catch(function(){
                    element.remove();
                });

            _slide_interval_promise = $interval(getItemAtIndex,7000);
        }

        /**
         * @doc method
         * @name getItemAtIndex
         * @description
         *
         * Gets the index item.
         */
        function getItemAtIndex(direction) {
            var items_length = _items.length - 1;

            if (direction === "left") {
                _index = _index <= 0 ? items_length : _index -1 ;
            } else {
                _index = _index >= items_length ? 0 : _index +1;
            }
            _model.item = _items[_index];

            _model.should_display = false;

            Utils.createTimer(300)
                .then(function(){
                    _model.should_display = true;

                });
        }

        //----------------------------------------------------------------------
        // METHODS (PRIVILEGED)
        //----------------------------------------------------------------------

        /**
         * @doc method
         * @name onButtonClicked
         * @description
         *
         * Left Right Item.
         */
        scope.onButtonClicked = function(direction) {
            if (_slide_interval_promise) {
                $interval.cancel(_slide_interval_promise);
                _slide_interval_promise = null;
            }

            getItemAtIndex(direction);

        };


        //----------------------------------------------------------------------
        // INITIALIZATION
        //----------------------------------------------------------------------

        update();
    };
    return {
        replace: true,
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        // template: "",
        templateUrl: "directive/gear/gear.html",
        link: linkFn
    };
});
