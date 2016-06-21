
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("contactCtrl",["$scope", "$location", "$http", function ($scope, $location, $http) {

    //--------------------------------------------------------------------------
    // PROPERTIES (PROTECTED)
    //--------------------------------------------------------------------------
    $scope.model = {
        content: {},
        url: $location.absUrl + "php/mail.php"

    };

    // $scope.onSubmitClicked = function() {
    //     var data = {
    //         name: "Johnn",
    //         email: "dktrvamp@gmail.com",
    //         content: "yyyoooo"
    //     };

        // var posting = $.post("/php/mail.php", data);
        // console.log("____________", new Date());

        // posting.done(function(data){
        //     alert(data);
        // });
        // posting.fail(function(){
        //     alert("data failed");
        // });

        // $http.post($location.absUrl + "/php/mail.php", data)
        //    .success(function(data){
        //        console.log(data);
        // });
    // };
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
