document.addEventListener('DOMContentLoaded', function () {
  loadProducts();
});

function loadProducts() {
  // fetch('salad.json')
  //   .then(function(response) {
  //     if (!response.ok) {
  //       throw new Error('Failed to load products');
  //     }
  //     return response.json();
  //   })
  //   .then(function(data) {
  //     let out = '';
  //     for (let key in data) {
  //       out += '<div class="item-flex">';
  //       out += '<div class="item__image">';
  //       out += '<img src="' + data[key].image + '" alt="' + data[key].name +' "> ';
  //       out += '</div>';
  //       out += '<h3>' + data[key].name + '</h3>';
  //       out += '<p>' + data[key].description + '</p>';
  //       out += '<p><span>' + data[key]['price'] + ' грн.</span></p>';
  //       out += '<button class="item__buy" data-art="' + key + '">Купить</button>';
  //       out += '</div>';
  //     }
  //     document.querySelector('#salad').innerHTML = out;
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });

  // const array = data.salad;
  // let out = '';
  // for (let key in array) {
  //   out += '<div class="item-flex">';
  //   out += '<div class="item__image">';
  //   out += '<img src="' + array[key].image + '" alt="' + array[key].name + '"> ';
  //   out += '</div>';
  //   out += '<h3>' + array[key].name + '</h3>';
  //   out += '<p>' + array[key].description + '</p>';
  //   out += '<p><span>' + array[key].price + ' грн.</span></p>';
  //   out += '<button class="item__buy" data-articul="' + key + '"></button>';
  //   out += '</div>';
  // }
  // document.querySelector('#salad .product__items-grid').innerHTML = out;

}


fetch('products_list.json')
  .catch(error => console.error(error))
  .then(response => response.json())
  .then(data => {
    const categories = [data.pizza, data.salad, data.drinks, data.other];
    for (let category of categories) {
      console.log(category);
      for (let key in category) {
        let item = category[key];
        const htmlItem = generateProductHTML(key, item);

        let selector = '';
        if (category === data.pizza) {
          selector = document.querySelector('#pizza .product__items-grid');
        }
        else if (category === data.salad) {
          selector = document.querySelector('#salad .product__items-grid');
        }
        else if (category === data.drinks) {
          selector = document.querySelector('#drinks .product__items-grid');
        }
        else if (category === data.other) {
          selector = document.querySelector('#other .product__items-grid');
        }
        console.log(selector);

        selector.innerHTML += htmlItem;

        // Функція для генерації HTML-коду продукту
        function generateProductHTML(key, product) {
          return `
          <div class="item-flex">
            <div class="item__image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><span>${product.price} грн.</span></p>
            <button type='button' class="item__buy" data-articul="${key}"></button>
          </div>
        `;
        }
      }
    }
  });














































































// //Ініціаізація елементів по завершенню завантаження сторінки
// document.addEventListener("DOMContentLoaded", function() {
// 	//Навігація
// 	const navButtons = document.querySelectorAll(".buttons__navigation, .greatings__more");
// 	for (var i = 0; i < navButtons.length; i++) {
// 		navButtons[i].addEventListener("click", scrollToTarget);
// 	}

// 	//Поп ап
// 	const reqButtons = document.querySelectorAll(".button-request");
// 	for (var i = 0; i < reqButtons.length; i++) {
// 		reqButtons[i].addEventListener("click", requstForm);
// 	}
// });

// //Скрол
// function scrollToTarget(event) {
// 	event.preventDefault();
// 	const targetId = this.getAttribute("href");
// 	const target = document.querySelector(targetId);
// 	const offset = -120; //-100
// 	const bodyRect = document.body.getBoundingClientRect().top;
// 	const targetRect = target.getBoundingClientRect().top;
// 	const targetPosition = targetRect - bodyRect;
// 	const offsetPosition = targetPosition + offset;

// 	window.scrollTo({
// 		top: offsetPosition,
// 		// top: targetRect,
// 		behavior: 'smooth'
// 	});
// };

// //Визначення активного слайду та передача його індексу
// const sections = document.querySelectorAll('.slide');
// window.addEventListener('scroll', checkSectionPosition);
// function checkSectionPosition() {
// 	// висота вікна браузера
//   const windowHeight = window.innerHeight;
// 	// межа яка повинен пересікти елемент
// 	const windowPos = windowHeight * 0.65;
// 	// console.log(sections[1].getBoundingClientRect().top);
//   for (let i = 0; i < sections.length; i++) {
// 		// відстань від верху сторінки до верхньої межі елемента
//     const sectionTop = sections[i].getBoundingClientRect().top;
//     if (sectionTop < windowPos ) changeColorNav(i);
//   }
// }
// 	//зміна кольору пункту відповідного нав меню
// const navButtons = document.querySelectorAll(".buttons__navigation");
// function changeColorNav(index){
// 	for (var i = 0; i < navButtons.length; i++) {
// 		if (i === index) {
// 			navButtons[i].classList.add('_active');
// 			translateNav(index);
//     } else {
// 			navButtons[i].classList.remove('_active');
//     }
// 	}
// };

