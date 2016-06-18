/**
 * @ngdoc service
 * @name Analytics
 * @requires $log
 * @requires $state
 * @requires $window
 * @requires Config
 * @requires Time
 * @description
 *
 * This service is responsible for logging user activity with Google Analytics.
 */
angular.module("Dktrvamp").service("Analytics", function($log, $state, $window) {
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PPRIVATE)
    //--------------------------------------------------------------------------
    // $window.ga is created in index.html from Google's script.
    var _google_analytics = $window.ga,
        _is_initialized;


    //--------------------------------------------------------------------------
    // PROPERTIES (PUBLIC)
    //--------------------------------------------------------------------------

    /**
     * @doc method
     * @name TRACKING_TAGS
     * @description
     *
     * Expose _TRACKING_TAGS publicly.
     */
    // this.TRACKING_TAGS = _TRACKING_TAGS;

    //--------------------------------------------------------------------------
    // METHODS (PUBLIC)
    //--------------------------------------------------------------------------

    /**
     * @doc method
     * @name init
     * @description
     *
     * Initializes the analytics service.
     */
    this.init = function() {
        if (_is_initialized) {
            $log.info("Analytics.init - Already Initialized!");
            return;
        }

        $log.info("Analytics.init - Initializing...");

        var analytics_data = {id: "UA-79509363-1"};

        if(!analytics_data.id) {
            $log.warn("Analytics.init - ID not found. Google Analytics is not configured.");
            return;
        }
        _is_initialized = true;
        _google_analytics("create", analytics_data.id, "auto");

        $log.info("Analytics.init - Initialized!");
    };

    /**
     * @doc method
     * @name trackClick
     * @param {String} tag_or_text The tag of the element to track a click for, or text.
     * @param {Boolean} include_state_info Indicates whether or not to pass the state information as part of the element_name.
     * @description
     *
     * Logs a click event for an element.
     */
    this.trackClick = function(tag_or_text, include_state_info) {
        // If analytics hasn't been setup, just exit.
        if (!_google_analytics) { return; }

        if(!tag_or_text || !_.isString(tag_or_text)) {
            $log.warn("Analytics.trackClick - Invalid tracking tag, event not tracked.");
            return;
        }

        // Fallback to the tracking tag if we don't find a matching tag so that we at least have some
        // information about which element was clicked.
        var element_name = tag_or_text;

        if(include_state_info) {
            element_name = "Current View: " + include_state_info + " Element Text:" + element_name;
        }
        $window.ga("send", "pageview", $state.current.name);
        $window.ga("send", "event", element_name, "click", Date());
    };

});
