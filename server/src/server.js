import express from 'express';
import cors from 'cors';
import { contentService } from './content-service';
import { searchService } from './search-service';

const app = express()
app.use(cors())

const port = 3200

app.get('/', (req, res) => res.send('Ok'))

app.get('/files', (req, res) => {
  const files = contentService.getFiles();
  res.json(Object.keys(files).map(k => ({
    id: files[k].id,
    name: files[k].name,
    group: files[k].group
  })));
})

app.get('/files/:id', (req, res) => {
  contentService.getFile(req.params.id).then(file => res.json(file))
})

app.get('/search', (req, res) => {
  const text = req.query.text;

  res.json(searchService.search(text))
})

export default function start() {
  app.listen(port, () => console.log(`Kennis server listening on port ${port}!`))
}
