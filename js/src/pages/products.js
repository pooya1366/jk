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
    }

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
         'commonVents',
         'commonPlugins',
         'dropDown',
         'ViewToggleHandler',
         'ViewToggleEvent',
         'compareButtonEvent',
         'compareButtonHandler',
         'jqueryCookie'
], function (jQuery, qViewEvent) {

    var firstMsg = new Notification({message: 'some msg', duration: 10000});
    setInterval(function () {
        var firstMsg = new Notification({message: 'some msg', duration: 10000});
    }, 4000)

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