
/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp")
	.controller("home",["$scope", "$timeout", function ($scope, $timeout) {
		    var INTERVAL = 3000,
		        slides = [{id:"image00", src:"http://i208.photobucket.com/albums/bb15/movetheneedle/Marijuanavillevinyl-1.gif"},
		        {id:"image01", src:"http://s303.photobucket.com/user/suzette300000/media/vinyl.gif.html][IMG]http://i303.photobucket.com/albums/nn147/suzette300000/vinyl.gif"},
		        {id:"image02", src:"http://www.emtec-international.com/sites/default/files/vinyl-groupe.png"},
		        {id:"image03", src:"http://images.cdn.bigcartel.com/bigcartel/product_images/2411750/max_h-1000+max_w-1000/KS_Vinyl.gif"},
		        {id:"image04", src:"http://www.matsgus.com/wp-content/themes/pixeled/images/vinyl_lowrez.gif"}];
	
		    function setCurrentSlideIndex(index) {
		        $scope.currentIndex = index;
		    }
	
		    function isCurrentSlideIndex(index) {
		        return $scope.currentIndex === index;
		    }
	
		    function nextSlide() {
		        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
		        $timeout(nextSlide, INTERVAL);
		    }
	
		    function loadSlides() {
		        $timeout(nextSlide, INTERVAL);
		    }
		    
		    $scope.slides = slides;
		    $scope.currentIndex = 0;
		    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
		    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
	
		    loadSlides();
		}]);