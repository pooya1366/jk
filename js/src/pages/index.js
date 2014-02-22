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
        slideShow: 'js/dist/plugins/jQuery.jkHorizontalSlider.min'
    }
});

require(['jquery',
        'commonPlugins',
        'commonVents',
        'compareButtonHandler',
        'slideShow'
], function () {
    jQuery.noConflict();

	(function ($) {
		$(document).ready(function () {
			$('.jk-h-slider-wrapper').each(function () {
				$(this).jkHorizontalSlider();
			});
		});
	})(jQuery);

	setInterval(function () {
        jk.compare.syncNavCompareList();
    }, 2000);

});