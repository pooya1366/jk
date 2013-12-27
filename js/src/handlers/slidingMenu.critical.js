window.jk = window.jk || {};
window.jk.handlers = window.jk.handlers || {};

jk.handlers.changeSlideMenu = function (target, action) {
    var $t = $(target);
        //display = action == 'open' ? 'block' : 'none';

    if ( !$(target).hasClass('list-dropdown') ) {
        $t = $(target).parents('.list-dropdown');
    }

    if (action == 'open') {
        $t.addClass('open');
    } else {
        $t.removeClass('open');
    }
    //$t.find('.dropdown-menu')
    //    .css('display', display);

};

jk.handlers.openDropdownMenu = function (target) {
    jk.handlers.changeSlideMenu(target, 'open');
};

jk.handlers.closeDropdownMenu = function (target) {
    jk.handlers.changeSlideMenu(target, 'close');
};

jk.handlers.closeAllDropDowns = function () {
    $('.list-dropdown').removeClass('open');
};
