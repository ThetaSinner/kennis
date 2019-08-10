import { Component, OnInit } from '@angular/core';
import { FilesService } from '../service/files.service';
import { groupBy, map, concatMapTo, concatMap, mergeMap, reduce, merge } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SearchService } from '../service/search.service';

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
    this.articlesGroups$ = filesService.articles.pipe(
      concatMap(articles => {
        this.articles = articles;
        console.log(articles);
        return of(...articles).pipe(
          groupBy(a => a.group),
          mergeMap((group$) => group$.pipe(reduce((acc, cur) => ({group: cur.group, values: [...acc.values, cur]}), {group: '', values: []}))),
          map(v => [v]),
          reduce((acc, cur) => [...acc, cur[0]], [])
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

}
