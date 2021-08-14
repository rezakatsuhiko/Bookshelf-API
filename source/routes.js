const { addingBookHandler, viewAllBookHandler, idBookHandler, editIdBookHandler, deleteIdBookHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addingBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: viewAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: idBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editIdBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteIdBookHandler,
  },
];

module.exports = routes;
