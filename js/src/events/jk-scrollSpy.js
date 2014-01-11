define(['jquery'], function () {
    /**
     * Make sure you include only one scrollSpy per page or it wont work.
     */
    jk.events = jk.events || {};
    (function ($) {
        jk.events.initialScrollSpy = function () {
            $('.jk-scrollSpy').delegate('li', 'click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).attr('data-for')) {
                    jk.scrollSpy.scrollTo($(this).attr('data-for'));
                } else {
                    throw new Error('data-for attribute missing')
                }
            });
        };

        jk.events.watchScroll = function () {
            var scrolled = false;
            $(window).scroll(function() {
                scrolled = true;
            });
            setInterval(function() {
                if (scrolled) {
                    jk.scrollSpy.updateNav();
                    scrolled = false;
                }
            }, 1000);
        };

    })(jQuery);
    jk.events.initialScrollSpy();
    jk.events.watchScroll();
});