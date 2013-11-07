(function ($) {
    $.fn.jkCarousel = function () {
            var $node = $(this),
            //width of main div of carousel, how much should be scrolled
            carouselWidth = $node.find('.items-container').width(),
            items = $node.find('li.item'),
            itemsCount = items.length,
            itemWidth = items.width(),
            itemsPerRow = carouselWidth / itemWidth,
            speed = itemsPerRow * 80,
            pagesCount = Math.ceil( (itemsCount * itemWidth) / carouselWidth),
            min_margin_right = (pagesCount - 1) * carouselWidth * -1,
            max_margin_right = 0;

            //finds the first item in the carousel
            for (var i = 0; i < itemsCount; i++) {
                if (i % itemsPerRow == 0 ) {
                    items.eq(i).addClass('last');
                }
            }

            $node.find('.nav').click(function(e){
                e.preventDefault();
                if ( !$(this).hasClass('disabled') &&
                        !$(this).hasClass('processing')) {

                    $(this).addClass('processing');
                    var nextMargin;
                    var getMarginRight = function () {
                        return $node.find('ul.items').css('margin-right');
                    };
                    if ($(this).hasClass('next')) {
                        nextMargin = parseInt(getMarginRight()) - carouselWidth;
                    }
                    else if($(this).hasClass('previous')) {
                        nextMargin = parseInt(getMarginRight()) + carouselWidth;
                    }
                    $node.find('.items').animate({
                        'marginRight': nextMargin
                    }, speed, function(){
                        if (nextMargin == max_margin_right) {
                            $node.find('.nav.previous').addClass('disabled');
                            $node.find('.nav.next').removeClass('disabled');
                        }
                        else if(nextMargin == min_margin_right) {
                            $node.find('.nav.next').addClass('disabled');
                            $node.find('.nav.previous').removeClass('disabled');
                        }
                        else {
                            $node.find('.nav.next').removeClass('disabled');
                            $node.find('.nav.previous').removeClass('disabled');
                        }
                        $node.find('.nav').removeClass('processing');
                    });
                }
             });
    }
})(jQuery);

(function() {
    $('#c').jkCarousel();
})();