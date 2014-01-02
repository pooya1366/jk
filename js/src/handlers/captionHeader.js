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
}