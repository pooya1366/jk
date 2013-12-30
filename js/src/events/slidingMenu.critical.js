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

        /*
        //if user came back to the same element he leaved
        if (jkTimeOuts.closeSlideMenu) {
            console.log('over');
            console.log(e.target);
            console.log('found parrent');
            console.log($(e.target).parents('.list-dropdown').get(0));

            if (
                  e.target == jkTimeOuts.closeSlideMenu.target() ||
                  $(e.target).parents('.list-dropdown').get(0) == jkTimeOuts.closeSlideMenu.target()
                ) {
                console.log('match');
                clearTimeout(jkTimeOuts.closeSlideMenu.action);
            }
        }
        jkTimeOuts.openSlideMenu = {
            action: setTimeout(function() {
                jk.handlers.closeAllDropDowns();
                jk.handlers.openDropdownMenu(e.target);
            }, 400),
            target: e.target
        };
        */
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

        /*
        clearTimeout(jkTimeOuts.openSlideMenu.action);
        jkTimeOuts.closeSlideMenu = {
            action: setTimeout(function() {
                jk.handlers.closeDropdownMenu(e.target);
            }, 400),
            target: function () {
                if ( $(e.target).hasClass('.list-dropdown') )
                    return e.target;
                else {
                    return $(e.target).parents('.list-dropdown').get(0);
                }

            }
        };
        */
    });
})(jQuery);
