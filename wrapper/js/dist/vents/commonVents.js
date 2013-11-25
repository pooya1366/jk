if ( typeof jk === 'undefined' ) {
    window.jk = {};
    window.jk.handlers = {};
}

jk.handlers.initCarousels = function () {
    $('.carousel').each(function () {
        $(this).jkCarousel();
    });
};if ( typeof jk === 'undefined' ) {
    window.jk = {};
    window.jk.handlers = {};
}

jk.handlers.selectboxInstaller = function () {
    $('.selectbox').each(function () {
        $(this).selectBox();
    });
};;(function () {
    console.log('handling styles');
})();
;$(document).ready(function () {
    jk.handlers.initCarousels();
});;$(document).ready(function () {
    jk.handlers.selectboxInstaller();
});;(function () {
    console.log('style related events');
})();
