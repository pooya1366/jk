require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        commonPlugins: 'js/dist/plugins/commonPlugins',
        commonVents: 'js/dist/vents/commonVents',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        captionHeaderHandler: 'js/src/handlers/captionHeader',
        captionHeaderEvent: 'js/src/events/captionHeader'
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
        mainNav: {
            deps: ['jquery']
        }
    }
});

require(['jquery',
         'commonVents',
         'commonPlugins',
         'captionHeaderHandler',
         'captionHeaderEvent'
], function () {
    $.noConflict();
});