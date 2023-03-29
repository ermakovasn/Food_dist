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

export default timer;