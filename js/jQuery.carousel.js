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

        var updateOptions = function () {
            carouselWidth = $node.find('.items-container').width();
            itemWidth = items.width();
            itemsPerRow = carouselWidth / itemWidth;
            speed = itemsPerRow * 80;
            pagesCount = Math.ceil( (itemsCount * itemWidth) / carouselWidth);
            min_margin_right = (pagesCount - 1) * carouselWidth * -1;
        };

        var findNextMargin = function (direction) {
            var marginRight = parseInt($node.find('ul.items').css('margin-right')),
                nextMargin;
            if (direction == 'next') {
                nextMargin = marginRight - carouselWidth;
            } else if (direction == 'previous') {
                nextMargin = marginRight + carouselWidth;
            }
            return nextMargin;
        };

        var updateNavClasses = function (margin) {
            if (margin == max_margin_right) {
                $node.find('.nav[data-direction=previous]').addClass('disabled');
                $node.find('.nav[data-direction=next]').removeClass('disabled');
            }
            else if(margin == min_margin_right) {
                $node.find('.nav[data-direction=next]').addClass('disabled');
                $node.find('.nav[data-direction=previous]').removeClass('disabled');
            }
            else {
                $node.find('.nav[data-direction=next]').removeClass('disabled');
                $node.find('.nav[data-direction=previous]').removeClass('disabled');
            }
            for (var i=0; i < itemsCount; i++) {
                if ( i % itemsPerRow == 0 ){
                    items.eq(i).addClass('first');
                }
                else if( (i + 1) % itemsPerRow == 0 ) {
                    items.eq(i).addClass('last');
                }
            }
        };

        $node.find('.nav').click(function(e){
            updateOptions();
            e.preventDefault();
            if ( !$(this).hasClass('disabled') &&
                    !$(this).hasClass('processing')) {

                $(this).addClass('processing');
                var nextMargin = findNextMargin($(this).attr('data-direction'));
                $node.find('.items').animate({
                    'marginRight': nextMargin
                }, speed, function(){
                    updateNavClasses(nextMargin);
                    $node.find('.nav').removeClass('processing');
                });
            }
        });

        var resized = false;
        $(window).resize(function() {
            resized = true;
        });
        setInterval(function() {
            if (resized) {
                //prefer reset.
                $node.find('.items').animate({
                    'marginRight': 0
                }, speed, updateNavClasses(0) );
                console.log('some options changed');
                resized = false;
            }
        }, 250);
    }
})(jQuery);
