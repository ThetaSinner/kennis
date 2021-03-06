import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'src/app/service/files.service';
import { concatMap, map } from 'rxjs/operators';
import marked from 'marked';
import { of } from 'rxjs';
import DOMPurify from 'dompurify';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  article$: any;
  articleId: any;

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
      map(p => {
        this.articleId = p.id;
        return marked(p.content)
      })
    )
  }
}
