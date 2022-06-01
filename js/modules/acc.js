const items = document.querySelectorAll('.travel__item');
const buttons = document.querySelectorAll('.travel__item-title');
const nav = document.querySelector('nav');
const body = document.querySelector('body');

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        for (let i = 0; i < items.length; i++) {
            if (index === i) {
                items[i].classList.toggle('travel__item_active');
            } else {
                items[i].classList.remove('travel__item_active');
            }
        }
    });
});


body.addEventListener('click', ({ target }) => {

    if (target.classList.contains('header__menu-button')) {
        nav.classList.toggle('header__menu_active');
    }
    else {
        if (!target.classList.contains('header__menu'))
        nav.classList.remove('header__menu_active');
    }
});