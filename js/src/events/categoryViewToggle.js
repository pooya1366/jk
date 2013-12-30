define(['ViewToggleHandler'], function() {
    (function ($) {
        $('body').delegate('.view-toggle button', 'click', function () {
            jk.handlers.categoryViewToggle(this);
        });
    })(jQuery);
});