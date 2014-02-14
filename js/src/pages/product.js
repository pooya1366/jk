require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        //jQuery exists in this file and has been preloaded using a script tag
        jquery: 'js/dist/critical.min',
        commonPlugins: 'js/dist/plugins/commonPlugins.min',
        commonVents: 'js/dist/vents/commonVents.min',
        scrollSpy: 'js/dist/plugins/scrollspy.min',
        scrollSpyEvent: 'js/dist/events/scrollSpy.min',
        compareButtonHandler: 'js/dist/handlers/compareButton.min',
        compareButtonEvent: 'js/dist/events/compareButton.min',
        jqueryCookie: 'js/dist/libs/jquery.cookie.min',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        fancyBox :'js/dist/plugins/fancyBox.min',
        stickySidebar :'js/dist/plugins/stickySidebar.min'
    },
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
    'scrollSpyEvent',
    'fancyBox',
    'commonVents',
    'commonPlugins',
    'compareButtonHandler',
    'compareButtonEvent',
    'stickySidebar',
    'scrollSpy',
    'jqueryCookie'
], function (scrollSpyPackage) {
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

    jQuery(document).ready(function () {
        jQuery('ul.fancy-box a').fancybox( {
            openEffect: 'elastic',
            closeEffect: 'none',
            arrows: true,
            margin: [40, 40, 60, 40],
            helpers: {
                thumbs: {
                    width: 50,
                    height: 50
                }
            }
        });
    });

        scrollSpyPackage.install();

    setInterval(function () {
        jk.compare.syncViewWithCookie();
    }, 2000);

});
