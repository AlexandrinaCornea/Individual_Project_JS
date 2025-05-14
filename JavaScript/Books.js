const searchInput = document.getElementById("search-input")
const booksContainer = document.getElementById("books-container")
const filterBtn = document.getElementById("apply-filters")

let books = JSON.parse(localStorage.getItem("books")) || []

const deleteBook = (index) => {
    books.splice(index, 1)
    localStorage.setItem("books", JSON.stringify(books))
    displayBooks(books)
}

const displayBooks = (booksList) => {
    booksContainer.innerHTML = ""
    if (booksList.length === 0) {
        booksContainer.innerHTML = `
            <h2>Nu există nicio carte</h2>
            <p>Adăugați o carte pentru a o vizualiza aici.</p>`
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
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    )
    displayBooks(filteredBooks)
})

const filterBooks = () => {
    const genreFilter = document.getElementById("filter-genre").value.trim().toLowerCase();
    const ratingFilter = document.getElementById("filter-rating").value;
    const maxPagesFilter = document.getElementById("max-pages").value.trim();

    let filteredBooks = books;

    if (genreFilter && genreFilter !== "") {
        filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === genreFilter);
    }

    if (ratingFilter && ratingFilter !== "0") {
        filteredBooks = filteredBooks.filter(book => book.rating === parseInt(ratingFilter));
    }

    if (maxPagesFilter && !isNaN(maxPagesFilter) && maxPagesFilter !== "") {
        filteredBooks = filteredBooks.filter(book => book.pages <= parseInt(maxPagesFilter));
    }

    if (!genreFilter && ratingFilter === "0" && maxPagesFilter === "") {
        filteredBooks = books;
    }

    

    displayBooks(filteredBooks);
}

displayBooks(books)
filterBtn.addEventListener("click", filterBooks)

const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });