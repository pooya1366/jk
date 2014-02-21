require.config({
    baseUrl: '/skin/frontend/jetkharid/default/',
    waitSeconds: 200,
    paths: {
        //jQuery exists in this file and has been preloaded using a script tag
        jquery: 'js/dist/critical.min',
        commonPlugins: 'js/dist/plugins/commonPlugins.min',
        compareButtonHandler: 'js/dist/handlers/compareButton.min',
        commonVents: 'js/dist/vents/commonVents.min',
        jqueryCookie: 'js/dist/libs/jquery.cookie.min',
        slideShow: 'js/dist/plugins/jQuery.jkSlider.min'
    }
});

require(['jquery',
        'commonPlugins',
        'commonVents',
        'compareButtonHandler',
        'slideShow'
], function () {
    jQuery.noConflict();

	jQuery(document).ready(function () {
		jQuery('.home-slider-wrapper').eq(0).jkSlider({
			slideDuration: 5000,
			effect: 'horizontal'
		});
		jQuery('.cat-slider-wrapper').eq(0).jkSlider({
			slideDuration: 5000,
			effect: 'vertical'
		});
	});

	setInterval(function () {
        jk.compare.syncNavCompareList();
    }, 2000);

});