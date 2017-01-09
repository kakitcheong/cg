//var $ = require('jquery');
////////////////////////////////////////////////////////////////////////////////
//  header hero carousel control                                              //
////////////////////////////////////////////////////////////////////////////////

$('.header-hero__carousel, .menu__carousel').slidesjs({
    height: 450,
    navigation: {
        active: false
    },
    pagination: {
        active: false
    },
    effect: {
        fade: {
            speed: 800,
            crossfade: true
        }
    },
    play: {
        active: false,
        // [boolean] Generate the play and stop buttons.
        // You cannot use your own buttons. Sorry.
        effect: "fade",
        // [string] Can be either "slide" or "fade".
        interval: 5000,
        // [number] Time spent on each slide in milliseconds.
        auto: true,
        // [boolean] Start playing the slideshow on load.
        swap: true,
        // [boolean] show/hide stop and play buttons
        pauseOnHover: true,
        // [boolean] pause a playing slideshow on hover
        restartDelay: 1500
        // [number] restart delay on inactive slideshow
    }
});


var bgReplace = function(){
	$(".bg__img img").each(function(){
        var imgSrc = $(this).attr("src");
        $(this).parents().eq(1).css({'background-image' : 'url('+ imgSrc +')'});
        $(this).remove();
    });
}
bgReplace();

var navBkgrd = function(){
	var safeZone = $(".header-hero").height();	
	var scrollPosition = $("body").scrollTop();
	if (scrollPosition > 20){
		$("#header-nav").addClass("in-body");
	} else{
		$("#header-nav").removeClass("in-body");
	}	 
}

$(document).scroll(function(){
	navBkgrd();
});
$(function(){
	//var Pug = require('pug');
	//console.log('Pug is up and running');
});