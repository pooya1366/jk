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
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        navScroller: 'js/src/events/navScroller',
        scrollSpy: 'js/libs/bootstrap/js/scrollspy',
        mainNav: 'js/src/plugins/mainNav.common'
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
            deps: ['jquery']
        },
        mainNav: {
            deps: ['jquery']
        }

    }
});

require(['jquery',
    'commonPlugins',
    'commonVents',
    'affixEvent',
    'compare',
    'navScroller',
    'mainNav'

], function () {

});