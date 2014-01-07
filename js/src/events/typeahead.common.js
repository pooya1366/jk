$(document).ready(function () {
    $('#search-text').typeahead([
        {
            name: 'product',
            remote: 'jk/ajax.php?header=product&q=%QUERY',
            header: 'products'
        },
        {
            name: 'category',
            remote: 'jk/ajax.php?header=category&q=%QUERY',
            header: 'category'
        }
    ]);
});