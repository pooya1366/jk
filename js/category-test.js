/**
 * Created by pooyasaberian on 11/7/13.
 */
$('.subcategories-panel .box .caption-header').click(function(){

    var parent_box = $(this).parent('.caption-box').parent('.box');
    var caption_box = parent_box.children('.caption-box');
    var caption_header = caption_box.children('.caption-header');
    var caption_list = caption_box.children('.caption-list');

    caption_list.slideToggle(150);
    caption_header.toggleClass('open');
    caption_list.find('.shop-all').fadeToggle(80);
});