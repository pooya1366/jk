define(['js/libs/jquery/jquery', 'js/libs/bootstrap/js/scrollspy'], function (jQuery, scrollspy) {
    var scrollSpyHandlers = {};

    scrollSpyHandlers.initialize = function () {
        $('body').scrollspy({
            target: '.spy-active',
            offset: $('#prodcut-aside-fix > .product-image-gallery').height() +
                $('#product-page-nav > ul > li').height() +
                21
        });
    };

    return scrollSpyHandlers;
});
