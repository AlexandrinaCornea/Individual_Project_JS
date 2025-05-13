const footerDisaplay = () => {
    return `
    <footer>
    &copy; <span id="year"></span> MyBookTracker. Toate drepturile rezervate.
  </footer>
    `
}

const footer = document.getElementById("footer")
footer.innerHTML = footerDisaplay()

document.getElementById('year').innerText = new Date().getFullYear();

