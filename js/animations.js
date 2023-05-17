// Викликати функцію перевірки положення елементів при завантаженні сторінки та прокрутці
window.addEventListener('load', checkElementPosition);
window.addEventListener('scroll', checkElementPosition);

// Отримати всі елементи з класом ".animation-left"
const animObj = document.querySelectorAll('.animation-left, .animation-right, .animation-bottom, .animation-show');

// Функція, яка перевіряє положення елементу
function checkElementPosition() {
  let windowHeight = window.innerHeight;

  // Перебір усіх елементів
  animObj.forEach((element) => {
    // Висота від верху елементу до верху вьюпорту
    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top;

    // Перевірка відстані елементу від вікна вьюпорту
    let offsetY = -20;
    let distanceToBottom = elementTop - windowHeight;
    
    if (distanceToBottom <= offsetY) {
      // Додати клас "_activeAnimation"
      element.classList.add('_activeAnimation');
    }
  });
}

