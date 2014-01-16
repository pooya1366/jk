define(['jquery', 'js/src/handlers/scrollSpyHandler', 'scrollSpy'], function (jQuery, scrollSpyhandlers) {
    return (function ($) {
        $(document).ready(function () {
            jk.handlers.initialScrollSpy();
        });
    })(jQuery);
});