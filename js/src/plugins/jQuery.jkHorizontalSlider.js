;(function ( $, window, document, undefined ) {
	var jkHorizontalSlider = "jkHorizontalSlider",
		defaults = {
			animSpeed: 500,
			delay: 1000,
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
		this.distance = this.element.data('width');
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
		slide : function(target, pos, effect){
			var _this = this;
			this.sliding = true;
			this.element.find('[data-role=menu-item]').removeClass('active');

			this.element.find('[data-role=caret]').animate({
				right: ((target-2)*100)
			}, _this.options.animSpeed, function(){
				_this.element.find('[data-role=menu-item]').
					eq(target - 1).addClass('active');
				_this.sliding = false;
			});

			if(effect == 'fade'){
				this.element.find('[data-role=actual-slides]').
					fadeOut(this.options.animSpeed, function(){
						$(this).find('ul').css('right', '-'+pos+'px');
					}).fadeIn(_this.options.animSpeed);
			}
			else {
				this.element.find('[data-role=actual-slides] ul').animate({
					right: '-'+pos
				}, _this.options.animSpeed, function(){
					_this.element.find('[data-role=navigation]').removeClass('processing');
				});
			}

			this.currSlide = target;
			this.slidePos = pos;
		},
		next: function () {
			if (!this.sliding) {
				if(this.currSlide < this.numSlides()){
					this.currSlide++;
					this.slidePos += this.distance;
					this.slide(this.currSlide, this.slidePos, 'fade');
				} else {
					this.slide(1, 0, 'fade');
					this.currSlide = 1;
				}
			}
		},
		prev: function () {
			if (!this.sliding) {
				if(this.currSlide == 1){
					this.currSlide = this.numSlides();
					this.slidePos = this.numSlides() * this.distance;
					this.slide(this.currSlide, this.slidePos, 'fade');
				} else {
					this.currSlide--;
					this.slidePos -= this.distance;
					this.slide(this.currSlide, this.slidePos, 'fade');
				}
			}
		},
		registerEvents: function () {
			var _this = this;

			this.element.find('[data-role=actual-slides] li').hover(function () {
				_this.stopSlide();
			},function () {
				if (_this.options.autoStart) {
					_this.startSlide();
				}
			});

			this.element.delegate('[data-role=menu-item]', 'click', function(){
				var slideTo = parseInt($(this).attr('data-id'));
				if(_this.currSlide != slideTo) {
					var slidePos = parseInt($(this).attr('data-pos'));
					_this.element.find('[data-role=menu-item]').removeClass('active');
					_this.slide(slideTo, slidePos, 'fade');
					_this.stopSlide();
				}
			});

			this.element.delegate('[data-role=navigation]', 'click', function(e){
				if ($(e.target).hasClass('processing')) {
					return;
				}
				$(e.target).addClass('processing');

				var direction = $(this).attr('data-nav-dir');
				_this.element.find('[data-role=menu-item]').removeClass('active');
				switch (direction) {
					case 'next':
						if((_this.currSlide+1) <= _this.numSlides()) {
							var slideTo = _this.currSlide+1;
						}
						else {
							var slideTo = 1;
						}
						break;
					case 'prev':
						if((_this.currSlide-1) >= 1) {
							var slideTo = _this.currSlide-1;
						}
						else {
							var slideTo = _this.numSlides();
						}
						break;
				}

				var slidePos = parseInt(_this.element.find('[data-role=menu-item]').eq(slideTo - 1).attr('data-pos'));

				_this.slide(slideTo, slidePos, 'slide');
				_this.stopSlide();
				clearTimeout(_this.paginationTimeout);
				_this.startSlide();

			});
		}
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[jkHorizontalSlider] = function ( options ) {
		return new Plugin( this, options );
	};

})( jQuery, window, document );