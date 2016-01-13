$(document).ready(function() {
    
    var sv = 20;
    var shots = [];

    function addShot(s,e){
        $("button#loadmore").css({
            "display": "none",
        });
        $.each(shots.slice(s,e), function(i, field){
            $("div#shots").append("<article class='shot'><h3>Day "+field.day+"</h3><div class='title'><h2>"+field.title+"</h2><nav><a target='_blank' href='"+field.links.instagram+"' class='instagram'><span class='icon-social-instagram'></span></a><a target='_blank' href='"+field.links.dribbble+"' class='dribbble'><span class='icon-social-dribbble'></span></a></nav></div><figure><img src='"+field.src+"' /></figure></article>");
        });
        sv = sv+20;
        if(shots.length > sv){
            $("button#loadmore").css({
                "display": "block",
            });
        }
    };

    $.getJSON("../data.json", function(result){
        shots = result.reverse()
        $.each(shots.slice(0, 20), function(i, field){
            $("div#shots").append("<article class='shot'><h3>Day "+field.day+"</h3><div class='title'><h2>"+field.title+"</h2><nav><a target='_blank' href='"+field.links.instagram+"' class='instagram'><span class='icon-social-instagram'></span></a><a target='_blank' href='"+field.links.dribbble+"' class='dribbble'><span class='icon-social-dribbble'></span></a></nav></div><figure><img src='"+field.src+"' /></figure></article>");
        });
        if(shots.length > sv){
            $("section#content").append("<button id='loadmore'>Load More</button>");
            $("button#loadmore").on('click', function(){
                addShot(sv, sv+20);
            });
        }
    });



    var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible fade-out');
        if( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });
});
