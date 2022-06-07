const sendData = bodyData => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Ошибка, Что-то не так!');
    })
    .then((json) => alert('отправка прошла успешно!'))
    .catch((error) => {
        alert(`Отправка не удалось, причина: ${error}`);
    });
};

const sendDataEmail = bodyData => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Ошибка, Что-то не так!');
    })
    .then((json) => {
    const footerTitle = document.querySelector('.footer__form-title');
    footerTitle.textContent = 'Ваша заявка успешно отправлена';

    const footerText = document.querySelector('.footer__text');
    footerText.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х рабочих дней';

    const footerInputWrap = document.querySelector('.footer__input-wrap');
    footerInputWrap.style.display = 'none';

    })
    .catch((error) => {
        alert(`Отправка не удалось, причина: ${error}`);
    });
};

const reservationForm = document.querySelector('.reservation__form');
reservationForm.addEventListener('submit', e => {
    e.preventDefault();
    const formBody = {
        dates: reservationForm.dates.value,
        people: reservationForm.people.value,
        reservationName: reservationForm.reservationName.value,
        reservationPhone: reservationForm.reservationPhone.value,
    };
    
    sendData(formBody);
});

const footerForm = document.querySelector('.footer__form');
footerForm.addEventListener('submit', e => {
    e.preventDefault();
    const formBody = {
        emailAddress: footerForm.emailAddress.value,
    };

    sendDataEmail(formBody);
});