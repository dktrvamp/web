/**
 * @ngdoc service
 * @name Analytics
 * @requires $log
 * @description
 *
 *
 */
angular.module("Dktrvamp").service("Contact", function($q, $log, $http) {
    "use strict";
    return {
        sendEmail: function(data) {
            var dfd = $q.defer();
            $log.info("Contact.sendEmail - Processing...", data);
            $http({
                url: "http://www.drvaudio.com/php/sendEmail.php",
                method: "post",
                data: data,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(function(response){
                dfd.resolve();
                $log.info("Contact.sendEmail - Response...", response);

            })
            .catch(function(){
                dfd.reject("There was an Error sending the Email!");
                $log.error("Contact.sendEmail - Failed...");
            });

            return dfd.promise;
        }
    };
});
