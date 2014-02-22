define(['jquery'], function () {
	;(function ( $, window, document, undefined ) {
		var jkVerticalSlider = "jkVerticalSlider",
			defaults = {
				animSpeed: 500,
				delay: 400,
				autoStart: true,
				slideDuration: 5000,
				effect: 'vertical'
			};

		function Plugin( element, options ) {
			this.element = element;
			var htmlAttrs = {};
			htmlAttrs.slideDuration = this.element.data('pause-time');
			htmlAttrs.animSpeed = this.element.data('animation-speed');
			this.options = $.extend( {}, defaults, htmlAttrs, options) ;
			this.numSlides = function () {return this.element.find('[data-role=actual-slides] li').length};
			this.distance = this.element.data('height');
			this.currSlide = 1;
			this.slidePos = 0;
			this.startInterval = {};
			this.paginationTimeout = {};
			this.sliding = false;
			this.init();
		}

		Plugin.prototype = {

			init: function() {
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
			slide : function(target, pos){
				var _this = this;
				this.sliding = true;
				this.element.find('[data-role=menu-item]').removeClass('active');
				this.element.find('[data-role=menu-item]').eq(target - 1)
					.addClass('active');
				this.element.find('[data-role=actual-slides]').animate({
					top: '-'+pos
				}, _this.options.animSpeed, function () {
					_this.sliding = false;
				});

				this.currSlide = target;
				this.slidePos = pos;
			},
			next: function () {
				if (!this.sliding) {
					if(this.currSlide < this.numSlides()){
						this.currSlide++;
						this.slidePos += this.distance;
						this.slide(this.currSlide, this.slidePos);
					} else {
						this.slide(1, 0);
						this.currSlide = 1;
					}
				}
			},
			prev: function () {
				if (!this.sliding) {
					if(this.currSlide == 1){
						this.currSlide = this.numSlides();
						this.slidePos = this.numSlides() * this.distance;
						this.slide(this.currSlide, this.slidePos);
					} else {
						this.currSlide--;
						this.slidePos -= this.distance;
						this.slide(this.currSlide, this.slidePos);
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

				this.element.find('[data-role=menu-item]').hover(function (){
					_this.stopSlide();

					var slideTo = parseInt($(this).attr('data-id'));
					var slidePos = parseInt($(this).attr('data-pos'));
					_this.element.find('[data-role=menu-item]').removeClass('active');
					_this.element.find('[data-role=menu-item]').eq(slideTo - 1).
						addClass('active');

					_this.paginationTimeout = setTimeout(function(){
						_this.slide(slideTo, slidePos);
					}, _this.options.delay);
				}, 	function(){
					clearTimeout(_this.paginationTimeout);
					if (_this.options.autoStart) {
						_this.startSlide();
					}
				});
			}
		};
		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[jkVerticalSlider] = function ( options ) {
			return new Plugin( this, options );
		};

	})( jQuery, window, document );
});
