import { timer } from './timer.js';

const heroTimer = document.querySelector('.hero__timer');
const deadline = heroTimer.getAttribute('data-timer-deadline');

timer(deadline);




