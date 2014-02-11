//define(['js/libs/jquery/jquery', 'js/libs/bootstrap/js/scrollspy'], function (jQuery, scrollspy) {
define(['jquery', 'scrollSpy'], function (jQuery, scrollspy) {
    return {
        install: function () {
            $(document).ready(function () {
                $('body').scrollspy({
                    target: '.spy-active',
                    offset: $('#prodcut-aside-fix > .product-image-gallery').height() +
                        $('#product-page-nav > ul > li').height() +
                        21
                });
            });
        }
    };
});