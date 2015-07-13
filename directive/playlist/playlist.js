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

	// *********************************
	// Visualization			
	// *********************************			
			// Declare Global Variables
			var canvas,
			    $canvas,
			    canvasHeight, 
			    canvasWidth,
			    ctx;

			// Sine wave
			var amplitude = 0,
			    frequency = .009,
			    phase = 0,
			    phaseInc = 0;

			function setupCanvas() {
				var audio_player = $(".canvas");
			    // Create canvas element and add it to the page
			    $canvas = $('<canvas>', {
			        id: 'grapher'
			    }).prependTo(audio_player);

			    // Get the canvas element itself, not the jQuery wrapper
			    canvas = $canvas[0];
			    ctx = canvas.getContext('2d');
			    resizeCanvas();
			}

			function resizeCanvas() {
			    canvasHeight = $(window).height();
			    canvasWidth = $(window).width();

			    $canvas.attr('height', canvasHeight);
			    $canvas.attr('width', canvasWidth);

			    var xMin = 0, xMax = canvasWidth;
			    var yMin = 0, yMax = canvasHeight;
			}

			function plot(x) {
			    var equation = (amplitude * Math.sin(frequency * x + phase)),
			        equation2 = (amplitude * Math.sin((frequency + 2) * x + phase));

			    if (equation > equation2) {
			        var y = equation;
			    } else {
			        var y = equation2;
			    }
			    // Place zero in the center of the y axis 
			    y = y + canvasHeight / 2;
			    return y;
			}

			function drawPath() {
			    // Erase
			    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

			    ctx.beginPath();
			    for(var i=0;i<=canvasWidth;i++) {
			       ctx.lineTo(i, plot(i)); 
			    }
			    ctx.lineTo(i, canvasHeight);
			    ctx.stroke();
			    // ctx.lineTo(0, canvasHeight);
			    // ctx.lineTo(0, plot(0));
			    // ctx.fill();
			    // ctx.closePath();
			    phase += phaseInc; 
			}

			function mouseEffects(e) {
			    var mouseX = e.pageX,
			        mouseY = e.pageY,
			        ampMin = 1,
			        ampMax = 200,
			        ampRange = ampMax - ampMin,
			        y = canvasHeight - mouseY;
			    
			    amplitude = y / (canvasHeight / ampRange) + ampMin;

			    var phaseIncMin = -.1, phaseIncMax = .1;
			    var phaseIncRange = phaseIncMax - phaseIncMin;
			    var x = mouseX;
			    phaseInc = x / (canvasWidth / phaseIncRange) + phaseIncMin;
			}


			$(document).ready(function(){
			    setupCanvas();
			    drawPath();
			    $(window).resize(resizeCanvas);

			    $canvas.mousemove(function(e){
			        mouseEffects(e);
			    });

			    setInterval(drawPath, 33.3);
			});
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