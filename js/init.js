
$(function(){

    // main slider
    $('#slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 3000
    });

    $('.gallery').slick({
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 6000
    });

    // mobile menu
    $('#menu-button').on('click', function(e){
        e.preventDefault();
        $('#nav').toggleClass('mobile');
        $('#menu-button').toggleClass('white');
        $('#to-cabinet').toggleClass('mobile');
    });

    // faq
    $('#faq dt').on('click', function(){
        $(this).toggleClass('open');
        $(this).next().toggleClass('open');
    });

    // tariffs
    $('#select select').on('change', function(){
        const index = $('#select select option:selected').index();
        $('#rates .rate').each(function(){
            $(this).removeClass('block');
        });
        $('#rates .rate').eq(index).addClass('block');
    });

    // tariff tabs
    $('.rate .tab > li').on('click', function(){
        const index = $(this).index();

        $(this).parent().each(function(){
            $(this).children().removeClass('current');
        });
        $(this).addClass('current');

        $(this).parent().next().children().each(function(){
            $(this).removeClass('current');
        });
        $(this).parent().next().children().eq(index).addClass('current');
    });

    // chat
    $('#chat a').on('click', function(e){
      e.preventDefault();
      $('#chat a').toggleClass('open');
      $('#chat-online').toggleClass('open');
    });

});

// end