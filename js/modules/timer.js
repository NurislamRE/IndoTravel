const zeroText = num => num < 10 ? '0' + num : num;

const dayDeclination = day => {
    if (day === 1 || day === 21)
        return 'день';

    const arr = [2, 3, 4, 22, 23, 24];
    if (arr.includes(day))
        return 'дня';

    if ((day > 4 && day < 21) || (day > 24 && day < 32))
        return 'дней';
};

const hourDeclination = hour => {

    if (hour === 1 || hour === 21)
        return 'час';

    const arr = [2, 3, 4, 22, 23];
    if (arr.includes(hour))
        return 'часа';

    if (hour > 4 && hour < 21)
        return 'часов';
};

const minuteDeclination = minute => {
    const array = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54];

    if (minute % 10 === 1)
        return 'минута';
    else if (array.includes(minute))
        return 'минуты';
    else return 'минут';

};

const secondDeclination = second => {
    const array = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54];

    if (second % 10 === 1)
        return 'секунда';
    else if (array.includes(second))
        return 'секунды';
    else return 'секунд';

};


export const timer = deadline => {
    const timerCountDays = document.querySelector('.timer__count_days');
    const timerCountHours = document.querySelector('.timer__count_hours');
    const timerCountMinutes = document.querySelector('.timer__count_minutes');
    // const timerCountSeconds = document.querySelector('.timer__count_seconds');
    const timerUnitsDays = document.querySelector('.timer__units_days');
    const timerUnitsHours = document.querySelector('.timer__units_hours');
    const timerUnitsMinutes = document.querySelector('.timer__units_minutes');
    // const timerUnitsSeconds = document.querySelector('.timer__units_seconds');

    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime();
        const dateNow = Date.now();

        const dateUtc3 = dateNow + (3 * 60 * 60 * 1000); // Время +3 часа

        let dateRemaining = dateStop - dateUtc3;

        if (dateRemaining < 0) {
            return { dateRemaining };
        }

        const oneSecond = 1000;
        const oneMinute = oneSecond * 60;
        const oneHour = oneMinute * 60;
        const oneDay = oneHour * 24;

        const days = Math.floor(dateRemaining / oneDay);
        dateRemaining = dateRemaining - days * oneDay;

        const hours = Math.floor(dateRemaining / oneHour);
        dateRemaining = dateRemaining - hours * oneHour;

        const minutes = Math.floor(dateRemaining / oneMinute);
        dateRemaining = dateRemaining - minutes * oneMinute;

        const seconds = Math.floor(dateRemaining / oneSecond)

        return { dateRemaining, seconds, minutes, hours, days }
    };
    const start = () => {
        const timer = getTimeRemaining();
        
        const intervalId = setTimeout(start, 1000 * 60);
        if (timer.dateRemaining <= 0) {
            clearTimeout(intervalId);

            const heroText = document.querySelector('.hero__text');
            heroText.style.display = 'none';

            const heroTimer = document.querySelector('.hero__timer');
            heroTimer.style.display = 'none';
        }

        timerCountDays.textContent = zeroText(timer.days);
        timerUnitsDays.textContent = dayDeclination(timer.days);

        timerCountHours.textContent = zeroText(timer.hours);
        timerUnitsHours.textContent = hourDeclination(timer.hours);

        timerCountMinutes.textContent = zeroText(timer.minutes);
        timerUnitsMinutes.textContent = minuteDeclination(timer.minutes);

        if (timer.days < 1) {
            timerCountDays.textContent = zeroText(timer.hours);
            timerUnitsDays.textContent = hourDeclination(timer.hours);

            timerCountHours.textContent = zeroText(timer.minutes);
            timerUnitsHours.textContent = minuteDeclination(timer.minutes);

            timerCountMinutes.textContent = zeroText(timer.seconds);
            timerUnitsMinutes.textContent = secondDeclination(timer.seconds);

        }
    }

    start();
}