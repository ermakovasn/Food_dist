function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    // чтобы страница не прокручивалась, когда открыто модальное окно
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // если пользователь сам открыл модальное окно, то автоматически оно открываться не будет
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {

     // навешиваем на нужные кнопки дата-атрибуты data-modal data-close
        const modalTrigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    // чтобы можно было нажать на эскейп на клавиатуре и окно закрылось
    document.addEventListener('keydown', (e) => {
        // проверка нужна для того, чтобы модальное окно не появлялось каждый раз, когда нажимаем клавишу escape
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        // свойство которое отвечает за прокурутку сверху + высота клиента(видимая часть) >= полная прокрутка -1 px 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            // удаляем обработчик события, чтобы он сработал только 1 раз
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};