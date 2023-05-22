function inizializeBurger() {
  const burgerButton = document.querySelector('.header__burger');
  const burgerMenu = document.querySelector('.header__content');
  burgerButton.classList.toggle('_activeBurgerButton');
  burgerMenu.classList.toggle('_activeBurgerMenu')
  document.body.classList.toggle('_lock');

}