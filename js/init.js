// start

const log = console.log;


const body = document.querySelector('body');

// wrapper for levus-dropdown
const dropdownWrapper = document.createElement('div');
dropdownWrapper.setAttribute('id', 'levus-dropdown-wrapper');

// levus-dropdown
document.querySelectorAll('.levus-dropdown').forEach(item => {
    item.addEventListener('click', function(){

        const currentNavPanel = this.querySelector('.nav-panel');
        const currentDropdownContent = this.querySelector('.levus-dropdown-content');

        if(this.querySelector('.nav-panel').classList.contains('open')){
            
            removeDropdown();
            
            // remove wrapper
            dropdownWrapper.remove();

        } else if(!this.querySelector('.nav-panel').classList.contains('open')){
            
            removeDropdown();

            currentNavPanel.classList.add('open');
            currentDropdownContent.classList.add('open');

            // add wrapper
            body.append(dropdownWrapper);
        }

    });
});

body.addEventListener('click', (e) => {

    if(e.target.id === 'levus-dropdown-wrapper'){

        removeDropdown();

        // del wrapper
        dropdownWrapper.remove();
    }
});


/* 
// зв'язка місто + контакти
if (localStorage.getItem('city') !== null){

    var city = localStorage.getItem('city');
    
    // значить уже якась назва лежить
    if(localStorage.getItem('city') == 'Борислав'){
        $('.levus-dropdown-content .phones').eq(0).addClass('open');
        $('.levus-dropdown-content .phones').eq(1).removeClass('open');

        $('.levus-dropdown-content .shedule').eq(0).addClass('open');
        $('.levus-dropdown-content .shedule').eq(1).removeClass('open');
    } else {
        $('.levus-dropdown-content .phones').eq(0).removeClass('open');
        $('.levus-dropdown-content .phones').eq(1).addClass('open');
        
        $('.levus-dropdown-content .shedule').eq(0).removeClass('open');
        $('.levus-dropdown-content .shedule').eq(1).addClass('open');
    }

    $('#city').text(city);
    $('#nav-panel-contacts .levus-dropdown-content h5:first-child').text(city);
}
 */

document.querySelectorAll('.cities li span').forEach(item => {
    item.addEventListener('click', function(){

        // city name
        const city = this.innerText;
    
        // iclude name 
        document.getElementById('city').innerText = city;

        if (localStorage.getItem('city') !== null){

            const shedule = document.querySelectorAll('.shedule');
            const phones = document.querySelectorAll('.phones');

            // значить уже якась назва лежить
            if(localStorage.city == 'Борислав'){

                shedule.forEach(item => {
                    shedule[0].classList.remove('open');
                    shedule[1].classList.add('open');

                    phones[0].classList.remove('open');
                    phones[1].classList.add('open');                    
                });

            } else {

                shedule.forEach(item => {
                    shedule[0].classList.add('open');
                    shedule[1].classList.remove('open');

                    phones[0].classList.add('open');
                    phones[1].classList.remove('open');                    
                });
            }

            // перезаписуємо
            localStorage.setItem('city', city);
        } else {
            
            // перезаписуємо
            localStorage.setItem('city', city);
        }
        

    });
});


/* 
$('.cities li a').on('click', function () {
    var city = $(this).text();

    // міняємо назву міста
    $('#city').text(city);
    $('#nav-panel-contacts .levus-dropdown-content h5:first-child').text(city);

    // закриваємо випадачку
    $('.levus-dropdown').removeClass('open')
    $('.levus-dropdown-content').removeClass('open')

    if (localStorage.getItem('city') !== null){
        // значить уже якась назва лежить
        if(localStorage.city == 'Борислав'){
            $('.levus-dropdown-content .phones').eq(0).addClass('open');
            $('.levus-dropdown-content .phones').eq(1).removeClass('open');

            $('.levus-dropdown-content .shedule').eq(0).addClass('open');
            $('.levus-dropdown-content .shedule').eq(1).removeClass('open');
        } else {
            $('.levus-dropdown-content .phones').eq(0).removeClass('open');
            $('.levus-dropdown-content .phones').eq(1).addClass('open');

            $('.levus-dropdown-content .shedule').eq(0).removeClass('open');
            $('.levus-dropdown-content .shedule').eq(1).addClass('open');
        }
        // перезаписуємо
        localStorage.setItem('city', city);
    } else {
        localStorage.setItem('city', city);
    }
});
// зв'язка місто + контакти
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


// mobile menu
$('#menu-button').on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('open');

    $('#nav').toggleClass('open');
    $('body').toggleClass('lock');

    // закриваємо випадачку
    $('.levus-dropdown').removeClass('open');
    $('.levus-dropdown-content').removeClass('open');
});

// 1 кнопка активна
$('#rates dt span').eq(0).addClass('active');

// 1 вкладка активна
$('#rates dd > div').eq(0).addClass('active');

// вкладки у тарифах
$('#rates dt span').on('click', function(){

    var cnt = $(this).index();

    // підсвічуємо активний, вимикаємо неактивні
    $(this).addClass('active').siblings().removeClass('active');

    // так само
    $('#rates dd > div').removeClass('active').eq(cnt).addClass('active');

});


// вирівнювання блоків у тарифі -- за найбільшим (за 1 тарифом, бо він буде скоріше за все і найдовшим)
var optionsHeight = $('.tariff .options').eq(0).height();
$('.tariff .options').height(optionsHeight);

// блок ціни 
var priceHeight = $('.tariff .price').eq(0).height();
$('.tariff .price').height(priceHeight);

var paramsHeight = $('.tariff .params').eq(0).height();
$('.tariff .params').height(paramsHeight);



// чекбокси у тарифі
$('.select-single input[type=checkbox]').on('change', function () {

    var group = $(this).closest('.select-single');

    $('input[type=checkbox]', group).removeClass('selected-item');

    $(this).addClass('selected-item');
    $('input[type=checkbox]:not(.selected-item)', group).prop('checked', false);

    $('input[type=checkbox]', group).removeClass('disabled');

    if ($('input[type=checkbox]:checked', group).length > 0)
        $('input[type=checkbox]:not(:checked)', group).addClass('disabled');

    if ($(this).is(':checked') && $(this).is('.disabled'))
    {
        $(this).prop('checked', false);
    }

});

// faq
$('#faq-content dt').on('click', function(){
    $(this).toggleClass('active');
    $(this).next().toggleClass('active');
});


// remove dropdown items (close)
function removeDropdown(){
    document.querySelectorAll('.nav-panel').forEach(item => item.classList.remove('open'));
    document.querySelectorAll('.levus-dropdown-content').forEach(item => item.classList.remove('open'));
}

// end