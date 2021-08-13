/* eslint-disable compat/compat */
/* eslint-disable security/detect-non-literal-fs-filename */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const { TARGET_DIR } = process.env;

const targetDir = path.resolve(TARGET_DIR);

const getFiles = (dir, paths = []) =>{
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const name = `${dir}/${file}`;
    fs.statSync(name).isDirectory() ? getFiles(name, paths) : paths.push(name);
  });

  return paths;
};

const checksumFile = (path) => new Promise((resolve, reject) => {
  const hash = crypto.createHash('sha1');
  const stream = fs.createReadStream(path);
  stream.on('error', err => reject(err));
  stream.on('data', chunk => hash.update(chunk));
  stream.on('end', () => resolve(hash.digest('hex')));
});

const promises = getFiles(targetDir)
  .map(async(file) => ({
    checksum: await checksumFile(file),
    uriPath: file.replace(targetDir, ''),
  }));

Promise.all(promises).then(fileChecksums => {
  console.log(fileChecksums);
});
