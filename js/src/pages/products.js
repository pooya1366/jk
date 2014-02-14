require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        //jQuery exists in this file and has been preloaded using a script tag
        jquery: 'js/dist/critical.min',
        commonPlugins: 'js/dist/plugins/commonPlugins.min',
        commonVents: 'js/dist/vents/commonVents.min',
        //only for IE
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        //must be concatenated into bootstrap
        dropDown: 'js/libs/bootstrap/js/dropdown',
        ViewToggleHandler: 'js/dist/handlers/categoryViewToggle.min',
        ViewToggleEvent: 'js/dist/events/categoryViewToggle.min',
        compareButtonHandler: 'js/dist/handlers/compareButton.min',
        compareButtonEvent: 'js/dist/events/compareButton.min',
        jqueryCookie: 'js/dist/libs/jquery.cookie.min'
    }

    ,
    shim: {
        dropDown: {
            deps: ['jquery']
        }
    }
});

require([
         'commonVents',
         'commonPlugins',
         'dropDown',
         'ViewToggleHandler',
         'ViewToggleEvent',
         'compareButtonEvent',
         'compareButtonHandler',
         'jqueryCookie'
], function (qViewEvent) {

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