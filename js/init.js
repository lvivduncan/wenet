
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


