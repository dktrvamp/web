/**
 * @ngdoc service
 * @name Analytics
 * @requires $log
 * @description
 *
 *
 */
angular.module("Dktrvamp").service("Facebook", function($window) {
    "use strict";
    return {
        init: function() {
            $window.fbAsyncInit = function() {
                var FB = FB || $window.FB;
                FB.init({
                    appId: "1038121762923144",

                    channelUrl: "lib.html",

                    status: true,

                    cookie: true,

                    xfbml: true,

                    version    : "v2.7"
                });
            };

            (function(d){
                // load the Facebook javascript SDK

                var js,
                    id = "facebook-jssdk",
                    ref = d.getElementsByTagName("script")[0];

                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement("script");
                js.id = id;
                js.async = true;
                js.src = "http://connect.facebook.net/en_US/sdk.js";

                ref.parentNode.insertBefore(js, ref);

            }(document));
        }
    };
});
