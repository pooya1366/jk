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

define(['js/dist/plugins/jQuery.jkNotification.min', 'jqueryCookie'], function (Notification) {
    var cookieExpireTime = 9999999;
    (function ($) {
        window.jk = window.jk || {};
        jk.handlers = jk.handlers || {};
        jk.compare  = jk.compare || {};

        jk.compare.getCompareQueue = function () {
            var cookie = $.cookie('compare-queue');
                return JSON.parse(cookie || '{}');
        };

        jk.compare.getQueues = function () {
            return jk.compare.getCompareQueue()['queues'];
        };

        //saves compare queue to cookies
        jk.compare.save = function (compareQueue) {
            $.cookie('compare-queue', JSON.stringify(compareQueue), {expires: cookieExpireTime,  path: '/' });
        };

        jk.compare.findProduct = function (productId) {
            productId = ~~productId;
            var queues = jk.compare.getQueues();

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
            var compareQueue = jk.compare.getCompareQueue(),
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
            if (!queues[q] || !queues[q].products.length) {
                queues[q] = undefined;
            }

            jk.compare.save(compareQueue);

            new Notification({message: 'از لیست مقایسه حذف گردید.', duration: 3000});
        };

        /**
         * Inserts a single product into
         * serialized object stored in cookie
         * @param setId id of product set
         * @param setName name of product set
         * @param productId id of product
         */
        jk.compare.addProduct = function (setId, setName, productId) {
            productId = ~~productId;
            var found = jk.compare.findProduct(productId);
            //if exists, no need to add it again
            if (~found) {
                return;
            }
            //extract the cookie
            var compareQueue = jk.compare.getCompareQueue();

            jk.compare.confirmInit();

            if ( !compareQueue.queues || !compareQueue.queues[setId] ) {
                compareQueue.queues[setId] = {name:setName, products:[]};
            }
            //push the current product into it's cat queue
            compareQueue.queues[setId].products.push(productId);
            //set the primaryQueue to the current category
            compareQueue.primaryQueue = setId;

            //console.log('adding ' + productId + ' into category ' + setId);
            jk.compare.save(compareQueue);

            new Notification({message: 'به لیست مقایسه اضافه شد.', duration: 3000});
        };

        //better to be called syncProductsWithCookie
        jk.compare.syncViewWithCookie = function () {

            $('[data-role=product]').each(function () {
                var productId = $(this).attr('data-product-id');

                if (!~jk.compare.findProduct(productId)) {
                    $(this).find('.btn-compare i.icon-checkbox').
                        removeClass('fa-check-square-o').
                        addClass('fa-square-o');
                }
            });

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
            $('[data-role=product]').each(function () {
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

        jk.compare.syncNavCompareList = function () {
            /**
             *
             *  this section builds compare queue view again based
             *  on your cookie.
             */
            var count = jk.compare.countProducts();
            $('#compare-count').text(count);
            if (count == 0 ) {
                $('#compare-dropdown').
                    removeClass('dropdown-links');
            } else {
                $('#compare-dropdown').
                    addClass('dropdown-links').
                    find('li.compare-link').
                    remove();
                var compareQueue = jk.compare.getCompareQueue();
                $.each(compareQueue.queues, function (key, value) {
                    var $li = $('<li class="compare-link"></li>'),
                        $a = $('<a href="/compare/?set=' + key + '&products=' + value.products.join('-') + '" target="_blank"></a>'),
                        queue = compareQueue.queues[key],
                        $titleSpan = $('<span class="title"></span>').text(queue.name),
                        $countSpan = $('<span class="count"></span>').text('(' + queue.products.length + ')');
                    $a.append($titleSpan).
                        append($countSpan);
                    $li.append($a);
                    $('#compare-dropdown').append($li);
                });
            }
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
                parents('[data-role=product]'),
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
                queues = jk.compare.getQueues();
            for ( var q in queues) {
                count += queues[q].products.length;
            }
            return count;
        };

        jk.compare.confirmInit = function () {
            var compareQueue = jk.compare.getQueues();

            if (typeof compareQueue === 'undefined') {

                compareQueue = {
                    initialized: true,
                    primaryQueue: '',
                    queues: {
                    }
                }
                jk.compare.save(compareQueue);
            }

        }

    })(jQuery);
});
