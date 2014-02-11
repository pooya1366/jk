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
        jqueryCookie: 'js/libs/jqueryCookie/jquery.cookie',
        html5shiv: 'js/libs/html5shiv/dist/html5shiv',
        respond: 'js/libs/respond/respond.min',
        fancyBox :'js/dist/plugins/fancyBox',
        fancyBoxHandlers :'js/src/handlers/fancyBoxHandler',
        stickySidebar :'js/src/plugins/stickySidebar',
        typeahead: 'js/libs/typeahead.js/dist/typeahead'
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
        typeahead: {
            deps: ['jquery']
        },
        scrollSpy: {
            deps: ['jquery'],
            exports: '$.fn.scrollspy'
        },
        scrollSpyEvent: {
            deps: ['jquery', 'scrollSpy']
        },
        jqueryCookie: {
            deps: ['jquery'],
            exports: '$.cookie'
        },
        fancyBox: {
            deps: ['jquery'],
            exports: '$.fn.fancyBox'
        }
    }
});


require([
    'scrollSpyEvent',
    'fancyBoxHandlers',
    'jquery',
    'commonVents',
    'commonPlugins',
    'compareButtonHandler',
    'stickySidebar',
    'scrollSpy',
    'jqueryCookie'
], function (scrollSpyPackage, fancy) {


    $(document).ready(function () {
        jQuery('#prodcut-aside-fix').stickySidebar({
            headerSelector: '#jk-header',
            contentSelector: '.product-details',
            footerSelector: '.footer-container',
            sidebarTopMargin: 10,
            footerThreshold: 60
        });
    });


    fancy.install();
    scrollSpyPackage.install();


    $('div.btn-compare').delegate('.icon-checkbox ', 'click', function (e) {
        //toggle the checkbox inside this button
        jk.handlers.toggleCompareInput(e.target);
        var $product = $('#product-common-info'),
            id = $product.data('product-id'),
            setId = $product.data('attribute-set-id'),
            setName = $product.data('attribute-set-name');

        if ( $(e.target).hasClass('fa-check-square-o') ) {
            jk.compare.addProduct(setId, setName, id);
        } else {
            jk.compare.removeProduct(id);
        }
        //sync
        jk.compare.syncViewWithCookie();
        e.preventDefault();
    });

    setInterval(function () {
        jk.compare.syncViewWithCookie();
    }, 2000);

});
