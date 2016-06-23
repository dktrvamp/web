/**
 * @ngdoc service
 * @name Analytics
 * @requires $log
 * @description
 *
 *
 */
angular.module("Dktrvamp").service("Contact", function($log, $http) {
    "use strict";
    return {
        sendEmail: function(data) {
            var promise = $http({
                url: "http://www.drvaudio.com/php/sendEmail.php",
                method: "post",
                data: data,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            $log.info("Contact.sendEmail - Processing...", data);
            promise
            .catch(function(){
                $log.error("Contact.sendEmail - Failed...");
            })
            .then(function(response){
                $log.info("Contact.sendEmail - Response...", response);

            });

            return promise;
        }
    };
});
