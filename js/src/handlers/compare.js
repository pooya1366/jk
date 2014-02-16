define(function () {
    return (function () {

(function ($) {
    if (typeof jk.compare === 'undefined') {
        jk.compare = {};
    }

    var $grid = $('#grid'),
        $propertiesTable = $('#properties table'),
        $productTable    = $('#products table');

    function changeBarMargins () {
        var vertical = $grid.scrollTop();
        var horizontal = $grid.scrollLeft();
        $propertiesTable.css('margin-top', -vertical);
        $productTable.css('margin-left', -horizontal);
    }

    var scrolled = false;
    $grid.scroll(function() {
        scrolled = true;
    });
    setInterval(function() {
        if (scrolled) {
            changeBarMargins();
            scrolled = false;
        }
    }, 30);

    /**
     * Takes a single td element wrapped by jQuery object and
     * returns the whole column with it's product head.
     *
     * Warning!
     * This selector is made only for this page, and any
     * changes to the html of tables might brake the code.
     */
    $.fn.column = function () {
        var col = $(),
            category = $(this).
                parents('table').
                attr('data-category-id'),
            index;

        if (this.parents('#properties').length) {
            return $();
        } else if (this.parents('#products').length) {
            index = this.index();
            col = col.add(this);
            col = col.add( $('#grid table[data-category-id=' + category + '] td').
                filter(function () {
                    return $(this).index() == index;
                }) );
        } else if (this.parents('#grid').length) {
            //find index
            //return nodes
            throw new Error('This part of the selector is not developed, ' +
                'because it wasn\'t nedded at the time');
        } else {
            return $();
        }

        return this.pushStack(col);
    };

    /**
     * Takes a single tr element wrapped by jQuery object and
     * returns the whole row with it's property head.
     *
     * Warning!
     * This selector is made only for this page, and any
     * changes to the html of tables might brake the code.
     */
    $.fn.row = function () {
        var row = $(),
            category = $(this).
                parents('table').
                attr('data-category-id'),
            categoryTable = 'table[data-category-id=' + category + ']',
            index;

        if (this.parents('#product').length) {
            return $();
        } else if (this.parents('#properties').length) {
            index = this.index('#properties ' + categoryTable + ' tr');
            row = row.add(this);
            row = row.add( $('#grid ' + categoryTable + ' tr').eq(index));
        } else if (this.parents('#grid').length) {
            index = this.index('#grid ' + categoryTable + ' tr');
            row = row.add('#properties ' + categoryTable + ' tr').eq(index);
            row = row.add(this);
        } else {
            return $();
        }

        return this.pushStack(row);
    };

    jk.compare.removeFromUrl = function (id) {
        var products = window.location.search.split(/products=/)[1].split('&')[0],
            ids = products.split('-');

        for (var i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                ids.splice(i, 1);
            }
        }

        var newQuery = window.location.href.replace(products, ids.join('-')).split('compare/')[1];
        history.pushState({}, "compare", newQuery)
    };

    jk.compare.toggleRow = function (target) {
        var index = $(target).parents('tbody').
                index(),
            $icon = $(target).find('.state'),
            category = $(target).parents('table').attr('data-category-id'),
            categoryTable = 'table[data-category-id=' + category + ']';



        $(target).parents('tbody').
            children('tr').
            not('.heading').
            slideToggle(1);

        //toggle the caret icon on heading
        if ( $icon.hasClass('open') ) {
            $icon.
                removeClass('open fa-caret-down').
                addClass('close fa-caret-right');
        } else {
            $icon.
                removeClass('close fa-caret-right').
                addClass('open fa-caret-down');
        }

        $('#grid ' + categoryTable + ' tbody').eq(index).
            children('tr').
            not('.space').
            slideToggle(1);
    };

    jk.compare.highlightRow = function (target, type) {
        var $el = $(target).parents('tr'),
            index;
        if ($el.parents('#properties').length) {
            index = $el.index('#properties tr');
        } else {
            index = $el.index('#grid tr');
        }

        if (type == 'mouseover') {
            $el.row().addClass('highlight');
        } else {
            $el.row().removeClass('highlight');
        }
    };

    jk.compare.highlightCol = function (target, type) {
        var $el = $(target),
            index = $el.parent('td').index();

        if (type == 'mouseover') {
            $el.parent('td').
                column().
                addClass('highlight');
        } else {
            $el.parent('td').
                column().
                removeClass('highlight');
        }
    };

    jk.compare.removeFromGrid = function (target) {
        var $el = $(target);
        var index = $el.parents('td').index();
        var removeCollection = [];

        var trash = [];
        //find related tds in grid and hide them
        $el.parents('td').
            column().
            remove();
        jk.compare.updateControlView();
    };

    jk.compare.updateControlView = function () {
        $('.move-left,.move-right').show();
        $('#products table').each(function () {
            $(this).find('.move-left:first,.move-right:last').hide();
        });
    };

    jk.compare.showCategory = function (category) {
        category = category || $('#queue-categories li:first').
            attr('data-category-id');
        //$('#products table, #properties table, #grid table').hide();
        $('#products table[data-category-id=' + category + ']').show();
        $('#properties table[data-category-id=' + category + ']').show();
        $('#grid table[data-category-id=' + category + ']').show();
    };

    jk.compare.syncRowsHeight = function () {
        //set tr rows in properties table
        var $propertyRows = $('#properties tr');
        $('#grid tr').each(function (index) {
            var height = $(this).height();
            //stupid firefox bug fix
            $propertyRows.eq(index).
                height(height);

            //**fixing stupid FF bug**
            $(this).height($propertyRows.eq(index).height());
        });
    };

    /**
     * Move Function
     * @param $col
     * A single td inside column wrapped by a jQuery object
     * @param index
     * The index you want to move the column to
     * @param side
     * Whether you want to move the column to the right
     * or to the left of index
     */
    jk.compare.moveColumn = function ($col, index, side) {
        var $head = $(),
            $tail = $(),
            category = $col.parents('table').attr('data-category-id'),
            categoryTable = 'table[data-category-id=' + category + ']',
            $gridTarget = $('#grid ' + categoryTable + ' td').filter(function () {
                return $(this).index() == index;
            });

        //some validation
        if ( side != 'right' && side != 'left') {
            throw new Error('side paramete can only ber left or right');
        }

        //find head, and tail
        $col.each(function () {
            if( $(this).find('div').hasClass('product-info') ) {
                $head = $(this);
            } else {
                $tail = $tail.add(this)
            }
        });

        if (side == 'right') {
            //move head
            $head.insertAfter($('#products ' + categoryTable + ' td').eq(index));
            //move tail
            for (var i = 0; i < $tail.length; i++) {
                $tail.eq(i).insertAfter($gridTarget.eq(i));
            }
        } else if (side == 'left') {
            //move head
            $head.insertBefore($('#products ' + categoryTable + ' td').eq(index));
            //move tail
            for (var j = 0; j < $tail.length; j++) {
                $tail.eq(j).insertBefore($gridTarget.eq(j));
            }
        }
    };

    //add column
    /**
     *
     * @param index of where you want your col to be inserted
     * @param col html column with product head and grid tail
     */
    jk.compare.addColumn = function (index, col, side) {
        var $head = col.eq(0),
            $tail = col.not(':eq(0)'),
            $gridTarget = $('#grid td').filter(function () {
                return $(this).index() == index;
            });
        side = side || 'right';

        if (side == 'right') {
            //move head
            $head.insertAfter('#products td:eq(' + index + ')');
            //move tail
            for (var i = 0; i < $tail.length; i++) {
                $tail.eq(i).insertAfter($gridTarget.eq(i));
            }
        } else if (side == 'left') {
            //move head
            $head.insertBefore($('#products td').eq(index))
            //move tail
            for (var j = 0; j < $tail.length; j++) {
                $tail.eq(j).insertBefore($gridTarget.eq(j));
            }
        } else {
            throw new Error('side paramete can only ber left or right');
        }
    };

    jk.compare.moveCol = function (target) {
        var $el = $(target),
            index = $el.
                parents('td').
                index();

        if ($el.hasClass('move-right')) {
            jk.compare.moveColumn($el.parents('td').column(), index + 1, 'right');
        } else {
            jk.compare.moveColumn($el.parents('td').column(), index - 1, 'left');
        }
    };

    jk.compare.init = function () {
        jk.compare.showCategory();
        jk.compare.updateControlView();
        jk.compare.syncRowsHeight();
    };
})(jQuery);

    })()
});
