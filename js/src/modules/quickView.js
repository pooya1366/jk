define(['jquery'], function ($) {
    var quickView = {};

    quickView.install= function () {
        //quick view button clicked
        $('[data-role=product]').delegate('.btn-quickview', 'click', function (e) {
            quickView.openModal
        });

        var modal = $('[data-role=quick-view-modal]');
        //next button clicked
        modal.delegate('[data-role=next]', 'click', function (e) {
            console.log('going forward');
        });

        //prev button clicked
        modal.delegate('[data-role=prev]', 'click', function (e) {
            console.log('going prev');
        });

    };


    return quickView;
});