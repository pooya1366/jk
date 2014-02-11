require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        commonPlugins: 'js/dist/plugins/commonPlugins',
        commonVents: 'js/dist/vents/commonVents',
        affix: 'js/libs/bootstrap/js/affix',
        affixEvent: 'js/src/events/affixEvent',
        affixHandler: 'js/src/handlers/affixHandler',
        scrollSpy: 'js/libs/bootstrap/js/scrollspy',
        scrollSpyEvent: 'js/src/events/scrollSpy',
        compareButtonHandler: 'js/src/handlers/compareButton',
        compareButtonEvent: 'js/src/events/compareButton',
        jqueryCookie: 'js/libs/jqueryCookie/jquery.cookie',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        fancyBoxHandlers :'js/src/handlers/fancyBoxHandler',
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
        commonPlugins: {
            deps: ['jquery']
        },
        typeahead: {
            deps: ['jquery']
        },
        affix: {
            deps: ['jquery']
        },
        affixHandler: {
            deps: ['jquery', 'affix']
        },
        affixEvent: {
            deps: ['jquery', 'affixHandler'],
            exports: '$.fn.affix'
        },
        scrollSpy: {
            deps: ['jquery'],
            exports: '$.fn.scrollspy'
        },
        scrollSpyEvent: {
            deps: ['jquery', 'scrollSpy']
        },
        jqueryCookie: {
            deps: ['jquery'],
            exports: '$.cookie'
        }
    }
});


require([
    'scrollSpyEvent',
    'fancyBoxHandlers',
    'jquery',
    'commonVents',
    'commonPlugins',
    'compareButtonEvent',
    'compareButtonHandler',
    'affixEvent',
    'scrollSpy',
    'jqueryCookie'
], function (scrollSpyPackage, fancy) {

    fancy.install();
    scrollSpyPackage.install();
});
