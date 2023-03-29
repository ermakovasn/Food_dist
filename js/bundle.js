/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Calc

    // назначаем data атрибуты с коэффициентами активности

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            // досрочно прерываем функцию
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

       // сохранение данных из localStorage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            // убираем все классы активности
            elem.classList.remove(activeClass);
            // если в локал сторадж уже записано значение, то этому элементу назначаем класс активности
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    // если пользователь кликнул на какую-то активность то мы берем значение, которое стоит в дата-атрибуте
                    ratio = +e.target.getAttribute('data-ratio');
                    // запоминаем информацию в локал сторадж
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
    
                // убираем все классы активности
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                // добавляем класс активности туда, куда кликнули
                e.target.classList.add(activeClass);
                calcTotal();
            });
        })
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

        // // делегирование - здесь неприменимо
        // function getStaticInformation (parentSelector, activeClass) {
            // const elements = document.querySelectorAll(`${parentSelector} div`);

        // document.querySelector(parentSelector).addEventListener('click', (e) => {
        //     if (e.target.getAttribute('data-ratio')) {
        //         // если пользователь кликнул на какую-то активность то мы берем значение, которое стоит в дата-атрибуте
        //         ratio = +e.target.getAttribute('data-ratio');
        //     } else {
        //         sex = e.target.getAttribute('id');
        //     }


        //     // убираем все классы активности
        //     elements.forEach(elem => {
        //         elem.classList.remove(activeClass);
        //     });

        //     // добавляем класс активности туда, куда кликнули
        //     e.target.classList.add(activeClass);
        //     calcTotal();
        // });
    // }
    // getStaticInformation('#gender', 'calculating__choose-item_active');
    // getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            // проверяем на не числа
            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            // проверяем id
            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // // используем классы для карточек
    class MenuCard {
    // передаем аргументы, которые будут меняться
    // остальные параметры передаем в rest - он будет массивом
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        // задаем родительский элемент
        this.parent = document.querySelector(parentSelector);
        // курс валют
        this.transfer = 27;
        // вызываем метод конвертации
        this.changeToUAH();
    }
    // метод первода из долларов в гривны
    changeToUAH() {
        this.price = this.price * this.transfer;
    }
    // помещаем на страницу
    render() {
        const element = document.createElement('div');
        // делаем проверку, если в массив не пришло значение, то по дефолту выставляем ему класс
        if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            // перебираем массив, который приходит из classes и добавляем элементу класс
            this.classes.forEach(className => element.classList.add(className));
        }


    element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
    `;
    // помещаем элемент в блок
        this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
        // берем свойства обьекта с базы данных
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // // тоже самое через библиотеку axios
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);



    // второй способ - без использования шаблона класса

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //                 <img src=${img} alt=${altimg}>
    //                 <h3 class="menu__item-subtitle">${title}</h3>
    //                 <div class="menu__item-descr">${descr}</div>
    //                 <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>
    //         `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }


    // const div = new MenuCard();
    // div.render();

    // если нужно использовать 1 раз
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     // передаем последним аргументом класс, куда нужно будет вставить содержимое
    //     'menu__item'
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14,
    //     '.menu .container',
    //     'menu__item'
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     12,
    //     '.menu .container',
    //     'menu__item'
    // ).render();



