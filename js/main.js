var pos = 0;
var intv;
var flippedElement;
var opcionesHoteles = [{opciones:[{opcion:'Cuarto individual'},{opcion:'Alberca privada'},
					 {opcion:'Jacuzzi con burbujas'}],costo: '350',paquete:'Paquete medio'},
					 {opciones:[{opcion:'Cuarto individual'},{opcion:'Alberca privada'},
					 {opcion:'Jacuzzi de plata'}],costo: '500',paquete:'Paquete premium'},
					 {opciones:[{opcion:'Cuarto individual'},
					 {opcion:'Alberca privada'},{opcion:'Jacuzzi'}],costo: '300',paquete:'Paquete económico'}];

$(document).on('ready',function() {
	init();
});

function init(){
	$('.slide_controls li').on('click', handleClick);
	var width = $('.slider_container').width();

	$('.slide').each(function(i,e){
		addBackground(e,width,true);
	});
	$('.image_food').on('click', changeViewPort);
	$('.image_food').each(function(i,e) {
		addBackground (e,false);
		if ($(e).hasClass('viewport')) return  true;
		$(e).data('top', ((i)*100));
		$(e).css({
			'top': $(e).data('top')+'px',
			
		});
	});


	$(document).on('click','.ver-mas',flipElement);

	//clearInterval(intv);

	intv = setInterval(handleClick,10000);
}

function changeViewPort(){
	var e = $('.viewport');
	e.css('top', $(e).data('top'));
	e.removeClass('wiewport');
	$(this).addClass('viewport');
	$(this).css('top',0);
}
function addBackground(element, width, serSize){
	if (!width) width = $('html').width();
	if (serSize) {
		$(element).css({
			'width' : width,
			'height': $('html').height()
		});
	}
	var imagen = $(element).data('background');
	$(element).css('background-image',"url("+(imagen+".jpg")+")"); 
}

function flipElement(){
	if (flippedElement != 0){
		$(flippedElement).revertFlip();
		flippedElement = 0;
	}
	$(flippedElement).remove();
	var padre = $(this).parent();
	flippedElement = padre;
	$('#precioTemplate').template("CompiledTemplate");
	$(padre).flip({
		direction: 'rl',
		speed: 500,
		content: $('#precioTemplate').tmpl(opcionesHoteles[$(this).data('number')]).html(),
		//content: '<h1>HOLA</h1>',
		color: '#f7f7f7',
		onEnd: function(){
			$('#regresar-ventana').on('click', function(){
				$(flippedElement).revertFlip();
				flippedElement = 0;
			});
		}  
	});
}

function handleClick(){
	var slide_target = 0;
	if($(this).parent().hasClass('slide_controls')){
		slide_target =$(this).index();
		pos = slide_target;
		clearInterval(intv);
		intv = setInterval(handleClick,10000);
	}else{
		pos++;
		if(pos>=$(".slide").length){
			pos = 0;
		}
		slide_target = pos;
	}

	$('.sliderContainer').fadeOut('slow',function(){
		$(this).animate({
			'margin-left' :-(slide_target * $('.slider_container').width())+'px'
		}, 'slow',function(){
			$(this).fadeIn();
		});
	});
}