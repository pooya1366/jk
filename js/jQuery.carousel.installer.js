$(document).ready(function () {
    $('.carousel').each(function () {
        $(this).jkCarousel();
    });
});

$(window).resize(function() {
    $('.carousel').each(function () {
        $(this).jkCarousel();
    });
});