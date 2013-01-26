//this script adds functionality to the timer, the obstacle section, and it adds a smooth scrolling feature when clicking on nav buttons. Also adds a feature that when scrolling the nav buttons will highlight depending upon where you have scrolled

$(document).ready(function () {
//if the user loads a page with a hash, change nav class to match that url
var hash = location.hash;
	$('nav a[href="'+hash+'"]').addClass("current");
		if (hash === "#obstacles" || hash === "#prizes") {
			$('nav').css({backgroundColor: "rgba(15, 40, 48, 0.4)"});
		}

//add a class of current depending upon how far the user has scrolled down also changes the BG opacity of the nav as it tends to disappear when scrolling over the other colors
var obstacles = $("#obstacles").offset().top;
var prizes = $("#prizes").offset().top;
var contestant = $("#be-a-contestant").offset().top;
	$(window).scroll( function() {
		if($(this).scrollTop() >= obstacles) {
			$('nav').css({backgroundColor: "rgba(15, 40, 48, 0.4)"});
			$('nav .current').removeClass('current');
			$('a[href="#obstacles"]').addClass("current");
		} 
		if($(this).scrollTop() >= prizes) {
			$('nav .current').removeClass('current');
			$('a[href="#prizes"]').addClass("current");
		}
		if($(this).scrollTop() >= contestant) {
			$('nav').css({backgroundColor: "rgba(15, 40, 48, 0.06)"});
			$('nav .current').removeClass('current');
			$('a[href="#be-a-contestant"]').addClass("current");
		}if ($(this).scrollTop() < obstacles) {
			$('nav').css({backgroundColor: "rgba(15, 40, 48, 0.06)"});
			$('nav .current').removeClass('current');
			var isScrolled = true;
		}
	});

var scrollable = scrollableElement('html', 'body');

//control the obstacle list buttons
$(".obstacle-list a").click(function (event) {
var name = this.hash;
	if ($(this).parent().hasClass("current") === false) {
		//remove the class of current from the current stuff
		$(".obstacle-list li").removeClass("current");
		$(".obstacle-description .current").removeClass("current");		
		
		//add .current to the button that was clicked
		$(this).parent().addClass("current");
		$('.obstacle-description ' + name).addClass("current");
		
		//smoothly scroll to the description element, this helps negete issues on a mobile device and IE8 and below		
		$(scrollable).animate({scrollTop: $('.obstacle-description ' + name).offset().top}, 600 );		
	}
	event.preventDefault();

});

//add "smooth" scrolling for the nav buttons
$('nav a').click(function(event) {
	var $target = $(this.hash), target = this.hash;		
		if (target) {
			var targetOffset = $target.offset().top;
			event.preventDefault();
			$(scrollable).animate({scrollTop: targetOffset}, 600, function() {
				location.hash = target;
			});
		}		
});

// use the first element that is "scrollable"
function scrollableElement(els) {
	for (var i = 0, argLength = arguments.length; i <argLength; i++) {
		var el = arguments[i],
		$scrollElement = $(el);
		if ($scrollElement.scrollTop()> 0) {
			return el;
		} else {
			$scrollElement.scrollTop(1);
			var isScrollable = $scrollElement.scrollTop()> 0;
			$scrollElement.scrollTop(0);
			if (isScrollable) {
				return el;
			}
		}
	}
	return [];
}
});

//adds a timer functionality to the timer that is by the entry form, once 60 seconds are up add a class which will start the timer shake animation in the CSS, this function will run every second until the number of seconds has been reached
var timer = setInterval("runTimer()", 1000);
var numseconds = 60;
    function runTimer() {
		if (numseconds !== 0 ) {
			numseconds = numseconds - 1; 
			$(".count").html(numseconds);
		} else {
		//since it is done, add 0 to the timer
		$(".count").addClass("done").html("0");
		//since the time has expired, stop the timer from running
		clearInterval(timer);
		}
    }