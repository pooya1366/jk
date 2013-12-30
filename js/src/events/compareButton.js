define(['compareButtonHandler'], function () {
    //if a add to compare list button is clicked
    $('.products-list .item').delegate('div.btn-compare', 'click', function (e) {
        //toggle the checkbox inside this button
        jk.handlers.toggleCompareInput(e.target);
        //add or remove product to compare queue
        jk.handlers.updateCompareQueue(e.target);

        e.preventDefault();
    });

    $(document).ready(function () {
        jk.compare.syncViewWithCookie();
    });

    //move add to compare button
    //event handler combined due to simplicity
    $(".products-list div.btn-compare").hover(function(){
        $(this).animate({'width': '80px'}, 100);
    }, function(){
        $(this).animate({'width': '39px'}, 100);
    })
});
