$(function(){
	// $.get('logos_footer.html', function(codigito){
	// 	$('footer').append(codigito);
	// });
	$('footer .logos').load('logos_footer.html #maestrosdelweb');

	$.get('usuario.json', function(info){
		var avatar   = new Image();
		avatar.src   = info.avatar;
		avatar.title = info.nombre+' '+info.apellido;

		$('#avatar').append(avatar);
	});
});

var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';//esto es el paramatro que vamos usa con lat y lon y después lo codificamos abajo
	query = encodeURIComponent(query);//esto codifica para que viaje en una url

	$.ajax({
		url:  base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarGeoInfo',
		data: {
			format: 'json'
		}
	});
	console.log(query);
};

function procesarGeoInfo(datos){
	var res    = datos.query.results.Result;
	var calle  = res.street;
	var ciudad = res.city;
	var pais   = res.country; 
	var woeid  = res.woeid;

	$('#geo').prepend('<p><strong>'+calle+'</strong><br>'+pais+', '+ciudad+'</p>')
	console.log(datos);

	obtenerClima(woeid);
};

function obtenerClima(woeid){
	var query = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" and u="c"';//esto es el paramatro que vamos usa con lat y lon y después lo codificamos abajo
	query = encodeURIComponent(query);//esto codifica para que viaje en una url

	$.ajax({
		url:  base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarClima',
		data: {
			format: 'json'
		}
	});
	console.log(query);
};

function procesarClima(datos){
	console.log(datos);
	var clima = datos.query.results.channel;
	var temp  = clima.item.condition.temp;
	var unit  = clima.units.temperature;
	var code  = clima.item.condition.code;
	var img   = new Image();
	img.src   = "http://l.yimg.com/a/i/us/we/52/"+code+".gif";
	

	$('#clima').append(img).append(temp+' '+unit+'°');
	
};