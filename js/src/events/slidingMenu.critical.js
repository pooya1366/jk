(function ($) {
    window.jkTimeOuts = window.jkTimeOuts || {};
    jkTimeOuts.SlideMenuEl = {};
    $('html').delegate('.list-dropdown', 'mouseenter', function (e) {
        //hold for 100ms then open the menu
        clearTimeout(jkTimeOuts.openSlideMenu);
        jkTimeOuts.openSlideMenu = setTimeout(function () {
            //close all other dropdown-menus
            jk.handlers.closeAllDropDowns();
            jk.handlers.openDropdownMenu(e.target);
        },200);
    });

    //when moving fast over other menus, opened menu does not close
    //when coming back into *currently* opened menu, we don't want close to be triggered
    $('html').delegate('.list-dropdown', 'mouseleave', function (e) {
        clearTimeout(jkTimeOuts.closeSlideMenu);
        clearTimeout(jkTimeOuts.openSlideMenu);
        jkTimeOuts.closeSlideMenu = setTimeout(function() {
            jk.handlers.closeAllDropDowns();
            jk.handlers.closeDropdownMenu(e.target);
        }, 200);
    });

    $('html').delegate('#compare-dropdown .compare-link a', 'click', function () {
        jk.handlers.closeAllDropDowns();
    });


    })(jQuery);
