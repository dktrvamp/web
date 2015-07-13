/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp", [ "ui.bootstrap", "ui.router", "ngAnimate" ])

	.config(function($stateProvider, $urlRouterProvider){
        "use strict";

		// For any unmatched url, send to /home
		$urlRouterProvider.otherwise("/home")
      
      $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "partials/home.html",
            controller: "home",
            data: {
                context: "home"
            }
        })
		// .state('home.list', {
		//   url: "/list",
		//   templateUrl: "partials/home.list.html",
		//   controller: function($scope){
		//     $scope.items = ["A", "List", "Of", "Items"];
		//   }
		// })

        .state('audio', {
            url: "/audio",
            templateUrl: "partials/audio.html",
            data: {
                context: "audio"
            }
        })
          
        .state('social', {
            url: "/social",
            templateUrl: "partials/social.html",
            data: {
                context: "social"
            }
        })
		// .state('social.list', {
		//   url: "/list",
		//   templateUrl: "partials/social.list.html",
		//   controller: function($scope){
		//     $scope.items = [
		//         "The first choice!",
		//         "And another choice for you.",
		//         "but wait! A third!"
		//     ];
		//   }
		// })
    })

