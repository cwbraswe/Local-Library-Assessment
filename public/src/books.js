function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = [];
  const returnedBooks = [];
  books.forEach((book) => {
    const [current] = book.borrows;
    if (!current.returned) {
      checkedOutBooks.push(book);
    } else {
      returnedBooks.push(book);
    }
  });
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map(borrow => {
    const account = accounts.find(acc => acc.id === borrow.id);
    return {...borrow, ...account};
  });
  return borrowers.slice(0,10); 
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
