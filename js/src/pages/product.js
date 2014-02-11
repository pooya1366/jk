require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        jquery: 'js/libs/jquery/jquery.min',
        commonPlugins: 'js/dist/plugins/commonPlugins',
        commonVents: 'js/dist/vents/commonVents',
        scrollSpy: 'js/libs/bootstrap/js/scrollspy',
        scrollSpyEvent: 'js/src/events/scrollSpy',
        compareButtonHandler: 'js/src/handlers/compareButton',
        compareButtonEvent: 'js/src/events/compareButton',
        jqueryCookie: 'js/libs/jqueryCookie/jquery.cookie',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        fancyBox :'js/dist/plugins/fancyBox',
        fancyBoxHandlers :'js/src/handlers/fancyBoxHandler',
        stickySidebar :'js/src/plugins/stickySidebar'
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
        stickySidebar: {
            deps: ['jquery']
        },
        commonPlugins: {
            deps: ['jquery']
        },
        scrollSpy: {
            deps: ['jquery'],
            exports: 'jQuery.fn.scrollspy'
        },
        scrollSpyEvent: {
            deps: ['jquery', 'scrollSpy']
        },
        jqueryCookie: {
            deps: ['jquery'],
            exports: 'jQuery.cookie'
        },
        fancyBox: {
            deps: ['jquery'],
            exports: 'jQuery.fn.fancyBox'
        }
    }
});


require([
    'jquery',
    'scrollSpyEvent',
    'fancyBoxHandlers',
    'commonVents',
    'commonPlugins',
    'compareButtonHandler',
    'compareButtonEvent',
    'stickySidebar',
    'scrollSpy',
    'jqueryCookie'
], function (jQuery, scrollSpyPackage, fancy) {
    jQuery.noConflict();

    jQuery(document).ready(function () {
        jQuery('#prodcut-aside-fix').stickySidebar({
            headerSelector: '#jk-header',
            contentSelector: '.product-details',
            footerSelector: '.footer-container',
            navSelector: '.breadcrumb',
            sidebarTopMargin: 20,
            footerThreshold: 60
        });
    });

    fancy.install();
    scrollSpyPackage.install();

    setInterval(function () {
        jk.compare.syncViewWithCookie();
    }, 2000);

});
