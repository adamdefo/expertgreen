$(function() {
	var watcherScroll = new WatcherScrollPage();

	if (document.querySelector('.js-form-feedback')) {
		var formFeedback = new SmartFormValidator('.js-form-feedback');
	}
	var modalFormFeedback = new SmartFormValidator('.js-modal-form-feedback');

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

	var $callbackModal = $('.js-md-callback'); // модалка с формой
	var $frontside = $callbackModal.find('.md__frontside');
	var $backside = $callbackModal.find('.md__backside');
	console.log($backside)
	$('.js-show-form-callback').on('click', function() {
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

	// отправка формы с заявкой
	$('.js-form-submit').on('click', function(event) {
		event.preventDefault();
		var error = 0;
		var form = $(this).parent().parent();
		var $name = form.find('[name="name"]');
		// if (!name) {
		// 	classie.add(name, '_error');
		// 	error++;
		// };
		var $email = form.find('[name="email"]');
		var $msg = form.find('[name="msg"]');

		var requestParams = {
			name: $name.val(),
			email: $email.val(),
			msg: $msg.val()
		};

		if(error) {
			$.ajax({
				async: true,
				type: "POST",
				url: "/ajax/feedback.php",
				dataType: "json",
				data: requestParams,
				success: function(response) {
					console.log(response)
				},
				error: function(error) {
					console.log(error)
				}
			});
		};

		$frontside.addClass('_hide');
		$backside.addClass('_show');
		setTimeout(function () {
			$frontside.removeClass('_hide');
			$backside.removeClass('_show');
		}, 7000);

		(function() {
			requestParams = {};
			$name.val('');
			$email.val('');
			$msg.val('');
		})();

		return false;
	});

	var pathToPlaceMarkIcon = './img/';
	var yaMapCenter = [55.714082548110134,37.66964849734497];
	var yaMap;
	ymaps.ready(initMap);
	function initMap() { 
		yaMap = new ymaps.Map('map', {
			center: yaMapCenter,
			zoom: 16,
			controls: ['zoomControl']
		});
		var placeMark = new ymaps.Placemark(
			[55.71419156901884,37.67091449999999],
			{
				hideIcon: false,
				hintContent: 'Эксперт грин, 1-я улица Машиностроения, 10',
				// balloonContent: 'Содержимое метки' + index
			},
			{
				iconLayout: 'default#image',
				iconImageHref: pathToPlaceMarkIcon + 'metka.png',
				iconImageSize: [46, 63],
				iconImageOffset: [-20, -54]
			}
		);
		yaMap.geoObjects.add(placeMark);
		yaMap.behaviors.disable('scrollZoom');
	}
});