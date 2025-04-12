const myBooks = [];


function Book(title, author, pages, read, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.info = function() {
        return title + ", by "+ author + ', ' + pages + " pages, " + read + ', book id ' + id + '.' ;
    };

}


function addBook(title, author, pages, read) {
    let id = crypto.randomUUID();
    let book = new Book(title, author, pages, read, id);

    myBooks.push(book);

};

addBook('The Hobbit', 'J.R.R Tolkien', 256, true);
addBook('Hello World', 'McHelloFace', 150, false);

function displayBook() {
    
}

// console.log(myBooks);