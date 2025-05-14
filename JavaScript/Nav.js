const navbarDisplay = () => {
    return`
    <nav>
    <div class="nav-header">
      <h1>MyBookTracker</h1>
      <button class="menu-toggle" aria-label="Deschide meniul">&#9776;</button>
    </div>
    <ul class="dropdown">
      <li><a href="./App.html">Acasă</a></li>
      <li><a href="./AddBook.html">Adaugă Carte</a></li>
      <li><a href="./Books.html">Cărțile citite</a></li>
    </ul>
  </nav>
    `
}
const navbar = document.getElementById("nav")
navbar.innerHTML = navbarDisplay()
const toggleBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.dropdown');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});