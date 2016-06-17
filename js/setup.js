/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp", [ "ui.bootstrap", "ui.router", "ngAnimate", "ngtweet", "ngSanitize", "cfp.hotkeys" ])

	.config(function($stateProvider, $provide, $urlRouterProvider){
        "use strict";

        $provide.decorator("$state", function($delegate) {
            $delegate.go = function(to, params, options) {
                return $delegate.transitionTo(to, params, angular.extend(
                    {
                        reload: true,
                        inherit: true,
                        relative: $delegate.$current
                    }, options));
                };
            return $delegate;
        });

        $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "partials/home.html",
            controller: "homeCtrl",
            data: {
                context: "home"
            }
        })
         .state("home.artist", {
            url: "/artist",
            data: {
                context: "artist"
            },
            templateUrl: "partials/artist/artist.html",
            controller: "ArtistCtrl"
        })
        .state("audio", {
            url: "/audio",
            templateUrl: "partials/audio.html",
            controller: "audioCtrl",
            data: {
                context: "audio"
            }
        })

        .state("social", {
            url: "/social",
            templateUrl: "partials/social.html",
            controller: "socialCtrl",
            data: {
                context: "social"
            }
        })
        .state("about", {
            url: "/about",
            templateUrl: "partials/about.html",
            controller: "aboutCtrl",
            data: {
                context: "about"
            }
        })
        .state("contact", {
            url: "/contact",
            templateUrl: "partials/contact.html",
            data: {
                context: "contact"
            }
        });
		// .state("social.list", {
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

        // For any unmatched url, send to /home
        $urlRouterProvider.otherwise("/home");
        // $locationProvider.html5Mode(true);
    })
    .run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo("home");
    }]);

