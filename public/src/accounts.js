function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((ai, bi) => ai.name.last.localeCompare(bi.name.last));
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((acc, book) => {
    const borrowCount = book.borrows.filter(borrow => borrow.id === accountId).length;
    return acc + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
      // Filter the list of books to only include those that are currently checked out by the account
      const checkedOutBooks = books.filter((book) => {
        const currentBorrow = book.borrows[0];
        return !currentBorrow.returned && currentBorrow.id === account.id;
      });
    
      // For each checked out book, add its corresponding author object to the book object
      const result = checkedOutBooks.map((book) => {
        const author = authors.find((author) => author.id === book.authorId);
        return { ...book, author };
      });
    
      return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
