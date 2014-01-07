/**
 *
 * compareQueue schema
 * {
 *     initialized: true,
 *     primaryQueue: '*catName',
 *     queues: {
 *         *attSetId: {name: *attSetName, products:*[]}
 *         4: {name: TV, products: [415,236,714,471]},
 *         3: {name: Mobile, products: [847,491,496,335,13,45,61,35]
 *     }
 * }
 *
 */

define(['jqueryCookie'], function ($) {
    (function ($) {
        window.jk = window.jk || {};
        jk.handlers = jk.handlers || {};
        jk.compare  = jk.compare || {};

        jk.compare.findProduct = function (productId) {
            productId = ~~productId;
            var cookie = $.cookie('compare-queue'),
                compareQueue = JSON.parse(cookie || '{}');
            var queues = compareQueue.queues;

            for ( var q in queues) {
                var position = jQuery.inArray(productId, queues[q].products);
                //if a match is found
                if ( ~position ) {
                    //return it
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
                queues[q].products.splice(index, 1);
            }
            //if queue is empty remove it's container
            if (!queues[q].products.length) {
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
        jk.compare.addProduct = function (setId, setName, productId) {
            productId = ~~productId;
            var found = jk.compare.findProduct(productId);
            //if exists, no need to add it again
            if (~found) {
                return;
            }
            //extract the cookie
            var cookie = $.cookie('compare-queue'),
                compareQueue = JSON.parse(cookie || '{}');

            jk.compare.confirmInit();

            if ( !compareQueue.queues[setId] ) {
                compareQueue.queues[setId] = {name:setName, products:[]};
            }
            //push the current product into it's cat queue
            compareQueue.queues[setId].products.push(productId);
            //set the primaryQueue to the current category
            compareQueue.primaryQueue = setId;

            cookie = JSON.stringify(compareQueue);

            //overwrite the updated object on cookie
            $.cookie('compare-queue', cookie);

            console.log('adding ' + productId + ' into category ' + setId);
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
         * if a checkbox is checked when coming from server, it must
         * be added to compare queue
         * @param target must be a add to compare button inside
         * the product element
         *
         */
        jk.handlers.updateCompareQueue = function (target) {
            var $product = $(target).
                parents('li[data-role=product]'),
                productId = $product.attr('data-product-id'),
                attrSetId = $product.attr('data-attribute-set-id'),
                attrSetName = $product.attr('data-attribute-set-name');

            if ( !$product.find('i.icon-checkbox').
                hasClass('fa-check-square-o') )
            {
                jk.compare.removeProduct(~~$product.attr('data-product-id'));

            } else {
                jk.compare.addProduct(attrSetId, attrSetName, productId);
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

        jk.compare.countProducts = function () {
            //returns num of products
            var cookie = $.cookie('compare-queue'),
                count = 0,
                compareQueue = JSON.parse(cookie || '{}'),
                queues = compareQueue.queues;
            for ( var q in queues) {
                count += q.products.length;
            }
            return count;
        };

        jk.compare.confirmInit = function () {
            var cookie = $.cookie('compare-queue'),
            compareQueue = JSON.parse(cookie || '{}');

            if (typeof compareQueue.initialized === 'undefined') {

                compareQueue = {
                    initialized: true,
                    primaryQueue: '',
                    queues: {
                    }
                }
                cookie = JSON.stringify(compareQueue);
                //overwrite the updated object on cookie
                $.cookie('compare-queue', cookie);

            }

        }

    })(jQuery);
});
