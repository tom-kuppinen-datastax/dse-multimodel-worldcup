$(function() {
    $("#search-country").autocomplete({
        name: 'search-country',
        source: 'http://localhost:3000/api/search?q=country',
        limit: 4,
        select: function (event, ui) {
            //alert(ui.item.value);
            window.location.href = '/country?cid=' + ui.item.value;
        }

    });
});

$(function() {
    $("#search-player").autocomplete({
        name: 'search-player',
        source: 'http://localhost:3000/api/search?q=player',
        limit: 4,
        select: function (event, ui) {
            //alert(ui.item.value);
            window.location.href = '/player?pid=' + ui.item.value;
        }

    });
});