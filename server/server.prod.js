import express from 'express';
import path from 'path';
import yargs from 'yargs';
import apiRouter from './app';
import fs from 'fs';

const {argv} = yargs
  .default('port', '8080');

const app = express();

const PUBLIC_PATH = path.join(__dirname, '..', 'dist');
const ASSET_URL = '/public';
const HTML_PATH = path.join(__dirname, '..', 'dev', 'index.html');
app.use(ASSET_URL, express.static(PUBLIC_PATH));
app.use(apiRouter);
app.get('*', (req, res) => {
  fs.readFile(HTML_PATH, 'utf8', (err, content) => {
    res.send(content.replace(/%ASSET_URL%/g, ASSET_URL));
  });
});

console.log(`Attempting to listen at localhost:${argv.port}`);
app.listen(argv.port, (err) => {
  if (err) {
    console.error('FATAL: cannot listen');
    console.error(err);
    process.exit(7);
  }

  console.log(`Listening at localhost:${argv.port}`);
});
