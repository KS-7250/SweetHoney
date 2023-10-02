const net = require('net');
const fs = require('fs');

const PORT = 22; // Change this to the desired port number
const LOG_FILE = 'honeylog.txt';
const CUSTOM_BANNER = '';

const server = net.createServer((socket) => {

  const remoteAddress = socket.remoteAddress;
  const remotePort = socket.remotePort;

  console.log(`Connection from: ${remoteAddress}:${remotePort}`);

  // Log the connection details to honeylog.txt
  const logEntry = `Connection from: ${remoteAddress}:${remotePort}\n`;
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) {
      console.error(`Error writing to ${LOG_FILE}: ${err}`);
    }
  });

  // Read the client's SSH version message
  let clientVersion = '';
  socket.on('data', (data) => {
    clientVersion += data.toString();
    // Check if the client's SSH version message is complete
    if (clientVersion.includes('\r\n')) {
      // Log the SSH version (and potentially other details)
      logSshVersion(remoteAddress, remotePort, clientVersion);

      // Send a custom banner
      socket.write('SSH-2.0-Server\r\n'); // Replace with your custom banner

      // Close the connection
      socket.end();
    }
  });
});

function logSshVersion(ip, port, version) {
  const logEntry = `SSH version from ${ip}:${port}: ${version}`;
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) {
      console.error(`Error writing SSH version to ${LOG_FILE}: ${err}`);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Honeypot listening on port ${PORT}...`);
});
