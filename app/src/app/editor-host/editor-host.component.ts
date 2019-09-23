import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { FilesService, Article } from '../service/files.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editor-host',
  templateUrl: './editor-host.component.html',
  styleUrls: ['./editor-host.component.scss']
})
export class EditorHostComponent implements OnInit {
  source$: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private filesService: FilesService) { }

  ngOnInit() {
    this.source$ = this.route.queryParams.pipe(
      map(params => params.sourceId),
      flatMap(sourceId => this.filesService.getArticle(sourceId))
    );
  }

  handleSave(content) {
    console.log(`Saving content ${content}`)
  }
}
