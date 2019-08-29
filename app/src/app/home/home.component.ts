import { Component, OnInit } from '@angular/core';
import { FilesService } from '../service/files.service';
import { groupBy, map, concatMapTo, concatMap, mergeMap, reduce, merge } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SearchService } from '../service/search.service';

interface ArticleGroup {
  group: string;
  values: Array<any>;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Default display.
  articlesGroups$: any;

  // Search.
  searchText: string;
  searchResults$: Observable<Object>;
  articles: any;

  constructor(private filesService: FilesService, private searchService: SearchService) {
    this.transformArticleGroups = this.transformArticleGroups.bind(this);

    this.articlesGroups$ = filesService.articles.pipe(
      concatMap(articles => {
        this.articles = articles;
        return of(...articles).pipe(
          groupBy(a => a.group),
          mergeMap((group$) => group$.pipe(reduce((acc, cur) => ({group: cur.group, values: [...acc.values, cur]}), {group: '', values: []}))),
          map(v => [v]),
          reduce((acc, cur) => [...acc, cur[0]], []),
          map(this.transformArticleGroups)
        )
      })
    )
  }

  ngOnInit() {
  }

  onSubmit() {
    this.searchResults$ = this.searchService.search(this.searchText).pipe(
      map((p: Array<any>) => p.map(i => this.articles.find(a => a.id === i.ref)))
    );
  }

  private transformArticleGroups(articleGroups: Array<ArticleGroup>) {
    let result = [];

    for (let article of articleGroups) {
      if (article.group === 'root') {
        result = [...result, ...article.values.map(val => ({link: val}))]
        continue;
      }

      const path = article.group.split('/');
      if (path.length == 1) {
        const item = {
          key: path[0]
        };
        result.unshift(item);

        item['children'] = article.values.map(val => ({link: val}));
      }
      else {
        this.doInsert(result, path, article);
      }
    }

    return result
  }

  private doInsert(result: any[], path: string[], article: ArticleGroup) {
    let search = result;
    const lastp = path.pop();
    for (const p of path) {
      let foundSearch = false;
      for (const s of search) {
        if (s.key === p) {
          search = s.children;
          foundSearch = true;
          break;
        }
      }

      if (!foundSearch) {
        let index = 0;
        while (search.length && search[index].key) {
          index++;
        }

        const item = {
          key: p,
          children: []
        };
        if (search) {
          search.splice(index, 0, item);
        }
        else {
          search.push(item);
        }

        search = item.children;
      }
    }

    let index = 0;
    console.log(search);
    while (search.length && search[index].key) {
      index++;
    }

    const item = {
      key: lastp
    };
    if (search) {
      search.splice(index, 0, item);
    }
    else {
      search.push(item);
    }

    item['children'] = article.values.map(val => ({link: val}));
  }
}
