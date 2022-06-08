import showModal from './modal.js';

const sendData = bodyData => {
    const serverResult = document.querySelector('#serverResult');
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
        serverResult.textContent = 'отправка прошла успешно!';
    })
    .catch((error) => {
        serverResult.textContent = 'Отправка не удалось!';
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
        alert('Отправка не удалось!');
    });
};

const reservationForm = document.querySelector('.reservation__form');
reservationForm.addEventListener('submit', e => {
    e.preventDefault();
    const formBody = Object.fromEntries(new FormData(e.target));
    formBody.reservationPrice = document.querySelector('.reservation__price').textContent;

    const regExp = /[А-Я а-я]{3,}/;
    if (regExp.test(formBody.reservationName))
        showModal(formBody);
    else alert('ФИО должен быть не менее 3 букв');
});

reservationForm.reservationName.addEventListener('input', () => {
    reservationForm.reservationName.value = reservationForm.reservationName.value.replace(/[^А-Я а-я]/g, '');
});

reservationForm.reservationPhone.addEventListener('input', () => {
    let regexp;
    if (reservationForm.reservationPhone.value.length === 1) 
        regexp = /^\+/g;
    else if (reservationForm.reservationPhone.value.length > 1) 
        regexp = /^\+[0-9]+/;
    
    if (!regexp.test(reservationForm.reservationPhone.value)) 
        reservationForm.reservationPhone.value = reservationForm.reservationPhone.value.slice(0, reservationForm.reservationPhone.value.length - 1);
    

    const match = reservationForm.reservationPhone.value.match(regexp);
    reservationForm.reservationPhone.value=match[0];
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