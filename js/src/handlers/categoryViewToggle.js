define(['jquery'], function() {
    if ( typeof jk === 'undefined' ) {
        window.jk = {};
        window.jk.handlers = {};
    }

    jk.handlers.categoryViewToggle = function (target) {
        var id = $(target).attr('id');

        if(!$('.products-list ol.item-list').hasClass(id)){
            $('.view-toggle button').removeClass('active');
            $(target).addClass('active');
            $('.products-list ol.item-list').fadeOut(20, function() {
                $('.products-list ol.item-list').removeClass('GridView ListView');
                $('.products-list ol.item-list').addClass(id);
                $('.products-list ol.item-list').fadeIn(200);
            });
        }
    }

    return undefined;
});