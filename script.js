document.getElementById('year').textContent = new Date().getFullYear();

const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.dropdown');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});