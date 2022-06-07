const getData = async () => {
        return await fetch('https://bfs01.getcourse.ru/public/files/251231/195/cbe21783a515f15b9fc7c49f727da123.json?e=1654599599&s=oTyoAC5QxlJJWxgIR1RBZw');
};
const result = await getData();
const data = await result.json();

const tourForm = document.querySelector('.tour__form');
const reservForm = document.querySelector('.reservation__form');

tourForm.addEventListener('submit', e => {
    e.preventDefault();
    const price = tourForm.dates.options[tourForm.dates.selectedIndex].getAttribute('data-price');
    alert(`Стоимость: ${tourForm.people.value * price} р.`);
});


data.forEach(item => {
    const optionDate = document.createElement('option');
    optionDate.value = item.date;
    optionDate.className = 'tour__option';
    optionDate.textContent = item.date;
    optionDate.setAttribute('data-price', item.price);
    tourForm.dates.append(optionDate);

    const optionReservDate = document.createElement('option');
    optionReservDate.value = item.date;
    optionReservDate.className = 'tour__option reservation__option';
    optionReservDate.textContent = item.date;
    optionReservDate.setAttribute('data-price', item.price);
    reservForm.dates.append(optionReservDate);
});

const createPeopleOptions = (minCountPeople, maxCountPeople, isTour) => {
    if (isTour)
        tourForm.people.textContent = '';
    else
        reservForm.people.textContent = '';

    for (let i = minCountPeople; i <= maxCountPeople; i++) {
        if (isTour) {
            const optionPeople = document.createElement('option');
            optionPeople.value = i;
            optionPeople.className = 'tour__option';
            optionPeople.textContent = i;
            tourForm.people.append(optionPeople);
        }        
        else {
            const optionReservPeople = document.createElement('option');
            optionReservPeople.value = i;
            optionReservPeople.className = 'tour__option reservation__option';
            optionReservPeople.textContent = i;
            reservForm.people.append(optionReservPeople);
        }
        
    }
};

tourForm.dates.addEventListener('change', () => {    
    const minPeopleCount = data.find(item => item.date === tourForm.dates.value)['min-people'];
    const maxPeopleCount = data.find(item => item.date === tourForm.dates.value)['max-people'];
    createPeopleOptions(minPeopleCount, maxPeopleCount, true);
});

reservForm.dates.addEventListener('change', () => {    
    const minPeopleCount = data.find(item => item.date === reservForm.dates.value)['min-people'];
    const maxPeopleCount = data.find(item => item.date === reservForm.dates.value)['max-people'];
    createPeopleOptions(minPeopleCount, maxPeopleCount, false);
});

reservForm.people.addEventListener('change', () => {    
    const price = reservForm.dates.options[reservForm.dates.selectedIndex].getAttribute('data-price');
    const reservData = document.querySelector('.reservation__data');
    const reservPrice = document.querySelector('.reservation__price');
    reservData.textContent = reservForm.dates.options[reservForm.dates.selectedIndex].textContent;
    reservPrice.textContent = `${reservForm.people.value * price} р.`;
});
