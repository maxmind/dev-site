/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';
import path from 'path';

const logFile = path.resolve('./.tmp/logs.json');

const logsBuffer = fs.readFileSync(logFile);

const logs = JSON.parse(logsBuffer);

const recent404s = logs
  .map(log => log.httpRequest.requestUrl.replace(
    'https://dev.maxmind.com',
    'http://localhost:5000'
  ))
  .filter((log, index, logs) => logs.indexOf(log) === index);

console.log(recent404s);
