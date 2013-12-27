(function () {
    console.log('working...');
    window.jkTimeOuts = window.jkTimeOuts || {};
    $('html').delegate('.list-dropdown', 'mouseenter', function (e) {
        console.log('operating');
        //hold for 100ms then open the menu
        clearTimeout(jkTimeOuts.openSlideMenu);
        jkTimeOuts.openSlideMenu = setTimeout(function () {
            //close all other dropdown-menus
            jk.handlers.closeAllDropDowns();
            jk.handlers.openDropdownMenu(e.target);
            var a = 'a';
        },200);
    });

    $('html').delegate('.list-dropdown', 'mouseleave', function (e) {
        console.log('operating');
        clearTimeout(jkTimeOuts.openSlideMenu);
        jkTimeOuts.closeSlideMenu = setTimeout(function() {
            jk.handlers.closeDropdownMenu(e.target);
        }, 200);
    });
}());
