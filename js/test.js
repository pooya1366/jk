get_carousel_vars = function(carousel) {

    var parent_carousel = carousel;

    var scroll_val = parent_carousel.children('.items-container').width();
    var margin_right = parseInt(parent_carousel.find('ul.items').css('margin-right'));
    var items = parent_carousel.find('li.item');
    var count_items = items.length;
    var item_width = items.width();
    var items_in_row = scroll_val / item_width;
    var speed = items_in_row * 80;
    var num_of_pages = Math.ceil((count_items*item_width)/scroll_val)
    var min_margin_right = (num_of_pages - 1) * scroll_val * -1;
    var max_margin_right = 0;

    var return_vars = new Array();

    return_vars['scroll_val'] = scroll_val;
    return_vars['margin_right'] = margin_right;
    return_vars['count_items'] = count_items;
    return_vars['items'] = items;
    return_vars['item_width'] = item_width;
    return_vars['items_in_row'] = items_in_row;
    return_vars['speed'] = speed;
    return_vars['num_of_pages'] = num_of_pages;
    return_vars['min_margin_right'] = min_margin_right;
    return_vars['max_margin_right'] = max_margin_right;

    return return_vars;

}
initialize_carousel = function(carousel) {

    var carousel_vars = get_carousel_vars(carousel);
    var count_items = carousel_vars['count_items'];
    var items_in_row = carousel_vars['items_in_row'];
    var items = carousel_vars['items'];

    carousel.children('.items-container').children('ul.items').css('margin-right', 0);
    carousel.children('.nav.next').removeClass('disabled');
    carousel.children('.nav.previous').addClass('disabled');

    items.removeClass('last');

    for(var i=0; i < count_items; i++) {
       if(i%items_in_row == 0){
           items.eq(i).addClass('last');
       }
    }
}

$('.carousel .nav').click(function(e){
    e.preventDefault();
    if(!$(this).hasClass('disabled') && !$(this).hasClass('processing')) {

        var parent_carousel = $(this).parent('.carousel');
        var carousel_vars = get_carousel_vars(parent_carousel);

        var scroll_val = carousel_vars['scroll_val'];
        var margin_right = carousel_vars['margin_right'];
        var count_items = carousel_vars['count_items'];
        var item_width = carousel_vars['item_width'];
        var items_in_row = carousel_vars['items_in_row'];
        var speed = carousel_vars['speed'];
        var num_of_pages = carousel_vars['num_of_pages'];
        var min_margin_right = carousel_vars['min_margin_right'];
        var max_margin_right = carousel_vars['max_margin_right'];

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
    $('.carousel').each(function() {
        initialize_carousel($(this));
    });

});

$(document).ready(function() {
    $('.carousel').each(function() {
        initialize_carousel($(this));
    });
});
