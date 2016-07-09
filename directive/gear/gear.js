/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("gearSlide", function($http, $interval, hotkeys, Utils){
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
            var promise = $http.get("locale/studio-gear.json");
            promise
                .then(function(response){
                    _items = response.data;
                    _model.item = _items[_index];
                })
                .then(getItemAtIndex)
                .catch(function(){
                    element.remove();
                });

            _slide_interval_promise = $interval(getItemAtIndex,60000);
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

        /**
         * @doc method
         * @name addHotkeysForScope
         * @description
         *
         * Adds handlers for various key events that apply to this scope (and deleted when it is destroyed).
         */
        function addHotkeysForScope() {

            var createCallback = function(direction) {
                return function(event) {
                    event.preventDefault();
                    getItemAtIndex(direction);
                    reset();
                };
            };

            hotkeys.bindTo(scope)
                .add({
                    // Go to the (full) Guide section
                    combo: "left",
                    allowIn: ["INPUT"], // i.e. search input
                    callback: createCallback("left")
                })
                .add({
                    // Go to the (full) Guide section
                    combo: "right",
                    allowIn: ["INPUT"], // i.e. search input
                    callback: createCallback("right")
                });
        }

        /**
         * @doc method
         * @name reset
         * @description
         *
         *
         */
        function reset() {
            if (_slide_interval_promise) {
                $interval.cancel(_slide_interval_promise);
                _slide_interval_promise = null;
            }
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
            reset();

            getItemAtIndex(direction);

        };



        //----------------------------------------------------------------------
        // INITIALIZATION
        //----------------------------------------------------------------------

        update();
        addHotkeysForScope();
    };
    return {
        replace: true,
        restrict: "A", // E = Element, A = Attribute, C = Class, M = Comment
        scope: {},
        // template: "",
        templateUrl: "directive/gear/gear.html",
        link: linkFn
    };
});
