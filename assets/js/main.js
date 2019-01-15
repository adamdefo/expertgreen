var instToken = '461538648.5e03d6a.b61627b45ea14d95a0cd48ed43835d2e'; // maylo77

var inst = {
	apiUrl: 'https://api.instagram.com/v1/',
	token: '3069679269.e96a138.ed7f70441e274e53ba2a7abd854f71c2',
	userId: '3069679269',
	cliendId: 'e96a138982fa4ce481823904dbb0be39'
}

$(function() {
	var watcherScroll = new WatcherScrollPage();

	var formFeedback = document.querySelector('.form-feedback');
	if (formFeedback) {
        var smartFormValidator = new SmartFormValidator('.form-feedback');
	}

	if (document.querySelector('.js-tabs')) {
		var tabs = new Tabs('.js-tabs');
	}

	var slider = $('#slider');
	slider.slick({
		arrow: false,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		focusOnSelect: false
	});

	var nav = document.querySelector('.js-nav');
	var burger = document.querySelector('.js-burger'),
		burgerTxt = burger.querySelector('span');
	burger.addEventListener('click', function (e) {
		e.preventDefault();
		classie.toggle(nav, '_opened');
		burgerTxt.innerText = classie.has(nav, '_opened') ? 'скрыть меню' : 'показать меню';
	});



	// var url = 'api/ip_adress.php';
	// var json = getFormValues('form-feedback');

	// makeRequest('POST', url, json).then(function (response) {
	// 	var res = JSON.parse(response);
	// }).catch(function (err) {
	// 	console.error('Упс! Что-то пошло не так.', err.statusText);
	// });


	var $instafeedLenta = document.querySelector('.instafeed > .instafeed__lenta');
	$.ajax({
		async: true,
		type: 'GET',
		url: inst.apiUrl + 'users/' + inst.userId + '/media/recent',
		dataType: 'jsonp',
		data: {access_token: inst.token, count: 20},
		success: function(response) {
			for( x in response.data ){
				$($instafeedLenta).append('<div class="instafeed__item"><a href="'+ response.data[x].link +'" target="_blank"><img src="'+ response.data[x].images.low_resolution.url +'"/></a></div>');
			}
			// console.log(response);
		},
		error: function(error) {
			console.log(error);
		}
	});

	var $callbackModal = $('.js-md_callback'); // модалка обратной связи
	$('.js-callback').on('click', function() {
		$('body').addClass('body-md');
		$callbackModal.addClass('_show');
	});

	// закрытие модалки при нажатие на overlay
	$('.js-md-close').on('click', function() {
		$('body').removeClass('body-md');
		$(this).parent().parent().parent().removeClass('_show');
	});

	// закрытие модалки при нажатие на крестик
	$('.md__overlay').on('click', function() {
		$('body').removeClass('body-md');
		$(this).parent().removeClass('_show');
	});
});