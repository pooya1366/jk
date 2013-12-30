define(['jqueryCookie'], function () {
    window.jk = window.jk || {};
    jk.handlers = jk.handlers || {};
    jk.compare  = jk.compare || {};


    jk.compare.findProduct = function (productId) {
        productId = ~~productId;
        var cookie = $.cookie('compare-queue'),
            compareQueue = JSON.parse(cookie || '{}');
        var queues = compareQueue.queues;

        for ( var q in queues) {
            var position = jQuery.inArray(productId, queues[q]);
            //if a match is found
            if ( ~position ) {
                //delete it
                return {queue: q, index: position};
            }
        }
        return -1;
    };

    jk.compare.removeProduct = function (productId) {
        productId = ~~productId;
        var cookie = $.cookie('compare-queue'),
            compareQueue = JSON.parse(cookie || '{}'),
            queues = compareQueue.queues,
            product = jk.compare.findProduct(productId),
            q = product.queue,
            index = product.index;

        //if product is found
        if ( ~product ) {
            //delete it
            queues[q].splice(index, 1);
        }
        //if queue is empty remove it's container
        if (!queues[q].length) {
            queues[q] = undefined;
        }

        cookie = JSON.stringify(compareQueue);
        $.cookie('compare-queue', cookie);
    };

    /**
     * Inserts a single product into
     * serialized object stored in cookie
     * @param cat
     * @param productId
     */
    jk.compare.addProduct = function (cat, productId) {
        productId = ~~productId;
        var found = jk.compare.findProduct(productId);
        //if exists, no need to add it again
        if (~found) {
            return;
        }
        //extract the cookie
        var cookie = $.cookie('compare-queue'),
            compareQueue = JSON.parse(cookie || '{}');

        if (typeof compareQueue.initialized === 'undefined') {
            /**
             *
             * compareQueue schema
             * {
             *     initialized: true,
             *     primaryQueue: '*catName',
             *     queues: {
             *         *catName: [*productId]
             *         tv: [415,236,714,471],
             *         mobile: [847,491,496,335,13,45,61,35],
             *         monitor: [12,13]
             *     }
             * }
             *
             */
            compareQueue = {
                initialized: true,
                primaryQueue: '',
                queues: {
                }
            }
        }

        if ( !compareQueue.queues[cat] ) {
            compareQueue.queues[cat] = [];
        }
        //push the current product into it's cat queue
        compareQueue.queues[cat].push(productId);
        //set the primaryQueue to the current category
        compareQueue.primaryQueue = cat;

        cookie = JSON.stringify(compareQueue);

        //overwrite the updated object on cookie
        $.cookie('compare-queue', cookie);

        console.log('adding ' + productId + ' into category ' + cat);
    };

    jk.compare.syncViewWithCookie = function () {
        //check and see if any of the inputs are pre field
        $('.btn-compare i.icon-checkbox').each(function () {
            if ($(this).hasClass('fa-check-square-o')) {
                jk.handlers.updateCompareQueue(this);
            }
        });

        /**
         *    if there are items in the queue and are not checked
         *    inside view. Going thorough every item in compare object
         *    stored in cookie is a pain, so It's easier to check
         *    items in the view first
         */

        $('.item[data-role=product]').each(function () {
            var id = $(this).attr('data-product-id');
            var product = jk.compare.findProduct(id);
            //product is in the compare queue
            if (~product) {
                $(this).
                        find('.btn-compare i.icon-checkbox').
                        removeClass('fa-square-o').
                        addClass('fa-check-square-o');
            }
        });
    };

    /**
     *
     * @param target must be a add to compare button inside
     * the product element
     *
     */
    jk.handlers.updateCompareQueue = function (target) {
        var $product = $(target).
            parents('li[data-role=product]');
        if ( !$product.find('i.icon-checkbox').
                    hasClass('fa-check-square-o') )
        {
            jk.compare.removeProduct(~~$product.attr('data-product-id'))
        } else {
            jk.compare.addProduct(
                $product.attr('data-attribute-set'),
                $product.attr('data-product-id')
            );
        }
    };

    jk.handlers.toggleCompareInput = function (target) {
        var checkBox = $(target).
            parents('.btn-compare').
            find('i.icon-checkbox');
        //if check box is not checked
        if (checkBox.hasClass('fa-square-o')) {
            checkBox.
                removeClass('fa-square-o').
                addClass('fa-check-square-o');
        } else {
            checkBox.
                removeClass('fa-check-square-o').
                addClass('fa-square-o');
        }
    };

});
