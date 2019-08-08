import chokidar from 'chokidar';
import path from 'path';
import { readFile } from 'fs';

class ContentService {
  constructor(watcher, baseDir) {
    this.files = {};
    this.baseDir = baseDir;

    watcher
      .on('add', addPath => {
        const addStructured = this._structured(addPath);
        this.files[addStructured.name] = addStructured;
      })
      .on('unlink', removePath => {
        const removeStructured = this._structured(removePath);
        delete this.files[removeStructured.name];
      });
  }

  getFiles() {
    return this.files;
  }

  getFile(name) {
    return new Promise((resolve, reject) => {
      readFile(this.files[name].file, "utf8", (err, data) => {
        err ? reject(err) : resolve(data);
      })
    })
  }

  _structured(fromPath) {
    return {
      name: path.basename(fromPath, '.md'),
      group: path.dirname(fromPath).replace(this.baseDir, '').replace(/\\/g, '/').replace(/^\//, ''),
      file: fromPath
    }
  }
}

const baseDir = path.join(__dirname, '../content');

const watcher = chokidar.watch(baseDir);

export let contentService = new ContentService(watcher, baseDir);
