/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("playlist", function(){
	"user strict";
	// Runs during compile
	return {
		// name: "",
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($window, $http, $log, $scope, $uibModal, $timeout, $transclude, $q) {

		var _model = {
				length : null,
				title  : null,
				source : null,
				playing_item: {}
			},
			_tracks = [],
			_audio_player = $("#audioplayer")[0],
			_current_track = 0,
			// Establish all variables that your Analyser will use
			canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		$scope.model = _model;

		function getLocaleString(){
			var promise = $http.get("locale/tracks.json"),
				items;
			promise
				.then(function(response){
					items = response.data;
				})
				.catch(function(){
					$log.warn("Playlist.getLocaleString - ");
				})
				.finally(function(){
				});
			$q.when(promise)
				.then(function(){
					$scope.tracks = _tracks = items.concat();
					_model.source = _tracks[0].src;
				});
		}

		function initMp3Player(){
			if (!_audio_player) { return; }
			// Needed to pass CORS issue
			_audio_player.crossOrigin = "anonymous";
			updateVisualizer();
		}

		function updateVisualizer() {
			$window.player = _audio_player;
			/* jshint ignore:start */
			$window.AudioContext = $window.webkitAudioContext || $window.AudioContext;
			context = new AudioContext(); // jshint ignore:line
			// Re-route audio playback into the processing graph of the AudioContext
			source = context && context.createMediaElementSource(_audio_player);
			// new AudioContext(); // Safari and old versions of Chrome
			/* jshint ignore:end */

			analyser = context && context.createAnalyser(); // AnalyserNode method
			canvas = document.getElementById("analyser_render");
			ctx = canvas && canvas.getContext("2d");
			source.connect(analyser);
			analyser.connect(context.destination);
			frameLooper();
		}
		// frameLooper() animates any style of graphics you wish to the audio frequency
		// Looping at the default frame rate that the browser provides(approx. 60 FPS)
		function frameLooper() {

			$window.requestAnimationFrame(frameLooper);
			fbc_array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(fbc_array);
			ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
			ctx.fillStyle = _current_track === 0 ? "#FF4B4B" :
				_current_track === 1 ? "#8EFFFF" :
				_current_track === 2 ? "#0FFF3C" :
				_current_track === 3 ? "#CEFF45" :
				_current_track === 4 ? "#8EFFFF" : "#0992cc"; // Color of the bars

			bars = 5000;
			for (var i = 0; i < bars; i++) {
				bar_x = i * 1;
				bar_width = 1;
				bar_height = -(fbc_array[i] / 2);
				//  fillRect( x, y, width, height ) // Explanation of the parameters below
				ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
			}
		}


		$scope.onPlayToggle = function(event, index){
			event.stopPropagation();
			if (_model.playing_item && _model.playing_item.index === index) {
				_audio_player.pause();
				_model.playing_item = {};
				return;
			}

			var track = _tracks[index];
			_model.playing_item = { index: index };
			_current_track = index;

			_audio_player.pause();
			_audio_player.currentTime = 0;

			_model.source = track && track.src || _model.source;
			$timeout(function() {
				if (_audio_player.paused) {
					_audio_player.play();
				}
			}, 150);

		};

		getLocaleString();
		initMp3Player();

		// end
		},
		// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: "E", // E = Element, A = Attribute, C = Class, M = Comment
		// template: "",
		templateUrl: "directive/playlist/playlist.html"
	};
});
