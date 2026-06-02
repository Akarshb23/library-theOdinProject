const myLibrary = [];

/*
    Constructor
*/

function Book(
    title,
    author,
    pages,
    read
) {
    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/*
    Prototype Method
*/

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

/*
    Add Book
*/

function addBookToLibrary(
    title,
    author,
    pages,
    read
) {
    const book = new Book(
        title,
        author,
        pages,
        read
    );

    myLibrary.push(book);
}

/*
    Render
*/

function displayBooks() {

    const container =
        document.getElementById(
            "library-container"
        );

    container.innerHTML = "";

    myLibrary.forEach(book => {

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.dataset.id = book.id;

        const title =
            document.createElement("h3");

        title.textContent = book.title;

        const author =
            document.createElement("p");

        author.textContent =
            `Author: ${book.author}`;

        const pages =
            document.createElement("p");

        pages.textContent =
            `Pages: ${book.pages}`;

        const read =
            document.createElement("p");

        read.textContent =
            `Status: ${
                book.read
                    ? "Read"
                    : "Not Read"
            }`;

        const toggleBtn =
            document.createElement("button");

        toggleBtn.textContent =
            "Toggle Read";

        toggleBtn.classList.add(
            "toggle-btn"
        );

        toggleBtn.addEventListener(
            "click",
            () => {

                book.toggleRead();

                displayBooks();
            }
        );

        const removeBtn =
            document.createElement("button");

        removeBtn.textContent =
            "Remove";

        removeBtn.classList.add(
            "remove-btn"
        );

        removeBtn.addEventListener(
            "click",
            () => {

                const index =
                    myLibrary.findIndex(
                        b =>
                            b.id === book.id
                    );

                myLibrary.splice(
                    index,
                    1
                );

                displayBooks();
            }
        );

        card.append(
            title,
            author,
            pages,
            read,
            toggleBtn,
            removeBtn
        );

        container.appendChild(card);
    });
}

/*
    Dialog
*/

const dialog =
    document.getElementById(
        "bookDialog"
    );

const newBookBtn =
    document.getElementById(
        "newBookBtn"
    );

const closeDialog =
    document.getElementById(
        "closeDialog"
    );

newBookBtn.addEventListener(
    "click",
    () => {
        dialog.showModal();
    }
);

closeDialog.addEventListener(
    "click",
    () => {
        dialog.close();
    }
);

/*
    Form
*/

const form =
    document.getElementById(
        "bookForm"
    );

form.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const title =
            document.getElementById(
                "title"
            ).value;

        const author =
            document.getElementById(
                "author"
            ).value;

        const pages =
            document.getElementById(
                "pages"
            ).value;

        const read =
            document.getElementById(
                "read"
            ).checked;

        addBookToLibrary(
            title,
            author,
            pages,
            read
        );

        displayBooks();

        form.reset();

        dialog.close();
    }
);

/*
    Sample Books
*/

addBookToLibrary(
    "Atomic Habits",
    "James Clear",
    320,
    true
);

addBookToLibrary(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    false
);

displayBooks();