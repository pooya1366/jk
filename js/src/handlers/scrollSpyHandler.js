if (typeof jk === 'undefined') {
    var jk = {};
    jk.handlers = {};
}

(function ($) {
    jk.handlers.initialScrollSpy = function () {
        $('body').scrollspy({
            target: '.spy-active',
            offset: $('#prodcut-aside-fix > .product-image-gallery').height() +
                    $('#product-page-nav > ul > li').height() +
                21
        });
    };
})(jQuery);
