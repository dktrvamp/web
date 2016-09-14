/**
 * @ngdoc service
 * @name Facebook
 * @requires $window
 * @description
 *
 *
 */
angular.module("Dktrvamp").service("Facebook", function($window) {
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PRIVATE)
    //--------------------------------------------------------------------------

    /**
     * @doc method
     * @name init
     * @description
     *
     *
     */
    this.init = function() {

        $window.fbAsyncInit = function() {
            $window.FB.init({
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
    };

    this.share = function(url, img_url, caption, description) {
        $window.FB.ui({
            method: "share",
            display: "popup",
            mobile_iframe: true,
            href: url,
            link: url,
            picture: img_url,
            caption: caption,
            description: description

        },function(response){
            if (response && !response.error_message) {
              $window.alert("Posting completed.");
            } else {
              $window.alert("Error while posting.");
            }
        });
    };
});
