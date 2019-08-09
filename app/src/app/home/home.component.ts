import { Component, OnInit } from '@angular/core';
import { FilesService } from '../service/files.service';
import { groupBy, map, concatMapTo, concatMap, mergeMap, reduce, merge } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articlesGroups$: any;

  constructor(private filesService: FilesService) {
    this.articlesGroups$ = filesService.articles.pipe(
      concatMap(articles => {
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

}
