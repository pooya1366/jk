//remember that these menus should be able to be opened programmatically
window.jkTimeOuts = window.jkTimeOuts || {};
$('body').delegate('.list-dropdown', 'mouseenter', function (e) {
    //close all other dropdown-menus
    jk.handlers.closeAllDropDowns();
    //hold for 100ms then open the menu
    jkTimeOuts.openSlideMenu = setTimeout(function () {
        jk.handlers.openDropdownMenu(e.target);
    },200);
});

$('body').delegate('.list-dropdown', 'mouseleave', function (e) {
    clearTimeout(jkTimeOuts.openSlideMenu);
    jkTimeOuts.closeSlideMenu = setTimeout(function() {
        jk.handlers.closeDropdownMenu(e.target);
    }, 300);
});


$('body').delegate('.dropdown-menu', 'mouseout', function (e) {
    //wait for 300ms then close the menu
});