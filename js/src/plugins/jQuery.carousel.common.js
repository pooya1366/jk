(function ($) {
    jQuery.fn.jkCarousel = function () {
        var $node = $(this);
        adjustItemsWidth();
        $node.find('.items-container').animate({'opacity': 1}, 200);
        var carouselWidth = function(){return $node.find('.items-container').width();},
            $items = $node.find('li.item'),
            itemsCount = $items.length,
            itemWidth = function(){return Math.floor($items.width())},
            itemsPerRow = function(){return Math.round(carouselWidth() / itemWidth())},
            speed = function(){return itemsPerRow() * 80},
            pagesCount = function(){return Math.ceil(itemsCount / itemsPerRow()) },
            min_margin_right = function(){return (pagesCount() - 1) * $node.find('.items-container').width() * -1},
            max_margin_right = 0;

        function adjustItemsWidth () {
            var windowWidth = $(window).width();
            var containerWidth = $node.find('.items-container').width();
            var itemWidth;
            if ( !eval($node.attr('data-carousel-responsive')) ) {
                itemWidth = containerWidth / $node.attr('data-carousel-items');
            } else if ( windowWidth < 1020) {
                //normal
                itemWidth = containerWidth / $node.attr('data-carousel-items');
            } else if ( windowWidth > 1020 && windowWidth < 1270) {
                //large
                itemWidth = containerWidth / $node.attr('data-carousel-items-lg');
            } else {
                //X large
                itemWidth = containerWidth / $node.attr('data-carousel-items-xlg');
            }
            itemWidth = Math.floor(itemWidth);
            $node.find('li.item').each(function () {
                $(this).width(itemWidth);
            });
        };

        var findNextMargin = function (direction) {
            var marginRight = parseInt($node.find('ul.items').css('margin-right')),
                nextMargin;
            if (direction == 'next') {
                nextMargin = marginRight - $node.find('.items-container').width();
            } else if (direction == 'previous') {
                nextMargin = marginRight + $node.find('.items-container').width();
            }
            return nextMargin;
        };

        var updateBorderClasses = function () {
            $items.removeClass('first');
            $items.removeClass('last');
            var cachedItemsPerRow = itemsPerRow();
            for (var i=0; i < itemsCount; i++) {
                if ( i % cachedItemsPerRow == 0 ){
                    $items.eq(i).addClass('first');
                }
                else if( (i + 1) % cachedItemsPerRow == 0 ) {
                    $items.eq(i).addClass('last');
                }
            }
        };

        var updateNavClasses = function (margin) {
            if (max_margin_right == min_margin_right()) {
                $node.find('.nav[data-direction=previous]').
                    addClass('disabled');
                $node.find('.nav[data-direction=next]').
                    addClass('disabled');
            } else if (margin == max_margin_right) {
                $node.find('.nav[data-direction=previous]').
                    addClass('disabled');
                $node.find('.nav[data-direction=next]').
                    removeClass('disabled');
            }
            else if(margin <= min_margin_right()) {
                $node.find('.nav[data-direction=next]').
                    addClass('disabled');
                $node.find('.nav[data-direction=previous]').
                    removeClass('disabled');
            }
            else {
                $node.find('.nav[data-direction=next]').
                    removeClass('disabled');
                $node.find('.nav[data-direction=previous]').
                    removeClass('disabled');
            }
        };

        $node.find('.nav').click(function(e){
            e.preventDefault();
            if ( !$(this).hasClass('disabled') &&
                !$(this).hasClass('processing')) {

                $(this).addClass('processing');
                var nextMargin = findNextMargin($(this).attr('data-direction'));
                $node.find('.items').animate({
                    'marginRight': nextMargin
                }, speed(), function(){
                    updateNavClasses(nextMargin);
                    $node.find('.nav').removeClass('processing');
                    //updateBorderClasses();
                });
            }
        });

        var init = function(){
            //initializing

            updateNavClasses(0);
            updateBorderClasses();
            if (pagesCount() == 1) {
                $node.find('.nav[data-direction=next]').
                    addClass('disabled');
                $node.find('.nav[data-direction=previous]').
                    addClass('disabled');
            }
        };
        init();

        var resized = false;
        $(window).resize(function() {
            resized = eval($node.attr('data-carousel-responsive')) ? true : false;
        });
        setInterval(function() {
            if (resized) {
                //prefer reset.
                $node.find('.items').animate({
                    'marginRight': 0
                }, speed(), updateNavClasses(0) );
                resized = false;
                adjustItemsWidth();
                updateBorderClasses();
            }
        }, 250);
    };
})(jQuery);
