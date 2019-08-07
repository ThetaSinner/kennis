import express from 'express';
import { contentService } from './content-service';

const app = express()

const port = 3200

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/files', (req, res) => {
  const files = contentService.getFiles();
  res.json(Object.keys(files).map(k => files[k].name));
})

app.get('/files/:name', (req, res) => {
  contentService.getFile(req.params.name).then(file => res.json(file))
})

export default function start() {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
