if ( typeof jk === 'undefined' ) {
    window.jk = {};
    window.jk.handlers = {};
}

jk.handlers.selectboxInstaller = function () {
    $('.selectbox').each(function () {
        $(this).selectBox();
    });
};