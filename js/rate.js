
// зміна ціни on/off checkbox
$('.rate-checked input').on('change', function(){
    
    var first = $(this).parents('.rate-price').children('.rate-price-number');
    var tv = +first.text() + 30;
    var internet = +first.text() - 30;

    if ($(this).is(':checked')){
        first.text(tv);
        $(this).parents('.rate-price').children('.rate-description').removeClass('hide');
    } else {
        first.text(internet);
        $(this).parents('.rate-price').children('.rate-description').addClass('hide');
    }
    
});