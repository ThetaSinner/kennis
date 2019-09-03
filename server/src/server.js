import express from 'express';
import cors from 'cors';
import path from 'path';
import { contentService } from './content-service';
import { searchService } from './search-service';
import { settings } from './settings';
import Mustache from 'mustache';

const app = express()
app.use(cors())

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

app.get('/files/:id', (req, res) => {
  contentService.getFile(req.params.id).then(file => {
    const rendered = Mustache.render(file, settings.templateValues);
    res.type('text/markdown')
    res.send({content: rendered})
  })
})

app.get('/search', (req, res) => {
  const text = req.query.text;

  res.json(searchService.search(text))
})

export default function start() {
  app.listen(port, () => console.log(`Kennis server listening on port ${port}!`))
}
