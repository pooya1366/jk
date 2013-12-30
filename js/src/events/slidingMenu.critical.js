(function ($) {
    window.jkTimeOuts = window.jkTimeOuts || {};
    $('html').delegate('.list-dropdown', 'mouseenter', function (e) {
        //hold for 100ms then open the menu
        clearTimeout(jkTimeOuts.closeSlideMenu);
        clearTimeout(jkTimeOuts.openSlideMenu);
        jkTimeOuts.openSlideMenu = setTimeout(function () {
            //close all other dropdown-menus
            jk.handlers.closeAllDropDowns();
            jk.handlers.openDropdownMenu(e.target);
            var a = 'a';
        },200);
    });

    $('html').delegate('.list-dropdown', 'mouseleave', function (e) {
        clearTimeout(jkTimeOuts.closeSlideMenu);
        jkTimeOuts.closeSlideMenu = setTimeout(function() {
            jk.handlers.closeDropdownMenu(e.target);
        }, 200);
    });
})(jQuery);
