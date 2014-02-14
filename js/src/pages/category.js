require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        //jQuery exists in this file and has been preloaded using a script tag
        jquery: 'js/dist/critical.min',
        commonPlugins: 'js/dist/plugins/commonPlugins.min',
        commonVents: 'js/dist/vents/commonVents.min',
        respond: 'js/libs/respond/respond.min',
        jqueryCookie: 'js/dist/libs/jquery.cookie.min',
        compareButtonHandler: 'js/dist/handlers/compareButton.min',
        captionHeaderHandler: 'js/dist/handlers/captionHeader.min',
        captionHeaderEvent: 'js/dist/events/captionHeader.min'
    },

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
         'compareButtonHandler',
         'captionHeaderHandler',
         'captionHeaderEvent'
], function () {
    jQuery.noConflict();

    setInterval(function () {
        jk.compare.syncNavCompareList();
    }, 2000);
});