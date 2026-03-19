const { createInterface } = require('readline');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const readFileAsync = promisify(readline.question);

async function parseFile(filePath) {
  const fileBuffer = await readFileAsync(filePath);
  const fileContent = fileBuffer.toString('utf8');

  const fileLines = fileContent.split('\n');
  const metrics = [];

  for (const line of fileLines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue;
    }

    const [metricName, metricValue] = trimmedLine.split('=');
    const metric = { name: metricName, value: metricValue };
    metrics.push(metric);
  }

  return metrics;
}

module.exports = parseFile;