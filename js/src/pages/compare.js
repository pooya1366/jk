require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        //jQuery exists in this file and has been preloaded using a script tag
        jquery: 'js/dist/critical.min',
        commonPlugins: 'js/dist/plugins/commonPlugins.min',
        commonVents: 'js/dist/vents/commonVents.min',
        bootstrap: 'js/dist/libs/bootstrap.min',
        compareEvents: 'js/dist/events/compare.min',
        compareHandlers: 'js/dist/handlers/compare.min',
        compareButtonHandler: 'js/dist/handlers/compareButton.min',
        compareButtonEvent: 'js/dist/events/compareButton.min',
        jqueryCookie: 'js/dist/libs/jquery.cookie.min'
    },
    shim: {
        compareEvents: {
            deps: ['compareHandlers']
        }
    }
});

require([
    'commonPlugins',
    'commonVents',
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
            url: '/jkcatalog/compare/search?q=%QUERY',
            replace: function (url, query) {
                return url.replace('%QUERY', query) + window.location.search.replace('?', '&');
            }
        },
        template: '<a href="{{url}}">{{title}}</a>',
        engine: Hogan
    });
});