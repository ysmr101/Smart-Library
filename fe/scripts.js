document.addEventListener('DOMContentLoaded', () => {
    const fetchBooksButton = document.getElementById('fetchBooksButton');
    fetchBooksButton.addEventListener('click', fetchAllBooks);
});

async function fetchAllBooks() {
    const colors = ['#FFCDD2', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFECB3', '#FFAB91', '#D7CCC8'];
    let allBooks = [];
    let start = 0;
    const limit = 100;
    
    try {
        while (start <= 4900) {
            const response = await fetch(`http://127.0.0.1:8000/books/?start=${start}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const books = await response.json();
            if (books.length === 0) break; // Exit loop if no more books are returned

            allBooks = allBooks.concat(books);
            start += limit;
        }

        displayBooks(allBooks, 1, colors);

    } catch (error) {
        console.error('Failed to fetch books:', error);
        alert('Failed to fetch books: ' + error.message);
    }
}

function displayBooks(books, page, colors) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery before adding new items

    const booksPerPage = 20; // Change to 20 books per page
    const startIndex = (page - 1) * booksPerPage;
    const endIndex = Math.min(startIndex + booksPerPage, books.length);

    for (let i = startIndex; i < endIndex; i++) {
        const book = books[i];
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.style.backgroundColor = colors[i % colors.length];

        const img = document.createElement('img');
        img.src = book.thumbnail; // Assuming the book object has a thumbnail property
        img.alt = book.title;

        const title = document.createElement('h3');
        title.textContent = book.title;

        bookDiv.appendChild(img);
        bookDiv.appendChild(title);
        gallery.appendChild(bookDiv);
    }

    updatePaginationControls(books, page, colors);
}

function updatePaginationControls(books, currentPage, colors) {
    const paginationContainer = document.getElementById('pagination-container');
    if (paginationContainer) paginationContainer.remove(); // Remove existing controls if any

    const totalPages = Math.ceil(books.length / 20); // Change to 20 books per page
    const controls = document.createElement('div');
    controls.id = 'pagination-container';

    const firstPageButton = document.createElement('button');
    firstPageButton.textContent = '<< First';
    firstPageButton.disabled = currentPage === 1;
    firstPageButton.addEventListener('click', () => displayBooks(books, 1, colors));
    controls.appendChild(firstPageButton);

    const prevPageButton = document.createElement('button');
    prevPageButton.textContent = '< Prev';
    prevPageButton.disabled = currentPage === 1;
    prevPageButton.addEventListener('click', () => displayBooks(books, currentPage - 1, colors));
    controls.appendChild(prevPageButton);

    const startPage = Math.max(currentPage, 1);
    const endPage = Math.min(currentPage + 5, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.disabled = true;
        }
        button.addEventListener('click', () => displayBooks(books, i, colors));
        controls.appendChild(button);
    }

    const nextPageButton = document.createElement('button');
    nextPageButton.textContent = 'Next >';
    nextPageButton.disabled = currentPage === totalPages;
    nextPageButton.addEventListener('click', () => displayBooks(books, currentPage + 1, colors));
    controls.appendChild(nextPageButton);

    const lastPageButton = document.createElement('button');
    lastPageButton.textContent = 'Last >>';
    lastPageButton.disabled = currentPage === totalPages;
    lastPageButton.addEventListener('click', () => displayBooks(books, totalPages, colors));
    controls.appendChild(lastPageButton);

    document.body.appendChild(controls);
}
