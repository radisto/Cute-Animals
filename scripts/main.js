$(function () {
    $.ajax({
            headers: {
                'X-Parse-Application-Id': 'Mv248r8bnylYI52LQEv3oyBXUNJCQJGlGsmvtEGA',
                'X-Parse-REST-API-Key': 'qrltHp4aereH1QyuEjNaWJYHwbfqkg1OHkwBDlS7'
            },
            contentType: 'application/json',
            method: 'get',
            url: 'https://api.parse.com/1/classes/CuteAnimal/'
        })
        .done(function (data) {
            success(data);
        });

    function success(data) {
        var source = $('#template').html();
        var template = Handlebars.compile(source);
        $('#wrapper').html(template(data));
    }
    
    $('#wrapper').on('mouseover', '.picture', function () {
        var img = $(this).parent().html();
        var height = $(this).height();
        var width = $(this).width();
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        $('#hover').width(width*2).height(height*2)
            .css({position:'fixed', top: (wHeight-2*height)/2+'px', left: (wWidth-2*width)/2+'px'})
            .html(img).show();
    });
    
    $('#wrapper').on('mouseleave', '.picture', function () {
        $('#hover').hide();
    });
});