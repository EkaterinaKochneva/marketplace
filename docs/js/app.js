$(document).ready(function(){

    function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
	} 
	$(".range").each(function () {
		let _this = $(this);
		let $range = _this.find(".range-slider-js");
		let $inputFrom = _this.find(".range__input--from");
		let $inputTo = _this.find(".range__input--to");

		let instance,
				from,
				to,
				min = $range.data('min'),
				max = $range.data('max');
		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			hide_min_max: true,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;
			$inputFrom.prop("value", currencyFormat(from));
			$inputFrom.prop("size", currencyFormat(from).length);
			$inputTo.prop("value", currencyFormat(to)); 
			$inputTo.prop("size", currencyFormat(to).length); 
		}

		$inputFrom.on("change input ", function () {
			let val = +$(this).prop("value").replace(/\s/g, ''); 

			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}
			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));
		});
		$inputTo.on("change input ", function () {
			let val = +$(this).prop("value").replace(/\s/g, ''); 

			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}
			instance.update({
				to: val
			});
			$(this).prop("value", currencyFormat(val));
		});
	});
    $('.filter__title').click(function () {
		$(this).toggleClass("active");
		$(this).parents('.filter__item').children(".filter__body").slideToggle();
	});
    $('.filter-open').click(function () {
		$('.catalog__filter').addClass('active');
		$('body').addClass('fixed-mb');
	});
	$('.filter-close').click(function () {
		$('.catalog__filter').removeClass('active');
		$('body').removeClass('fixed-mb');
	});
	$('.sort__btn').click(function () {
		$(this).next('.sort__filter').slideToggle();
	});
	$('.button-js').click(function () {
		$(this).toggleClass('active');
	});
})