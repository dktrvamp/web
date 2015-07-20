
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").controller("socialCtrl",["$log", "$scope", "$http", function ($log, $scope, $http) {
	$scope.data = null;   
	
	function getLocaleString(){
				$http.get('http://ws.spotify.com/search/1/artist.json?q=artist:Bj%C3%B6rk')
				.success(function(data){
					$scope.data = data;
					console.log(data);
				})
		    	.then(function(response){
	    			console.log("items", response);
		    	})
		    	.catch(function(){
		    		$log.warn("Social.Unable to retrieve tweets");
		    	})
		    	.finally(function(){
		    	});
			
    }

	getLocaleString();
}]);



