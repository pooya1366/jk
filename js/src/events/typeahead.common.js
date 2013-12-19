$(document).ready(function () {
    $('#search-text').typeahead({
        name: 'products',
        local: ['book', 'booklet', 'book case', 'trap book', 'green book', 'phone book']
    });
});