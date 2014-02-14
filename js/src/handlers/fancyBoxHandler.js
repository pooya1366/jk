require.config({
    paths: {
        fancyBox :'js/dist/plugins/fancyBox'
    }
});
    define([
    'js/dist/plugins/fancyBox'
], function () {
    return {
        install : function () {
            jQuery(document).ready(function () {
                jQuery('ul.fancy-box a').fancybox( {
                    openEffect: 'elastic',
                    closeEffect: 'none',
                    arrows: true,
                    margin: [40, 40, 60, 40],
                    helpers: {
                        thumbs: {
                            width: 50,
                            height: 50
                        }
                    }
                });
            });
        }
    }
});