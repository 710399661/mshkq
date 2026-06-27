const http = require('http');
const app = require('./app');
const { port, host } = require('./config');

const server = http.createServer(app).listen(port, host, () => {
  process.send && process.send('ready');
  console.log('Express server listening on http://%s:%s', host, port);
});

server.on('clientError', (err, sock) => {
  logger.error(`Client request error: ${err.code}`);
  sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

process.on('SIGINT', () => {
  server.close((err) => {
    process.exit(err ? 1 : 0);
  });
});
