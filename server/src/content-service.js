import chokidar from 'chokidar';
import path from 'path';
import { readFile } from 'fs';
import uuid from 'uuid/v4';
import { EventEmitter } from 'events';

class ContentService {
  constructor(watcher, baseDir) {
    this.files = {};
    this.baseDir = baseDir;

    this.changedEmitter = new EventEmitter();

    this.isReady = false;

    watcher
      .on('ready', () => {
        this.isReady = true;
        this._emitChange();
      })
      .on('add', addPath => {
        const addStructured = this._structured(addPath);
        this.files[addStructured.id] = addStructured;
        this._emitChange();
      })
      .on('change', changePath => {
        const changeStructured = this._structured(changePath);
        this._emitChange();
      })
      .on('unlink', removePath => {
        const removeStructured = this._structured(removePath);
        delete this.files[removeStructured.id];
        this._emitChange();
      });
  }

  _emitChange() {
    if (this.isReady) {
      this.changedEmitter.emit('change', this.files);
    }
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

  addChangeListener(listener) {
    this.changedEmitter.on('change', listener);
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

const baseDir = process.env.CONTENT_DIR || path.join(__dirname, '../content');

const watcher = chokidar.watch(baseDir);

export let contentService = new ContentService(watcher, baseDir);
