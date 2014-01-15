define(['jquery', 'scrollSpy'], function () {
    var scrollSpyHandlers = {};

    (function ($) {
        scrollSpyHandlers.initialize = function () {
            $('body').scrollspy({
                target: '.spy-active',
                offset: $('#prodcut-aside-fix > .product-image-gallery').height() +
                    $('#product-page-nav > ul > li').height() +
                    21
            });
        };
    })(jQuery);

    return scrollSpyHandlers;
});
