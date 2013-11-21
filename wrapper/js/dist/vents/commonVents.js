if ( typeof jk === 'undefined' ) {
    window.jk = {};
    window.jk.handlers = {};
}

jk.handlers.initCarousels = function () {
    $('.carousel').each(function () {
        $(this).jkCarousel();
    });
};(function () {
    console.log('handling styles');
})();
;$(document).ready(function () {
    jk.handlers.initCarousels();
});;(function () {
    console.log('style related events');
})();