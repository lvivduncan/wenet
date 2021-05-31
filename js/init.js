// start

const body = document.querySelector('body');

// wrapper for levus-dropdown
const dropdownWrapper = document.createElement('div');
dropdownWrapper.setAttribute('id', 'levus-dropdown-wrapper');

// levus-dropdown
document.querySelectorAll('.nav-panel span').forEach(item => item.addEventListener('click', openDropdown));

// levus-dropdown
document.querySelectorAll('.nav-panel svg').forEach(item => item.addEventListener('click', openDropdown));

body.addEventListener('click', (e) => {

    if(e.target.id === 'levus-dropdown-wrapper'){

        closeDropdown();

        // del wrapper
        dropdownWrapper.remove();
    }
});

// check localStorage city
if (localStorage.getItem('city') !== null){

    const cityName = localStorage.city;

    document.getElementById('city').innerText = document.querySelector('#nav-panel-contacts h5').innerText = cityName;

    checkCity(cityName);

    document.querySelectorAll('.cities li a').forEach(item => {
        if(item.textContent == cityName){
            item.closest('li').classList.add('active');
        }
    });

    
}

// check localStorage logo href
if (localStorage.getItem('logo') !== null){

    const cityLink = localStorage.logo;

    document.querySelector('#logo a').setAttribute('href', cityLink);
}

// select city
document.querySelectorAll('.cities li a').forEach(item => {
    item.addEventListener('click', function(){

        // city name
        const cityName = this.innerText;

        // link to page
        const cityLink = this.href;

        // insert city name
        document.getElementById('city').innerText = document.querySelector('#nav-panel-contacts h5').innerText = cityName;
    
        // check city name
        if (localStorage.getItem('city') !== null){

            checkCity(cityName);

            // перезаписуємо
            localStorage.setItem('city', cityName);
        } else {
            
            // перезаписуємо
            localStorage.setItem('city', cityName);
        }

        // link for logo href
        localStorage.setItem('logo', cityLink);
        
        closeDropdown();

        // logo href
        document.querySelector('#logo a').setAttribute('href', cityLink);
    });
});

// mobile menu
document.getElementById('menu-button').addEventListener('click', function(e) {
    e.preventDefault();

    this.classList.toggle('open');

    document.getElementById('nav').classList.toggle('open');
    document.querySelector('body').classList.toggle('lock');

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

    // вирівнювання блоків у тарифі -- за найбільшим
    heightUpdate('.tariff .options');
    heightUpdate('.tariff .price');
    heightUpdate('.tariff .params');

}

// rate.html
const checkboxs = document.querySelectorAll('.select-single .checkbox');

// чекбокси у тарифі
checkboxs.forEach(element => {
    element.addEventListener('change', function(){

        const current = this;

        const parent = current.closest('.select-single');

        if(current.checked === true){

            parent.querySelectorAll('input').forEach(item => {

                item.checked = false;
            });

            current.checked = true;
        }

    });
});

// faq
if(document.getElementById('faq-content') !== null){

    // 1 рівень
    document.querySelectorAll('#faq-content dt').forEach(item => {
        item.addEventListener('click', function(){

            // document.querySelectorAll('#faq-content dt').forEach(item => item.classList.remove('active'));
        
            this.closest('dl').querySelector('dd').classList.toggle('active');
            
            this.classList.toggle('active');
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

// click and open dropdown
function openDropdown(){
    // const current = this.parentNode.parentNode;
    const current = this.closest('.levus-dropdown');

    const currentNavPanel = current.querySelector('.nav-panel');
    const currentDropdownContent = current.querySelector('.levus-dropdown-content');

    if(current.querySelector('.nav-panel').classList.contains('open')){
        
        closeDropdown();
        
        // remove wrapper
        dropdownWrapper.remove();

    } else if(!current.querySelector('.nav-panel').classList.contains('open')){
        
        closeDropdown();

        currentNavPanel.classList.add('open');
        currentDropdownContent.classList.add('open');

        // add wrapper
        body.append(dropdownWrapper);
    }

    // todo: close nav
    document.getElementById('nav').classList.remove('open');
    document.querySelector('body').classList.remove('lock');
}

// remove dropdown items (close)
function closeDropdown(){
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


// update height blocks
function heightUpdate(selectors){
    const windowWidth = window.innerWidth;

    if(windowWidth > 776){

        const elements = document.querySelectorAll(selectors);
    
        const toArray = [...elements];
    
        const toNumberArray = toArray.map(item => item.offsetHeight);
    
        const maxHeight = Math.max(...toNumberArray);
    
        elements.forEach(item => item.style.height = `${maxHeight}px`);
    }

}

// cabinet
document.getElementById('auth-form') && document.getElementById('auth-form').addEventListener('submit', function () {

    document.querySelector('[type="submit"]').classList.add('loading');
    this.classList.add('loading');

    const inp_login = document.querySelector('[name=uname]', this);

    fetch('https://my.wenet.lviv.ua/v3/index.php?'
        +  'uname=' + document.querySelector('[name=uname]').value + '&'
        +  'passw=' + document.querySelector('[name=passw]').value
        , { credentials : 'include' })
        .then(response => {
            if (response.status === 200) {
                window.location = '/my/';
            }
        });

    return false;

});


/* 
{
    if (document.querySelector('#get') !== null) {
        let counter = 2;

        document.querySelector('#get').addEventListener('click', function(){
            fetch(`/news/page${counter}`)
            .then(response => {
                if (response.status == 200) {
                    return response.text();
                }
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                return doc;
            })
            .then(data => data.querySelectorAll('.post'))
            .then(result => result.forEach(item => document.querySelector('#output').innerHTML += `<article class="post">${item.innerHTML}</article>`))

            counter++;        
        });    
    }
}
 */



// end