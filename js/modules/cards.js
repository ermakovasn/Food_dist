import { getResource } from "../services/services";

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

    getResource('http://localhost:3000/menu')
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

export default cards;



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

