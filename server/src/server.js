import express from 'express';
import find from 'find';
import path from 'path';

const app = express()

const port = 3200

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/files', (req, res) => {
  find.file(/\.md$/, path.join(__dirname, '../content'), function(files) {
    console.log(files);
    res.json(files.map(f => path.basename(f, '.md')));
  })
})

export default function start() {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}