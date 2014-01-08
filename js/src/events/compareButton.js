define(['compareButtonHandler'], function () {
    (function ($) {
        //if a add to compare list button is clicked
        $('.products-list .item').delegate('div.btn-compare', 'click', function (e) {
            //toggle the checkbox inside this button
            jk.handlers.toggleCompareInput(e.target);
            //add or remove product to compare queue
            jk.handlers.updateCompareQueue(e.target);
            //sync
            jk.compare.syncViewWithCookie();
            e.preventDefault();
        });

        $(document).ready(function () {
            jk.compare.syncViewWithCookie();
            jk.compare.confirmInit();
            setInterval(function () {
                jk.compare.syncViewWithCookie();
            }, 2000);
        });

        //move add to compare button
        //event handler combined due to simplicity
        $(".products-list div.btn-compare").hover(function(){
            if( $('#ListView').hasClass('active') ) {
                return;
            }
            $(this).animate({'width': '80px'}, 100);
        }, function(){
            if( $('#ListView').hasClass('active') ) {
                return;
            }
            $(this).animate({'width': '36px'}, 100);
        })
    })(jQuery);
});
