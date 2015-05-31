$(function () {
    var app = Sammy(function () {
        this.get('#/grid', function () {
            showGrid();
        });
        this.get('#/single', function () {
            showSingle();
        });
    });

    app.run('#/grid');

    function ajaxGet(limit, skip) {
        var limit = limit || 100;
        var skip = skip || 0;
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

    function showGrid() {
        ajaxGet()
            .done(function (data) {
                var template = $('#grid-template').html();
                var rendered = Mustache.render(template, data);
                $('#wrapper').html(rendered);
            });

        var moveLeft;
        var moveDown = 20;

        $('#wrapper').on('mouseenter', '.picture', showPopUp);
        $('#wrapper').on('mouseleave', '.picture', hidePopUp);

        function showPopUp() {
            var img = $(this).parent().html();
            var img = $(this).parent().html();
            var height = $(this).height();
            var width = $(this).width();
            var wHeight = $(window).height();
            var wWidth = $(window).width();
            moveLeft = width;
            $('#hover').width(width * 2).height(height * 2)
                .css({
                    position: 'fixed',
                    top: (wHeight - 2 * height) / 2 + 'px',
                    left: (wWidth - 2 * width) / 2 + 'px'
                })
                .html(img).show();
            $('.picture').mousemove(function (e) {
                $("#hover").css('top', e.clientY + moveDown).css('left', e.clientX - moveLeft);
            });
        }

        function hidePopUp() {
            $('#hover').hide();
        }
    }

    function showSingle() {
        $('#wrapper').empty();
        var limit = 5;
        var skip = 5;
        ajaxGet(limit)
            .done(function (data) {
                nextImages(data);
            });

        function nextImages(data) {
            var template = $('#single-template').html();
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
    }
}());