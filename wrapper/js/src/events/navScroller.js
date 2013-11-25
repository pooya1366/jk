define(['jquery'], function() {
    $('#product-page-nav ul li a[href^=\'#\']').on('click', function(e) {
        var target = this;
        $('#product-page-nav').removeClass('spy-active');
        $('#product-page-nav ul li').removeClass('active');
        $(target).parent('li').addClass('active');

        e.preventDefault();

        $('html, body').animate({
            scrollTop: $(this.hash).offset().top

        }, 400, function(e){
            window.location.hash = target.hash;

            $('#product-page-nav').addClass('spy-active');

        });
    });
});