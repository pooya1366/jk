if (typeof jk === 'undefined') {
    var jk = {};
    jk.handlers = {};
}

(function ($) {
    jk.handlers.initialAffix = function () {
        $('#prodcut-aside-fix').affix({
            offset: {
                top: function() { return ($('#jk-header').height()+$('ol.breadcrumb').height() + 45); }
            }
        });
    }
})(jQuery);
