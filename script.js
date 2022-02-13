const hamburger = document.querySelector('[data-hamburger]')
const mobileMenu = document.querySelector('[data-mobile]')
const mobileLinks = document.querySelectorAll('[data-link]')

const showMenu = () => {
  mobileMenu.classList.toggle('open')
}

hamburger.addEventListener('click', showMenu)