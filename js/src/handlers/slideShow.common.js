(function ($) {
    if ( typeof jk === 'undefined' ) {
        window.jk = {};
        window.jk.handlers = {};
    }

    jk.handlers.slideShow = function (node) {
        var $node = $(node),
            options = {
                reverse: true,
                animation: 'slide',
                direction: 'horizontal'
            };

        options.animation = $node.attr('data-animation') || options.animation;
        options.direction = $node.attr('data-direction') || options.direction;

        $node.flexslider(options);

    }
})(jQuery);