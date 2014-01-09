$(document).ready(function () {
    $('#search-text').typeahead([
        {
            name: 'terms',
            remote: '/jkcatalogsearch/ajax/suggestedTerms/?q=%QUERY',
            header: 'terms'
        },
        {
            name: 'products',
            remote: '/jkcatalogsearch/ajax/suggestedProducts/?q=%QUERY',
            header: 'products'
        }
    ]);
});