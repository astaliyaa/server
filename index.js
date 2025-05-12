const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const clients = new Set();

require('./web/website.js');

server.on('connection', (socket) => {
  console.log('A new client connected!');
  clients.add(socket);

  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.action === 'reset') {
        for (const client of clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ action: 'reset' }));
          }
        }
      } else {
        process.stdout.write(`\rGyroscope Data - X: ${data.x}, Y: ${data.y}, Z: ${data.z}`);

        for (const client of clients) {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        }
      }
    } catch (e) {
      console.log('\nInvalid JSON received');
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('\nA client disconnected.');
  });
});

console.log(`\x1b[32mServer running on port 8080 \x1b[0m`);