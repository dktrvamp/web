angular.module("Dktrvamp")

    /**
     * @ngdoc animation
     * @name fade-in
     * @description
     *
     * Fades in the element.
     */
    .animation(".fade-in", function() {
        return {
            enter: function (element, doneFn) {
                $(element).css("opacity", 0).animate({ opacity: 1 }, 450, "linear", doneFn);
            }
        };
    })

    /**
     * @ngdoc animation
     * @name fade-out
     * @description
     *
     * Fades out the element.
     */
    .animation(".fade-out", function() {
        return {
            leave: function (element, doneFn) {
                $(element).animate({ opacity: 0 }, 450, "linear", doneFn);
            }
        };
    });

