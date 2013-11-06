$('.carousel .nav').click(function(e){
    e.preventDefault();
    if(!$(this).hasClass('disabled') && !$(this).hasClass('processing')){
        var parent_carousel = $(this).parent('.carousel');
        var scroll_val = parent_carousel.children('.items-container').width();
        var margin_right = parseInt(parent_carousel.find('ul.items').css('margin-right'));
        var count_items = parent_carousel.find('li.item').length;
        var item_width = parent_carousel.find('li.item').width();
        var items_in_row = scroll_val / item_width;
        var speed = items_in_row * 100;
        var min_margin_right = (parseInt((count_items*item_width) / scroll_val)*scroll_val) * -1;
        var max_margin_right = 0;

        parent_carousel.children('.nav').addClass('processing');

        if($(this).hasClass('next')) {
            var calculated_margin_right = margin_right - scroll_val;
        }
        else if($(this).hasClass('previous')) {
            var calculated_margin_right = margin_right + scroll_val;
        }

        parent_carousel.find('.items').animate({
            'marginRight': calculated_margin_right
        }, speed, function(){
            var margin_right = parseInt(parent_carousel.find('.items').css('margin-right'));
            if(margin_right == max_margin_right) {
                parent_carousel.children('.nav.previous').addClass('disabled');
                parent_carousel.children('.nav.next').removeClass('disabled');
            }
            else if(margin_right == min_margin_right) {
                parent_carousel.children('.nav.next').addClass('disabled');
                parent_carousel.children('.nav.previous').removeClass('disabled');
            }
            else {
                parent_carousel.children('.nav.next').removeClass('disabled');
                parent_carousel.children('.nav.previous').removeClass('disabled');
            }
            parent_carousel.children('.nav').removeClass('processing');
        });
    }
});
$(window).resize(function() {
    $('.carousel .items').css('margin-right', 0);
    $('.carousel .nav.next').removeClass('disabled');
    $('.carousel .nav.previous').addClass('disabled');
});
