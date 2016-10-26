/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("playlist", function($window, $http, $log, $uibModal, $timeout, Utils){
	"user strict";
	// Runs during compile
	return {
		// name: "",
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		link: function(scope) {

		var _model = {
				length : null,
				title  : null,
				source : null,
				playing_item: {}
			},
			_tracks = [],
			_audio_player = $("#audioplayer")[0],
			_current_track = 0,
			_current_track_duration = -1,
			_window = $($window),
			_waveform_width,
			// Establish all variables that your Analyser will use
			canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

		scope.model = _model;

		function getLocaleString(){
			var promise = $http.get("locale/tracks.json"),
				items;
			promise
				.then(function(response){
					items = response.data;
					var width = "w_" + ($window.is_mobile ? 300 : 1000);
					_.each(items, function(track) {
						track.waveform = Utils.replaceToken(track.waveform, "width", width);
					});

					scope.tracks = _tracks = items.concat();
					_model.source = _tracks[0].src;
				})
				.catch(function(){
					$log.warn("Playlist.getLocaleString - FAILED");
				});
		}


		function initMp3Player(){
			if (!_audio_player) { return; }
			// Needed to pass CORS issue
			_audio_player.crossOrigin = "anonymous";
			updateVisualizer();
		}

		function updateVisualizer() {
			_window.player = _audio_player;
			/* jshint ignore:start */
			_window.AudioContext = _window.webkitAudioContext || _window.AudioContext;
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


		scope.onPlayToggle = function(event, index){
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
			_current_track_duration = Math.ceil(_audio_player.duration);

			_model.source = track && track.src || _model.source;
			_waveform_width = $(".waveform").width();
			$timeout(function() {
				if (_audio_player.paused) {
					_audio_player.play();
				}
			}, 150);

		};

        /**
         * @doc method
         * @name setWaveformOverlayWidth
         * @param {Number} position The left position in pixels.
         * @description
         *
         * Sets the left position for the current stop. Should not include the scrubber width!
         */
        function setWaveformOverlayWidth(position) {
            var max_left_position, width;
            if (!_.isFinite(position)) {
                return;
            }

            max_left_position = Utils.getNumberInRange(
                ((position / _current_track_duration) * 100).toFixed(1),
                { min: 0, max: 100, default: 0 }
            );
            _waveform_width = Math.ceil(_waveform_width);
            width = _waveform_width * (Math.ceil(max_left_position) / 100);
            width = Math.floor(width);
            console.log(_waveform_width, width);
            $(".overlay-wave").css({ width: width + "px" });
        }

        function updateTimeline() {
			setWaveformOverlayWidth(Math.ceil(this.currentTime));
        }

        function onWindowResize() {
			_waveform_width = $(".waveform").width();
        }

		getLocaleString();
		initMp3Player();
		_window.on("resize", onWindowResize);
		$(_audio_player).on("timeupdate", updateTimeline);

		scope.$on("$destroy", function() {
			_window.unbind("resize", onWindowResize);
			$(_audio_player).off("timeupdate", updateTimeline);
		});

		// end
		},
		// require: "ngModel", // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: "E", // E = Element, A = Attribute, C = Class, M = Comment
		// template: "",
		templateUrl: "directive/playlist/playlist.html"
	};
});
