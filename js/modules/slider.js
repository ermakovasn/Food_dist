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

export default slider;