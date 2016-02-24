
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("ArtistCtrl",["$scope", "$state", function ($scope, $state) {

    $scope.engine = [
            { id: 1, search: "Spotify" },
            { id: 2, search: "SoundCloud" },
            { id: 3, search: "LastFm" },
        ];

    $scope.selected = $scope.engine[0];

}]);
