const {
  addRefoodHandler,
  getAllRefoodsHandler,
  getRefoodByIdHandler,
  editRefoodHandler,
  deleteRefoodHandler,
  loginHandler,
  registerHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/refood/{idLimbah}',
    handler: addRefoodHandler,
  },
  {
    method: 'GET',
    path: '/refood',
    handler: getAllRefoodsHandler,
  },
  {
    method: 'GET',
    path: '/refood/{idLimbah}',
    handler: getRefoodByIdHandler,
  },
  {
    method: 'PUT',
    path: '/refood/{idLimbah}/{idPengolahan}',
    handler: editRefoodHandler,
  },
  {
    method: 'DELETE',
    path: '/refood/{idLimbah}/{idPengolahan}',
    handler: deleteRefoodHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  }
];

module.exports = routes;
