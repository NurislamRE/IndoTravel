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

let opacity = 0;
const openMenu = () => {
    nav.style.zIndex = 1;
    if (opacity < 1) {
        opacity += .1;
        setTimeout(function () { openMenu() }, 100);
    }
    nav.style.opacity = opacity;
}

const closeMenu = () => {
    nav.style.opacity = 0;
    opacity = 0;
}

body.addEventListener('click', ({ target }) => {

    if (target.classList.contains('header__menu-button')) {
        openMenu();
    }
    else {
        if (!target.classList.contains('header__menu'))
        closeMenu();
    }
});