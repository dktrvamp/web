/**
 * @ngdoc controller
 * @name topArtistCtrl
 * @description
 *
 *
 */
angular.module("Dktrvamp").controller("gearCtrl", ["$scope", "Locale", "Utils", function ($scope, Locale, Utils) {

    var _model = {},
        _selected_tab = $scope.$parent.selected_tab.toLowerCase();

    $scope.model = _model;



    /**
     * @doc method
     * @name loadDataForTab
     * @description
     *
     *
     */
    function loadDataForTab() {
        var http_promise;

        http_promise = Locale.getLocale();

        http_promise.then(function(result){
            var gears = result, item;

            item = Utils.getAttributeOrMetadata(gears, _selected_tab)[0];
            _model.image = item.image;
            _model.content = item.content;
            _model.others = item.others;
            console.log(item);
        });
    }


    //--------------------------------------------------------------------------
    // INITIALIZATION
    //--------------------------------------------------------------------------

    loadDataForTab();

}]);