/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

        const slides = document.querySelectorAll(slide),
              slider = document.querySelector(container),
              prev = document.querySelector(prevArrow),
              next = document.querySelector(nextArrow),
              total = document.querySelector(totalCounter),
              current = document.querySelector(currentCounter),
      //   только для второго варианта
              slidesWrapper = document.querySelector(wrapper),
              slidesField = document.querySelector(field),
      //   получаем ширину окна, через которое будем смотреть на слайды
              width = window.getComputedStyle(slidesWrapper).width;
  // создаем индекса, который будет определять положение слайдера
  let slideIndex = 1;
  // во втором случае нам понадобится переменная, которая будет показывать сколько мы уже отступили вправо или влево
  let offset = 0;

  function dotsOpacity() {
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
  }

  function addZero() {
      if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
      } else {
          current.textContent = slideIndex;
      }
  }

  if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
  } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
  }

  // showSlides(slideIndex);

  // // чтобы подставлялся 0 в начале, эту проверку лучше вынести за пределы функции чтобы слайдер не моргал, тк вызывается функция
  // if (slides.length < 10) {
  //     total.textContent = `0${slides.length}`;
  // } else {
  //     total.textContent = slides.length;
  // }

  // function showSlides(n) {
  //     // чтобы с последнего слайда переключался на 1 слайд
  //     if (n > slides.length) {
  //         slideIndex = 1;
  //     }
  //     // обратная операция, если меньше 1 перемещаемся на последний слайд
  //     if (n < 1) {
  //         slideIndex = slides.length;
  //     }

  //     slides.forEach(item => item.style.display = 'none');

  //     slides[slideIndex - 1].style.display = 'block';

  //     if (slides.length < 10) {
  //         current.textContent = `0${slideIndex}`;
  //     } else {
  //         current.textContent = slideIndex;
  //     }
  // }

  // function plusSlides(n) {
  //     // вызывает функцию и увеличивает индекс на значение n
  //     showSlides(slideIndex += n);
  // }
  
  // prev.addEventListener('click', () => {
  //     plusSlides(-1);
  // });
      
  // next.addEventListener('click', () => {
  //     plusSlides(1);
  // });


  // slider-carousel

  // создаем карусель со всеми слайдами
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  // устанавливаем ширину для каждого отдельного слайда
  slides.forEach(slide => {
      slide.style.width = width;
  });

  // чтобы спозиционировать дотсы
  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
  // создаем переменную массив, чтобы переключались дотсы
        dots = [];

  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
      `;

      slider.append(indicators);

      // запускаем цикл, чтобы каждый дотс относился к определенной картинке
      for(let i = 0; i < slides.length; i++) {
          // создаем переменную ли
          const dot = document.createElement('li');
          dot.setAttribute('data-slide-to', i + 1);
          dot.style.cssText = `
              box-sizing: content-box;
              flex: 0 1 auto;
              width: 30px;
              height: 6px;
              margin-right: 3px;
              margin-left: 3px;
              cursor: pointer;
              background-color: #fff;
              background-clip: padding-box;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
              opacity: .5;
              transition: opacity .6s ease;
          `;
          if (i == 0) {
              dot.style.opacity = 1;
          }
          indicators.append(dot);
          // помещаем дот в массив
          dots.push(dot);
      }
  
  function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
      // от ширины например 500px нужно отрезать 2 последних символа и превратить в числовой формат
      // наш отступ равен ширине одного слайда умноженное на количество слайдов минус 1 - в таком случае мы дошли до конца и возвращаемся к первому слайду
      // буквы px просто заменятся на ничего, те удалятся
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
          offset = 0;
      } else {
          // добавить смещение
          offset += deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
          slideIndex = 1;
      } else {
          slideIndex++;
      }

      addZero();

      dotsOpacity();
  });

  prev.addEventListener('click', () => {
      if (offset == 0) {
          offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
          offset -= deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
          slideIndex = slides.length;
      } else {
          slideIndex--;
      }

      addZero();
      dotsOpacity();
  });

  // чтобы оживить точки при нажатии
  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;
          offset = deleteNotDigits(width) * (slideTo - 1);
          // устанавливаем смещение слайдера
          slidesField.style.transform = `translateX(-${offset}px)`;

          addZero();
          dotsOpacity();

      });
  });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

	let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
    
    tabsContent.forEach(item => {
         // скрываем весь контент, который сейчас есть на сайте
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
         // удаляем класс активности, точку не ставим тк работаем с классами
        item.classList.remove(activeClass);
    });
    }
// тк это первый слайд передаем 0
    function showTabContent(i = 0) {
     // номер таба будем передавать как аргумент
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        // если часто нужно будет использовать event.target - создаем переменную
        const target = event.target;
        // удаляем точку у строки(класс tabheader__item)
        if(target && target.classList.contains(tabsSelector.slice(1))) {
            // запускае перебор всех табов, если его номер это тот номер на который кликнул пользователь, тогда показываем его на странице
            // дальше передаем колбэк функцию
            // второй элемент всегда отвечает за номер по порядку.
            // первый это каждый таб
            tabs.forEach((item, i) => {
            // если элемент совпадает с табом, тогда будем вызывать эти 2 функции
                if (target == item) {
                    hideTabContent();
    // i это номер того элемента, который в этом условии совпал
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

    // функция, которая определяет разницу между дедлайном и текущей датой
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
// кол-во миллисекунд, которое будет в нашем конечном времени минуc текущая дата
// Метод Date.parse() разбирает строковое представление даты и возвращает количество миллисекунд, прошедших с 1 января 1970 года 00:00:00 по UTC.
        const t = Date.parse(endtime) - Date.parse(new Date());
            if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds =  0;
        } else {
            // находим сколько дней будет в этом колличестве миллисекунд Math.floor округляет до целого
        // общее число t делим на (1000 миллисекунд умножаем на 60 = 1 минута, затем умножаем 60 минут и умножаем на 24 часа)
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // если число однозначное, то подставляем 0 перед числом (меньше, чем 10)
    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    // функцияя, которая устанавливает таймер на страницу
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
                //   функция будет запускаться каждую секунду
            timeInterval = setInterval(updateClock, 1000);

        // чтобы верстка не моргала нужно вызвать эту функцию
        updateClock();

        // функция, которая обновляет таймер каждую секунду
        function updateClock() {
                // используем функцию, которую создали до этого, которая возвращает обьект
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // функцию нужно будет остановить по истечении времени
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    // во внутрь помещаем промисс, который возвращается от фетча
    // ставим await чтобы код дожидался ответа
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    // промисс возвращаем в формате json
    return await res.json();
};

const getResource = async (url) => {
    // во внутрь помещаем промисс, который возвращается от фетча
    // ставим await чтобы код дожидался ответа
    const res = await fetch(url);
    // обработка ошибок, тк метод fetch выводит ошибку только в случае отсутствия интернета
    if (!res.ok) {
        // выкидываем новую ошибку
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    // промисс возвращаем в формате json
    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");


;








window.addEventListener('DOMContentLoaded', function() {
        // открытие модального окна после того, как юзер пролистал какую-то часть сайта
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);

        (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
        (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-11-21');
        (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
        (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
        (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
        (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
            container: '.offer__slider',
            slide: '.offer__slide',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            field: '.offer__slider-inner'
        });

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map