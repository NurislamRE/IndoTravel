import showModal from './modal.js';

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
    .then((json) => {
        document.querySelector('#reservation__date').setAttribute('disabled','disabled');
        document.querySelector('#reservation__people').setAttribute('disabled','disabled');
        document.querySelector('#reservation__name').setAttribute('disabled','disabled');
        document.querySelector('#reservation__phone').setAttribute('disabled','disabled');
        document.querySelector('#reservation__phone').setAttribute('disabled','disabled');
        document.querySelector('.reservation__button').setAttribute('disabled','disabled');
        return alert(`отправка прошла успешно, ответ от сервера: ${json}`);
    })
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
    const formBody = Object.fromEntries(new FormData(e.target));
    formBody.reservationPrice = document.querySelector('.reservation__price').textContent;
    showModal(formBody);
});

const footerForm = document.querySelector('.footer__form');
footerForm.addEventListener('submit', e => {
    e.preventDefault();
    const formBody = {
        emailAddress: footerForm.emailAddress.value,
    };

    sendDataEmail(formBody);
});

export default sendData;