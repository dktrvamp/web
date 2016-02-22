/**
 * @ngdoc service
 * @name Cache
 * @requires $log
 * @requires Utils
 * @description
 *
 * This service interfaces with the plugin.
 */
angular.module("Dktrvamp").service("Cache", function($log, Utils) {
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PRIVATE)
    //--------------------------------------------------------------------------

    var _self = this;

    //--------------------------------------------------------------------------
    // PROPERTIES (PUBLIC)
    //--------------------------------------------------------------------------

    /**
     * @doc property
     * @name STRATEGIES
     * @description
     *
     * Stores the supported cache persistence strategies.
     */
    this.STRATEGIES = {
        // These items persist in local storage until the user signs out.
        LOGIN: "LOGIN",

        // These items will persist in session storage until the session ends (app is closed).
        SESSION: "SESSION",

         // These items will persist in local storage indefinately.
        FOREVER: "FOREVER",

         // These items are specific to the user and will persist in local storage indefinately.
        FOREVER_USER: "FOREVER:{{user_id}}"
    };

    //--------------------------------------------------------------------------
    // METHODS (PUBLIC)
    //--------------------------------------------------------------------------

    /**
     * @doc method
     * @name get
     * @param {String} key The key.
     * @param {String} strategy The key.
     * @return {Object} The value
     * @description
     *
     * Retrieves the JSON from the cache for the given key and strategy.
     */
    this.get = function(key, strategy) {
        var storage, json;
        if (!_.isString(key) || !key.length) {
            $log.warn("Cache.get - Key is empty or not a string.");
            return;
        }
        strategy = strategy || _self.STRATEGIES.SESSION;
        key = generateCacheKey(key, strategy);
        storage = getStorageForStrategy(strategy);
        if (key in storage) {
            json = storage.getItem(key);
        }
        return json ? Utils.parseJson(json) : null;
    };

    /**
     * @doc method
     * @name put
     * @param {String} key The key.
     * @param {*} value The value.
     * @param {String} strategy One of the supported STRATEGIES.
     * @description
     *
     * Retrieves the value from the cache for the given key and strategy.
     */
    this.put = function(key, value, strategy) {
        var storage;
        if (!_.isString(key) || !key.length || _.isUndefined(value)) {
            $log.warn("Cache.put - Key is empty or not a string or the value is undefined.");
            return;
        }
        strategy = strategy || _self.STRATEGIES.SESSION;
        key = generateCacheKey(key, strategy);
        storage = getStorageForStrategy(strategy);
        storage.setItem(key, angular.toJson(value));
    };

    /**
     * @doc method
     * @name remove
     * @param {String} key The key.
     * @param {String} strategy One of the supported STRATEGIES.
     * @description
     *
     * Removes the value from the cache for the given key and strategy.
     */
    this.remove = function(key, strategy) {
        var storage;
        if (!_.isString(key) || !key.length) {
            $log.warn("Cache.remove - Key is empty or not a string or the strategy is undefined.");
            return;
        }
        strategy = strategy || _self.STRATEGIES.SESSION;
        key = generateCacheKey(key, strategy);
        storage = getStorageForStrategy(strategy);
        storage.removeItem(key);
    };

    /**
     * @doc method
     * @name removeAll
     * @param {String} strategy The strategy key
     * @description
     *
     * Removes all cached items for a given strategy key.
     */
    this.removeAll = function(strategy) {
        var STRATEGIES = _self.STRATEGIES;
        if (!(strategy in STRATEGIES)) { return false; }

        var storage = getStorageForStrategy(strategy);
        for (var key in storage) {
            if (key.indexOf(generateCacheKey("", strategy)) === 0) {
                storage.removeItem(key);
            }
        }
        return true;
    };

    //--------------------------------------------------------------------------
    // METHODS (PRIVATE)
    //--------------------------------------------------------------------------

    /**
     * @doc method
     * @name generateCacheKey
     * @param {String} key The key
     * @param {String} strategy The strategy
     * @return {String} The generated key
     * @description
     *
     * Concatenates the strategy, publisher, environment, device type and key.
     */
    function generateCacheKey(key, strategy) {
        return Utils.replaceTokens(strategy + ":{{ publisher }}:{{ environment }}:{{ device_type }}:" + key);
    }

    /**
     * @doc method
     * @name getStorageForStrategy
     * @param {String} strategy The strategy to use to determine the storage mechanism.
     * @return {Object} The storage mechanism.
     * @description
     *
     * Gets the storage mechanism for the given strategy.
     */
    function getStorageForStrategy(strategy) {
        return strategy === _self.STRATEGIES.SESSION ? sessionStorage : localStorage;
    }
});