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