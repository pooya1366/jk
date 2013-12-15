if ( typeof jk === 'undefined' ) {
    window.jk = {};
    window.jk.handlers = {};
}

jk.handlers.initCarousels = function () {
    $('.carousel').each(function () {
        $(this).jkCarousel();
    });
}