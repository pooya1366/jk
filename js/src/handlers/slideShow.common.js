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
                direction: 'horizontal',
                controlNav: false,
                directionNav: false,
                slideshowSpeed: 70000
            };

        options.animation = $node.attr('data-animation') || options.animation;
        options.direction = $node.attr('data-direction') || options.direction;
        options.directionNav = $node.attr('data-arrows') || options.directionNav;
        options.controlNav = $node.attr('data-pages') || options.controlNav;
        options.slideshowSpeed = $node.attr('data-speed') || options.slideshowSpeed;

        $node.flexslider(options);

    }
})(jQuery);