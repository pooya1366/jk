window.jkTimeOuts = window.jkTimeOuts || {};
$('body').delegate('.list-dropdown', 'mouseenter', function (e) {
    //hold for 100ms then open the menu
    clearTimeout(jkTimeOuts.openSlideMenu);
    jkTimeOuts.openSlideMenu = setTimeout(function () {
        //close all other dropdown-menus
        jk.handlers.closeAllDropDowns();
        jk.handlers.openDropdownMenu(e.target);
        var a = 'a';
    },200);
});

$('body').delegate('.list-dropdown', 'mouseleave', function (e) {
    clearTimeout(jkTimeOuts.openSlideMenu);
    jkTimeOuts.closeSlideMenu = setTimeout(function() {
        jk.handlers.closeDropdownMenu(e.target);
    }, 200);
});