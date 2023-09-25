const net = require('net');
const fs = require('fs');

const PORT = 22;
const LOG_FILE = 'honeylog.txt';
const CUSTOM_BANNER = 'SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.5';

const server = net.createServer((socket) => {
  const remoteAddress = socket.remoteAddress;
  const remotePort = socket.remotePort;

  console.log('Connection from: ${remoteAddress}:${remotePort}');

  const logEntry = 'Connection from: ${remoteAddress}:${remotePort}\n';
  
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) {
      console.error('Error writing to ${LOG_FILE}: ${err}');
    }
  });

  socket.write(`${CUSTOM_BANNER}\r\n`);

  socket.end();
});

server.listen(PORT, () => {
  console.log('Listening on port ${PORT}...');
});
