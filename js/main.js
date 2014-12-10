$(document).on('ready',function() {
	init();
});

function init(){
	$('.slide_controls li').on('click', handleClick);
	var width = $('.slider_container').width();
	$('.slide').each(function(i,e){
		$(e).css('width',width+'px'); 
	});
}

function handleClick(){
	var slide_target = 0;
	if($(this).parent().hasClass('slide_controls')){
		slide_target =$(this).index();
	}

	$('.sliderContainer').fadeOut('slow',function(){
		$(this).animate({
			'margin-left' :-(slide_target * $('.slider_container').width())+'px'
		}, 'slow',function(){
			$(this).fadeIn();
		});
	});
}