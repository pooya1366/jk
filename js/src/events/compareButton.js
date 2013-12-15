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
});
