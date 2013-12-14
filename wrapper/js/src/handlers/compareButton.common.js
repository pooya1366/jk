if ( typeof jk === 'undefined' ) {
    window.jk = {
        handlers : {}
    };
}

jk.handlers.addToCompare = function (target) {
    var $product = $(target).parents('.item');
    var productId = $product.attr('data-product-id');
    var productCat = $product.attr('data-attribute-set');

    //extract the cookie to a temporary obj
    //push the current product into it's cat queue
    //overwrite the new object on cookie

    console.log(productId + ' ' + productCat);
};

jk.handlers.toggleCompareInput = function (target) {
    var checkBox = $(target).
            parents('.btn-compare').
            find('input[type=checkbox]');
    checkBox.attr('checked', !checkBox.attr('checked'));
};