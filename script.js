const myBooks = [];


function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;

    // convert from string to boolean
    this.read = read === 'true';
    this.id = id;
    this.info = function() {
        return title + ", by "+ author + ', ' + pages + " pages, " + read + ', book id ' + id;
    };

}

Book.prototype.updateRead = function(id) {
    const index = myBooks.findIndex((i) => {
        return i.id === id;
      });
      myBooks[index].read = true;
};


function addBook(title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = new Book(title, author, pages, read, id);

    myBooks.push(book);

};

function deleteBook(id) {
    const index = myBooks.findIndex((i) => {
        return i.id === id;
      });
      myBooks.splice(index, 1);

};

// adding couple books to array for testing purposes
addBook('The Hobbit', 'J.R.R Tolkien', 256, true);
 addBook('Hello World', 'McHelloFace', 150, false);

const addBookContainer = document.querySelector('#add-book-container');
const addBookDialog = document.querySelector('#add-book-dialog');

const addBookButton = document.createElement('button');
addBookButton.textContent = 'Add Book';
addBookButton.addEventListener('click', () => {
    addBookDialog.showModal();
});
addBookContainer.appendChild(addBookButton);

const closeDialogButton = document.querySelector('#dialog-close-button');
closeDialogButton.addEventListener('click', () => {
    addBookDialog.close();
});


const booksContainer = document.querySelector('#books-container');

function displayBook() {
    
    // reset the display to prevent showing duplicates
    booksContainer.innerHTML = '';

    if (myBooks.length === 0) {
        booksContainer.textContent = 'Your library is empty.  Add some books!';
        return;
    }

    myBooks.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card'

        // add book id to book card for book deleting and updating read status
        bookCard.dataset.id = book.id;        
        
        booksContainer.appendChild(bookCard);

        const bookTitle = document.createElement('div');
        bookTitle.className = 'book-title';
        bookTitle.textContent = book.title;
        bookCard.appendChild(bookTitle);

        const bookAuthor = document.createElement('div');
        bookAuthor.className = 'book-author';
        bookAuthor.textContent = 'Author: ' + book.author;
        bookCard.appendChild(bookAuthor);

        const bookPages = document.createElement('div');
        bookPages.className = 'book-pages';
        bookPages.textContent = 'Pages: ' + book.pages;
        bookCard.appendChild(bookPages);

        const bookRead = document.createElement('div');
        bookRead.className = 'book-read';
        bookRead.textContent = 'Read: ' + book.read;
        bookCard.appendChild(bookRead);

        const bookDelete = document.createElement('button');
        bookDelete.className = 'delete-book-button';
        bookDelete.textContent = 'Delete';
        bookDelete.addEventListener('click', () => {
            deleteBook(bookCard.dataset.id);
            displayBook();
        });

        bookCard.appendChild(bookDelete);

        const bookReadButton = document.createElement('button');
        bookReadButton.className = 'read-book-button';
        bookReadButton.textContent = 'Mark as read';
        bookReadButton.addEventListener('click', () => {
            book.updateRead(bookCard.dataset.id);
            displayBook();
        });

        if (book.read === false) {
            bookCard.appendChild(bookReadButton);
        };
    });
    
};


let addBookForm = document.getElementById("add-book-form");

addBookForm.addEventListener("submit", (e) => {
    // prevent page reload after form submit
    e.preventDefault();

    // needed to add .value to properly get the value of the input and not the element itself
    let titleValue = document.getElementById("title").value;
    let authorValue = document.getElementById("author").value;

    // turn input from string to int
    let pagesValue = parseInt(document.getElementById("pages").value, 10);
    let readValue = document.querySelector('input[name="read"]:checked');
    let selectedReadValue = readValue.value;

    addBook(titleValue, authorValue, pagesValue, selectedReadValue);
    displayBook();
    
});

// initial run to display books
displayBook();