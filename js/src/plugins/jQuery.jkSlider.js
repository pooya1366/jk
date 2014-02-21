//define(['jquery'], function () {
	;(function ( $, window, document, undefined ) {
		var jkSlider = "jkSlider",
			defaults = {
				animSpeed: 500,
				delay: 1000,
				autoStart: true,
				slideDuration: 5000,
				effect: 'vertical'
			};

		function Plugin( element, options ) {
			this.element = element;
			options.animSpeed = this.element.data('animation-speed');
			options.duration = this.element.data('duration');
			this.options = $.extend( {}, defaults, options) ;
			this.numSlides = function () {return this.element.find('[data-role=actual-slides] li').length};
			this.currSlide = 1;
			this.slidePos = 0;
			this.startInterval = {};
			this.paginationTimeout = {};
			this.distance = 0;
			this.sliding = false;
			this.init();
		}

		Plugin.prototype = {

			init: function() {
				if (this.options.effect == 'horizontal') {
					this.distance = this.element.data('width');
				} else if (this.options.effect == 'vertical') {
					this.distance = this.element.data('height');
				}
				this.registerEvents();
				if (this.options.autoStart) { this.startSlide(); }
			},
			startSlide : function () {
				var _this = this;
				this.startInterval = setInterval(function(){
					_this.next();
				}, this.options.slideDuration)
			},
			stopSlide: function(){
				clearInterval(this.startInterval);
			},
			slide : function(target, pos, userAction){
				this['slide_' + this.options.effect](target, pos, userAction);
			},
			slide_vertical: function (target, pos) {
				var _this = this;
				this.sliding = true;
				this.element.find('[data-role=menu-item]').removeClass('active');
				this.element.find('[data-role=menu-item]').eq(target - 1)
					.addClass('active');
				this.element.find('.cat-slider-images-wrapper').animate({
					top: '-'+pos
				}, _this.options.animSpeed, function () {
					_this.sliding = false;
				});

				this.currSlide = target;
				this.slidePos = pos;
			},
			slide_horizontal: function (target, pos, userAction) {
				var _this = this;
				this.sliding = true;
				this.element.find('[data-role=menu-item]').removeClass('active');

				this.element.find('.home-slider-menu-arrow').animate({
					right: ((target-2)*100)
				}, _this.options.animSpeed, function(){
					_this.element.find('[data-role=menu-item]').
						eq(target - 1).addClass('active');
					_this.sliding = false;
				});

				if (!userAction) {
					this.element.find('.home-slider-images-container').
						fadeOut(this.options.animSpeed, function(){
							$(this).css('right', '-'+pos+'px');
							$(this).fadeIn(_this.options.animSpeed);
						});
				} else {
					this.element.find('.home-slider-images-container').
						animate({'right': '-'+pos+'px'}, this.options.animSpeed);
				}

				this.currSlide = target;
				this.slidePos = pos;
			},
			next: function (userAction) {
				if (!this.sliding) {
					if(this.currSlide < this.numSlides()){
						this.currSlide++;
						this.slidePos += this.distance;
						this.slide(this.currSlide, this.slidePos, userAction);
					} else {
						this.slide(1, 0, userAction);
						this.currSlide = 1;
						this.slide(this.currSlide, this.slidePos, userAction);
					}
				}
			},
			prev: function (userAction) {
				if (!this.sliding) {
					if(this.currSlide == 1){
						this.currSlide = this.numSlides();
						this.slidePos = this.numSlides() * this.distance;
						this.slide(this.currSlide, this.slidePos, userAction);
					} else {
						this.currSlide--;
						this.slidePos -= this.distance;
						this.slide(this.currSlide, this.slidePos, userAction);
					}
				}
			},
			registerEvents: function () {
				var _this = this;

				this.element.find('[data-role=actual-slides] a').hover(function () {
					_this.stopSlide();
				},function () {
					if (_this.options.autoStart) {
						_this.startSlide();
					}
				});

				this.element.find('.pagination li').hover(function (){
					_this.stopSlide();

					var slideTo = parseInt($(this).attr('data-id'));
					var slidePos = parseInt($(this).attr('data-pos'));

					_this.paginationTimeout = setTimeout(function(){
						_this.element.find('.pagination li').removeClass('active');
						_this.element.find('[data-role=menu-item]').eq(slideTo - 1).
							addClass('active');
						_this.slide(slideTo, slidePos);
					}, _this.options.delay);
				}, 	function(){
					clearTimeout(_this.paginationTimeout);
					if (_this.options.autoStart) {
						_this.startSlide();
					}
				});

				this.element.delegate('.navigation', 'click', function (e) {
					var $navigation = $(e.target);
					if ($navigation.hasClass('next')) {
						_this.next(true);
					} else if ($navigation.hasClass('prev')) {
						_this.prev(true);
					}
				})
				this.element.find('.home-slider-menu').delegate('li', 'click', function (e) {
					if ($(e.target).hasClass('active')) {
						return;
					}
					clearTimeout(_this.paginationTimeout);
					var slideTo = parseInt($(this).attr('data-id'));
					var slidePos = parseInt($(this).attr('data-pos'));
					_this.element.find('.pagination li').removeClass('active');
					_this.element.find('[data-role=menu-item]').eq(slideTo - 1).
						addClass('active');
					_this.slide(slideTo, slidePos);
				});
			}
		};
		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[jkSlider] = function ( options ) {
			return new Plugin( this, options );
		};

	})( jQuery, window, document );
//});
