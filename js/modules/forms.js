import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

        // подвязываем все формы под этот запрос перебором
    forms.forEach(item => {
        bindPostData(item);
    });

    
    //     // формат XMLHTTpRequest
    
    //     // function postData(form) {
    //     //     // событие submit срабатывает каждый раз, когда мы пытаемся отправить какую-то форму
    //     //     form.addEventListener('submit', (e) => {
    //     //         e.preventDefault();
    
    //     //         const statusMessage = document.createElement('div');
    //     //         statusMessage.classList.add('status');
    //     //         statusMessage.textContent = message.loading;
    //     //         form.append(statusMessage);
    
    //     //         const request = new XMLHttpRequest();
    //     //         request.open('POST', 'server.php');
    
    //     //         // настраиваем заголовки
    //     //         // в случае с XMLHttpRequest() подставляется автоматически
    //     //         // самое главное чтобы у всех инпутов, которые отправляются на сервер стоял атрибут name
    //     //         request.send(formData);
    //     //         // отслеживаем конечную загрузку запроса
    //     //         request.addEventListener('load', () => {
    //     //             if (request.status === 200) {
    //     //                 console.log(request.response);
    //     //                 statusMessage.textContent = message.success;
    //     //                 // очистка формы
    //     //                 form.reset();
    //     //                 // удаляем блок message
    //     //                 setTimeout(() => {
    //     //                     statusMessage.remove();
    //     //                 }, 2000);
    //     //             } else {
    //     //                 statusMessage.textContent = message.failure;
    //     //             }
    //     //         });
    //     //     });
    //     // };
    
        // XMLHttpRequest()
    
        // function postData(form) {
        //     form.addEventListener('submit', (e) => {
        //         e.preventDefault();
    
        //         let statusMessage = document.createElement('img');
        //         statusMessage.src = message.loading;
        //         statusMessage.style.cssText = `
        //             display: block;
        //             margin: 0 auto;
        //         `;
        //         // вместо аппенда
        //         form.insertAdjacentElement('afterend', statusMessage);
            
        //         const request = new XMLHttpRequest();
        //         request.open('POST', 'server.php');
        //         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        //         const formData = new FormData(form);
    
        //         const object = {};
        //         formData.forEach(function(value, key){
        //             object[key] = value;
        //         });
        //         const json = JSON.stringify(object);
    
        //         request.send(json);
    
        //         request.addEventListener('load', () => {
        //             if (request.status === 200) {
        //                 console.log(request.response);
        //                 showThanksModal(message.success);
        //                 statusMessage.remove();
        //                 form.reset();
        //             } else {
        //                 showThanksModal(message.failure);
        //             }
        //         });
        //     });
        // }
    
        // fetch
        // функция которая отвечает за отправку данных на сервер
        // data - данные, которые будут поститься в этой функции
        // все операции выполняются асинхронно, поэтому нужно поставить async - чтобы они дожидались друг друга

    // функция, которая отвечает за привязку постинга
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // вместо аппенда
            form.insertAdjacentElement('afterend', statusMessage);

            // собираем данные
            const formData = new FormData(form);

        // если нужно отправить в формате json 
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });
            // превращаем обьект в массив массивов, а затем превращаем массив в обьект, после этого превращаем в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            // отправляем данные

            // переделали в функцию

            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     //  формат JSON
            //     body: JSON.stringify(object)
            //     // body: formData
            //     // data - это те данные, которые нам возвращаются с сервера и при помощи метода then мы их обрабатываем
            // })
            postData('http://localhost:3000/requests', json)
            // данная строка больше не нужна
            // .then(data => data.text())
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                    // что-то пошло не так
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })

        });
    }

        // реализация благодарственного окна
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        // скрываем наше модальное окно
        prevModalDialog.classList.add('hide');
        // открываем модальное окно
        openModal('.modal');

            // создаем новый элемент внутри старого модального окна
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        // создаем верстку
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // помещаем элемент в модальное окно
        document.querySelector('.modal').append(thanksModal);
        // удаляем модальное окно с сообщением
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // fetch
    // https://jsonplaceholder.typicode.com
    // url на который мы будем посылать запрос
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // // метод fetch использует промиссы, который затем обрабатываются при помощи then
    // .then(response => response.json())
    // .then(json => console.log(json));

    // получаем данные с базы данных
    // запускаем команду json-server db.json и меняем название нашей бд на тот который приходит
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));


}

export default forms;