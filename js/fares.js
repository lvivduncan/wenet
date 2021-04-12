
// клік на групу тарифів
$('.fares-tabs a').on('click',function(e){
    e.preventDefault();

    $('.fares-tabs a').removeClass('active');

    $(this).addClass('active');
});