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
document.getElementById('menu-button').addEventListener('click', function(e) {
    e.preventDefault();

    this.classList.toggle('open');

    document.getElementById('nav').classList.toggle('open');
    document.querySelector('body').classList.toggle('open');

    // закриваємо випадачку
    document.querySelector('.levus-dropdown').classList.remove('open');
    document.querySelector('.levus-dropdown-content').classList.remove('open');    

});

// rates.html
if(document.querySelector('#rates') !== null){
    
    // вкладки у тарифах
    const spanRates = document.querySelectorAll('#rates dt span');
    
    const divRates = document.querySelectorAll('#rates dd > div');
    
    // 1 кнопка активна
    spanRates[0].classList.add('active');
    
    // 1 вкладка активна
    divRates[0].classList.add('active');
    
    spanRates.forEach((item, index) => {
    
        item.addEventListener('click', () => {
    
            spanRates.forEach(span => span.classList.remove('active'));
            divRates.forEach(div => div.classList.remove('active'));
    
            spanRates[index].classList.add('active');
            divRates[index].classList.add('active');
    
        });
    
    });
    
    // вирівнювання блоків у тарифі -- за найбільшим (за 1 тарифом, бо він буде скоріше за все і найдовшим)
    const optionsHeight = document.querySelector('.tariff .options').offsetHeight;
    document.querySelectorAll('.tariff .options').forEach(item => {
        item.style.height = `${optionsHeight}px`;
    });
    
    // вирівнювання блоків у тарифі -- блок ціни 
    const priceHeight = document.querySelector('.tariff .price').offsetHeight;
    document.querySelectorAll('.tariff .price').forEach(item => {
        item.style.height = `${priceHeight}px`;
    });
    
    // вирівнювання блоків у тарифі -- додаткові параметри
    const paramsHeight = document.querySelector('.tariff .params').offsetHeight;
    document.querySelectorAll('.tariff .options').forEach(item => {
        item.style.height = `${paramsHeight}px`;
    });
}

// rate.html
const checkboxs = document.querySelectorAll('.select-single .checkbox');

checkboxs.forEach(item => {
    item.addEventListener('change', function(e){

        const parent = e.target.closest('.select-single');

        console.log(e.target)

        // const current = e.target;

        // if exists 'checked'
        if(e.target.classList.contains('selected-item')){

            // del check
            e.target.removeAttribute('checked');
            e.target.classList.remove('selected-item');

            // console.log('selected-item', this)

        } else {

            // // remove attr other inputs
            parent.querySelectorAll('.checkbox').forEach(element => {

                element.removeAttribute('checked');
                element.classList.remove('selected-item');

                e.target.setAttribute('checked', 'checked');
                e.target.classList.add('selected-item');                
            });

            console.log('not selected-item', this)
            // console.log(parent.querySelectorAll('.checkbox'))

        }

    });
});

/* 
checkboxs.forEach(checkbox => {
    checkbox.addEventListener('change', function(e){

        if(e.target.classList.contains('selected-item')){
            console.log('checked')

            e.target.classList.remove('selected-item');
        } else {
            console.log('not checked')

            e.target.classList.add('selected-item')
        }        
    });

});
 */

/* 
// чекбокси у тарифі
$('.select-single input[type=checkbox]').on('change', function () {

    // var group = $(this).closest('.select-single');

    // $('input[type=checkbox]', group).removeClass('selected-item');

    // $(this).addClass('selected-item');
    // $('input[type=checkbox]:not(.selected-item)', group).prop('checked', false);

    // $('input[type=checkbox]', group).removeClass('disabled');

    // if ($('input[type=checkbox]:checked', group).length > 0){
    //     $('input[type=checkbox]:not(:checked)', group).addClass('disabled');
    // }

    // if ($(this).is(':checked') && $(this).is('.disabled')) {
    //     $(this).prop('checked', false);
    // }

});
 */

// faq
if(document.getElementById('faq-content') !== null){

    document.querySelectorAll('#faq-content dt').forEach(item => {
        item.addEventListener('click', function(){
            this.classList.toggle('active');

            this.closest('dl').querySelector('dd').classList.toggle('active');
        });
    });
}

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