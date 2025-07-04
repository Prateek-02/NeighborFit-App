const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, 'NeighborFit_Indian_Data.csv');
const jsonFilePath = path.join(__dirname, 'NeighborFit_Indian_Data.json');

function csvToJson(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  const result = lines.slice(1).map(line => {
    const obj = {};
    const values = line.split(',');
    headers.forEach((header, idx) => {
      // Try to convert numeric fields
      let value = values[idx];
      if (!isNaN(value) && value !== '') {
        value = Number(value);
      }
      obj[header] = value;
    });
    return obj;
  });
  return result;
}

fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading CSV file:', err);
    process.exit(1);
  }
  const json = csvToJson(data);
  fs.writeFile(jsonFilePath, JSON.stringify(json, null, 2), err => {
    if (err) {
      console.error('Error writing JSON file:', err);
      process.exit(1);
    }
    console.log('CSV successfully converted to JSON!');
  });
}); 