class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    //Create a tr element (Table row)
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //Create div
    const div = document.createElement('div');
    //Add classes (class from HTML [.success or .error])
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');
    //Get form
    const form = document.querySelector('#book-form');
    //Insert alert
    container.insertBefore(div, form);

    //Timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);

  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local Storage class
class Store {
  static getBooks(){
    //Gets books from local storage
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    //Display the books from the local storage to the screen
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI();

      //Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book){
    //Adds the books to the local storage and saves it
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn){
    //Removes the book from the local storage
    console.log(isbn);
  }
}

//DOM LOAD EVENT
document.addEventListener('DOMContentLoader', Store.displayBooks);

//Event listeners
document.getElementById('book-form').addEventListener('submit',
  function(e){
    //Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate
    if(title === '' || author === '' || isbn === ''){
      //Error alert
      ui.showAlert('Please fill in all the blanks', 'error')
    } else {
      //Add book to list
      ui.addBookToList(book);

      //Add tp Local Storage
      Store.addBook(book);

      //Show success
      ui.showAlert('Book Added!', 'success');

      //Clear fields
      ui.clearFields();

    }



    e.preventDefault();
  });

  //Event listener for delete
  document.getElementById('book-list').addEventListener('click', function(e){

    //Instantiate UI
    const ui = new UI();

    //Delete Book
    ui.deleteBook(e.target);

    //Remove from Local Storage
    //e.target is the a tags | it is the list <td> where the a tags and icon are held | the one before it  
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
  });