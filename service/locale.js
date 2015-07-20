/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
// angular.module("Dktrvamp").factory('locale', function($log, $q, $http) {
// 	"user strict"
// 	var promise;
// 	var myService = {
// 		async: function() {
// 			if ( !promise ) {
// 				// $http returns a promise, which has a then function, which also returns a promise
// 				promise = $http.get('locale/locale.json').then(function (response) {
// 				  // The then function here is an opportunity to modify the response
// 				  console.log(response);
// 				  // The return value gets picked up by the then in the controller.
// 				  return response.data;
// 				});
// 			}
// 			// Return the promise to the controller
// 			return promise;
// 		}
// 	};
// 	return locale;
// });