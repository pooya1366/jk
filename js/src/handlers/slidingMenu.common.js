window.jk.handlers = window.jk.handlers || {};

jk.handlers.changeSlideMenu = function (target, action) {
    var $t = $(target),
        display = action == 'open' ? 'block' : 'none';

    if ( !$(target).hasClass('list-dropdown') ) {
        $t = $(target).parents('.list-dropdown');
    }

    $t.find('.dropdown-menu')
        .css('display', display)
        .toggleClass('open');
};

jk.handlers.openDropdownMenu = function (target) {
    jk.handlers.changeSlideMenu(target, 'open');
};

jk.handlers.closeDropdownMenu = function (target) {
    jk.handlers.changeSlideMenu(target, 'close');
};

jk.handlers.closeAllDropDowns = function () {
    $('.dropdown-menu').css('display', 'none');
};
