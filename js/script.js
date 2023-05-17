//Список картини
var cartList = {}
var cartListPrice = {}



document.addEventListener('DOMContentLoaded', function () {
  loadProducts();
  funcTabCategory(0);
  checkCart();
  updCartCount();
});

function loadProducts() {
  //Data Extract from JSON file to complite items list
  fetch('products_list.json') //inicialization JSON file
    .catch(error => console.error(error)) //check for errors (exsisting file)
    .then(response => response.json()) //% appeal to element and collect answer (вірогідно, але команда обов'язкова)
    .then(data => { //Data obj is create to whitch the obj of JSON are assigned
      const categories = [data.pizza, data.salad, data.drinks, data.other]; //array with all objects inside the json file(obj data)
      for (let category of categories) { //check all of obj inside data
        for (let key in category) { //check all of keys insile every obj
          let item = category[key];  //Create element to share it into building function
          const htmlItem = generateProductHTML(key, item); //Creating and writing element to a variable for furher assignment 

          let selector = ''; // Selector to witch the created an item will then added
          if (category === data.pizza) { //Check the category of the obj
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
          selector.innerHTML += htmlItem; //Adding a created object to a specific selector

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
      //Додаємо обробникик подій для подальшої добавки елементів до корзини
      //список батьківських елементів кнопок
      const itemList = document.querySelectorAll('.product__items-grid');
      itemList.forEach(element => {
        element.addEventListener('click', (event) => {
          //якщо клікнуто на дочірній елемент який є кнопкою корзини - передача ідентифікатору
          if (event.target.classList.contains('item__buy')) {
            const id = event.target.getAttribute('data-articul');
            addToCart(id);
          }
        })
      })
    });
}

//Показ категорій
const butCategory = document.querySelectorAll('.products__category-button');
// Додаємо обробник події "click" для кожної кнопки
butCategory.forEach(button => {
  button.addEventListener('click', () => {
    // Видаляємо клас "_activeButton" у всіх кнопок
    butCategory.forEach(button => {
      button.classList.remove('_activeButton');
    });
    // Додаємо клас "_activeButton" до клікнутої кнопки
    button.classList.add('_activeButton');
    let activeCategory = Array.from(butCategory).findIndex((element) => element.classList.contains('_activeButton'));
    funcTabCategory(activeCategory);
  });
});

//Показ товарів
const tabCategory = document.querySelectorAll('.product__body');
function funcTabCategory(ind) {
  tabCategory.forEach(category => {
    category.classList.remove('_activeCategory');
  })
  tabCategory[ind].classList.add('_activeCategory');
}



//Корзина
//кнопка корзини
const basketBut = document.querySelector('.basket__cart');
//меню корзини
const basketMenu = document.querySelector('.basket');
//кнопка закриття корзини
const basketClose = document.querySelector('.basket__close');

//Відкриваємо меню
basketBut.addEventListener('click', () => {
  basketMenu.classList.add('_activeBasket');
  document.body.style.overflow = 'hidden';

  updBasketList();

})
//Закриваємо меню кнопкою
basketClose.addEventListener('click', () => {
  basketMenu.classList.remove('_activeBasket');
  document.body.style.overflow = 'auto';

})

//Закриваємо кліком поза корзини
document.addEventListener('click', (event) => {
  // Перевіряємо, чи клікнуто на елементі з класом "basket" або кнопці корзини
  if (!event.target.closest('.basket') && !event.target.closest('.basket__cart') && !event.target.closest('.basket__item-button')) {
    basketMenu.classList.remove('_activeBasket');
    document.body.style.overflow = 'auto';
  }
});

//Робота корзини
function addToCart(id) {
  if (cartList[id] != undefined && cartListPrice[id] != undefined) {
    cartList[id]++;
    cartListPrice[id] = '';
  } else {
    cartList[id] = 1;
    cartListPrice[id] = '';
  }
  localStorage.setItem('cartList', JSON.stringify(cartList));
  updCartCount();
}

//Оновлення лічильника в корзини
const cart = document.querySelector('.basket__cart');
const cartCount = document.querySelector('.cart__count');
const updCartCount = () => {
  let totalQuantity = Object.keys(cartList).reduce((total, key) => {
    return total + cartList[key];
  }, 0);
  // cartCount.innerText = Object.keys(cartList).length; //Виводить кількість елементів в масиві
  cartCount.innerText = totalQuantity;
  if (Object.keys(cartList).length <= 0) {
    basketMenu.classList.remove('_activeBasket');
  }
  if (totalQuantity > 0) {
    if (!cart.classList.contains('_activeCard')) cart.classList.add('_activeCard');
  }  else cart.classList.remove('_activeCard');
};

//оновлення кількості елементів у корзині
function checkCart() {
  if (localStorage.getItem('cartList') != undefined) {
    cartList = JSON.parse(localStorage.getItem('cartList'));
  }
  firstUpdateBasketMenu();
}

//Присвоєння відповідних класів та подій
function firstUpdateBasketMenu() {
  let basketList = document.querySelector('.basket__list')

  //Додаємо обробникик подій для подальшої добавки елементів до корзини
  //список батьківських елементів кнопок
  basketList.addEventListener('click', (event) => {
    if (event.target.classList.contains('basket__item-button')) {
      //якщо клікнуто на дочірній елемент який є кнопкою
      let id = event.target.getAttribute('data-articul');
      if (event.target.classList.contains('-minus')) {
        basketItemPlus(id, 'minus');
      }
      else if (event.target.classList.contains('-plus')) {
        basketItemPlus(id, 'plus');
      }
      else if (event.target.classList.contains('-delete')) {
        basketItemPlus(id, 'delete');
      }
    }
  });
  updBasketList();
}

//Очищення корзини
function updBasketList() {
  let basketList = document.querySelector('.basket__list')
  let basketSum = document.querySelector('.basket__summ span')
  //Очищення данних
  basketList.innerHTML = '';
  basketSum.innerText = '0';

  buildBasketHTNL()
}

//Будуємо структуру  корзини
function buildBasketHTNL() {
  fetch('products_list.json') //inicialization JSON file
    .catch(error => console.error(error)) //check for errors (exsisting file)
    .then(response => response.json()) //% appeal to element and collect answer (вірогідно, але команда обов'язкова)
    .then(data => { //Data obj is create to whitch the obj of JSON are assigned
      let basketSumm = 0;
      for (let item in cartList) {
        //ідеинтифікатор + кількість
        //console.log(item + ' --- ' + cartList[item]);
        let searchId = item;
        let count = cartList[item];
        const categories = [data.pizza, data.salad, data.drinks, data.other]; //array with all objects inside the json file(obj data)
        for (let category of categories) { //check all of obj inside data
          for (let key in category) { //check all of keys insile every obj
            if (key === searchId) {
              let item = category[key];  //Create element to share it into building function
              let itemSum = item.price * count;
              basketSumm += itemSum;
              const htmlItem = generateProductHTML(key, item, count, itemSum); //Creating and writing element to a variable for furher assignment 

              let selector = document.querySelector('.basket__list');
              selector.innerHTML += htmlItem; //Adding a created object to a specific selector

              // Функція для генерації HTML-коду продукту
              function generateProductHTML(key, item, count, itemSum) {
                return `
                <li>
                  <div><img src="${item.image}" alt="${item.name}"></div>
                  <p class="item__name">${item.name}</p>
                  <button type='button' data-articul="${key}" class="basket__item-button -minus">-</button>
                  <p class="item__count">${count}</p>
                  <button type='button' data-articul="${key}" class="basket__item-button -plus">+</button>
                  <p class="item__summ">${itemSum}</p><span> грн.</span>
                  <button type='button' data-articul="${key}" class="basket__item-button -delete">&#215;</button>
                </li>
                `;
              }
            }
          }
        }
      }

      let basketSumText = document.querySelector('.basket__summ span');
      basketSumText.innerText = basketSumm;
    });
}

//Операції з елементами в списку корзини
function basketItemPlus(id, operation) {
  if (operation === 'plus') cartList[id]++;
  if (operation === 'minus') cartList[id]--;
  if (operation === 'delete' || cartList[id] <= 0 || cartList[id] === null) {
    delete cartList[id];
    document.body.style.overflow = 'auto';
    updCartCount();

  }
  updBasketList();
  localStorage.setItem('cartList', JSON.stringify(cartList));
}
