//define(['js/libs/jquery/jquery', 'js/libs/bootstrap/js/scrollspy'], function (jQuery, scrollspy) {
define(['jquery', 'scrollSpy'], function ($, scrollspy) {
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

            $('#product-page-nav ul.nav a').click(function (e) {
                var id = $(e.target).attr('href');

                $('html, body').animate({
                    scrollTop: $(id).offset().top
                }, 500);

                return false;
            });
        }
    };
});