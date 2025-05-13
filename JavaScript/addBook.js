const coverImage = document.getElementById("coverImage")
const bookTitle = document.getElementById("title")
const bookAuthor = document.getElementById("author")
const bookGenre = document.getElementById("genre")
const bookNrPages = document.getElementById("pages")
const bookDescription = document.getElementById("description")
let stars = document.getElementsByClassName("star")
let output = document.getElementById("output")
const addBookBtn = document.getElementById("add-btn")

let books = []
let n = 0

const regexTitle = /^[A-ZȘȚĂÎÂ][a-zșțăîâA-ZȘȚĂÎÂ0-9'’"!?.,:;()\-\s]{1,99}$/
const regexAuthor = /^[A-ZȘȚĂÎÂ][a-zșțăîâA-ZȘȚĂÎÂ.'\-]{1,30}(\s[A-ZȘȚĂÎÂ][a-zșțăîâA-ZȘȚĂÎÂ.'\-]{1,30})+$/
const regexGenre = /^[A-ZȘȚĂÎÂ][a-zșțăîâ]{2,20}$/
const regexPages = /^[1-9][0-9]{0,4}$/
const regexDescription = /^[A-ZȘȚĂÎÂa-zșțăîâ0-9\s.,!?()'"-]{10,300}$/

const gfg = (num) => {
    remove()
    n = num
    for (let i = 0; i < num; i++) {
        if (num == 1) cls = "one"
        else if (num == 2) cls = "two"
        else if (num == 3) cls = "three"
        else if (num == 4) cls = "four"
        else if (num == 5) cls = "five"
        stars[i].className = "star " + cls
    }
    output.innerText = "Rating is: " + num + "/5"
}

const remove = () => {
    let i = 0
    while (i < 5) {
        stars[i].className = "star"
        i++
    }
}

const addBook = () => {
    let title = bookTitle.value
    let author = bookAuthor.value
    let genre = bookGenre.value
    let pages = bookNrPages.value
    let description = bookDescription.value
    let rating = n
    let cover = coverImage.value
    let isValid = true

    document.querySelectorAll(".error").forEach(e => e.remove())

    if (cover === "" || title === "" || author === "" || genre === "" || pages === "" || description === "") {
        const emptyError = document.createElement("p")
        emptyError.innerText = "Toate campurile sunt obligatorii"
        emptyError.className = "error"
        bookDescription.insertAdjacentElement("afterend", emptyError)
        isValid = false
    }

    if (cover === "") {
        const coverError = document.createElement("p")
        coverError.innerText = "Adaugati o imagine"
        coverError.className = "error"
        coverImage.insertAdjacentElement("afterend", coverError)
        isValid = false
    }

    if (!regexTitle.test(title)) {
        const titleError = document.createElement("p")
        titleError.innerText = "Titlulul trebuie sa inceapa cu litera mare"
        titleError.className = "error"
        bookTitle.insertAdjacentElement("afterend", titleError)
        isValid = false
    }

    if (!regexAuthor.test(author)) {
        const authorError = document.createElement("p")
        authorError.innerText = "Numele autorului trebuie sa inceapa cu litera mare"
        authorError.className = "error"
        bookAuthor.insertAdjacentElement("afterend", authorError)
        isValid = false
    }

    if (!regexGenre.test(genre)) {
        const genreError = document.createElement("p")
        genreError.innerText = "Genul trebuie sa inceapa cu litera mare"
        genreError.className = "error"
        bookGenre.insertAdjacentElement("afterend", genreError)
        isValid = false
    }

    if (!regexPages.test(pages)) {
        const pagesError = document.createElement("p")
        pagesError.innerText = "Numarul de pagini trebuie sa fie un numar pozitiv"
        pagesError.className = "error"
        bookNrPages.insertAdjacentElement("afterend", pagesError)
        isValid = false
    }

    if (!regexDescription.test(description)) {
        const descriptionError = document.createElement("p")
        descriptionError.innerText = "Descrierea trebuie sa contina maxim 100 de caractere"
        descriptionError.className = "error"
        bookDescription.insertAdjacentElement("afterend", descriptionError)
        isValid = false
    }

    if (isValid) {
        const book = {title, author, genre, pages, description, rating, cover}

        const alreadyExists = books.some(b => 
            b.title.toLowerCase() === title.toLowerCase().trim() &&
            b.author.toLowerCase() === author.toLowerCase().trim()
        )

        if (alreadyExists) {
            const existsError = document.createElement("p")
            existsError.innerText = "Cartea exista deja in lista"
            existsError.className = "error"
            bookDescription.insertAdjacentElement("afterend", existsError)
            return
        }

        books.push(book)
        localStorage.setItem("books", JSON.stringify(books))
    }

}

addBookBtn.addEventListener("click", addBook)