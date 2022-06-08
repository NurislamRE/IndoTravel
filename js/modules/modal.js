import loadStyle from './loadStyle.js';
import sendData from './reservation.js';

const showModal = async (data) => {
    await loadStyle('css/modal.css');
    const overlay = document.createElement('div');
    const modalWindow = document.createElement('div');
    const title = document.createElement('h2');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const btnGroup = document.createElement('div');
    const btnConfirm = document.createElement('button');
    const btnEdit = document.createElement('button');

    overlay.classList.add('overlay');
    modalWindow.classList.add('modal');
    
    title.classList.add('modal__title');
    title.textContent = 'Подтверждение заявки';
    
    p1.classList.add('modal__text');
    p1.textContent = `Бронирование путешествия в Индонезию на ${data.people} человек`;
    
    p2.classList.add('modal__text');
    p2.textContent = `В даты: ${data.dates}`;
    
    p3.classList.add('modal__text');
    p3.textContent = `Стоимость тура ${data.reservationPrice}`;

    btnGroup.classList.add('modal__button');

    btnConfirm.classList.add('modal__btn');
    btnConfirm.textContent = 'Подтверждаю';
    btnConfirm.addEventListener('click', () => {
        sendData(data);
        overlay.remove();
    });

    btnEdit.classList.add('modal__btn_edit','modal__btn');
    btnEdit.textContent = 'Изменить данные';

    overlay.append(modalWindow);
    modalWindow.append(title, p1, p2, p3, btnGroup);

    btnGroup.append(btnConfirm, btnEdit);

    btnEdit.addEventListener('click', () => {
        overlay.remove();
    });

    document.body.append(overlay);
}

export default showModal;