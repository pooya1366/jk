(function () {
    console.log('this is carousel jquery plugin.');
})();
;jQuery.fn.jkCarousel = function () {
    var $node = $(this),
        carouselWidth = function(){return $node.find('.items-container').width()},
        $items = $node.find('li.item'),
        itemsCount = $items.length,
        itemWidth = function(){return $items.width()},
        itemsPerRow = function(){return carouselWidth() / itemWidth()},
        speed = function(){return itemsPerRow() * 80},
        pagesCount = function(){return Math.ceil( (itemsCount * itemWidth()) / carouselWidth())},
        min_margin_right = function(){return (pagesCount() - 1) * carouselWidth() * -1},
        max_margin_right = 0;

    var findNextMargin = function (direction) {
        var marginRight = parseInt($node.find('ul.items').css('margin-right')),
            nextMargin;
        if (direction == 'next') {
            nextMargin = marginRight - carouselWidth();
        } else if (direction == 'previous') {
            nextMargin = marginRight + carouselWidth();
        }
        return nextMargin;
    };

    var updateBorderClasses = function () {
        $items.removeClass('first');
        $items.removeClass('last');
        var cachedItemsPerRow = itemsPerRow();
        for (var i=0; i < itemsCount; i++) {
            if ( i % cachedItemsPerRow == 0 ){
                $items.eq(i).addClass('first');
            }
            else if( (i + 1) % cachedItemsPerRow == 0 ) {
                $items.eq(i).addClass('last');
            }
        }
    };

    var updateNavClasses = function (margin) {
        if (margin == max_margin_right) {
            $node.find('.nav[data-direction=previous]').
                addClass('disabled');
            $node.find('.nav[data-direction=next]').
                removeClass('disabled');
        }
        else if(margin == min_margin_right()) {
            $node.find('.nav[data-direction=next]').
                addClass('disabled');
            $node.find('.nav[data-direction=previous]').
                removeClass('disabled');
        }
        else {
            $node.find('.nav[data-direction=next]').
                removeClass('disabled');
            $node.find('.nav[data-direction=previous]').
                removeClass('disabled');
        }
    };

    $node.find('.nav').click(function(e){
        e.preventDefault();
        if ( !$(this).hasClass('disabled') &&
            !$(this).hasClass('processing')) {

            $(this).addClass('processing');
            var nextMargin = findNextMargin($(this).attr('data-direction'));
            $node.find('.items').animate({
                'marginRight': nextMargin
            }, speed(), function(){
                updateNavClasses(nextMargin);
                $node.find('.nav').removeClass('processing');
            });
        }
    });

    var init = function(){
        //initializing
        updateBorderClasses();
        if (pagesCount() == 1) {
            $node.find('.nav[data-direction=next]').
                addClass('disabled');
            $node.find('.nav[data-direction=previous]').
                addClass('disabled');
        }
    };
    init();

    var resized = false;
    $(window).resize(function() {
        resized = true;
    });
    setInterval(function() {
        if (resized) {
            //prefer reset.
            $node.find('.items').animate({
                'marginRight': 0
            }, speed(), updateNavClasses(0) );
            resized = false;
            updateBorderClasses();
        }
    }, 250);
};/**
 * jQuery custom selectboxes
 *
 * Copyright (c) 2008 Krzysztof Suszyński (suszynski.org)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 0.6.1
 * @category visual
 * @package jquery
 * @subpakage ui.selectbox
 * @author Krzysztof Suszyński <k.suszynski@wit.edu.pl>
**/
jQuery.fn.selectBox = function(options){
	/* Default settings */
	var settings = {
		className: 'jquery-selectbox',
		animationSpeed: "normal",
		listboxMaxSize: 10,
		replaceInvisible: false
	};
	var commonClass = 'jquery-custom-selectboxes-replaced';
	var listOpen = false;
	var showList = function(listObj) {
		var selectbox = listObj.parents('.' + settings.className + '');
		listObj.slideDown(settings.animationSpeed, function(){
			listOpen = true;
		});
		selectbox.addClass('selecthover');
		jQuery(document).bind('click', onBlurList);
		return listObj;
	}
	var hideList = function(listObj) {
		var selectbox = listObj.parents('.' + settings.className + '');
		listObj.slideUp(settings.animationSpeed, function(){
			listOpen = false;
			jQuery(this).parents('.' + settings.className + '').removeClass('selecthover');
		});
		jQuery(document).unbind('click', onBlurList);
		return listObj;
	}
	var onBlurList = function(e) {
		var trgt = e.target;
		var currentListElements = jQuery('.' + settings.className + '-list:visible').parent().find('*').andSelf();
		if(jQuery.inArray(trgt, currentListElements)<0 && listOpen) {
			hideList( jQuery('.' + commonClass + '-list') );
		}
		return false;
	}

	/* Processing settings */
	settings = jQuery.extend(settings, options || {});
	/* Wrapping all passed elements */
	return this.each(function() {
		var _this = jQuery(this);
		if(_this.filter(':visible').length == 0 && !settings.replaceInvisible)
			return;
		var replacement = jQuery(
			'<div class="' + settings.className + ' ' + commonClass + '">' +
				'<div class="' + settings.className + '-moreButton" />' +
				'<div class="' + settings.className + '-list ' + commonClass + '-list" />' +
				'<span class="' + settings.className + '-currentItem" />' +
			'</div>'
		);
		jQuery('option', _this).each(function(k,v){
			var v = jQuery(v);
			var listElement =  jQuery('<span class="' + settings.className + '-item value-'+v.val()+' item-'+k+'">' + v.text() + '</span>');
			listElement.click(function(){
				var thisListElement = jQuery(this);
				var thisReplacment = thisListElement.parents('.'+settings.className);
				var thisIndex = thisListElement[0].className.split(' ');
				for( k1 in thisIndex ) {
					if(/^item-[0-9]+$/.test(thisIndex[k1])) {
						thisIndex = parseInt(thisIndex[k1].replace('item-',''), 10);
						break;
					}
				};
				var thisValue = thisListElement[0].className.split(' ');
				for( k1 in thisValue ) {
					if(/^value-.+$/.test(thisValue[k1])) {
						thisValue = thisValue[k1].replace('value-','');
						break;
					}
				};
				thisReplacment
					.find('.' + settings.className + '-currentItem')
					.text(thisListElement.text());
				thisReplacment
					.find('select')
					.val(thisValue)
					.triggerHandler('change');
				var thisSublist = thisReplacment.find('.' + settings.className + '-list');
				if(thisSublist.filter(":visible").length > 0) {
					hideList( thisSublist );
				}else{
					showList( thisSublist );
				}
			}).bind('mouseenter',function(){
				jQuery(this).addClass('listelementhover');
			}).bind('mouseleave',function(){
				jQuery(this).removeClass('listelementhover');
			});
			jQuery('.' + settings.className + '-list', replacement).append(listElement);
			if(v.filter(':selected').length > 0) {
				jQuery('.'+settings.className + '-currentItem', replacement).text(v.text());
			}
		});
		replacement.find('.' + settings.className + '-moreButton').click(function(){
			var thisMoreButton = jQuery(this);
			var otherLists = jQuery('.' + settings.className + '-list')
				.not(thisMoreButton.siblings('.' + settings.className + '-list'));
			hideList( otherLists );
			var thisList = thisMoreButton.siblings('.' + settings.className + '-list');
			if(thisList.filter(":visible").length > 0) {
				hideList( thisList );
			}else{
				showList( thisList );
			}
		}).bind('mouseenter',function(){
			jQuery(this).addClass('morebuttonhover');
		}).bind('mouseleave',function(){
			jQuery(this).removeClass('morebuttonhover');
		});
		_this.hide().replaceWith(replacement).appendTo(replacement);
		var thisListBox = replacement.find('.' + settings.className + '-list');
		var thisListBoxSize = thisListBox.find('.' + settings.className + '-item').length;
		if(thisListBoxSize > settings.listboxMaxSize)
			thisListBoxSize = settings.listboxMaxSize;
		if(thisListBoxSize == 0)
			thisListBoxSize = 1;
		var thisListBoxWidth = Math.round(_this.width() + 5);
		if(jQuery.browser.safari)
			thisListBoxWidth = thisListBoxWidth * 0.94;
		replacement.css('width', thisListBoxWidth + 'px');
		thisListBox.css({
			width: Math.round(thisListBoxWidth-5) + 'px',
			height: 'auto'
		});
	});
}
jQuery.fn.unselectbox = function(){
	var commonClass = 'jquery-custom-selectboxes-replaced';
	return this.each(function() {
		var selectToRemove = jQuery(this).filter('.' + commonClass);
		selectToRemove.replaceWith(selectToRemove.find('select').show());
	});
};var $nav_subcats_wrap = $('#nav-subcats-wrap');
var $nav_pop_li = $('#nav-cats .nav-pop-li');
$('#nav-browse-flyout').hover(function() {

    clearTimeout($nav_subcats_wrap.t);
    $nav_subcats_wrap.t = setTimeout((function() {
        $nav_subcats_wrap.stop().animate({width: 520}, {queue: false, duration: 100});
    }), 50);

}, function() {

    clearTimeout($nav_subcats_wrap.t);
    $nav_subcats_wrap.t = setTimeout((function() {
        $nav_subcats_wrap.stop().animate({width: 0}, {queue: false, duration: 0});
        $($nav_pop_li).removeClass('nav-active');
        $('.nav-subcats').css('display', 'none');
    }), 100);

});


$nav_pop_li.hover(function() {

    var target = this;
    $nav_pop_li.t = setTimeout((function() {
        $($nav_pop_li).removeClass('nav-active');
        $(target).addClass('nav-active');
        var $id = $(target).attr('id').substr(8);
        $('.nav-subcats').css('display', 'none');
        $('#nav-subcats-'+$id).css('display', 'block');
    }), 50);

},
    function() {
        clearTimeout($nav_pop_li.t);
    }
);;(function () {
    console.log('this is modal jquery plugin.');
})();
