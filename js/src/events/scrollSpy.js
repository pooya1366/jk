define(['jquery', 'js/src/handlers/scrollSpyHandler', 'scrollSpy'], function (jQuery, scrollSpyhandlers) {
    return (function ($) {
        console.log(1);
        $(document).ready(function () {
            jk.handlers.initialScrollSpy();
        });
    })(jQuery);
});