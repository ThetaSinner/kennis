import chokidar from 'chokidar';
import path from 'path';
import { readFile } from 'fs';
import uuid from 'uuid/v4';

class ContentService {
  constructor(watcher, baseDir) {
    this.files = {};
    this.baseDir = baseDir;

    watcher
      .on('add', addPath => {
        const addStructured = this._structured(addPath);
        this.files[addStructured.id] = addStructured;
      })
      .on('unlink', removePath => {
        const removeStructured = this._structured(removePath);
        delete this.files[removeStructured.id];
      });
  }

  getFiles() {
    return this.files;
  }

  getFile(id) {
    return new Promise((resolve, reject) => {
      readFile(this.files[id].file, "utf8", (err, data) => {
        err ? reject(err) : resolve(data);
      })
    })
  }

  _structured(fromPath) {
    const group = path.dirname(fromPath).replace(this.baseDir, '').replace(/\\/g, '/').replace(/^\//, '');

    return {
      id: uuid(),
      name: path.basename(fromPath, '.md'),
      group: group ? group : 'root',
      file: fromPath
    }
  }
}

const baseDir = path.join(__dirname, '../content');

const watcher = chokidar.watch(baseDir);

export let contentService = new ContentService(watcher, baseDir);
