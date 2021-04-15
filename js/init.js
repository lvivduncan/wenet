
// плагін дропдауна
$('body').append('<div class="levus-dropdown-wrapper"></div>');

// лічильник кліків
var cnt = 0;

$('.nav-panel').on('click', function(){

    $('.levus-dropdown-content').removeClass('open');

    if(cnt%2 == 0){
        $(this).next('.levus-dropdown-content').addClass('open');
    } else {
        $(this).next('.levus-dropdown-content').removeClass('open');
    }

    $('.levus-dropdown-wrapper').toggleClass('open');

    cnt++;
});

$('.levus-dropdown-wrapper').on('click', function(){
    $('.levus-dropdown-content').removeClass('open');
    $(this).removeClass('open');
});
// плагін дропдауна


// зв'язка місто + контакти
$('.cities li').on('click', function(e){
    var city = e.target.textContent;

    // міняємо назву міста
    $('#city').text(city);
    $('#nav-panel-contacts .levus-dropdown-content h5:first-child').text(city);

    // закриваємо випадачку
    $(this).parents('.levus-dropdown-content').removeClass('open');

    // відкриваємо випадачку з контактами
    $('#nav-panel-contacts .levus-dropdown-content').addClass('open');

    // перемикаємо телефони
    if(city != 'Борислав'){
        // phones
        $('.levus-dropdown-content .phones').eq(0).removeClass('open');
        $('.levus-dropdown-content .phones').eq(1).addClass('open');
        
        // shedule     
        $('.levus-dropdown-content .shedule').eq(0).removeClass('open');
        $('.levus-dropdown-content .shedule').eq(1).addClass('open');
    } else {
        // phones
        $('.levus-dropdown-content .phones').eq(0).addClass('open');
        $('.levus-dropdown-content .phones').eq(1).removeClass('open');

        // shedule
        $('.levus-dropdown-content .shedule').eq(0).addClass('open');
        $('.levus-dropdown-content .shedule').eq(1).removeClass('open');
    }

});
// зв'язка місто + контакти

/* 
$('#nav-panel-city');

$('#nav-panel-cabinet');

$('#nav-panel-contacts');
 */



// slider home page
$('#slider .owl-carousel').owlCarousel({
    loop: true,
    nav: false,
    dots: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
});
