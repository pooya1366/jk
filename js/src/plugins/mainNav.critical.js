(function ($) {
    $('#nav-browse-flyout').ready(function(){
        var $nav_subcats_wrap = $('#nav-subcats-wrap');
        var $nav_pop_li = $('#nav-cats .nav-pop-li');
        $('#nav-browse-flyout').hover(function() {

            clearTimeout($nav_subcats_wrap.t);
            $nav_subcats_wrap.t = setTimeout((function() {
                $nav_subcats_wrap.stop().animate({width: 520}, {queue: false, duration: 100});
                setTimeout(function(){$nav_subcats_wrap.css('overflow', 'visible')}, 100);
            }), 50);

        }, function() {

            clearTimeout($nav_subcats_wrap.t);
            $nav_subcats_wrap.t = setTimeout((function() {
                $nav_subcats_wrap.stop().animate({width: 0}, {queue: false, duration: 0});
                $($nav_pop_li).removeClass('nav-active');
                $('.nav-subcats').css('display', 'none');
            }), 100);

        });


        $nav_pop_li.hover(function() {

                var target = this;
                clearTimeout($nav_pop_li.t);
                $nav_pop_li.t = setTimeout((function() {
                    $($nav_pop_li).removeClass('nav-active');
                    $(target).addClass('nav-active');
                    var $id = $(target).attr('id').substr(8);
                    $('.nav-subcats').css('display', 'none');
                    $('#nav-subcats-'+$id).css('display', 'block');
                }), 50);

            },
            function() {
                clearTimeout($nav_pop_li.t);
            }
        );
    });
})(jQuery);
