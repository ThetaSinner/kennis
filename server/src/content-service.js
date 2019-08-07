import chokidar from 'chokidar';
import path from 'path';
import { readFile } from 'fs';

class ContentService {
  constructor(watcher) {
    this.files = {};

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
      file: fromPath
    }
  }
}

const watcher = chokidar.watch(path.join(__dirname, '../content'));

export let contentService = new ContentService(watcher);
