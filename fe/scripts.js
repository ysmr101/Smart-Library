document.addEventListener('DOMContentLoaded', () => {
    const fetchBooksButton = document.getElementById('fetchBooksButton');
    fetchBooksButton.addEventListener('click', fetchBooks);
});

async function fetchBooks() {
    const colors = ['#FFCDD2', '#E1BEE7', '#C5CAE9', '#B3E5FC', '#C8E6C9', '#FFECB3', '#FFAB91', '#D7CCC8'];
    let colorIndex = 0;

    try {
        const response = await fetch('http://127.0.0.1:8000/books/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const books = await response.json();

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; // Clear the gallery before adding new items

        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            bookDiv.style.backgroundColor = colors[colorIndex % colors.length];
            colorIndex++;

            const img = document.createElement('img');
            img.src = book.thumbnail; // Assuming the book object has an image property
            img.alt = book.title;

            const title = document.createElement('h3');
            title.textContent = book.title;

            bookDiv.appendChild(img);
            bookDiv.appendChild(title);
            gallery.appendChild(bookDiv);
        });
    } catch (error) {
        alert('Failed to fetch books: ' + error.message);
    }
}
