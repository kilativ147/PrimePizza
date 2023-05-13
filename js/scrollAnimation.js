// window.addEventListener('load', () => {
// })

function inizializeBurger() {
  const burgerButton = document.querySelector('.header__burger');
  const burgerMenu = document.querySelector('.header__content');
  burgerButton.classList.toggle('_activeBurgerButton');
  burgerMenu.classList.toggle('_activeBurgerMenu')
}
