(function ($) {

    window.jk = window.jk || {};
    window.jk.handlers = window.jk.handlers || {};

    $(document).ready(function () {

        $('.selectbox').each(function () {
            $(this).selectBox({animationSpeed: 'fast'});
        });

    });

})(jQuery);

