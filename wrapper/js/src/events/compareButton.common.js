$('.products-list .item').delegate('div.btn-compare', 'click', function (e) {
    //add to compare queue
    jk.handlers.addToCompare(e.target);
    //toggle the checkbox inside this button
    jk.handlers.toggleCompareInput(e.target);

    e.preventDefault();
});
