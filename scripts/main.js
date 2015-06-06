$(function () {
    function ajaxGet(limit, skip) {
        return $.ajax({
            headers: {
                'X-Parse-Application-Id': 'Mv248r8bnylYI52LQEv3oyBXUNJCQJGlGsmvtEGA',
                'X-Parse-REST-API-Key': 'qrltHp4aereH1QyuEjNaWJYHwbfqkg1OHkwBDlS7'
            },
            contentType: 'application/json',
            method: 'get',
            url: 'https://api.parse.com/1/classes/CuteAnimal?limit=' + limit + '&skip=' + skip
        })
    }
    $('#wrapper').on('click', '.like', function(b) {
        var likes = $(this).next().find('.likes-count').text();
        likes = parseInt(likes);
        likes++;
        $(this).next().find('.likes-count').text(likes);
        $(this).removeClass('like').addClass('like-clone');
    });

    var limit = 5;
    var skip = 5;
    ajaxGet(limit, 0)
        .done(function (data) {
            nextImages(data);
        });

    function nextImages(data) {
        for (var i = 0; i < limit; i++) {
            data.results[i].likes = Math.floor((Math.random() * 90) + 10);
        }
        var template = $('#template').html();
        var rendered = Mustache.render(template, data);
        $('#wrapper').append(rendered);
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            ajaxGet(limit, skip)
                .done(function (data) {
                    nextImages(data);
                    skip+=5;
                });
        }
    });
}());