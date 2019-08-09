import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'src/app/service/files.service';
import { concatMap, map } from 'rxjs/operators';
import marked from 'marked';

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
    this.article$ = this.route.params.pipe(
      concatMap(p => this.filesService.getArticle(p.id)),
      map(p => marked(p))
    )
  }

}
