// for the menu icon
(function() {
	var i, resize;

  	$("a").click(function() {
    clearInterval(i);
    return $("a").toggleClass("cross");
  	});

  	resize = function() {
    return $("body").css({
    // "margin-top": ~~((window.innerHeight - 150) / 2) + "px"
    });
  	};

  	$(window).resize(resize);

	resize();

}).call(this)

// move the front page
jQuery(document).ready(function($){
	var isLateralNavAnimating = false;
	
	//open/close lateral navigation
	$('.navi-trigger').on('click', function(event){
		event.preventDefault();
		//stop if nav animation is running 
		if( !isLateralNavAnimating ) {
			if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true; 
			
			$('body').toggleClass('navigation-is-open');
			$('.navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				//animation is over
				isLateralNavAnimating = false;
			});
		}
	});
});
