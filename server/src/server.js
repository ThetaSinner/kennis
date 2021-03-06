import express from 'express';
import cors from 'cors';
import path from 'path';
import { contentService } from './content-service';
import { searchService } from './search-service';
import { settings } from './settings';
import Mustache from 'mustache';
import { serverLogger } from './server-logger';
import * as bodyParser from 'body-parser';

const app = express()
app.use(cors())
app.use(bodyParser.json())

const port = 3200

app.use(express.static(path.join(settings.baseDir, 'assets')));

app.get('/', (req, res) => res.send('Ok'))

app.get('/files', (req, res) => {
  const files = contentService.getFiles();

  res.json(Object.keys(files).map(k => {
    const file = files[k]

    // Only track files which have allowed extensions.
    if (settings.allowedExtensions.indexOf(file.ext) === -1) {
      return null;
    }

    return {
      id: file.id,
      name: file.name,
      group: file.group
    }
  }).filter(f => f !== null));
})

app.post('/files', (req, res) => {
  if (!req.body || !req.body.name || !req.body.group) {
    res.sendStatus(400);
    return;
  }

  const id = contentService.addFile(req.body);

  res.send({articleId: id});
})

app.get('/files/:id', (req, res) => {
  const id = req.params.id;
  serverLogger.debug('Getting file by id %s', id);

  contentService.getFileContentInfo(id).then(fileContentInfo => {
    sendFileContentInfo(res, fileContentInfo);
  }).catch((err) => {
    serverLogger.error('Failed to get file. %s', err);
    res.sendStatus(404);
  });
})

app.post('/files/:id', (req, res) => {
  const id = req.params.id;
  if (!id || !req.body || !req.body.content) {
    res.sendStatus(400);
    return;
  }

  serverLogger.debug('Updating file by id %s', id);

  contentService.updateFile(req.params.id, req.body.content).then(() => {
    res.json({});
  }).catch((err) => {
    serverLogger.error('Failed to update file %s', err);
    res.sendStatus(500);
  })
})

app.get('/search', (req, res) => {
  const text = req.query.text;

  serverLogger.debug('Searching by text [%s]', text);

  res.json(searchService.search(text));
})

app.get('/pages/*', (req, res) => {
  const uri = req.params[0];
  serverLogger.debug('Getting file by uri %s', uri);

  contentService.getFileContentInfoByUri(uri).then(fileContentInfo => {
    sendFileContentInfo(res, fileContentInfo);
  }).catch((err) => {
    serverLogger.error('Failed to get file. %s', err);
    res.sendStatus(404);
  });
});

function sendFileContentInfo(res, fileContentInfo) {
  const rendered = Mustache.render(fileContentInfo.content, settings.templateValues);
  res.type('text/markdown')
  res.send({content: rendered, id: fileContentInfo.id})
}

export default function start() {
  app.listen(port, () => console.log(`Kennis server listening on port ${port}!`))
}
