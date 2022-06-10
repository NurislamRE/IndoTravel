import { timer } from './modules/timer.js';
import './modules/acc.js';
import './modules/fly.js';
import './modules/tour.js';
import './modules/reservation.js';

const heroTimer = document.querySelector('.hero__timer');
const deadline = heroTimer.getAttribute('data-timer-deadline');

timer(deadline);

new Swiper('.swiper', {
    slidesPerView: 2,
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.album__right',
        prevEl: '.album__left',
    },
});


