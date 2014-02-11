require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        commonPlugins: 'js/dist/plugins/commonPlugins',
        commonVents: 'js/dist/vents/commonVents',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        bootstrap: 'js/dist/libs/bootstrap.min',
        compareEvents: 'js/src/events/compare',
        compareHandlers: 'js/src/handlers/compare',
        compareButtonHandler: 'js/src/handlers/compareButton',
        compareButtonEvent: 'js/src/events/compareButton',
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
        commonPlugins: {
            deps: ['jquery']
        },
        compareEvents: {
            deps: ['jquery', 'compareHandlers']
        },
        compareHandlers: {
            deps: ['jquery']
        }
    }
});

require(['jquery',
    'commonPlugins',
    'commonVents',
    'html5shiv',
    'compareHandlers',
    'compareEvents',
    'compareButtonEvent',
    'compareButtonHandler',
    'jqueryCookie'
], function () {
    jQuery.noConflict();

    jQuery('#addToCompareSearchTxt').typeahead({
        minLength: 2,
        valueKey: 'title',
        remote: {
            url: (function () { return '/jkcatalog/compare/search?q=%QUERY' + window.location.search.replace('?', '&')})()
        },
        template: '<a href="{{url}}">{{title}}</a>',
        engine: Hogan
    });
});