var $form 	= $('#formulario'),
	$titulo = $('#titulo'),
	$url 	= $('#url'),
	$button = $('#mostrar-form'),
	$list 	= $('#contenido'),
	$post 	= $('.item').first();

	ls		= localStorage,
	ss 		= sessionStorage;
//guarda en la memoria los contenidos y se peude recargar 
//la página sin perder lo ya escrito antes de enviar
if(ls.getItem('autosave')){
	$titulo.val(ss.getItem('titulo'));
	$url.val(ss.getItem('url'));
}

var id = setInterval(function(){
	ss.setItem('titulo',$titulo.val());
	ss.setItem('url',$url.val());
},1000);


function mostrarFormulario(){
	$form.slideToggle();
	$list.slideToggle();
	$('video').slideToggle();
	return false;
}

function agregarPost(e){
	e.preventDefault();
	var url = $url.val(),//val() coje al valor dentro del texto
		titulo = $titulo.val(),
		clone = $post.clone();
		
	clone.find('.titulo_item a')
		.text(titulo)
		.attr('href', url);

	clone.hide();

	$list.prepend(clone);//pone el clon al inicio del contenido
	mostrarFormulario(); // muestra la lista

	$titulo.val(""); //pone en blanco los parametros ya puestos
	$url.val("");

	clone.fadeIn();
	// return false //ya no se necesita con preventDefault
}
// esta funcion sirve para guardar datos en la pc local
function grabarInformacion(e){
	e.preventDefault();
	var url = $url.val(),
		titulo = $titulo.val(),
		ls = localStorage,
		ss = sessionStorage;

	ls.setItem('titulo', titulo);
	ls.setItem('url', url);

	ss.setItem('titulo', titulo);
	ss.setItem('url', url);

	mostrarFormulario(); 
	$titulo.val(""); 
	$url.val("");
};

	// Eventos
$button.click(mostrarFormulario);
$form.on('submit', /*grabarInformacion*/ agregarPost);
