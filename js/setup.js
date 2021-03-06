/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp", [ "ui.bootstrap", "ui.router", "ngAnimate", "ngtweet", "ngSanitize", "cfp.hotkeys", "swipe" ])

	.config(function($locationProvider, $stateProvider, $provide, $urlRouterProvider){
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
            url: "/home/?id/:index",
            templateUrl: "partials/home.html",
            controller: "homeCtrl",
            data: {
                context: "home"
            }
        })
         .state("home.artist", {
            url: "/artist/?id/:index",
            data: {
                context: "artist"
            },
            templateUrl: "partials/artist/artist.html",
            controller: "ArtistCtrl"
        })
        .state("audio", {
            url: "/audio/?id/:index",
            templateUrl: "partials/audio.html",
            controller: "audioCtrl",
            data: {
                context: "audio"
            }
        })

        .state("social", {
            url: "/social/?id/:index",
            templateUrl: "partials/social.html",
            controller: "socialCtrl",
            data: {
                context: "social"
            }
        })
        .state("about", {
            url: "/about/?id/:index",
            templateUrl: "partials/about.html",
            controller: "aboutCtrl",
            data: {
                context: "about"
            }
        })
        .state("contact", {
            url: "/contact/?id/:index",
            templateUrl: "partials/contact.html",
            controller: "contactCtrl",
            data: {
                context: "contact"
            }
        })
        .state("policy", {
            url: "/policy/?id/:index",
            templateUrl: "partials/policy.html",
            data: {
                context: "policy"
            }
        })
        .state("engineering", {
            url: "/engineering/?id/:index",
            templateUrl: "partials/engineering.html",
            data: {
                context: "engineering"
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
        $locationProvider.html5Mode(true);
    })
    .run(["$rootScope", "$state", "$stateParams", "Facebook", function ($rootScope, $state, $stateParams, Facebook) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo("home");
        Facebook.init();
    }]);

