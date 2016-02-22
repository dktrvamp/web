/**
 * @ngdoc service
 * @name Utils
 * @requires $compile
 * @requires $location
 * @requires $log
 * @requires $q
 * @requires $state
 * @requires $timeout
 * @description
 *
 * This service provides utility methods and properties.
 */
angular.module("Dktrvamp").service("Utils", function($compile, $location, $log, $q, $state, $timeout) {
    "use strict";

    //--------------------------------------------------------------------------
    // PROPERTIES (PRIVATE)
    //--------------------------------------------------------------------------

    var _self = this,
        _tokens = {},
        _regex = {
            valid_chars: /^[\],:{}\s]*$/,
            valid_escape: /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            valid_tokens: /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            valid_braces: /(?:^|:|,)(?:\s*\[)+/g,
            comment_lines: /(^\s*\/\/[^\n]*)|([\n]{1,}\s*\/\/[^\n]*)/g
        };

    //--------------------------------------------------------------------------
    // METHODS (PUBLIC)
    //--------------------------------------------------------------------------

    /**
     * @doc method
     * @name createTimer
     * @param {Number} delay_ms The delay in milliseconds.
     * @return {Promise} A promise
     * @description
     *
     * Creates a timer with the provided delay and returns a promise that
     * will be resolved when the delay passes.
     */
    this.createTimer = function(delay_ms) {
        if (!_.isFinite(delay_ms) || delay_ms < 0) { return $q.reject(); }
        return $timeout(angular.noop, delay_ms);
    };

    /**
     * @doc method
     * @name emptyCollection
     * @param {Object|Array} collection The object or arr to empty.
     * @param {fn} fn Optional. A function to call on each item when it is removed. The first parameter is the item in the collection being removed.
     * @description
     *
     * Removes all items in a collection (object or array). This is useful when the
     * collection's items are no longer needed but we need to retain the object
     * or array reference for data binding.
     */
    this.emptyCollection = function(collection, fn) {
        var item;
        if (_.isArray(collection)) {
            while (collection.length) {
                item = collection.pop();
                if (fn) { fn(item); }
            }
        }
        else if (_.isObject(collection)) {
            for (var key in collection) {
                item = collection[key];
                if (fn) { fn(item); }
                delete collection[key];
            }
        }
    };

    /**
     * @doc method
     * @name extend
     * @param {Object} target The object to extend.
     * @return {Object} The object that was extended.
     * @description
     *
     * Simple function for extending POO (Plain Old Objects) (and arrays).
     * Given 1 or more objects, modifies the first object to contain properties
     * from all objects. Later objects take precedence.
     */
    this.extend = function(target) {
        var undef, copy, instance, src;
        for (var len = arguments.length, i = 1; i < len; i++) {
            instance = arguments[i];
            for (var name in instance) {
                if (instance.hasOwnProperty(name)) {
                    src = target[name];
                    copy = instance[name];

                    // Don't get stuck in a loop
                    if (target === copy) { continue; }

                    if (copy === null) {
                        target[name] = null;
                    }
                    else if (typeof copy === "object") {
                        target[name] = _self.extend(_.isArray(copy) ? [] : {}, src, copy);
                    }
                    else if (copy !== undef) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    /**
     * @doc method
     * @name getAttributeOrMetadata
     * @param {Object} obj Object to look in
     * @param {String|Number} key The attribute to look for
     * @param {*} default_value The default value to return when no value is found.
     * @returns {Any} The value, or undefined if not found
     * @description
     *
     * Given an object and key, looks for the key in the object or metadata;
     * if both are defined, returns the base value.
     */
    this.getAttributeOrMetadata = function(obj, key, default_value) {
        // sanity check
        if (!obj || typeof(obj) !== "object") {
            return default_value;
        }
        return key in obj ? obj[key]
               : "metadata" in obj && key in obj.metadata ? obj.metadata[key]
               : default_value;
    };

    /**
     * @doc method
     * @name getNumberInRange
     * @param {Number} value The number to find in the range.
     * @param {Object} options May contain a min, max, or default.
     * @return {Number} A valid number in the range or NaN.
     * @description
     *
     * Returns a number that falls in the range (default is 0-100) or NaN.
     */
    this.getNumberInRange = function(value, options) {
        options = options || {};
        value = parseInt(value, 10);

        var min = options.min || 0,
            max = options.max || 100;

        if (_.isNaN(value)) {
            $log.warn("Utils.getNumberInRange - Value is not a number. Using default (if provided).");
            return options.default || value;
        }

        if (value < min) { return min; }
        if (value > max) { return max; }
        return value;
    };

    /**
     * @doc method
     * @name getTokenValue
     * @param {String} key The key for the field. Will turn into {{ key }}.
     * @return {String} The value for the given token or undefined.
     * @description
     *
     * Gets the value for the given token key.
     */
    this.getTokenValue = function(key) {
        return _tokens[key];
    };

    /**
     * @doc method
     * @name getObjectKey
     * @param {Object} obj The object to introspect
     * @param {String} key The settings key to return
     * @param {*} default_value The default value to return if not found
     *
     * @return {*} The value for key, default, or null if no default is provided.
     * @description
     * Simple accessor to retrieve a given key from a given object. Given a
     * string like "skin.live.num_rows" will look up the specified key
     * recursively. Allows for a default to be provided.
     */
    this.getObjectKey = function(obj, key, default_value) {
        var current_obj = obj || {},
            current_key;
        key = key.split(".");
        while (key.length > 0) {
            if ((typeof(current_obj) === "undefined") || (current_obj === null)) {
                break;
            }
            current_key = key.shift();
            current_obj = current_obj[current_key];
        }

        return typeof(current_obj) !== "undefined" ? current_obj : typeof(default_value) !== "undefined" ? default_value : null;
    };

    /**
     * @doc method
     * @name getResolvedPromise
     * @param {*} resolve_value The value to resolve the promise with.
     * @return {Promise} A resolved promise
     * @description
     *
     * Creates a deferred object, resolves it (with the optional value), and returns
     * the promise.
     */
     // TODO: This should be a static method in $q, like $q.reject().
    this.resolve = function(resolve_value) {
        var dfd = $q.defer();
        dfd.resolve(resolve_value);
        return dfd.promise;
    };

    /**
     * @doc method
     * @name isPlainObject
     * @param {*} thing The possible object.
     * @return {Boolean} True if the thing is a plain object. Otherwise, false.
     * @description
     *
     * Determines if the given thing is a plain object.
     */
    this.isPlainObject = function(thing) {
        return thing && typeof(thing) === "object" && thing.constructor === Object.prototype.constructor || false;
    };

    /**
     * @doc method
     * @name isUrl
     * @param {String} value The string to check
     * @return {Boolean} True if the value appears to be a URL. Otherwise, false.
     * @description
     *
     * Determines if the given value appears to be a URL.
     */
    this.isUrl = function(value) {
        return _.isString(value) ? value.indexOf("http") === 0 : false;
    };

    /**
     * @doc method
     * @name parseJson
     * @param {String} json The JSON string to parse
     * @param {Boolean} remove_comments If true, should the data be preprocessed to rip out
     *                  lines starting with // ? (Comments are not supported in JSON, but we
     *                  support this basic syntax for i18n data files.)
     * @return {Object|Array|null} The parsed object / array, or null
     * @description
     *
     * Tries to parse a provided JSON string into an object.
     */
    this.parseJson = function(json, remove_comments) {

        if (!json || !_.isString(json)) {
            return null;
        }

        if (remove_comments) {
            // Be magical and rip out // comments at the beginning of a line
            json = json.replace(_regex.comment_lines, "");
        }

        return angular.fromJson(json);
    };

    /**
     * @doc method
     * @name getQueryString
     * @return {Object} The name/value pairs of data from the search/query string.
     * @description
     *
     * Loads the search/query string data and returns it after converting certain values to expected data types.
     */
    this.getQueryString = function() {
        var query_string = {};

        _.each($location.search(), function(value, key) {

            // If the value is a number as a string...
            if (_.isFinite(value)) {
                value = parseInt(value, 10);
            }
            else {
                // If the value is a boolean but a string...
                switch (value.toLowerCase()) {
                    case "false": value = false; break;
                    case "true" : value = true; break;
                }
            }
            query_string[key] = value;
        });

        return query_string;
    };
    /**
     * @doc method
     * @name renameObjectKey
     * @param {Object} obj The object to operate on. This must be an object that
     *              responds to key/value notation (ie, not an Array).
     * @param {String} old_key The old key name; any dots (.) in the string will cause
     *                  lookup in nested objects.
     * @param {String} new_key The new key name; any dots(.) in the string will cause
     *                  nested objects to be created. If falsy, obj[old_key]
     *                  will simply be deleted.
     * @param {Function} transform_fn The function to pass value of obj[old_key] through
     *                         prior to reassignment.
     *
     * @return {Boolean} true if the provided object was modified; false if it was not
     * @description
     *
     * Attempts to rename an attribute an object from old_key to new_key.
     * If a transform function is provided, the value of obj[old_key] is passed
     * through this function prior to reassignment.
     *
     * If the value of obj[old_key] is an Array, and a transform function is
     * provided, each value will be passed through transform_fn first.
     *
     * This is destructive: the provided object is modified in place. Also,
     * if something already exists at new_key (or, if nested, if anything in the
     * chain is not an Object) it will be lost forever.
     */
    this.renameObjectKey = function(obj, old_key, new_key, transform_fn) {
        // Sanity check
        if (!_self.isPlainObject(obj) || !old_key || typeof(old_key) !== "string") {
            return false;
        }
        var _old_key = old_key, _new_key = new_key;

        var val, _key, _obj = obj;
        old_key = old_key.split(".");
        // Process each level in old_key, looking for the terminus.
        while (old_key.length > 0) {
            _key = old_key.shift();
            // If this is the terminus, grab the value and delete from original
            if (old_key.length === 0) {
                val = _obj[_key];
                delete _obj[_key];
                continue;
            }
            // Otherwise, traverse down another level
            _obj = _obj[_key];

            // If the next node isn't traversible, break out of the loop
            if (!_self.isPlainObject(_obj)) {
                break;
            }
        }

        // We now have the old value, let's replace it if new_key was provided.
        // If val is undefined, don't bother assigning it to new_key
        _obj = obj;
        if (typeof(val) !== "undefined" && new_key && typeof(new_key) === "string") {
            new_key = new_key.split(".");
            while (new_key.length > 0) {
                _key = new_key.shift();
                // If this is the terminus, put the possibly-transformed value here
                if (new_key.length === 0) {
                    // If there is a transform_fn, pre-process the old value
                    if (typeof(transform_fn) === "function") {
                        val = transform_fn(val, obj, _old_key, _new_key);
                    }
                    // if an object (map) is in place of transform_fn, perform
                    // a nested transform at this point
                    else if (_self.isPlainObject(transform_fn)) {
                        val = _self.transformObject(val, transform_fn);
                    }

                    if (typeof(val) !== "undefined") {
                        _obj[_key] = val;
                    }
                    continue;
                }
                // Reassign to the nested object, creating if necessary.
                // NOTE: if a value exists here, but it is not an object, it will go BYE BYE
                if (!_self.isPlainObject(_obj[_key])) {
                    _obj[_key] = {};
                    _obj = _obj[_key];
                }
                else {
                    _obj = _obj[_key];
                }
            }
        }
        return true;
    };

    /**
     * @doc method
     * @name replaceToken
     * @param {String} string The string containing the replacement.
     * @param {String} key The token key that should be replaced.
     * @param {String} [value] The optional value to use as the replacement. If not
     *                  provided, the key will be used to check for a token value.
     * @return {String} The new string with replaced tokens.
     * @description
     *
     * Replaces the given token found in the given string with the stored token value.
     */
    this.replaceToken = function(string, key, value) {
        string = string.replace(/\s/g, ""); // Remove spaces
        string = string.replace("{{" + key + "}}", _.isUndefined(value) ? _self.getTokenValue(key) : value);
        return string;
    };

    /**
     * @doc method
     * @name replaceTokens
     * @param {String} string The string that has tokens to replace.
     * @param {Object} tokens Contains key/value pairs of tokens to replace. If not provided uses, global tokens.
     * @param {Boolean} replace_all If true, replaces tokens defined in the given tokens AND global tokens.
     * @return {String} The new string with replaced tokens.
     * @description
     *
     * Replaces any tokens found in the given string with the stored value.
     */
    this.replaceTokens = function(string, tokens, replace_all) {
        if (typeof(string) !== "string" || string.indexOf("{{") < 0) { return string; }
        string = string.replace(/\s/g, ""); // Remove spaces
        if (replace_all) {
            tokens = angular.extend({}, tokens, _tokens);
        }
        _.each(tokens || _tokens, function(value, key) {
            string = string.replace("{{" + key + "}}", value);
        });
        return string;
    };

    /**
     * @doc method
     * @name setToken
     * @param {String} key The key for the token. Will turn into {{ key }}.
     * @param {String|Number|Boolean} value The value that should be used in place of the key.
     * @param {Boolean} When true, key/value was successfully set.
     * @description
     *
     * Defines a token that is expected to exist in some string that should be
     * replaced with the given value.
     */
    this.setToken = function(key, value) {
        // Validate the parameters.
        if (!key || !value) { return false; }
        _tokens[key] = value.toString();
        return true;
    };

    /**
     * @doc method
     * @name syncCssClass
     * @param {Object} element The element that should have the class added or removed.
     * @param {String} css_class The class to add to or remove from the element.
     * @param {Boolean} When true, adds the class to the element
     * @description
     *
     * Toggles a given CSS class on a given element based on the provided condition.
     */
    this.syncCssClass = function(element, css_class, condition) {
        if (css_class && element && element.toggleClass) {
            element.toggleClass(css_class, !!condition);
        }
    };

    /**
     * @doc method
     * @name transformObject
     * @param {Object} obj The object to transform
     * @param {Object} map Map of OLD_ATTR -> [NEW_ATTR, TRANSFORM_FN] (transform_fn is optional)
     * @return {Object} The transformed object
     * @description
     *
     * Given an object and a mapping, transforms any attributes according to the
     * map.
     */
    this.transformObject = function(obj, map) {
        // Sanity check
        if (typeof(obj) !== "object" || typeof(map) !== "object") {
            return obj;
        }

        // Internal function that will actually do the work
        function _transform(o) {
            var new_key, transform_fn;
            for (var attr in map) {
                if (map.hasOwnProperty(attr)) {
                    new_key = _.isArray(map[attr]) ? map[attr][0] : map[attr];
                    transform_fn = _.isArray(map[attr]) ? map[attr][1] : null;
                    _self.renameObjectKey(o, attr, new_key, transform_fn);
                }
            }
        }

        // If this is an Array, do it for each object in the Array
        if (_.isArray(obj)) {
            for (var i = obj.length - 1; i >= 0; --i) {
                _transform(obj[i]);
            }
        }
        // Otheriwe, just do it for the object
        else {
            _transform(obj);
        }
        return obj;
    };

    /**
     * @doc method
     * @name toDoubleDigit
     * @param {Number} num The single digit number to convert.
     * @return {String} The stringified number padded with a 0, or the non-stringified number
     *                  it_self. If provided a non-number, it is returned unchanged.
     * @description
     *
     * Pads a possible single digit with a leading 0 (TODO: Set an arbitrary number of leading zeros)
     */
    this.toDoubleDigit = function(num){
        return (typeof num === "number" || num instanceof Number) && num.toString().length === 1 ? "0" + num : num;
    };

    /**
     * @doc method
     * @name getResizedImageUrl
     * @param url {String}
     * @param {String} Url of the image to load into src.
     * @param options {Object} if neither options.width or options.height is provided, the provided url is returned unchanged
     *      @param [options.width] {Number} desired width of the image
     *      @param [options.height] {Number} desired height of the image
     *      @param [options.type] {String} "cms" or "ums"; if provided, we will only attempt to match the URL to a single
     *      system's format, rather than try matching against both regular expressions
     * @return {String} url with the size constraints applied
     * @description
     *
     * Given the url for an image from either CMS or MediaView, generate a new
     * url that resizes the width / height to requested dimensions.
     *
     * If both width and height are specified, the image url we return will represent
     * an image that will always fit within a box of that size -- it will not exceed
     * either the width or height dimensions provided, but is not guaranteed to be
     * an exact fit on both dimensions.
     *
     * Returns the unmodified url if no width or height is specified, or it does not
     * match any known url format for images from either cms or ums.
     */
    this.rcms_image = new RegExp("^(http.+/cms/images)/(?:[a-z]{1}/(?:x|[0-9]+)/(?:x|[0-9]+)/)?([0-9a-z]+\\.[a-z]+)$", "i");
    this.rums_image = new RegExp("^(http.+?)(?:/dyn/.+)?(/[a-f0-9]+/[a-f0-9]+/[^\/]+$)", "i");
    this.getResizedImageUrl = function(url, options) {
        // return undefined if given an empty string or a non-string
        if (!url || typeof(url) !== "string") {
            return;
        }
        options = options || {};
        // sanitize the width / height into numbers (also avoids the need for
        // Math.floor to avoid requesting partial-pixel resizes)
        var w = parseInt(options.width, 10),
            h = parseInt(options.height, 10);

        // bail if the string is empty, or we didn't get a width or height
        if (!(w || h)) {
            return url;
        }

        var matches,
            is_cms_url = url.indexOf("/cms/images") !== -1; // cms has the most consistent url format
        // try cms-style urls
        if (options.type !== "ums" && is_cms_url && (matches = this.rcms_image.exec(url))) {
            // Supports 3 types: (c)rop, (m)ax size, (s)cale.
            // Assumption: providing 1 parameter means scale, both parameters
            // means no larger than the requested size (max)
            return matches[1] + (w && h ? ("/m/" + w + "/" + h) : ("/s/" + (w || "x") + "/" + (h || "x"))) + "/" + matches[2];
        }
        // try ums-style urls
        else if (options.type !== "cms" && !is_cms_url && (matches = this.rums_image.exec(url))) {
            // Supports 3 types: (cr)op, (pa)d with black, (rs)scale.
            // Assumption: providing 1 parameter means scale, both parameters
            // means scale to match exact size and pad with black
            return matches[1] + "/dyn" + (w && h ? ("/pa/" + w + "/" + h) : ("/rs/" + (w || "x") + "/" + (h || "x"))) + matches[2];
        }
        // nothing matched, so return the unmodified string
        return url;
    };

    /**
     * @doc method
     * @name calculateAspectRatioFit
     * @param {Number} src_width Source area width
     * @param {Number} src_height Source area height
     * @param {Number} max_width Maximum width
     * @param {Number} max_height Maximum height
     * @return {Object} Includes properties for width and height.
     *
     * Calculate the width and height based on specified source and max width
     * and height values.
     */
    this.calculateAspectRatioFit = function(src_width, src_height, max_width, max_height) {
        var ratio, ratio_width, ratio_height;
        if (!_.isFinite(src_width) || !_.isFinite(src_height)) {
            $log.warn("Utils.calculateAspectRatioFit - Invalid parameters. Source width and height are required!");
            return {};
        }
        ratio_width = _.isFinite(max_width) && max_width / src_width || null;
        ratio_height = _.isFinite(max_height) && max_height / src_height || null;
        ratio = ratio_width && ratio_height ? Math.min(ratio_width, ratio_height) : ratio_width || ratio_height;
        return {
            width: Math.floor(src_width * ratio),
            height: Math.floor(src_height * ratio)
        };
    };

    /**
     * @doc method
     * @name loadImage
     * @param {String} Url of the image to load into src.
     * @param {Object} An IMG dom tag wrapped as a JQuery Element. Optional. Provide null/undefined
     *                 to create an image that can be used as the background for an element.
     * @return {Deferred} Image will load or fail
     * @description
     *
     * Figure out when an image is loaded
     */
    this.loadImage = function(url, image_element) {
        var dfd;

        if (!image_element) {
            image_element = $(new Image());
        }

        if (!url) {
            $log.warn("Utils.loadImage - URL is missing or invalid.");
            return $q.reject(image_element);
        }

        dfd = $q.defer();
        image_element.load(function() {
                dfd.resolve(image_element);
            })
            .error(function() {
                dfd.reject(image_element);
            })
            .attr("src", url)
            .each(function() {
                // catch cached images
                if(this.complete) {
                    $(this).load();
                }
            });

        return dfd.promise;
    };

    /**
     * @doc method
     * @name getRandomString
     * @param {Number} how many charachters long the random string should be (max of 32)
     * @description
     *
     * Figure out when an image is loaded
     */
    this.getRandomString = function(length) {
        length = length && length > 0 && length <= 32 ? length : 32;
        function getHexChar() {
            var r = Math.random()*16|0;
            return r.toString(16);
        }
        return ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".substring(0,length)).replace(/x/g, getHexChar);
    };

    /**
     * @doc method
     * @name compileElement
     * @param {object} element The element that needs to be compiled
     * @param {object} scope The scope is the parent scope
     * @param {object} child_scope The child scope for compiled html (optional)
     * @description
     *
     * Compiles an HTML string into a template with its scope.
     */
    this.compileElement = function(element, scope, child_scope) {
        // If the content has child elements and a scope object was provided,
        // we need to compile the html using a new scope.
        if (!element || !_.isFunction(element.get) || !element.get(0).childElementCount) { return; }
        $compile(element.contents())(
            angular.extend(scope.$new(), child_scope || {})
        );
    };

    /**
     * @doc method
     * @name convertVersionToFloat
     * @param {String} or {Number} version A version number in a dot/dash notation.
     * @param {Number} padding How many decimal places per part, ie .01 (2) vs .00001 (5).
     * @return {Number} version as a float.
     * @description
     * converts 1.2.2.444 to 0.0001000200020444
     * which is less than 1.10.1 (0.000100100001)
     * which is less than 1.10.1-abcdef (0.0001001000019999)
     * which is less than "dev" (0.9999)
     */
    this.convertVersionToFloat = function(version, padding) {
        if (!version) {
            return null;
        }
        version = ""+version;
        padding = padding && !isNaN(parseInt(padding, 10)) ? padding : 4;
        var decimal = "";
        _.each(version.split("."), function(part) {
            _.each(part.split("-"), function(num) {
                num = parseInt(num, 10);
                num = isNaN(num) ? 9999 : num;
                decimal += _self.padWithZeros(num,padding);
            });
        });
        return parseFloat("0."+decimal);
    };

    /**
     * @doc method
     * @name padWithZeros
     * @param {Number} number The number to pad.
     * @param {Number} length How many characters will be returned in the string.
     * @return {Number} version as a float.
     * @description
     *
     * Adds a number with zeros to reach specified string length.
     */
    this.padWithZeros = function(number, length) {
        var str = ""+number;
        while (str.length < length) {
            str = "0" + str;
        }
        return str;
    };

    /**
     * @doc method
     * @name getCurrentSectionStateData
     * @return {Object} the data object for the current section.
     * @description
     *
     * Returns the data object for the current section.
     */
    this.getCurrentSectionStateData = function() {
        var parts = $state.current.name.split("."),
            root_section = parts[0] + "." + parts[1],
            current_state = $state.get(root_section) || {};

        if(!current_state.data) {
            current_state.data = {};
        }

        return current_state.data;
    };

});