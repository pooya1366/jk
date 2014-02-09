define(['jquery'], function () {
    var events = {};
    events.initialScrollSpy = function () {
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

    events.watchScroll = function () {
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

    events.install = function () {
        events.initialScrollSpy();
        events.watchScroll();
    };

    return events;
});