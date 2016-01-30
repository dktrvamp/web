/**
*  Module
*
* Description
* angular.module("Dktrvamp")
*/
angular.module("Dktrvamp").directive("visual", function(){

	function linkFn() {
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
		    frequency = 0.009,
		    phase = 0,
		    phaseInc = 0;

		function setupCanvas() {
			var audio_player = $(".canvas");
		    // Create canvas element and add it to the page
		    $canvas = $("<canvas>", {
		        id: "grapher"
		    }).prependTo(audio_player);
		    $("<canvas>").css("z-index", -1);

		    // Get the canvas element itself, not the jQuery wrapper
		    canvas = $canvas[0];
		    ctx = canvas.getContext("2d");
		    resizeCanvas();
		}

		function resizeCanvas() {
		    canvasHeight = $(window).height();
		    canvasWidth = $(window).width();

		    $canvas.attr("height", canvasHeight);
		    $canvas.attr("width", canvasWidth);
		}

		function plot(x) {
		    var equation = (amplitude * Math.sin(frequency * x + phase)),
		        equation2 = (amplitude * Math.sin((frequency + 2) * x + phase)),
		        y, vy;

		    if (equation > equation2) {
		        y = equation;
		    } else {
		        vy = equation2;
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

		    var phaseIncMin = -0.1, phaseIncMax = 0.1;
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
		restrict: "A",
        replace: true,
		template: ["<div style=\"height:50px;width:100%;z-index:-1;opacity:.35;\" class=\"canvas\"></div>"].join(""),
        scope:{},
        link: linkFn
	};
});
