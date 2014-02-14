require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        //jQuery exists in this file and has been preloaded using a script tag
        jquery: 'js/dist/critical.min',
        commonPlugins: 'js/dist/plugins/commonPlugins.min',
        compareButtonHandler: 'js/dist/handlers/compareButton.min',
        commonVents: 'js/dist/vents/commonVents.min',
        jqueryCookie: 'js/dist/libs/jquery.cookie.min',
        slideShow: 'js/libs/flexSlider/jquery.flexslider'
    },
    shim: {
        slideShow: {
            deps: ['jquery']
        }
    }
});

require(['jquery',
        'commonPlugins',
        'commonVents',
        'compareButtonHandler',
        'html5shiv',
        'slideShow'
], function () {
    jQuery.noConflict();

    setInterval(function () {
        jk.compare.syncNavCompareList();
    }, 2000);

});