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
				source : null
			},
			_tracks = [],
			audio = new Audio(),
			current_track = 0,
			// Establish all variables that your Analyser will use
			canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		$($window).mousemove(function(){
			$("ul>li").fadeIn("fast");
		});
		// start
		// Create a new instance of an audio object and adjust some of its properties
		// audio.src = "audio/Dr.Vamp - dark society.mp3";
		audio.controls = true;
		audio.loop = true;
		audio.autoplay = true;
		// Initialize the MP3 player after the page loads all of its HTML into the window

		$scope.model = _model;
		$scope.audio = audio;

		function getLocaleString(){
			var promise = $http.get("locale/tracks.json"),
				items;
			promise
				.then(function(response){
					items = response.data;
					// _tracks.push(response.data);
					// console.log("items", _tracks);
				})
				.catch(function(){
					$log.warn("Playlist.getLocaleString - ");
				})
				.finally(function(){
					// $scope.tracks = _tracks[0];
				});
			$q.when(promise)
				.then(function(){
					console.log("tracks", items);
					$scope.tracks = _tracks = items.concat();
				});
		}

		$scope.onPlayClicked = function(index){
			var track = _tracks[index],
				source = track && track.src;
			current_track = index;

			console.log("$index track : ", index);

			audio.src = _model.source = source;
			$("ul>li.active").parent().css({
				"opacity" : ".6"
			});
			$(".canvas").fadeIn(500, function(){
				$(this).addClass("background-lava");
			});

		};

		$scope.onPauseClicked = function() {
			$(".canvas").fadeOut(500, function(){
				$(this).removeClass("background-lava");
			});
			audio.pause();
		};

		function initMp3Player(){
			document.getElementById("audio_box").appendChild(audio);
			/* jshint ignore:start */
			context = new webkitAudioContext(); // jshint ignore:line
			// new AudioContext(); // Safari and old versions of Chrome
			/* jshint ignore:end */


			analyser = context && context.createAnalyser(); // AnalyserNode method
			canvas = document.getElementById("analyser_render");
			ctx = canvas && canvas.getContext("2d");
			// Re-route audio playback into the processing graph of the AudioContext
			source = context && context.createMediaElementSource(audio);
			source.connect(analyser);
			analyser.connect(context.destination);
			frameLooper();
		}

		// frameLooper() animates any style of graphics you wish to the audio frequency
		// Looping at the default frame rate that the browser provides(approx. 60 FPS)
		function frameLooper(){

			$window.requestAnimationFrame(frameLooper);
			fbc_array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(fbc_array);
			ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
			ctx.fillStyle = current_track === 0 ? "#FF4B4B" :
				current_track === 1 ? "#8EFFFF" :
				current_track === 2 ? "#0FFF3C" :
				current_track === 3 ? "#CEFF45" :
				current_track === 4 ? "#8EFFFF" : "#0992cc"; // Color of the bars

			bars = 5000;
			for (var i = 0; i < bars; i++) {
				bar_x = i * 1;
				bar_width = 1;
				bar_height = -(fbc_array[i] / 2);
				//  fillRect( x, y, width, height ) // Explanation of the parameters below
				ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
			}
		}

		// $("div.target:nth-child(2)").center(false);
		getLocaleString();
		window.addEventListener("load", initMp3Player, false);

		$scope.$watch("audio",initMp3Player);
		// end
		},
		// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: "E", // E = Element, A = Attribute, C = Class, M = Comment
		// template: "",
		templateUrl: "directive/playlist/playlist.html"
	};
});
