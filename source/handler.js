const { nanoid } = require('nanoid');
const books = require('./books');

// ADD HANDLER
const addingBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // client fail input property name request
  if(name === undefined){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // readpage value more than pagecount value
  const finished = pageCount === readPage;
  if(readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };
  books.push(newBook);

  // success response adding book
  const addTrue = books.filter((book) => book.id === id).length > 0;
  if(addTrue){
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // failure response adding book
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// VIEW ALL HANDLER
const viewAllBookHandler = (request) => {
  const { name: nameQuery, reading: readingQuery, finished: finishedQuery } = request.query;

  // query by name
  if(nameQuery !== undefined){
    const bookFilter = books.filter((book) => {
      const bookNameSplit = book.name.toLowerCase().split(' ');
      const result = bookNameSplit.some((cache) => cache === nameQuery.toLowerCase());
      return result;
    });

    const bookFormat = bookFilter.map((book) => {
      const { id, name, publisher } = book;
      return { id, name, publisher };
    });

    const response = {
      status: 'success',
      data: {
        books:
          bookFormat,
      },
    };
    return response;
  }

  // query by reading
  if(readingQuery !== undefined){
    // when true
    if(readingQuery === '1'){
      const bookFilter = books.filter((book) => book.reading);
      const bookFormat = bookFilter.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });

      const response = {
        status: 'success',
        data: {
          books:
            bookFormat,
        },
      };
      return response;
    }

    // when false
    if(readingQuery === '0'){
      const bookFilter = books.filter((book) => !book.reading);
      const bookFormat = bookFilter.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });
      const response = {
        status: 'success',
        data: {
          books:
            bookFormat,
        },
      };
      return response;
    }
  }

  // query by finished
  if(finishedQuery !== undefined){
    // when true
    if(finishedQuery === '1'){
      const bookFilter = books.filter((book) => book.finished);
      const bookFormat = bookFilter.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });

      const response = {
        status: 'success',
        data: {
          books:
            bookFormat,
        },
      };
      return response;
    }

    // when false
    if(finishedQuery === '0'){
      const bookFilter = books.filter((book) => !book.finished);
      const bookFormat = bookFilter.map((book) => {
        const { id, name, publisher } = book;
        return { id, name, publisher };
      });
      const response = {
        status: 'success',
        data: {
          books:
            bookFormat,
        },
      };
      return response;
    }
  }

  const bookFormat = books.map((book) => {
    const { id, name, publisher } = book;
    return { id, name, publisher };
  });

  const response = {
    status: 'success',
    data: {
      books:
        bookFormat,
    },
  };
  return response;
};

// VIEW BY ID BOOK
const idBookHandler = (request, h) => {
  const { bookId } = request.params;
  const dataBook = books.filter((book) => book.id === bookId)[0];

  if(dataBook === undefined){
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book:
        dataBook,
    },
  });
  response.code(200);
  return response;
};

// EDIT ID BOOK
const editIdBookHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  // failed input book name
  if(name === undefined){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // readpage value more than pagecount value
  if(readPage > pageCount){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === bookId);

  // success response editing book
  if(index !== -1){
    books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // failure response editing book
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// DELETE ID BOOK
const deleteIdBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  // success response deleting book
  if(index !== -1){
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // success response deleting book
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addingBookHandler, viewAllBookHandler, idBookHandler, editIdBookHandler, deleteIdBookHandler };
