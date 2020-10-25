// initialize array to store books
let a = new Book("Harry Potter and The Philosopher's Stone", "J.K. Rowling", "246", "Fantasy");
let b = new Book("Harry Potter and The Chamber of Secrets", "J.K. Rowling", "288", "Fantasy");
let c = new Book("Harry Potter and The Prisoner of Azkaban", "J.K. Rowling", "368", "Fantasy");
let d = new Book("Harry Potter and The Goblet of Fire", "J.K. Rowling", "614", "Fantasy");
let e = new Book("Harry Potter and The Order of the Phoenix", "J.K. Rowling", "767", "Fantasy");
let f = new Book("Harry Potter and The Half-Blood Prince ", "J.K. Rowling", "548", "Fantasy");
let g = new Book("Harry Potter and The Deathly Hallow", "J.K. Rowling", "607", "Fantasy");
let myLibrary = [a, b, c, d, e, f, g];

// constructor to make books
function Book(title, author, pages, genre, read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.genre = genre
    this.read = read
}

// add a new book to library
function addBookToLibrary(title, author, pages, genre, read = false) {
    let newBook = new Book(title, author, pages, genre, read);
    myLibrary.push(newBook);
}

// read from global myLibrary and display table with book info
function displayBooks(library) {
    // table element
    let lib = document.getElementById('books');
    // remove current data to update
    while (lib.childElementCount > 1) {
        lib.removeChild(lib.childNodes[lib.childElementCount]);
    }
    // header list
    let bookInfo = ["title", "author", "genre", "pages", "read", "delete"];
    for (let i = 0; i < library.length; i++) {
        // create a new row in table for data
        let book = document.createElement("tr");
        book.setAttribute("id", `book-${i}`);
        book.setAttribute("class", "book");
        lib.appendChild(book);
        // add the data point for each book
        for (let j = 0; j < bookInfo.length; j++) {
            // create new data element for book info
            let entry = document.createElement("td");
            let infoType = bookInfo[j];
            entry.setAttribute("class", infoType);
            // add the element to the book entry
            book.appendChild(entry);
            // add buttons for if read and to delete book from library
            if (infoType === "read" || infoType === "delete") {
                let btn = document.createElement("button");
                entry.appendChild(btn);
                btn.setAttribute("type", "button");
                if (infoType === "read") {
                    btn.setAttribute("id", `${i}-book`);
                    btn.setAttribute("class", "table-button")
                    btn.addEventListener("click", function() {
                        updateRead(btn);
                    });
                    if (myLibrary[i].read) {
                        btn.textContent = "Yes";
                    } else {
                        btn.textContent = "No";
                    }
                } else {
                    // add button for table to delete row
                    btn.setAttribute("id", `${i}`);
                    btn.setAttribute("class", "table-button")
                    btn.textContent = "Delete";
                    btn.addEventListener("click", function() {
                        deleteBook(btn.getAttribute("id"));
                    });
                }
            } else {
                // add book content 
                entry.textContent = library[i][infoType];
            }
        } 
    }
};

// get new book info from form and add to library
function getNewBookInfo() {
    let dataEntries = ["bookTitle", "author", "pages", "genre"];
    let newData = [];
    for (let i = 0; i < dataEntries.length; i++) {
        let entry = document.getElementById(`${dataEntries[i]}`);
        newData.push(entry.value);
    }
    return newData;   
};

// remove book from library
function deleteBook(book) {
    myLibrary.splice(Number(book), 1);
    displayBooks(myLibrary);
}

// update read button and myLibrary.read
function updateRead(btn) {
    let id = btn.getAttribute("id");
    id = Number(id.charAt(0));
    if (myLibrary[id].read) {
        myLibrary[id].read = false;
        btn.textContent = "No";
    } else {
        myLibrary[id].read = true;
        btn.textContent = "Yes";
    }
}

// display form for button "NEW BOOK"
let openForm = document.getElementById("getForm");
openForm.addEventListener("click", function() {
    let form = document.getElementById("addBook");
    form.style.display = "block";
});

// add new book to library and close form
let addBook = document.getElementById("newBook");
addBook.addEventListener("click", function() {
    let newBook = getNewBookInfo();
    let form = document.getElementById("addBook");
    form.style.display = "none";
    addBookToLibrary(newBook[0], newBook[1], newBook[2], newBook[3]);
    displayBooks(myLibrary);
});

// display the current library
let showLibrary = document.getElementById("showLibrary");
showLibrary.addEventListener("click", function() {
    displayBooks(myLibrary);
});
