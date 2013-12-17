window.jkTimeOuts = window.jkTimeOuts || {};
$('body').delegate('.list-dropdown', 'mouseenter', function (e) {
    //close all other dropdown-menus
    jk.handlers.closeAllDropDowns();
    //hold for 100ms then open the menu
    clearTimeout(jkTimeOuts.openSlideMenu);
    jkTimeOuts.openSlideMenu = setTimeout(function () {
        jk.handlers.openDropdownMenu(e.target);
        var a = 'a';
    },200);
});

$('body').delegate('.list-dropdown', 'mouseleave', function (e) {
    jkTimeOuts.closeSlideMenu = setTimeout(function() {
        jk.handlers.closeDropdownMenu(e.target);
    }, 300);
});