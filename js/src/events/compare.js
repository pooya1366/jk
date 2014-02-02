(function ($) {
    //toggle effect
    $('#properties').delegate('.heading div ', 'click', function (e) {
        jk.compare.toggleRow(e.target);
    });

    //horizontal highlight effect
    $('#properties, #grid').delegate('tr', 'mouseover mouseout', function (e) {
        jk.compare.highlightRow(e.target, e.type);
    });

    //vertical highlight effect
    $('#products').delegate('td', 'mouseover mouseout', function (e) {
        jk.compare.highlightCol(e.target, e.type);
    });

    //remove effect
    $('#products').delegate('td .remove', 'click', function (e) {
        jk.compare.removeFromGrid(e.target);
        jk.compare.removeProduct(
            $(e.target).
                parents('div.product-info').
                attr('data-product-id')
        );
    });

    //initialize
    $(document).ready(function () {
        jk.compare.init();
    });

    //move effect
    $('#products').delegate('.move-right,.move-left', 'click', function (e) {
        jk.compare.moveCol(e.target);
        jk.compare.updateControlView();
    });

    $('#corner').delegate('#queue-categories li', 'click', function (e) {
        var categoryId = $(e.target).parents('li').attr('data-category-id');
        jk.compare.showCategory(categoryId);
        jk.compare.updateControlView();
        jk.compare.syncRowsHeight();
    });


})(jQuery);