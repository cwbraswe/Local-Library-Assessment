function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned){
      count++;
    }
  });
  return count
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((acc, book) => {
    const genre = book.genre;
    if (acc[genre]) {
      acc[genre]++
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const genreArray = Object.keys(genreCount)
  .map((genre) => {
    return {name: genre, count: genreCount[genre] };
  })
  .sort((a, b) => b.count - a.count);
  return genreArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  popularBooks.sort((a,b) => b.count - a.count);
  return popularBooks.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrows = {};
  books.forEach((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    if (!authorBorrows[author.id]) {
      authorBorrows[author.id] = {
        name : `${author.name.first} ${author.name.last}`,
        count : 0,
      };
    }
    authorBorrows[author.id].count += book.borrows.length;
  });
const sortedAuthors = Object.values(authorBorrows).sort((author1, author2) => author2.count - author1.count);
return sortedAuthors.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
