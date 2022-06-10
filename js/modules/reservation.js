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
            document.querySelector('#reservation__date').setAttribute('disabled', 'disabled');
            document.querySelector('#reservation__people').setAttribute('disabled', 'disabled');
            document.querySelector('#reservation__name').setAttribute('disabled', 'disabled');
            document.querySelector('#reservation__phone').setAttribute('disabled', 'disabled');
            document.querySelector('#reservation__phone').setAttribute('disabled', 'disabled');
            document.querySelector('.reservation__button').setAttribute('disabled', 'disabled');
            serverResult.textContent = `отправка прошла успешно, ответ от сервера: ${json}`;
        })
        .catch((error) => {
            serverResult.textContent = `Отправка не удалось, причина: ${error}`;
        });
};


const reservationForm = document.querySelector('.reservation__form');
// reservationForm.addEventListener('submit', e => {
// e.preventDefault();
// const formBody = Object.fromEntries(new FormData(e.target));
// formBody.reservationPrice = document.querySelector('.reservation__price').textContent;

// const regExp = /[А-Я а-я]{3,}/;
// if (regExp.test(formBody.reservationName))
//     showModal(formBody);
// else alert('ФИО должен быть не менее 3 букв');

// });

// const footerForm = document.querySelector('.footer__form');
// footerForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const formBody = Object.fromEntries(new FormData(e.target));
//     sendData(formBody);
// });

reservationForm.reservationName.addEventListener('input', () => {
    reservationForm.reservationName.value = reservationForm.reservationName.value.replace(/[^А-Я а-я]/g, '');
});

const telInput = document.querySelector('#reservation__phone');
const telMask = new Inputmask('+7 (999)-999-99-99');
telMask.mask(telInput);

const justValidate = new JustValidate('.reservation__form');
justValidate
    .addField('#reservation__name', [
        {
            rule: 'required',
            errorMessage: 'Укажите ФИО'
        }
    ])
    .addField('#reservation__phone', [
        {
            rule: 'required',
            errorMessage: 'Укажите телефон'
        },
        {
            validator(value) {
                const phone = telInput.inputmask.unmaskedvalue();
                console.log(phone);
                return Number(phone) && phone.length === 10;
            }
        }
    ])
    .addField('#reservation__date', [
        {
            rule: 'required',
            errorMessage: 'Укажите дату'
        }
    ])
    .addField('#reservation__people', [
        {
            rule: 'required',
            errorMessage: 'Укажите количество людей'
        }
    ])
    .onSuccess(e => {
        e.preventDefault();
        const formBody = Object.fromEntries(new FormData(e.target));
        formBody.reservationPrice = document.querySelector('.reservation__price').textContent;

        const regExp = /[А-Я а-я]{3,}/;
        if (regExp.test(formBody.reservationName))
            showModal(formBody);
        else alert('ФИО должен быть не менее 3 букв');
    });



export default sendData;