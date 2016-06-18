
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("contactCtrl",["$scope", "$http", function ($scope, $http) {

    //--------------------------------------------------------------------------
    // PROPERTIES (PROTECTED)
    //--------------------------------------------------------------------------
    $scope.model = {
        content: {}
    };

    /**
     * @doc method
     * @name getAboutLocale
     * @description
     *
     * Handles a locale request.
     */
    function getAboutLocale() {
        $http.get("locale/about.json")
            .then(function(response){
                console.log(response);
                $scope.model.content = response.data && response.data.info;

            })
            .catch(function(){
                console.log("getAboutLocale.Failed -----");
            }).
            finally(function(){
                console.log("response---finally");
            });
    }


    //--------------------------------------------------------------------------
    // INITIALIZATION
    //--------------------------------------------------------------------------

    getAboutLocale();
}]);
