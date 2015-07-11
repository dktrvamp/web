/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp")
	.directive('playlist', ['$state', function($state){
		var linkFn = function() {
			var audio, playlist, tracks, current;

			init();
			function init(){
			    current = 0;
			    audio = $('audio');
			    playlist = $('#playlist');
			    tracks = playlist.find('li a');
			    len = tracks.length - 1;
			    audio[0].volume = .60;
			    playlist.find('a').click(function(e){
			        e.preventDefault();
			        link = $(this);
			        current = link.parent().index();
			        run(link, audio[0]);
			    });
			    audio[0].addEventListener('ended',function(e){
			        current++;
			        if(current == len){
			            current = 0;
			            link = playlist.find('a')[0];
			        }else{
			            link = playlist.find('a')[current];    
			        }
			        run($(link),audio[0]);
			    });
			}
			function run(link, player){
			        player.src = link.attr('href');
			        par = link.parent();
			        par.addClass('active').siblings().removeClass('active');
			        audio[0].load();
			        audio[0].play();
			}
		}
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'directive/playlist/playlist.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: linkFn
		};
	}]);