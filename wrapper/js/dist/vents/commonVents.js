if ( typeof jk === 'undefined' ) {
    window.jk = {};
    window.jk.handlers = {};
}

jk.handlers.initCaptionHeader = function () {
    $('body').delegate('.subcategories-panel .box .caption-header', 'click', function () {
        var parent_box = $(this).parents('.box');
        var caption_box = parent_box.children('.caption-box');
        var caption_header = caption_box.children('.caption-header');
        var caption_list = caption_box.children('.caption-list');

        caption_list.slideToggle(150);
        caption_header.toggleClass('open');
        caption_list.find('.shop-all').fadeToggle(80);
    });
};if ( typeof jk === 'undefined' ) {
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
        $(this).selectBox({animationSpeed: 'fast'});
    });
};;(function () {
    console.log('handling styles');
})();
;$(document).ready(function () {
    jk.handlers.initCaptionHeader();
});;$(document).ready(function () {
    jk.handlers.initCarousels();
});;jk.handlers.selectboxInstaller();
;//(function () {
//    console.log('style related events');
//})();
;//(function () {
//    console.log('style related events');
//})();
