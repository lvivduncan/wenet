// start

const log = console.log;





const body = document.querySelector('body');

// wrapper for levus-dropdown
const dropdownWrapper = document.createElement('div');
dropdownWrapper.setAttribute('id', 'levus-dropdown-wrapper');

// levus-dropdown
document.querySelectorAll('.nav-panel span').forEach(item => {
    item.addEventListener('click', function(){

        const current = this.parentNode.parentNode;

        const currentNavPanel = current.querySelector('.nav-panel');
        const currentDropdownContent = current.querySelector('.levus-dropdown-content');

        if(current.querySelector('.nav-panel').classList.contains('open')){
            
            removeDropdown();
            
            // remove wrapper
            dropdownWrapper.remove();

        } else if(!current.querySelector('.nav-panel').classList.contains('open')){
            
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

// check localStorage
if (localStorage.getItem('city') !== null){

    const cityName = localStorage.city;

    document.getElementById('city').innerText = document.querySelector('#nav-panel-contacts h5').innerText = cityName;

    checkCity(cityName);
}

// select city
document.querySelectorAll('.cities li span').forEach(item => {
    item.addEventListener('click', function(){

        // city name
        const cityName = this.innerText;

        // insert city name
        document.getElementById('city').innerText = document.querySelector('#nav-panel-contacts h5').innerText = cityName;
    
        if (localStorage.getItem('city') !== null){

            checkCity(cityName);

            // перезаписуємо
            localStorage.setItem('city', cityName);
        } else {
            
            // перезаписуємо
            localStorage.setItem('city', cityName);
        }
        
        removeDropdown();

    });
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


// swipe-slider
{
    // left button
    const left = document.createElement('div');
    left.setAttribute('id', 'slide-left');

    // right button
    const right = document.createElement('div');
    right.setAttribute('id', 'slide-right');

    // box with slides
    const slides = document.getElementById('slides');

    // wrapper
    const levusSwipeSlider = document.getElementById('levus-swipe-slider');

    // slides 
    let list = document.querySelectorAll('.slide');

    if(list.length > 1) {
        
        // add buttons
        levusSwipeSlider.append(left, right);

        for (let index = 0; index < list.length; index++) {
            
            // clone slides
            document.getElementById('slides').append(list[index].cloneNode(true));
        }

        // shift -100%
        slides.style.left = '-100%';
    }

    /**
     * click
     */

    // left click
    document.getElementById('slide-left') && document.getElementById('slide-left').addEventListener('click', leftScroll);

    // right click
    document.getElementById('slide-right') && document.getElementById('slide-right').addEventListener('click', rightScroll);

    /**
     * swipe
     */

    let startX = null,
        moveX = 0,
        resultX = 0;

    list = document.querySelectorAll('.slide');

    if(list.length > 1){    
        list.forEach(item => {
        
            // touch
            item.addEventListener('touchstart', e => touchStart(e), false);
            item.addEventListener('touchmove', e => touchMove(e), false);
            item.addEventListener('touchend', touchEnd, false);

            // click
            item.addEventListener('mousedown', e => touchStart(e), false);
            item.addEventListener('mousemove', e => touchMove(e), false);
            item.addEventListener('mouseup', touchEnd, false);

            // image preventDefault
            item.querySelectorAll('img').forEach(image => {
                image.addEventListener('dragstart', e => e.preventDefault());
            });

/* 
            item.addEventListener('pointerdown', e => touchStart(e), false);
            item.addEventListener('pointermove', e => touchMove(e), false);
            item.addEventListener('pointerup', touchEnd, false);
*/

        });
    }

    function touchStart(e){

        // mobile/deskop check
        if(e.type.includes('mouse')){
            startX = e.pageX;
        } else {
            startX = e.targetTouches[0].clientX;
        }
        
    }

    function touchMove(e){
        if(!startX) return false;

        // mobile/deskop check
        if(e.type.includes('mouse')){
            moveX = e.pageX;
        } else {
            moveX = e.targetTouches[0].clientX;
        }

        resultX = moveX - startX;
    }

    function touchEnd(){
        if(resultX > 0) leftScroll();
        else rightScroll();
    }

    function leftScroll(){
        const last = slides.lastElementChild;
        slides.prepend(last);

        slides.style.transition = 'none';
        slides.classList.add('to-right');

        setTimeout(() => {
            slides.classList.remove('to-right');
            slides.style.transition = '.5s';
        }, 50);
    }

    function rightScroll(){
        const first = slides.firstElementChild;
        slides.append(first);

        slides.style.transition = 'none';
        slides.classList.add('to-left');
        
        setTimeout(() => {
            slides.classList.remove('to-left');
            slides.style.transition = '.5s';
        }, 50);
    }
}


// remove dropdown items (close)
function removeDropdown(){
    document.querySelectorAll('.nav-panel').forEach(item => item.classList.remove('open'));
    document.querySelectorAll('.levus-dropdown-content').forEach(item => item.classList.remove('open'));
}

// check city
function checkCity(cityName){

    const shedule = document.querySelectorAll('.shedule');
    const phones = document.querySelectorAll('.phones');

    if(cityName == 'Борислав'){

        shedule.forEach(item => {
            shedule[0].classList.add('open');
            shedule[1].classList.remove('open');

            phones[0].classList.add('open');
            phones[1].classList.remove('open');                    
        });

    } else {

        shedule.forEach(item => {
            shedule[0].classList.remove('open');
            shedule[1].classList.add('open');

            phones[0].classList.remove('open');
            phones[1].classList.add('open');                    
        });
    }
}
// end