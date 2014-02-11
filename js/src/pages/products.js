require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        commonPlugins: 'js/dist/plugins/commonPlugins',
        commonVents: 'js/dist/vents/commonVents',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        dropDown: 'js/libs/bootstrap/js/dropdown',
        ViewToggleHandler: 'js/src/handlers/categoryViewToggle',
        ViewToggleEvent: 'js/src/events/categoryViewToggle',
        compareButtonHandler: 'js/src/handlers/compareButton',
        compareButtonEvent: 'js/src/events/compareButton',
        jqueryCookie: 'js/libs/jqueryCookie/jquery.cookie'
//        bootstrap: 'js/dist/libs/bootstrap'
//        quickView: 'js/src/modules/quickView'
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
        dropDown: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery'],
            exports: '$.fn.popover'
        }
    }
});

require([
         'jquery',
//         'quickView',
         'commonVents',
         'commonPlugins',
         'dropDown',
         'ViewToggleHandler',
         'ViewToggleEvent',
         'compareButtonEvent',
         'compareButtonHandler',
         'jqueryCookie'
//         'bootstrap'
], function (jQuery, qViewEvent) {


    jQuery.noConflict();

//    qViewEvent.install();

    jQuery(document).ready(function () {
        jk.compare.syncViewWithCookie();
        jk.compare.confirmInit();
        setInterval(function () {
            jk.compare.syncViewWithCookie();
        }, 2000);
    });

});