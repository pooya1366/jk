require.config({
    baseUrl: '../',
    waitSeconds: 200,
    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        commonPlugins: 'js/dist/plugins/commonPlugins',
        commonVents: 'js/dist/vents/commonVents',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        dropDown: 'js/libs/bootstrap/js/dropdown',
        ViewToggleHandler: 'js/src/handlers/categoryViewToggle',
        compareButtonHandler: 'js/src/handlers/compareButton',
        ViewToggleEvent: 'js/src/events/categoryViewToggle',
        compareButtonEvent: 'js/src/events/compareButton',
        mainNav: 'js/src/plugins/mainNav.common',
        jqueryCookie: 'js/libs/jqueryCookie/jquery.cookie'
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
        dropDown: {
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
         'dropDown',
         'ViewToggleHandler',
         'ViewToggleEvent',
         'mainNav',
         'compareButtonEvent',
         'compareButtonHandler',
         'jqueryCookie'

], function () {
});