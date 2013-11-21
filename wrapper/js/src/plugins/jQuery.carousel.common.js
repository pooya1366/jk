jQuery.fn.jkCarousel = function () {
    var $node = $(this),
        carouselWidth = function(){return $node.find('.items-container').width()},
        $items = $node.find('li.item'),
        itemsCount = $items.length,
        itemWidth = function(){return $items.width()},
        itemsPerRow = function(){return carouselWidth() / itemWidth()},
        speed = function(){return itemsPerRow() * 80},
        pagesCount = function(){return Math.ceil( (itemsCount * itemWidth()) / carouselWidth())},
        min_margin_right = function(){return (pagesCount() - 1) * carouselWidth() * -1},
        max_margin_right = 0;

    var findNextMargin = function (direction) {
        var marginRight = parseInt($node.find('ul.items').css('margin-right')),
            nextMargin;
        if (direction == 'next') {
            nextMargin = marginRight - carouselWidth();
        } else if (direction == 'previous') {
            nextMargin = marginRight + carouselWidth();
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
        if (margin == max_margin_right) {
            $node.find('.nav[data-direction=previous]').
                addClass('disabled');
            $node.find('.nav[data-direction=next]').
                removeClass('disabled');
        }
        else if(margin == min_margin_right()) {
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
            });
        }
    });

    var init = function(){
        //initializing
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
        resized = true;
    });
    setInterval(function() {
        if (resized) {
            //prefer reset.
            $node.find('.items').animate({
                'marginRight': 0
            }, speed(), updateNavClasses(0) );
            resized = false;
            updateBorderClasses();
        }
    }, 250);
}