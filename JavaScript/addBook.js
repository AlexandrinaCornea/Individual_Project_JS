const coverImage = document.getElementById("coverImage")
const bookTitle = document.getElementById("title")
const bookAuthor = document.getElementById("author")
const bookGenre = document.getElementById("genre")
const bookNrPages = document.getElementById("pages")
const bookDescription = document.getElementById("description")
let stars = document.getElementsByClassName("star")
let output = document.getElementById("output")
const addBookBtn = document.getElementById("add-btn")

let books = JSON.parse(localStorage.getItem("books")) || []
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
        let cls = "";
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
    let file = coverImage.files[0]
    let isValid = true

    document.querySelectorAll(".error").forEach(e => e.remove())

    if (!file || title === "" || author === "" || genre === "" || pages === "" || description === "") {
        const emptyError = document.createElement("p")
        emptyError.innerText = "Toate campurile sunt obligatorii"
        emptyError.className = "error"
        bookDescription.insertAdjacentElement("afterend", emptyError)
        isValid = false
    }

    if (!file) {
        const coverError = document.createElement("p")
        coverError.innerText = "Adaugati o imagine"
        coverError.className = "error"
        coverImage.insertAdjacentElement("afterend", coverError)
        isValid = false
    }

    if (!regexTitle.test(title)) {
        const titleError = document.createElement("p")
        titleError.innerText = "Titlul trebuie să înceapă cu literă mare."
        titleError.className = "error"
        bookTitle.insertAdjacentElement("afterend", titleError)
        isValid = false
    }

    if (!regexAuthor.test(author)) {
        const authorError = document.createElement("p")
        authorError.innerText = "Autorul trebuie să aibă nume si prenume sau initiale, ambele cu literă mare."
        authorError.className = "error"
        bookAuthor.insertAdjacentElement("afterend", authorError)
        isValid = false
    }

    if (!regexGenre.test(genre)) {
        const genreError = document.createElement("p")
        genreError.innerText = "Genul trebuie să înceapă cu literă mare."
        genreError.className = "error"
        bookGenre.insertAdjacentElement("afterend", genreError)
        isValid = false
    }

    if (!regexPages.test(pages)) {
        const pagesError = document.createElement("p")
        pagesError.innerText = "Pagini: număr întreg pozitiv."
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
    if (rating === 0) {
        const ratingError = document.createElement("p")
        ratingError.innerText = "Rating-ul trebuie să fie între 1 și 5"
        ratingError.className = "error"
        addBookBtn.insertAdjacentElement("beforebegin", ratingError)
        isValid = false
    }

    if (!isValid) return

    const reader = new FileReader()
    reader.onload = function() {
        const img = new Image()
        img.src = reader.result

        img.onload = function() {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            const maxWidth = 500
            const scale = maxWidth / img.width
            canvas.width = maxWidth
            canvas.height = img.height * scale

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            const compressedImage = canvas.toDataURL('image/jpeg', 0.7) 

            const book = { title, author, genre, pages, description, rating, compressedImage }

            const alreadyExists = books.some(b =>
                b.title.toLowerCase() === title.toLowerCase() &&
                b.author.toLowerCase() === author.toLowerCase()
            )

            if (alreadyExists) {
                const existsError = document.createElement("p")
                existsError.innerText = "Cartea există deja în listă"
                existsError.className = "error"
                bookDescription.insertAdjacentElement("afterend", existsError)
                return
            }

            books.push(book)
            localStorage.setItem("books", JSON.stringify(books))

            const success = document.createElement("p")
            success.innerText = "Cartea a fost adăugată cu succes!"
            success.className = "success"
            bookDescription.insertAdjacentElement("afterend", success)
            setTimeout(() => success.remove(), 3000)

            bookTitle.value = ""
            bookAuthor.value = ""
            bookGenre.value = ""
            bookNrPages.value = ""
            bookDescription.value = ""
            coverImage.value = ""
            remove()
            output.innerText = ""
        }
    }

    reader.readAsDataURL(file)
}

addBookBtn.addEventListener("click", addBook)
