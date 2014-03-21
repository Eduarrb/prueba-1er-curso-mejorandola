var $form = $('#formulario'),
	$titulo = $('#titulo'),
	$url = $('#url'),
	$button = $('#mostrar-form'),
	$list = $('#contenido'),
	$post = $('.item').first();

function mostrarFormulario(){
	$form.slideToggle();
	$list.slideToggle();
	return false;
}

function agregarPost(e){
	e.preventDefault();
	var url = $url.val(),//val() coje al valor dentro del texto
		titulo = $titulo.val(),
		$clone = $post.clone();
		
	$clone.find('.titulo_item a')
		.text(titulo)
		.attr('href', url);

	$clone.hide();

	$list.prepend($clone);//pone el clon al inicio del contenido
	mostrarFormulario();

	$clone.fadeIn();
	return false
}

	// Eventos
$button.click(mostrarFormulario);
$form.on('submit', agregarPost);
