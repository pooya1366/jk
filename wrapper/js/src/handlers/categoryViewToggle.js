define(['jquery'], function() {
    if ( typeof jk === 'undefined' ) {
        window.jk = {};
        window.jk.handlers = {};
    }

    jk.handlers.categoryViewToggleInstaller = function () {
        $('.view-toggle button').click(function(e){
            e.preventDefault();

            var id = $(this).attr('id');

            if(!$('.products-list ol.item-list').hasClass(id)){

                $('.view-toggle button').removeClass('active');
                $(this).addClass('active');

                $('.products-list ol.item-list').fadeOut(20, function() {

                    $('.products-list ol.item-list').removeClass('GridView ListView');

                    $('.products-list ol.item-list').addClass(id);

                    $('.products-list ol.item-list').fadeIn(200);
                });
            }

        });    }
});