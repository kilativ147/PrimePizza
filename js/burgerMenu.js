function inizializeBurger() {
  const burgerButton = document.querySelector('.header__burger');
  const burgerMenu = document.querySelector('.header__content');
  burgerButton.classList.toggle('_activeBurgerButton');
  burgerMenu.classList.toggle('_activeBurgerMenu')

  if (burgerButton.classList.contains('_activeBurgerButton')) {
    document.body.style.overflow = 'hidden';
    console.log('hidden');
    
  } else {document.body.style.overflow = 'auto';
console.log('auto');
}

}