const searchInput = document.getElementById("search-input")
const booksContainer = document.getElementById("books-container")
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

displayBooks(books)
