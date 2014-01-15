require.config({
    baseUrl: '../',
    waitSeconds: 200,
    paths: {
        fancyBox: 'js/libs/fancyBox/source/jquery.fancybox.pack',
        fancyBoxThumbs :'js/libs/fancyBox/source/helpers/jquery.fancybox-thumbs'
    },
    shim: {
        fancyBox: {
            deps: ['jquery']
        },
        fancyBoxThumbs: {
            deps: ['jquery', 'fancyBox']
        }
    }
});



define(['jquery', 'fancyBox', 'fancyBoxThumbs'], function () {
    var handler = {};
    (function ($) {
        handler.initialize = function () {
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
        };
    })(jQuery);
    return handler;
});