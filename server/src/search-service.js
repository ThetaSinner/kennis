import { contentService } from "./content-service";
import { readFileSync } from "fs";
import lunr from "lunr";

class SearchService {
  constructor() {
    this.idx = null;

    this._changeListener = this._changeListener.bind(this);

    contentService.addChangeListener(this._changeListener)
  }

  search(query) {
    return this.idx ? this.idx.search(query) : null;
  }

  _changeListener(files) {
    this._rebuildIndex(files);
  }

  _rebuildIndex(files) {
    const documents = Object.keys(files).reduce((val, curr) => [...val, files[curr]], []).map(f => ({
      id: f.id,
      name: f.name,
      text: readFileSync(f.file, 'utf-8')
    }));

    this.idx = lunr(function () {
      this.ref('id')
      this.field('name')
      this.field('text')

      documents.forEach(function (doc) {
        this.add(doc)
      }, this)
    })
  }
}

export const searchService = new SearchService();
