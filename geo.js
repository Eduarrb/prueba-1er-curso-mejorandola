$(function(){
	var geo = navigator.geolocation;
	var opciones = {};

	function geo_error(){
		console.log("hhhmmm this is akward... no puedo saber donde estas.");
	};

	function geo_exito(posicion){
		var lat  = posicion.coords.latitude;
		var lon  = posicion.coords.longitude;
		var mapa = new Image();
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?maptype=hybrid&zoom=17&size=270x300&sensor=false&center="+lat+","+lon;
		$('#geo').append(mapa);

		obtenerGeoInformacion(lat, lon);//esto es para se ejecute en ajax

	};

geo.getCurrentPosition(geo_exito, geo_error, opciones);//dos funciones 
});