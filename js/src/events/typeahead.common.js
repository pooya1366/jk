$(document).ready(function () {
    $('#search-text').typeahead([
        {
            name: 'nba-teams',
            local: ['book', 'booking', 'book store'],
            header: '<h3 class="league-name">NBA Teams</h3>'
        },
        {
            name: 'nhl-teams',
            local: ['booker', 'book keeper', 'book keeping'],
            header: '<h3 class="league-name">NHL Teams</h3>'
        }
    ]);
});