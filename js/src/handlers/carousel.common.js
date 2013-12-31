if ( typeof jk === 'undefined' ) {
    window.jk = {};
    window.jk.handlers = {};
}
(function ($) {
    jk.handlers.initCarousels = function () {
        $('.carousel').each(function () {
            $(this).jkCarousel();
        });
    }
})(jQuery);

