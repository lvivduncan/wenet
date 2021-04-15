
// плагін дропдауна
$('body').append('<div class="levus-dropdown-wrapper"></div>');

$('.levus-dropdown a').on('click', function(e){
    e.preventDefault();
    $(this).next('.levus-dropdown-content').toggleClass('open');
    $('.levus-dropdown-wrapper').toggleClass('open');
});

$('.levus-dropdown-wrapper').on('click', function(){
    $('.levus-dropdown-content').removeClass('open');
    $(this).removeClass('open');
});
// плагін дропдауна


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
