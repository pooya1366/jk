$(document).ready(function () {
    $('input#search-text').typeahead([
        {
            minLength: 2,
            name: 'terms',
            valueKey: 'title',
            remote: '/jkcatalogsearch/ajax/suggestedTerms/?q=%QUERY',
            header: '<h2 class="header">پیشنهادات</h2>',
            template: '<p><strong class="title">{{title}}</strong><span class="num">({{num_of_results}})</span></p>',
            engine: Hogan
        },
        {
            minLength: 2,
            name: 'products',
            valueKey: 'title',
            remote: {
                url: '/jkcatalogsearch/ajax/suggestedProducts/?q=%QUERY'
            },
            header: '<h2 class="header">محصولات</h2>',
            template:
                '<div class="product clearfix">' +
                    '<div class="thumbnail"><img src="{{thumbnail_url}}"></div>' +
                    '<div class="details">' +
                        '<h3 class="product-title">{{title}}</h3>' +
                        '<div class="ratings"><div class="rating-box"><div class="rating" style="width: {{rating}}%;"></div></div></div>' +
                    '</div>' +
                '</div>',
            engine: Hogan
        }
    ]);

    $('input#search-text').on('typeahead:selected', function (object, datum) {
        switch (datum.type)
        {
            case 'term':
                $('#search_mini_form').submit();
                break;
            case 'product':
                window.location.href = datum.url;
                break;
        }
    });
});