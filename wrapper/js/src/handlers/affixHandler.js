if (typeof jk === 'undefined') {
    var jk = {};
    jk.handlers = {};
}

jk.handlers.initialAffix = function () {
    $('#prodcut-aside-fix').affix({
        offset: {
            top: function() { return ($('#jk-header').height()+$('ol.breadcrumb').height() + 45); }
        }
    });

    $('body').scrollspy({
        target: '.spy-active',
        offset: (
            $('#prodcut-aside-fix > .product-image-gallery').height() +
                $('#product-page-nav > ul > li').height() +
                21
            )
    });
}