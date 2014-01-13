require.config({
    baseUrl: '../',
    waitSeconds: 200,
    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        commonPlugins: 'js/dist/plugins/commonPlugins',
        commonVents: 'js/dist/vents/commonVents',
        affix: 'js/libs/bootstrap/js/affix',
        affixEvent: 'js/src/events/affixEvent',
        affixHandler: 'js/src/handlers/affixHandler',
        scrollSpyEvent: 'js/src/events/scrollSpy',
        scrollSpyHandler: 'js/src/handlers/scrollSpyHandler',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        navScroller: 'js/src/events/navScroller',
        scrollSpy: 'js/src/plugins/scrollspy',
        fancyBox: 'js/libs/fancyBox/source/jquery.fancybox.pack',
        fancyBoxThumbs :'js/libs/fancyBox/source/helpers/jquery.fancybox-thumbs',
        typeahead: 'js/libs/typeahead.js/dist/typeahead'
    }

    /*
     *   since our commonVents and commonPlugins are automatically
     *   generated from concatenating other files, we can not wrap theme
     *   with define(), this will cost some load delay time. as soon as development
     *   is done, we should wrap both of them inside define function and make sure
     *   dependencies are set correctly in there.
     */
    ,
    shim: {
        commonVents :{
            deps: ['jquery', 'commonPlugins']
        },
        commonPlugins: {
            deps: ['jquery']
        },
        affixHandler: {
            deps: ['jquery', 'scrollSpy', 'affix']
        },
        affixEvent: {
            deps: ['jquery', 'affixHandler']
        },
        affix: {
            deps: ['jquery', 'scrollSpy']
        },
        scrollSpy: {
            deps: ['jquery'],
            exports: '$.fn.scrollspy'
        },
        fancyBox: {
            deps: ['jquery']
        },
        fancyBoxThumbs: {
            deps: ['jquery', 'fancyBox']
        },
        typeahead: {
            deps: ['jquery']
        },
        scrollSpyHandlers: {
            deps: ['jquery', 'scrollSpy']
        },
        scrollSpyEvent: {
            deps: ['jquery', 'scrollSpyHandler']
        }
    }
});

require(['jquery',
    'commonPlugins',
    'commonVents',
    'affixEvent',
    'navScroller',
    'fancyBox',
    'fancyBoxThumbs',
    'typeahead',
    'scrollSpy',
    'scrollSpyEvent',
    'scrollSpyHandler'

], function () {

    $.noConflict();

    (function ($) {
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
    })(jQuery);
});