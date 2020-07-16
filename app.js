//Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  //Create tr element
  const row = document.createElement('tr');
  //Inserts Columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;

  list.appendChild(row);
}

//Show alerts
UI.prototype.showAlert = function(message, className) {
  //Create div
  const div = document.createElement('div');
  //Add classes
  div.className = `alert ${className}`;
  //Add text 
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  //Insert alert before the form and add book title
  container.insertBefore(div, form);

  //Timeour after 3 secs
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

//Clear fields
UI.prototype.clearFields = function(){
  //This function is used to clear the information after the user hits submit
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


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

    //Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
  });