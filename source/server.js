const Hapi = require('@hapi/hapi');
const routes = require('./routes');

console.log('Initializing Server...');
console.log('Please wait...');

const initialize = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Checking complete. Server is already running on ${server.info.uri}`);
};

initialize();
