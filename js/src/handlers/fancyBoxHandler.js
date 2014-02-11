define([
    'jquery',
    'js/libs/fancyBox/source/jquery.fancybox.pack',
    'js/libs/fancyBox/source/helpers/jquery.fancybox-thumbs'
], function (jQuery, fancyBox, fancyBoxThumbs) {
    return {
        install : function () {
            $(document).ready(function () {
                $('ul.fancy-box a').fancybox( {
                    openEffect: 'elastic',
                    closeEffect: 'none',
                    arrows: true,
                    margin: [40, 40, 60, 40],
                    helpers: {
                        thumbs: {
                            width: 50,
                            height: 50
                        }
                    }
                });
            });
        }
    }
});