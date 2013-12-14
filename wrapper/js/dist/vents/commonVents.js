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
    window.jk = {
        handlers : {}
    };
}

jk.handlers.addToCompare = function (target) {
    var $product = $(target).parents('.item');
    var productId = $product.attr('data-product-id');
    var productCat = $product.attr('data-attribute-set');

    //extract the cookie to a temporary obj
    //push the current product into it's cat queue
    //overwrite the new object on cookie

    console.log(productId + ' ' + productCat);
};

jk.handlers.toggleCompareInput = function (target) {
    var checkBox = $(target).
            parents('.btn-compare').
            find('input[type=checkbox]');
    checkBox.attr('checked', !checkBox.attr('checked'));
};;if ( typeof jk === 'undefined' ) {
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
});;$('.products-list .item').delegate('div.btn-compare', 'click', function (e) {
    //add to compare queue
    jk.handlers.addToCompare(e.target);
    //toggle the checkbox inside this button
    jk.handlers.toggleCompareInput(e.target);

    e.preventDefault();
});
;jk.handlers.selectboxInstaller();
;//(function () {
//    console.log('style related events');
//})();
;//(function () {
//    console.log('style related events');
//})();
