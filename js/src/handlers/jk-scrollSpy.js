define(['jquery'], function () {
    jk.scrollSpy = {};
    (function ($) {
        /**
         *
         * @param id id of the element you want to scroll to
         */
        jk.scrollSpy.scrollTo = function (id, speed) {
            speed = speed || 300;
            $('html, body').
                animate({
                        scrollTop: $(id).offset().top
                }, speed);
        };

        jk.scrollSpy.activeNavigationItem = function (index) {
            $('.jk-scrollSpy li').
                removeClass('active').
                eq(index).
                addClass('active');
        };

        jk.scrollSpy.updateNav = function () {
            var scrollY = window.scrollY;
            var positions = [];
            $('.jk-scrollSpy li').each(function () {
                positions.push($($(this).attr('data-for')).offset().top);
            });
            for (var i = 1; i <= positions.length; i++) {
                if (scrollY <= positions[i] && scrollY >= positions[i-1]) {
//                    console.log(i-1);
                    jk.scrollSpy.activeNavigationItem(i-1)
                }
            }
        };
    })(jQuery);

});