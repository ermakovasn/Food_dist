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

export default tabs;