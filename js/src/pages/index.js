require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        //jQuery exists in this file and has been preloaded using a script tag
        jquery: 'js/dist/critical.min',
        commonPlugins: 'js/dist/plugins/commonPlugins.min',
        commonVents: 'js/dist/vents/commonVents.min',
        //this script should only be loaded for IE
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
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
        'html5shiv',
        'slideShow'
], function () {
    jQuery.noConflict();

});