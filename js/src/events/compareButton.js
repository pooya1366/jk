define(['compareButtonHandler'], function () {
    (function ($) {
        //if a add to compare list button is clicked
        $('.products-list .item').delegate('div.btn-compare', 'click', function (e) {
            //toggle the checkbox inside this button
            jk.handlers.toggleCompareInput(e.target);
            //add or remove product to compare queue
            jk.handlers.updateCompareQueue(e.target);
            //update number of products in view
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
                var cookie = $.cookie('compare-queue'),
                    compareQueue = JSON.parse(cookie || '{}');
                $.each(compareQueue.queues, function (key, value) {
                    var $li = $('<li class="compare-link"></li>'),
                        $a = $('<a href="/compare/?set=' + key + '&products=' + value.products.join('-') + '" target="_blank"></a>'),
                        queue = compareQueue.queues[key],
                        $titleSpan = $('<span class="title"></span>').text(queue.name),
                        $countSpan = $('<span class="count"></span>').text(queue.products.length);
                    $a.append($titleSpan).
                       append($countSpan);
                    $li.append($a);
                    $('#compare-dropdown').append($li);
                });
            }
            e.preventDefault();
        });

        $(document).ready(function () {
            jk.compare.syncViewWithCookie();
            jk.compare.confirmInit();
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
