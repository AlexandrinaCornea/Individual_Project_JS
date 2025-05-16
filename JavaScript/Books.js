const searchInput = document.getElementById("search-input")
const booksContainer = document.getElementById("books-container")
const filterBtn = document.getElementById("apply-filters")

let books = JSON.parse(localStorage.getItem("books")) || []

const deleteBook = (index) => {
  books.splice(index, 1)
  localStorage.setItem("books", JSON.stringify(books))
  displayBooks(books)
  generateChart()
}

const displayBooks = (booksList) => {
  booksContainer.innerHTML = ""
  if (booksList.length === 0) {
    booksContainer.innerHTML = `
        <div class="no-books">
            <h2>Nu există nicio carte</h2>
            </br>
            <p>Adăugați o carte pentru a o vizualiza aici.</p>
        </div>`
    return
  }

  booksList.forEach((book, index) => {
    const bookElement = document.createElement("div")
    bookElement.classList.add("book")
    bookElement.innerHTML = `
            <img src="${book.compressedImage}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.genre} • ${book.pages} pagini</p>
            <p>Rating: ${book.rating}/5</p>
            <button class="delete" data-index="${index}">Șterge</button>
        `
    booksContainer.appendChild(bookElement)
  })
  const deleteBtns = document.querySelectorAll(".delete")
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index
      deleteBook(index)
    })
  })
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase()
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  )
  displayBooks(filteredBooks)
})

const filterBooks = () => {
  const genreFilter = document
    .getElementById("filter-genre")
    .value.trim()
    .toLowerCase()
  const ratingFilter = document.getElementById("filter-rating").value
  const maxPagesFilter = document.getElementById("max-pages").value.trim()

  let filteredBooks = books

  if (genreFilter && genreFilter !== "") {
    filteredBooks = filteredBooks.filter(
      (book) => book.genre.toLowerCase() === genreFilter
    )
  }

  if (ratingFilter && ratingFilter !== "0") {
    filteredBooks = filteredBooks.filter(
      (book) => book.rating === parseInt(ratingFilter)
    )
  }

  if (maxPagesFilter && !isNaN(maxPagesFilter) && maxPagesFilter !== "") {
    filteredBooks = filteredBooks.filter(
      (book) => book.pages <= parseInt(maxPagesFilter)
    )
  }

  if (!genreFilter && ratingFilter === "0" && maxPagesFilter === "") {
    filteredBooks = books
  }

  displayBooks(filteredBooks)
}

displayBooks(books)
filterBtn.addEventListener("click", filterBooks)

const ctx = document.getElementById("myChart")
let myChart = null

const generateChart = () => {
  const chartContainer = document.getElementById("chart-container")
  const genreCount = {}

  books.forEach((book) => {
    if (genreCount[book.genre]) {
      genreCount[book.genre]++
    } else {
      genreCount[book.genre] = 1
    }
  })

  const labels = Object.keys(genreCount)
  const totalBooks = books.length
  const nrOfPerGenre = Object.values(genreCount)

  if (totalBooks === 0) {
    chartContainer.classList.remove("active")
    if (myChart) {
      myChart.destroy()
      myChart = null
    }
    return
  } else {
    chartContainer.classList.add("active")
  }
  if (myChart) {
    myChart.destroy()
    myChart = null
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Numărul de cărți pe gen",
        data: nrOfPerGenre,
        backgroundColor: [
          "#F8BBD0",
          "#A5D6A7",
          "#FFECB3",
          "#B39DDB",
          "#80DEEA",
          "#FFCCBC",
        ],
        borderColor: [
          "#F48FB1",
          "#81C784",
          "#FFD54F",
          "#9575CD",
          "#4DD0E1",
          "#FFAB91",
        ],
        borderWidth: 1,
      },
    ],
  }

  const config = {
    type: "pie",
    data: data,
  }

  myChart = new Chart(document.getElementById("myChart"), config)
}
window.addEventListener("load", () => {
  displayBooks(books)
  generateChart()
})
