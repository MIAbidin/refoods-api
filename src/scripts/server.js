const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const routes = require('./routes');
const path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
      files: {
        relativeTo: path.join(__dirname, '../public')
      }
    },
  });

  await server.register(Inert);

  server.route(routes);

  server.route({
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: 'images',
        redirectToSlash: true,
        index: false,
      },
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