// 	//переміщення шкали нав - активним меню по центру сторінки
// const navMenu = document.querySelector('.wrapper-buttons');
// function translateNav(ind){
// 	/*
// 	! Працює з глюками
// 	const windowHeight = window.innerHeight / 2; // Центр вікна браузера
// 	const activeButton = navButtons[ind]; //активний елемент
// 	const buttonRect = activeButton.getBoundingClientRect().top; //висота активного елементу
// 	console.log(buttonRect);
// 	const translateY = windowHeight - buttonRect;
// 	console.log(translateY);
// 	*/

// 	// отримуємо елемент buttons__container
// 	const containerElement = document.querySelector('.buttons__container');
// 	// змінюємо значення translateY для батьківського елемента
// 	var translateY = 110 - (55 * ind);
// 	containerElement.style.transform = `rotate(90deg) translate(${translateY}px, 115px)`;

// }


// //Анiмацiя появи слайдів
// const myBlock = document.querySelectorAll('.slideToAnimUp, .slideToAnimLeft');
// window.addEventListener('scroll', handleScroll);
// function handleScroll() {
// 	myBlock.forEach(function(element) {
// 		let elementPosition = element.getBoundingClientRect().top;
// 		let offset = window.innerHeight - 0; //на каком расстоянии окна от блока - проигрывать анимацию
// 		if (elementPosition < offset) {
// 			element.classList.add('animate');
// 		}
// 	})
// }


// //Зворотня форма
// function requstForm(event) {
// 	var target = document.querySelector('.popup');
// 	var targetAnim = document.querySelector('.popup__container');
// 	if (target) {
// 		target.classList.add('_active');
// 		targetAnim.classList.add('popup-anim');
// 		const body = document.querySelector('body');
// 		body.style.overflow = 'hidden';
// 	}
// };
// //Закрити форму
// function requestFormClose(){
// 	var target = document.querySelector('.popup');
// 	var targetAnim = document.querySelector('.popup__container');
// 	if (target) {
// 		target.classList.remove('_active');
// 		targetAnim.classList.remove('popup-anim');
// 		const body = document.querySelector('body');
// 		body.style.overflow = 'auto';
// 	}
// }



// 	//! клас повинен бути position:relative, но не точно

// 	//вільний слайд
// 	freeMode: true,
// 	//заміна вигляду курсору миші
// 	grabCursor: false,
// });

// const instSlider = new Swiper('.gallety__back', {
//   // ! клас повинен бути position:relative
//   // адаптив
//   //автоматична кількість показаних слайдів
//   	// slidesPerView: '4',
//     // slidesPerView: '3',
//   breakpoints: {
//     //Для різних екранів, mobile first
//     320: {
//       //кількість видимих слайдів на екрані
//       // slidesPerView: auto,
//       //відстань між слайдами
//       // spaceBetween: 10,
//     },
//     600: {
//       slidesPerView: 1.5,
//       // spaceBetween: 20,
//     },
//     900: {
//       slidesPerView: 3.5,
//       // spaceBetween: 50,
//     },
//     1300: {
//       slidesPerView: 4,
//       // spaceBetween: 50,
//     },
//   },
//   //можливіть перетаскування мишшю
//   simulateTouch: false,
//   //чуттєвість до свайпу
//   touchRatio: 1,
//   //кут спрацювання свайпу
//   touchAngle: 45,
//   //заміна вигляду курсору миші
//   grabCursor: false,
//   //скрол
//   //перелистання при кліку на слайд
//   slideToClickedSlide: false,
//   //активний слайд по центру
//   centeredSlides: false,
//   //нескінченний скрол
//   loop: true,
//   //автопрокртка
//   autoplay: {
//     //пауза
//     delay: 500,
//     //чи закінчиться атвтопрокрутка на останньому слайді
//     stopOnLastSlide: false,
//     //чи зупиниться автопрокрутка якщо вручну прокрутити
//     disableOnInteraction: false,
//   },
// })


//Розмітка сторінки
/*
//	 Створюємо новий елемент div
var line = document.createElement("div");
// 	Додаємо до нього стилі
line.style.width = "100%";
line.style.height = "1px";
line.style.backgroundColor = "green";
line.style.position = "fixed";
line.style.top = "50%";
line.style.left = "0";
line.style.marginTop = "-0.5px";
// 	Додаємо елемент в DOM дерево
document.body.appendChild(line);
*/