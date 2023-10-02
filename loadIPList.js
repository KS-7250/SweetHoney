const fs = require('fs');

function loadIPList(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return data.split('\n').map((ip) => ip.trim());
  } catch (error) {
    console.error(`Error loading IP list from ${path}: ${error.message}`);
    return [];
  }
}
exports.loadIPList = loadIPList;
