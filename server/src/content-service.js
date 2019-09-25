import chokidar from 'chokidar';
import path from 'path';
import { readFile, writeFileSync, writeFile } from 'fs';
import uuid from 'uuid/v4';
import { EventEmitter } from 'events';
import { settings } from './settings';
import { serverLogger } from './server-logger';
import { loggers, add } from 'winston';

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
        this._addFileFromPath(addPath);
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

  _addFileFromPath(addPath) {
    const addStructured = this._structured(addPath);
    // De-duplicate adds, because remote added files are added to the cache in case file system events aren't available.
    if (this._fileExists(addStructured)) {
      return;
    }
    this.files[addStructured.id] = addStructured;
    this._emitChange();

    return addStructured;
  }

  _emitChange() {
    if (this.isReady) {
      this.changedEmitter.emit('change', this.files);
    }
  }

  getFiles() {
    return this.files;
  }

  getFileContentInfo(id) {
    return new Promise((resolve, reject) => {
      if (!this.files[id]) {
        serverLogger.warn('File not found by id %s in files', id, this.files);
        reject(Error('Not found'));
        return;
      }

      readFile(this.files[id].file, "utf8", (err, data) => {
        err ? reject(err) : resolve({content: data, id: id});
      })
    })
  }

  getFileContentInfoByUri(uri) {
    for (let i of Object.values(this.files)) {
      if ((i.group === 'root' && i.name === uri) || i.group + '/' + i.name === uri) {
        return this.getFileContentInfo(i.id);
      }
    }

    return Promise.reject(Error('Not found'));
  }

  _fileExists(structured) {
    const uri = (structured.group === 'root' ? '' : structured.group + '/') + structured.name;
    for (let i of Object.values(this.files)) {
      if ((i.group === 'root' && i.name === uri) || i.group + '/' + i.name === uri) {
        return true;
      }
    }

    return false;
  }

  addChangeListener(listener) {
    this.changedEmitter.on('change', listener);
  }

  addFile(request) {
    const saveFilePath = path.join(settings.baseDir, request.group == 'root' ? '' : request.group, `${request.name}.md`);

    writeFileSync(saveFilePath, `# ${request.name}\nWrite something _fascinating_ here!`);

    // Ensure that the file is added to the cache if file system events aren't available.
    const structured = this._addFileFromPath(saveFilePath);
    return structured.id;
  }

  updateFile(id, content) {
    return new Promise((resolve, reject) => {
      if (!this.files[id]) {
        reject(Error('File not found'));
        return;
      }

      writeFile(this.files[id].file, content, 'utf-8', (err) => {
        if (err) {
          reject(err);
        }
        else {
          resolve();
        }
      })
    });
  }

  _structured(fromPath) {
    const group = path.dirname(fromPath).replace(this.baseDir, '').replace(/\\/g, '/').replace(/^\//, '');

    return {
      id: uuid(),
      name: path.basename(fromPath, '.md'),
      group: group ? group : 'root',
      file: fromPath,
      ext: path.extname(fromPath)
    }
  }
}

const watcher = chokidar.watch(settings.baseDir);

export let contentService = new ContentService(watcher, settings.baseDir);
