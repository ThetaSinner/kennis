import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'src/app/service/files.service';
import { concatMap, map } from 'rxjs/operators';
import marked from 'marked';
import { of } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  article$: any;

  constructor(
    private route: ActivatedRoute,
    private filesService: FilesService
  ) { }

  ngOnInit() {
    const query = this.route.snapshot.url.map(obj => obj.path).join('/');

    this.article$ = of(query).pipe(
      concatMap(q => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (uuidRegex.test(q)) {
          return this.filesService.getArticle(q)
        }
        else {
          return this.filesService.getPage(q)
        }
      }),
      map(p => marked(p.content))
    )
  }
}
